import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Copy, Download, Share2 } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '../components/ui/Button';
import { TextArea, SelectInput } from '../components/ui/Input';
import { Toast } from '../components/ui/Feedback';
import { apiService } from '../services/api';

const moodOptions = [
  { value: 'romantic', label: 'Romantic' },
  { value: 'melancholy', label: 'Melancholy' },
  { value: 'hopeful', label: 'Hopeful' },
  { value: 'nostalgic', label: 'Nostalgic' },
  { value: 'passionate', label: 'Passionate' },
  { value: 'peaceful', label: 'Peaceful' },
];

const genreOptions = [
  { value: 'shayari', label: 'Shayari' },
  { value: 'ghazal', label: 'Ghazal' },
  { value: 'doha', label: 'Doha' },
  { value: 'quote', label: 'Quote' },
  { value: 'caption', label: 'Caption' },
  { value: 'lyrics', label: 'Lyrics' },
];

const languageOptions = [
  { value: 'hindi', label: 'Hindi' },
  { value: 'urdu', label: 'Urdu' },
  { value: 'hinglish', label: 'Hinglish' },
  { value: 'english', label: 'English' },
];

const toneOptions = [
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
  { value: 'playful', label: 'Playful' },
  { value: 'serious', label: 'Serious' },
  { value: 'poetic', label: 'Poetic' },
];

function AIStudio() {
  const [prompt, setPrompt] = useState('');
  const [mood, setMood] = useState('romantic');
  const [genre, setGenre] = useState('shayari');
  const [language, setLanguage] = useState('hinglish');
  const [tone, setTone] = useState('poetic');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Namaste! I'm your AI poetry companion. Share what's on your heart, and I'll craft a beautiful verse for you.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const messagesEndRef = useRef(null);
  const currentPreferenceLabel = `${moodOptions.find((option) => option.value === mood)?.label} • ${genreOptions.find((option) => option.value === genre)?.label} • ${languageOptions.find((option) => option.value === language)?.label} • ${toneOptions.find((option) => option.value === tone)?.label}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const activePrompt = prompt.trim();
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: activePrompt,
      metadata: { mood, genre, language, tone },
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const requestBody = {
        prompt: activePrompt,
        mood,
        genre,
        language,
        tone,
        type: genre,
      };

      let response;

      switch (genre) {
        case 'shayari':
          response = await apiService.generateShayari(requestBody);
          break;
        case 'ghazal':
          response = await apiService.generateGhazal(requestBody);
          break;
        case 'quote':
          response = await apiService.generateQuote(requestBody);
          break;
        case 'caption':
          response = await apiService.generateCaption(requestBody);
          break;
        default:
          response = await apiService.generatePoem(requestBody);
          break;
      }

      const generatedContent = response?.data?.data?.content || response?.data?.data?.message || 'Unable to generate a verse.';

      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: generatedContent,
        metadata: { mood, genre, language, tone },
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setPrompt('');
    } catch (error) {
      setToast({
        type: 'error',
        message: error?.response?.data?.message || 'Failed to generate verse. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      setToast({ type: 'success', message: 'Copied to clipboard!' });
    } catch (error) {
      setToast({ type: 'error', message: 'Copy failed. Please select and copy manually.' });
    }
  };

  const handleDownload = (content) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${genre || 'poetry'}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
    setToast({ type: 'success', message: 'Downloaded successfully!' });
  };

  const handleShare = async (content) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'KavyaKosh Verse',
          text: content,
        });
        return;
      }

      await navigator.clipboard.writeText(content);
      setToast({ type: 'success', message: 'Sharing is not available, so the verse was copied.' });
    } catch (error) {
      setToast({ type: 'error', message: 'Share failed. Please try copying instead.' });
    }
  };

  const handleClear = () => {
    setPrompt('');
    setToast({ type: 'success', message: 'Prompt cleared.' });
  };

  const verseOptions = (
    <div className="space-y-4">
      <SelectInput
        label="Mood"
        options={moodOptions}
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <SelectInput
        label="Genre"
        options={genreOptions}
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <SelectInput
        label="Language"
        options={languageOptions}
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />
      <SelectInput
        label="Tone"
        options={toneOptions}
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      />
    </div>
  );

  const quickPrompts = (
    <div className="space-y-2">
      {['Love & Romance', 'Loss & Longing', 'Hope & Dreams', 'Freedom & Identity'].map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => setPrompt(p)}
          className="w-full text-left text-sm px-4 py-2 rounded-2xl bg-surface/70 text-text hover:bg-surface transition"
        >
          {p}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-20 z-40 px-6 py-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={24} className="text-primary" />
            <h1 className="text-2xl font-display text-text">AI Poetry Studio</h1>
          </div>
          <p className="text-sm text-muted">Create beautiful verses with AI-powered inspiration</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex max-w-7xl w-full mx-auto">
        {/* Chat Area */}
        <motion.div
          className="flex-1 flex flex-col border-r border-border overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xl rounded-3xl px-6 py-4 ${
                    msg.type === 'user'
                      ? 'bg-primary/20 border border-primary/30 text-text'
                      : 'glass-card'
                  }`}
                >
                  <p className="text-sm leading-7 whitespace-pre-wrap">{msg.content}</p>
                  {msg.type === 'assistant' && (
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleCopy(msg.content)}
                        type="button"
                        className="rounded-full p-2 hover:bg-surface transition"
                        title="Copy"
                      >
                        <Copy size={16} className="text-muted" />
                      </button>
                      <button
                        onClick={() => handleDownload(msg.content)}
                        type="button"
                        className="rounded-full p-2 hover:bg-surface transition"
                        title="Download"
                      >
                        <Download size={16} className="text-muted" />
                      </button>
                      <button
                        onClick={() => handleShare(msg.content)}
                        type="button"
                        className="rounded-full p-2 hover:bg-surface transition"
                        title="Share"
                      >
                        <Share2 size={16} className="text-muted" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="glass-card rounded-3xl px-6 py-4">
                  <div className="flex gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border bg-background/80 backdrop-blur-xl px-6 py-6 space-y-4">
            <div className="lg:hidden rounded-2xl border border-border bg-surface/40 p-4 space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-text">Verse Options</h2>
                <p className="mt-1 text-xs text-muted">{currentPreferenceLabel}</p>
              </div>
              {verseOptions}
            </div>
            <TextArea
              placeholder="Share your feelings, memories, or ideas..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleGenerate();
                }
              }}
            />
            <div className="flex gap-2 justify-end">
              <SecondaryButton onClick={handleClear}>Clear</SecondaryButton>
              <PrimaryButton
                onClick={handleGenerate}
                disabled={!prompt.trim() || loading}
                loading={loading}
                icon={Send}
              >
                Generate Verse
              </PrimaryButton>
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          className="w-96 border-r border-border bg-surface/40 p-6 overflow-y-auto hidden lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-lg font-semibold text-text mb-6">Verse Options</h2>
          {verseOptions}

          {/* Preset Prompts */}
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-text mb-4 uppercase tracking-wide">Quick Prompts</h3>
            {quickPrompts}
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default AIStudio;
