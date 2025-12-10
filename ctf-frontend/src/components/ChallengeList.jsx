import { useEffect, useState } from "react";
import api from "../api/api.js";
import FlagSubmission from "./FlagSubmission.jsx";

export default function ChallengeList() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    api.get("/challenges").then(res => setChallenges(res.data));
  }, []);

  return (
    <div>
      <h2>Challenges</h2>
      {challenges.map(c => (
        <div key={c._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{c.title}</h3>
          <p>Difficulty: {c.difficulty}</p>
          <FlagSubmission challengeId={c._id} />
        </div>
      ))}
    </div>
  );
}
