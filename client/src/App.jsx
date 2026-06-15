import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import AIStudio from './pages/AIStudio';
import Publish from './pages/Publish';
import Reviews from './pages/Reviews';
import Community from './pages/Community';
import Marketplace from './pages/Marketplace';
import Competitions from './pages/Competitions';
import Premium from './pages/Premium';
import Profile from './pages/Profile';
import UserPanel from './pages/UserPanel';
import PoemDetail from './pages/PoemDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Settings from './pages/Settings';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-text">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/ai-studio" element={<AIStudio />} />
            <Route path="/publish" element={<ProtectedRoute><Publish /></ProtectedRoute>} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/community" element={<Community />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/poems/:id" element={<PoemDetail />} />
            <Route path="/user" element={<ProtectedRoute><UserPanel /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminPanel /></ProtectedRoute>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
