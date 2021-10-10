import '../styles/title.scss'


export function Title(props) {
    return(
        <div className="title">
            <h1>{props.title}</h1>
        </div>
    );
}