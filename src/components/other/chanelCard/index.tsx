import { useDispatch } from 'react-redux';
import { ChannelCardProps } from '../../../interface/components/other/channelCard.interface';
import '../../../assets/style/components/other/chanelCard.css';
import { chanelSend } from '../../../redux/chanel.slice';
import Picture from '../../common/picture';
import DEFAULT_WEBP from '../../../assets/image/webp/default-pp.webp';
import DEFAULT_IMAGE from '../../../assets/image/jpg/default-pp.jpg';

function ChannelCard({ id, nom, users, picture }: ChannelCardProps) {
    const dispatch = useDispatch();

    const handleChannelSelect = () => {
        dispatch(chanelSend(id));
    };

    const webpSrc = picture?.webp || DEFAULT_WEBP;
    const fallbackSrc = picture?.png || DEFAULT_IMAGE;

    return (
        <div
            className="channel-card"
            onClick={handleChannelSelect}
            role="button"
            tabIndex={0}
        >
            <Picture
                webpSrc={webpSrc}
                fallbackSrc={fallbackSrc}
                alt={`${nom}'s avatar`}
            />
            <h4>{nom}</h4>
            <p>{users.length} Followers</p>
        </div>
    );
}

export default ChannelCard;
