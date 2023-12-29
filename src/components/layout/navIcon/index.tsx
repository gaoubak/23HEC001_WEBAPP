import { Link, useLocation } from 'react-router-dom';
import { NavIconProps } from '../../../interface/components/layout/navIcon.interface';
import '../../../assets/style/components/layout/navIcon.css';

function NavIcon({ item }: NavIconProps) {
    const location = useLocation();
    const Icon = item.icon;

    return (
        <Link to={item.path}>
            <div
                className={
                    location.pathname === item.path
                        ? 'NavIon Selected'
                        : 'NavIon'
                }
            >
                <Icon />
            </div>
        </Link>
    );
}

export default NavIcon;
