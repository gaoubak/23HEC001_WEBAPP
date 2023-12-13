import useApi from '../../hooks/useApi';

class ApiMessage {
    static getMessages = async () => {
        const { fetchData, data, error, isLoading } = useApi({
            url: 'http://127.0.0.1:8000/messages',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            fetchData,
            data,
            error,
            isLoading,
        };
    };

    static getMessagesByChannel = async (channelId: number) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: `http://127.0.0.1:8000/messages/chanel/${channelId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            fetchData,
            data,
            error,
            isLoading,
        };
    };

    static getMessagesByUser = async (userId: number) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: `http://127.0.0.1:8000/messages/user/${userId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            fetchData,
            data,
            error,
            isLoading,
        };
    };

    static getMessageById = async (messageId: number) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: `http://127.0.0.1:8000/messages/${messageId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            fetchData,
            data,
            error,
            isLoading,
        };
    };

    static createMessage = async (messageData: any) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: 'http://127.0.0.1:8000/messages',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: messageData,
        });

        return {
            fetchData,
            data,
            error,
            isLoading,
        };
    };

    static deleteMessage = async (messageId: number) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: `http://127.0.0.1:8000/messages/${messageId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            fetchData,
            data,
            error,
            isLoading,
        };
    };
}

export default ApiMessage;
