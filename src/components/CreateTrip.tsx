import React from "react";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../lib/mockApi";

export function CreateTrip() {
  const [tripName, setTripName] = React.useState("");
  const [groupSize, setGroupSize] = React.useState(1);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const trip = await mockApi.createTrip({
        name: tripName,
        groupSize,
      });

      navigate(`/trip/${trip.id}`);
    } catch (error) {
      console.error("Failed to create trip:", error);
      setError("Failed to create trip. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center p-2 rounded-full mb-6 ">

            
<img 
src="/Planit.svg" 
alt="Plane icon" 
className="h-[170px] w-[170px] text-white transform -rotate-45"
/>
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Group Trip Planner
        </h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form
        onSubmit={handleCreateTrip}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip Name
            </label>
            <input
              type="text"
              required
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="Summer Vacation 2024"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How many people are traveling?
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={groupSize}
              onChange={(e) =>
                setGroupSize(
                  Math.min(10, Math.max(1, parseInt(e.target.value) || 1))
                )
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700"
          >
            Create Trip
          </button>
        </div>
      </form>
    </div>
  );
}
