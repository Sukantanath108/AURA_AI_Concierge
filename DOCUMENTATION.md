# AURA AI Concierge - Project Documentation

## 📋 Project Overview

**AURA AI Concierge** is a platform that connects users with trusted, verified service providers through an AI-powered chatbot interface. The system ensures safety and trust by requiring NID (National ID) verification for all service providers.

**Team**: Team_Mongolchari @ Solvio AI Hackathon

---

## 🎯 Core Objectives

1. **User Experience**: Provide instant AI-powered diagnosis and booking for home services
2. **Trust & Safety**: Connect users only with NID-verified, background-checked professionals
3. **Provider Management**: Enable service providers to register, get verified, and manage job requests
4. **Seamless Integration**: AI chatbot handles the entire conversation flow until order confirmation

---

## 🏗️ System Architecture

### Technology Stack
- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.0
- **Routing**: React Router DOM 6.20.0
- **Styling**: TailwindCSS 3.3.5
- **AI Chatbot**: Voiceflow (integrated via widget)
- **Backend Integration**: Make.com webhooks (configured for production)

### Project Structure
```
AURA_AI_Concierge/
├── src/
│   ├── components/
│   │   ├── UserPortal.jsx          # Main user-facing landing page
│   │   ├── ProviderLogin.jsx        # Provider authentication
│   │   ├── ProviderRegistration.jsx # Provider signup with NID verification
│   │   └── ProviderDashboard.jsx   # Provider job management interface
│   ├── pages/
│   │   ├── Home.jsx                 # (Unused - placeholder)
│   │   └── About.jsx                # (Unused - placeholder)
│   ├── App.jsx                      # Main routing configuration
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles
├── public/
│   └── hero.jpg                     # Hero section background image
└── package.json                     # Dependencies and scripts
```

---

## 🔄 User Flow & Functionality

### 1. **User Journey (Customer Side)**

#### Landing Page (`UserPortal.jsx`)
- **Hero Section**: Eye-catching banner with call-to-action
- **Trust Indicators**: Displays verification badges (NID Verified, Background Checked, Fixed-Price Guarantee)
- **How It Works**: 3-step process explanation
  - Step 1: Chat & Diagnose (AI conversation)
  - Step 2: Get Your Solution (Fixed-price booking)
  - Step 3: Get it Done (Provider dispatched)
- **Service Categories**: Visual display of available services (Plumbing, Electrical, Cleaning, Appliance Repair)
- **AI Chatbot Integration**: Voiceflow chatbot widget embedded at the bottom

#### Chatbot Flow (Voiceflow Integration)
- **Integration**: Voiceflow chatbot loads automatically on page load
- **Project ID**: `690c8c6a81e0728542b6154b`
- **Conversation Process**:
  1. User describes their problem or sends photos
  2. AI analyzes and provides diagnosis
  3. AI suggests solution and fixed price
  4. User confirms order
  5. **Chat ends** (as per requirement)
  6. Order is created and sent to provider pool

---

### 2. **Provider Journey**

#### Registration Flow (`ProviderRegistration.jsx`)

**Step 1: Personal Information**
- Full Name
- Email Address
- Phone Number
- Password & Confirm Password
- Validation: All fields required, passwords must match

**Step 2: Business Details**
- Business Name
- Service Type (Plumbing, Electrical, Carpentry, Painting, HVAC, Cleaning, Other)
- Years of Experience
- All fields required

**Step 3: NID Verification** ⭐ **CRITICAL FOR TRUST**
- NID Number (National ID)
- NID Card Upload (Image or PDF, max 5MB)
- Preview functionality for uploaded document
- **Verification Status**: 
  - Providers with NID get verified badge
  - Verification processed within 24 hours
  - Verified providers get priority listings

**Registration Process**:
- Form data sent to Make.com webhook (or demo mode if not configured)
- On success: Provider auto-logged in and redirected to dashboard
- Auth data stored in localStorage

