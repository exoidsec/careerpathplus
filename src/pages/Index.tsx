import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp, Compass, DollarSign, BarChart3, Bot,
  Users, GraduationCap, Building2, School, Heart,
  Code, Languages, Video, Monitor, Handshake, FileSpreadsheet,
  ArrowRight
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
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.4 }
  }),
};

const CardGrid = ({ cards, linkTo }: { cards: typeof careerCards; linkTo: string }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {cards.map((card, i) => (
      <motion.div
        key={card.title}
        custom={i}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <Link
          to={linkTo}
          className="group block rounded-lg border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/30"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
            {card.icon}
          </div>
          <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">{card.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{card.desc}</p>
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
        <div className="absolute inset-0 opacity-10">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container max-w-6xl mx-auto px-4 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
              Discover Your Career Path with{" "}
              <span className="text-primary">Confidence</span>
            </h1>
            <p className="text-lg text-muted-foreground mt-5 max-w-lg">
              AI-powered roadmap, salary trends, job market demand, internships, and personalized growth tracking — all in one place.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/skills"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card text-foreground font-medium hover:bg-muted transition-colors"
              >
                Explore Skills
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Careers */}
      <Section title="Career Tools" subtitle="Explore tools to plan and accelerate your career.">
        <CardGrid cards={careerCards} linkTo="/careers" />
      </Section>

      {/* Community */}
      <Section title="Community & Support" subtitle="Resources, scholarships, and support networks." className="bg-muted/40">
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
