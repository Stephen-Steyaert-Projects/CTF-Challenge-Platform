import { useEffect, useState } from "react";
import api from "../api/api.js";

export default function AdminDashboard() {
  const [challenges, setChallenges] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [newChallenge, setNewChallenge] = useState({ title: "", description: "", flag: "", difficulty: "easy" });

  const fetchData = async () => {
    const [chRes, subRes] = await Promise.all([api.get("/admin/challenges"), api.get("/admin/submissions")]);
    setChallenges(chRes.data);
    setSubmissions(subRes.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async () => {
    await api.post("/admin/challenges", newChallenge);
    fetchData();
  };

  const handleDelete = async id => {
    await api.delete(`/admin/challenges/${id}`);
    fetchData();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Create Challenge</h3>
      <input placeholder="Title" value={newChallenge.title} onChange={e => setNewChallenge({...newChallenge, title:e.target.value})}/>
      <input placeholder="Description" value={newChallenge.description} onChange={e => setNewChallenge({...newChallenge, description:e.target.value})}/>
      <input placeholder="Flag" value={newChallenge.flag} onChange={e => setNewChallenge({...newChallenge, flag:e.target.value})}/>
      <select value={newChallenge.difficulty} onChange={e => setNewChallenge({...newChallenge, difficulty:e.target.value})}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button onClick={handleCreate}>Create</button>

      <h3>Challenges</h3>
      {challenges.map(c => (
        <div key={c._id}>
          {c.title} <button onClick={() => handleDelete(c._id)}>Delete</button>
        </div>
      ))}

      <h3>Submissions</h3>
      {submissions.map(s => (
        <div key={s._id}>
          {s.user.username} submitted {s.submittedFlag} for {s.challenge.title} - {s.correct ? "Correct" : "Wrong"}
        </div>
      ))}
    </div>
  );
}
