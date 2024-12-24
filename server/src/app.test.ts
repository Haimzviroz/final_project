import request from "supertest";
import mongoose from "mongoose";
import app, { server } from "./app";

describe("GET /", () => {
    it("should return a 200 status code and Hello World!", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Hello World!");
    });
});

describe("POST /unknown", () => {
    it("should return a 404 status code for unknown routes", async () => {
        const response = await request(app).post("/unknown");
        expect(response.statusCode).toBe(404);
    });
});

// סגירת חיבור MongoDB לאחר כל הבדיקות
afterAll(async () => {
    await mongoose.connection.close(); // סוגר את החיבור
    server.close();
});
