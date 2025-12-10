import request from "supertest";
import app from "../server.js";

describe("Auth Tests", () => {
  it("registers a user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User registered");
  });

  it("logs in a user", async () => {
    await request(app).post("/auth/register").send({
      email: "test@example.com",
      password: "password123",
    });

    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    expect(res.status).toBe(200);
    expect(res.headers["set-cookie"]).toBeDefined();
  });
});
