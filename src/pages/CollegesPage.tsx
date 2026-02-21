import Section from "@/components/Section";
import { GraduationCap, MapPin, TrendingUp } from "lucide-react";

interface College {
  name: string;
  courses: string;
  cutoff?: string;
  note?: string;
}

const mumbaiColleges: College[] = [
  { name: "St. Xavier's College Mumbai", courses: "BA, BSc, BCom", cutoff: "90–97%" },
  { name: "Kishinchand Chellaram College", courses: "BMS, BCom, BA", cutoff: "85–92%", note: "Autonomous college" },
  { name: "Government Law College Mumbai", courses: "LLB", cutoff: "MH-CET Law high rank" },
  { name: "Veermata Jijabai Technological Institute", courses: "Engineering", cutoff: "99+ percentile MHT-CET", note: "One of Maharashtra's oldest govt institutes" },
  { name: "Sardar Patel Institute of Technology", courses: "Engineering", cutoff: "97–99 percentile", note: "Autonomous Mumbai institute" },
  { name: "Xavier Institute of Engineering", courses: "Engineering", cutoff: "85–95 percentile", note: "Minority-managed institute" },
  { name: "Jai Hind College", courses: "BMS, BAF, BBI", cutoff: "88–95%" },
  { name: "HR College of Commerce and Economics", courses: "Commerce", cutoff: "92–97%" },
  { name: "KJ Somaiya College", courses: "Multiple", cutoff: "80–90%" },
  { name: "Rizvi College Mumbai", courses: "Multiple", cutoff: "60–75% (minority) / 70–85% (open)", note: "Minority college" },
  { name: "Sophia College Mumbai", courses: "Arts, Science", cutoff: "85–92%" },
];

const puneColleges: College[] = [
  { name: "College of Engineering Pune", courses: "Engineering", cutoff: "99+ percentile" },
  { name: "Fergusson College", courses: "BA, BSc", cutoff: "85–95%" },
  { name: "Brihan Maharashtra College of Commerce", courses: "BCom, BBA", cutoff: "85–92%" },
  { name: "Modern College Pune", courses: "Arts / Commerce / Science", cutoff: "70–85%" },
];

const naviMumbaiThaneColleges: College[] = [
  { name: "Bharati Vidyapeeth College of Engineering Navi Mumbai", courses: "Engineering", cutoff: "85–95 percentile", note: "AICTE approved" },
  { name: "Pillai College of Engineering", courses: "Engineering", cutoff: "80–90 percentile" },
  { name: "Terna Engineering College", courses: "Engineering", cutoff: "75–88 percentile" },
];

const nagpurColleges: College[] = [
  { name: "Visvesvaraya National Institute of Technology Nagpur", courses: "Engineering", cutoff: "JEE Main high rank" },
  { name: "Government Medical College Nagpur", courses: "MBBS", cutoff: "NEET high score" },
];

const otherColleges: College[] = [
  { name: "Shivaji University Kolhapur", courses: "Multiple degrees", note: "Ranked among top state universities" },
  { name: "Savitribai Phule Pune University", courses: "BA / BSc / MBA etc.", note: "Major public university" },
  { name: "University of Mumbai", courses: "Multiple", note: "Large public university with many affiliated colleges" },
  { name: "MIT World Peace University", courses: "Engineering / Management", note: "NIRF-ranked private university" },
  { name: "NMIMS University Mumbai", courses: "BBA, MBA, Engineering", note: "Popular private university" },
];

const CollegeCard = ({ college }: { college: College }) => (
  <div className="rounded-lg border border-border bg-card p-5 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
        <GraduationCap className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-card-foreground">{college.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{college.courses}</p>
        <div className="flex items-center gap-1.5 mt-2">
          <TrendingUp className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">{college.cutoff ? `Cutoff: ${college.cutoff}` : "Cutoff: Varies"}</span>
        </div>
        {college.note && (
          <p className="text-xs text-muted-foreground mt-1.5 italic">{college.note}</p>
        )}
      </div>
    </div>
  </div>
);

const CollegeSection = ({ title, region, colleges }: { title: string; region: string; colleges: College[] }) => (
  <div className="mb-10">
    <div className="flex items-center gap-2 mb-4">
      <MapPin className="w-5 h-5 text-primary" />
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <span className="text-sm text-muted-foreground">({region})</span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {colleges.map((c) => <CollegeCard key={c.name} college={c} />)}
    </div>
  </div>
);

const CollegesPage = () => (
  <>
    <Section
      title="Colleges in Maharashtra"
      subtitle="⚠️ Cutoffs change every year by category, minority quota, and course. These are recent typical ranges (approx.) for shortlisting."
    >
      <CollegeSection title="Mumbai Colleges" region="Mumbai" colleges={mumbaiColleges} />
      <CollegeSection title="Pune Colleges" region="Pune" colleges={puneColleges} />
      <CollegeSection title="Navi Mumbai / Thane Colleges" region="Navi Mumbai & Thane" colleges={naviMumbaiThaneColleges} />
      <CollegeSection title="Nagpur / Vidarbha Colleges" region="Nagpur" colleges={nagpurColleges} />
      <CollegeSection title="Other Maharashtra Colleges" region="Various" colleges={otherColleges} />
    </Section>
  </>
);

export default CollegesPage;
