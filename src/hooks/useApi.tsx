import { useState } from 'react';
import {
    ApiHookProps,
    ApiHookReturn,
} from '../interface/hooks/useApi.interface';

function useApi({ url, method, headers, body }: ApiHookProps): ApiHookReturn {
    const [data, setData] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setIsLoading(false);
        }
    };

    return { fetchData, data, error, isLoading };
}

export default useApi;
