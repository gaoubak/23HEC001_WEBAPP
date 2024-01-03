import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
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

    useEffect(() => {
        const fetchChannels = async () => {
            setIsChannelsLoading(true);
            const { data } = await ApiChanel.getChannels();
            setIsChannelsLoading(false);
            setChannels(data);
            if (!selectedChannel && data && data.length > 0) {
                dispatch(chanelSend(data[0].id));
            }
        };

        const fetchMessages = async () => {
            if (selectedChannel) {
                setIsMessagesLoading(true);
                const { data } =
                    await ApiMessage.getMessagesByChannel(selectedChannel);
                setIsMessagesLoading(false);
                setMessages(data);
            }
        };

        fetchChannels();
        fetchMessages();
    }, [selectedChannel, dispatch]);

    return (
        <div className="Content">
            <ChannelList channels={channels} isloading={isChannelsLoading} />
            <MessageContent
                messages={messages}
                currentUser={currentUser ?? ''}
                isloading={isMessagesLoading}
            />
            <Outlet />
        </div>
    );
}

export default Home;
