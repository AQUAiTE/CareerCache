import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import Authenticated from "./auth/Authenticated";
import Home from "./home/Home";
import Login from "./login/Login";
import MainLayout from "./layout/MainLayout";
import AllTimeAnalytics from "./analytics/AllTime";
import ThirtyDaysAnalytics from "./analytics/ThirtyDays";
import SixMonthsAnalytics from "./analytics/SixMonths";
import PastYearAnalytics from "./analytics/PastYear";
import Dashboard from "./dashboard/Dashboard";
import Analytics from "./analytics/Analytics";
import Chatbot from "./chatbot/Chatbot";

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/thirty-days" element={<ThirtyDaysAnalytics />} />
            <Route path="/six-months" element={<SixMonthsAnalytics />} />
            <Route path="/year" element={<PastYearAnalytics />} />
            <Route path="/alltime" element={<AllTimeAnalytics />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/chat" element={<Chatbot />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
