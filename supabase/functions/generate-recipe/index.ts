import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ingredients } = await req.json();
    const TASTECRAFT_AI_API_KEY = Deno.env.get("TASTECRAFT_AI_API_KEY");

    if (!TASTECRAFT_AI_API_KEY) {
      throw new Error("TASTECRAFT_AI_API_KEY is not configured");
    }

    console.log('Generating recipe for ingredients:', ingredients);

    const response = await fetch("https://ai.gateway.tastecraft-ai.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TASTECRAFT_AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a professional chef and recipe creator. Generate creative, delicious recipes based on the ingredients provided. Always return a JSON object with this exact structure:
{
  "title": "Recipe name",
  "description": "Brief appetizing description",
  "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity"],
  "instructions": ["Step 1", "Step 2", "Step 3"],
  "prepTime": "15 mins",
  "cookTime": "30 mins",
  "servings": 4
}

Be creative but practical. Use common cooking techniques. Make the recipe clear and easy to follow.`
          },
          {
            role: "user",
            content: `Create a delicious recipe using these ingredients: ${ingredients.join(', ')}. Return only the JSON object, no other text.`
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your TasteCraft AI AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log('AI response:', content);

    // Parse the JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not extract JSON from AI response");
    }

    const recipe = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(recipe), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-recipe function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), 
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});