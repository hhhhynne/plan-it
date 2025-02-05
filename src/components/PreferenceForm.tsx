import React from "react";
import { PlaneTakeoff, Heart, Calendar } from "lucide-react";
import type { TripPreference } from "../types";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";

interface PreferenceFormProps {
  onSubmit: (preferences: TripPreference) => void;
  initialData?: TripPreference | null;
}

export function PreferenceForm({ onSubmit, initialData }: PreferenceFormProps) {
  const [preferences, setPreferences] = React.useState<TripPreference>(
    () =>
      initialData || {
        userId: crypto.randomUUID(),
        location: "",
        budget: "moderate",
        interests: [],
        dates: {
          start: "",
          end: "",
        },
        travelStyle: "balanced",
        pacePreference: "moderate",
        accommodationType: "hotel",
        mustSeeAttractions: "",
      }
  );

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
          <Input
            type="text"
            required
            className="pl-10 px-8 block w-full rounded-md border-gray-300 shadow-sm focus:!ring-blue-500"
            placeholder="e.g., Europe, Southeast Asia"
            value={preferences.location}
            onChange={(e) =>
              setPreferences({ ...preferences, location: e.target.value })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Budget Range
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <Select
              value={preferences.budget}
              onValueChange={(value) =>
                setPreferences({
                  ...preferences,
                  budget: value as TripPreference["budget"],
                })
              }
            >
              <SelectTrigger className="p-5">
                <SelectValue placeholder="Select a budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Travel Style
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <Select
              value={preferences.travelStyle}
              onValueChange={(value) =>
                setPreferences({
                  ...preferences,
                  travelStyle: value as TripPreference["travelStyle"],
                })
              }
            >
              <SelectTrigger className="p-5">
                <SelectValue placeholder="Select a travel style" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="backpacker">Backpacker</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:!ring-blue-500 min-h-[120px]"
            value={preferences.interests}
            onChange={(e) => {
              const values = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
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
          <Select
            value={preferences.accommodationType}
            onValueChange={(value) =>
              setPreferences({
                ...preferences,
                accommodationType: value as TripPreference["accommodationType"],
              })
            }
          >
            <SelectTrigger className="p-5">
              <SelectValue placeholder="Select an accomodation preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="resort">Resort</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="hostel">Hostel</SelectItem>
                <SelectItem value="boutique">Boutique</SelectItem>
                <SelectItem value="camping">Camping</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Trip Pace
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <Select
            value={preferences.pacePreference}
            onValueChange={(value) =>
              setPreferences({
                ...preferences,
                pacePreference: value as TripPreference["pacePreference"],
              })
            }
          >
            <SelectTrigger className="pl-5">
              <SelectValue placeholder="Select a pace preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="relaxed">
                  Relaxed - Plenty of free time
                </SelectItem>
                <SelectItem value="moderate">
                  Moderate - Balanced schedule
                </SelectItem>
                <SelectItem value="busy">
                  Busy - Pack in the activities
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Must-See Attractions/Activities
        </label>
        <div className="mt-1">
          <Textarea
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:!ring-blue-500"
            placeholder="Enter any specific attractions or activities you don't want to miss..."
            value={preferences.mustSeeAttractions}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                mustSeeAttractions: e.target.value,
              })
            }
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
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  dates: { ...preferences.dates, start: e.target.value },
                })
              }
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
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  dates: { ...preferences.dates, end: e.target.value },
                })
              }
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
