import request from "supertest";
import app from "../server.js";

async function setupChallenge() {
  await request(app).post("/auth/register").send({
    username: "admin@example.com",
    password: "pass123",
    isAdmin: true,
  });

  const login = await request(app).post("/auth/login").send({
    username: "admin@example.com",
    password: "pass123",
  });

  const cookie = login.headers["set-cookie"];

  const challenge = await request(app)
    .post("/admin/challenges")
    .set("Cookie", cookie)
    .send({
      title: "Flag Test",
      description: "Test Challenge",
      flag: "FLAG{correct}",
      difficulty: "easy",
    });

  return challenge.body._id;
}

async function loginUser() {
  await request(app).post("/auth/register").send({
    username: "user@example.com",
    password: "pass123",
  });

  const res = await request(app).post("/auth/login").send({
    username: "user@example.com",
    password: "pass123",
  });

  return res.headers["set-cookie"];
}

describe("Flag Submission", () => {
  it("submits correct flag", async () => {
    const id = await setupChallenge();
    const userCookie = await loginUser();

    const res = await request(app)
      .post(`/submissions/${id}`)
      .set("Cookie", userCookie)
      .send({ flag: "FLAG{correct}" });

    expect(res.status).toBe(200);
    expect(res.body.correct).toBe(true);
  });

  it("rejects incorrect flag", async () => {
    const id = await setupChallenge();
    const userCookie = await loginUser();

    const res = await request(app)
      .post(`/submissions/${id}`)
      .set("Cookie", userCookie)
      .send({ flag: "WRONG" });

    expect(res.status).toBe(200);
    expect(res.body.correct).toBe(false);
  });
});
