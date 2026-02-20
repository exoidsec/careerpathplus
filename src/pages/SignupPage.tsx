import UnderConstruction from "@/components/UnderConstruction";
import { Link } from "react-router-dom";

const SignupPage = () => (
  <div className="min-h-[70vh] flex items-center justify-center px-4">
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-foreground mb-1">Create Account</h1>
      <p className="text-muted-foreground mb-6">Start your career journey with CareerPath.</p>
      <UnderConstruction
        title="Registration Under Construction"
        message="Account creation with email, password, and Google signup will be available once backend integration is set up."
      />
      <p className="text-sm text-muted-foreground text-center mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline font-medium">Sign In</Link>
      </p>
    </div>
  </div>
);

export default SignupPage;
