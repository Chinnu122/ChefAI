import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { problem } = await req.json()
    const apiKey = Deno.env.get('TASTECRAFT_AI_API_KEY') || Deno.env.get('OPENAI_API_KEY')

    if (!apiKey) {
      throw new Error('API Key not found')
    }

    // Search for relevant plants in the database first to provide context
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: plants, error: dbError } = await supabase
      .from('plants')
      .select('id, name, description, uses, benefits')

    if (dbError) throw dbError

    // Simplify plants data for the prompt
    const plantsContext = plants.map(p => `${p.name}: ${p.description}. Benefits: ${JSON.stringify(p.benefits)}`).join('\n')

    const prompt = `
      You are an expert herbalist and AI assistant for a medicinal plants website.
      A user has the following problem: "${problem}".

      Here is a list of available plants in our database:
      ${plantsContext}

      Based on the user's problem, recommend the best 1-3 plants from the list above.
      For each recommendation, explain why it is good for the problem.
      Return the response in JSON format:
      {
        "recommendations": [
          {
            "plantName": "Name of plant",
            "reasoning": "Explanation of why it helps"
          }
        ],
        "generalAdvice": "Any general advice for the condition (brief)"
      }
    `

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful herbalist assistant.' },
          { role: 'user', content: prompt }
        ],
      }),
    })

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    // Parse the JSON from the AI response
    // Sometimes AI wraps JSON in markdown code blocks, so we strip them
    const cleanJson = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim()
    const parsedResponse = JSON.parse(cleanJson)

    // Match recommendations with database IDs
    const enhancedRecommendations = parsedResponse.recommendations.map((rec: any) => {
        const plant = plants.find(p => p.name.toLowerCase() === rec.plantName.toLowerCase())
        return {
            ...rec,
            id: plant ? plant.id : null
        }
    })

    return new Response(JSON.stringify({ ...parsedResponse, recommendations: enhancedRecommendations }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
