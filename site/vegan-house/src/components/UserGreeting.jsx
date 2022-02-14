import "../styles/UserGreeting.scss";
import '../styles/reset.scss';

export function UserGreeting(props) {
    return (
        <>
            <div className="container-name-user line-up">
                <div className="line-up">
                    <div className="name-user">{props.username}</div>
                    <p>
                        Sua conta pessoal{props.isSeller?(" e comercial."):(".")}
                    </p>
                </div>
            </div>
        </>
    );
}
