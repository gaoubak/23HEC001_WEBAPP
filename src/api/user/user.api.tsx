import { api } from '../../utils/api.utils';
import { ApiProps, ApiReturn } from '../../interface/utils/api.interface';

class ApiMessage {
    static async getMessages(): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8090/messages',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return api(apiProps);
    }

    static async getMessagesByChannel(channelId: number): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/messages/chanel/${channelId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return api(apiProps);
    }

    static async getMessagesByUser(userId: number): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/messages/user/${userId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return api(apiProps);
    }

    static async getMessageById(messageId: number): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/messages/${messageId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return api(apiProps);
    }

    static async createMessage(messageData: any): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8090/messages',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: messageData,
        };

        return api(apiProps);
    }

    static async deleteMessage(messageId: number): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/messages/${messageId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return api(apiProps);
    }
}

export default ApiMessage;
