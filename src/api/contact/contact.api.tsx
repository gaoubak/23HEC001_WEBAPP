import useApi from '../../hooks/useApi';

class ApiContact {
    static getFollowers = async () => {
        const { fetchData, data, error, isLoading } = useApi({
            url: 'http://127.0.0.1:8000/followers',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return { fetchData, data, error, isLoading };
    };

    static getFollowerById = async (followerId: number) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: `http://127.0.0.1:8000/followers/${followerId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return { fetchData, data, error, isLoading };
    };

    static createFollower = async (followerData: any) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: 'http://127.0.0.1:8000/followers/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: followerData,
        });

        return { fetchData, data, error, isLoading };
    };

    static deleteFollower = async (followerId: number) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: `http://127.0.0.1:8000/followers/${followerId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return { fetchData, data, error, isLoading };
    };
}

export default ApiContact;
