import { ProfileCardProps } from '../../../interface/components/other/profileCard.interface';
import ProfileCard from '../userCard';
import '../../../assets/style/components/other/userList.css';

interface UserListProps {
    users: ProfileCardProps[];
    onAddFollower: (userId: number) => void;
    deleteFollower?: (userId: number) => void;
    selectedUserIds?: number[];
}

function UserList({
    users,
    onAddFollower,
    deleteFollower,
    selectedUserIds,
}: UserListProps) {
    return (
        <div className="user-list">
            <div className="user-cards">
                {users.map((user, index) => (
                    <ProfileCard
                        key={index}
                        id={user.id}
                        username={user.username}
                        avatar={user.avatar}
                        email={user.email}
                        onAddFollower={onAddFollower}
                        deleteFollower={deleteFollower}
                        selectedUserIds={selectedUserIds}
                    />
                ))}
            </div>
        </div>
    );
}

export default UserList;
