import OpenAI from 'openai';

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through a backend
});

export async function generateTripPlan(preferences: any[]) {
  const systemPrompt = `You are an expert travel planner. Create a detailed trip plan that accommodates the preferences of all group members.
Consider their budget levels, interests, and requirements carefully. Provide specific recommendations.`;

  const userPrompt = `Create a trip plan for a group with the following preferences:
${JSON.stringify(preferences, null, 2)}

Provide a response in the following JSON format:
{
  "destination": "string",
  "activities": ["string"],
  "accommodation": "string",
  "transportation": "string",
  "estimatedCost": "string",
  "schedule": [
    {
      "day": number,
      "activities": ["string"]
    }
  ]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const tripPlan = JSON.parse(response.choices[0].message.content);
    return tripPlan;
  } catch (error) {
    console.error('Error generating trip plan:', error);
    throw error;
  }
}