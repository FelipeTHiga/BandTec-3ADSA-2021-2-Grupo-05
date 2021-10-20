import '../styles/socialMidia.scss';

export function SocialMidia(props) {
    return(
    <div className="socialMidia">
        <img src={props.src} alt="" />
        <h4>{props.data}</h4>
    </div>
    );
}