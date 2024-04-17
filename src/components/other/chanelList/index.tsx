import { FaBars } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../common/button';
import useWindowSize from '../../../hooks/useWindowSize';
import { ChanelListProps } from '../../../interface/components/other/chanelCard.interface';
import ChanelCard from '../chanelCard';
import '../../../assets/style/components/other/chanelList.css';
import Picture from '../../common/picture';
import Titre from '../../common/titre';
import logo from '../../../assets/image/png/BlablaChat.png';
import logoWebp from '../../../assets/image/webp/BlablaChat.webp';
import Loader from '../../feedback/loader';
import { toggleBurgerMenu } from '../../../redux/slice/menu.slice';

function ChanelList({ chanels, isloading }: ChanelListProps) {
    const { width } = useWindowSize();
    const isBurgerMenuOpen = useSelector(
        (state: { menu: { isBurgerMenuOpen: boolean } }) =>
            state.menu.isBurgerMenuOpen
    );
    const dispatch = useDispatch();

    return (
        (width > 720 || isBurgerMenuOpen) && (
            <div className="chanel-list">
                {isloading && <Loader />}
                <div className="chanel-cards">
                    <div className="chanel-cards-burger">
                        <div className="logo-container">
                            <Picture
                                webpSrc={logoWebp}
                                fallbackSrc={logo}
                                alt="logo"
                            />
                            <Titre title="BlablaChat" balise="h3" />
                        </div>
                        {chanels?.map((chanel, index) => (
                            <ChanelCard key={index} chanel={chanel} />
                        ))}
                    </div>
                    {isBurgerMenuOpen && width < 720 && (
                        <div className="close-burger">
                            <Button
                                text=""
                                icon={FaBars}
                                onClick={() => dispatch(toggleBurgerMenu())}
                                variant="primary"
                            />
                        </div>
                    )}
                </div>
            </div>
        )
    );
}

export default ChanelList;
