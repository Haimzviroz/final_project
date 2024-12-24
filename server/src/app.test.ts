import request from "supertest";
import mongoose from "mongoose";
import app, { server } from "./app";

describe("test analysis routes", () => {
    const basePath = "/api/analysis";
    it("should return 200", async () => {
        const response = await request(app).get(
            basePath + "/deadliest-attack-types"
        );
        expect(response.statusCode).toBe(200);
    });
    it("should return 200", async () => {
        const response = await request(app).get(
            basePath + "/highest-casualty-regions"
        );
        expect(response.statusCode).toBe(200);
    });
    it("should return 200", async () => {
        const response = await request(app).get(
            basePath + "/incident-trends/2017"
        );
        expect(response.statusCode).toBe(200);
    });
    it("should return 200", async () => {
        const response = await request(app).get(
            basePath + "/incident-trends/?min=2015&max=2017"
        );
        expect(response.statusCode).toBe(200);
    });
    it("should return 200", async () => {
        const response = await request(app).get(
            basePath + "/incident-trends/?last=5"
        );
        expect(response.statusCode).toBe(200);
    });
});
describe("test relationships routes", () => {
    const basePath = "/api/relationships";
    it("should return 200", async () => {
        const response = await request(app).get(
            basePath + "/top-groups/Israel"
        );
        expect(response.statusCode).toBe(200);
    });
    it("should return 200", async () => {
        const response = await request(app).get(
            basePath + "/groups-by-year/2017"
        );
        expect(response.statusCode).toBe(200);
    });
    it("should return 200", async () => {
        const response = await request(app).get(
            basePath + "/groups-by-organization/Hamas"
        );
        expect(response.statusCode).toBe(200);
    });
    it("should return 200", async () => {
        const response = await request(app).get(
            basePath + "/deadliest-regions/Hamas"
        );
        expect(response.statusCode).toBe(200);
    });
});
// סגירת חיבור MongoDB לאחר כל הבדיקות
afterAll(async () => {
    await mongoose.connection.close(); // סוגר את החיבור
    server.close();
});
