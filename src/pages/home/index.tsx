import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
    const [channels, setChannels] = React.useState([]);
    const [messages, setMessages] = React.useState([]);
    const currentUser = useSelector((state: RootState) => state.user.value);

    useEffect(() => {
        const fetchChannels = async () => {
            const response = await ApiChanel.getChannels();
            setChannels(response.data);
            if (!selectedChannel && response.data && response.data.length > 0) {
                dispatch(chanelSend(response.data[0].id));
            }
        };

        const fetchMessages = async () => {
            if (selectedChannel) {
                const response =
                    await ApiMessage.getMessagesByChannel(selectedChannel);
                setMessages(response.data);
            }
        };

        fetchChannels();
        fetchMessages();
    }, [selectedChannel, dispatch]);

    return (
        <div>
            <ChannelList channels={channels} />
            <MessageContent messages={messages} currentUser={currentUser} />
        </div>
    );
}

export default Home;
