import './ChannelList.css';
import { ChannelCardProps } from '../../../interface/components/other/channelCard.interface';
import ChannelCard from '../chanelCard';
import '../../../assets/style/components/other/channelCard.css';

interface ChannelListProps {
    channels: ChannelCardProps[];
}

function ChannelList({ channels }: ChannelListProps) {
    return (
        <div className="channel-list">
            <h2>Liste des Chaînes</h2>
            <div className="channel-cards">
                {channels.map((channel, index) => (
                    <ChannelCard
                        key={index}
                        name={channel.name}
                        description={channel.description}
                        followers={channel.followers}
                    />
                ))}
            </div>
        </div>
    );
}

export default ChannelList;
