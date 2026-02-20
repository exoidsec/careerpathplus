import { Construction } from "lucide-react";

interface UnderConstructionProps {
  title?: string;
  message?: string;
}

const UnderConstruction = ({
  title = "Under Construction",
  message = "This section is currently being built. New features and content are being added. Please check back soon."
}: UnderConstructionProps) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6">
      <Construction className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground max-w-md">{message}</p>
  </div>
);

export default UnderConstruction;
