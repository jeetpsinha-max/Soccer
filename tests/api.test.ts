import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../server.js";

describe("Soccer AI API Integration Tests", () => {
  it("GET /api/health returns status ok and soccer service status", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty("service", "soccer-ai-api");
    expect(res.headers).toHaveProperty("x-ratelimit-limit");
  });

  it("POST /api/gemini/ask returns 400 when prompt is missing", async () => {
    const res = await request(app).post("/api/gemini/ask").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Bad Request");
  });

  it("POST /api/gemini/ask processes tactical questions", async () => {
    const res = await request(app)
      .post("/api/gemini/ask")
      .send({ prompt: "What is the best counter to a high-pressing 4-3-3?" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("response");
  });

  it("POST /api/tactics/analyze returns 400 when teamInfo is missing", async () => {
    const res = await request(app).post("/api/tactics/analyze").send({});
    expect(res.status).toBe(400);
  });

  it("GET /api/players/rankings returns player efficiency list", async () => {
    const res = await request(app).get("/api/players/rankings");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
