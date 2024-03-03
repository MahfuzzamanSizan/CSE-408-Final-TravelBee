import React, { useEffect } from 'react';
import "./chat.css"

const Chat = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.chatbase.co/embed.min.js";
        script.chatbotId = "E4NM2_RSmr9TPxVZ-bgUy";
        script.domain = "www.chatbase.co";
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            // Clean up the script when the component is unmounted
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="chatContainer">
        <h1>Welcome to ChatPage</h1>
        <iframe className="frame"
            src="https://www.chatbase.co/chatbot-iframe/E4NM2_RSmr9TPxVZ-bgUy"
            width="100%"
            style={{ height: '100%', minHeight: '700px' }}
            frameBorder="0"
        ></iframe>
    </div>
    );
};

export default Chat;
