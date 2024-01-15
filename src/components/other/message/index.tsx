import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { formatDateToRelative } from '../../../utils/date.utils';
import '../../../assets/style/components/other/message.css';
import Button from '../../common/button';
import Picture from '../../common/picture';
import DEFAULT_WEBP from '../../../assets/image/webp/default-pp.webp';
import DEFAULT_IMAGE from '../../../assets/image/jpg/default-pp.jpg';
import { MessageProps } from '../../../interface/components/other/message.interface';
import ApiMessage from '../../../api/message/message.api';
import Alert from '../../feedback/alert'; // Importez le composant Alert

function Message({ message, currentUser }: MessageProps) {
    const webpSrc = DEFAULT_WEBP;
    const fallbackSrc = DEFAULT_IMAGE;

    const [deleteMessageAlert, setDeleteMessageAlert] = useState({
        type: '',
        message: '',
        key: Date.now(),
    });

    const handleDeleteMessage = async (messageId: number) => {
        try {
            const response = await ApiMessage.deleteMessage(messageId);
            console.log(response);

            if (!response.error) {
                setDeleteMessageAlert({
                    type: 'success',
                    message: 'Le message a été supprimé avec succès.',
                    key: Date.now(),
                });
            } else {
                setDeleteMessageAlert({
                    type: 'error',
                    message: 'Erreur lors de la suppression du message.',
                    key: Date.now(),
                });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du message :', error);
        }
    };

    return (
        <div
            className={`message ${
                message.user.username === currentUser.username
                    ? 'right'
                    : 'left'
            }`}
        >
            <div className="message-info">
                <Picture
                    webpSrc={webpSrc}
                    fallbackSrc={fallbackSrc}
                    alt={`${message.user.username}'s avatar`}
                    className="pictureProfile"
                />
                <h4 className="message-username">{message.user.username}</h4>
            </div>
            <div className="message-text-contenaire">
                <p className="message-text">{message.userText}</p>
                {message.user.username === currentUser.username && (
                    <div className="message-delete-button">
                        <Button
                            icon={FaTrash}
                            onClick={() => handleDeleteMessage(message.id)}
                            variant="danger"
                        />
                    </div>
                )}
            </div>
            <small className="message-date">
                {formatDateToRelative(message.date)}
            </small>

            {deleteMessageAlert.message && (
                <Alert
                    type={deleteMessageAlert.type}
                    message={deleteMessageAlert.message}
                    key={Date.now()}
                />
            )}
        </div>
    );
}

export default Message;
