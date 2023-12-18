import { api } from '../../utils/api.utils'; // Assurez-vous que le chemin est correct
import { ApiProps, ApiReturn } from '../../interface/utils/api.interface';

class ApiChanel {
    static async getChannels(): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8090/chanels',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return api(apiProps);
    }

    static async getChannelById(channelId: number): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/chanels/${channelId}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return api(apiProps);
    }

    static async createChannel(channelData: any): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: 'http://127.0.0.1:8090/chanels',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: channelData,
        };

        return api(apiProps);
    }

    static async deleteChannel(channelId: number): Promise<ApiReturn> {
        const apiProps: ApiProps = {
            url: `http://127.0.0.1:8090/chanels/${channelId}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return api(apiProps);
    }
}

export default ApiChanel;
