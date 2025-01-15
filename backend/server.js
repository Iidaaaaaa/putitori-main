const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors()); // すべてのリクエストでCORSを許可

app.get("/api/hotpepper", async (req, res) => {
  const { lat, lng, range, genre, count } = req.query;
  const apiKey = "458f270ff858e3ad"; // ホットペッパーAPIのキー
  const url = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKey}&lat=${lat}&lng=${lng}&range=${range}&genre=${genre}&count=${count}&format=json`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error("ホットペッパーAPIリクエストエラー:", err);
    res
      .status(500)
      .json({ error: "ホットペッパーAPIのリクエストに失敗しました。" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動中...`);
});
