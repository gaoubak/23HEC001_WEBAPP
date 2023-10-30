import { useEffect, ChangeEvent } from 'react';

type SelectProps = {
    id: string;
    label?: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    labelOptions?: string[];
    name: string;
    value: string | string[];
    selectClasses?: string;
};

export const Select = ({
    id,
    label,
    onChange,
    options = [],
    labelOptions = [],
    name,
    value,
    selectClasses = 'select',
}: SelectProps) => {
    useEffect(() => {
        if (options.length > 0 && (!value || value === undefined) && onChange) {
            onChange({
                target: {
                    name,
                    value: options[0],
                },
            } as ChangeEvent<HTMLSelectElement>);
        }
    }, [name, value, options, onChange]);

    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <select
                id={id}
                onChange={onChange}
                className={selectClasses}
                value={value}
            >
                {options.map((option, index) => (
                    <option key={option} value={labelOptions[index] || option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
