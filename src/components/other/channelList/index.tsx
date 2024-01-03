import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Button from '../../common/button';
import useWindowSize from '../../../hooks/useWindowSize';
import { ChannelListProps } from '../../../interface/components/other/channelCard.interface';
import ChannelCard from '../chanelCard';
import '../../../assets/style/components/other/channelList.css';
import Picture from '../../common/picture';
import Titre from '../../common/titre';
import logo from '../../../assets/image/png/BlablaChat.png';
import logoWebp from '../../../assets/image/webp/BlablaChat.webp';
import Loader from '../../feedback/loader';

function ChannelList({ channels, isloading }: ChannelListProps) {
    const { width } = useWindowSize();
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    return (
        <div className="channel-list">
            {isloading && <Loader />}
            <div className="NavMobile">
                {width < 720 && (
                    <Button
                        text=""
                        icon={FaBars}
                        onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
                        variant="primary"
                    />
                )}
                <div className="logo-container">
                    <Picture webpSrc={logoWebp} fallbackSrc={logo} alt="logo" />
                    <Titre title="BlablaChat" balise="h3" />
                </div>
            </div>

            {(width > 720 || isBurgerMenuOpen) && (
                <div className="channel-cards">
                    <div className="channel-cards-burger">
                        {channels.map((channel, index) => (
                            <ChannelCard
                                key={index}
                                id={channel.id}
                                nom={channel.nom}
                                users={channel.users}
                            />
                        ))}
                    </div>
                    {width < 720 && isBurgerMenuOpen && (
                        <div className="close-burger">
                            <Button
                                text=""
                                icon={FaBars}
                                onClick={() =>
                                    setIsBurgerMenuOpen(!isBurgerMenuOpen)
                                }
                                variant="primary"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ChannelList;
