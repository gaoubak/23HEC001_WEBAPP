import './Input.css';

type InputProps = {
    id: string;
    label?: string;
    name: string;
    value: string;
    type?: string;
    placeholder?: string;
    error?: string;
    icon?: React.ComponentType<{ className?: string }>;
    variant?: 'inputIcon' | null;
    minLength?: number;
    maxLength?: number;
    inputClasses?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
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

            {variant === 'inputIcon' && (
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
                    {Icon && <Icon />}
                </div>
            )}

            {!variant&& (
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
                </div>
            )}

            {error && <p>{error}</p>}
        </div>
    );
};

export default Input;