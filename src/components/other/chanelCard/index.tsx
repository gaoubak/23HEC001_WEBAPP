import { useDispatch } from 'react-redux';
import { ChannelCardProps } from '../../../interface/components/other/channelCard.interface';
import '../../../assets/style/components/other/chanelCard.css';
import { chanelSend } from '../../../redux/chanel.slice';

function ChannelCard({ id, nom, users }: ChannelCardProps) {
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
            <h4>{nom}</h4>
            <p>{users.length} Followers</p>
        </div>
    );
}

export default ChannelCard;
