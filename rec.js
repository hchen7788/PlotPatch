import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = window.myAppConfig.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let plotName = localStorage.getItem('plotName');
document.getElementById('recHeader').textContent = "Find similar work as " + plotName;

async function handleRecSubmit(event){
    event.preventDefault();

    let userMessage = document.getElementById("rec-prompt");
    const recArea = document.getElementById("rec-container");

    var filter = userMessage.value.trim();
    if (filter === ''){
        return;
    }

    const prompt = "Recommend me some work that are similar to " + plotName + " based on " + filter;
    console.log(prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    recArea.text = text;
    userMessage.value = "";
}

const recFrom = document.getElementById("rec-form");
recFrom.addEventListener('submit', handleRecSubmit);

recFrom.addEventListener('keyup', (event)=>{
    if (event.keyCode === 13) handleRecSubmit(event);
})