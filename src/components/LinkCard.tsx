import { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface LinkCardProps {
  title: string;
  description?: string;
  href: string;
  icon?: ReactNode;
  external?: boolean;
}

const LinkCard = ({ title, description, href, icon, external = true }: LinkCardProps) => (
  <motion.a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="group block rounded-lg border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/30"
    whileHover={{ y: -2 }}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        {icon && <div className="text-primary">{icon}</div>}
        <div>
          <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
      {external && (
        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
      )}
    </div>
  </motion.a>
);

export default LinkCard;
