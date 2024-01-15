import { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../components/feedback/modal';
import { RootState } from '../../redux/store';
import ApiChanel from '../../api/chanel/chanel.api';
import UserList from '../../components/other/userList';
import Button from '../../components/common/button';
import Alert from '../../components/feedback/alert';
import '../../assets/style/pages/friend.css';
import Titre from '../../components/common/titre';

function Chanel() {
    const users = useSelector((state: RootState) => state.followers.value);
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const [chanelName, setChanelName] = useState('');
    const [filter, setFilter] = useState('');
    const [notification, setNotification] = useState({
        type: '',
        message: '',
        key: Date.now(),
    });

    const handleUserSelection = (userId: number) => {
        setSelectedUserIds((prevIds) =>
            prevIds.includes(userId)
                ? prevIds.filter((id) => id !== userId)
                : [...prevIds, userId]
        );
    };

    const handleCreateChanel = async () => {
        const chanelData = {
            users: selectedUserIds,
            nom: chanelName,
        };
        const response = await ApiChanel.createChanel(chanelData);
        if (response.error) {
            setNotification({
                type: 'error',
                message: 'Échec de la création du groupe',
                key: Date.now(),
            });
        } else {
            setNotification({
                type: 'success',
                message: 'Groupe créé avec succès',
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
                <Titre title="Crée un groupe" balise="h1" hasBorderBottom />
                <input
                    type="text"
                    placeholder="Rechercher des utilisateurs..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                {selectedUserIds.length > 0 && (
                    <>
                        <input
                            id="chanelName"
                            placeholder="Nom du groupe"
                            value={chanelName}
                            onChange={(e) => setChanelName(e.target.value)}
                        />
                        <Button
                            text="Créer le groupe"
                            onClick={handleCreateChanel}
                        />
                    </>
                )}
                <UserList
                    users={users}
                    onAddFollower={handleUserSelection}
                    selectedUserIds={selectedUserIds}
                />
            </div>
        </Modal>
    );
}

export default Chanel;
