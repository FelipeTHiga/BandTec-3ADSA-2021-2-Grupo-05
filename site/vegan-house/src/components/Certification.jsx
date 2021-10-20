import '../styles/certification.scss';

export function Certification(props) {
    return (
        <div className="certification">
            <img src={props.src} alt="" />
            <h3>{props.name}</h3>
        </div>
    );
}