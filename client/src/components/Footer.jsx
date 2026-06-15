import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const sections = [
  { title: 'Platform', links: ['Explore', 'AI Studio', 'Marketplace', 'Competitions'] },
  { title: 'Company', links: ['About', 'Careers', 'Support', 'Press'] },
  { title: 'Resources', links: ['Guides', 'Blog', 'Community', 'Terms'] },
];

function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-6 py-12 text-sm text-muted">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text">KavyaKosh</h3>
          <p className="max-w-sm leading-7 text-muted">
            An AI-powered universe for poets, writers, and premium literary experiences.
          </p>
          <div className="flex items-center gap-3 text-text">
            <Link to="#" aria-label="Instagram" className="transition hover:text-primary"><Instagram size={18} /></Link>
            <Link to="#" aria-label="Twitter" className="transition hover:text-primary"><Twitter size={18} /></Link>
            <Link to="#" aria-label="Facebook" className="transition hover:text-primary"><Facebook size={18} /></Link>
            <Link to="#" aria-label="LinkedIn" className="transition hover:text-primary"><Linkedin size={18} /></Link>
          </div>
        </div>
        {sections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h4 className="font-semibold text-text">{section.title}</h4>
            <div className="space-y-2">
              {section.links.map((link) => (
                <Link key={link} to="#" className="block hover:text-primary">
                  {link}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted">
        © 2026 KavyaKosh. Crafted for the poetic future.
      </div>
    </footer>
  );
}

export default Footer;
