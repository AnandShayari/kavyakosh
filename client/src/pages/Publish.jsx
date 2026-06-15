 import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import api from '../services/api';

function Publish() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', coverImage: '', mood: '', category: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveDraft = async () => {
    if (!form.title || !form.content) return showToast('error', 'Title and content are required');
    setLoading(true);
    try {
      await api.post('/poems', { ...form, isDraft: true, published: false });
      showToast('success', 'Draft saved successfully');
    } catch (err) {
      showToast('error', err.response?.data?.message || 'Failed to save draft');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!form.title || !form.content) return showToast('error', 'Title and content are required');
    setLoading(true);
    try {
      const res = await api.post('/poems', { ...form, isDraft: false, published: true });
      const poemId = res.data.data._id;
      await api.post(`/poems/${poemId}/publish`);
      showToast('success', 'Poem published successfully!');
      setTimeout(() => navigate('/explore'), 1500);
    } catch (err) {
      showToast('error', err.response?.data?.message || 'Failed to publish poem');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full rounded-3xl border border-border bg-surface/80 px-5 py-4 text-text outline-none focus:border-primary transition';

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      <SectionHeading title="Publish" subtitle="Share your next masterpiece" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.94fr]">
        <div className="rounded-[2rem] border border-border bg-surface/80 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">Draft tools</p>
          <ul className="mt-6 space-y-4 text-sm text-muted">
            <li>• Rich text editor with markdown support</li>
            <li>• Mood and category tagging</li>
            <li>• Draft saving and preview mode</li>
            <li>• Cover image upload and featured collections</li>
          </ul>
        </div>
        <div className="space-y-6 rounded-[2rem] border border-border bg-background/90 p-8 shadow-xl">
          <input
            type="text"
            placeholder="Title of your poem"
            value={form.title}
            onChange={set('title')}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Cover image URL"
            value={form.coverImage}
            onChange={set('coverImage')}
            className={inputClass}
          />
          <textarea
            placeholder="Write your poem or paste your draft here..."
            rows="12"
            value={form.content}
            onChange={set('content')}
            className={inputClass}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Mood tag"
              value={form.mood}
              onChange={set('mood')}
              className="rounded-3xl border border-border bg-surface/80 px-5 py-4 text-text outline-none focus:border-primary transition"
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={set('category')}
              className="rounded-3xl border border-border bg-surface/80 px-5 py-4 text-text outline-none focus:border-primary transition"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleSaveDraft}
              disabled={loading}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition hover:bg-yellow-500 disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              disabled={loading}
              className="rounded-full border border-border px-6 py-3 text-sm text-text transition hover:border-primary hover:text-primary disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 rounded-2xl px-6 py-4 text-sm font-semibold shadow-lg ${
          toast.type === 'success' ? 'bg-primary text-background' : 'bg-red-500 text-white'
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default Publish;
