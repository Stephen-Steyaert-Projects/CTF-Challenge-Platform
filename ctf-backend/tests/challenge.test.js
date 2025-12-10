import request from "supertest";
import app from "../server.js";

describe("Challenge Listing", () => {
  it("returns an empty list initially", async () => {
    const res = await request(app).get("/challenges");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
