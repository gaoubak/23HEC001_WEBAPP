import { ButtonProps } from '../../../interface/components/common/button.interface';
import '../../../assets/style/components/common/button.css';

function Button({
    text,
    icon: Icon = undefined,
    onClick,
    submit = false,
    disabled = false,
    variant = 'primary',
    outline = false,
}: ButtonProps) {
    const buttonClasses = `button ${
        outline ? `outline outline-${variant}` : variant
    }`;

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
