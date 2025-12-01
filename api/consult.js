// api/consult.js
const { google } = require("googleapis");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, phone, debt, monthly, content } = req.body || {};

    // 0) 요청 들어오는지 확인
    console.log("📥 /api/consult 호출됨:", { name, phone, debt, monthly });

    // 1) Telegram 알림 보내기
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

    const tgRes = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT,
          text,
        }),
      }
    );

    const tgData = await tgRes.json().catch(() => ({}));
    console.log("📨 Telegram 응답:", tgRes.status, tgData);

    if (!tgRes.ok) {
      throw new Error(
        `Telegram API Error: ${tgRes.status} ${
          tgData?.description || ""
        }`.trim()
      );
    }

    // 2) Google Sheets에 기록
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
      range: "상담!A:F",
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
