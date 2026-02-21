import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { education_level, stream, percentage, interests, strengths, preferred_city } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const userProfile = `
Education: ${education_level || "Not specified"}
Stream: ${stream || "Not specified"}
Percentage/Score: ${percentage || "Not specified"}
Interests: ${(interests || []).join(", ") || "Not specified"}
Strengths: ${(strengths || []).join(", ") || "Not specified"}
Preferred City: ${preferred_city || "Anywhere in Maharashtra"}
`.trim();

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a career guidance expert for students in Maharashtra, India. Based on the student's profile, provide exactly 5 career recommendations in JSON format.

Each recommendation must have:
- "title": career name
- "description": 2-3 sentence explanation of why this suits them
- "courses": array of 2-3 relevant courses/degrees
- "colleges": array of 2-3 Maharashtra colleges good for this career
- "salary_range": expected starting salary range in INR
- "growth": "High" | "Medium" | "Low" growth potential

Return ONLY a valid JSON array of 5 objects. No markdown, no extra text.`
          },
          {
            role: "user",
            content: `Here is the student profile:\n${userProfile}\n\nGive 5 personalized career recommendations as a JSON array.`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "career_recommendations",
              description: "Return 5 personalized career recommendations based on student profile",
              parameters: {
                type: "object",
                properties: {
                  recommendations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        description: { type: "string" },
                        courses: { type: "array", items: { type: "string" } },
                        colleges: { type: "array", items: { type: "string" } },
                        salary_range: { type: "string" },
                        growth: { type: "string", enum: ["High", "Medium", "Low"] }
                      },
                      required: ["title", "description", "courses", "colleges", "salary_range", "growth"],
                      additionalProperties: false
                    }
                  }
                },
                required: ["recommendations"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "career_recommendations" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please try again later." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service unavailable" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    
    // Extract tool call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    let recommendations = [];
    
    if (toolCall?.function?.arguments) {
      try {
        const parsed = JSON.parse(toolCall.function.arguments);
        recommendations = parsed.recommendations || [];
      } catch {
        console.error("Failed to parse tool call arguments");
      }
    }

    return new Response(JSON.stringify({ recommendations }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("career-recommend error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
