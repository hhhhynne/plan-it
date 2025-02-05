import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PreferenceForm } from "./PreferenceForm";
import type { TripPreference } from "../types";
import { mockApi } from "../lib/mockApi";

export function JoinTrip() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [memberName, setMemberName] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmitPreference = async (preference: TripPreference) => {
    try {
      await mockApi.addPreference(sessionId!, {
        ...preference,
        memberName,
        sessionId,
        submittedAt: new Date().toISOString(),
      });

      navigate(`/trip/${sessionId}`);
    } catch (error) {
      console.error("Error submitting preferences:", error);
      setError("Failed to submit preferences. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold mb-6">Join Trip Planning</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            required
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <PreferenceForm onSubmit={handleSubmitPreference} />
      </div>
    </div>
  );
}
