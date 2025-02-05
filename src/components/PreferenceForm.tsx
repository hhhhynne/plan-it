import React from 'react';
import { PlaneTakeoff, DollarSign, Heart, Calendar, Clock, Users } from 'lucide-react';
import type { TripPreference } from '../types';

interface PreferenceFormProps {
  onSubmit: (preferences: TripPreference) => void;
  initialData?: TripPreference | null;
}

export function PreferenceForm({ onSubmit, initialData }: PreferenceFormProps) {
  const [preferences, setPreferences] = React.useState<TripPreference>(() => initialData || {
    userId: crypto.randomUUID(),
    location: '',
    budget: 'moderate',
    interests: [],
    dates: {
      start: '',
      end: ''
    },
    travelStyle: 'balanced',
    pacePreference: 'moderate',
    dietaryRestrictions: [],
    accommodationType: 'hotel',
    mustSeeAttractions: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Desired Location
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <PlaneTakeoff className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            required
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., Europe, Southeast Asia"
            value={preferences.location}
            onChange={(e) => setPreferences({ ...preferences, location: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Budget Range
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={preferences.budget}
              onChange={(e) => setPreferences({ ...preferences, budget: e.target.value as TripPreference['budget'] })}
            >
              <option value="budget">Budget</option>
              <option value="moderate">Moderate</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Travel Style
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={preferences.travelStyle}
              onChange={(e) => setPreferences({ ...preferences, travelStyle: e.target.value })}
            >
              <option value="luxury">Luxury</option>
              <option value="balanced">Balanced</option>
              <option value="backpacker">Backpacker</option>
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural Immersion</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Interests
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Heart className="h-5 w-5 text-gray-400" />
          </div>
          <select
            multiple
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
            value={preferences.interests}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, option => option.value);
              setPreferences({ ...preferences, interests: values });
            }}
          >
            <option value="city">City Exploration</option>
            <option value="beach">Beach & Relaxation</option>
            <option value="culture">Culture & History</option>
            <option value="nature">Nature & Outdoors</option>
            <option value="food">Food & Cuisine</option>
            <option value="adventure">Adventure Activities</option>
            <option value="shopping">Shopping</option>
            <option value="nightlife">Nightlife</option>
            <option value="wellness">Wellness & Spa</option>
            <option value="photography">Photography</option>
            <option value="art">Art & Museums</option>
            <option value="sports">Sports & Recreation</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Accommodation Preference
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={preferences.accommodationType}
            onChange={(e) => setPreferences({ ...preferences, accommodationType: e.target.value })}
          >
            <option value="hotel">Hotel</option>
            <option value="resort">Resort</option>
            <option value="apartment">Apartment/Vacation Rental</option>
            <option value="hostel">Hostel</option>
            <option value="boutique">Boutique Hotel</option>
            <option value="camping">Camping/Glamping</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Trip Pace
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={preferences.pacePreference}
            onChange={(e) => setPreferences({ ...preferences, pacePreference: e.target.value })}
          >
            <option value="relaxed">Relaxed - Plenty of free time</option>
            <option value="moderate">Moderate - Balanced schedule</option>
            <option value="busy">Busy - Pack in the activities</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Dietary Restrictions
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <select
            multiple
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
            value={preferences.dietaryRestrictions}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, option => option.value);
              setPreferences({ ...preferences, dietaryRestrictions: values });
            }}
          >
            <option value="none">None</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="glutenFree">Gluten-free</option>
            <option value="dairyFree">Dairy-free</option>
            <option value="kosher">Kosher</option>
            <option value="halal">Halal</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Must-See Attractions/Activities
        </label>
        <div className="mt-1">
          <textarea
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter any specific attractions or activities you don't want to miss..."
            value={preferences.mustSeeAttractions}
            onChange={(e) => setPreferences({ ...preferences, mustSeeAttractions: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              required
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={preferences.dates.start}
              onChange={(e) => setPreferences({
                ...preferences,
                dates: { ...preferences.dates, start: e.target.value }
              })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              required
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={preferences.dates.end}
              onChange={(e) => setPreferences({
                ...preferences,
                dates: { ...preferences.dates, end: e.target.value }
              })}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Save Preferences
      </button>
    </form>
  );
}