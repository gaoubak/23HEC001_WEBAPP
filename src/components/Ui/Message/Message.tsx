import './Message.css';
import { MessageProps } from '../../../interface/components/message.interface';

function Message({ currentUser, messages }: MessageProps) {
    return (
        <div className="message-container">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`message ${
                        msg.username === currentUser ? 'right' : 'left'
                    }`}
                >
                    <div className="message-info">
                        <span className="message-username">{msg.username}</span>
                        <span className="message-date">{msg.date}</span>
                    </div>
                    <div className="message-text">{msg.message}</div>
                </div>
            ))}
        </div>
    );
}

export default Message;
