import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, DollarSign, Users, Lock } from "lucide-react";
import { BidSubmission } from "./BidSubmission";

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

interface JobListingProps {
  job: Job;
  isWalletConnected?: boolean;
  onConnectWallet?: () => void;
}

export const JobListing = ({ job, isWalletConnected = false, onConnectWallet }: JobListingProps) => {
  return (
    <Card className="envelope-sealed hover:shadow-envelope transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {job.title}
            </CardTitle>
            <CardDescription className="mt-2 line-clamp-2">
              {job.description}
            </CardDescription>
          </div>
          {job.isSealed && (
            <div className="sealed-badge">
              <Lock className="w-3 h-3 mr-1" />
              Sealed
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span>{job.budget}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{job.deadline}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{job.bidsCount} sealed bids</span>
          </div>
          
          <BidSubmission 
            job={job} 
            isWalletConnected={isWalletConnected}
            onConnectWallet={onConnectWallet || (() => {})}
          />
        </div>
      </CardContent>
    </Card>
  );
};