import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";


const API_KEY = window.myAppConfig.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// confirm plot
document.getElementById("plotBtn").addEventListener("click", function() {
    const userInput = document.getElementById("plotInput").value.trim();
    if (!userInput) {
        alert("Please enter a plot to access the features.");
        return;
    }

    let plotName = userInput;
    localStorage.setItem('plotName', plotName);

    const header = document.getElementById('mainHeader');
    header.textContent = "Welcome to PlotPatch for " + plotName;

    // generate summary of the plot
    summarize(plotName);
});

async function summarize(userInput) {
    const summary = document.getElementById("summary");
    summary.textContent = "Hold tight! Generating a summary for " + userInput;
    
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
    
    const prompt = "In the language I input, summarize the show/book named " + userInput + 
        ". Points that I want: 1. the author, published time and platforms; 2. brief summary of the story in 3 sentences; 3. main chracters' name, characteristics, brief descriptions of their stories, separete the most important characters.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    summary.innerHTML = window.mdToHtml(text);
  }