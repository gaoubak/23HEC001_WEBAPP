import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Modal from '../../components/feedback/modal';
import Alert from '../../components/feedback/alert';
import ApiContact from '../../api/contact/contact.api';
import UserList from '../../components/other/userList';
import '../../assets/style/pages/friend.css';
import Titre from '../../components/common/titre';

function Channel() {
    const currentUser = useSelector((state: RootState) => state.user.value);
    const users = useSelector((state: RootState) => state.users.value);
    const [filter, setFilter] = useState('');
    const [notification, setNotification] = useState({
        type: '',
        message: '',
        key: Date.now(),
    });

    const handleAddFollower = async (userId: number) => {
        const followerData = {
            user: currentUser ? currentUser.id : 0,
            follower: userId,
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

    const handleDeleteFollower = async (userId: number) => {
        const response = await ApiContact.deleteFollower(userId);
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
            {notification.message && (
                <Alert
                    key={notification.key.toString()}
                    type={notification.type}
                    message={notification.message}
                />
            )}
            <div className="friend-content">
                <Titre title="Gerée vos Follow" balise="h1" hasBorderBottom />
                <input
                    type="text"
                    placeholder="Rechercher des utilisateurs..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <UserList
                    users={users as any}
                    onAddFollower={handleAddFollower}
                    deleteFollower={handleDeleteFollower}
                />
            </div>
        </Modal>
    );
}

export default Channel;
