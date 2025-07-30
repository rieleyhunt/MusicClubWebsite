// AdminAddConcert.tsx
import React, { useState } from 'react';

const API = import.meta.env.VITE_API_URL; // e.g. http://localhost:3001 or https://api.yourdomain.com

export default function AdminAddConcert() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');        // YYYY-MM-DD or text
  const [location, setLocation] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Uploading image…');

    let photoUrl = '';
    if (file) {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`${API}/r2/upload`, { method: 'POST', body: form });
      if (!res.ok) return setStatus('Upload failed');
      const { url } = await res.json();
      photoUrl = url; // ← public R2 URL
    }

    setStatus('Saving concert…');
    const save = await fetch(`${API}/concerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, date, location, photo: photoUrl })
    });

    if (save.ok) {
      setStatus('Added ✅');
      setTitle(''); setDate(''); setLocation(''); setFile(null);
    } else {
      setStatus('Save failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Date (e.g. 2025-09-12)" value={date} onChange={e => setDate(e.target.value)} required />
      <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} required />
      <button type="submit">Add Concert</button>
      <small>{status}</small>
    </form>
  );
}
