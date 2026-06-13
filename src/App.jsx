import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, CheckCircle2, RefreshCw } from 'lucide-react';

const STUDY_THEMES = ['政治', '経済', '心理学', '歴史', '科学', 'オカルト', '雑学'];

export default function App() {
  const [activeTab, setActiveTab] = useState('generate');
  const [history, setHistory] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('study_logs');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const generateNote = (theme) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentNote({
        title: `${theme}の基礎知識`,
        points: Array.from({ length: 5 }, (_, i) => `${theme}の概念 ${i + 1}`),
        details: `${theme}の核心部分。ここに重要な情報を記載します。`,
        summary: `本日の${theme}学習まとめ。\n・理解度向上\n・写経完了`
      });
      setLoading(false);
      const newLog = { id: Date.now(), date: new Date().toLocaleDateString(), theme };
      const updated = [newLog, ...history];
      setHistory(updated);
      localStorage.setItem('study_logs', JSON.stringify(updated));
    }, 800);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-stone-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">手書きノート習慣</h1>
      <div className="flex gap-2 mb-6">
        <button onClick={() => setActiveTab('generate')} className="p-2 bg-white rounded shadow">生成</button>
        <button onClick={() => setActiveTab('history')} className="p-2 bg-white rounded shadow">履歴</button>
      </div>
      {activeTab === 'generate' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {STUDY_THEMES.map(t => <button key={t} onClick={() => generateNote(t)} className="p-2 bg-blue-100 rounded text-sm">{t}</button>)}
          </div>
          {loading ? <p>生成中...</p> : currentNote && (
            <div className="p-4 bg-white border rounded shadow">
              <h2 className="font-bold text-lg mb-2">{currentNote.title}</h2>
              <ul className="list-disc pl-4 text-sm mb-4">{currentNote.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
              <p className="text-sm italic">{currentNote.summary}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">{history.map(h => <div key={h.id} className="p-2 bg-white border rounded text-sm">{h.date}: {h.theme}</div>)}</div>
      )}
    </div>
  );
}
