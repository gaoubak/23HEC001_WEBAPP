import './Button.css';

type ButtonProps = {
    text?: string;
    icon?: React.ComponentType<{ className?: string }>;
    onClick?: () => void;
    submit?: boolean;
    disabled?: boolean;
    className?: string;
    buttonClasses?: string;
};

const Button = ({
    text,
    icon: Icon = undefined,
    onClick,
    submit = false,
    disabled = false,
    buttonClasses = 'button',
}: ButtonProps) => {

    return (
        <button
            disabled={disabled}
            className={`${buttonClasses} }`}
            onClick={onClick}
            type={submit ? 'submit' : 'button'}
        >
            {Icon && <Icon />}
            {text && <span>{text}</span>}
        </button>
    );
};

export default Button;
