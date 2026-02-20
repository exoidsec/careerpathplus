import UnderConstruction from "@/components/UnderConstruction";

const DashboardPage = () => (
  <div className="container max-w-6xl mx-auto px-4 py-16">
    <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
    <p className="text-muted-foreground mb-8">Your personalized mission control center.</p>
    <UnderConstruction
      title="Dashboard Coming Soon"
      message="We're building your personalized dashboard with progress tracking, skill widgets, gamification, AI suggestions, and more. Authentication is required — this feature will be available once backend integration is complete."
    />
  </div>
);

export default DashboardPage;
