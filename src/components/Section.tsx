import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const Section = ({ title, subtitle, children, className = "" }: SectionProps) => (
  <section className={`py-16 md:py-24 ${className}`}>
    <div className="container max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
        {subtitle && (
          <p className="text-muted-foreground mt-3 max-w-2xl">{subtitle}</p>
        )}
      </motion.div>
      {children}
    </div>
  </section>
);

export default Section;
