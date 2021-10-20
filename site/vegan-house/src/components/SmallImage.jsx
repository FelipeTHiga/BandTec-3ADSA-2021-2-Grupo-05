import '../styles/small-image.scss';

export function SmallImage(props) {
    return(
        <img className="image" src={props.src} alt="" />
    );
}