import OpenAI from 'openai';

let client;
const getClient = () => {
  if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
};

export const generatePoetry = async ({ prompt, style, emotion, language }) => {
  const formattedPrompt = `Create an emotional ${style} in ${language} with a ${emotion.toLowerCase()} tone. Prompt: ${prompt}`;
  const response = await getClient().responses.create({
    model: 'gpt-4.1-mini',
    input: formattedPrompt,
    max_tokens: 300,
  });

  const text = response.output?.[0]?.content?.find((item) => item.type === 'output_text')?.text;
  return text || response.output_text || 'Unable to generate poetry at the moment.';
};
