import { Question } from '../interface/Other/Question';

export const loginFormQuestions: Question[] = [
    {
        id: 'email',
        label: 'Adresse e-mail',
        type: 'text',
        placeholder: 'Entrez votre adresse e-mail',
        required: true,
    },
    {
        id: 'password',
        label: 'Mot de passe',
        type: 'password',
        placeholder: 'Entrez votre mot de passe',
        required: true,
    },
    {
        id: 'rememberMe',
        label: 'Se souvenir de moi',
        type: 'checkbox',
    },
];

export const registrationFormQuestions: Question[] = [
    {
        id: 'firstName',
        label: 'Prénom',
        type: 'text',
        placeholder: 'Entrez votre prénom',
        required: true,
    },
    {
        id: 'lastName',
        label: 'Nom de famille',
        type: 'text',
        placeholder: 'Entrez votre nom de famille',
        required: true,
    },
    {
        id: 'email',
        label: 'Adresse e-mail',
        type: 'text',
        placeholder: 'Entrez votre adresse e-mail',
        required: true,
    },
    {
        id: 'password',
        label: 'Mot de passe',
        type: 'password',
        placeholder: 'Entrez votre mot de passe',
        required: true,
    },
];
