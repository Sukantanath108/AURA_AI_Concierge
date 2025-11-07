import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  
  // State management
  const [isOnline, setIsOnline] = useState(false);
  const [incomingJobs, setIncomingJobs] = useState([]);
  const [activeJob, setActiveJob] = useState(null);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  // Make.com webhook URLs - Replace these with your actual URLs
  const GET_JOBS_URL = 'YOUR_MAKE_COM_GET_JOBS_WEBHOOK_URL_HERE';
  const ACCEPT_JOB_URL = 'YOUR_MAKE_COM_ACCEPT_JOB_WEBHOOK_URL_HERE';

  // Load user data from localStorage
  useEffect(() => {
    const authData = localStorage.getItem('providerAuth');
    if (authData) {
      try {
        const { user } = JSON.parse(authData);
        setUserData(user);
      } catch (error) {
        console.error('Error loading user data:', error);
        handleLogout();
      }
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('providerAuth');
    navigate('/provider/login');
  };

  // Fetch jobs from Make.com webhook
  const fetchJobs = async () => {
    try {
      const response = await fetch(GET_JOBS_URL);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      
      const jobs = await response.json();
      
      // Filter jobs by status
      const pending = jobs.filter(job => job.status === 'pending_provider');
      const active = jobs.find(job => job.status === 'active');
      const completed = jobs.filter(job => job.status === 'completed');
      
      setIncomingJobs(pending);
      setActiveJob(active || null);
      setCompletedJobs(completed);
      setError(null);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Unable to fetch jobs. Please check your connection.');
    }
  };

  // Polling effect - fetches jobs every 5 seconds when online
  useEffect(() => {
    if (!isOnline) return;

    // Fetch immediately when going online
    fetchJobs();

    // Set up polling interval
    const interval = setInterval(() => {
      fetchJobs();
    }, 5000); // 5 seconds

    // Cleanup interval on unmount or when going offline
    return () => clearInterval(interval);
  }, [isOnline]);

  // Handle accepting a job
  const handleAcceptJob = async (jobID) => {
    setIsLoading(true);
    try {
      const response = await fetch(ACCEPT_JOB_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobID }),
      });

      if (!response.ok) throw new Error('Failed to accept job');

      // Remove job from incoming jobs list
      setIncomingJobs(prev => prev.filter(job => job.jobID !== jobID));
      
      // Optionally fetch jobs immediately to update all columns
      await fetchJobs();
      
      setError(null);
    } catch (err) {
      console.error('Error accepting job:', err);
      setError('Failed to accept job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Job Card Component
  const JobCard = ({ job, showAcceptButton = false }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-gray-800">{job.service}</h3>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          #{job.jobID}
        </span>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{job.location}</span>
        </div>
        
        <div className="flex items-center text-green-600 font-semibold">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">{job.price}</span>
        </div>
      </div>

      {showAcceptButton && (
        <button
          onClick={() => handleAcceptJob(job.jobID)}
          disabled={isLoading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Accepting...' : 'Accept Job'}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              
              {/* Welcome Text with Verified Badge */}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Welcome, {userData?.businessName || 'Provider'}
                  </h1>
                  {/* Verified Badge - Shows if user has NID verified */}
                  {userData?.isVerified && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full" title="Verified Provider">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-semibold text-blue-700">Verified</span>
                    </div>
                  )}
                </div>
                {userData?.email && (
                  <p className="text-sm text-gray-500">{userData.email}</p>
                )}
              </div>
            </div>
            
            {/* Right side: Toggle and Logout */}
            <div className="flex items-center gap-4">
              {/* Online/Offline Toggle */}
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                  {isOnline ? 'You are Online' : 'You are Offline'}
                </span>
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    isOnline ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      isOnline ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {!isOnline ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">You are currently offline</h2>
            <p className="text-gray-500">Toggle the switch above to start receiving jobs</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Incoming Jobs Column */}
            <div className="bg-white rounded-lg shadow-lg p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                Incoming Jobs
                <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                  {incomingJobs.length}
                </span>
              </h2>
              
              <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
                {incomingJobs.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p>No incoming jobs</p>
                  </div>
                ) : (
                  incomingJobs.map(job => (
                    <JobCard key={job.jobID} job={job} showAcceptButton={true} />
                  ))
                )}
              </div>
            </div>

            {/* Active Job Column */}
            <div className="bg-white rounded-lg shadow-lg p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Active Job
              </h2>
              
              <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
                {activeJob ? (
                  <JobCard job={activeJob} />
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p>No active job</p>
                  </div>
                )}
              </div>
            </div>

            {/* Completed Jobs Column */}
            <div className="bg-white rounded-lg shadow-lg p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                Completed Jobs
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                  {completedJobs.length}
                </span>
              </h2>
              
              <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
                {completedJobs.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>No completed jobs yet</p>
                  </div>
                ) : (
                  completedJobs.map(job => (
                    <JobCard key={job.jobID} job={job} />
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProviderDashboard;