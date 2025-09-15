// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract BidShield is SepoliaConfig {
    using FHE for *;
    
    struct Job {
        euint32 jobId;
        string title;
        string description;
        euint32 budget;
        euint32 deadline;
        address client;
        bool isActive;
        bool isCompleted;
        uint256 createdAt;
        uint256 bidDeadline;
    }
    
    struct Bid {
        euint32 bidId;
        euint32 jobId;
        euint32 amount;
        euint32 deliveryTime;
        string proposal;
        address freelancer;
        bool isSealed;
        bool isRevealed;
        uint256 submittedAt;
        uint256 revealedAt;
    }
    
    struct FreelancerProfile {
        euint32 reputation;
        euint32 completedJobs;
        euint32 totalEarnings;
        string skills;
        bool isVerified;
        address wallet;
    }
    
    mapping(uint256 => Job) public jobs;
    mapping(uint256 => Bid) public bids;
    mapping(address => FreelancerProfile) public freelancers;
    mapping(uint256 => uint256[]) public jobBids; // jobId => bidIds[]
    
    uint256 public jobCounter;
    uint256 public bidCounter;
    
    address public owner;
    address public verifier;
    
    event JobCreated(uint256 indexed jobId, address indexed client, string title);
    event BidSubmitted(uint256 indexed bidId, uint256 indexed jobId, address indexed freelancer);
    event BidRevealed(uint256 indexed bidId, uint256 indexed jobId, address indexed freelancer);
    event JobCompleted(uint256 indexed jobId, address indexed freelancer, uint32 amount);
    event FreelancerRegistered(address indexed freelancer, string skills);
    event ReputationUpdated(address indexed freelancer, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    function registerFreelancer(
        string memory _skills,
        externalEuint32 initialReputation,
        bytes calldata inputProof
    ) public {
        require(freelancers[msg.sender].wallet == address(0), "Freelancer already registered");
        
        euint32 internalReputation = FHE.fromExternal(initialReputation, inputProof);
        
        freelancers[msg.sender] = FreelancerProfile({
            reputation: internalReputation,
            completedJobs: FHE.asEuint32(0),
            totalEarnings: FHE.asEuint32(0),
            skills: _skills,
            isVerified: false,
            wallet: msg.sender
        });
        
        emit FreelancerRegistered(msg.sender, _skills);
    }
    
    function createJob(
        string memory _title,
        string memory _description,
        uint256 _budget,
        uint256 _deliveryTime,
        uint256 _bidDeadline
    ) public payable returns (uint256) {
        require(bytes(_title).length > 0, "Job title cannot be empty");
        require(_budget > 0, "Budget must be positive");
        require(_bidDeadline > block.timestamp, "Bid deadline must be in the future");
        require(msg.value >= _budget, "Insufficient payment for job budget");
        
        uint256 jobId = jobCounter++;
        
        jobs[jobId] = Job({
            jobId: FHE.asEuint32(0), // Will be set properly later
            title: _title,
            description: _description,
            budget: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            deadline: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            client: msg.sender,
            isActive: true,
            isCompleted: false,
            createdAt: block.timestamp,
            bidDeadline: _bidDeadline
        });
        
        emit JobCreated(jobId, msg.sender, _title);
        return jobId;
    }
    
    function submitBid(
        uint256 _jobId,
        externalEuint32 _amount,
        externalEuint32 _deliveryTime,
        string memory _proposal,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(jobs[_jobId].client != address(0), "Job does not exist");
        require(jobs[_jobId].isActive, "Job is not active");
        require(block.timestamp <= jobs[_jobId].bidDeadline, "Bid deadline has passed");
        require(freelancers[msg.sender].wallet != address(0), "Freelancer not registered");
        
        uint256 bidId = bidCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(_amount, inputProof);
        euint32 internalDeliveryTime = FHE.fromExternal(_deliveryTime, inputProof);
        
        bids[bidId] = Bid({
            bidId: FHE.asEuint32(0), // Will be set properly later
            jobId: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            amount: internalAmount,
            deliveryTime: internalDeliveryTime,
            proposal: _proposal,
            freelancer: msg.sender,
            isSealed: true,
            isRevealed: false,
            submittedAt: block.timestamp,
            revealedAt: 0
        });
        
        jobBids[_jobId].push(bidId);
        
        emit BidSubmitted(bidId, _jobId, msg.sender);
        return bidId;
    }
    
    function revealBid(uint256 _bidId) public {
        require(bids[_bidId].freelancer == msg.sender, "Only bidder can reveal");
        require(bids[_bidId].isSealed, "Bid is not sealed");
        require(block.timestamp > jobs[uint256(FHE.decrypt(bids[_bidId].jobId))].bidDeadline, "Bid deadline not reached");
        
        bids[_bidId].isSealed = false;
        bids[_bidId].isRevealed = true;
        bids[_bidId].revealedAt = block.timestamp;
        
        uint256 jobId = uint256(FHE.decrypt(bids[_bidId].jobId));
        emit BidRevealed(_bidId, jobId, msg.sender);
    }
    
    function selectBid(uint256 _jobId, uint256 _bidId) public {
        require(jobs[_jobId].client == msg.sender, "Only job client can select bid");
        require(jobs[_jobId].isActive, "Job is not active");
        require(bids[_bidId].isRevealed, "Bid must be revealed first");
        require(block.timestamp > jobs[_jobId].bidDeadline, "Bid deadline not reached");
        
        // Mark job as completed and transfer funds
        jobs[_jobId].isActive = false;
        jobs[_jobId].isCompleted = true;
        
        // Update freelancer stats
        address freelancer = bids[_bidId].freelancer;
        freelancers[freelancer].completedJobs = FHE.add(freelancers[freelancer].completedJobs, FHE.asEuint32(1));
        freelancers[freelancer].totalEarnings = FHE.add(freelancers[freelancer].totalEarnings, bids[_bidId].amount);
        
        // Transfer payment to freelancer
        uint256 amount = uint256(FHE.decrypt(bids[_bidId].amount));
        payable(freelancer).transfer(amount);
        
        emit JobCompleted(_jobId, freelancer, uint32(amount));
    }
    
    function verifyFreelancer(address _freelancer, bool _isVerified) public onlyVerifier {
        require(freelancers[_freelancer].wallet != address(0), "Freelancer not registered");
        freelancers[_freelancer].isVerified = _isVerified;
    }
    
    function updateReputation(address _freelancer, euint32 _reputation) public onlyVerifier {
        require(freelancers[_freelancer].wallet != address(0), "Freelancer not registered");
        freelancers[_freelancer].reputation = _reputation;
        emit ReputationUpdated(_freelancer, 0); // FHE.decrypt(_reputation) - will be decrypted off-chain
    }
    
    function getJobInfo(uint256 _jobId) public view returns (
        string memory title,
        string memory description,
        uint8 budget,
        uint8 deadline,
        address client,
        bool isActive,
        bool isCompleted,
        uint256 createdAt,
        uint256 bidDeadline
    ) {
        Job storage job = jobs[_jobId];
        return (
            job.title,
            job.description,
            0, // FHE.decrypt(job.budget) - will be decrypted off-chain
            0, // FHE.decrypt(job.deadline) - will be decrypted off-chain
            job.client,
            job.isActive,
            job.isCompleted,
            job.createdAt,
            job.bidDeadline
        );
    }
    
    function getBidInfo(uint256 _bidId) public view returns (
        uint8 amount,
        uint8 deliveryTime,
        string memory proposal,
        address freelancer,
        bool isSealed,
        bool isRevealed,
        uint256 submittedAt,
        uint256 revealedAt
    ) {
        Bid storage bid = bids[_bidId];
        return (
            0, // FHE.decrypt(bid.amount) - will be decrypted off-chain
            0, // FHE.decrypt(bid.deliveryTime) - will be decrypted off-chain
            bid.proposal,
            bid.freelancer,
            bid.isSealed,
            bid.isRevealed,
            bid.submittedAt,
            bid.revealedAt
        );
    }
    
    function getFreelancerInfo(address _freelancer) public view returns (
        uint8 reputation,
        uint8 completedJobs,
        uint8 totalEarnings,
        string memory skills,
        bool isVerified
    ) {
        FreelancerProfile storage profile = freelancers[_freelancer];
        return (
            0, // FHE.decrypt(profile.reputation) - will be decrypted off-chain
            0, // FHE.decrypt(profile.completedJobs) - will be decrypted off-chain
            0, // FHE.decrypt(profile.totalEarnings) - will be decrypted off-chain
            profile.skills,
            profile.isVerified
        );
    }
    
    function getJobBids(uint256 _jobId) public view returns (uint256[] memory) {
        return jobBids[_jobId];
    }
    
    function withdrawFunds() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
