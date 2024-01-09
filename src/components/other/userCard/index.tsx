import { ProfileCardProps } from '../../../interface/components/other/profileCard.interface';
import '../../../assets/style/components/other/userCard.css';
import Picture from '../../common/picture';
import DEFAULT_WEBP from '../../../assets/image/webp/default-pp.webp';
import DEFAULT_IMAGE from '../../../assets/image/jpg/default-pp.jpg';

function UserCard({ name, username, avatar, picture }: ProfileCardProps) {
    const webpSrc = picture?.webp || DEFAULT_WEBP;
    const fallbackSrc = picture?.png || DEFAULT_IMAGE;

    return (
        <div className="profile-card">
            <img src={avatar} alt={`${username}'s avatar`} />
            <Picture
                webpSrc={webpSrc}
                fallbackSrc={fallbackSrc}
                alt={`${username}'s avatar`}
            />
            <h2>{name}</h2>
            <p>@{username}</p>
        </div>
    );
}

export default UserCard;
