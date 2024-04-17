import { useState, useCallback } from 'react';
import {
    loginFormQuestions,
    registrationFormQuestions,
} from '../../data/auth.data';
import useWindowSize from '../../hooks/useWindowSize';
import { FormData } from '../../interface/pages/auth.interface';
import Alert from '../../components/feedback/alert';
import { ExtendedAlertProps } from '../../interface/components/feedback/alert.interface';
import Form from '../../components/common/form';
import ApiAuth from '../../api/auth/auth.api';
import '../../assets/style/pages/auth.css';
import Titre from '../../components/common/titre';
import logo from '../../assets/image/png/BlablaChat.png';
import logoWebp from '../../assets/image/webp/BlablaChat.webp';
import Welcom from '../../assets/image/svg/undraw_welcome.svg';
import WelcomWebp from '../../assets/image/webp/undraw_welcome.webp';
import Login from '../../assets/image/svg/undraw_login.svg';
import LoginWebp from '../../assets/image/webp/undraw_login.webp';
import Picture from '../../components/common/picture';
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

    const { width } = useWindowSize();

    const toggleAuthMode = useCallback(() => {
        setIsLogin((prevIsLogin) => !prevIsLogin);
        setFormData({});
        setAlert({ type: '', message: '', key: Date.now() });
    }, []);

    const handleAuthFeedback = useCallback(
        (message: string, isError: boolean = true) => {
            setAlert({
                type: isError ? 'error' : 'success',
                message,
                key: Date.now(),
            });
        },
        []
    );

    const authenticate = useCallback(
        async (data: any, apiMethod: (userData: any) => Promise<ApiReturn>) => {
            setIsLoading(true);
            try {
                const response = await apiMethod(data);

                if (response.error) {
                    handleAuthFeedback(response.error);
                } else {
                    handleAuthFeedback('Connexion réussie!', false);
                }
            } catch (error) {
                handleAuthFeedback(
                    error instanceof Error
                        ? error.message
                        : "Erreur d'authentification"
                );
            } finally {
                setIsLoading(false);
            }
        },
        [handleAuthFeedback]
    );

    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const authData = isLogin
                ? { username: formData.email, password: formData.password }
                : {
                      email: formData.email,
                      username: formData.username,
                      plainPassword: formData.password,
                  };

            if (!isLogin && formData.password !== formData.confirmPassword) {
                handleAuthFeedback('Les mots de passe ne correspondent pas!');
                return;
            }

            await authenticate(
                authData,
                isLogin ? ApiAuth.login : ApiAuth.register
            );
        },
        [isLogin, formData, authenticate, handleAuthFeedback]
    );

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
                <div className="auth-form">
                    <div className="auth-form-container">
                        {width <= 1024 && (
                            <div className="auth-form-container">
                                <div className="logo-container">
                                    <Picture
                                        webpSrc={logoWebp}
                                        fallbackSrc={logo}
                                        alt="logo"
                                    />
                                    <Titre title="BlablaChat" balise="h1" />
                                </div>
                            </div>
                        )}
                        <div className="auth-container-responsif">
                            <Picture
                                webpSrc={isLogin ? LoginWebp : WelcomWebp}
                                fallbackSrc={isLogin ? Login : Welcom}
                                alt="logo"
                            />
                            <div className="sous-auth-container-responsif">
                                {width > 1024 && (
                                    <div className="auth-form-container">
                                        <div className="logo-container">
                                            <Picture
                                                webpSrc={logoWebp}
                                                fallbackSrc={logo}
                                                alt="logo"
                                            />
                                            <Titre
                                                title="BlablaChat"
                                                balise="h1"
                                            />
                                        </div>
                                    </div>
                                )}
                                <Form
                                    dataQuestion={
                                        isLogin
                                            ? loginFormQuestions
                                            : registrationFormQuestions
                                    }
                                    handleSubmit={handleSubmit}
                                    dataArr={formData}
                                    setDataArr={setFormData}
                                    label={
                                        isLogin ? 'Se connecter' : "S'inscrire"
                                    }
                                />
                                <small
                                    role="button"
                                    tabIndex={0}
                                    onClick={toggleAuthMode}
                                >
                                    {isLogin
                                        ? "Pas encore de compte? S'inscrire"
                                        : 'Déjà un compte? Se connecter'}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Auth;
