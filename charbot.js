import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = window.myAppConfig.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

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

let plotName = localStorage.getItem('plotName');
const header = document.getElementById('charBotHeader');
header.textContent = "Character bot for plot for " + plotName;

document.getElementById("charBotBtn").addEventListener("click", async () => {
    let char = document.getElementById("character").value.trim();
    document.getElementById("charBotContent").textContent = "Hold tight! Starting a conversation with " + char;
});


async function getResponse(prompt){
    const message = await model.generateContent(prompt);
    const response = await message.response;
    const text = response.text();

    console.log(text);
    return text;
};

// use chat div
export const userDiv = (data) => {
    return `
    <!-- user chat -->
            <div>
                <p>${data}</p>
            </div>
    `;
};

// ai chat div
export const aiDiv = (data) => {
    return `
    <!-- ai chat -->
            <div>
                <p>${data}</p>
            </div>
    `;
};


async function handleSubmit(event){
    event.preventDefault();

    let userMessage = document.getElementById("prompt");
    const chatArea = document.getElementById("chat-container");

    var prompt = userMessage.value.trim();
    if (prompt === ''){
        return;
    }

    chatArea.innerHTML += userDiv(prompt);
    userMessage.value = "";

    const aiResponse = await getResponse(prompt);
    chatArea.innerHTML += aiDiv(aiResponse);
}

const chatFrom = document.getElementById("chat-form");
chatFrom.addEventListener('submit', handleSubmit);

chatFrom.addEventListener('keyup', (event)=>{
    if (event.keyCode === 13) handleSubmit(event);
})



