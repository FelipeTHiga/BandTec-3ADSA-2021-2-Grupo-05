import { Title } from '../components/Title';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import '../styles/paymentResponse.scss';
import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function PaymentResponse(props) {

    let { id, status, desc } = useParams();
    const [stat, setStat] = useState("");
    const [description, setDesc] = useState("");

    useEffect(() => {
        filterStat()
        filterDesc()
    })

    function filterStat() {
        switch (status) {
            case "approved":
                return setStat("Pagamento aprovado");

            case "in_process":
                return setStat("Pagamento em processamento");

            case "rejected":
                return setStat("Pagamento rejeitado")
            default:
                return setStat("Erro no processamento")
        }
    }

    function filterDesc() {
        switch (desc) {
            case "accredited":
                return setDesc("Seu pagamento foi efetuado com sucesso!");

            case "pending_contingency":
                return setDesc("Não se preocupe, em menos de 2 dias úteis informaremos por e-mail se foi creditado.");

            case "pending_review_manual":
                return setDesc("Não se preocupe, em menos de 2 dias úteis informaremos por e-mail se foi creditado ou se necessitamos de mais informação.");

            case "cc_rejected_bad_filled_card_number":
                return setDesc("Revise o número do cartão.");

            case "cc_rejected_bad_filled_date":
                return setDesc("Revise a data de vencimento.");

            case "cc_rejected_bad_filled_other":
                return setDesc("Revise os dados.");

            case "cc_rejected_bad_filled_security_code":
                return setDesc("Revise o código de segurança do cartão.");

            case "cc_rejected_blacklist":
                return setDesc("Não pudemos processar seu pagamento.");

            case "cc_rejected_call_for_authorize":
                return setDesc("Você deve autorizar o pagamento do valor ao Mercado Pago.");

            case "cc_rejected_card_disabled":
                return setDesc("Cartão desabilitado.");

            case "cc_rejected_card_error":
                return setDesc("Não conseguimos processar seu pagamento.");

            case "cc_rejected_duplicated_payment":
                return setDesc("Você já efetuou um pagamento com esse valor. Caso precise pagar novamente, utilize outro cartão ou outra forma de pagamento.");

            case "cc_rejected_high_risk":
                return setDesc("Seu pagamento foi recusado. ");

            case "cc_rejected_insufficient_amount":
                return setDesc("Cartão possui saldo insuficiente");

            case "cc_rejected_invalid_installments":
                return setDesc("O cartão não processa pagamentos em parcelas");

            case "cc_rejected_max_attempts":
                return setDesc("Você atingiu o limite de tentativas permitido.");

            case "cc_rejected_other_reason":
                return setDesc("Cartão não processa o pagamento.");

            case "cc_rejected_card_type_not_allowed":
                return setDesc("O pagamento foi rejeitado porque o usuário não tem a função crédito habilitada em seu cartão multiplo (débito e crédito).");

        }
    }


    return (
        <>
            <Navbar />

            <div className="container-payment-response">
                <Title title="Compra finalizada!" />



                <div className="container-payment-result">
                    <h1>
                        Informações do pagamento:
                    </h1>

                    <div className="margin-bottom">
                        <h3>
                            <b>Status: </b>
                            {stat}
                        </h3>

                        <h3>
                            <b>Descrição: </b>
                            {description}
                        </h3>
                    </div>

                    <Link to="/perfil/meus-pedidos">
                        <Button text="Finalizar" />
                    </Link>
                </div>

            </div>

            <Footer />
        </>
    )
}