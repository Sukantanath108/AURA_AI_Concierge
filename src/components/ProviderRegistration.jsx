import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    serviceType: '',
    experience: '',
    nidNumber: '',
    nidFile: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [nidPreview, setNidPreview] = useState(null);

  // Replace with your Make.com registration webhook URL
  const REGISTRATION_WEBHOOK_URL = 'YOUR_MAKE_COM_REGISTRATION_WEBHOOK_URL';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, nidFile: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setNidPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Demo mode: if the webhook URL is not configured, mock success
      const isDemoMode = !REGISTRATION_WEBHOOK_URL || REGISTRATION_WEBHOOK_URL.startsWith('YOUR_MAKE_COM');

      // In a real app, you'd convert the file to base64 or upload to cloud storage
      // For now, we'll send the form data without the file
      const dataToSend = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        serviceType: formData.serviceType,
        experience: formData.experience,
        nidNumber: formData.nidNumber,
        hasNID: !!formData.nidFile,
        registrationDate: new Date().toISOString(),
      };

      if (isDemoMode) {
        // Mock a successful registration response
        const mockUser = {
          email: formData.email,
          businessName: formData.businessName || 'Demo Business',
          isVerified: !!formData.nidFile,
          serviceType: formData.serviceType,
          experience: formData.experience,
        };
        localStorage.setItem('providerAuth', JSON.stringify({
          isAuthenticated: true,
          user: mockUser,
          loginTime: new Date().toISOString(),
        }));
        alert('Registration successful (demo mode). Redirecting to dashboard...');
        navigate('/provider/dashboard');
      } else {
        const response = await fetch(REGISTRATION_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        });

        if (!response.ok) throw new Error('Registration failed');

        // If your real API returns user data, you can store it similarly here
        // For now, set minimal auth to pass the ProtectedRoute
        localStorage.setItem('providerAuth', JSON.stringify({
          isAuthenticated: true,
          user: { email: formData.email, businessName: formData.businessName },
          loginTime: new Date().toISOString(),
        }));

        alert('Registration successful! Redirecting to dashboard...');
        navigate('/provider/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
        alert('Please fill all required fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      {/* Logo/Brand */}
      <div className="max-w-2xl mx-auto mb-8">
        <a href="/" className="flex items-center gap-3 justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Aura Provider
          </span>
        </a>
      </div>

      {/* Registration Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <div className="flex justify-between items-center mb-4">
            <div className={`flex items-center ${step >= 1 ? 'text-white' : 'text-blue-200'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-white text-blue-600' : 'bg-blue-500'}`}>
                1
              </div>
              <span className="ml-3 font-semibold hidden sm:inline">Personal Info</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-blue-400 rounded">
              <div className={`h-full bg-white rounded transition-all duration-300 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`flex items-center ${step >= 2 ? 'text-white' : 'text-blue-200'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-white text-blue-600' : 'bg-blue-500'}`}>
                2
              </div>
              <span className="ml-3 font-semibold hidden sm:inline">Business Details</span>
            </div>
            <div className="flex-1 h-1 mx-4 bg-blue-400 rounded">
              <div className={`h-full bg-white rounded transition-all duration-300 ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
            </div>
            <div className={`flex items-center ${step >= 3 ? 'text-white' : 'text-blue-200'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-white text-blue-600' : 'bg-blue-500'}`}>
                3
              </div>
              <span className="ml-3 font-semibold hidden sm:inline">Verification</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Join as a Provider</h2>
                <p className="text-gray-600">Start earning with verified jobs</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="+880 1XXX-XXXXXX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Create a strong password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Re-enter your password"
                  required
                />
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Continue to Business Details →
              </button>
            </div>
          )}

          {/* Step 2: Business Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Business Information</h2>
                <p className="text-gray-600">Tell us about your services</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="e.g., PlumberPro Services"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type *</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  required
                >
                  <option value="">Select your service type</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="painting">Painting</option>
                  <option value="hvac">HVAC</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience *</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="e.g., 5"
                  min="0"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-4 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Continue to Verification →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: NID Verification */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Verified</h2>
                <p className="text-gray-600">Upload your NID to get a verified badge</p>
                <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-50 rounded-full">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-blue-700">Get Verified Badge</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">NID Number *</label>
                <input
                  type="text"
                  name="nidNumber"
                  value={formData.nidNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Enter your National ID number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload NID Card *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-all cursor-pointer">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="nid-upload"
                    required
                  />
                  <label htmlFor="nid-upload" className="cursor-pointer">
                    {nidPreview ? (
                      <div>
                        <img src={nidPreview} alt="NID Preview" className="max-h-48 mx-auto rounded-lg mb-4" />
                        <p className="text-green-600 font-semibold">✓ NID Uploaded Successfully</p>
                        <p className="text-sm text-gray-500 mt-2">Click to change</p>
                      </div>
                    ) : (
                      <div>
                        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-gray-600 font-semibold mb-2">Click to upload your NID</p>
                        <p className="text-sm text-gray-500">PNG, JPG or PDF (Max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * Your NID will be verified within 24 hours. Verified providers get a blue badge and priority listings.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-4 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Registering...' : 'Complete Registration ✓'}
                </button>
              </div>
            </div>
          )}

          {/* Already have an account */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/provider/login" className="text-blue-600 font-semibold hover:text-blue-700">
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProviderRegistration;