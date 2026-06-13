import React, { useState } from 'react';
export default function App() {
  const [theme, setTheme] = useState('未選択');
  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">学習ノート生成</h1>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setTheme('心理学')}>心理学を生成</button>
      <div className="mt-4 p-4 border rounded">テーマ: {theme}</div>
    </div>
  );
}
