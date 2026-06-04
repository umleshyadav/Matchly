import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Anthropic from '@anthropic-ai/sdk';
import { getTopMatches, calculateCompatibility } from './matching.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Anthropic client
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
let anthropic = null;
if (anthropicApiKey && anthropicApiKey !== 'your_anthropic_api_key_here') {
  console.log('Anthropic API Key detected. Live AI matchmaking enabled.');
  anthropic = new Anthropic({ apiKey: anthropicApiKey });
} else {
  console.warn('WARNING: No Anthropic API Key found. Using mock fallback mode for compatibility scoring and introduction generation.');
}

// Avatar Pools
const femaleAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150",
  "https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=150"
];

const maleAvatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
  "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=150",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150"
];

// Helper to calculate age
const calculateAge = (dobString) => {
  const dob = new Date(dobString);
  const diffMs = Date.now() - dob.getTime();
  const ageDate = new Date(diffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// Helper to assign stable avatar
const getAvatar = (id, gender) => {
  const index = parseInt(id.replace(/\D/g, '')) || 0;
  if (gender === 'Female') {
    return femaleAvatars[index % femaleAvatars.length];
  }
  return maleAvatars[index % maleAvatars.length];
};

// Helper to read and process Indian profiles
const getProfilesData = () => {
  try {
    const filePath = path.join(__dirname, '../data/profiles.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const rawProfiles = JSON.parse(rawData);
    
    return rawProfiles.map(p => ({
      ...p,
      name: `${p.firstName} ${p.lastName}`,
      age: calculateAge(p.dateOfBirth),
      avatar: p.profilePhoto || getAvatar(p.id, p.gender),
      occupation: `${p.designation} at ${p.currentCompany}`,
      location: `${p.city}, India`
    }));
  } catch (error) {
    console.error('Error reading profiles.json:', error);
    return [];
  }
};

// Endpoints
app.get('/api/clients', (req, res) => {
  const profiles = getProfilesData();
  res.json(profiles);
});

app.get('/api/clients/:id', (req, res) => {
  const profiles = getProfilesData();
  const profile = profiles.find(p => p.id === req.params.id);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json(profile);
});

// GET matches for a specific client based on backend matching.js
app.get('/api/clients/:id/matches', (req, res) => {
  const profiles = getProfilesData();
  const profile = profiles.find(p => p.id === req.params.id);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  const topMatches = getTopMatches(profile, profiles);
  res.json(topMatches);
});

// POST scoring chemistry report between two clients
app.post('/api/matchmaking/score', async (req, res) => {
  const { clientId1, clientId2 } = req.body;
  if (!clientId1 || !clientId2) {
    return res.status(400).json({ error: 'Both clientId1 and clientId2 are required.' });
  }

  const profiles = getProfilesData();
  const client1 = profiles.find(p => p.id === clientId1);
  const client2 = profiles.find(p => p.id === clientId2);

  if (!client1 || !client2) {
    return res.status(404).json({ error: 'One or both profiles not found in database.' });
  }

  const baseAnalysis = calculateCompatibility(client1, client2);
  const baseScore = baseAnalysis.score;
  const reasons = baseAnalysis.reasons;

  // Helper: generate fallback JSON
  const generateFallback = (errorMsg = '') => {
    return {
      score: baseScore,
      isFallback: true,
      summary: `Both ${client1.name} and ${client2.name} show strong alignment based on traditional heuristics, particularly in lifestyle compatibility and family structures. Their professional paths are highly complementary.`,
      axes: {
        values: {
          score: Math.min(95, baseScore + 5),
          details: `Both value family setup (${client1.familyType} family) and share aligned perspectives on marriage.`
        },
        lifestyle: {
          score: client1.dietPreference === client2.dietPreference ? 90 : 60,
          details: `Aligned on diet preferences (${client1.dietPreference}) and habits.`
        },
        career: {
          score: Math.min(95, baseScore - 2),
          details: `${client1.name} is a ${client1.designation} and ${client2.name} is a ${client2.designation}, offering a balanced professional lifestyle.`
        },
        family: {
          score: Math.min(95, baseScore + 2),
          details: `Strong cultural foundations with matching expectations for long-term domestic alignment.`
        }
      },
      strengths: [
        reasons[0] || "Complementary career paths.",
        reasons[1] || "Shared regional communication.",
        "Highly aligned family structures and long-term values."
      ],
      challenges: [
        `Different hobbies (${client1.hobbies[0] || 'sports'} vs ${client2.hobbies[0] || 'art'}) could require some compromise.`,
        `Managing relocation preferences: one client identifies as ${client1.openToRelocate === 'Yes' ? 'relocatable' : 'stationary'}.`
      ],
      matchmakerTip: `Highlight their shared language and lifestyle choices first. Ask about their shared interest in ${client1.hobbies[0] || 'hobbies'} during the icebreaker.`,
      error: errorMsg || undefined
    };
  };

  // If no Anthropic API key, use fallback
  if (!anthropic) {
    return res.json(generateFallback());
  }

  try {
    const systemPrompt = `You are a professional Indian matrimonial matchmaking chemistry analyst at The Date Crew.
Analyze the compatibility of these two profiles and generate a detailed compatibility chemistry report as a JSON object with the following fields:
- summary: A warm, professional 2-3 sentence overview of their compatibility.
- axes: An object with keys: values, lifestyle, career, family. Each axis must be an object with keys:
  - score: An integer compatibility percentage (0-100) reflecting this specific axis.
  - details: A 1-2 sentence explanation of the compatibility in this category.
- strengths: An array of 3 strings outlining the strongest pillars of this match.
- challenges: An array of 2-3 strings outlining minor potential friction points or topics they might want to discuss.
- matchmakerTip: A professional coaching tip for the matchmaker on how to present this match or coach the clients.

Do not wrap the response in any markdown code block (like \`\`\`json) or add any pre/post text. Just output a raw JSON object. Ensure it is valid, parseable JSON.`;

    const userMessage = `Generate a chemistry report for:
Profile 1 (Customer):
- Name: ${client1.name}
- Gender: ${client1.gender}
- Age: ${client1.age}
- Height: ${client1.height} cm
- City: ${client1.city}
- Religion/Caste: ${client1.religion} (${client1.caste})
- Profession/Income: ${client1.designation} at ${client1.currentCompany} (${client1.income} LPA)
- Lifestyle: Diet is ${client1.dietPreference}, Family is ${client1.familyType}, Relocation comfort is ${client1.openToRelocate}
- Hobbies: ${client1.hobbies.join(', ')}

Profile 2 (Candidate):
- Name: ${client2.name}
- Gender: ${client2.gender}
- Age: ${client2.age}
- Height: ${client2.height} cm
- City: ${client2.city}
- Religion/Caste: ${client2.religion} (${client2.caste})
- Profession/Income: ${client2.designation} at ${client2.currentCompany} (${client2.income} LPA)
- Lifestyle: Diet is ${client2.dietPreference}, Family is ${client2.familyType}, Relocation comfort is ${client2.openToRelocate}
- Hobbies: ${client2.hobbies.join(', ')}

Base mathematical compatibility score: ${baseScore}%
Base factors: ${reasons.join(', ')}`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      temperature: 0.6,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    });

    const rawText = response.content[0].text.trim();
    const startIdx = rawText.indexOf('{');
    const endIdx = rawText.lastIndexOf('}');
    if (startIdx === -1 || endIdx === -1) {
      throw new Error('Claude response did not contain valid JSON block.');
    }
    const cleanedText = rawText.substring(startIdx, endIdx + 1);
    const parsedData = JSON.parse(cleanedText);

    // Return compatibility chemistry report
    return res.json({
      score: baseScore, // Use our base mathematical score for consistency in display
      isFallback: false,
      summary: parsedData.summary,
      axes: parsedData.axes,
      strengths: parsedData.strengths,
      challenges: parsedData.challenges,
      matchmakerTip: parsedData.matchmakerTip
    });
  } catch (error) {
    console.error('Claude API chemistry score error, running fallback simulation:', error);
    // Try fallback model first
    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 600,
        temperature: 0.6,
        system: `You are an expert matchmaking analyst. Return a JSON object with keys: summary, axes, strengths, challenges, matchmakerTip based on client compatibility.`,
        messages: [{ role: 'user', content: `Score: ${client1.name} and ${client2.name}. Base compatibility: ${baseScore}%.` }]
      });
      const rawText = response.content[0].text.trim();
      const sIdx = rawText.indexOf('{');
      const eIdx = rawText.lastIndexOf('}');
      if (sIdx === -1 || eIdx === -1) {
        throw new Error('Fallback response did not contain valid JSON block.');
      }
      const cleanedText = rawText.substring(sIdx, eIdx + 1);
      const parsedData = JSON.parse(cleanedText);
      return res.json({
        score: baseScore,
        isFallback: false,
        summary: parsedData.summary,
        axes: parsedData.axes,
        strengths: parsedData.strengths,
        challenges: parsedData.challenges,
        matchmakerTip: parsedData.matchmakerTip
      });
    } catch (fallbackError) {
      return res.json(generateFallback(error.message));
    }
  }
});

