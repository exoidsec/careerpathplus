import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Send, Trash2, MessageSquare, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatMessage {
  id: string;
  user_id: string;
  display_name: string;
  content: string;
  room: string;
  created_at: string;
}

const ROOMS = ["general", "careers", "skills", "internships"];

const CommunityChatPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [room, setRoom] = useState("general");
  const [displayName, setDisplayName] = useState("Anonymous");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [user, authLoading, navigate]);

  // Fetch display name
  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("display_name").eq("user_id", user.id).single()
      .then(({ data }) => { if (data?.display_name) setDisplayName(data.display_name); });
  }, [user]);

  // Fetch messages + subscribe
  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      const { data } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("room", room)
        .order("created_at", { ascending: true })
        .limit(100);
      if (data) setMessages(data);
    };
    fetchMessages();

    const channel = supabase
      .channel(`chat-${room}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages", filter: `room=eq.${room}` },
        (payload) => setMessages((prev) => [...prev, payload.new as ChatMessage])
      )
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "chat_messages", filter: `room=eq.${room}` },
        (payload) => setMessages((prev) => prev.filter((m) => m.id !== (payload.old as any).id))
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user, room]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;
    const content = newMessage.trim().slice(0, 500);
    setNewMessage("");
    const { error } = await supabase.from("chat_messages").insert({
      user_id: user.id,
      display_name: displayName,
      content,
      room,
    });
    if (error) toast.error("Failed to send message");
  };

  if (authLoading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );

  if (!user) return null;

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Community Chat</h1>
      </div>

      {/* Room tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {ROOMS.map((r) => (
          <Button
            key={r}
            variant={room === r ? "default" : "outline"}
            size="sm"
            onClick={() => setRoom(r)}
            className="capitalize"
          >
            #{r}
          </Button>
        ))}
      </div>

      {/* Chat area */}
      <div className="rounded-lg border border-border bg-card shadow-card flex flex-col" style={{ height: "60vh" }}>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <MessageSquare className="w-10 h-10 mb-2" />
              <p className="text-sm">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isOwn = msg.user_id === user.id;
              return (
                <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-lg px-3 py-2 ${isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-xs font-semibold ${isOwn ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {msg.display_name}
                      </span>
                      <span className={`text-[10px] ${isOwn ? "text-primary-foreground/60" : "text-muted-foreground/60"}`}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      {isOwn && (
                        <button
                          onClick={async () => {
                            await supabase.from("chat_messages").delete().eq("id", msg.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity ml-auto"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <p className="text-sm break-words">{msg.content}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border p-3 flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            maxLength={500}
          />
          <Button onClick={sendMessage} size="icon" className="flex-shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityChatPage;
