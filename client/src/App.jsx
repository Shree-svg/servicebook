import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PremiumPlans from './pages/PremiumPlans';

// Customer Pages
import Step1Schedule from './pages/booking/Step1Schedule';
import Step2Address from './pages/booking/Step2Address';
import Step3Payment from './pages/booking/Step3Payment';
import Step4Summary from './pages/booking/Step4Summary';
import BookingSuccess from './pages/booking/BookingSuccess';
import TrackService from './pages/TrackService';
import CustomerDashboard from './pages/Dashboard';
import Rewards from './pages/Rewards';
import HelpCenter from './pages/HelpCenter';
import RateExperience from './pages/RateExperience';

// Provider Pages
import JobManagement from './pages/provider/JobManagement';
import ProviderWallet from './pages/provider/Wallet';
import Analytics from './pages/provider/PerformanceAnalytics';
import ProviderRewards from './pages/provider/ProviderRewards';

// Admin Pages
import AdminVerification from './pages/admin/ProviderVerification';
import DisputeQueue from './pages/admin/DisputeQueue';
import DisputeDetails from './pages/admin/DisputeDetails';

// Admin Layout (Optional but usually good for admin panels)
import AdminLayout from './components/AdminLayout';

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/plans" element={<PremiumPlans />} />

          {/* CUSTOMER ROUTES (Protected: role "user") */}
          <Route path="/booking/step1" element={<ProtectedRoute allowedRoles={['user', 'admin']}><Step1Schedule /></ProtectedRoute>} />
          <Route path="/booking/step2" element={<ProtectedRoute allowedRoles={['user', 'admin']}><Step2Address /></ProtectedRoute>} />
          <Route path="/booking/step3" element={<ProtectedRoute allowedRoles={['user', 'admin']}><Step3Payment /></ProtectedRoute>} />
          <Route path="/booking/step4" element={<ProtectedRoute allowedRoles={['user', 'admin']}><Step4Summary /></ProtectedRoute>} />
          <Route path="/booking/success" element={<ProtectedRoute allowedRoles={['user', 'admin']}><BookingSuccess /></ProtectedRoute>} />
          <Route path="/track/:id" element={<ProtectedRoute allowedRoles={['user', 'admin']}><TrackService /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['user', 'admin']}><CustomerDashboard /></ProtectedRoute>} />
          <Route path="/rewards" element={<ProtectedRoute allowedRoles={['user', 'admin']}><Rewards /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute allowedRoles={['user', 'admin']}><HelpCenter /></ProtectedRoute>} />
          <Route path="/rate/:id" element={<ProtectedRoute allowedRoles={['user', 'admin']}><RateExperience /></ProtectedRoute>} />

          {/* PROVIDER ROUTES (Protected: role "provider") */}
          <Route path="/provider/jobs" element={<ProtectedRoute allowedRoles={['provider', 'admin']}><JobManagement /></ProtectedRoute>} />
          <Route path="/provider/wallet" element={<ProtectedRoute allowedRoles={['provider', 'admin']}><ProviderWallet /></ProtectedRoute>} />
          <Route path="/provider/analytics" element={<ProtectedRoute allowedRoles={['provider', 'admin']}><Analytics /></ProtectedRoute>} />
          <Route path="/provider/rewards" element={<ProtectedRoute allowedRoles={['provider', 'admin']}><ProviderRewards /></ProtectedRoute>} />

          {/* ADMIN ROUTES (Protected: role "admin") */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}> 
            <Route element={<AdminLayout />}> 
              <Route path="/admin/verify" element={<AdminVerification />} />
              <Route path="/admin/disputes" element={<DisputeQueue />} />
              <Route path="/admin/disputes/:id" element={<DisputeDetails />} />
              {/* Catch-all for admin dashboard if needed */}
              <Route path="/admin" element={<Navigate to="/admin/verify" replace />} />
            </Route>
          </Route>

          {/* CATCH-ALL */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