// FEATURE 1 — AI Match Explanation Endpoint
app.post('/api/explain-match', async (req, res) => {
  const { customer, match, score, reasons } = req.body;
  if (!customer || !match) {
    return res.status(400).json({ error: 'Both customer and match profiles are required.' });
  }

  // Fallback if no API key is present
  if (!anthropic) {
    const explanation = `Both ${customer.name} and ${match.name} are highly compatible professionals based in major cities, sharing a dedicated career focus and similar traditional values regarding a ${customer.familyType.toLowerCase()} family structure. Furthermore, they are compatible on dietary choices (${customer.dietPreference}) and share similar interests.`;
    return res.json({ explanation, isFallback: true });
  }

  try {
    const systemPrompt = `You are a professional Indian matrimonial matchmaker. Given two profiles, write a warm, 1–2 sentence explanation of why they are compatible. Be specific — mention actual data points like shared values, career alignment, or lifestyle compatibility. Keep it professional and optimistic. Do not mention any incompatibilities.`;

    const userMessage = `Write a compatibility summary for:
Customer:
- Name: ${customer.name}
- Age: ${customer.age}
- City: ${customer.city}
- Profession: ${customer.designation} at ${customer.currentCompany}
- Income: ${customer.income} LPA
- Religion: ${customer.religion} (${customer.caste})
- Lifestyle: Diet is ${customer.dietPreference}, Family is ${customer.familyType}
- Hobbies: ${customer.hobbies.join(', ')}

Match:
- Name: ${match.name}
- Age: ${match.age}
- City: ${match.city}
- Profession: ${match.designation} at ${match.currentCompany}
- Income: ${match.income} LPA
- Religion: ${match.religion} (${match.caste})
- Lifestyle: Diet is ${match.dietPreference}, Family is ${match.familyType}
- Hobbies: ${match.hobbies.join(', ')}

Compatibility score: ${score}%
Key reasons identified by system: ${reasons.join(', ')}`;

    // Invoke Claude API using requested model
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', // requested model
      max_tokens: 250,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        { role: 'user', content: userMessage }
      ]
    });

    const explanation = response.content[0].text.trim();
    res.json({ explanation, isFallback: false });
  } catch (error) {
    console.error('Claude API explain-match error, running fallback model:', error);
    try {
      // Fallback model call in case the new sonnet version throws a model routing error
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 250,
        temperature: 0.7,
        system: `You are a professional Indian matrimonial matchmaker. Given two profiles, write a warm, 1–2 sentence explanation of why they are compatible. Be specific and optimistic.`,
        messages: [
          { role: 'user', content: `Summarize compatibility: Customer: ${customer.name}, Match: ${match.name}. Score: ${score}%` }
        ]
      });
      res.json({ explanation: response.content[0].text.trim(), isFallback: false });
    } catch (fallbackError) {
      // Final mock fallback if both fail
      const explanation = `Both ${customer.name} and ${match.name} represent an outstanding match, sharing deep values around their ${customer.religion} roots, mutual career focus in their fields, and alignment on diet and hobbies.`;
      res.json({ explanation, isFallback: true, error: fallbackError.message });
    }
  }
});

