import ChatHistory from '../models/ChatHistory.js';

const normalize = (value, fallback) => String(value || fallback).trim().toLowerCase();

const descriptors = {
  mood: {
    romantic: {
      hindi: ['मोहब्बत की नरम धूप', 'दिल की धड़कन', 'तेरा साथ'],
      hinglish: ['mohabbat ki narm roshni', 'dil ki dhadkan', 'tera saath'],
      english: ['soft light of love', 'heartbeat', 'your closeness'],
      urdu: ['محبت کی نرم روشنی', 'دل کی دھڑکن', 'تیرا ساتھ'],
    },
    melancholy: {
      hindi: ['खामोश रात', 'भीगी यादें', 'अधूरी बात'],
      hinglish: ['khamosh raat', 'bheegi yaadein', 'adhoori baat'],
      english: ['quiet night', 'rain-soaked memories', 'unfinished words'],
      urdu: ['خاموش رات', 'بھیگی یادیں', 'ادھوری بات'],
    },
    hopeful: {
      hindi: ['नई सुबह', 'रौशन रास्ता', 'हिम्मत की लौ'],
      hinglish: ['nayi subah', 'roshan raasta', 'himmat ki lau'],
      english: ['new dawn', 'lit path', 'small flame of courage'],
      urdu: ['نئی صبح', 'روشن راستہ', 'ہمت کی لو'],
    },
    nostalgic: {
      hindi: ['पुराने आंगन', 'कागज़ी यादें', 'बीता मौसम'],
      hinglish: ['purane aangan', 'kaagazi yaadein', 'beeta mausam'],
      english: ['old courtyards', 'paper memories', 'seasons gone by'],
      urdu: ['پرانے آنگن', 'کاغذی یادیں', 'بیتا موسم'],
    },
    passionate: {
      hindi: ['जलती चाहत', 'बेकरार लफ़्ज़', 'तूफ़ानी दिल'],
      hinglish: ['jalti chahat', 'bekarar lafz', 'toofani dil'],
      english: ['burning desire', 'restless words', 'storming heart'],
      urdu: ['جلتی چاہت', 'بے قرار لفظ', 'طوفانی دل'],
    },
    peaceful: {
      hindi: ['सुकून की छांव', 'धीमी हवा', 'शांत किनारा'],
      hinglish: ['sukoon ki chhaon', 'dheemi hawa', 'shaant kinara'],
      english: ['shade of calm', 'slow breeze', 'quiet shore'],
      urdu: ['سکون کی چھاؤں', 'دھیمی ہوا', 'خاموش کنارہ'],
    },
  },
};

const toneOpeners = {
  formal: { hindi: 'सम्मान भरे मन से', hinglish: 'izzat bhare dil se', english: 'with a composed heart', urdu: 'احترام بھرے دل سے' },
  casual: { hindi: 'सीधी सी बात है', hinglish: 'seedhi si baat hai', english: 'plain and true', urdu: 'سیدھی سی بات ہے' },
  playful: { hindi: 'मुस्कुराती शरारत में', hinglish: 'muskurati shararat mein', english: 'with a playful smile', urdu: 'مسکراتی شرارت میں' },
  serious: { hindi: 'गहरी सच्चाई में', hinglish: 'gehri sachchai mein', english: 'in a serious hush', urdu: 'گہری سچائی میں' },
  poetic: { hindi: 'लफ़्ज़ों की खुशबू में', hinglish: 'lafzon ki khushboo mein', english: 'in the fragrance of words', urdu: 'لفظوں کی خوشبو میں' },
};

const pickLanguage = (language) => (['hindi', 'urdu', 'hinglish', 'english'].includes(language) ? language : 'hinglish');
const pickFrom = (items, index) => items[index % items.length];

const getMoodWords = (mood, language) => {
  const moodSet = descriptors.mood[mood] || descriptors.mood.romantic;
  return moodSet[language] || moodSet.hinglish;
};

