import useApi from '../../hooks/useApi';

class ApiAuth {
    static register = async (userData: any) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: 'http://127.0.0.1:8000/users/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: userData,
        });

        return { fetchData, data, error, isLoading };
    };

    static login = async (userData: any) => {
        const { fetchData, data, error, isLoading } = useApi({
            url: 'http://127.0.0.1:8000/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: userData,
        });

        return { fetchData, data, error, isLoading };
    };
}

export default ApiAuth;
