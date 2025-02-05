import type { TripSession, TripPlan } from "../types";
import { generateTripPlan } from "./openai";

// Mock API using localStorage
export const mockApi = {
  createTrip: async (data: {
    name: string;
    groupSize: number;
  }): Promise<TripSession> => {
    const id = crypto.randomUUID();
    const session: TripSession = {
      id,
      name: data.name,
      createdAt: new Date().toISOString(),
      groupSize: data.groupSize,
      preferences: [],
      status: "collecting",
    };

    // Store in localStorage
    const trips = JSON.parse(localStorage.getItem("trips") || "{}");
    trips[id] = session;
    localStorage.setItem("trips", JSON.stringify(trips));

    return session;
  },

  getTrip: async (id: string): Promise<TripSession> => {
    const trips = JSON.parse(localStorage.getItem("trips") || "{}");
    const trip = trips[id];
    if (!trip) throw new Error("Trip not found");
    return trip;
  },

  addPreference: async (tripId: string, preference: any): Promise<void> => {
    const trips = JSON.parse(localStorage.getItem("trips") || "{}");
    const trip = trips[tripId];
    if (!trip) throw new Error("Trip not found");

    trip.preferences.push(preference);

    // If all members have submitted preferences, generate the plan
    if (trip.preferences.length === trip.groupSize) {
      trip.status = "planning";
      try {
        const plan = await generateTripPlan(trip.preferences);
        trip.plan = plan;
        trip.status = "completed";
      } catch (error) {
        console.error("Failed to generate plan:", error);
        trip.status = "collecting"; // Reset status on error
      }
    }

    localStorage.setItem("trips", JSON.stringify(trips));
  },

  updateTrip: async (updatedSession: TripSession): Promise<void> => {
    const trips = JSON.parse(localStorage.getItem("trips") || "{}");
    trips[updatedSession.id] = updatedSession;
    localStorage.setItem("trips", JSON.stringify(trips));
  },
};
