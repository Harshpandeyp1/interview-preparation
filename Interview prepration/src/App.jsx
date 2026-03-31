import { useAuth } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import First from './components/First';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Interview from './components/Interview';
import Application from './components/Application';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function AppContent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/interview" element={
          <ProtectedRoute>
            <Interview />
          </ProtectedRoute>
        } />
        <Route path="/application" element={
          <ProtectedRoute>
            <Application />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
