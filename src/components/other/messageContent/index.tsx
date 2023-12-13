import { useState } from 'react';
import { MessageProps } from '../../../interface/components/other/message.interface';
import '../../../assets/style/components/other/message.css';

function MessageContent({ currentUser, messages }: MessageProps) {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') {
            return;
        }

        setNewMessage('');
    };

    return (
        <div className="message-content">
            <div className="message-container">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${
                            msg.username === currentUser ? 'right' : 'left'
                        }`}
                    >
                        <div className="message-info">
                            <span className="message-username">
                                {msg.username}
                            </span>
                            <span className="message-date">{msg.date}</span>
                        </div>
                        <div className="message-text">{msg.message}</div>
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="button" onClick={handleSendMessage}>
                    Envoyer
                </button>
            </div>
        </div>
    );
}

export default MessageContent;
