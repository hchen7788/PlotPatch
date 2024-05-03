import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";


const API_KEY = window.myAppConfig.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let plotName = localStorage.getItem('plotName');
document.getElementById('recHeader').textContent = "Find similar work as " + plotName;

document.getElementById('recBtn').addEventListener('click', async function() {
    const userMessage = document.getElementById("recInput");
    let recArea = document.getElementById("rec-content");

    var filter = userMessage.value.trim();
    if (filter === ''){
        return;
    }

    const prompt = "Recommend me some work that are similar to " + plotName + " based on " + filter;
    console.log(prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    let md_text = window.mdToHtml(text);
    recArea.innerHTML = md_text;
    userMessage.value = "";
})

// const recFrom = document.getElementById("rec-form");
// recFrom.addEventListener('submit', handleRecSubmit);

// recFrom.addEventListener('keyup', (event)=>{
//     if (event.keyCode === 13) handleRecSubmit(event);
// })