import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 group">
    <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
      <TrendingUp className="w-5 h-5 text-primary-foreground" />
    </div>
    <span className="text-xl font-bold text-foreground">
      Career<span className="text-primary">Path</span>
    </span>
  </Link>
);

export default Logo;
