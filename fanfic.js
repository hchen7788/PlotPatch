import { GoogleGenerativeAI } from "@google/generative-ai";
import { plotName, setPlotName } from "./module.js"

const API_KEY = window.myAppConfig.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

document.getElementById("fanFicBtn").addEventListener("click", async () => {
    const userInput = document.getElementById("plotInput").value.trim();
    if (!userInput) {
        alert("Please enter a plot to access the features.");
        return;
    }

    window.location.href = './fanfic.html';

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = "Generate a fan fiction story for the work named " + plotName;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        console.log(text);
        // document.getElementById("content").textContent = text; // Display generated text in 'content' div
    } catch (error) {
        console.error("Error:", error);
    }
});

