import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Shield, Lock, Eye, ChevronRight, Briefcase } from "lucide-react";
import { JobListing } from "@/components/JobListing";
import { WalletConnect } from "@/components/WalletConnect";
import { useAccount } from 'wagmi';
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const { isConnected } = useAccount();

  const featuredJobs = [
    {
      id: 1,
      title: "Full-Stack Web Application Development",
      description: "Looking for an experienced developer to build a modern web application with React and Node.js",
      budget: "$5,000 - $8,000",
      deadline: "4 weeks",
      skills: ["React", "Node.js", "MongoDB", "TypeScript"],
      bidsCount: 12,
      isSealed: true
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      description: "Need a creative designer to design a modern mobile app interface with excellent user experience",
      budget: "$2,000 - $3,500",
      deadline: "3 weeks",
      skills: ["Figma", "UI/UX", "Mobile Design", "Prototyping"],
      bidsCount: 8,
      isSealed: true
    },
    {
      id: 3,
      title: "Blockchain Smart Contract Development",
      description: "Experienced Solidity developer needed for DeFi protocol smart contracts with security audit",
      budget: "$8,000 - $12,000",
      deadline: "6 weeks",
      skills: ["Solidity", "Web3", "DeFi", "Security"],
      bidsCount: 15,
      isSealed: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">BidShield</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="#jobs" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Browse Jobs
            </a>
            <a 
              href="#how-it-works" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              How It Works
            </a>
            <a 
              href="#security" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('security')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Security
            </a>
          </nav>

          <WalletConnect />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Bid Confidentially,
                  <br />
                  <span className="text-accent">Work Fairly</span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Submit encrypted job proposals so competitors cannot undercut your bids. 
                  Fair marketplace for freelancers with blockchain-secured confidentiality.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="wallet-connect-btn">
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect Wallet to Start
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2 text-white/80">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-sm">Encrypted Bids</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Lock className="w-5 h-5 text-accent" />
                  <span className="text-sm">Blockchain Secured</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Eye className="w-5 h-5 text-accent" />
                  <span className="text-sm">Fair Competition</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Confidential bidding platform interface"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-full flex items-center justify-center animate-pulse-glow">
                <Lock className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Confidential Bidding Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our encrypted bidding system ensures fair competition while protecting your pricing strategy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-gradient border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">1. Browse Jobs</CardTitle>
                <CardDescription className="text-base">
                  Find high-quality projects from verified clients. Filter by skills, budget, and timeline to discover perfect matches for your expertise.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Verified client profiles</li>
                  <li>• Advanced filtering options</li>
                  <li>• Detailed project requirements</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-gradient border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl mb-3">2. Submit Sealed Bid</CardTitle>
                <CardDescription className="text-base">
                  Your proposal is encrypted using advanced cryptography and sealed on the blockchain until the bidding deadline expires.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• End-to-end encryption</li>
                  <li>• Blockchain-secured sealing</li>
                  <li>• No bid visibility until deadline</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-gradient border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">3. Fair Selection</CardTitle>
                <CardDescription className="text-base">
                  All sealed bids are revealed simultaneously at the deadline, ensuring fair evaluation based on merit, not competition.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Simultaneous bid reveal</li>
                  <li>• Merit-based selection</li>
                  <li>• Transparent evaluation process</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 bg-foreground text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Your bids are protected by military-grade encryption and blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AES-256 Encryption</h3>
              <p className="text-white/70">
                Military-grade encryption ensures your bid details remain completely confidential
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Blockchain Sealed</h3>
              <p className="text-white/70">
                Smart contracts ensure bids cannot be viewed or tampered with until deadline
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Zero Knowledge</h3>
              <p className="text-white/70">
                Even we cannot see your bid contents - only you and the client can
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Wallet Secured</h3>
              <p className="text-white/70">
                Your identity and bids are tied to your crypto wallet for maximum security
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto border border-white/10">
              <h3 className="text-2xl font-bold mb-4">How Sealed Bidding Works</h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold mb-3">1</div>
                  <h4 className="font-semibold mb-2">Encrypt Locally</h4>
                  <p className="text-white/70 text-sm">Your bid is encrypted on your device before transmission</p>
                </div>
                <div>
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold mb-3">2</div>
                  <h4 className="font-semibold mb-2">Blockchain Seal</h4>
                  <p className="text-white/70 text-sm">Encrypted bid is sealed in a smart contract until deadline</p>
                </div>
                <div>
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold mb-3">3</div>
                  <h4 className="font-semibold mb-2">Fair Reveal</h4>
                  <p className="text-white/70 text-sm">All bids revealed simultaneously for transparent selection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section id="jobs" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Opportunities
            </h2>
            <p className="text-lg text-muted-foreground">
              Start bidding on high-quality projects with confidential proposals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobListing 
                key={job.id} 
                job={job} 
                isWalletConnected={isConnected}
                onConnectWallet={() => {}}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="wallet-connect-btn"
              onClick={() => {
                document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View All Jobs
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Lock className="w-3 h-3 text-white" />
                </div>
                <span className="font-bold">BidShield</span>
              </div>
              <p className="text-white/70 text-sm">
                The first confidential freelancer bidding platform powered by blockchain technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/70">
            © 2024 BidShield. All rights reserved. Built with blockchain security and FHE encryption.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;