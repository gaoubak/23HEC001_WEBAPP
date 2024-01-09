export interface User {
    id: number;
    username: string;
    email: string;
    userPhoto: string | null;
}

export interface ChannelCardProps {
    id: number;
    nom: string;
    users: User[];
    picture: {
        webp: string;
        png: string;
    };
}

export interface ChannelListProps {
    channels: ChannelCardProps[];
    isloading: boolean;
}
