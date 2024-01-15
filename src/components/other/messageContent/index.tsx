// MessageContent.tsx
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Message from '../message';
import Button from '../../common/button';
import {
    MessageContentProps,
    MessageData,
} from '../../../interface/components/other/message.interface';
import '../../../assets/style/components/other/messageContent.css';
import Loader from '../../feedback/loader';
import HeadChanel from '../headChanel';
import ApiMessage from '../../../api/message/message.api';
import { RootState } from '../../../redux/store';

function MessageContent({
    currentUser,
    isloading,
    messages,
}: MessageContentProps) {
    const [newMessage, setNewMessage] = useState('');

    const user = useSelector((state: RootState) => state.user.value);
    const selectChanel = useSelector(
        (state: RootState) => state.selectChanel.value
    );

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') {
            return;
        }

        const messageData = {
            user: user?.id,
            userText: newMessage,
            channel: selectChanel ? selectChanel.id : 0,
            date: new Date().toISOString(),
        };
        console.log('messageData', messageData);

        try {
            await ApiMessage.createMessage(messageData);
            setNewMessage('');
        } catch (error) {
            console.error("Erreur lors de l'envoi du message", error);
        }
    };

    return (
        <div className="message-content">
            {isloading && <Loader />}
            <HeadChanel
                photo={selectChanel?.chanelPhoto}
                username={selectChanel?.nom}
                id={selectChanel?.id}
            />

            <div className="messages-list">
                {messages.map((msg: MessageData, index: number) => (
                    <Message
                        key={index}
                        message={msg}
                        currentUser={currentUser}
                    />
                ))}
            </div>
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
