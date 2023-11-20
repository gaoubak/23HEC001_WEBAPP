import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    loginFormQuestions,
    registrationFormQuestions,
} from '../../data/Auth.data';
import { FormData } from '../../interface/pages/auth.interface';
import Alert from '../../components/Alert/Alert';
import Form from '../../components/Other/Form/Form';
import axios from 'axios';
import './Auth.css';

function Auth() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<FormData>({});
    const [alert, setAlert] = useState({ type: '', message: '' });

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setFormData({});
        setAlert({ type: '', message: '' });
    };

    const checkPasswords = () => {
        if (isLogin) return true;
        return formData.password === formData.confirmPassword;
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (!checkPasswords()) {
            setAlert({
                type: 'error',
                message: 'Les mots de passe ne correspondent pas!',
            });
            return;
        }

        try {
            const url = `http://localhost:5000/api/auth/${
                isLogin ? 'login' : 'signup'
            }`;
            const response = await axios.post(url, formData);
            localStorage.setItem('authToken', response.data.token);
            navigate('/Home');
        } catch (error) {
            setAlert({
                type: 'error',
                message: "Une erreur s'est produite lors de l'authentification",
            });
            console.error(error);
        }
    };

    return (
        <>
            {alert.message && (
                <Alert type={alert.type} message={alert.message} />
            )}
            <div className="auth-container">
                <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
                <Form
                    dataQuestion={
                        isLogin ? loginFormQuestions : registrationFormQuestions
                    }
                    handleSubmit={handleSubmit}
                    dataArr={formData}
                    setDataArr={setFormData}
                    label={isLogin ? 'Se connecter' : "S'inscrire"}
                />
                <small onClick={toggleAuthMode}>
                    {isLogin
                        ? "Pas encore de compte? S'inscrire"
                        : 'Déjà un compte? Se connecter'}
                </small>
            </div>
        </>
    );
}

export default Auth;
