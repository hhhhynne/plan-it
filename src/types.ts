export interface TripPreference {
  userId: string;
  location: string;
  budget: 'budget' | 'moderate' | 'luxury';
  interests: string[];
  dates: {
    start: string;
    end: string;
  };
  travelStyle?: string;
  pacePreference?: string;
  dietaryRestrictions?: string[];
  accommodationType?: string;
  mustSeeAttractions?: string;
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