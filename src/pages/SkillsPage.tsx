import Section from "@/components/Section";
import LinkCard from "@/components/LinkCard";
import {
  BookOpen, Code, Shield, Globe, BarChart3, Laptop,
  GraduationCap, Terminal, Lock
} from "lucide-react";

const platforms = [
  { title: "Coursera", href: "https://www.coursera.org/", icon: <GraduationCap className="w-5 h-5" />, desc: "University courses online" },
  { title: "Udemy", href: "https://www.udemy.com/", icon: <BookOpen className="w-5 h-5" />, desc: "Affordable online courses" },
  { title: "edX", href: "https://www.edx.org/", icon: <GraduationCap className="w-5 h-5" />, desc: "Harvard, MIT & more" },
  { title: "Pluralsight", href: "https://www.pluralsight.com/", icon: <Code className="w-5 h-5" />, desc: "Tech skill development" },
  { title: "Codecademy", href: "https://www.codecademy.com/", icon: <Terminal className="w-5 h-5" />, desc: "Interactive coding lessons" },
  { title: "DataCamp", href: "https://www.datacamp.com/", icon: <BarChart3 className="w-5 h-5" />, desc: "Data science & analytics" },
  { title: "Udacity", href: "https://www.udacity.com/", icon: <Laptop className="w-5 h-5" />, desc: "Nanodegree programs" },
  { title: "freeCodeCamp", href: "https://www.freecodecamp.org/", icon: <Code className="w-5 h-5" />, desc: "Free coding curriculum" },
  { title: "Cybrary", href: "https://www.cybrary.it/", icon: <Shield className="w-5 h-5" />, desc: "Cybersecurity training" },
  { title: "INE Security", href: "https://ine.com/", icon: <Lock className="w-5 h-5" />, desc: "Security certifications" },
  { title: "OffSec", href: "https://www.offsec.com/", icon: <Shield className="w-5 h-5" />, desc: "Offensive security training" },
  { title: "SANS Institute", href: "https://www.sans.org/", icon: <Lock className="w-5 h-5" />, desc: "Information security training" },
  { title: "Cisco Networking Academy", href: "https://www.netacad.com/", icon: <Globe className="w-5 h-5" />, desc: "Networking & IT courses" },
];

const SkillsPage = () => (
  <Section title="Skills & Learning Platforms" subtitle="Explore real learning platforms to build in-demand skills. All links open externally.">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {platforms.map((p) => (
        <LinkCard key={p.title} {...p} />
      ))}
    </div>
  </Section>
);

export default SkillsPage;
