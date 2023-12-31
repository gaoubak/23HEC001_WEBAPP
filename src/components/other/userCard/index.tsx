import { ProfileCardProps } from '../../../interface/components/other/profileCard.interface';
import '../../../assets/style/components/other/userCard.css';

function ProfileCard({ name, username, avatar }: ProfileCardProps) {
    return (
        <div className="profile-card">
            <img src={avatar} alt={`${username}'s avatar`} />
            <h2>{name}</h2>
            <p>@{username}</p>
        </div>
    );
}

export default ProfileCard;
