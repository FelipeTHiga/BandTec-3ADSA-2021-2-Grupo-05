import '../styles/bigImage.scss';

export function BigImage(props) {
    return(
        <img className="big-image" src={props.src} alt="" />
    );
}