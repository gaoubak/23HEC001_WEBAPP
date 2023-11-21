import './Input.css';
import { InputProps } from '../../../interface/components/Other/input.interface';

const Input = ({
    id,
    label,
    name,
    value,
    type = 'text',
    placeholder,
    error,
    icon: Icon = undefined,
    variant,
    minLength,
    maxLength,
    inputClasses = 'input',
    onChange,
}: InputProps) => {
    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <div className={inputClasses}>
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    minLength={minLength}
                    maxLength={maxLength}
                    onChange={onChange}
                />
                {variant === 'inputIcon' && Icon && <Icon />}
            </div>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Input;
