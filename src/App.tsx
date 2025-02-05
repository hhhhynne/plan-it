import React from 'react';
import { Sparkles, PlusCircle, X, Plane } from 'lucide-react';
import { PreferenceForm } from './components/PreferenceForm';
import { TripPlanDisplay } from './components/TripPlanDisplay';
import type { TripPreference, TripPlan } from './types';
import { generateTripPlan } from './lib/openai';

function App() {
  const [preferences, setPreferences] = React.useState<TripPreference[]>([]);
  const [tripPlan, setTripPlan] = React.useState<TripPlan | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [groupSize, setGroupSize] = React.useState(1);
  const [currentMemberIndex, setCurrentMemberIndex] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  const handlePreferenceSubmit = async (newPreference: TripPreference) => {
    const updatedPreferences = [...preferences];
    updatedPreferences[currentMemberIndex] = newPreference;
    setPreferences(updatedPreferences);

    if (currentMemberIndex < groupSize - 1) {
      setCurrentMemberIndex(prev => prev + 1);
    } else {
      setIsLoading(true);
      setError(null);
      try {
        const plan = await generateTripPlan(updatedPreferences);
        setTripPlan(plan);
      } catch (error) {
        console.error('Error generating trip plan:', error);
        setError('Failed to generate trip plan. Please check your OpenAI API key and try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRemovePreference = (index: number) => {
    setPreferences(prev => prev.filter((_, i) => i !== index));
    if (currentMemberIndex >= index) {
      setCurrentMemberIndex(prev => Math.max(0, prev - 1));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-blue-600 rounded-full mb-6 animate-pulse">
            <Plane className="h-12 w-12 text-white transform -rotate-45" />
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Group Trip Planner
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create your perfect group getaway with AI-powered travel recommendations
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {preferences.length === 0 && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Start Your Journey</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How many people are traveling?
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={groupSize}
                    onChange={(e) => setGroupSize(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
                  />
                </div>
                <button
                  onClick={() => setPreferences(new Array(groupSize).fill(null))}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Start Planning</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {preferences.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg backdrop-filter">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold flex items-center text-gray-800">
                    <Sparkles className="h-6 w-6 mr-2 text-blue-600" />
                    Member {currentMemberIndex + 1} Preferences
                  </h2>
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {currentMemberIndex + 1} of {groupSize}
                  </span>
                </div>
                <PreferenceForm 
                  onSubmit={handlePreferenceSubmit}
                  initialData={preferences[currentMemberIndex]}
                />
              </div>

              {preferences.some(p => p) && (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-xl font-semibold mb-6 text-gray-800">Group Members</h3>
                  <div className="space-y-4">
                    {preferences.map((pref, index) => pref && (
                      <div key={pref.userId} 
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                          index === currentMemberIndex 
                            ? 'border-blue-500 bg-blue-50 shadow-md' 
                            : 'border-gray-100 hover:border-blue-200'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-lg text-gray-800">Member {index + 1}</h4>
                            <p className="text-sm text-gray-600">📍 {pref.location}</p>
                            <p className="text-sm text-gray-600">💰 Budget: {pref.budget}</p>
                            <p className="text-sm text-gray-600">
                              ✨ Interests: {pref.interests.join(', ')}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemovePreference(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              {isLoading ? (
                <div className="bg-white rounded-2xl shadow-xl p-12 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <Plane className="h-8 w-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-gray-600 mt-6 text-lg">Creating your perfect trip plan...</p>
                </div>
              ) : tripPlan ? (
                <TripPlanDisplay plan={tripPlan} />
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                  <div className="mb-6 p-4 bg-blue-50 rounded-full">
                    <PlusCircle className="h-12 w-12 text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-lg max-w-md">
                    Complete all member preferences to see your AI-generated trip plan
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;