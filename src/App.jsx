import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function App() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  async function loadHistory() {
    const { data } = await supabase
      .from("words")
      .select("*")
      .order("created_at", { ascending: false });

    setHistory(data || []);
  }

  useEffect(() => {
    loadHistory();
  }, []);

  async function searchWord() {
    if (!word.trim()) return;

    const existing = await supabase
      .from("words")
      .select("*")
      .eq("word", word.toLowerCase())
      .single();

    if (existing.data) {
      setResult(existing.data.explanation);
      return;
    }

    const response = await fetch("/api/explain-word", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        word
      })
    });

    const data = await response.json();

    setResult(data.text);

    await supabase
      .from("words")
      .insert({
        word: word.toLowerCase(),
        explanation: data.text
      });

    loadHistory();
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        color: "white",
        background: "#111",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <h1>Literary Vocabulary Vault</h1>

      <input
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Search word..."
        style={{
          width: "100%",
          padding: "12px"
        }}
      />

      <button
        onClick={searchWord}
        style={{
          marginTop: "10px",
          padding: "12px"
        }}
      >
        Search
      </button>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          marginTop: "20px"
        }}
      >
        {result}
      </pre>

      <h2>History</h2>

      {history.map((item) => (
        <div
          key={item.id}
          style={{
            padding: "8px",
            borderBottom: "1px solid #333"
          }}
        >
          {item.word}
        </div>
      ))}
    </div>
  );
}
