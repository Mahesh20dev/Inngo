const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ✅ Predefined Q&A
const predefinedQA = {
    "what is your refund policy": "Our refund policy allows cancellation within 24 hours for a full refund.",
    "how do i book a listing": "To book a listing, go to the listings page, select your dates, and click 'Book Now'.",
    "do you provide customer support": "Yes! We provide 24/7 customer support via chat and email.",
    "is payment secure": "Yes, all payments are processed securely using industry-standard encryption.",
};

router.post("/", async (req, res) => {
    try {
        const userMessage = req.body.message?.toLowerCase().trim();
        if (!userMessage) {
            return res.status(400).json({ error: "Message is required" });
        }

        // ✅ Check predefined Q&A first
        if (predefinedQA[userMessage]) {
            return res.json({ reply: predefinedQA[userMessage] });
        }

        // ✅ Fallback to Gemini AI
        const result = await model.generateContent(userMessage);
        const aiReply = result.response.text() || "⚠️ Sorry, I couldn't find an answer.";

        return res.json({ reply: aiReply });

    } catch (err) {
        console.error("Chatbot Error:", err);
        res.json({
            reply: "⚠️ Sorry, I’m temporarily unavailable. Please try again later.",
        });
    }
});

module.exports = router;
