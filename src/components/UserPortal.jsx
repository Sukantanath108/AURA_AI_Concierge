import { useEffect } from 'react'

function UserPortal() {
  useEffect(() => {
    loadVoiceflowScript()
  }, [])

  const loadVoiceflowScript = () => {
    // Check if script is already loaded
    if (window.voiceflow) {
      return
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs'
    
    script.onload = () => {
      if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.load({
          verify: { projectID: '68f526d23d6655268bb89a81' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          }
        })
      }
    }

    const firstScript = document.getElementsByTagName('script')[0]
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    } else {
      document.body.appendChild(script)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Maximum Comfort, Minimum Hassle.
            <span className="block mt-2 text-blue-600">Welcome to Aura.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
            Get an instant, AI-powered diagnosis and a vetted, verified professional booked in under 3 minutes.
          </p>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
          How it Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Step 1 */}
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Chat & Diagnose</h3>
            <p className="text-gray-600">Tell our AI your problem or send a photo.</p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Get Your Solution</h3>
            <p className="text-gray-600">Receive a single, fixed-price booking for a verified provider.</p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Get it Done</h3>
            <p className="text-gray-600">Confirm your booking and relax. Your provider is on the way.</p>
          </div>
        </div>
      </section>

      {/* Get Help Now Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-t-3xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get Help Now
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start a conversation with our AI assistant to get instant help with your problem.
          </p>
        </div>
        {/* Voiceflow Chatbot Container */}
        <div id="voiceflow-chatbot-container" className="min-h-[400px] flex items-center justify-center">
          {/* Voiceflow chatbot will be loaded here */}
        </div>
      </section>
    </div>
  )
}

export default UserPortal

