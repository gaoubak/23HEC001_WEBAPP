export interface User {
    id: number;
    username: string;
    email: string;
    userPhoto: string | null;
}

export interface ChanelCard {
    id: number;
    nom: string;
    associations: User[];
    chanelPhoto: {
        webp: string;
        png: string;
    };
}

export interface ChanelCardProps {
    chanel: ChanelCard;
}

export interface ChanelListProps {
    chanels: ChanelCard[];
    isloading: boolean;
}
