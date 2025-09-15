import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Shield, Timer, DollarSign, FileText, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Job {
  id: number;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  skills: string[];
  bidsCount: number;
  isSealed: boolean;
}

interface BidSubmissionProps {
  job: Job;
  isWalletConnected: boolean;
  onConnectWallet: () => void;
}

export const BidSubmission = ({ job, isWalletConnected, onConnectWallet }: BidSubmissionProps) => {
  const [bidAmount, setBidAmount] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [proposal, setProposal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitBid = async () => {
    setIsSubmitting(true);
    
    // Simulate bid submission with encryption
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after success message
      setTimeout(() => {
        setIsSubmitted(false);
        setBidAmount("");
        setDeliveryTime("");
        setProposal("");
      }, 3000);
    }, 2000);
  };

  if (!isWalletConnected) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="bg-primary hover:bg-primary-dark text-white">
            Submit Bid
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Wallet Required
            </DialogTitle>
            <DialogDescription>
              Connect your wallet to submit confidential bids
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <Shield className="w-12 h-12 text-accent mx-auto" />
                  <div>
                    <h3 className="font-semibold text-accent">Secure Bidding</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your bid will be encrypted and sealed until the deadline
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={onConnectWallet} className="w-full wallet-connect-btn">
              Connect Wallet to Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary hover:bg-primary-dark text-white">
          Submit Bid
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Submit Confidential Bid
          </DialogTitle>
          <DialogDescription>
            Your bid will be encrypted and sealed until {job.deadline}
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-accent">Bid Submitted Successfully!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your encrypted bid has been sealed and recorded on the blockchain
              </p>
            </div>
            <Badge className="bg-accent/10 text-accent">
              <Lock className="w-3 h-3 mr-1" />
              Sealed Until Deadline
            </Badge>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Job Summary */}
            <Card className="bg-accent/5 border-accent/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">{job.title}</CardTitle>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <Timer className="w-4 h-4" />
                      {job.deadline}
                    </span>
                  </div>
                  <Badge variant="secondary">
                    {job.bidsCount} sealed bids
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Bid Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bidAmount">Your Bid Amount</Label>
                  <Input
                    id="bidAmount"
                    type="text"
                    placeholder="e.g. $5,000"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryTime">Delivery Time</Label>
                  <Input
                    id="deliveryTime"
                    type="text"
                    placeholder="e.g. 3 weeks"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposal">Proposal Details</Label>
                <Textarea
                  id="proposal"
                  placeholder="Describe your approach, experience, and why you're the best fit for this project..."
                  rows={6}
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                />
              </div>
            </div>

            {/* Security Notice */}
            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-accent mb-1">Encrypted & Sealed</p>
                    <p className="text-muted-foreground">
                      Your bid will be encrypted using advanced cryptography and sealed on the blockchain. 
                      No one can see your bid until the deadline, ensuring fair competition.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <DialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogTrigger>
              <Button 
                onClick={handleSubmitBid}
                disabled={!bidAmount || !deliveryTime || !proposal || isSubmitting}
                className="wallet-connect-btn"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Encrypting & Sealing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Sealed Bid
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};