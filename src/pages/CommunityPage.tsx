import Section from "@/components/Section";
import LinkCard from "@/components/LinkCard";
import {
  Github, MessageSquare, Globe, Shield, Terminal,
  Trophy, Code, BarChart3, Flag
} from "lucide-react";

const devCommunities = [
  { title: "GitHub", href: "https://github.com/", icon: <Github className="w-5 h-5" />, desc: "Code hosting & open source" },
  { title: "Stack Overflow", href: "https://stackoverflow.com/", icon: <MessageSquare className="w-5 h-5" />, desc: "Q&A for developers" },
  { title: "Reddit (r/programming)", href: "https://www.reddit.com/r/programming/", icon: <Globe className="w-5 h-5" />, desc: "Programming discussions" },
  { title: "Discord (Dev communities)", href: "https://discord.com/", icon: <MessageSquare className="w-5 h-5" />, desc: "Real-time chat communities" },
  { title: "Hashnode", href: "https://hashnode.com/", icon: <Globe className="w-5 h-5" />, desc: "Developer blogging platform" },
  { title: "Dev.to", href: "https://dev.to/", icon: <Code className="w-5 h-5" />, desc: "Developer community & articles" },
];

const securityCommunities = [
  { title: "OWASP", href: "https://owasp.org/", icon: <Shield className="w-5 h-5" />, desc: "Web application security" },
  { title: "Hack The Box", href: "https://www.hackthebox.com/", icon: <Terminal className="w-5 h-5" />, desc: "Cybersecurity training labs" },
  { title: "TryHackMe", href: "https://tryhackme.com/", icon: <Shield className="w-5 h-5" />, desc: "Learn cybersecurity hands-on" },
  { title: "PicoCTF", href: "https://picoctf.org/", icon: <Flag className="w-5 h-5" />, desc: "Beginner-friendly CTF" },
  { title: "Root Me", href: "https://www.root-me.org/", icon: <Terminal className="w-5 h-5" />, desc: "Hacking challenges" },
  { title: "CTFtime", href: "https://ctftime.org/", icon: <Trophy className="w-5 h-5" />, desc: "CTF event tracker" },
];

const competitiveProgramming = [
  { title: "CodeChef", href: "https://www.codechef.com/", icon: <Code className="w-5 h-5" />, desc: "Competitive programming contests" },
  { title: "Codeforces", href: "https://codeforces.com/", icon: <Trophy className="w-5 h-5" />, desc: "Programming competitions" },
  { title: "Kaggle", href: "https://www.kaggle.com/", icon: <BarChart3 className="w-5 h-5" />, desc: "Data science competitions" },
];

const CommunityPage = () => (
  <>
    <Section title="Developer Communities" subtitle="Join communities to learn, share, and grow with fellow developers.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {devCommunities.map((c) => (
          <LinkCard key={c.title} {...c} />
        ))}
      </div>
    </Section>

    <Section title="Cybersecurity & CTF" subtitle="Practice security skills and participate in capture-the-flag events." className="bg-muted/40">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {securityCommunities.map((c) => (
          <LinkCard key={c.title} {...c} />
        ))}
      </div>
    </Section>

    <Section title="Competitive Programming" subtitle="Sharpen your problem-solving through competitions.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {competitiveProgramming.map((c) => (
          <LinkCard key={c.title} {...c} />
        ))}
      </div>
    </Section>
  </>
);

export default CommunityPage;
