import { ProfileCardProps } from '../../../interface/components/other/profileCard.interface';
import '../../../assets/style/components/other/profileCard.css';

function ProfileCard({ name, username, bio, avatar }: ProfileCardProps) {
    return (
        <div className="profile-card">
            <img src={avatar} alt={`${username}'s avatar`} />
            <h2>{name}</h2>
            <p>@{username}</p>
            <p>{bio}</p>
        </div>
    );
}

export default ProfileCard;
