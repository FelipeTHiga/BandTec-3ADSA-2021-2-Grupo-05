import '../styles/title.scss'

interface ITitleProps {
    title: string;
}

export function Title({ title }: ITitleProps) {
    return(
        <div className="title">
            <h1>{title}</h1>
        </div>
    );
}