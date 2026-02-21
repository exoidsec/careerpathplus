import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  User, Trophy, Flame, Star, Target, Plus, Trash2,
  BookOpen, Briefcase, Users, GraduationCap, CalendarDays,
  CheckCircle2, Circle, ArrowRight, LogOut
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Profile {
  display_name: string | null;
  xp: number;
  level: number;
  streak_days: number;
  field_of_study: string | null;
}

interface DailyTask {
  id: string;
  title: string;
  completed: boolean;
  priority: string;
  due_date: string | null;
}

const DashboardPage = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoadingData(true);
    const [profileRes, tasksRes] = await Promise.all([
      supabase.from("profiles").select("display_name, xp, level, streak_days, field_of_study").eq("user_id", user!.id).single(),
      supabase.from("daily_tasks").select("id, title, completed, priority, due_date").eq("user_id", user!.id).order("created_at", { ascending: false }),
    ]);
    if (profileRes.data) setProfile(profileRes.data);
    if (tasksRes.data) setTasks(tasksRes.data);
    setLoadingData(false);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    const { data, error } = await supabase.from("daily_tasks").insert({
      user_id: user!.id,
      title: newTask.trim(),
    }).select("id, title, completed, priority, due_date").single();
    if (error) {
      toast.error("Failed to add task");
    } else if (data) {
      setTasks([data, ...tasks]);
      setNewTask("");
      // Add XP
      await supabase.from("profiles").update({ xp: (profile?.xp || 0) + 5 }).eq("user_id", user!.id);
      setProfile(p => p ? { ...p, xp: p.xp + 5 } : p);
      toast.success("+5 XP for adding a task!");
    }
  };

  const toggleTask = async (task: DailyTask) => {
    const newCompleted = !task.completed;
    await supabase.from("daily_tasks").update({ completed: newCompleted }).eq("id", task.id);
    setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: newCompleted } : t));
    if (newCompleted) {
      const newXp = (profile?.xp || 0) + 10;
      const newLevel = Math.floor(newXp / 100) + 1;
      await supabase.from("profiles").update({ xp: newXp, level: newLevel }).eq("user_id", user!.id);
      setProfile(p => p ? { ...p, xp: newXp, level: newLevel } : p);
      toast.success("+10 XP! Task completed 🎉");
    }
  };

  const deleteTask = async (id: string) => {
    await supabase.from("daily_tasks").delete().eq("id", id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loadingData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) return null;

  const completedCount = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome, {profile?.display_name || "Explorer"} 👋
          </h1>
          <p className="text-muted-foreground">Your mission control center</p>
        </div>
        <Button variant="outline" onClick={handleSignOut} className="gap-2">
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Star className="w-5 h-5" />} label="XP" value={profile?.xp || 0} color="text-primary" />
        <StatCard icon={<Trophy className="w-5 h-5" />} label="Level" value={profile?.level || 1} color="text-secondary" />
        <StatCard icon={<Flame className="w-5 h-5" />} label="Streak" value={`${profile?.streak_days || 0}d`} color="text-destructive" />
        <StatCard icon={<Target className="w-5 h-5" />} label="Tasks Done" value={`${completedCount}/${totalTasks}`} color="text-accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Planner - takes 2 cols */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-card-foreground">Daily Planner</h2>
            </div>

            {/* Add task */}
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
              />
              <Button onClick={addTask} size="icon" className="flex-shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Task list */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {tasks.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">No tasks yet. Add one above!</p>
              ) : (
                tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-3 rounded-md border border-border hover:bg-muted/50 transition-colors group"
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task)}
                    />
                    <span className={`flex-1 text-sm ${task.completed ? "line-through text-muted-foreground" : "text-card-foreground"}`}>
                      {task.title}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Links Sidebar */}
        <div className="space-y-4">
          <QuickLink icon={<Target />} label="Career Quiz" to="/career-quiz" />
          <QuickLink icon={<Briefcase />} label="Explore Careers" to="/careers" />
          <QuickLink icon={<BookOpen />} label="Build Skills" to="/skills" />
          <QuickLink icon={<GraduationCap />} label="Find Internships" to="/internships" />
          <QuickLink icon={<Users />} label="Join Community" to="/community" />
        </div>
      </div>

      {/* Gamification Section */}
      <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-card">
        <h2 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" /> Achievements
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Badge earned={totalTasks >= 1} label="First Task" desc="Add your first task" />
          <Badge earned={completedCount >= 5} label="Achiever" desc="Complete 5 tasks" />
          <Badge earned={(profile?.xp || 0) >= 100} label="Centurion" desc="Earn 100 XP" />
          <Badge earned={(profile?.level || 1) >= 3} label="Rising Star" desc="Reach Level 3" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) => (
  <div className="rounded-lg border border-border bg-card p-4 shadow-card">
    <div className={`${color} mb-1`}>{icon}</div>
    <div className="text-2xl font-bold text-card-foreground">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

const QuickLink = ({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all group"
  >
    <div className="text-primary">{icon}</div>
    <span className="font-medium text-card-foreground group-hover:text-primary transition-colors flex-1">{label}</span>
    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
  </Link>
);

const Badge = ({ earned, label, desc }: { earned: boolean; label: string; desc: string }) => (
  <div className={`rounded-lg border p-4 text-center transition-all ${earned ? "border-primary bg-primary/5" : "border-border bg-muted/30 opacity-50"}`}>
    <div className="mb-1">
      {earned ? <CheckCircle2 className="w-6 h-6 text-primary mx-auto" /> : <Circle className="w-6 h-6 text-muted-foreground mx-auto" />}
    </div>
    <div className={`text-sm font-medium ${earned ? "text-foreground" : "text-muted-foreground"}`}>{label}</div>
    <div className="text-xs text-muted-foreground">{desc}</div>
  </div>
);

export default DashboardPage;
