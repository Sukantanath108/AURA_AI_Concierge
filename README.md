# 🎯 AURA AI Concierge

> **AI-Powered Platform Connecting Users to Trusted, NID-Verified Service Providers**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.5-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Built by Sukanta Nath | Team Mongolchari @ Solvio AI Hackathon**

---

## 🎬 Demo Video

[![Watch the Demo](Screenshot 2026-07-08 014733.png)](https://youtu.be/lH-2KCUg-O8?si=e7y0fjvfZYpoBrAu)

> 📹 **[▶ Watch Full Demo](https://youtu.be/lH-2KCUg-O8?si=e7y0fjvfZYpoBrAu)** — Complete walkthrough of AURA AI in action.

---

## 📋 Overview

AURA AI Concierge revolutionizes how users find and book trusted service providers. Through an intelligent AI chatbot, users get instant diagnosis, fixed-price quotes, and seamless booking—all while ensuring every provider is NID-verified for maximum safety and trust.

### 🎯 Key Features

- 🤖 **AI-Powered Chatbot**: Voiceflow-integrated chatbot handles entire conversation flow
- ✅ **NID Verification**: Mandatory National ID verification for all service providers
- 💰 **Fixed Pricing**: Transparent, upfront pricing with no surprises
- 🔒 **Trust & Safety**: Background-checked, verified professionals only
- ⚡ **Real-Time Matching**: Instant job dispatch to available providers
- 📱 **Provider Dashboard**: Kanban-style job management with live updates

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd AURA_AI_Concierge

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🏗️ Project Structure

```
AURA_AI_Concierge/
├── src/
│   ├── components/
│   │   ├── UserPortal.jsx          # Main landing page + chatbot
│   │   ├── ProviderLogin.jsx       # Provider authentication
│   │   ├── ProviderRegistration.jsx # Provider signup with NID verification
│   │   └── ProviderDashboard.jsx   # Job management dashboard
│   ├── pages/
│   ├── App.jsx                      # Routing configuration
│   └── main.jsx                     # React entry point
├── public/
│   └── hero.jpg                     # Hero section image
└── package.json
```

---

## 🔄 How It Works

### User Journey

1. **Landing Page**: User visits the homepage with trust indicators
2. **AI Chatbot**: User starts conversation with Voiceflow chatbot
3. **Diagnosis**: AI analyzes problem and provides solution
4. **Booking**: User confirms order with fixed price
5. **Chat Ends**: Conversation completes, job created ✅
6. **Provider Match**: Job dispatched to available verified providers

### Provider Journey

1. **Registration**: 3-step process (Personal → Business → NID Verification)
2. **Verification**: NID upload for trust badge (processed within 24 hours)
3. **Dashboard**: Real-time job management with online/offline toggle
4. **Job Acceptance**: Accept incoming jobs from Kanban board
5. **Job Completion**: Track active and completed jobs

---

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Build Tool**: Vite 5.0
- **Routing**: React Router DOM 6.20.0
- **Styling**: TailwindCSS 3.3.5
- **AI Chatbot**: Voiceflow
- **Backend Integration**: Make.com webhooks

---

## 🔌 Configuration

### Voiceflow Chatbot

Already configured with Project ID: `690c8c6a81e0728542b6154b`

### Make.com Webhooks

Replace placeholder URLs in:

- `src/components/ProviderLogin.jsx` (line 14)
- `src/components/ProviderRegistration.jsx` (line 23)
- `src/components/ProviderDashboard.jsx` (lines 17-18)

---

## 📊 Features in Detail

### For Users
- ✅ Instant AI-powered diagnosis
- ✅ Fixed-price guarantee
- ✅ NID-verified providers only
- ✅ Background-checked professionals
- ✅ Simple 3-step booking process
- ✅ Multiple service categories (Plumbing, Electrical, Cleaning, etc.)

### For Providers
- ✅ Easy multi-step registration
- ✅ NID verification for trust badge
- ✅ Real-time job notifications
- ✅ Online/Offline availability toggle
- ✅ Kanban-style job management
- ✅ Job history tracking
- ✅ Verified badge for priority listings

---

## 🛣️ Routes

| Route | Component | Access |
|-------|-----------|--------|
| `/` | UserPortal | Public |
| `/provider/register` | ProviderRegistration | Public |
| `/provider/login` | ProviderLogin | Public |
| `/provider/dashboard` | ProviderDashboard | Protected |

---

## 🔐 Authentication

- Provider authentication via localStorage
- Protected routes for dashboard access
- Auto-redirect for authenticated users

---

## 📚 Documentation

- **[Full Documentation](./DOCUMENTATION.md)** - Complete technical documentation
- **[Quick Reference](./QUICK_REFERENCE.md)** - One-page overview

---

## 🎯 Key Differentiators

1. **AI-First Approach**: Entire conversation handled autonomously by AI
2. **Mandatory Verification**: NID verification required for all providers
3. **Fixed Pricing**: Transparent costs with no hidden fees
4. **Real-Time Matching**: Instant job dispatch to available providers

---

## 🚧 Future Enhancements

- [ ] Payment integration
- [ ] Rating and review system
- [ ] Push notifications
- [ ] SMS/Email notifications
- [ ] Provider profile pages
- [ ] Advanced filtering
- [ ] Mobile app development
- [ ] Analytics dashboard

---

## 🤝 Contributing

This project was built for Solvio AI Hackathon by Team_Mongolchari.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Team

**Team_Mongolchari** @ Solvio AI Hackathon

---

## 📞 Support

For questions or issues, please open an issue in this repository.

---

**Built with ❤️ for transforming the home services industry**
