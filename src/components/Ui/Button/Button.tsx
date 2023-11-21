import { ButtonProps } from '../../../interface/components/Ui/button.interface';
import './Button.css';

function Button({
    text,
    icon: Icon = undefined,
    onClick,
    submit = false,
    disabled = false,
    buttonClasses = 'button',
}: ButtonProps) {
    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            type={submit ? 'submit' : 'button'}
            disabled={disabled}
        >
            {Icon && <Icon />}
            {text && <span>{text}</span>}
        </button>
    );
}

export default Button;
