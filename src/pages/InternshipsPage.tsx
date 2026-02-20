import Section from "@/components/Section";
import LinkCard from "@/components/LinkCard";
import {
  GraduationCap, Rocket, Building2, Globe, Briefcase, Laptop
} from "lucide-react";

const internships = [
  { title: "Internshala", href: "https://internshala.com/", icon: <GraduationCap className="w-5 h-5" />, desc: "India's largest internship platform" },
  { title: "LetsIntern", href: "https://www.letsintern.com/", icon: <Briefcase className="w-5 h-5" />, desc: "Internships & fresher jobs" },
  { title: "AICTE Internship Portal", href: "https://internship.aicte-india.org/", icon: <Building2 className="w-5 h-5" />, desc: "Government internship portal" },
  { title: "ISRO", href: "https://www.isro.gov.in/", icon: <Rocket className="w-5 h-5" />, desc: "Space research opportunities" },
  { title: "DRDO", href: "https://www.drdo.gov.in/", icon: <Building2 className="w-5 h-5" />, desc: "Defence research internships" },
  { title: "Google Careers", href: "https://careers.google.com/", icon: <Globe className="w-5 h-5" />, desc: "Internships at Google" },
  { title: "Microsoft Careers", href: "https://careers.microsoft.com/", icon: <Laptop className="w-5 h-5" />, desc: "Internships at Microsoft" },
  { title: "Amazon Jobs", href: "https://www.amazon.jobs/", icon: <Globe className="w-5 h-5" />, desc: "Internships at Amazon" },
  { title: "TCS", href: "https://www.tcs.com/careers", icon: <Building2 className="w-5 h-5" />, desc: "TCS internship programs" },
  { title: "Infosys", href: "https://www.infosys.com/careers/", icon: <Building2 className="w-5 h-5" />, desc: "Infosys InStep & more" },
  { title: "Wipro", href: "https://careers.wipro.com/", icon: <Building2 className="w-5 h-5" />, desc: "Wipro career programs" },
];

const InternshipsPage = () => (
  <Section title="Internship Opportunities" subtitle="Find real internship programs. All links open in a new tab — apply directly.">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {internships.map((p) => (
        <LinkCard key={p.title} {...p} />
      ))}
    </div>
  </Section>
);

export default InternshipsPage;
