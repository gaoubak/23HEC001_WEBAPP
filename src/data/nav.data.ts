import { MdHome, MdChat, MdPeople, MdPerson } from 'react-icons/md';
import { NavItem } from '../interface/components/layout/navIcon.interface';

const navItems: NavItem[] = [
    { path: '/Home', icon: MdHome, name: 'Home' },
    { path: '/Home/Channel', icon: MdChat, name: 'Channel' },
    { path: '/Home/Friend', icon: MdPeople, name: 'Friend' },
    { path: '/User', icon: MdPerson, name: 'User' },
];

export default navItems;
