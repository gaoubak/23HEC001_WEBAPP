import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
    const navigate = useNavigate();

    const logout = () => {
        Cookies.remove('authToken');
        navigate('/');
    };

    return logout;
}
