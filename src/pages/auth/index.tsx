import { useState } from 'react';
import {
    loginFormQuestions,
    registrationFormQuestions,
} from '../../data/auth.data';
import { FormData } from '../../interface/pages/auth.interface';
import Alert from '../../components/feedback/alert';
import { ExtendedAlertProps } from '../../interface/components/feedback/alert.interface';
import Form from '../../components/common/form';
import ApiAuth from '../../api/auth/auth.api';
import '../../assets/style/pages/auth.css';
import Titre from '../../components/common/titre';
import logo from '../../assets/image/BlablaChat.png';
import Welcom from '../../assets/image/undraw_welcome.svg';
import Login from '../../assets/image/undraw_login.svg';
import Loader from '../../components/feedback/loader';
import { ApiReturn } from '../../interface/utils/api.interface';

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<FormData>({});
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState<ExtendedAlertProps>({
        type: '',
        message: '',
        key: Date.now(),
    });

    const toggleAuthMode = () => {
        setIsLoading(true);
        setIsLogin(!isLogin);
        setFormData({});
        setAlert({ type: '', message: '', key: Date.now() });
        setIsLoading(false);
    };

    const handleAuthError = (error: unknown) => {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Une erreur s'est produite lors de l'authentification";
        setAlert({ type: 'error', message: errorMessage, key: Date.now() });
    };

    const authenticate = async (
        data: { username: any; password: any; email?: any },
        apiMethod: {
            (userData: any): Promise<ApiReturn>;
            (userData: any): Promise<ApiReturn>;
            (arg0: any): any;
        }
    ) => {
        try {
            const response = await apiMethod(data);
            console.log(response);
        } catch (error) {
            handleAuthError(error);
        }
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setIsLoading(true);

        if (isLogin) {
            await authenticate(
                {
                    username: formData.email,
                    password: formData.password,
                },
                ApiAuth.login
            );
        } else {
            if (formData.password !== formData.confirmPassword) {
                handleAuthError(
                    new Error('Les mots de passe ne correspondent pas!')
                );
                return;
            }
            await authenticate(
                {
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                },
                ApiAuth.register
            );
        }

        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <Loader />}
            {alert.message && (
                <Alert
                    key={alert.key.toString()}
                    type={alert.type}
                    message={alert.message}
                    duration={30000}
                />
            )}

            <div className="auth-container">
                <div className="logo-container">
                    <div>
                        <img src={logo} alt="logo" />
                        <Titre title="BlablaChat" balise="h1" />
                    </div>
                </div>
                <div className="auth-form">
                    <div className="auth-form-container">
                        <Titre
                            title={isLogin ? 'Connexion' : 'Inscription'}
                            balise="h2"
                            hasBorderBottom
                        />
                        <img src={isLogin ? Login : Welcom} alt="ImgAuth" />
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
            </div>
        </>
    );
}

export default Auth;
