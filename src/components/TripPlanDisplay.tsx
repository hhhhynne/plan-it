import { Calendar, MapPin, DollarSign, Hotel, Car } from "lucide-react";
import type { TripPlan } from "../types";

interface TripPlanDisplayProps {
  plan: TripPlan;
}

export function TripPlanDisplay({ plan }: TripPlanDisplayProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80')] opacity-20 bg-cover bg-center" />
        <div className="relative">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 backdrop-blur-lg rounded-xl">
              <MapPin className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm text-blue-200">Your Destination</p>
              <h2 className="text-3xl font-bold">{plan.destination}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
            <Hotel className="h-6 w-6 text-blue-600 mb-3" />
            <p className="text-sm text-gray-500 mb-1">Accommodation</p>
            <p className="font-medium text-gray-900">{plan.accommodation}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
            <Car className="h-6 w-6 text-blue-600 mb-3" />
            <p className="text-sm text-gray-500 mb-1">Transportation</p>
            <p className="font-medium text-gray-900">{plan.transportation}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
            <DollarSign className="h-6 w-6 text-blue-600 mb-3" />
            <p className="text-sm text-gray-500 mb-1">Estimated Cost</p>
            <p className="font-medium text-gray-900">{plan.estimatedCost}</p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-900 flex items-center mb-6">
            <Calendar className="h-7 w-7 mr-3 text-blue-600" />
            Your Journey
          </h3>
          <div className="space-y-6">
            {plan.schedule.map((day) => (
              <div key={day.day} className="relative pl-8 pb-8">
                <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-blue-600 to-purple-600" />
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 ring-4 ring-white" />
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h4 className="font-semibold text-lg text-gray-900 mb-4">
                    Day {day.day}
                  </h4>
                  <ul className="space-y-4">
                    {day.activities.map((activity, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-2"></span>
                        <span className="text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
