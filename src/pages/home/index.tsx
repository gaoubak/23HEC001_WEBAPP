import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import ChanelList from '../../components/other/chanelList';
import MessageContent from '../../components/other/messageContent';
import ApiChanel from '../../api/chanel/chanel.api';
import ApiMessage from '../../api/message/message.api';
import { chanelSend } from '../../redux/chanel.slice';
import { RootState } from '../../redux/store';
import '../../assets/style/pages/home.css';

function Home() {
    const dispatch = useDispatch();
    const selectedChanel = useSelector(
        (state: RootState) => state.chanel.value
    );
    const [chanels, setChanels] = useState([]);
    const [messages, setMessages] = useState([]);
    const currentUser = useSelector((state: RootState) => state.user.value);
    const [isChanelsLoading, setIsChanelsLoading] = useState(true);
    const [isMessagesLoading, setIsMessagesLoading] = useState(true);

    useEffect(() => {
        const fetchChanels = async () => {
            setIsChanelsLoading(true);
            const { data } = await ApiChanel.getChanelByUser();
            setIsChanelsLoading(false);
            setChanels(data.associations);
            if (!selectedChanel && data && data.associations.length > 0) {
                dispatch(chanelSend(data.associations[0].chanel));
            }
        };

        const fetchMessages = async () => {
            if (selectedChanel && selectedChanel.id) {
                setIsMessagesLoading(true);
                const { data } = await ApiMessage.getMessagesByChanel(
                    selectedChanel.id
                );
                setIsMessagesLoading(false);
                setMessages(data);
            }
        };

        fetchChanels();
        fetchMessages();
    }, [selectedChanel, dispatch]);

    return (
        <div className="Content">
            <ChanelList chanels={chanels} isloading={isChanelsLoading} />
            <MessageContent
                currentUser={currentUser ?? ''}
                messages={messages}
                isloading={isMessagesLoading}
            />
            <Outlet />
        </div>
    );
}

export default Home;
