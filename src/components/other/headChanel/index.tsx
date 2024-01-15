import { useState } from 'react';
import { FaTrash, FaBars } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Picture from '../../common/picture';
import DEFAULT_WEBP from '../../../assets/image/webp/default-pp.webp';
import DEFAULT_IMAGE from '../../../assets/image/jpg/default-pp.jpg';
import Button from '../../common/button';
import '../../../assets/style/components/other/headChanel.css';
import useWindowSize from '../../../hooks/useWindowSize';
import { toggleBurgerMenu } from '../../../redux/menu.slice';
import ApiChanel from '../../../api/chanel/chanel.api';
import Alert from '../../feedback/alert'; // Importez le composant Alert

interface HeadChanelProps {
    photo?: {
        webp?: string;
        png?: string;
    };
    username: string;
    id: number;
}

function HeadChanel({ photo, username, id }: HeadChanelProps) {
    const { width } = useWindowSize();
    const dispatch = useDispatch();
    const webpSrc = photo?.webp || DEFAULT_WEBP;
    const fallbackSrc = photo?.png || DEFAULT_IMAGE;

    const [deleteChanelAlert, setDeleteChanelAlert] = useState({
        type: '',
        message: '',
        key: Date.now(),
    });

    const handleTrashClick = async () => {
        try {
            const response = await ApiChanel.deleteChanel(id);

            if (!response.error) {
                setDeleteChanelAlert({
                    type: 'success',
                    message: 'Le canal a été supprimé avec succès.',
                    key: Date.now(),
                });
            } else {
                setDeleteChanelAlert({
                    type: 'error',
                    message: 'Erreur lors de la suppression du canal.',
                    key: Date.now(),
                });
            }
        } catch (error) {
            console.error(
                "Une erreur s'est produite lors de la suppression du canal :",
                error
            );
        }
    };

    return (
        <div className="head-chanel">
            <div>
                {width < 720 && (
                    <Button
                        text=""
                        onClick={() => dispatch(toggleBurgerMenu())}
                        variant="primary"
                        icon={FaBars}
                    />
                )}

                <Picture
                    webpSrc={webpSrc}
                    fallbackSrc={fallbackSrc}
                    alt={`${username}'s avatar`}
                    className="pictureProfile"
                />
                <h4>{username}</h4>
            </div>

            <div>
                <Button
                    text=""
                    onClick={handleTrashClick}
                    variant="danger"
                    icon={FaTrash}
                />
            </div>

            {deleteChanelAlert.message && (
                <Alert
                    type={deleteChanelAlert.type}
                    message={deleteChanelAlert.message}
                    key={deleteChanelAlert.key.toString()}
                />
            )}
        </div>
    );
}

export default HeadChanel;
