import { useEffect } from 'react'

// --- Navbar Component ---
// (No changes)
function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-blue-600">Aura</span>
          </div>
          <div className="flex items-center">
            <a
              href="/provider/login"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Provider Portal
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

// --- Footer Component ---
// (No changes)
function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          © 2025 Aura | Team_Mongolchari @ Solvio AI Hackathon
        </p>
        <p className="text-xs text-slate-400 mt-2">
          Building a new standard of trust and comfort in home services.
        </p>
      </div>
    </footer>
  )
}

// --- NEW Loading Spinner Component ---
// This will replace the simple "Loading..." text for a more pro feel.
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <svg className="animate-spin h-10 w-10 text-blue-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="text-slate-400">Loading Aura AI Assistant...</p>
    </div>
  )
}

// --- Main User Portal ---
function UserPortal() {
  // Voiceflow bot logic (no changes)
  useEffect(() => {
    (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0]
      v.onload = function() {
        if (window.voiceflow && window.voiceflow.chat) {
          window.voiceflow.chat.load({
            verify: { projectID: '690c8c6a81e0728542b6154b' },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production',
            voice: {
              url: "https://runtime-api.voiceflow.com"
            }
          })
        }
      }
      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s)
    })(document, 'script')
  }, [])

  // NEW: Smooth scroll function for our CTA button
  const scrollToChat = () => {
    document.getElementById('get-help-now').scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - ENHANCED */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        {/* NEW: Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero.jpg" 
            alt="Smiling service professional"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-800/60 mix-blend-multiply"></div>
        </div>
        
        {/* Subtle gradient (from previous version) */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10">
            <div
              className="aspect-[1.1] w-[80rem] bg-gradient-to-tr from-[#90c5ff] to-[#0055ff] opacity-10"
              style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
            />
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Maximum Comfort, Minimum Hassle.
            <span className="block mt-2 text-blue-200">Welcome to Aura.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
            Get an instant, AI-powered diagnosis and a vetted, verified professional booked in under 3 minutes.
          </p>
          {/* NEW: Call-to-Action Button */}
          <button
            onClick={scrollToChat}
            className="mt-10 px-8 py-3 bg-white text-blue-600 font-semibold text-lg rounded-lg shadow-lg hover:bg-slate-50 transform transition-all hover:scale-105"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* NEW: Trust Bar Section */}
      <section className="bg-white py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Our Commitment to Your Safety
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="font-medium text-gray-700">NID Verified Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="font-medium text-gray-700">Background Checked</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="font-medium text-gray-700">Fixed-Price Guarantee</span>
            </div>
          </div>
        </div>
      </section>


      {/* How it Works Section - (No changes from your version) */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
            How it Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Chat & Diagnose</h3>
              <p className="text-gray-600">Tell our AI your problem or send a photo.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Get Your Solution</h3>
              <p className="text-gray-600">Receive a single, fixed-price booking for a verified provider.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all hover:scale-105 hover:shadow-xl">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l4.16-4.161m0 0a1.5 1.5 0 012.12 0L13 18.261a1.5 1.5 0 010 2.121L9.12 24.22a1.5 1.5 0 01-2.12 0L3 20.221a1.5 1.5 0 010-2.121L6.879 14.31z"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Get it Done</h3>
              <p className="text-gray-600">Confirm your booking and relax. Your provider is on the way.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Featured Services Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
            Services We Orchestrate
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ServiceIcon name="Plumbing" icon="M18.364 5.636l-3.536 3.536m0 0A5.001 5.001 0 0012 15a5.001 5.001 0 00-2.828-8.828m0 0l-3.536-3.536M12 21V9" />
            <ServiceIcon name="Electrical" icon="M13 10V3L4 14h7v7l9-11h-7z" />
            <ServiceIcon name="Cleaning" icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2" />
            <ServiceIcon name="Appliance Repair" icon="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </div>
        </div>
      </section>

      {/* Get Help Now Section - ID added for the scroll button */}
      <section id="get-help-now" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-t-3xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get Help Now
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start a conversation with our AI assistant to get instant help with your problem.
          </p>
        </div>
        {/* Voiceflow Chatbot Container - Now with a spinner */}
        <div id="voiceflow-chatbot-container" className="min-h-[500px] flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200">
          <LoadingSpinner />
          {/* Voiceflow will load and replace this ^ */}
        </div>
      </section>

      <Footer />
    </div>
  )
}

// NEW: Helper component for the services
function ServiceIcon({ name, icon }) {
  return (
    <div className="text-center group">
      <div className="flex items-center justify-center w-24 h-24 mx-auto bg-slate-100 rounded-full transition-all duration-300 group-hover:bg-blue-100 group-hover:shadow-lg">
        <svg className="w-10 h-10 text-slate-500 transition-all duration-300 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-700 transition-all duration-300 group-hover:text-blue-600">{name}</p>
    </div>
  )
}

export default UserPortal