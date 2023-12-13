export interface ApiHookProps {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: HeadersInit;
    body?: any;
}

export interface ApiHookReturn {
    fetchData: () => Promise<void>;
    data: any | null;
    error: string | null;
    isLoading: boolean;
}
