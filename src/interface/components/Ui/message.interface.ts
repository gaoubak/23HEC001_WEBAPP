interface MessageData {
    date: string;
    message: string;
    username: string;
}

export interface MessageProps {
    currentUser: string;
    messages: MessageData[];
}
