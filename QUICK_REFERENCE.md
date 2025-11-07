# AURA AI Concierge - Quick Reference Guide

## 🎯 Project Purpose
Connect users to **NID-verified, trusted service providers** through an **AI chatbot** interface.

---

## 🔄 Complete Flow (Start to Finish)

### USER SIDE:
1. User visits landing page (`/`)
2. Scrolls to chatbot section
3. Starts conversation with Voiceflow AI chatbot
4. Describes problem (text or photo)
5. AI provides diagnosis and fixed-price quote
6. **User confirms order → Chat ends** ✅
7. Job created and sent to provider pool

### PROVIDER SIDE:
1. Provider visits `/provider/register`
2. **Step 1**: Personal info (name, email, phone, password)
3. **Step 2**: Business details (business name, service type, experience)
4. **Step 3**: **NID Verification** (NID number + NID card upload) ⭐
5. Registration complete → Auto-login → Redirected to dashboard
6. Provider logs in at `/provider/login` (if already registered)
7. Provider toggles **Online** status
8. Dashboard polls for jobs every 5 seconds
9. New jobs appear in **Incoming Jobs** column
10. Provider clicks **Accept Job** → Job moves to **Active Job**
11. Job completed → Moves to **Completed Jobs**

---

## 📁 File Structure & Responsibilities

| File | Purpose |
|------|---------|
| `App.jsx` | Routing configuration, protected routes |
| `UserPortal.jsx` | Landing page + Voiceflow chatbot integration |
| `ProviderRegistration.jsx` | 3-step registration form with NID upload |
| `ProviderLogin.jsx` | Provider authentication |
| `ProviderDashboard.jsx` | Job management (3-column Kanban board) |

---

## 🔑 Key Features

### User Features:
- ✅ AI chatbot for instant diagnosis
- ✅ Fixed-price guarantee
- ✅ NID-verified providers only
- ✅ Background-checked professionals
- ✅ Simple booking process

### Provider Features:
- ✅ Multi-step registration
- ✅ **NID verification for trust badge** ⭐
- ✅ Real-time job notifications
- ✅ Online/Offline toggle
- ✅ Kanban job management
- ✅ Job history tracking

---

## 🔐 Authentication

- **Storage**: `localStorage` (key: `providerAuth`)
- **Protected Route**: `/provider/dashboard` (requires login)
- **Auto-redirect**: Logged-in users can't access login/register pages

---

## 🛣️ Routes

| Route | Component | Access |
|-------|-----------|--------|
| `/` | UserPortal | Public |
| `/provider/register` | ProviderRegistration | Public |
| `/provider/login` | ProviderLogin | Public |
| `/provider/dashboard` | ProviderDashboard | **Protected** |

---

## 🔌 Backend Integration

**Make.com Webhooks** (replace placeholder URLs):

1. **Registration**: `ProviderRegistration.jsx` line 23
2. **Login**: `ProviderLogin.jsx` line 14
3. **Get Jobs**: `ProviderDashboard.jsx` line 17
4. **Accept Job**: `ProviderDashboard.jsx` line 18

---

## 📊 Job Status Flow

```
pending_provider → active → completed
```

- **pending_provider**: New job, waiting for provider acceptance
- **active**: Provider accepted, job in progress
- **completed**: Job finished

---

## 🎨 UI Components

- **Loading Spinner**: Chatbot loading state
- **Progress Bar**: Multi-step form indicator
- **Job Cards**: Service, location, price display
- **Verified Badge**: Blue badge with checkmark (NID verified)
- **Online Toggle**: Animated switch for availability
- **Trust Bar**: Safety feature indicators

---

## 💻 Tech Stack

- React 18.2.0
- Vite 5.0
- React Router DOM 6.20.0
- TailwindCSS 3.3.5
- Voiceflow (AI Chatbot)

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

**Configure**: Replace Make.com webhook URLs in component files

---

## ⚠️ Important Notes

1. **Chatbot**: Voiceflow Project ID: `690c8c6a81e0728542b6154b`
2. **Demo Mode**: Works without webhooks (mock data)
3. **NID Upload**: Creates preview but needs backend implementation
4. **Polling**: Dashboard polls every 5 seconds when online
5. **Chat Ends**: After user confirms order (as per requirement)

---

## 🎯 Presentation Key Points

1. **Problem**: Hard to find trusted service providers
2. **Solution**: AI chatbot + NID verification
3. **Differentiator**: Mandatory NID verification
4. **Flow**: User chats → Confirms → Chat ends → Provider gets job
5. **Trust**: Verified badge, background checks, fixed pricing

---

## 📝 Demo Checklist

- [ ] Show landing page with trust indicators
- [ ] Demonstrate chatbot conversation
- [ ] Show order confirmation and chat ending
- [ ] Show provider registration (highlight NID step)
- [ ] Show provider login
- [ ] Show dashboard with job management
- [ ] Show online/offline toggle
- [ ] Show verified badge

---

**Team**: Team_Mongolchari @ Solvio AI Hackathon  
**Version**: 1.0.0

