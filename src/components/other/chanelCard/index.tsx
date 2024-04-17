import { useDispatch } from 'react-redux';
import { ChanelCardProps } from '../../../interface/components/other/chanelCard.interface';
import '../../../assets/style/components/other/chanelCard.css';
import { setSelectChanel } from '../../../redux/slice/selectChanel.slice';
import Picture from '../../common/picture';
import DEFAULT_WEBP from '../../../assets/image/webp/default-pp.webp';
import DEFAULT_IMAGE from '../../../assets/image/jpg/default-pp.jpg';

function ChanelCard({ chanel }: ChanelCardProps) {
    const dispatch = useDispatch();

    const handleChanelSelect = () => {
        dispatch(setSelectChanel(chanel));
    };

    const webpSrc = chanel?.chanelPhoto?.webp || DEFAULT_WEBP;
    const fallbackSrc = chanel?.chanelPhoto?.png || DEFAULT_IMAGE;

    return (
        <div
            className="chanel-card"
            onClick={handleChanelSelect}
            role="button"
            tabIndex={0}
        >
            <Picture
                webpSrc={webpSrc}
                fallbackSrc={fallbackSrc}
                alt={`${chanel.nom}'s avatar`}
                className="pictureProfile"
            />
            <div>
                <h4>{chanel.nom}</h4>
            </div>
        </div>
    );
}

export default ChanelCard;
