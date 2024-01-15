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
import '../../assets/style/pages/user.css';

interface FormData {
    username: string;
    email: string;
    description: string;
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
        description: '',
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
        {
            id: 'description',
            label: 'Description',
            name: 'description',
            type: 'text',
            placeholder: 'Entrez votre description',
            required: false,
        },
    ];

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user && user.id) {
            try {
                const userData = {
                    email: formData.email,
                    username: formData.username,
                    description: formData.description,
                };
                const response = await ApiUser.updateUser(userData);
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
            <div className="setting-container">
                <Titre title="Tes Paramètres" balise="h1" hasBorderBottom />
                <div className="setting-form">
                    <Form
                        dataQuestion={userQuestions}
                        handleSubmit={handleSubmit}
                        dataArr={formData}
                        setDataArr={setFormData}
                        label="Mettre à jour"
                    />
                </div>
            </div>
        </Modal>
    );
}

export default User;
