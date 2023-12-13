import useApi from '../../hooks/useApi';

class ApiChanel {
    static getChannels = async () => {
        const { fetchData, data, error, isLoading } = useApi({
            url: 'http://127.0.0.1:8000/chanels',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return { fetchData, data, error, isLoading };
    };

    static getChannelById = async (channelId: number) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: `http://127.0.0.1:8000/chanels/${channelId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return { fetchData, data, error, isLoading };
    };

    static createChannel = async (channelData: any) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: `http://127.0.0.1:8000/chanels`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: channelData,
        });

        return { fetchData, data, error, isLoading };
    };

    static deleteChannel = async (channelId: number) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: `http://127.0.0.1:8000/chanels/${channelId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return { fetchData, data, error, isLoading };
    };
}

export default ApiChanel;
