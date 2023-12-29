import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/feedback/loader';
import ChannelList from '../../components/other/channelList';
import MessageContent from '../../components/other/messageContent';
import ApiChanel from '../../api/chanel/chanel.api';
import ApiMessage from '../../api/message/message.api';
import { chanelSend } from '../../redux/chanel.slice';
import { RootState } from '../../redux/store';

function Home() {
    const dispatch = useDispatch();
    const selectedChannel = useSelector(
        (state: RootState) => state.chanel.value
    );
    const [channels, setChannels] = useState([]);
    const [messages, setMessages] = useState([]);
    const currentUser = useSelector((state: RootState) => state.user.value);
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchChannels = async () => {
            const { data, isLoading } = await ApiChanel.getChannels();
            setIsLoading(isLoading);
            setChannels(data);
            if (!selectedChannel && data && data.length > 0) {
                dispatch(chanelSend(data[0].id));
            }
        };

        const fetchMessages = async () => {
            if (selectedChannel) {
                const { data, isLoading } =
                    await ApiMessage.getMessagesByChannel(selectedChannel);
                setIsLoading(isLoading);
                setMessages(data);
            }
        };

        fetchChannels();
        fetchMessages();
    }, [selectedChannel, dispatch]);

    return (
        <>
            {isloading && <Loader />}
            <div>
                <ChannelList channels={channels} />
                <MessageContent
                    messages={messages}
                    currentUser={currentUser ?? ''}
                />
            </div>
        </>
    );
}

export default Home;
