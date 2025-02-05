import React from "react";
import { useParams, Link } from "react-router-dom";
import { Share2, Users, Clock, Sparkles } from "lucide-react";
import { TripPlanDisplay } from "./TripPlanDisplay";
import type { TripSession } from "../types";
import { mockApi } from "../lib/mockApi";
import { generateTripPlan } from "../lib/openai";

export function TripDashboard() {
  const { sessionId } = useParams();
  const [session, setSession] = React.useState<TripSession | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);

  React.useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await mockApi.getTrip(sessionId!);
        setSession(data);
      } catch (error) {
        console.error("Error fetching trip:", error);
        setError("Failed to load trip details");
      }
    };

    fetchSession();
  }, [sessionId]);

  const handleCopyLink = () => {
    const joinLink = `${window.location.origin}/trip/${sessionId}/join`;
    navigator.clipboard.writeText(joinLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGeneratePlan = async () => {
    if (!session || isGenerating) return;

    setIsGenerating(true);
    try {
      const plan = await generateTripPlan(session.preferences);
      const updatedSession = {
        ...session,
        plan,
        status: "completed" as const,
      };
      await mockApi.updateTrip(updatedSession);
      setSession(updatedSession);
    } catch (error) {
      console.error("Failed to generate plan:", error);
      setError("Failed to generate trip plan. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (error) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{session.name}</h1>
            <div className="flex items-center space-x-4 mt-2 text-gray-500">
              <span className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                {session.preferences.length}/{session.groupSize} joined
              </span>
              <span className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Created {new Date(session.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Share2 className="w-5 h-5 mr-2" />
            {copied ? "Copied!" : "Share"}
          </button>
        </div>

        {session.preferences.length > 0 && !session.plan && (
          <div className="bg-blue-50 p-6 rounded-xl mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  {session.preferences.length < session.groupSize
                    ? "Waiting for everyone to join"
                    : "Ready to Generate Plan"}
                </h3>
                <p className="text-blue-700">
                  {session.preferences.length < session.groupSize
                    ? "Share the link with your group members to collect their preferences"
                    : "All preferences collected! Generate your trip plan."}
                </p>
              </div>

              <button
                onClick={handleGeneratePlan}
                disabled={session.preferences.length === 0 || isGenerating}
                className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                  isGenerating
                    ? "bg-gray-100 text-gray-400"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {isGenerating ? "Generating..." : "Generate Plan"}
              </button>
            </div>
          </div>
        )}

        {/* Show collected preferences */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Collected Preferences</h3>
          <div className="space-y-4">
            {session.preferences.map((pref, index) => (
              <div
                key={pref.userId}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {pref.memberName || `Member ${index + 1}`}
                    </h4>
                    <p className="text-sm text-gray-600">📍 {pref.location}</p>
                    <p className="text-sm text-gray-600">
                      💰 Budget: {pref.budget}
                    </p>
                    <p className="text-sm text-gray-600">
                      ✨ Interests: {pref.interests.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {session.plan && <TripPlanDisplay plan={session.plan} />}
      </div>
    </div>
  );
}
