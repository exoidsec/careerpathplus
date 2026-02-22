import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/use-admin";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, Users, GraduationCap, Shield } from "lucide-react";

interface ScholarshipForm {
  name: string;
  provider: string;
  category: string;
  eligibility: string;
  official_link: string;
  description: string;
}

const emptyScholarship: ScholarshipForm = { name: "", provider: "", category: "central", eligibility: "", official_link: "", description: "" };

const AdminPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [form, setForm] = useState<ScholarshipForm>(emptyScholarship);
  const [stats, setStats] = useState({ users: 0, scholarships: 0, tasks: 0 });

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
    if (!adminLoading && !isAdmin && user) navigate("/dashboard");
  }, [authLoading, adminLoading, user, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) fetchAll();
  }, [isAdmin]);

  const fetchAll = async () => {
    const [schRes, profileRes, taskRes] = await Promise.all([
      supabase.from("scholarships").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, user_id, display_name, created_at"),
      supabase.from("daily_tasks").select("id", { count: "exact", head: true }),
    ]);
    if (schRes.data) setScholarships(schRes.data);
    if (profileRes.data) setUsers(profileRes.data);
    setStats({
      users: profileRes.data?.length || 0,
      scholarships: schRes.data?.length || 0,
      tasks: taskRes.count || 0,
    });
  };

  const addScholarship = async () => {
    if (!form.name || !form.official_link) return toast.error("Name and link required");
    const { error } = await supabase.from("scholarships").insert(form);
    if (error) return toast.error("Failed to add");
    toast.success("Scholarship added!");
    setForm(emptyScholarship);
    fetchAll();
  };

  const deleteScholarship = async (id: string) => {
    await supabase.from("scholarships").delete().eq("id", id);
    setScholarships(s => s.filter(x => x.id !== id));
    toast.success("Deleted");
  };

  if (authLoading || adminLoading) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  if (!isAdmin) return null;

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-7 h-7 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <div className="text-2xl font-bold text-card-foreground">{stats.users}</div>
          <div className="text-sm text-muted-foreground">Users</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <div className="text-2xl font-bold text-card-foreground">{stats.scholarships}</div>
          <div className="text-sm text-muted-foreground">Scholarships</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <div className="text-2xl font-bold text-card-foreground">{stats.tasks}</div>
          <div className="text-sm text-muted-foreground">Tasks Created</div>
        </div>
      </div>

      <Tabs defaultValue="scholarships">
        <TabsList className="mb-4">
          <TabsTrigger value="scholarships" className="gap-2"><GraduationCap className="w-4 h-4" />Scholarships</TabsTrigger>
          <TabsTrigger value="users" className="gap-2"><Users className="w-4 h-4" />Users</TabsTrigger>
        </TabsList>

        <TabsContent value="scholarships">
          <div className="rounded-lg border border-border bg-card p-6 shadow-card mb-6">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">Add Scholarship</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input placeholder="Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Provider *" value={form.provider} onChange={e => setForm({ ...form, provider: e.target.value })} />
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="central">Central Government</option>
                <option value="maharashtra">Maharashtra Government</option>
                <option value="aicte">AICTE</option>
                <option value="private">Private</option>
              </select>
              <Input placeholder="Eligibility" value={form.eligibility} onChange={e => setForm({ ...form, eligibility: e.target.value })} />
              <Input placeholder="Official Link *" value={form.official_link} onChange={e => setForm({ ...form, official_link: e.target.value })} />
              <Input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <Button onClick={addScholarship} className="mt-4 gap-2"><Plus className="w-4 h-4" />Add Scholarship</Button>
          </div>

          <div className="space-y-2">
            {scholarships.map(s => (
              <div key={s.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                <div>
                  <div className="font-medium text-card-foreground">{s.name}</div>
                  <div className="text-sm text-muted-foreground">{s.provider} · {s.category}</div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteScholarship(s.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="space-y-2">
            {users.map(u => (
              <div key={u.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                <div>
                  <div className="font-medium text-card-foreground">{u.display_name || "Unnamed"}</div>
                  <div className="text-xs text-muted-foreground">Joined {new Date(u.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
