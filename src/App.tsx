import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold">Tailwind 적용</h1>
      <p className="mt-2 text-gray-400">기본 세팅~~</p>
    </div>
  );
}

export default App
