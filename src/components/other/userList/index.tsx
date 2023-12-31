import { ProfileCardProps } from '../../../interface/components/other/profileCard.interface';
import ProfileCard from '../userCard';
import '../../../assets/style/components/other/userList.css';

interface UserListProps {
    users: ProfileCardProps[];
}

function UserList({ users }: UserListProps) {
    return (
        <div className="user-list">
            <div className="user-cards">
                {users.map((user, index) => (
                    <ProfileCard
                        key={index}
                        name={user.name}
                        username={user.username}
                        avatar={user.avatar}
                    />
                ))}
            </div>
        </div>
    );
}

export default UserList;
