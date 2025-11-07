import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserPortal from './components/UserPortal';
import ProviderRegistration from './components/ProviderRegistration';
import ProviderLogin from './components/ProviderLogin';
import ProviderDashboard from './components/ProviderDashboard';

// Protected Route Component
// This ensures only logged-in providers can access the dashboard
function ProtectedRoute({ children }) {
  const authData = localStorage.getItem('providerAuth');
  
  if (!authData) {
    // Not logged in, redirect to login
    return <Navigate to="/provider/login" replace />;
  }

  try {
    const { isAuthenticated } = JSON.parse(authData);
    if (!isAuthenticated) {
      return <Navigate to="/provider/login" replace />;
    }
  } catch (error) {
    // Invalid auth data, clear and redirect
    localStorage.removeItem('providerAuth');
    return <Navigate to="/provider/login" replace />;
  }

  // User is authenticated, show the page
  return children;
}

// Redirect if already logged in
function LoginRoute({ children }) {
  const authData = localStorage.getItem('providerAuth');
  
  if (authData) {
    try {
      const { isAuthenticated } = JSON.parse(authData);
      if (isAuthenticated) {
        // Already logged in, go to dashboard
        return <Navigate to="/provider/dashboard" replace />;
      }
    } catch (error) {
      localStorage.removeItem('providerAuth');
    }
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Portal - Public */}
        <Route path="/" element={<UserPortal />} />

        {/* Provider Registration - Public */}
        <Route 
          path="/provider/register" 
          element={
            <LoginRoute>
              <ProviderRegistration />
            </LoginRoute>
          } 
        />

        {/* Provider Login - Public (but redirects if already logged in) */}
        <Route 
          path="/provider/login" 
          element={
            <LoginRoute>
              <ProviderLogin />
            </LoginRoute>
          } 
        />

        {/* Provider Dashboard - Protected */}
        <Route 
          path="/provider/dashboard" 
          element={
            <ProtectedRoute>
              <ProviderDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;