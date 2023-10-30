import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert, { AlertProps } from '../../components/Alert/Alert';
import axios from 'axios';
import './Auth.css';
import Form from '../../components/Form/Form';  // Importez votre composant Form
import { loginFormQuestions, registrationFormQuestions } from '../../data/Auth.data';  // Importez vos données

const Auth: React.FC = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [AlertArr, setAlertArr] = useState<AlertProps | null>(null);

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setFormData({});  
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            if (isLogin) {
                const response = await axios.post('http://localhost:5000/api/auth/login', formData);
                localStorage.setItem('authToken', response.data.token);
                navigate('/Home');
            } else {
                if (formData.password !== formData.confirmPassword) {
                    setAlertArr({ type: 'error', message: 'Les mots de passe ne correspondent pas!' });
                    return;
                }
                const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
                localStorage.setItem('authToken', response.data.token);
                navigate('/Home');
            }
        } catch (error) {
            setAlertArr({
                type: 'error',
                message: "Une erreur s'est produite lors de l'authentification"
            });
            console.error(error);
        }
    };

    return (
        <>
            <Alert
                type={AlertArr && AlertArr.type}
                message={AlertArr && AlertArr.message}
            />
            <div className="auth-container">
                <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
                <Form
                    dataQuestion={isLogin ? loginFormQuestions : registrationFormQuestions}
                    handleSubmit={handleSubmit}
                    dataArr={formData}
                    setDataArr={setFormData}
                    label={isLogin ? 'Se connecter' : 'S\'inscrire'}
                />
                <small onClick={toggleAuthMode}>
                    {isLogin ? "Pas encore de compte? S'inscrire" : 'Déjà un compte? Se connecter'}
                </small>
            </div>
        </>
    );
};

export default Auth;
