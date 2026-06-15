import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Poem from './models/Poem.js';
import User from './models/User.js';

dotenv.config();
await mongoose.connect(process.env.MONGODB_URI, { tlsAllowInvalidCertificates: true });

const admin = await User.findOne({ role: 'admin' });
if (!admin) { console.log('Admin not found. Run createAdmin.js first.'); process.exit(1); }

const poems = [
  // SHAYARI
  {
    title: 'Dard-e-Dil',
    content: `Dard jo dil mein hai, lafzon mein kahan aata hai,
Aankhon se beh jaata hai, zuban par nahi aata hai.
Teri yaad ek zakhm hai jo bhar nahi pata kabhi,
Khaamoshi mein bhi tera naam baar baar aata hai.`,
    mood: 'Sad',
    language: 'Hindi',
    category: 'Shayari',
    tags: ['dard', 'yaad', 'dil'],
  },
  {
    title: 'Mohabbat Ki Raat',
    content: `Raat ke andhere mein teri yaad jagaati hai,
Sitaaron ki roshni tera chehra dikhati hai.
Dil mein ek aag hai jo bujhti hi nahi,
Mohabbat yahi hoti hai, yahi samjhaati hai.`,
    mood: 'Romantic',
    language: 'Hindi',
    category: 'Shayari',
    tags: ['mohabbat', 'raat', 'yaad'],
  },

  // GHAZAL
  {
    title: 'Shaam-e-Tanhai',
    content: `Shaam dhale aata hai tera khayaal dil mein,
Jaise roshan ho koi diya khali mahfil mein.
Teri awaaz sunne ko taras jaata hoon main,
Gum rehta hoon teri yaad ki har ik kashmakash mein.
Waqt guzra, magar tu nahi gayi zehan se,
Tujhe dhundta hoon main apni hi haar har manzil mein.`,
    mood: 'Melancholy',
    language: 'Hinglish',
    category: 'Ghazal',
    tags: ['tanhai', 'shaam', 'yaad'],
  },
  {
    title: 'Aankhon Ka Samandar',
    content: `Teri aankhon mein ek samandar hai,
Doob jaun toh khud se bahar hai.
Har ik lahar teri yaad laati hai,
Dil kehta hai yahi mera ghar hai.
Ghazal kehna hua mushkil ab,
Jab teri nazron ka asar hai.`,
    mood: 'Romantic',
    language: 'Hindi',
    category: 'Ghazal',
    tags: ['aankhen', 'samandar', 'dil'],
  },

  // POEM
  {
    title: 'The Wandering Soul',
    content: `I walk through streets that hold no name,
Beneath a sky that looks the same.
My shadow follows, never speaks,
A wandering soul that only seeks.

The city hums a lullaby,
Of broken dreams and reasons why.
I carry stories in my bones,
Of love I found and love I've known.

And in the quiet of the night,
I search for something burning bright.
A fire, a voice, a distant call —
The wandering soul that holds it all.`,
    mood: 'Nostalgic',
    language: 'English',
    category: 'Poem',
    tags: ['soul', 'wandering', 'city'],
  },
  {
    title: 'Monsoon Letter',
    content: `The rain writes your name on my window,
Letter by letter in silver drops.
I press my palm against the cold glass,
And read what the storm never stops.

You left in summer, dry and bright,
But the monsoon brought you back tonight.
Every thunder is your laugh I hear,
Every lightning — your memory, clear.`,
    mood: 'Nostalgic',
    language: 'English',
    category: 'Poem',
    tags: ['rain', 'monsoon', 'memory'],
  },

  // QUOTE
  {
    title: 'On Silence',
    content: `Silence is not empty —
it is full of answers
you were too afraid to ask.`,
    mood: 'Reflective',
    language: 'English',
    category: 'Quote',
    tags: ['silence', 'wisdom', 'thought'],
  },
  {
    title: 'Zindagi Ka Sach',
    content: `Zindagi ne sikhaaya ek baat,
Jo toote dil se likhta hai,
wahi sabse gehri baat kehta hai.`,
    mood: 'Reflective',
    language: 'Hindi',
    category: 'Quote',
    tags: ['zindagi', 'dil', 'sach'],
  },

  // CAPTION
  {
    title: 'Golden Hour',
    content: `Chasing golden hours and
borrowed sunsets —
some days are just meant
to be felt, not explained. 🌅`,
    mood: 'Happy',
    language: 'English',
    category: 'Caption',
    tags: ['sunset', 'golden', 'vibes'],
  },
  {
    title: 'Apna Waqt Aayega',
    content: `Andhere mein bhi roots pakad ke khada raha —
ab dekhna, ek din poora jungle mera hoga. 🌿✨`,
    mood: 'Hopeful',
    language: 'Hinglish',
    category: 'Caption',
    tags: ['motivation', 'hustle', 'hope'],
  },

  // LYRICS
  {
    title: 'Raat Bhar',
    content: `[Verse 1]
Raat bhar jagta hoon tere khayaalon mein,
Subah hoti hai toh tujhe dhundta hoon nazron mein.

[Chorus]
Tu hai toh main hoon,
Tu nahi toh kya hoon.
Teri aankhon mein dooba,
Main khud se hi agya hoon.

[Verse 2]
Teri hansi ek nagma hai mere zehan mein,
Woh sur jo goonjta rehta hai hari shaam mein.`,
    mood: 'Romantic',
    language: 'Hindi',
    category: 'Lyrics',
    tags: ['raat', 'nagma', 'ishq'],
  },
  {
    title: 'Neon Nights',
    content: `[Verse 1]
Neon lights on broken streets,
Your name written in city beats.
I hear our song in every crowd,
A whisper that became too loud.

[Chorus]
Neon nights and empty days,
I'm lost inside your golden haze.
Can't sleep, can't breathe, can't let you go —
A love the city will never know.`,
    mood: 'Melancholy',
    language: 'English',
    category: 'Lyrics',
    tags: ['neon', 'city', 'love'],
  },

  // FREE VERSE
  {
    title: 'What Home Feels Like',
    content: `Home is not four walls —
it is the smell of chai at 6am,
your mother calling your name
from a room away,
as if you might disappear
if she stops.

Home is the argument
you had at the dinner table
that still makes you laugh
ten years later.

Home is returning
to a version of yourself
you forgot existed.`,
    mood: 'Nostalgic',
    language: 'English',
    category: 'Free Verse',
    tags: ['home', 'chai', 'memory'],
  },
  {
    title: 'Khwaab',
    content: `Khwaab woh nahi jo raat ko aate hain —
khwaab woh hain
jo subah uthke bhi
aankhon mein tairte rehte hain.

Jo neend mein nahi,
jaagne mein bhi chain nahi dete.
Wahi khwaab sacche hain.`,
    mood: 'Hopeful',
    language: 'Hindi',
    category: 'Free Verse',
    tags: ['khwaab', 'sapne', 'zindagi'],
  },

  // SONNET
  {
    title: 'To the One Who Stayed',
    content: `When all the seasons turned and left me bare,
When autumn stripped the colour from my days,
You stayed beside me like the morning air —
Quiet, constant, soft in all your ways.

I did not ask for love so still, so deep,
A love that does not shout or make demands.
You held my broken hours while I'd weep,
And put me back together with your hands.

The world is loud with promises and fire,
With love that burns too fast and fades to grey.
But you are my unhurried, warm desire —
The kind that grows more golden every day.

So let the world chase storms and silver rings —
I'll stay right here, beside the song you bring.`,
    mood: 'Romantic',
    language: 'English',
    category: 'Sonnet',
    tags: ['love', 'sonnet', 'devotion'],
  },

  // HAIKU
  {
    title: 'First Rain',
    content: `First drop on dry earth —
the smell of forgotten things
coming home again.`,
    mood: 'Peaceful',
    language: 'English',
    category: 'Haiku',
    tags: ['rain', 'haiku', 'earth'],
  },
  {
    title: 'Chai Wali Subah',
    content: `Bhap uthti chai —
dadi ki aankhon mein woh
purani roshni.`,
    mood: 'Nostalgic',
    language: 'Hindi',
    category: 'Haiku',
    tags: ['chai', 'subah', 'dadi'],
  },
];

await Poem.deleteMany({ author: admin._id });

for (const p of poems) {
  await Poem.create({
    ...p,
    author: admin._id,
    published: true,
    isDraft: false,
    publishedDate: new Date(),
  });
}

console.log(`✅ ${poems.length} poems seeded successfully!`);
await mongoose.disconnect();