#### Login Flow (`ProviderLogin.jsx`)
- Email and Password authentication
- Integration with Make.com webhook for validation
- Demo mode available for testing
- Auto-redirect to dashboard on success
- "Forgot Password" link (UI only, not implemented)
- Link to registration page for new providers

#### Dashboard (`ProviderDashboard.jsx`)

**Features**:
- **Online/Offline Toggle**: Providers can set availability status
- **Job Polling**: When online, fetches jobs every 5 seconds from Make.com webhook
- **Three-Column Kanban Board**:

  1. **Incoming Jobs** (Yellow)
     - Shows jobs with status: `pending_provider`
     - Each job card displays:
       - Service type
       - Location
       - Fixed price
       - Job ID
     - "Accept Job" button on each card
     - Real-time updates when new jobs arrive

  2. **Active Job** (Green)
     - Shows the currently active job (status: `active`)
     - Only one active job at a time
     - Animated pulse indicator

  3. **Completed Jobs** (Blue)
     - Historical record of completed jobs (status: `completed`)
     - Shows all past jobs for reference

**Provider Information Display**:
- Business name
- Email address
- **Verified Badge**: Blue badge with checkmark if NID verified
- Logout functionality

**Job Management**:
- Accept incoming jobs → moves to Active
- Jobs automatically move to Completed when finished (via backend)
- Error handling for failed API calls

---

## 🔐 Authentication & Security

### Provider Authentication
- **Storage**: localStorage (key: `providerAuth`)
- **Data Structure**:
  ```json
  {
    "isAuthenticated": true,
    "user": {
      "email": "provider@example.com",
      "businessName": "Service Pro",
      "isVerified": true,
      "serviceType": "plumbing",
      "experience": "5"
    },
    "loginTime": "2025-01-XX..."
  }
  ```

### Protected Routes
- **ProtectedRoute Component**: Ensures only authenticated providers access dashboard
- **LoginRoute Component**: Redirects already-logged-in providers away from login/register pages
- Automatic redirect to login if not authenticated

---

## 🛣️ Routing Structure

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | `UserPortal` | Public | Main landing page with chatbot |
| `/provider/register` | `ProviderRegistration` | Public | Provider signup (redirects if logged in) |
| `/provider/login` | `ProviderLogin` | Public | Provider login (redirects if logged in) |
| `/provider/dashboard` | `ProviderDashboard` | Protected | Provider job management (requires auth) |
| `*` | Redirect | - | Catch-all redirects to home |

---

## 🔌 Backend Integration (Make.com Webhooks)

### Configured Endpoints (Placeholder URLs)

1. **Registration Webhook**
   - URL: `YOUR_MAKE_COM_REGISTRATION_WEBHOOK_URL`
   - Method: POST
   - Payload: Provider registration data + NID info
   - Response: User data object

2. **Login Webhook**
   - URL: `YOUR_MAKE_COM_LOGIN_WEBHOOK_URL`
   - Method: POST
   - Payload: `{ email, password }`
   - Response: User data object

3. **Get Jobs Webhook**
   - URL: `YOUR_MAKE_COM_GET_JOBS_WEBHOOK_URL_HERE`
   - Method: GET
   - Response: Array of job objects with statuses

4. **Accept Job Webhook**
   - URL: `YOUR_MAKE_COM_ACCEPT_JOB_WEBHOOK_URL_HERE`
   - Method: POST
   - Payload: `{ jobID }`
   - Response: Success confirmation

### Job Status Flow
```
pending_provider → active → completed
```

---

## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Blue to Purple gradient theme
- **Typography**: Modern, clean fonts with proper hierarchy
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Animations**: Smooth transitions, hover effects, loading spinners

### Key UI Components
- **Loading Spinner**: Animated SVG spinner for chatbot loading
- **Progress Bar**: Multi-step form progress indicator
- **Job Cards**: Clean, informative cards with icons
- **Verified Badge**: Blue badge with checkmark icon
- **Online/Offline Toggle**: Animated switch component
- **Trust Bar**: Visual indicators of safety features

---

## 📊 Data Flow Diagram

