import { ChannelCardProps } from '../../../interface/components/channelCard.interface';

function ChannelCard({ name, description, followers }: ChannelCardProps) {
    return (
        <div className="channel-card">
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{followers} Followers</p>
        </div>
    );
}

export default ChannelCard;
