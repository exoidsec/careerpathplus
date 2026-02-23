import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp, Compass, DollarSign, BarChart3, Bot,
  Users, GraduationCap, Building2, School, Heart,
  Code, Languages, Video, Monitor, Handshake, FileSpreadsheet,
  ArrowRight, Sparkles
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import Section from "@/components/Section";

const careerCards = [
  { icon: <BarChart3 className="w-6 h-6" />, title: "Academic Performance Analysis", desc: "Track and analyze your academic progress" },
  { icon: <Compass className="w-6 h-6" />, title: "Career Roadmap", desc: "Personalized career path planning" },
  { icon: <DollarSign className="w-6 h-6" />, title: "Salary Trends", desc: "Estimated salary data by field" },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Job Market Demand", desc: "Real-time industry demand insights" },
  { icon: <Bot className="w-6 h-6" />, title: "AI Career Assistant", desc: "AI-powered career guidance" },
];

const communityCards = [
  { icon: <Heart className="w-6 h-6" />, title: "Minority Support", desc: "Resources and support programs" },
  { icon: <GraduationCap className="w-6 h-6" />, title: "Scholarship Finder", desc: "Discover scholarships you qualify for" },
  { icon: <DollarSign className="w-6 h-6" />, title: "Fees & Cutoff Analyzer", desc: "Compare college fees and cutoffs" },
  { icon: <School className="w-6 h-6" />, title: "Best College Finder", desc: "Find top colleges for your field" },
  { icon: <Building2 className="w-6 h-6" />, title: "NGOs Directory", desc: "Connect with supporting NGOs" },
];

const skillCards = [
  { icon: <Users className="w-6 h-6" />, title: "Skill Exchange", desc: "Learn and teach with peers" },
  { icon: <Languages className="w-6 h-6" />, title: "Languages", desc: "English, Hindi & more" },
  { icon: <Code className="w-6 h-6" />, title: "Programming", desc: "Python, HTML, JS & more" },
  { icon: <Video className="w-6 h-6" />, title: "Video & Graphics", desc: "Editing and design skills" },
  { icon: <Monitor className="w-6 h-6" />, title: "Operating Systems", desc: "Windows, Linux basics" },
  { icon: <Handshake className="w-6 h-6" />, title: "Soft Skills", desc: "Communication & leadership" },
  { icon: <FileSpreadsheet className="w-6 h-6" />, title: "MS Office", desc: "Word, Excel, PowerPoint" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: "easeOut" as const }
  }),
};

const CardGrid = ({ cards, linkTo }: { cards: typeof careerCards; linkTo: string }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {cards.map((card, i) => (
      <motion.div
        key={card.title}
        custom={i}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={fadeUp}
      >
        <Link
          to={linkTo}
          className="group block rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            {card.icon}
          </div>
          <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200">{card.title}</h3>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{card.desc}</p>
        </Link>
      </motion.div>
    ))}
  </div>
);

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.15]">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        <div className="relative container max-w-6xl mx-auto px-4 py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Career Guidance
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight">
              Discover Your Career Path with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Confidence</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg text-muted-foreground mt-6 max-w-lg leading-relaxed"
            >
              AI-powered roadmap, salary trends, job market demand, internships, and personalized growth tracking — all in one place.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 active:scale-[0.97] shadow-lg shadow-primary/25 transition-all duration-200"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/skills"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border bg-card text-foreground font-semibold hover:bg-muted hover:border-primary/30 active:scale-[0.97] transition-all duration-200"
              >
                Explore Skills
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Careers */}
      <Section title="Career Tools" subtitle="Explore tools to plan and accelerate your career.">
        <CardGrid cards={careerCards} linkTo="/careers" />
      </Section>

      {/* Community */}
      <Section title="Community & Support" subtitle="Resources, scholarships, and support networks." className="bg-muted/30">
        <CardGrid cards={communityCards} linkTo="/community" />
      </Section>

      {/* Skills */}
      <Section title="Skills Development" subtitle="Build in-demand skills with curated learning paths.">
        <CardGrid cards={skillCards} linkTo="/skills" />
      </Section>
    </>
  );
};

export default Index;
