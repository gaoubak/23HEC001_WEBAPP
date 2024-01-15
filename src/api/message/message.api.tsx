import Cookies from 'js-cookie';
import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interface/utils/api.interface';

class ApiMessage {
    static async getMessages(): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8090/api/messages',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async getMessagesByChanel(channelId: number): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/api/messages/chanel/${channelId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async getMessagesByUser(userId: number): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/api/messages/user/${userId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async getMessageById(messageId: number): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/api/messages/${messageId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }

    static async createMessage(messageData: any): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8090/api/messages/send',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: messageData,
        };

        return api(apiProps);
    }

    static async deleteMessage(messageId: number): Promise<ApiReturn> {
        const token = Cookies.get('authToken');
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/api/messages/delete/${messageId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        return api(apiProps);
    }
}

export default ApiMessage;
