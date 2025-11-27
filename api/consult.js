// api/consult.js
const { google } = require("googleapis");

// Node 18 환경에서 fetch는 글로벌로 존재 (별도 import 불필요)

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, phone, debt, monthly, content } = req.body || {};

    // 🔐 1) Telegram 알림 보내기
    const text =
      `📩 신규 상담 요청\n` +
      `────────────────────\n` +
      `👤 이름: ${name}\n` +
      `📞 연락처: ${phone}\n` +
      `💳 총 채무: ${debt}\n` +
      `💸 월 상환액: ${monthly}\n` +
      `📝 내용:\n${content}\n` +
      `────────────────────\n` +
      `⏰ 시간: ${new Date().toLocaleString("ko-KR")}`;

    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT,
        text,
      }),
    });

    // 🔐 2) Google Sheets에 기록
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_EMAIL,
        private_key: process.env.GOOGLE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET,
      range: "상담!A:F", // 시트 이름!범위
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            name,
            phone,
            debt,
            monthly,
            content,
            new Date().toLocaleString("ko-KR"),
          ],
        ],
      },
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("❌ consult API error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
