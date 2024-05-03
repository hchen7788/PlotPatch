import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = window.myAppConfig.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let plotName = localStorage.getItem('plotName');
const commheader = document.getElementById('communityHeader');
commheader.textContent = "Find more about " + plotName;