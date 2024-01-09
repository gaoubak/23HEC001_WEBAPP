import { formatDateToRelative } from '../../../utils/date.utils';
import { MessageProps } from '../../../interface/components/other/message.interface';
import '../../../assets/style/components/other/message.css';
import Button from '../../common/button';
import ApiMessage from '../../../api/message/message.api';

function Message({ currentUser, messages }: MessageProps) {
    const handleDeleteMessage = async (messageId: number) => {
        try {
            const response = await ApiMessage.deleteMessage(messageId);
            console.log(response);
        } catch (error) {
            console.error('Erreur lors de la suppression du message', error);
        }
    };

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
                    {msg.user.username === currentUser && (
                        <Button
                            text="Supprimer"
                            onClick={() => handleDeleteMessage(msg.id)}
                            variant="danger"
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default Message;
