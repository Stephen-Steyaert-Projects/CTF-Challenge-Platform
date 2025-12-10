import request from "supertest";
import app from "../server.js";

async function loginAsAdmin() {
  await request(app).post("/auth/register").send({
    email: "admin@example.com",
    password: "password123",
    role: "admin"
  });

  const res = await request(app).post("/auth/login").send({
    email: "admin@example.com",
    password: "password123",
  });

  return res.headers["set-cookie"];
}

describe("Admin Challenge Creation", () => {
  it("allows admin to create challenge", async () => {
    const cookie = await loginAsAdmin();

    const res = await request(app)
      .post("/admin/challenges")
      .set("Cookie", cookie)
      .send({
        title: "Test Challenge",
        description: "Test Desc",
        flag: "FLAG{test}",
        difficulty: "easy"
      });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Challenge");
  });

  it("blocks non-admin", async () => {
    await request(app).post("/auth/register").send({
      email: "user@example.com",
      password: "password123",
    });

    const login = await request(app).post("/auth/login").send({
      email: "user@example.com",
      password: "password123",
    });

    const cookie = login.headers["set-cookie"];

    const res = await request(app)
      .post("/admin/challenges")
      .set("Cookie", cookie)
      .send({
        title: "Test",
        description: "Test",
        flag: "FLAG{test}",
        difficulty: "easy"
      });

    expect(res.status).toBe(403);
  });
});
