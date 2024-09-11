const authService = require("../../src/services/authService");
const User = require("../../src/models/User");

describe("AuthService", () => {
  it("should register a user", async () => {
    const user = await authService.register({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    expect(user).toHaveProperty("user");
    expect(user).toHaveProperty("token");
  });

  it("should login a user", async () => {
    const token = await authService.login({
      email: "john@example.com",
      password: "password123",
    });
    expect(token).toBeTruthy();
  });
});
