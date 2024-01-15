export interface ProfileCardProps {
    id: number;
    avatar: any;
    email: string;
    username: string;
    onAddFollower: (id: number) => void;
    deleteFollower?: (id: number) => void;
    selectedUserIds?: number[];
}
