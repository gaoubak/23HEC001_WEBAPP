import { Question } from '../interface/Other/question.interface';

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
    {
        id: 'confirmPassword',
        label: 'Confirmez votre mot de passe',
        type: 'password',
        placeholder: 'Confirmez votre mot de passe',
        required: true,
    },
];
