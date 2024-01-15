import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { RootState } from '../../redux/store';
import Modal from '../../components/feedback/modal';
import Titre from '../../components/common/titre';
import Button from '../../components/common/button';
import ApiUser from '../../api/user/user.api';
import ApiContact from '../../api/contact/contact.api';
import Alert from '../../components/feedback/alert';
import { User, UserParams } from '../../interface/pages/otherUser.interface';
import '../../assets/style/pages/otherUser.css';

function OtherUser() {
    const currentUser = useSelector(
        (state: RootState) => state.user.value
    ) as User | null;
    const { userID } = useParams<UserParams>();
    const [user, setUser] = useState<User | null>(null);
    const [notification, setNotification] = useState({
        type: '',
        message: '',
        key: Date.now(),
    });

    useEffect(() => {
        const fetchUser = async () => {
            const userIDNumber = parseInt(userID || '0', 10);
            const response = await ApiUser.getUserById(userIDNumber);
            if (response.data) {
                setUser(response.data);
            }
        };

        fetchUser();
    }, [userID]);

    const handleAddFollower = async () => {
        const userIDNumber = parseInt(userID || '0', 10);
        const followerData = {
            user: currentUser?.id,
            follower: userIDNumber,
        };
        const response = await ApiContact.createFollower(followerData);
        if (response.error) {
            setNotification({
                type: 'error',
                message: "Échec de l'ajout du follower",
                key: Date.now(),
            });
        } else {
            setNotification({
                type: 'success',
                message: 'Follower ajouté avec succès',
                key: Date.now(),
            });
        }
    };

    const handleDeleteFollower = async () => {
        const userIDNumber = parseInt(userID || '0', 10);
        const response = await ApiContact.deleteFollower(userIDNumber);
        if (response.error) {
            setNotification({
                type: 'error',
                message: 'Échec de la suppression du follower',
                key: Date.now(),
            });
        } else {
            setNotification({
                type: 'success',
                message: 'Follower supprimé avec succès',
                key: Date.now(),
            });
        }
    };

    return (
        <Modal>
            <Titre
                title={user ? `Profil de ${user.username}` : 'Chargement...'}
                balise="h1"
                hasBorderBottom
            />
            {user && (
                <div className="otherUser-container">
                    <div>
                        <h4>Email: </h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4>Description: </h4>
                        <p>
                            {user.description ||
                                'cette utilisateur na pas de description'}
                        </p>
                    </div>

                    <div className="divButton">
                        <Button
                            text="Suivre"
                            onClick={handleAddFollower}
                            icon={FaPlus}
                        />
                        <Button
                            text="Supprimer"
                            onClick={handleDeleteFollower}
                            variant="danger"
                            icon={FaTrash}
                        />
                    </div>

                    {notification.message && (
                        <Alert
                            key={notification.key.toString()}
                            type={notification.type}
                            message={notification.message}
                        />
                    )}
                </div>
            )}
        </Modal>
    );
}

export default OtherUser;
