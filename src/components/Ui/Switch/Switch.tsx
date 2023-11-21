import { SwitchProps } from '../../../interface/components/Ui/switch.interface';

function Switch({ isChecked, onChange }: SwitchProps) {
    return (
        <label className="switch">
            <input type="checkbox" checked={isChecked} onChange={onChange} />
            <span className="slider"></span>
        </label>
    );
}

export default Switch;
