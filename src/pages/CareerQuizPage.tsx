import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap, Target, Sparkles, Loader2, ArrowRight, ArrowLeft,
  CheckCircle2, BookOpen, Building2, TrendingUp, IndianRupee
} from "lucide-react";

const EDUCATION_LEVELS = ["10th Pass", "12th Pass", "Undergraduate", "Graduate", "Postgraduate"];
const STREAMS = ["Science", "Commerce", "Arts/Humanities", "Vocational", "Other"];
const INTEREST_OPTIONS = [
  "Technology & Coding", "Business & Finance", "Medicine & Healthcare",
  "Law & Governance", "Creative Arts & Design", "Teaching & Education",
  "Engineering", "Social Work & NGO", "Media & Communication",
  "Sports & Fitness", "Agriculture", "Research & Science"
];
const STRENGTH_OPTIONS = [
  "Problem Solving", "Communication", "Leadership", "Creativity",
  "Analytical Thinking", "Teamwork", "Time Management", "Technical Skills",
  "Public Speaking", "Writing", "Mathematics", "Adaptability"
];
const CITIES = ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Navi Mumbai", "Thane", "Kolhapur", "Anywhere in Maharashtra"];

interface Recommendation {
  title: string;
  description: string;
  courses: string[];
  colleges: string[];
  salary_range: string;
  growth: string;
}

const CareerQuizPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Form state
  const [educationLevel, setEducationLevel] = useState("");
  const [stream, setStream] = useState("");
  const [percentage, setPercentage] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [preferredCity, setPreferredCity] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [user, authLoading, navigate]);

  // Check if user already has recommendations
  useEffect(() => {
    if (user) {
      supabase.from("profiles")
        .select("onboarding_completed, career_recommendations, education_level, stream, percentage, interests, strengths, preferred_city")
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => {
          if (data?.onboarding_completed && data?.career_recommendations) {
            setRecommendations(data.career_recommendations as unknown as Recommendation[]);
            setShowResults(true);
            setEducationLevel(data.education_level || "");
            setStream(data.stream || "");
            setPercentage(data.percentage?.toString() || "");
            setInterests((data.interests as string[]) || []);
            setStrengths((data.strengths as string[]) || []);
            setPreferredCity(data.preferred_city || "");
          }
        });
    }
  }, [user]);

  const toggleItem = (item: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const canProceed = () => {
    switch (step) {
      case 0: return !!educationLevel;
      case 1: return !!stream;
      case 2: return !!percentage;
      case 3: return interests.length >= 2;
      case 4: return strengths.length >= 2;
      case 5: return !!preferredCity;
      default: return false;
    }
  };

  const submitQuiz = async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/career-recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          education_level: educationLevel,
          stream,
          percentage: parseFloat(percentage),
          interests,
          strengths,
          preferred_city: preferredCity,
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || "Failed to get recommendations");
      }

      const data = await resp.json();
      setRecommendations(data.recommendations || []);
      setShowResults(true);

      // Save to profile
      await supabase.from("profiles").update({
        education_level: educationLevel,
        stream,
        percentage: parseFloat(percentage),
        interests,
        strengths,
        preferred_city: preferredCity,
        career_recommendations: data.recommendations,
        onboarding_completed: true,
      }).eq("user_id", user!.id);

      // Award XP
      await supabase.from("profiles").update({
        xp: 50,
      }).eq("user_id", user!.id);

      toast.success("Career recommendations generated! +50 XP 🎉");
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : "Failed to generate recommendations");
    }
    setLoading(false);
  };

  const retake = () => {
    setShowResults(false);
    setStep(0);
    setRecommendations([]);
  };

  if (authLoading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );

  if (!user) return null;

  if (showResults && recommendations.length > 0) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Your Career Recommendations</h1>
        </div>
        <p className="text-muted-foreground mb-6">Based on your profile: {educationLevel} • {stream} • {percentage}%</p>

        <div className="space-y-4">
          {recommendations.map((rec, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-card-foreground">{rec.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  rec.growth === "High" ? "bg-green-500/10 text-green-600" :
                  rec.growth === "Medium" ? "bg-yellow-500/10 text-yellow-600" :
                  "bg-muted text-muted-foreground"
                }`}>
                  <TrendingUp className="w-3 h-3 inline mr-1" />{rec.growth} Growth
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <div>
                  <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1">
                    <BookOpen className="w-3 h-3" /> Courses
                  </div>
                  <div className="space-y-1">
                    {rec.courses.map((c, j) => (
                      <span key={j} className="block text-sm text-card-foreground">{c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1">
                    <Building2 className="w-3 h-3" /> Colleges
                  </div>
                  <div className="space-y-1">
                    {rec.colleges.map((c, j) => (
                      <span key={j} className="block text-sm text-card-foreground">{c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1">
                    <IndianRupee className="w-3 h-3" /> Starting Salary
                  </div>
                  <span className="text-sm font-medium text-card-foreground">{rec.salary_range}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={retake}>Retake Quiz</Button>
          <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  const steps = [
    {
      title: "Education Level",
      subtitle: "What's your current education status?",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EDUCATION_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setEducationLevel(level)}
              className={`p-4 rounded-lg border text-left transition-all ${
                educationLevel === level
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-card-foreground hover:border-primary/30"
              }`}
            >
              <span className="font-medium">{level}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Stream / Field",
      subtitle: "Which stream are you in?",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {STREAMS.map((s) => (
            <button
              key={s}
              onClick={() => setStream(s)}
              className={`p-4 rounded-lg border text-left transition-all ${
                stream === s
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-card-foreground hover:border-primary/30"
              }`}
            >
              <span className="font-medium">{s}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Your Score",
      subtitle: "What percentage did you score?",
      content: (
        <div className="max-w-xs">
          <Input
            type="number"
            placeholder="e.g. 78.5"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            min={0}
            max={100}
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground mt-2">Enter your latest exam percentage</p>
        </div>
      ),
    },
    {
      title: "Your Interests",
      subtitle: "Select at least 2 areas you're interested in",
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {INTEREST_OPTIONS.map((item) => (
            <button
              key={item}
              onClick={() => toggleItem(item, interests, setInterests)}
              className={`p-3 rounded-lg border text-sm text-left transition-all ${
                interests.includes(item)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-card-foreground hover:border-primary/30"
              }`}
            >
              {interests.includes(item) && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
              {item}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Your Strengths",
      subtitle: "Select at least 2 things you're good at",
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {STRENGTH_OPTIONS.map((item) => (
            <button
              key={item}
              onClick={() => toggleItem(item, strengths, setStrengths)}
              className={`p-3 rounded-lg border text-sm text-left transition-all ${
                strengths.includes(item)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-card-foreground hover:border-primary/30"
              }`}
            >
              {strengths.includes(item) && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
              {item}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Preferred Location",
      subtitle: "Where would you like to study/work?",
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setPreferredCity(city)}
              className={`p-3 rounded-lg border text-sm text-left transition-all ${
                preferredCity === city
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-card-foreground hover:border-primary/30"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      ),
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Career Discovery Quiz</h1>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1 mb-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <div className="mb-2 text-xs text-muted-foreground">Step {step + 1} of {steps.length}</div>
      <h2 className="text-xl font-semibold text-foreground mb-1">{currentStep.title}</h2>
      <p className="text-muted-foreground text-sm mb-6">{currentStep.subtitle}</p>

      {currentStep.content}

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
          className="gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>

        {isLastStep ? (
          <Button onClick={submitQuiz} disabled={!canProceed() || loading} className="gap-1">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Analyzing..." : "Get Recommendations"}
          </Button>
        ) : (
          <Button onClick={() => setStep(step + 1)} disabled={!canProceed()} className="gap-1">
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CareerQuizPage;
