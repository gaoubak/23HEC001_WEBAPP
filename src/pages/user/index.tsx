// User.tsx

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../components/feedback/modal';
import Titre from '../../components/common/titre';
import Form from '../../components/common/form';
import { RootState } from '../../redux/store';
import { setUser } from '../../redux/user.slice';
import ApiUser from '../../api/user/user.api';
import { Question } from '../../interface/other/question.interface';

interface FormData {
    username: string;
    email: string;
    id?: number;
}

function User() {
    const user = useSelector(
        (state: RootState) => state.user.value
    ) as FormData | null;
    const dispatch = useDispatch();

    const initialFormData: FormData = {
        username: '',
        email: '',
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);

    useEffect(() => {
        if (user && typeof user === 'object') {
            setFormData(user as FormData);
        }
    }, [user]);

    const userQuestions: Question[] = [
        {
            id: 'username',
            label: 'Nom d’utilisateur',
            name: 'username',
            type: 'text',
            placeholder: 'Entrez votre nom d’utilisateur',
            required: true,
        },
        {
            id: 'email',
            label: 'Email',
            name: 'email',
            type: 'email',
            placeholder: 'Entrez votre email',
            required: true,
        },
    ];

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user && user.id) {
            try {
                const response = await ApiUser.updateUser(user.id, formData);
                if (response && response.data) {
                    dispatch(setUser(formData));
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour', error);
            }
        }
    };

    return (
        <Modal>
            <Titre title="Tes Paramettre" balise="h1" hasBorderBottom />
            <Form
                dataQuestion={userQuestions}
                handleSubmit={handleSubmit}
                dataArr={formData}
                setDataArr={setFormData}
                label="Mettre à jour"
            />
        </Modal>
    );
}

export default User;
