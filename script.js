import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = window.myAppConfig.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// confirm plot
document.getElementById("plotBtn").addEventListener("click", function() {
    const userInput = document.getElementById("plotInput").value.trim();
    if (!userInput) {
        alert("Please enter a plot to access the features.");
        return;
    }

    const header = document.getElementById('mainHeader');
    header.textContent += " for ";
    header.textContent += userInput;

    // generate summary of the plot
    summarize(userInput);
});

async function summarize(userInput) {
    const summary = document.getElementById("summary");
    summary.textContent = "Hold tight! Generating a summary for " + userInput;
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = "Summarize the show/book named " + userInput;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    summary.textContent = text;
  }