import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { CreateTrip } from "./components/CreateTrip";
import { JoinTrip } from "./components/JoinTrip";
import { TripDashboard } from "./components/TripDashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Routes>
            <Route path="/" element={<CreateTrip />} />
            <Route path="/trip/:sessionId" element={<TripDashboard />} />
            <Route path="/trip/:sessionId/join" element={<JoinTrip />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
