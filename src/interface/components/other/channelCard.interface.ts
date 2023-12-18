export interface ChannelCardProps {
    id: number;
    name: string;
    description: string;
    followers: number;
}

export interface ChannelListProps {
    channels: ChannelCardProps[];
}
