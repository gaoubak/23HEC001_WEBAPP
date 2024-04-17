import Cookies from 'js-cookie';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    fetchEventSource,
    EventSourceMessage,
} from '@microsoft/fetch-event-source';
import { setChanel } from '../redux/slice/chanel.slice';
import { setFollowers } from '../redux/slice/followers.slice';
import { setMessage } from '../redux/slice/message.slice';
import { setUsers } from '../redux/slice/users.slice';

export default function useMercureHub(): void {
    const mercureToken = Cookies.get('mercureToken');
    const topics = Cookies.get('topics');
    const dispatch = useDispatch();

    const handleMessage = useCallback(
        (event: EventSourceMessage): void => {
            const data = JSON.parse(event.data);
            const { type, action, resource } = data;

            if (resource) {
                switch (type) {
                    case 'channels':
                        if (action === 'channel.message.created') {
                            dispatch(setChanel(resource));
                        }
                        break;
                    case 'followers':
                        dispatch(setFollowers(resource));
                        break;
                    case 'messages':
                        if (action === 'message.created') {
                            dispatch(setMessage(resource));
                        }
                        break;
                    case 'users':
                        if (
                            action === 'user.created' ||
                            action === 'user.updated'
                        ) {
                            dispatch(setUsers(resource));
                        }
                        break;
                    default:
                        console.log('[useMercureHub] Unknown type');
                }
            }
        },
        [dispatch]
    );

    const logMessageOnOpen = (res: Response): void => {
        if (res.ok && res.status === 200) {
            console.log('[useMercureHub] Connection established');
        } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
        ) {
            console.log('[useMercureHub] Client side error ', res);
        } else {
            console.log('[useMercureHub] Server side error ', res);
        }
    };

    const connectToMercureHub = useCallback(
        async (controller: AbortController, url: URL): Promise<void> => {
            const { signal } = controller;
            await fetchEventSource(url.toString(), {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${mercureToken}`,
                },
                signal,
                onclose: () => {
                    console.log(
                        '[useMercureHub] Connection closed by the server'
                    );
                },
                onerror: (err) => {
                    console.log(
                        '[useMercureHub] There was an error from server',
                        err
                    );
                },
                onmessage: handleMessage,
                onopen: (res: Response) =>
                    new Promise<void>((resolve) => {
                        logMessageOnOpen(res);
                        resolve();
                    }),
            });
        },
        [mercureToken, handleMessage]
    );

    useEffect(() => {
        if (!mercureToken) {
            console.log('[useMercureHub] No token');
            return;
        }

        if (!topics || topics.length === 0) {
            console.log('[useMercureHub] No topics');
            return;
        }

        const controller = new AbortController();

        const url = new URL('http://localhost:1234/.well-known/mercure');

        for (const topic of topics) {
            url.searchParams.append('topic', topic);
        }

        connectToMercureHub(controller, url);

        return () => {
            console.log('[useMercureHub] Closing connection');
            controller.abort();
        };
    }, [connectToMercureHub, topics, mercureToken]);
}
