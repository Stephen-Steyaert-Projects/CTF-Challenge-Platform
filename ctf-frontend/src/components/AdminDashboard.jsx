import { useEffect, useState } from "react";
import api from "../api/api.js";

export default function AdminDashboard() {
  const [challenges, setChallenges] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    flag: "",
    difficulty: "easy"
  });

  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    flag: "",
    difficulty: "easy"
  });

  const fetchData = async () => {
    const [chRes, subRes] = await Promise.all([
      api.get("/challenges"),
      api.get("/admin/submissions")
    ]);
    setChallenges(chRes.data);
    setSubmissions(subRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    await api.post("/admin/challenges", newChallenge);
    setNewChallenge({ title: "", description: "", flag: "", difficulty: "easy" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await api.delete(`/admin/challenges/${id}`);
    fetchData();
  };

  // Start editing
  const startEditing = (challenge) => {
    setEditingId(challenge._id);
    setEditData({
      title: challenge.title,
      description: challenge.description,
      flag: challenge.flag,
      difficulty: challenge.difficulty
    });
  };

  // Save update
  const handleUpdate = async () => {
    await api.put(`/admin/challenges/${editingId}`, editData);
    setEditingId(null);
    fetchData();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* CREATE */}
      <h3>Create Challenge</h3>
      <input
        placeholder="Title"
        value={newChallenge.title}
        onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
      />
      <input
        placeholder="Description"
        value={newChallenge.description}
        onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
      />
      <input
        placeholder="Flag"
        value={newChallenge.flag}
        onChange={(e) => setNewChallenge({ ...newChallenge, flag: e.target.value })}
      />
      <select
        value={newChallenge.difficulty}
        onChange={(e) => setNewChallenge({ ...newChallenge, difficulty: e.target.value })}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button onClick={handleCreate}>Create</button>

      {/* UPDATE */}
      {editingId && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
          <h3>Edit Challenge</h3>

          <input
            placeholder="Title"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          />
          <input
            placeholder="Description"
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          />
          <input
            placeholder="Flag"
            value={editData.flag}
            onChange={(e) => setEditData({ ...editData, flag: e.target.value })}
          />
          <select
            value={editData.difficulty}
            onChange={(e) => setEditData({ ...editData, difficulty: e.target.value })}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </div>
      )}

      {/* LIST */}
      <h3>Challenges</h3>
      {challenges.map((c) => (
        <div key={c._id} style={{ marginBottom: "10px" }}>
          {c.title} ({c.difficulty})
          <button onClick={() => startEditing(c)} style={{ marginLeft: "10px" }}>
            Edit
          </button>
          <button onClick={() => handleDelete(c._id)}>Delete</button>
        </div>
      ))}

      <h3>Submissions</h3>
      {submissions.map((s) => (
        <div key={s._id}>
          {s.user.username} submitted {s.submittedFlag} for {s.challenge.title} -{" "}
          {s.correct ? "Correct" : "Wrong"}
        </div>
      ))}
    </div>
  );
}