```
┌─────────────┐
│   User      │
│  (Browser)  │
└──────┬──────┘
       │
       │ 1. Visits Landing Page
       ▼
┌─────────────────────┐
│   UserPortal.jsx    │
│  - Hero Section     │
│  - Trust Indicators │
│  - Chatbot Widget   │
└──────┬──────────────┘
       │
       │ 2. Starts Chat
       ▼
┌─────────────────────┐
│   Voiceflow AI      │
│   Chatbot           │
└──────┬──────────────┘
       │
       │ 3. Conversation
       │    - Diagnosis
       │    - Solution
       │    - Price Quote
       │
       │ 4. User Confirms Order
       │    (Chat Ends)
       ▼
┌─────────────────────┐
│   Make.com          │
│   Backend           │
│   (Creates Job)     │
└──────┬──────────────┘
       │
       │ 5. Job Status: pending_provider
       ▼
┌─────────────────────┐
│ Provider Dashboard  │
│ (Polling Enabled)   │
└──────┬──────────────┘
       │
       │ 6. Provider Accepts
       ▼
┌─────────────────────┐
│   Job Status:       │
│   active            │
└─────────────────────┘
       │
       │ 7. Job Completed
       ▼
┌─────────────────────┐
│   Job Status:       │
│   completed         │
└─────────────────────┘
```

---

## 🔑 Key Features Summary

### For Users
✅ AI-powered chatbot for instant diagnosis  
✅ Fixed-price guarantee (no surprises)  
✅ NID-verified providers only  
✅ Background-checked professionals  
✅ Simple 3-step booking process  
✅ Multiple service categories  

### For Providers
✅ Easy registration with step-by-step form  
✅ NID verification for trust badge  
✅ Real-time job notifications  
✅ Online/Offline availability toggle  
✅ Kanban-style job management  
✅ Verified badge for priority listings  
✅ Job history tracking  

---

## 🚀 Getting Started

### Installation
```bash
cd AURA_AI_Concierge
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Configuration Required
1. **Voiceflow**: Already configured (Project ID: `690c8c6a81e0728542b6154b`)
2. **Make.com Webhooks**: Replace placeholder URLs in:
   - `ProviderLogin.jsx` (line 14)
   - `ProviderRegistration.jsx` (line 23)
   - `ProviderDashboard.jsx` (lines 17-18)

---

## 📝 Important Notes

1. **Demo Mode**: The application works in demo mode when webhook URLs are not configured
2. **LocalStorage**: Authentication uses browser localStorage (not production-ready for sensitive data)
3. **File Upload**: NID file upload creates preview but doesn't send file to backend (needs implementation)
4. **Polling**: Dashboard polls for jobs every 5 seconds when provider is online
5. **Chatbot**: Voiceflow chatbot handles the entire conversation flow until order confirmation

---

## 🎯 Presentation Points

### Problem Statement
- Users struggle to find trusted service providers
- No verification system for professionals
- Unclear pricing and booking process

### Solution
- AI chatbot provides instant diagnosis and fixed pricing
- NID verification ensures only trusted providers
- Seamless booking experience in under 3 minutes

### Key Differentiators
1. **AI-First Approach**: Chatbot handles entire conversation
2. **Trust & Safety**: Mandatory NID verification
3. **Fixed Pricing**: No hidden costs
4. **Real-Time Matching**: Instant job dispatch to available providers

### Technical Highlights
- Modern React architecture
- Real-time job polling
- Protected routes with authentication
- Responsive design
- Integration-ready backend hooks

---

## 🔮 Future Enhancements

- [ ] Payment integration
- [ ] Rating and review system
- [ ] Push notifications for providers
- [ ] SMS/Email notifications
- [ ] Provider profile pages
- [ ] Advanced filtering and search
- [ ] Mobile app development
- [ ] Analytics dashboard

---

## 📞 Support

For questions or issues, contact: Team_Mongolchari @ Solvio AI Hackathon

---

**Last Updated**: January 2025  
**Version**: 1.0.0

