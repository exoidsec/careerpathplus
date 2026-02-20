import Section from "@/components/Section";

const AboutPage = () => (
  <Section title="About CareerPath" subtitle="Empowering students to navigate their career journey with confidence.">
    <div className="prose prose-neutral max-w-2xl">
      <p className="text-muted-foreground leading-relaxed">
        CareerPath is a student-focused platform designed to help you discover career opportunities,
        build in-demand skills, find internships, and connect with communities that support your growth.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-4">
        We aggregate real resources — job portals, learning platforms, internship programs, and
        developer communities — so you can focus on what matters: building your future.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-4">
        This platform is actively being developed. Features like AI-powered career assistance,
        personalized dashboards, and gamification are coming soon.
      </p>
    </div>
  </Section>
);

export default AboutPage;
