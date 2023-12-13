import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    loginFormQuestions,
    registrationFormQuestions,
} from '../../data/auth.data';
import { FormData } from '../../interface/pages/auth.interface';
import Alert from '../../components/feedback/alert';
import Form from '../../components/common/form';
import ApiAuth from '../../api/auth/auth.api';
import '../../assets/style/pages/auth.css';
import Titre from '../../components/common/titre';
import logo from '../../assets/image/BlablaChat.png';

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
            const response = isLogin
                ? await ApiAuth.login(formData)
                : await ApiAuth.register(formData);

            if (response.error) {
                throw new Error(response.error);
            }

            localStorage.setItem('authToken', response.data.token);
            navigate('/Home');
        } catch (error) {
            setAlert({
                type: 'error',
                message: "Une erreur s'est produite lors de l'authentification",
            });
        }
    };

    return (
        <>
            {alert.message && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    duration={360}
                />
            )}
            <div className="auth-container">
                <div className="auth-form">
                    <Titre
                        title={isLogin ? 'Connexion' : 'Inscription'}
                        balise="h2"
                    />
                    <img src={logo} alt="logo" />
                    <Form
                        dataQuestion={
                            isLogin
                                ? loginFormQuestions
                                : registrationFormQuestions
                        }
                        handleSubmit={handleSubmit}
                        dataArr={formData}
                        setDataArr={setFormData}
                        label={isLogin ? 'Se connecter' : "S'inscrire"}
                    />
                    <small
                        role="button"
                        tabIndex={0}
                        onClick={toggleAuthMode}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                toggleAuthMode();
                            }
                        }}
                    >
                        {isLogin
                            ? "Pas encore de compte? S'inscrire"
                            : 'Déjà un compte? Se connecter'}
                    </small>
                </div>
            </div>
        </>
    );
}

export default Auth;
