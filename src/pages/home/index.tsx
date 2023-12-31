import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Loader from '../../components/feedback/loader';
import ChannelList from '../../components/other/channelList';
import MessageContent from '../../components/other/messageContent';
import ApiChanel from '../../api/chanel/chanel.api';
import ApiMessage from '../../api/message/message.api';
import { chanelSend } from '../../redux/chanel.slice';
import { RootState } from '../../redux/store';
import '../../assets/style/pages/home.css';

function Home() {
    const dispatch = useDispatch();
    const selectedChannel = useSelector(
        (state: RootState) => state.chanel.value
    );
    const [channels, setChannels] = useState([]);
    const [messages, setMessages] = useState([]);
    const currentUser = useSelector((state: RootState) => state.user.value);
    const [isChannelsLoading, setIsChannelsLoading] = useState(true);
    const [isMessagesLoading, setIsMessagesLoading] = useState(true);
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchChannels = async () => {
            setIsChannelsLoading(true);
            const { data } = await ApiChanel.getChannels();
            setIsChannelsLoading(false);
            setChannels(data);
            if (!selectedChannel && data && data.length > 0) {
                dispatch(chanelSend(data[0].id));
            }
            console.log(data);
        };

        const fetchMessages = async () => {
            if (selectedChannel) {
                setIsMessagesLoading(true);
                const { data } =
                    await ApiMessage.getMessagesByChannel(selectedChannel);
                setIsMessagesLoading(false);
                setMessages(data);
                console.log(data);
            }
        };

        fetchChannels();
        fetchMessages();
    }, [selectedChannel, dispatch]);

    useEffect(() => {
        setIsLoading(isChannelsLoading || isMessagesLoading);
    }, [isChannelsLoading, isMessagesLoading]);

    useEffect(() => {
        console.log('channels', selectedChannel);
    }, [selectedChannel]);

    return (
        <>
            {isloading && <Loader />}
            <div className="Content">
                <ChannelList channels={channels} />
                <MessageContent
                    messages={messages}
                    currentUser={currentUser ?? ''}
                />
                <Outlet />
            </div>
        </>
    );
}

export default Home;
