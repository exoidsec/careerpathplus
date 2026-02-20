import Section from "@/components/Section";
import LinkCard from "@/components/LinkCard";
import {
  Briefcase, Globe, Code, Monitor, Laptop, Users,
  Search, Rocket, Building2, Award
} from "lucide-react";

const jobPortals = [
  { title: "LinkedIn Jobs", href: "https://www.linkedin.com/jobs/", icon: <Users className="w-5 h-5" />, desc: "Professional networking & jobs" },
  { title: "Indeed", href: "https://www.indeed.com/", icon: <Search className="w-5 h-5" />, desc: "World's largest job site" },
  { title: "Glassdoor", href: "https://www.glassdoor.com/", icon: <Building2 className="w-5 h-5" />, desc: "Jobs, salaries & company reviews" },
  { title: "Naukri.com", href: "https://www.naukri.com/", icon: <Briefcase className="w-5 h-5" />, desc: "India's top job portal" },
  { title: "Monster", href: "https://www.monster.com/", icon: <Globe className="w-5 h-5" />, desc: "Global job search engine" },
  { title: "Wellfound", href: "https://wellfound.com/", icon: <Rocket className="w-5 h-5" />, desc: "Startup jobs & talent" },
  { title: "HackerRank", href: "https://www.hackerrank.com/", icon: <Code className="w-5 h-5" />, desc: "Tech hiring & coding challenges" },
  { title: "Turing", href: "https://www.turing.com/", icon: <Laptop className="w-5 h-5" />, desc: "Remote developer jobs" },
  { title: "Toptal", href: "https://www.toptal.com/", icon: <Award className="w-5 h-5" />, desc: "Top freelance talent network" },
  { title: "Upwork", href: "https://www.upwork.com/", icon: <Monitor className="w-5 h-5" />, desc: "Freelancing marketplace" },
  { title: "Freelancer", href: "https://www.freelancer.com/", icon: <Globe className="w-5 h-5" />, desc: "Freelance projects & contests" },
  { title: "Remote OK", href: "https://remoteok.com/", icon: <Laptop className="w-5 h-5" />, desc: "Remote job board" },
  { title: "We Work Remotely", href: "https://weworkremotely.com/", icon: <Globe className="w-5 h-5" />, desc: "Remote jobs community" },
  { title: "Dice", href: "https://www.dice.com/", icon: <Code className="w-5 h-5" />, desc: "Tech-focused career site" },
  { title: "USAJOBS", href: "https://www.usajobs.gov/", icon: <Building2 className="w-5 h-5" />, desc: "US government jobs" },
  { title: "Cutshort", href: "https://cutshort.io/", icon: <Rocket className="w-5 h-5" />, desc: "AI-powered hiring platform" },
  { title: "Instahyre", href: "https://www.instahyre.com/", icon: <Briefcase className="w-5 h-5" />, desc: "Curated job opportunities" },
  { title: "Foundit", href: "https://www.foundit.in/", icon: <Search className="w-5 h-5" />, desc: "Formerly Monster India" },
  { title: "Hirect", href: "https://www.hirect.in/", icon: <Users className="w-5 h-5" />, desc: "Chat-based hiring app" },
];

const CareersPage = () => (
  <Section title="Career Portals" subtitle="Browse real job portals. All links open externally in a new tab.">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobPortals.map((p) => (
        <LinkCard key={p.title} title={p.title} description={p.desc} href={p.href} icon={p.icon} />
      ))}
    </div>
  </Section>
);

export default CareersPage;
