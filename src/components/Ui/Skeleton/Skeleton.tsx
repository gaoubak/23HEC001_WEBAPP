import { SkeletonProps } from '../../../interface/components/Ui/skeleton.interface';

function Skeleton({
    type = 'text',
    color = '#eee',
    width = '100%',
    height = '20px',
    borderRadius = '4px',
}: SkeletonProps) {
    const style = {
        backgroundColor: color,
        width,
        height,
        borderRadius,
    };

    return <div className={`skeleton ${type}`} style={style}></div>;
}

export default Skeleton;
