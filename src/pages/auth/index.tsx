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

    const checkPasswords = () => {
        if (isLogin) return true;
        return formData.plainPassword === formData.confirmPassword;
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setIsLoading(true);
        if (!checkPasswords()) {
            setAlert({
                type: 'error',
                message: 'Les mots de passe ne correspondent pas!',
                key: Date.now(),
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
        } catch (error) {
            setAlert({
                type: 'error',
                message: "Une erreur s'est produite lors de l'authentification",
                key: Date.now(),
            });
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
