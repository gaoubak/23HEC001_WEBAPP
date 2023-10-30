import './Titre.css';

interface TitreProps {
    title: string;
    balise: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Titre = ({ title, balise = 'h1' }: TitreProps) => {
    const TagName = balise as keyof JSX.IntrinsicElements;

    return <TagName className="Titre">{title}</TagName>;
};

export default Titre;
