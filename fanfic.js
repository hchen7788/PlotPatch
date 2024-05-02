import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = window.myAppConfig.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

let plotName = localStorage.getItem('plotName');
const header = document.getElementById('fanficHeader');
header.textContent = "Fan fic generator for " + plotName;

document.getElementById("fanFicBtn").addEventListener("click", async () => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        let char1 = document.getElementById("character1").value.trim();
        let char2 = document.getElementById("character2").value.trim();
        let role1 = document.getElementById("role1").value.trim();
        let role2 = document.getElementById("role2").value.trim();
        let relationship = document.getElementById("relationship").value.trim();
        let bg = document.getElementById("bg").value.trim();
        let story = document.getElementById("story").value.trim();
        let more = document.getElementById("more").value.trim();

        const prompt = "Generate a fan fiction story for the work " + plotName + ", here are the main characters: " + char1 + " and " + char2 + ", and they are " + relationship + ". The backgroud is " + bg + ", and the story outline is " + story + ". Here are more details: " + more;
        console.log(prompt);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        console.log(text);
        document.getElementById("fanficContent").textContent = text; // Display generated text in 'content' div
    } catch (error) {
        console.error("Error:", error);
    }
});

