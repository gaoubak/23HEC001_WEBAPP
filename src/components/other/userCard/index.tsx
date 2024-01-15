import { FaPlus, FaTrash } from 'react-icons/fa';
import { ProfileCardProps } from '../../../interface/components/other/profileCard.interface';
import '../../../assets/style/components/other/userCard.css';
import Picture from '../../common/picture';
import Button from '../../common/button';
import DEFAULT_WEBP from '../../../assets/image/webp/default-pp.webp';
import DEFAULT_IMAGE from '../../../assets/image/jpg/default-pp.jpg';

function UserCard({
    username,
    avatar,
    email,
    id,
    onAddFollower,
    deleteFollower,
    selectedUserIds,
}: ProfileCardProps) {
    const webpSrc = avatar?.webp || DEFAULT_WEBP;
    const fallbackSrc = avatar?.png || DEFAULT_IMAGE;

    const handleAddFollowerClick = () => onAddFollower(id);
    const isSelected = selectedUserIds ? selectedUserIds.includes(id) : false;
    return (
        <div className="profile-card">
            <div className="profile-card-left">
                <Picture
                    webpSrc={webpSrc}
                    fallbackSrc={fallbackSrc}
                    alt={`${username}'s avatar`}
                    className="pictureProfile"
                />
                <div>
                    <p>{email}</p>
                    <small>{username}</small>
                </div>
            </div>
            <div className="profile-card-right">
                <Button
                    text=""
                    icon={isSelected ? FaTrash : FaPlus}
                    variant={isSelected ? 'danger' : 'primary'}
                    onClick={handleAddFollowerClick}
                />
                {deleteFollower && (
                    <Button
                        text=""
                        icon={FaTrash}
                        onClick={() => deleteFollower(id)}
                        variant="danger"
                    />
                )}
            </div>
        </div>
    );
}

export default UserCard;
