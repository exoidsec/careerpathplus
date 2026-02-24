# CareerPath+ — Project Documentation

> **Live URL:** [careerpathplus.lovable.app](https://careerpathplus.lovable.app)  
> **Tech Stack:** React · TypeScript · Vite · Tailwind CSS · Lovable Cloud · Framer Motion

---

## 📌 Overview

CareerPath+ is a student-focused platform for **career guidance, skills development, internships, scholarships, and community growth**. It helps students discover career paths, connect with peers, and access curated resources — all in one place.

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero section, feature cards, platform highlights |
| `/careers` | Careers | Career exploration and guidance |
| `/scholarships` | Scholarships | 48+ scholarships directory with category filters (Central, Maharashtra, AICTE, Private, Divyang, Minority, After 10th, After 12th) |
| `/colleges` | Colleges | College listings and information |
| `/ngos` | NGOs | NGO directory and resources |
| `/community` | Community | Community hub and discussions |
| `/chat` | Community Chat | Real-time chat rooms (general, careers, skills, internships) with Lovable Cloud backend |
| `/ai-chat` | AI Chat | AI-powered career assistant |
| `/skills` | Skills | Skills development resources |
| `/internships` | Internships | Internship listings |
| `/career-quiz` | Career Quiz | AI-powered career recommendation quiz |
| `/dashboard` | Dashboard | User profile, XP, streaks, daily tasks, career recommendations |
| `/login` | Login | User authentication (email/password) |
| `/signup` | Sign Up | New user registration |
| `/about` | About | About the platform |
| `/adminisreal` | Admin Panel | Admin-only: manage scholarships, users, content |

---

## ✨ Key Features

### 🎓 Scholarships Directory (`/scholarships`)
- **48+ scholarships** from 8 categories
- Search by name or provider
- Filter by category: Central Govt, Maharashtra Govt, AICTE, Private, Divyang, Minority, After 10th, After 12th
- Displays eligibility, amount, income limit, and official links
- Data stored in Lovable Cloud database

### 💬 Community Chat (`/chat`)
- Real-time messaging with 4 rooms: `#general`, `#careers`, `#skills`, `#internships`
- Live message updates via database subscriptions
- Users can delete their own messages
- Requires authentication

### 🤖 AI Chat (`/ai-chat`)
- AI-powered career guidance assistant
- Powered by Lovable Cloud edge functions

### 📝 Career Quiz (`/career-quiz`)
- Interactive quiz for personalized career recommendations
- Results stored in user profile

### 📊 Dashboard (`/dashboard`)
- User profile with display name, bio, avatar
- **Gamification:** XP points, levels, streak tracking
- Daily tasks with priority levels
- Career recommendations display
- Education details (stream, field of study, percentage, preferred city)

### 🔐 Authentication
- Email/password sign up and login
- Profile auto-creation on signup
- Session persistence with auto-refresh tokens

### 🛡️ Admin Panel (`/adminisreal`)
- **Access:** Role-based — only users with `admin` role in `user_roles` table
- **Features:** Scholarship CRUD, user management, platform stats
- Admin link appears in navbar only for admin users

### 🌗 Theme System
- Light and dark mode toggle
- Smooth CSS transitions between themes
- Persisted theme preference

### 🎨 UI/UX
- Framer Motion animations throughout
- Responsive design (mobile hamburger menu, desktop nav)
- Spring-based active link indicator in navbar
- Staggered card animations on scroll
- Gradient hero sections

---

## 🗄️ Database Schema (Lovable Cloud)

### `profiles`
| Column | Type | Notes |
|---|---|---|
| user_id | uuid | References auth user |
| display_name | text | Nullable |
| avatar_url | text | Nullable |
| bio | text | Nullable |
| education_level | text | Nullable |
| field_of_study | text | Nullable |
| stream | text | Nullable |
| percentage | numeric | Nullable |
| preferred_city | text | Nullable |
| interests | text[] | Nullable |
| strengths | text[] | Nullable |
| xp | integer | Default: 0 |
| level | integer | Default: 1 |
| streak_days | integer | Default: 0 |
| last_active_date | date | Nullable |
| career_recommendations | jsonb | Nullable |
| onboarding_completed | boolean | Default: false |

### `scholarships`
| Column | Type | Notes |
|---|---|---|
| name | text | Required |
| provider | text | Required |
| category | text | central, maharashtra, aicte, private, divyang, minority, after-10th, after-12th |
| eligibility | text | Nullable |
| income_limit | text | Nullable |
| amount | text | Nullable |
| documents | text | Nullable |
| official_link | text | Required |
| description | text | Nullable |
| deadline | text | Nullable |
| is_trending | boolean | Default: false |

### `chat_messages`
| Column | Type | Notes |
|---|---|---|
| user_id | uuid | Required |
| display_name | text | Default: 'Anonymous' |
| content | text | Required |
| room | text | Default: 'general' |
| created_at | timestamptz | Auto-generated |

### `daily_tasks`
| Column | Type | Notes |
|---|---|---|
| user_id | uuid | Required |
| title | text | Required |
| description | text | Nullable |
| priority | text | Default: 'medium' |
| due_date | date | Nullable |
| completed | boolean | Default: false |

### `user_roles`
| Column | Type | Notes |
|---|---|---|
| user_id | uuid | Required |
| role | enum | admin, moderator, user |

---

## 🔒 Security (RLS Policies)

- **Profiles:** Users can only read/update their own profile
- **Chat Messages:** Authenticated users can read all; users can only insert/delete their own
- **Daily Tasks:** Full CRUD restricted to own user_id
- **Scholarships:** Public read; admin-only insert/update/delete
- **User Roles:** Users can view own role; admins can view/insert/delete all roles

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Footer.tsx
│   ├── Layout.tsx          # Navbar + Outlet + Footer wrapper
│   ├── Logo.tsx
│   ├── Navbar.tsx           # Responsive nav with framer-motion
│   ├── ThemeToggle.tsx      # Light/dark mode toggle
│   ├── UnderConstruction.tsx
│   └── ui/                  # shadcn/ui components
├── contexts/
│   └── AuthContext.tsx       # Auth state provider
├── hooks/
│   ├── use-admin.tsx         # Admin role check
│   ├── use-mobile.tsx
│   ├── use-theme.tsx
│   └── use-toast.ts
├── integrations/supabase/
│   ├── client.ts             # Auto-generated client
│   └── types.ts              # Auto-generated types
├── pages/
│   ├── Index.tsx             # Home page
│   ├── CareersPage.tsx
│   ├── ScholarshipsPage.tsx  # 48+ scholarships with filters
│   ├── CollegesPage.tsx
│   ├── NGOsPage.tsx
│   ├── CommunityPage.tsx
│   ├── CommunityChatPage.tsx # Real-time chat
│   ├── AIChatPage.tsx
│   ├── SkillsPage.tsx
│   ├── InternshipsPage.tsx
│   ├── CareerQuizPage.tsx
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── AboutPage.tsx
│   ├── AdminPage.tsx         # Admin panel
│   └── NotFound.tsx
└── supabase/functions/
    ├── ai-chat/index.ts      # AI chat edge function
    └── career-recommend/index.ts  # Career quiz edge function
```

---

## 🚀 Running Locally

```bash
git clone <repo-url>
cd <project>
npm install
npm run dev
```

---

## 📝 Notes

- The platform philosophy prioritizes **functional features over static placeholders** — pages under development show "Under Construction" notices.
- Admin access is at `/adminisreal` — no separate credentials needed, just requires the `admin` role assigned in the database.
- All colors use HSL-based design tokens for consistent theming.
