import { useState, useEffect } from 'react';
import { MdExitToApp } from 'react-icons/md';
import NavIcon from '../navIcon';
import navItems from '../../../data/nav.data';
import { useLogout } from '../../../utils/logout.utils';
import '../../../assets/styles/components/layout/nav/Navbar.css';

function Navbar() {
    const [isMobile, setIsMobile] = useState(false);
    const logout = useLogout();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            {isMobile ? (
                navItems.map((item) => <NavIcon key={item.name} item={item} />)
            ) : (
                <div>
                    {navItems.map((item) => (
                        <NavIcon key={item.name} item={item} />
                    ))}
                </div>
            )}
            <button
                className="NavIon Selected"
                type="button"
                onClick={handleLogout}
                aria-label="Logout"
            >
                <MdExitToApp />
            </button>
        </div>
    );
}

export default Navbar;
