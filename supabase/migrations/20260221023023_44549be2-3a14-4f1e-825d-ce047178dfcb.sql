
-- Create chat messages table for community chat
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  display_name TEXT NOT NULL DEFAULT 'Anonymous',
  content TEXT NOT NULL,
  room TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Everyone can read messages (community chat)
CREATE POLICY "Anyone can view chat messages"
ON public.chat_messages FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Users can insert their own messages
CREATE POLICY "Users can send messages"
ON public.chat_messages FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own messages
CREATE POLICY "Users can delete own messages"
ON public.chat_messages FOR DELETE
USING (auth.uid() = user_id);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;

-- Index for fast room queries
CREATE INDEX idx_chat_messages_room_created ON public.chat_messages(room, created_at DESC);