// FEATURE 2 — AI Intro Email Generator Endpoint
app.post('/api/generate-intro', async (req, res) => {
  const { customer, match } = req.body;
  if (!customer || !match) {
    return res.status(400).json({ error: 'Both customer and match profiles are required.' });
  }

  // Fallback if no API key is present
  if (!anthropic) {
    const introMessage = `Dear ${customer.name},\n\nI hope you're having a wonderful week! I'm thrilled to introduce you to ${match.name}, a ${match.age}-year-old ${match.designation} based in ${match.city}. You both share some wonderful commonalities, including a strong alignment on ${customer.religion} family traditions, a preference for ${customer.dietPreference.toLowerCase()} lifestyle choices, and a passion for ${customer.hobbies[0] || 'outdoor activities'}.\n\nLet me know if you would like me to share your contact details to arrange an initial conversation!\n\nWarmly,\n\nPriya Sharma\nSenior Matchmaker, The Date Crew`;
    return res.json({ introMessage, isFallback: true });
  }

  try {
    const systemPrompt = `You are a professional Indian matrimonial matchmaker at 'The Date Crew'. Generate a warm, personalized 3–4 sentence introduction email that a matchmaker would send to introduce two people. Include both their names and 2–3 specific things they have in common. Output only the message text itself.`;

    const userMessage = `Write an email introducing:
Customer:
- Name: ${customer.name}
- Age: ${customer.age}
- City: ${customer.city}
- Profession: ${customer.designation} at ${customer.currentCompany}
- Religion: ${customer.religion}
- Diet: ${customer.dietPreference}
- Hobbies: ${customer.hobbies.join(', ')}

Match Candidate:
- Name: ${match.name}
- Age: ${match.age}
- City: ${match.city}
- Profession: ${match.designation} at ${match.currentCompany}
- Religion: ${match.religion}
- Diet: ${match.dietPreference}
- Hobbies: ${match.hobbies.join(', ')}`;

    // Invoke Claude API using requested model
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', // requested model
      max_tokens: 500,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        { role: 'user', content: userMessage }
      ]
    });

    const introMessage = response.content[0].text.trim();
    res.json({ introMessage, isFallback: false });
  } catch (error) {
    console.error('Claude API generate-intro error, running fallback model:', error);
    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 500,
        temperature: 0.7,
        system: `You are a professional Indian matrimonial matchmaker at 'The Date Crew'. Generate a warm, personalized 3–4 sentence introduction email that a matchmaker would send to introduce two people.`,
        messages: [
          { role: 'user', content: `Draft introduction email from Priya Sharma to ${customer.name} introducing ${match.name}.` }
        ]
      });
      res.json({ introMessage: response.content[0].text.trim(), isFallback: false });
    } catch (fallbackError) {
      const introMessage = `Dear ${customer.name},\n\nI hope you are doing well. I have found an excellent match for you in our database! Meet ${match.name}, a ${match.age}-year-old ${match.designation} from ${match.city}. You both share a love for ${customer.hobbies[0] || 'exploring new things'} and value a ${customer.dietPreference.toLowerCase()} lifestyle. Let me know if you would like me to set up an introductory chat!\n\nWarmly,\n\nPriya Sharma`;
      res.json({ introMessage, isFallback: true, error: fallbackError.message });
    }
  }
});

// Root check
app.get('/', (req, res) => {
  res.send('TDC Matchmaker API is running.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
