import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import Message from '../message';
import Button from '../../common/button';
import { MessageProps } from '../../../interface/components/other/message.interface';
import '../../../assets/style/components/other/messageContent.css';

import ApiMessage from '../../../api/message/message.api';

function MessageContent({ currentUser, messages }: MessageProps) {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') {
            return;
        }

        const messageData = {
            text: newMessage,
        };

        try {
            await ApiMessage.createMessage(messageData);
            setNewMessage('');
        } catch (error) {
            console.error("Erreur lors de l'envoi du message", error);
        }
    };
    return (
        <div className="message-content">
            <Message currentUser={currentUser} messages={messages} />

            <div className="message-input">
                <input
                    type="text"
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button
                    text=""
                    icon={FaPaperPlane}
                    onClick={handleSendMessage}
                    variant="primary"
                />
            </div>
        </div>
    );
}

export default MessageContent;
