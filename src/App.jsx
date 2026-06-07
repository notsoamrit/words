import { useState } from 'react'

export default function App() {
  const [word,setWord]=useState('')
  return (
    <div style={{maxWidth:'900px',margin:'40px auto',fontFamily:'sans-serif'}}>
      <h1>Literary Vocabulary Vault</h1>
      <input value={word} onChange={e=>setWord(e.target.value)} placeholder='Search a word'/>
      <p>Project scaffold generated. Add keys and implement Gemini/Supabase wiring.</p>
    </div>
  )
}
