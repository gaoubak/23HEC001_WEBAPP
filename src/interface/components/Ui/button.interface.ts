export type ButtonProps = {
    text?: string;
    icon?: React.ComponentType<{ className?: string }>;
    onClick?: () => void;
    submit?: boolean;
    disabled?: boolean;
    className?: string;
    buttonClasses?: string;
};
