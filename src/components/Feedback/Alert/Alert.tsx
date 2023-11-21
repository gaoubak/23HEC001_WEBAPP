import { useState, useEffect } from 'react';
import { FaInfo } from 'react-icons/fa';
import { AlertProps } from '../../../interface/components/Feedback/alert.interface';

function Alert({
    type = 'info',
    message,
    icon: IconComponent = FaInfo,
    duration,
}: AlertProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (duration !== 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration]);

    return isVisible ? (
        <div
            className={`Notif ${type}`}
            onClick={() => setIsVisible(false)}
            role="alert"
        >
            <IconComponent className="icon-class-name" />
            <h4>{message}</h4>
        </div>
    ) : null;
}

export default Alert;
