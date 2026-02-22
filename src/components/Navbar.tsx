import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/use-admin";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Careers", to: "/careers" },
  { label: "Scholarships", to: "/scholarships" },
  { label: "Colleges", to: "/colleges" },
  { label: "NGOs", to: "/ngos" },
  { label: "Community", to: "/community" },
  { label: "Chat", to: "/chat" },
  { label: "AI Chat", to: "/ai-chat" },
  { label: "Skills", to: "/skills" },
  { label: "Internships", to: "/internships" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { isAdmin } = useAdmin();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg shadow-nav border-b border-border">
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Logo />

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          {isAdmin && (
            <Link to="/adminisreal" className="px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">Admin</Link>
          )}
          {user ? (
            <Link to="/dashboard" className="ml-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Dashboard</Link>
          ) : (
            <Link to="/login" className="ml-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Sign In</Link>
          )}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md text-foreground hover:bg-muted"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background px-4 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 px-3 py-2">
            <ThemeToggle />
          </div>
          {isAdmin && (
            <Link to="/adminisreal" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-md text-sm font-medium text-destructive">Admin</Link>
          )}
          <Link to={user ? "/dashboard" : "/login"} onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-md text-sm font-medium text-primary">
            {user ? "Dashboard" : "Sign In"}
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
