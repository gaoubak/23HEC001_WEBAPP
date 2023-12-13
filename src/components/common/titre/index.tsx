import { TitreProps } from '../../../interface/components/common/titre.interface';
import '../../../assets/style/components/common/titre.css';

function Titre({ title, balise = 'h1', color }: TitreProps) {
    const TagName = balise as keyof JSX.IntrinsicElements;
    const titreClass = `titre ${color ? color : ''}`;

    return <TagName className={titreClass}>{title}</TagName>;
}

export default Titre;
