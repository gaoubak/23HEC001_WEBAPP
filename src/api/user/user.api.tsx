import useApi from '../../hooks/useApi';

class ApiMessage {
    static getUsers = async () => {
        const { fetchData, data, error, isLoading } = useApi({
            url: 'http://127.0.0.1:8000/users',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return { fetchData, data, error, isLoading };
    };

    static getUserById = async (userId: number) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: `http://127.0.0.1:8000/users/${userId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return { fetchData, data, error, isLoading };
    };

    static updateUser = async (userId: number, userData: any) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: `http://127.0.0.1:8000/users/${userId}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: userData,
        });

        return { fetchData, data, error, isLoading };
    };

    static deleteUser = async (userId: number) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: `http://127.0.0.1:8000/users/${userId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return { fetchData, data, error, isLoading };
    };
}

export default ApiMessage;
