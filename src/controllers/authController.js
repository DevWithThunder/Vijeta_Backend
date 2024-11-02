const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ user });
  } catch (error) {
    console.log("error::: ", error);
    res.status(error?.code || 500).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    console.log("error::: ", error);
    res.status(error?.code || 500).json(error);
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ error: "Refresh token is required" });

  try {
    const { accessToken } = await authService.refreshAccessToken(refreshToken);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(error?.code || 500).json(error);
  }
};
