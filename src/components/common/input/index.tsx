import { InputProps } from '../../../interface/components/common/input.interface';
import '../../../assets/style/components/common/input.css';

function Input({
    id,
    label,
    name,
    value = '',
    type = 'text',
    placeholder,
    error,
    icon: Icon = undefined,
    variant,
    minLength,
    maxLength,
    onChange,
}: InputProps) {
    return (
        <div className="inputDiv">
            <input
                className={error ? 'input-error' : ''}
                type={type}
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                onChange={onChange}
                required
            />
            <span></span>
            {label && <label htmlFor={id}>{label}</label>}
            {variant === 'inputIcon' && Icon && <Icon className="input-icon" />}
            {error && <p className="input-error-message">{error}</p>}
        </div>
    );
}

export default Input;
