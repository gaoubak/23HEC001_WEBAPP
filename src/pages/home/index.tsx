import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import ChanelList from '../../components/other/chanelList';
import MessageContent from '../../components/other/messageContent';
import { RootState } from '../../redux/store';
import { setUser } from '../../redux/slice/user.slice';
import { setUsers } from '../../redux/slice/users.slice';
import { setChanel } from '../../redux/slice/chanel.slice';
import { setMessage } from '../../redux/slice/message.slice';
import { setSelectChanel } from '../../redux/slice/selectChanel.slice';
import { toggleInitial } from '../../redux/slice/initial.slice';
import ApiUser from '../../api/user/user.api';
import ApiChanel from '../../api/chanel/chanel.api';
import ApiMessage from '../../api/message/message.api';
import '../../assets/style/pages/home.css';
import { setFollowers } from '../../redux/slice/followers.slice';

function Home() {
    const chanels = useSelector((state: RootState) => state.chanel.value);
    const messages = useSelector((state: RootState) => state.message.value);
    const currentUser = useSelector((state: RootState) => state.user.value);

    const dispatch = useDispatch();

    const initial = useSelector((state: RootState) => state.initial.value);

    const selectedChanel = useSelector(
        (state: RootState) => state.selectChanel.value
    );

    useEffect(() => {
        if (initial) {
            const fetchUserData = async () => {
                try {
                    const response = await ApiUser.getCurrentUsers();
                    if (response) {
                        dispatch(setUser(response.data));
                    }
                } catch (error) {
                    console.error(
                        'Erreur lors de la récupération des données utilisateur',
                        error
                    );
                }
            };

            const fetchUsersData = async () => {
                try {
                    const response = await ApiUser.getUsers();
                    if (response) {
                        dispatch(setUsers(response.data));
                    }
                } catch (error) {
                    console.error(
                        'Erreur lors de la récupération des données utilisateur',
                        error
                    );
                }
            };

            const fetchFollowersData = async () => {
                try {
                    const response = await ApiUser.getFollowersByUser();
                    if (response) {
                        dispatch(setFollowers(response.data));
                    }
                } catch (error) {
                    console.error(
                        'Erreur lors de la récupération des données utilisateur',
                        error
                    );
                }
            };

            const fetchChanels = async () => {
                try {
                    const response = await ApiChanel.getChanelByUser();
                    if (response) {
                        dispatch(setChanel(response.data.associations));
                        if (
                            !selectedChanel &&
                            response.data.associations.length > 0
                        ) {
                            dispatch(
                                setSelectChanel(
                                    response.data.associations[0].chanel
                                )
                            );
                        }
                    }
                } catch (error) {
                    console.error(
                        'Erreur lors de la récupération des données utilisateur',
                        error
                    );
                }
            };

            fetchChanels();
            fetchUserData();
            fetchUsersData();
            fetchFollowersData();

            dispatch(toggleInitial());
        }
    }, [initial, dispatch]);

    useEffect(() => {
        console.log(selectedChanel);
        const fetchMessages = async () => {
            if (selectedChanel && selectedChanel.id) {
                try {
                    const response = await ApiMessage.getMessagesByChanel(
                        selectedChanel.id
                    );
                    if (response) {
                        dispatch(setMessage(response.data));
                    }
                } catch (error) {
                    console.error(
                        'Erreur lors de la récupération des données utilisateur',
                        error
                    );
                }
            }
        };
        fetchMessages();
    }, [selectedChanel, dispatch]);

    return (
        <div className="Content">
            <ChanelList chanels={chanels} isloading={false} />
            <MessageContent
                currentUser={currentUser ?? ''}
                messages={messages}
                isloading={false}
            />
            <Outlet />
        </div>
    );
}

export default Home;
