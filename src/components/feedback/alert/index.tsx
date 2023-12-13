import { useState, useEffect } from 'react';
import { FaInfo } from 'react-icons/fa';
import { AlertProps } from '../../../interface/components/feedback/alert.interface';
import '../../../assets/style/components/feedback/alert.css';

function Alert({
    type = 'info',
    message,
    icon: IconComponent = FaInfo,
    duration,
}: AlertProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let timer: number | undefined;
        if (duration !== 0) {
            timer = setTimeout(() => setIsVisible(false), duration);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [duration]);

    const handleClose = () => setIsVisible(false);

    return isVisible ? (
        <div
            className={`Notif ${type}`}
            onClick={handleClose}
            role="button"
            tabIndex={0}
        >
            <IconComponent className="icon-class-name" />
            <h4>{message}</h4>
        </div>
    ) : null;
}

export default Alert;
