import React from 'react';

interface SwitchProps {
    isChecked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch: React.FC<SwitchProps> = ({ isChecked, onChange }) => {
    return (
        <label className="switch">
            <input type="checkbox" checked={isChecked} onChange={onChange} />
            <span className="slider"></span>
        </label>
    );
};

export default Switch;
