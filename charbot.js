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

let char = ""
let history = ""

document.getElementById("charBotBtn").addEventListener("click", async () => {
    document.getElementById("chat-container").innerHTML = "";
    char = document.getElementById("character").value.trim();
    history = [
        {
            role: "user",
            parts: [{text: "Let's chat. I want you to mimic the tone of " + char + " in the work " + plotName + " and chat with me."}],
        },
        {
            role: "model",
            parts: [{text: "Sure, let's go. Now I am " + char + " in " + plotName}],
        },
    ];
});

async function getResponse(prompt){
    // const message = await model.generateContent(prompt);
    const chat = await model.startChat({history: history});
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(text);
    return text;
};

// use chat div
export const userDiv = (data) => {
    return `
    <!-- user chat -->
            <div>
                <p>You: ${data}</p>
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

    console.log(history);
}

const chatFrom = document.getElementById("chat-form");
chatFrom.addEventListener('submit', handleSubmit);

chatFrom.addEventListener('keyup', (event)=>{
    if (event.keyCode === 13) handleSubmit(event);
})