const generateMockAIContent = ({ prompt, type, mood, language, tone }) => {
  const normalizedType = normalize(type, 'poem');
  const normalizedMood = normalize(mood, 'romantic');
  const normalizedTone = normalize(tone, 'poetic');
  const normalizedLanguage = pickLanguage(normalize(language, 'hinglish'));
  const words = getMoodWords(normalizedMood, normalizedLanguage);
  const opener = toneOpeners[normalizedTone]?.[normalizedLanguage] || toneOpeners.poetic[normalizedLanguage];
  const subject = prompt.trim();
  const a = pickFrom(words, subject.length);
  const b = pickFrom(words, subject.length + 1);
  const c = pickFrom(words, subject.length + 2);

  const templates = {
    shayari: {
      hindi: `${opener}, ${subject} को सजाया है,\n${a} ने हर ख्याल में तेरा नाम गुनगुनाया है.\n${b} से पूछो तो जवाब बस इतना आए,\n${c} में भी दिल ने तुझे ही पाया है.`,
      urdu: `${opener}، ${subject} کو لفظوں میں سجایا ہے،\n${a} نے ہر خیال میں تیرا نام گنگنایا ہے۔\n${b} سے پوچھو تو جواب بس اتنا آئے،\n${c} میں بھی دل نے تجھے ہی پایا ہے۔`,
      hinglish: `${opener}, ${subject} ko lafzon mein sajaya hai,\n${a} ne har khayal mein tera naam gungunaya hai.\n${b} se poochho to jawab bas itna aaye,\n${c} mein bhi dil ne tujhe hi paaya hai.`,
      english: `${opener}, I shaped ${subject} into a tender line,\n${a} kept returning like a secret sign.\nAsk the ${b} what my silence knew,\nEven in ${c}, my heart found you.`,
    },
    ghazal: {
      hindi: `${opener} ये ग़ज़ल ${subject} के नाम रही,\nहर मिसरे में ${a} की शाम रही.\nमैंने ${b} से तेरा पता पूछा,\nतो ${c} भी तेरे ही पैगाम रही.`,
      urdu: `${opener} یہ غزل ${subject} کے نام رہی،\nہر مصرعے میں ${a} کی شام رہی۔\nمیں نے ${b} سے تیرا پتہ پوچھا،\nتو ${c} بھی تیرے ہی پیغام رہی۔`,
      hinglish: `${opener} ye ghazal ${subject} ke naam rahi,\nhar misre mein ${a} ki shaam rahi.\nMaine ${b} se tera pata poochha,\nto ${c} bhi tere hi paighaam rahi.`,
      english: `${opener}, this ghazal belonged to ${subject},\nEach couplet carried ${a} in its breath.\nI asked ${b} where your memory stays,\nAnd ${c} answered with your name.`,
    },
    doha: {
      hindi: `${subject} में ${a}, मन में गहरी बात,\n${b} रखे हौसला, ${c} दे सौगात.`,
      urdu: `${subject} میں ${a}، دل میں گہری بات،\n${b} رکھے حوصلہ، ${c} دے سوغات۔`,
      hinglish: `${subject} mein ${a}, mann mein gehri baat,\n${b} rakhe hausla, ${c} de saugaat.`,
      english: `In ${subject}, ${a} softly starts,\n${b} gives courage, ${c} heals hearts.`,
    },
    quote: {
      hindi: `"${subject} तब खूबसूरत बनता है, जब ${a} भी ${b} के साथ ${c} बन जाए."`,
      urdu: `"${subject} تب خوبصورت بنتا ہے، جب ${a} بھی ${b} کے ساتھ ${c} بن جائے۔"`,
      hinglish: `"${subject} tab khoobsurat banta hai, jab ${a} bhi ${b} ke saath ${c} ban jaaye."`,
      english: `"${subject} becomes beautiful when ${a} learns to walk beside ${b} and still find ${c}."`,
    },
    caption: {
      hindi: `${subject} | ${a}, ${b}, और थोड़ा सा ${c}.`,
      urdu: `${subject} | ${a}، ${b}، اور تھوڑا سا ${c}۔`,
      hinglish: `${subject} | ${a}, ${b}, aur thoda sa ${c}.`,
      english: `${subject} | ${a}, ${b}, and a little ${c}.`,
    },
    lyrics: {
      hindi: `${opener}, ${subject} की धुन चली,\n${a} से मेरी सांस पली.\n${b} ने जब तेरा नाम लिया,\n${c} में सारी रात ढली.`,
      urdu: `${opener}، ${subject} کی دھن چلی،\n${a} سے میری سانس پلی۔\n${b} نے جب تیرا نام لیا،\n${c} میں ساری رات ڈھلی۔`,
      hinglish: `${opener}, ${subject} ki dhun chali,\n${a} se meri saans pali.\n${b} ne jab tera naam liya,\n${c} mein saari raat dhali.`,
      english: `${opener}, ${subject} became a song tonight,\n${a} kept breathing through the light.\nWhen ${b} whispered your name to me,\n${c} turned into melody.`,
    },
    poem: {
      hindi: `${opener}, ${subject} से बात बनी,\n${a} की चादर रात बनी.\n${b} ने दिल को थाम लिया,\n${c} में फिर सौगात बनी.`,
      urdu: `${opener}، ${subject} سے بات بنی،\n${a} کی چادر رات بنی۔\n${b} نے دل کو تھام لیا،\n${c} میں پھر سوغات بنی۔`,
      hinglish: `${opener}, ${subject} se baat bani,\n${a} ki chaadar raat bani.\n${b} ne dil ko thaam liya,\n${c} mein phir saugaat bani.`,
      english: `${opener}, ${subject} found its way,\n${a} folded softly into day.\n${b} held the heart in place,\n${c} returned with quiet grace.`,
    },
  };

  const typeTemplates = templates[normalizedType] || templates.poem;
  return typeTemplates[normalizedLanguage] || typeTemplates.hinglish;
};

