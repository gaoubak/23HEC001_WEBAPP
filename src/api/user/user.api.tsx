import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interface/utils/api.interface';

class ApiUser {
    static async getUsers(): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8090/users',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return api(apiProps);
    }

    static async getUserById(userId: number): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/users/${userId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return api(apiProps);
    }

    static async updateUser(userId: number, userData: any): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/users/${userId}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: userData,
        };

        return api(apiProps);
    }

    static async deleteUser(userId: number): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/users/${userId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return api(apiProps);
    }
}

export default ApiUser;
