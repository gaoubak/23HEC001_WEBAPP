import { useState, useEffect } from 'react';
import { FaInfo } from 'react-icons/fa';

export type AlertProps = {
    type?: string | 'info' | 'success' | 'warning' | 'error' | 'default' | undefined | null;
    message: string | undefined | null;
    icon?: React.ComponentType<{ className?: string }>;
    duration?: number;
};

const Alert = ({
    type = 'info',
    message,
    icon: IconComponent = FaInfo,
    duration,
}: AlertProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (duration !== 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration]);

    if (!isVisible) return null;

    const handleCloseAlert = () => {
        setIsVisible(false);
    };

    return (
        <div
            className={`Notif ${type}`}
            onClick={handleCloseAlert}
            role="alert"
        >
            <IconComponent className="icon-class-name" />
            <h4>{message}</h4>
        </div>
    );
};

export default Alert ;
