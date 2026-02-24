# CareerPath+ — Complete Project Documentation

> **Live URL:** [careerpathplus.lovable.app](https://careerpathplus.lovable.app)  
> **Tech Stack:** React · TypeScript · Vite · Tailwind CSS · Lovable Cloud · Framer Motion · shadcn/ui  
> **Total Pages:** 16  
> **Total External Links/Resources Listed:** 100+  
> **Database Tables:** 5  
> **Edge Functions:** 2  

---

## 📊 Platform Summary (Numbers at a Glance)

| Category | Count |
|---|---|
| Total Pages/Routes | 16 |
| Career Portals Listed | 19 |
| Skill/Learning Platforms Listed | 13 |
| Internship Links Listed | 11 |
| Colleges Listed | 25 (across 5 regions) |
| NGOs Listed | 46 (across 6 categories) |
| Community/Dev Links Listed | 15 |
| Scholarships in Database | 48 (across 8 categories) |
| Chat Rooms | 4 |
| Career Quiz Steps | 6 |
| Interest Options in Quiz | 12 |
| Strength Options in Quiz | 12 |
| City Options in Quiz | 9 |
| Education Levels in Quiz | 5 |
| Streams in Quiz | 5 |
| Dashboard Stats Tracked | 4 (XP, Level, Streak, Tasks) |
| Achievement Badges | 4 |
| Dashboard Quick Links | 5 |
| Navbar Links | 10 + conditional Admin + Sign In/Dashboard |
| Footer Sections | 4 (Logo, Platform, Account, Legal) |
| Admin Panel Tabs | 2 (Scholarships, Users) |
| Admin Stats Cards | 3 (Users, Scholarships, Tasks) |
| Scholarship Categories (Admin Add) | 4 options in dropdown |
| AI Chat Suggested Prompts | 3 |
| Home Page Feature Card Sections | 3 (Career: 5, Community: 5, Skills: 7 = 17 total cards) |

---

## 🗺️ All Pages & Routes (16 total)

| # | Route | Page Name | Auth Required | Description |
|---|---|---|---|---|
| 1 | `/` | Home | No | Hero section with animated cards, 3 feature sections (17 cards total) |
| 2 | `/careers` | Career Portals | No | 19 external job portal links |
| 3 | `/scholarships` | Scholarships Directory | No | 48 scholarships with search + 8 category filters |
| 4 | `/colleges` | Colleges | No | 25 colleges across 5 Maharashtra regions |
| 5 | `/ngos` | NGOs Directory | No | 46 NGOs across 6 categories |
| 6 | `/community` | Community | No | 15 developer/security/competitive programming links |
| 7 | `/chat` | Community Chat | ✅ Yes | Real-time chat with 4 rooms |
| 8 | `/ai-chat` | AI Chat | ✅ Yes | AI-powered career assistant (streaming) |
| 9 | `/skills` | Skills & Learning | No | 13 learning platform links |
| 10 | `/internships` | Internships | No | 11 internship portal links |
| 11 | `/career-quiz` | Career Quiz | ✅ Yes | 6-step quiz → AI career recommendations |
| 12 | `/dashboard` | Dashboard | ✅ Yes | Profile, XP, tasks, achievements |
| 13 | `/login` | Login | No | Email/password sign in |
| 14 | `/signup` | Sign Up | No | Email/password registration + display name |
| 15 | `/about` | About | No | Platform description |
| 16 | `/adminisreal` | Admin Panel | ✅ Admin only | Manage scholarships & view users |

---

## 📄 Detailed Page Breakdown

### 1. Home Page (`/`)
- **Hero Section:** Background image, gradient title, "AI-Powered Career Guidance" badge with Sparkles icon
- **CTA Buttons:** "Get Started" → `/signup`, "Explore Skills" → `/skills`
- **Career Tools Section (5 cards):**
  1. Academic Performance Analysis
  2. Career Roadmap
  3. Salary Trends
  4. Job Market Demand
  5. AI Career Assistant
- **Community & Support Section (5 cards):**
  1. Minority Support
  2. Scholarship Finder
  3. Fees & Cutoff Analyzer
  4. Best College Finder
  5. NGOs Directory
- **Skills Development Section (7 cards):**
  1. Skill Exchange
  2. Languages
  3. Programming
  4. Video & Graphics
  5. Operating Systems
  6. Soft Skills
  7. MS Office
- **Animations:** Staggered `whileInView` fade-up on all cards, hero fade-in with delay cascade

---

### 2. Career Portals (`/careers`) — 19 Links
| # | Portal | Description |
|---|---|---|
| 1 | LinkedIn Jobs | Professional networking & jobs |
| 2 | Indeed | World's largest job site |
| 3 | Glassdoor | Jobs, salaries & company reviews |
| 4 | Naukri.com | India's top job portal |
| 5 | Monster | Global job search engine |
| 6 | Wellfound | Startup jobs & talent |
| 7 | HackerRank | Tech hiring & coding challenges |
| 8 | Turing | Remote developer jobs |
| 9 | Toptal | Top freelance talent network |
| 10 | Upwork | Freelancing marketplace |
| 11 | Freelancer | Freelance projects & contests |
| 12 | Remote OK | Remote job board |
| 13 | We Work Remotely | Remote jobs community |
| 14 | Dice | Tech-focused career site |
| 15 | USAJOBS | US government jobs |
| 16 | Cutshort | AI-powered hiring platform |
| 17 | Instahyre | Curated job opportunities |
| 18 | Foundit | Formerly Monster India |
| 19 | Hirect | Chat-based hiring app |

---

### 3. Scholarships (`/scholarships`) — 48 Scholarships

**Category Breakdown:**
| Category | Icon | Count |
|---|---|---|
| Central Government | 🏛️ Landmark | 9 |
| Maharashtra Government | 🏢 Building | 9 |
| After 10th | 🏫 School | 8 |
| Private | ❤️ Heart | 7 |
| Minority | 👥 Users | 7 |
| Divyang | ♿ Accessibility | 4 |
| AICTE | 🎓 GraduationCap | 2 |
| After 12th | 📖 BookOpen | 2 |
| **Total** | | **48** |

**Features:**
- Search by name or provider
- Filter by 8 categories + "All" = 9 filter buttons
- Each card shows: Name, Provider, Eligibility, Amount, Income Limit, Description, External Link

---

### 4. Colleges (`/colleges`) — 25 Colleges across 5 Regions

**Mumbai (11 colleges):**
1. St. Xavier's College Mumbai — BA, BSc, BCom (90–97%)
2. Kishinchand Chellaram College — BMS, BCom, BA (85–92%)
3. Government Law College Mumbai — LLB
4. Veermata Jijabai Technological Institute — Engineering (99+ percentile)
5. Sardar Patel Institute of Technology — Engineering (97–99 percentile)
6. Xavier Institute of Engineering — Engineering (85–95 percentile)
7. Jai Hind College — BMS, BAF, BBI (88–95%)
8. HR College of Commerce and Economics — Commerce (92–97%)
9. KJ Somaiya College — Multiple (80–90%)
10. Rizvi College Mumbai — Multiple (60–85%)
11. Sophia College Mumbai — Arts, Science (85–92%)

**Pune (4 colleges):**
1. College of Engineering Pune — Engineering (99+ percentile)
2. Fergusson College — BA, BSc (85–95%)
3. Brihan Maharashtra College of Commerce — BCom, BBA (85–92%)
4. Modern College Pune — Arts/Commerce/Science (70–85%)

**Navi Mumbai / Thane (3 colleges):**
1. Bharati Vidyapeeth College of Engineering — Engineering (85–95 percentile)
2. Pillai College of Engineering — Engineering (80–90 percentile)
3. Terna Engineering College — Engineering (75–88 percentile)

**Nagpur (2 colleges):**
1. VNIT Nagpur — Engineering (JEE Main)
2. Government Medical College Nagpur — MBBS (NEET)

**Other Maharashtra (5 colleges/universities):**
1. Shivaji University Kolhapur
2. Savitribai Phule Pune University
3. University of Mumbai
4. MIT World Peace University
5. NMIMS University Mumbai

---

### 5. NGOs (`/ngos`) — 46 NGOs across 6 Categories

**Education & Skill Training (5):** Pratham, Eklavya India Foundation, Jnana Prabodhini, Parisar Asha, Supervasi Foundation

**Muslim Minority Welfare (6):** Muslim Welfare Association, Federation of Maharashtra Muslims, Muslim Education Society Dapoli, Riyaz-ul-Uloom Welfare Trust, Aabshar-E-Ilm Education Society, A Y Sayyied Educational Memorial Trust

**Education & Welfare Trusts (9):** OSK Educational and Welfare Society, Samaj Uddhar Samiti, Aabid Foundation, Aadarsh Bahuddeshiya Sanstha, 360 Life Changer Charitable Trust, 3rd Eye Knowledge Foundation, A Ray of Hope Charitable Trust, Aabhalmaya Social & Educational Trust, Lokseva Kendra Nandurbar

**Youth Mentoring (5):** Sahaara Charitable Society, Sarthak Seva Sangh, Maharashtra Dyslexia Association, Bhoomika Student Mentoring Initiatives, Dheya Career Mentoring Network Partners

**National NGOs (6):** CRY, Catalysts for Social Action, Teach For India, Bhumi Foundation, Angel Xpress Foundation, Robin Hood Army

**Other Maharashtra NGOs (19):** Earth Social Foundation, Help Zone Foundation, Shiva Manish Welfare Foundation, Book of Child's Dream Foundation, A J Social Foundation, Rural Development Trust Maharashtra, Navodaya Foundation, Mamta Foundation, Swadhar Pune, Miti Ki Rang, Lighthouse Mentoring Project, Khushiyaan Foundation, Ananta Khushiyaan Trust, Beach Warriors India, Vatsalya Trust Navi Mumbai, Divine Foundation Belapur, Sujaya Foundation Navi Mumbai, Bright Future Training Centres, Project Mumbai

---

### 6. Community (`/community`) — 15 Links across 3 Sections

**Developer Communities (6):** GitHub, Stack Overflow, Reddit (r/programming), Discord, Hashnode, Dev.to

**Cybersecurity & CTF (6):** OWASP, Hack The Box, TryHackMe, PicoCTF, Root Me, CTFtime

**Competitive Programming (3):** CodeChef, Codeforces, Kaggle

---

### 7. Community Chat (`/chat`) — Real-time Messaging

- **4 Chat Rooms:** `#general`, `#careers`, `#skills`, `#internships`
- **Features:** Real-time message subscription, send/delete own messages, 500 char limit, auto-scroll
- **Auth:** Login required, displays user's display name

---

### 8. AI Chat (`/ai-chat`) — Streaming AI Assistant

- **Model:** Uses Lovable Cloud edge function (`ai-chat`)
- **Features:** Streaming responses (SSE), chat history, suggested starter prompts
- **3 Suggested Prompts:**
  1. "Best engineering colleges in Mumbai?"
  2. "Scholarships for minority students?"
  3. "Career roadmap for CS students"
- **UI:** Bot avatar, user avatar, loading spinner, Beta badge

---

### 9. Skills & Learning (`/skills`) — 13 Platforms

| # | Platform | Description |
|---|---|---|
| 1 | Coursera | University courses online |
| 2 | Udemy | Affordable online courses |
| 3 | edX | Harvard, MIT & more |
| 4 | Pluralsight | Tech skill development |
| 5 | Codecademy | Interactive coding lessons |
| 6 | DataCamp | Data science & analytics |
| 7 | Udacity | Nanodegree programs |
| 8 | freeCodeCamp | Free coding curriculum |
| 9 | Cybrary | Cybersecurity training |
| 10 | INE Security | Security certifications |
| 11 | OffSec | Offensive security training |
| 12 | SANS Institute | Information security training |
| 13 | Cisco Networking Academy | Networking & IT courses |

---

### 10. Internships (`/internships`) — 11 Links

| # | Portal | Description |
|---|---|---|
| 1 | Internshala | India's largest internship platform |
| 2 | LetsIntern | Internships & fresher jobs |
| 3 | AICTE Internship Portal | Government internship portal |
| 4 | ISRO | Space research opportunities |
| 5 | DRDO | Defence research internships |
| 6 | Google Careers | Internships at Google |
| 7 | Microsoft Careers | Internships at Microsoft |
| 8 | Amazon Jobs | Internships at Amazon |
| 9 | TCS | TCS internship programs |
| 10 | Infosys | Infosys InStep & more |
| 11 | Wipro | Wipro career programs |

---

### 11. Career Quiz (`/career-quiz`) — 6-Step AI Quiz

**Step 1 — Education Level (5 options):**
10th Pass, 12th Pass, Undergraduate, Graduate, Postgraduate

**Step 2 — Stream (5 options):**
Science, Commerce, Arts/Humanities, Vocational, Other

**Step 3 — Score:**
Percentage input (0–100)

**Step 4 — Interests (12 options, select ≥2):**
Technology & Coding, Business & Finance, Medicine & Healthcare, Law & Governance, Creative Arts & Design, Teaching & Education, Engineering, Social Work & NGO, Media & Communication, Sports & Fitness, Agriculture, Research & Science

**Step 5 — Strengths (12 options, select ≥2):**
Problem Solving, Communication, Leadership, Creativity, Analytical Thinking, Teamwork, Time Management, Technical Skills, Public Speaking, Writing, Mathematics, Adaptability

**Step 6 — Preferred City (9 options):**
Mumbai, Pune, Nagpur, Nashik, Aurangabad, Navi Mumbai, Thane, Kolhapur, Anywhere in Maharashtra

**Output:** AI-generated career recommendations with title, description, courses, colleges, salary range, and growth level. Saved to profile. Awards 50 XP.

---

### 12. Dashboard (`/dashboard`)

**Stats Cards (4):** XP, Level, Streak Days, Tasks Done (completed/total)

**Daily Planner:**
- Add tasks (Enter or button), +5 XP per task added
- Complete tasks (checkbox), +10 XP per completion
- Delete tasks
- Level up formula: Level = floor(XP / 100) + 1

**Quick Links (5):** Career Quiz, Explore Careers, Build Skills, Find Internships, Join Community

**Achievement Badges (4):**
| Badge | Requirement |
|---|---|
| First Task | Add 1 task |
| Achiever | Complete 5 tasks |
| Centurion | Earn 100 XP |
| Rising Star | Reach Level 3 |

**Sign Out** button in header.

---

### 13. Login (`/login`)
- Email + Password fields with icons (Mail, Lock)
- Link to Sign Up page
- Redirects to Dashboard on success

### 14. Sign Up (`/signup`)
- Display Name + Email + Password fields with icons (User, Mail, Lock)
- 6 char min password validation
- Auto-creates profile via database trigger
- Link to Login page
- Redirects to Dashboard on success

### 15. About (`/about`)
- Static text describing the platform mission and vision

### 16. Admin Panel (`/adminisreal`)
- **Access:** Admin role required (checked via `user_roles` table)
- **3 Stats Cards:** Users count, Scholarships count, Tasks created count
- **Tab 1 — Scholarships:** Add form (6 fields: name, provider, category dropdown [4 options], eligibility, official link, description) + list all with delete
- **Tab 2 — Users:** List all users with display name and join date

---

## 🧭 Navigation Structure

### Navbar (10 links + conditionals)
| Link | Label |
|---|---|
| `/` | Home |
| `/careers` | Careers |
| `/scholarships` | Scholarships |
| `/colleges` | Colleges |
| `/ngos` | NGOs |
| `/community` | Community |
| `/chat` | Chat |
| `/ai-chat` | AI Chat |
| `/skills` | Skills |
| `/internships` | Internships |
| `/adminisreal` | Admin *(admin only)* |
| `/dashboard` or `/login` | Dashboard / Sign In *(conditional)* |

- Desktop: Horizontal nav with spring-animated active indicator
- Mobile: Hamburger menu with AnimatePresence slide animation
- Theme toggle (Sun/Moon with rotate animation)

### Footer (4 columns)
1. **Logo + tagline**
2. **Platform:** Careers, Skills, Internships, Community
3. **Account:** Dashboard, Sign In, Sign Up
4. **Legal:** About, Privacy Policy, Terms of Service

---

## 🗄️ Database Schema (5 Tables)

### `profiles` (14 data columns)
user_id, display_name, avatar_url, bio, education_level, field_of_study, stream, percentage, preferred_city, interests[], strengths[], xp, level, streak_days, last_active_date, career_recommendations (jsonb), onboarding_completed

### `scholarships` (12 data columns)
name, provider, category, eligibility, income_limit, amount, documents, official_link, description, deadline, is_trending

### `chat_messages` (4 data columns)
user_id, display_name, content, room

### `daily_tasks` (5 data columns)
user_id, title, description, priority, due_date, completed

### `user_roles` (2 data columns)
user_id, role (admin | moderator | user)

---

## ⚙️ Backend Functions

### Edge Functions (2)
1. **`ai-chat`** — Streaming AI career assistant (SSE)
2. **`career-recommend`** — Career quiz AI analysis → returns recommendations

### Database Functions (3)
1. **`has_role(user_id, role)`** — Checks if user has a specific role
2. **`handle_new_user()`** — Trigger: auto-creates profile on signup
3. **`update_updated_at_column()`** — Trigger: auto-updates timestamps

---

## 🔒 Security (RLS Policies)

| Table | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| profiles | Own only | Own only | Own only | ❌ |
| chat_messages | Authenticated | Own only | ❌ | Own only |
| daily_tasks | Own only | Own only | Own only | Own only |
| scholarships | Public | Admin only | Admin only | Admin only |
| user_roles | Own + Admin | Admin only | ❌ | Admin only |

---

## 🎨 UI/Design Features

- **Theme:** Light/Dark mode with smooth CSS transitions (300ms)
- **Animations:** Framer Motion throughout — hero fade, card stagger, navbar spring indicator, mobile menu slide, theme toggle rotate
- **Components:** shadcn/ui (Button, Input, Checkbox, Tabs, Toast, Sonner, Label, etc.)
- **Icons:** Lucide React (60+ unique icons used)
- **Layout:** Responsive — mobile hamburger nav, grid layouts adapt 1→2→3 columns
- **Design Tokens:** HSL-based CSS variables for all colors, semantic naming

---

## 🚀 Running Locally

```bash
git clone <repo-url>
cd <project>
npm install
npm run dev
```

---

## 📝 Key Notes

- Platform philosophy: **functional features over placeholders** — "Under Construction" for WIP, no fake data
- Admin access: `/adminisreal` — no separate credentials, requires `admin` role in database
- All external links open in new tabs
- Career Quiz awards 50 XP, tasks award 5 XP (add) / 10 XP (complete)
- Level formula: `floor(XP / 100) + 1`
