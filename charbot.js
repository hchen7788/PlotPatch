import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = window.myAppConfig.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

let plotName = localStorage.getItem('plotName');
const header = document.getElementById('charBotHeader');
header.textContent = "Character bot for plot for " + plotName;

document.getElementById("charBotBtn").addEventListener("click", async () => {
    let char = document.getElementById("character").value.trim();
    document.getElementById("charBotContent").textContent = "Hold tight! Starting a conversation with " + char;
    
    try {
        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
              {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
              {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
              {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
        ];
        const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings});

        // const prompt = "Generate a fan fiction story for the work " + plotName + ", here are the main characters: " + char1 + "who is the " + role1 + ", and " + char2 + ", whoe is the " + role2 + ", and they are " + relationship + ". The backgroud is " + bg + ", and the story outline is " + story + ". Here are more details: " + more;
        const prompt = "hey"
        console.log(prompt);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        console.log(text);
        document.getElementById("charBotContent").textContent = text; // Display generated text in 'content' div
    } catch (error) {
        console.error("Error:", error);
    }
});

