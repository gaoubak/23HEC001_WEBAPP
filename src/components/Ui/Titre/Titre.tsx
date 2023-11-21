import './Titre.css';
import { TitreProps } from '../../../interface/components/Ui/titre.interface';

function Titre({ title, balise = 'h1' }: TitreProps) {
    const TagName = balise as keyof JSX.IntrinsicElements;

    return <TagName className="Titre">{title}</TagName>;
}

export default Titre;
