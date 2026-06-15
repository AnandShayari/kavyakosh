import fetch from 'node-fetch';

const BASE = 'http://localhost:5000/api';

// Step 1: Login as admin
const loginRes = await fetch(`${BASE}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@kavyakosh.com', password: 'Admin@1234' }),
});
const loginData = await loginRes.json();
const token = loginData.tokens?.accessToken;
if (!token) { console.error('Login failed:', loginData); process.exit(1); }
console.log('✅ Logged in as admin');

const poems = [
  { title: 'Dard-e-Dil', content: `Dard jo dil mein hai, lafzon mein kahan aata hai,\nAankhon se beh jaata hai, zuban par nahi aata hai.\nTeri yaad ek zakhm hai jo bhar nahi pata kabhi,\nKhaamoshi mein bhi tera naam baar baar aata hai.`, mood: 'Sad', language: 'Hindi', category: 'Shayari', tags: ['dard','yaad','dil'] },
  { title: 'Mohabbat Ki Raat', content: `Raat ke andhere mein teri yaad jagaati hai,\nSitaaron ki roshni tera chehra dikhati hai.\nDil mein ek aag hai jo bujhti hi nahi,\nMohabbat yahi hoti hai, yahi samjhaati hai.`, mood: 'Romantic', language: 'Hindi', category: 'Shayari', tags: ['mohabbat','raat','yaad'] },
  { title: 'Shaam-e-Tanhai', content: `Shaam dhale aata hai tera khayaal dil mein,\nJaise roshan ho koi diya khali mahfil mein.\nTeri awaaz sunne ko taras jaata hoon main,\nGum rehta hoon teri yaad ki har ik kashmakash mein.\nWaqt guzra, magar tu nahi gayi zehan se,\nTujhe dhundta hoon main apni hi haar har manzil mein.`, mood: 'Melancholy', language: 'Hinglish', category: 'Ghazal', tags: ['tanhai','shaam','yaad'] },
  { title: 'Aankhon Ka Samandar', content: `Teri aankhon mein ek samandar hai,\nDoob jaun toh khud se bahar hai.\nHar ik lahar teri yaad laati hai,\nDil kehta hai yahi mera ghar hai.\nGhazal kehna hua mushkil ab,\nJab teri nazron ka asar hai.`, mood: 'Romantic', language: 'Hindi', category: 'Ghazal', tags: ['aankhen','samandar','dil'] },
  { title: 'The Wandering Soul', content: `I walk through streets that hold no name,\nBeneath a sky that looks the same.\nMy shadow follows, never speaks,\nA wandering soul that only seeks.\n\nThe city hums a lullaby,\nOf broken dreams and reasons why.\nI carry stories in my bones,\nOf love I found and love I've known.\n\nAnd in the quiet of the night,\nI search for something burning bright.\nA fire, a voice, a distant call —\nThe wandering soul that holds it all.`, mood: 'Nostalgic', language: 'English', category: 'Poem', tags: ['soul','wandering','city'] },
  { title: 'Monsoon Letter', content: `The rain writes your name on my window,\nLetter by letter in silver drops.\nI press my palm against the cold glass,\nAnd read what the storm never stops.\n\nYou left in summer, dry and bright,\nBut the monsoon brought you back tonight.\nEvery thunder is your laugh I hear,\nEvery lightning — your memory, clear.`, mood: 'Nostalgic', language: 'English', category: 'Poem', tags: ['rain','monsoon','memory'] },
  { title: 'On Silence', content: `Silence is not empty —\nit is full of answers\nyou were too afraid to ask.`, mood: 'Reflective', language: 'English', category: 'Quote', tags: ['silence','wisdom','thought'] },
  { title: 'Zindagi Ka Sach', content: `Zindagi ne sikhaaya ek baat,\nJo toote dil se likhta hai,\nwahi sabse gehri baat kehta hai.`, mood: 'Reflective', language: 'Hindi', category: 'Quote', tags: ['zindagi','dil','sach'] },
  { title: 'Golden Hour', content: `Chasing golden hours and\nborrowed sunsets —\nsome days are just meant\nto be felt, not explained. 🌅`, mood: 'Happy', language: 'English', category: 'Caption', tags: ['sunset','golden','vibes'] },
  { title: 'Apna Waqt Aayega', content: `Andhere mein bhi roots pakad ke khada raha —\nab dekhna, ek din poora jungle mera hoga. 🌿✨`, mood: 'Hopeful', language: 'Hinglish', category: 'Caption', tags: ['motivation','hustle','hope'] },
  { title: 'Raat Bhar', content: `[Verse 1]\nRaat bhar jagta hoon tere khayaalon mein,\nSubah hoti hai toh tujhe dhundta hoon nazron mein.\n\n[Chorus]\nTu hai toh main hoon,\nTu nahi toh kya hoon.\nTeri aankhon mein dooba,\nMain khud se hi agya hoon.\n\n[Verse 2]\nTeri hansi ek nagma hai mere zehan mein,\nWoh sur jo goonjta rehta hai hari shaam mein.`, mood: 'Romantic', language: 'Hindi', category: 'Lyrics', tags: ['raat','nagma','ishq'] },
  { title: 'Neon Nights', content: `[Verse 1]\nNeon lights on broken streets,\nYour name written in city beats.\nI hear our song in every crowd,\nA whisper that became too loud.\n\n[Chorus]\nNeon nights and empty days,\nI'm lost inside your golden haze.\nCan't sleep, can't breathe, can't let you go —\nA love the city will never know.`, mood: 'Melancholy', language: 'English', category: 'Lyrics', tags: ['neon','city','love'] },
  { title: 'What Home Feels Like', content: `Home is not four walls —\nit is the smell of chai at 6am,\nyour mother calling your name\nfrom a room away,\nas if you might disappear\nif she stops.\n\nHome is the argument\nyou had at the dinner table\nthat still makes you laugh\nten years later.\n\nHome is returning\nto a version of yourself\nyou forgot existed.`, mood: 'Nostalgic', language: 'English', category: 'Free Verse', tags: ['home','chai','memory'] },
  { title: 'Khwaab', content: `Khwaab woh nahi jo raat ko aate hain —\nkhwaab woh hain\njo subah uthke bhi\naankhon mein tairte rehte hain.\n\nJo neend mein nahi,\njaagne mein bhi chain nahi dete.\nWahi khwaab sacche hain.`, mood: 'Hopeful', language: 'Hindi', category: 'Free Verse', tags: ['khwaab','sapne','zindagi'] },
  { title: 'To the One Who Stayed', content: `When all the seasons turned and left me bare,\nWhen autumn stripped the colour from my days,\nYou stayed beside me like the morning air —\nQuiet, constant, soft in all your ways.\n\nI did not ask for love so still, so deep,\nA love that does not shout or make demands.\nYou held my broken hours while I'd weep,\nAnd put me back together with your hands.\n\nThe world is loud with promises and fire,\nWith love that burns too fast and fades to grey.\nBut you are my unhurried, warm desire —\nThe kind that grows more golden every day.\n\nSo let the world chase storms and silver rings —\nI'll stay right here, beside the song you bring.`, mood: 'Romantic', language: 'English', category: 'Sonnet', tags: ['love','sonnet','devotion'] },
  { title: 'First Rain', content: `First drop on dry earth —\nthe smell of forgotten things\ncoming home again.`, mood: 'Peaceful', language: 'English', category: 'Haiku', tags: ['rain','haiku','earth'] },
  { title: 'Chai Wali Subah', content: `Bhap uthti chai —\ndadi ki aankhon mein woh\npurani roshni.`, mood: 'Nostalgic', language: 'Hindi', category: 'Haiku', tags: ['chai','subah','dadi'] },
];

let success = 0;
for (const poem of poems) {
  // Create poem
  const createRes = await fetch(`${BASE}/poems`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ ...poem, published: true, isDraft: false }),
  });
  const created = await createRes.json();
  if (!created.success) { console.error(`❌ Failed: ${poem.title}`, created.message); continue; }

  // Publish poem
  const poemId = created.data._id;
  await fetch(`${BASE}/poems/${poemId}/publish`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log(`✅ ${poem.category} — ${poem.title}`);
  success++;
}

console.log(`\n🎉 ${success}/${poems.length} poems seeded successfully!`);
