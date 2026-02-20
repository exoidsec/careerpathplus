import UnderConstruction from "@/components/UnderConstruction";
import { Link } from "react-router-dom";

const LoginPage = () => (
  <div className="min-h-[70vh] flex items-center justify-center px-4">
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-foreground mb-1">Sign In</h1>
      <p className="text-muted-foreground mb-6">Welcome back to CareerPath.</p>
      <UnderConstruction
        title="Authentication Under Construction"
        message="Sign in with email/password and Google login will be available once backend integration is set up. Stay tuned!"
      />
      <p className="text-sm text-muted-foreground text-center mt-6">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary hover:underline font-medium">Sign Up</Link>
      </p>
    </div>
  </div>
);

export default LoginPage;
