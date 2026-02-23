import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, Search, GraduationCap, Building, Landmark, Heart, Accessibility, Users, BookOpen, School } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  category: string;
  eligibility: string | null;
  income_limit: string | null;
  amount: string | null;
  documents: string | null;
  official_link: string;
  description: string | null;
  is_trending: boolean;
}

const categoryConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  central: { label: "Central Govt", icon: <Landmark className="w-5 h-5" />, color: "bg-primary/10 text-primary" },
  maharashtra: { label: "Maharashtra Govt", icon: <Building className="w-5 h-5" />, color: "bg-secondary/10 text-secondary" },
  aicte: { label: "AICTE", icon: <GraduationCap className="w-5 h-5" />, color: "bg-accent/10 text-accent" },
  private: { label: "Private", icon: <Heart className="w-5 h-5" />, color: "bg-destructive/10 text-destructive" },
  divyang: { label: "Divyang", icon: <Accessibility className="w-5 h-5" />, color: "bg-secondary/10 text-secondary" },
  minority: { label: "Minority", icon: <Users className="w-5 h-5" />, color: "bg-accent/10 text-accent" },
  "after-10th": { label: "After 10th", icon: <School className="w-5 h-5" />, color: "bg-primary/10 text-primary" },
  "after-12th": { label: "After 12th", icon: <BookOpen className="w-5 h-5" />, color: "bg-destructive/10 text-destructive" },
};

const ScholarshipsPage = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("scholarships").select("id, name, provider, category, eligibility, income_limit, amount, documents, official_link, description, is_trending")
      .order("category").then(({ data }) => {
        if (data) setScholarships(data);
        setLoading(false);
      });
  }, []);

  const filtered = scholarships.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.provider.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "all" || s.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const categories = ["all", ...Object.keys(categoryConfig)];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-3">🎓 Scholarships Directory</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">Browse 45+ official scholarships — Central, Maharashtra, AICTE, Divyang, Minority, and more.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search scholarships..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {cat === "all" ? "All" : categoryConfig[cat]?.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-20">No scholarships found.</p>
      ) : (
        <div className="grid gap-4">
          {filtered.map(s => {
            const config = categoryConfig[s.category] || categoryConfig.central;
            return (
              <a
                key={s.id}
                href={s.official_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-lg border border-border bg-card shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all group"
              >
                <div className={`p-2.5 rounded-lg ${config.color} shrink-0`}>{config.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">{s.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{s.provider}</p>
                  {s.eligibility && <p className="text-xs text-muted-foreground mt-1"><span className="font-medium">Eligibility:</span> {s.eligibility}</p>}
                  {s.amount && <p className="text-xs text-muted-foreground mt-0.5"><span className="font-medium">Amount:</span> {s.amount}</p>}
                  {s.income_limit && <p className="text-xs text-muted-foreground mt-0.5"><span className="font-medium">Income Limit:</span> {s.income_limit}</p>}
                  {s.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.description}</p>}
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScholarshipsPage;
