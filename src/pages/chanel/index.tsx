import { useEffect, useState } from 'react';
import Modal from '../../components/feedback/modal';
import ApiUser from '../../api/user/user.api';
import ApiChanel from '../../api/chanel/chanel.api';
import UserList from '../../components/other/userList';
import { ProfileCardProps } from '../../interface/components/other/profileCard.interface';
import Button from '../../components/common/button';
import Alert from '../../components/feedback/alert'; // Importation du composant Alert
import '../../assets/style/pages/friend.css';
import Titre from '../../components/common/titre';

function Chanel() {
    const [users, setUsers] = useState<ProfileCardProps[]>([]);
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const [chanelName, setChanelName] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<ProfileCardProps[]>([]);
    const [filter, setFilter] = useState('');
    const [notification, setNotification] = useState({
        type: '',
        message: '',
        key: Date.now(),
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await ApiUser.getFollowersByUser();
            if (!response.error && response.data) {
                setUsers(response.data);
                setFilteredUsers(response.data);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(
            (user) =>
                user.email?.toLowerCase().includes(filter.toLowerCase()) ||
                user.username?.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [filter, users]);

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

    const displayedUsers = filteredUsers.slice(0, 15);

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
                    users={displayedUsers}
                    onAddFollower={handleUserSelection}
                    selectedUserIds={selectedUserIds}
                />
            </div>
        </Modal>
    );
}

export default Chanel;
