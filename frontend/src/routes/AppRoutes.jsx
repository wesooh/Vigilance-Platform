import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import ProtectedRoute from "./ProtectedRoute";

import ClientDashboard from "../pages/client/ClientDashboard";
import WorkerDashboard from "../pages/worker/WorkerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";

import DashboardLayout from "../layouts/DashboardLayout";

import WorkerProfile from "../pages/client/WorkerProfile";
import FindWorkers from "../pages/client/FindWorkers";

import PublicRoute from "./PublicRoute";

import EditProfile from "../pages/worker/EditProfile";

import WorkerBookings from "../pages/worker/WorkerBookings";

import WorkerEarnings from "../pages/worker/WorkerEarnings";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC PAGE */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* PUBLIC ROUTES */}
        <Route
  path="/login"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>

<Route
  path="/register"
  element={
    <PublicRoute>
      <Register />
    </PublicRoute>
  }
/>

        {/* CLIENT DASHBOARD */}
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ClientDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* WORKER DASHBOARD (FIXED) */}
        <Route
          path="/worker/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <WorkerDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* WORKER PROFILE */}
        <Route
          path="/client/worker/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <WorkerProfile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/client/find-workers"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <FindWorkers />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />    

        <Route
  path="/worker/edit-profile"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <EditProfile />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
        <Route
  path="/worker/bookings"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <WorkerBookings />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
        <Route
  path="/worker/earnings"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <WorkerEarnings />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;