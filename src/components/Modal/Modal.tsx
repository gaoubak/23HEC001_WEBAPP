import  {ReactNode, useRef, useEffect, useCallback } from "react";
import { HiXMark } from "react-icons/hi2";

interface ModalProps {
    title?: string;
    backgroundDark?: boolean;
    position?: 'center' | 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left' | 'top' | 'left' | 'right' | 'bottom';
    isOpen: boolean;
    onClose?: () => void;
    leftButton?: JSX.Element;
    rightButton?: JSX.Element;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    children: ReactNode;
}

const Modal = ({
    title,
    backgroundDark = true,
    position = 'center',
    isOpen,
    onClose,
    leftButton,
    rightButton,
    icon: Icon,
    children,
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = useCallback(() => {
        onClose && onClose();
    }, [onClose]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClose]);

    const getPositionClasses = (position: string) => {
        switch (position) {
            case 'top-left': return 'items-start justify-start';
            case 'top-right': return 'items-start justify-end';
            case 'bottom-left': return 'items-end justify-start';
            case 'bottom-right': return 'items-end justify-end';
            case 'top': return 'items-start justify-center';
            case 'bottom': return 'items-end justify-center';
            case 'left': return 'items-center justify-start';
            case 'right': return 'items-center justify-end';
            case 'center':
            default: return 'items-center justify-center';
        }
    }

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 flex z-50 p-8 ${getPositionClasses(position)} ${backgroundDark ? 'bg-black bg-opacity-50' : ''}`}>
            <div ref={modalRef} className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-6 max-w-2xl min-w-full md:min-w-[80%]">
                <div className="flex justify-between items-center">
                    {Icon && <Icon className="mr-2"/>}
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white flex-grow">{title}</h3>
                    <button onClick={handleClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <HiXMark className="w-6 h-6" />
                    </button>
                </div>
                <div className="mt-4">{children}</div>
                {(leftButton || rightButton) && (
                    <div className="flex items-center mt-6 space-x-2">
                        {leftButton && leftButton}
                        {rightButton && rightButton}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
