import '../../../assets/style/components/common/modal.css';

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

function Modal(props: ModalProps) {
    const { children, isOpen, onClose } = props;

    if (!isOpen) return null;

    const handleOverlayClick = () => {
        onClose();
    };

    const handleContentClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') onClose();
    };

    return (
        <div
            className="modal-overlay"
            onClick={handleOverlayClick}
            role="presentation"
            onKeyUp={handleKeyUp}
            tabIndex={-1}
        >
            <div
                className="modal-content"
                onClick={handleContentClick}
                role="presentation"
            >
                {children}
            </div>
        </div>
    );
}

export default Modal;
