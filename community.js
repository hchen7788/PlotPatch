import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = window.myAppConfig.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let plotName = localStorage.getItem('plotName');
document.getElementById('communityHeader').textContent = "Find more about " + plotName;

document.getElementById('social').textContent = "Social media activities on " + plotName;
const prompt = "Find me some social media activities/groups about " + plotName;
console.log(prompt);
const result = await model.generateContent(prompt);
const response = await result.response;
const text = await response.text();
console.log(text);
document.getElementById("social").textContent += text; // Display generated text in 'content' div