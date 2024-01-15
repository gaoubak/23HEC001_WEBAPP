export interface UserPhoto {
    webp: string;
    png: string;
}
export interface UserData {
    email: string;
    id: number;
    userPhoto: UserPhoto;
    username: string;
}

export interface MessageData {
    date: string;
    id: number;
    user: UserData;
    userText: string;
}

export interface MessageProps {
    currentUser: UserData;
    message: MessageData;
}

export interface MessageContentProps {
    currentUser: any;
    messages: MessageData[];
    isloading?: boolean;
}
