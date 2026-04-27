const API_KEY = "AIzaSyC_iGetam4r5O2_s3gwmEG9KMC2zgnbHh8";
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const loading = document.getElementById('loading');

async function askGemini(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1alpha/models/gemini-3-preview:generateContent?key=${API_KEY}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

sendBtn.addEventListener('click', async () => {
    const text = userInput.value.trim();
    if (!text) return;

    // Mensagem do Usuário
    chatWindow.innerHTML += `<div class="message user">${text}</div>`;
    userInput.value = '';
    
    // Mostrar Carregamento
    loading.style.display = 'flex';
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
        const aiResponse = await askGemini(text);
        loading.style.display = 'none'; // Esconder Carregamento
        chatWindow.innerHTML += `<div class="message ai">${aiResponse}</div>`;
    } catch (e) {
        loading.style.display = 'none';
        chatWindow.innerHTML += `<div class="message ai">Erro na conexão.</div>`;
    }
    chatWindow.scrollTop = chatWindow.scrollHeight;
});
