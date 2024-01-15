import Cookies from 'js-cookie';
import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interface/utils/api.interface';

class ApiChanel {
    static async getChanels(): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8090/api/chanels',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async getChanelById(channelId: number): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/api/chanels/${channelId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async getChanelByUser(): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8090/api/users/current-chanel',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async createChanel(channelData: any): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8090/api/chanels/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: channelData,
        };

        return api(apiProps);
    }

    static async updateChanel(
        channelId: number,
        channelData: any
    ): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/api/chanels/addUser/${channelId}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: channelData,
        };

        return api(apiProps);
    }

    static async deleteChanel(channelId: number): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/api/chanels/delete/${channelId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }
}

export default ApiChanel;
