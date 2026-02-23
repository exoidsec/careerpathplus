import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl shadow-nav border-b border-border transition-theme">
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Logo />

        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-x-1 -bottom-[1px] h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          {isAdmin && (
            <Link to="/adminisreal" className="px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200">
              Admin
            </Link>
          )}
          <Link
            to={user ? "/dashboard" : "/login"}
            className="ml-1 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 active:scale-[0.97] transition-all duration-200"
          >
            {user ? "Dashboard" : "Sign In"}
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="lg:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                      location.pathname === link.to
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {isAdmin && (
                <Link to="/adminisreal" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-md text-sm font-medium text-destructive">
                  Admin
                </Link>
              )}
              <Link
                to={user ? "/dashboard" : "/login"}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-md text-sm font-medium text-primary"
              >
                {user ? "Dashboard" : "Sign In"}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
