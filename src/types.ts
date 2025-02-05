export interface TripPreference {
  userId: string;
  location: string;
  budget: "budget" | "moderate" | "luxury";
  interests: string[];
  dates: {
    start: string;
    end: string;
  };
  travelStyle?: string;
  pacePreference?: string;
  accommodationType?: string;
  mustSeeAttractions?: string;
  sessionId: string;
  memberName: string;
  submittedAt?: string;
}

export interface TripPlan {
  destination: string;
  activities: string[];
  accommodation: string;
  transportation: string;
  estimatedCost: string;
  schedule: Array<{
    day: number;
    activities: string[];
  }>;
}

export interface TripSession {
  id: string;
  name: string;
  createdAt: string;
  groupSize: number;
  preferences: TripPreference[];
  status: "collecting" | "planning" | "completed";
  plan?: TripPlan;
}
