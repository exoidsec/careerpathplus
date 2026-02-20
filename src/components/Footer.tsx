import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => (
  <footer className="border-t border-border bg-muted/50 py-12">
    <div className="container max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="text-sm text-muted-foreground mt-3">
            AI-powered career guidance for students.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
            <li><Link to="/skills" className="hover:text-foreground transition-colors">Skills</Link></li>
            <li><Link to="/internships" className="hover:text-foreground transition-colors">Internships</Link></li>
            <li><Link to="/community" className="hover:text-foreground transition-colors">Community</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Account</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
            <li><Link to="/login" className="hover:text-foreground transition-colors">Sign In</Link></li>
            <li><Link to="/signup" className="hover:text-foreground transition-colors">Sign Up</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
            <li><span className="cursor-default">Privacy Policy</span></li>
            <li><span className="cursor-default">Terms of Service</span></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} CareerPath. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
