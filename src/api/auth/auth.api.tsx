// ApiAuth.ts
import Cookies from 'js-cookie';
import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interface/utils/api.interface';

class ApiAuth {
    static async register(userData: any): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8090/api/users/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: userData,
        };

        const { data, error, isLoading } = await api(apiProps);

        if (data && data.token) {
            Cookies.set('authToken', data.token, {
                expires: 0.5,
                secure: true,
                sameSite: 'Strict',
            });
        }

        return { data, error, isLoading };
    }

    static async login(userData: any): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8090/api/login_check',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: userData,
        };

        const { data, error, isLoading } = await api(apiProps);

        if (data && data.token) {
            Cookies.set('authToken', data.token, {
                expires: 0.5,
                secure: true,
                sameSite: 'Strict',
            });
            window.location.reload();
        }

        return { data, error, isLoading };
    }
}

export default ApiAuth;
