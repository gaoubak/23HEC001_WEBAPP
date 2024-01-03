export interface UserData {
    email: string;
    id: number;
    userPhoto: string | null;
    username: string;
}

export interface MessageData {
    date: string;
    id: number;
    user: UserData;
    userText: string;
}

export interface MessageProps {
    currentUser: string;
    messages: MessageData[];
    isloading?: boolean;
}
