class CaixaEletronico {

    constructor() {
        this.contaLogada = ContasBancarias.contas[0]
        this.view = new CaixaEletronicoViewController({ iniciarOperacao: this.iniciarOperacao, contaLogada: this.contaLogada });
    }

    iniciarOperacao = ({ operacao, view }) => {
        switch (operacao) {
            case "depositar":
                new TemplateDepositarViewController().init({ view, onSubmit: this.depositar })
                break;
            case "sacar":
                new TemplateSacarViewController().init({ view, onSubmit: this.sacar })
                break;
            case "transferir":
                new TemplateTransferirViewController().init({ contas: ContasBancarias.contas.filter(conta => conta.numeroConta != this.contaLogada.numeroConta), view, onSubmit: this.transferir })
                break;
        }
    }


    sacar = (data) => {
        OperacaoBancaria.sacar(this.contaLogada.numeroConta, data.valor);
        this.view.finalizar();
    }

    transferir = (data) => {
        OperacaoBancaria.transferir(this.contaLogada.numeroConta, data.conta, data.valor);
        this.view.finalizar();
    }

    depositar = (data) => {
        OperacaoBancaria.depositar(this.contaLogada.numeroConta, data.valor);
        this.view.finalizar();
    }
}

new CaixaEletronico();