import { useDispatch } from 'react-redux';
import { ChannelCardProps } from '../../../interface/components/other/channelCard.interface';
import '../../../assets/style/components/other/chanelCard.css';
import { chanelSend } from '../../../redux/chanel.slice';

function ChannelCard({ id, name, description, followers }: ChannelCardProps) {
    const dispatch = useDispatch();

    const handleChannelSelect = () => {
        dispatch(chanelSend(id));
    };

    return (
        <div
            className="channel-card"
            onClick={handleChannelSelect}
            role="button"
            tabIndex={0}
        >
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{followers} Followers</p>
        </div>
    );
}

export default ChannelCard;
