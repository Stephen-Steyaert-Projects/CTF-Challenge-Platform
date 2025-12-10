import { useState } from "react";
import api from "../api/api.js";

export default function FlagSubmission({ challengeId }) {
  const [flag, setFlag] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post(`/submissions/${challengeId}`, { flag });
      setResult(res.data.correct ? "Correct!" : "Wrong!");
    } catch {
      setResult("Error submitting flag");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={flag} onChange={e => setFlag(e.target.value)} placeholder="Enter flag" />
      <button type="submit">Submit</button>
      {result && <p>{result}</p>}
    </form>
  );
}