const saveChatHistory = async (userId, prompt, content) => {
  if (!userId) return;

  let chatHistory = await ChatHistory.findOne({ user: userId, isActive: true }).sort('-createdAt');

  if (!chatHistory) {
    chatHistory = await ChatHistory.create({
      user: userId,
      sessionId: Date.now().toString(),
      sessionTitle: `Session - ${new Date().toLocaleDateString()}`,
    });
  }

  chatHistory.messages.push({ role: 'user', content: prompt });
  chatHistory.messages.push({ role: 'assistant', content });
  chatHistory.messageCount += 2;
  chatHistory.contentGeneratedCount += 1;
  await chatHistory.save();
};

const handleAIRequest = async (req, res, defaultType = 'poem') => {
  try {
    const { prompt, type, genre, language, tone, mood } = req.body;
    const userId = req.user?.id;
    const contentType = (type || genre || defaultType).toLowerCase();

    if (!prompt?.trim()) {
      return res.status(400).json({ success: false, message: 'Prompt is required' });
    }

    const mockContent = generateMockAIContent({
      prompt,
      type: contentType,
      mood,
      language,
      tone,
    });

    await saveChatHistory(userId, prompt, mockContent);

    res.status(200).json({
      success: true,
      message: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} generated successfully`,
      data: {
        content: mockContent,
        type: contentType,
        preferences: {
          mood: mood || 'romantic',
          language: language || 'hinglish',
          tone: tone || 'poetic',
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const generatePoem = async (req, res) => handleAIRequest(req, res, 'poem');
export const generateShayari = async (req, res) => handleAIRequest(req, res, 'shayari');
export const generateGhazal = async (req, res) => handleAIRequest(req, res, 'ghazal');
export const generateQuote = async (req, res) => handleAIRequest(req, res, 'quote');
export const generateCaption = async (req, res) => handleAIRequest(req, res, 'caption');

export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const history = await ChatHistory.find({ user: userId })
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ChatHistory.countDocuments({ user: userId });

    res.status(200).json({
      success: true,
      data: history,
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
