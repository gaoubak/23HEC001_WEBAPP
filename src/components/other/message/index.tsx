import { formatDateToRelative } from '../../../utils/date.utils'; // Ajustez le chemin selon votre structure de projet
import { MessageProps } from '../../../interface/components/other/message.interface';
import '../../../assets/style/components/other/message.css';

function Message({ currentUser, messages }: MessageProps) {
    return (
        <div className="message-container">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`message ${
                        msg.user.username === currentUser ? 'right' : 'left'
                    }`}
                >
                    <div className="message-info">
                        <span className="message-username">
                            {msg.user.username}
                        </span>
                        <span className="message-date">
                            {formatDateToRelative(msg.date)}
                        </span>
                    </div>
                    <div className="message-text">{msg.userText}</div>
                </div>
            ))}
        </div>
    );
}

export default Message;
