import "../styles/UserGreeting.css";
import '../styles/reset.css';

export function UserGreeting(props) {
    return (
        <>
            <div class="container-name-user line-up">
                <div class="line-up">
                    <div class="name-user">{props.username}</div>
                    <p>
                        Sua conta pessoal{props.isSeller?(" e comercial."):(".")}
                    </p>
                </div>
            </div>
        </>
    );
}
