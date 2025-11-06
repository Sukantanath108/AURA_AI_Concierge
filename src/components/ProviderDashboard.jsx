import { useState, useEffect } from 'react'

const GET_JOBS_URL = 'YOUR_MAKE.COM_GET_JOBS_URL_HERE'
const ACCEPT_JOB_URL = 'YOUR_MAKE.COM_ACCEPT_JOB_URL_HERE'

function ProviderDashboard() {
  const [isOnline, setIsOnline] = useState(false)
  const [jobs, setJobs] = useState([])

  // Fetch jobs every 5 seconds
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(GET_JOBS_URL)
        const data = await response.json()
        setJobs(data)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    }

    // Fetch immediately on mount
    fetchJobs()

    // Set up interval to fetch every 5 seconds
    const interval = setInterval(fetchJobs, 5000)

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [])

  const acceptJob = async (jobID) => {
    try {
      const response = await fetch(ACCEPT_JOB_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobID }),
      })

      if (response.ok) {
        // Remove the job from local state
        setJobs(prevJobs => prevJobs.filter(job => job.jobID !== jobID))
      } else {
        console.error('Error accepting job:', response.statusText)
      }
    } catch (error) {
      console.error('Error accepting job:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
              Welcome, PlumberPro
            </h1>
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                {isOnline ? 'You are Online' : 'You are Offline'}
              </span>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isOnline ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isOnline ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Three Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Incoming Jobs Column */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Incoming Jobs</h2>
            <div className="space-y-4">
              {jobs.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">No incoming jobs</p>
                </div>
              ) : (
                jobs.map((job) => (
                  <div key={job.jobID} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.service || job.serviceName}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </p>
                      <p className="text-lg font-bold text-gray-900 mt-2">{job.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => acceptJob(job.jobID)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        Accept
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm">
                        Decline
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Active Job Column */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Job</h2>
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">No active job</p>
            </div>
          </div>

          {/* Completed Jobs Column */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Completed Jobs</h2>
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">No completed jobs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProviderDashboard

