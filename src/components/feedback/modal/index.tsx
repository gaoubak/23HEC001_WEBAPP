import { useRef, useEffect, useCallback } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { ModalProps } from '../../../interface/components/feedback/modal.interface';
import '../../../assets/style/components/feedback/modal.css';

function Modal({
    title,
    backgroundDark = true,
    position = 'center',
    isOpen,
    onClose,
    leftButton,
    rightButton,
    icon: Icon,
    children,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClose]);

    if (!isOpen) return null;

    return (
        <div
            className={`modal-overlay ${backgroundDark ? 'dark-overlay' : ''}`}
        >
            <div ref={modalRef} className={`modal ${position}`}>
                <div className="modal-header">
                    {Icon && <Icon className="modal-icon" />}
                    <h3 className="modal-title">{title}</h3>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="modal-close"
                        aria-label="Close"
                    >
                        <HiXMark className="modal-close-icon" />
                    </button>
                </div>
                <div className="modal-content">{children}</div>
                {(leftButton || rightButton) && (
                    <div className="modal-buttons">
                        {leftButton && leftButton}
                        {rightButton && rightButton}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;
