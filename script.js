import { GoogleGenerativeAI } from "@google/generative-ai";
import { plotName, setPlotName } from "./module.js"

const API_KEY = window.myAppConfig.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// confirm plot
document.getElementById("plotBtn").addEventListener("click", function() {
    const userInput = document.getElementById("plotInput").value.trim();
    if (!userInput) {
        alert("Please enter a plot to access the features.");
        return;
    }

    setPlotName(userInput);

    const header = document.getElementById('mainHeader');
    header.textContent = "Welcome to --PlotPatch-- for " + plotName;

    // generate summary of the plot
    summarize(plotName);
});

async function summarize(userInput) {
    const summary = document.getElementById("summary");
    summary.textContent = "Hold tight! Generating a summary for " + userInput;
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = "Summarize the show/book named " + userInput + 
        ", make it a dictionary. Points that I want: 1. the author, published time and platforms; 2. brief summary of the story in 3 sentences; 3. main chracters' name, characteristics, brief descriptions of their stories, separete the most important characters.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    summary.textContent = "1st " + text;

    const result_dict = await model.generateContent("Analyze the following text, convert the content to a dictionary format: " + text);
    const response_dict = await result_dict.response;
    const text_dict = response_dict.text();

    summary.textContent = "2nd " + text_dict;

    let summary_dict = JSON.parse(text_dict);

    summary.textContent = "3rd " + summary_dict;
  }