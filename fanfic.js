import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = window.myAppConfig.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

let plotName = localStorage.getItem('plotName');
const header = document.getElementById('fanficHeader');
header.textContent = "Fan fic generator for " + plotName;

document.getElementById("fanFicBtn").addEventListener("click", async () => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = "Generate a fan fiction story for the work named Romeo and Juliet";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        console.log(text);
        // document.getElementById("content").textContent = text; // Display generated text in 'content' div
    } catch (error) {
        console.error("Error:", error);
    }
});

