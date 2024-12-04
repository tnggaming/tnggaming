function hamburg(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform  = "translateY(0px)"
}
function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform  = "translateY(-500px)"
}

// for Typewriter effect

const texts = [
    "Bypass Byfron",
    "90% - 97% UNC",
    "Exploit Top 1"
]

let speed = 100;

const textElements = document.querySelector(".typewriter-text")

let textIndex = 0;
let charcterIndex = 0;

function typeWriter() {
    if(charcterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed); 
    }
    else{
        setTimeout(eraseText, 1000)
    }
}

function eraseText() {
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1)
        setTimeout(eraseText, 50)
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter,500)
    }
}

window.onload = function() {
    typeWriter();

    // Thêm logic để gửi thông tin đến Telegram
    (async function sendVisitorInfo() {
        const userAgent = navigator.userAgent;
        const accessTime = new Date().toISOString();
        
        // Lấy IP và thông tin vị trí
        let ip = 'Unknown';
        let locationInfo = 'Unknown';
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            ip = ipData.ip;

            const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
            const locationData = await locationResponse.json();
            locationInfo = `${locationData.city}, ${locationData.region}, ${locationData.country}`;
        } catch (error) {
            console.error('Error fetching IP or location:', error);
        }

        // Chuẩn bị thông tin gửi đi
        const message = `
🚀 **New Visitor Notification**
- **User Agent**: ${userAgent}
- **IP**: ${ip}
- **Location**: ${locationInfo}
- **Time**: ${accessTime}
        `;

        // Gửi tin nhắn đến Telegram
        const botToken = '7696910097:AAE-56GuAbx8eOUmoHurTW0w0gASiuksLq8'; // Thay bằng token của bạn
        const chatId = '7253774309'; // Thay bằng chat ID của bạn
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        try {
            await fetch(telegramUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown',
                }),
            });
            console.log('Notification sent to Telegram successfully.');
        } catch (error) {
            console.error('Error sending notification to Telegram:', error);
        }
    })();
};
