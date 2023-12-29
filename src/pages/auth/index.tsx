import { useState, useCallback } from 'react';
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
import logo from '../../assets/image/png/BlablaChat.png';
import logoWebp from '../../assets/image/webp/BlablaChat.webp';
import Welcom from '../../assets/image/svg/undraw_welcome.svg';
import Login from '../../assets/image/svg/undraw_login.svg';
import WelcomWebp from '../../assets/image/webp/undraw_welcome.webp';
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

    const toggleAuthMode = useCallback(() => {
        setIsLogin((prevIsLogin) => !prevIsLogin);
        setFormData({});
        setAlert({ type: '', message: '', key: Date.now() });
    }, []);

    const handleAuthError = useCallback((error: Error | string) => {
        const errorMessage = typeof error === 'string' ? error : error.message;
        setAlert({ type: 'error', message: errorMessage, key: Date.now() });
    }, []);

    const authenticate = useCallback(
        async (data: any, apiMethod: (userData: any) => Promise<ApiReturn>) => {
            setIsLoading(true);
            try {
                const { data: responseData, error } = await apiMethod(data);

                if (error) {
                    throw new Error(error);
                }
                console.log(responseData);
            } catch (error) {
                handleAuthError(
                    error instanceof Error ? error : "Erreur d'authentification"
                );
            } finally {
                setIsLoading(false);
                window.location.reload();
            }
        },
        [handleAuthError]
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
                handleAuthError('Les mots de passe ne correspondent pas!');
                return;
            }

            await authenticate(
                authData,
                isLogin ? ApiAuth.login : ApiAuth.register
            );
        },
        [isLogin, formData, authenticate, handleAuthError]
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
                        <div className="logo-container">
                            <Picture
                                webpSrc={logoWebp}
                                fallbackSrc={logo}
                                alt="logo"
                            />
                            <Titre title="BlablaChat" balise="h1" />
                        </div>

                        <Picture
                            webpSrc={isLogin ? LoginWebp : WelcomWebp}
                            fallbackSrc={isLogin ? Login : Welcom}
                            alt="logo"
                        />
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
