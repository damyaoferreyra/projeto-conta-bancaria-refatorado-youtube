class CaixaEletronico {

    constructor() {
        this.contaLogada = ContasBancarias.contas[0]
        this.view = new CaixaEletronicoViewController({ iniciarOperacao: this.iniciarOperacao, contaLogada: this.contaLogada, onSubmit: this.finalizarOperacao });
    }

    iniciarOperacao = ({ operacao, template }) => {
        switch (operacao) {
            case "transferir":
                new TemplateTransferirViewController().carregarDadosIniciasTemplate({ contas: ContasBancarias.contas.filter(conta => conta.numeroConta != this.contaLogada.numeroConta), template, operacao })
                break;
        }
    }

    finalizarOperacao = (data) => {
        switch (data.operacao) {
            case "sacar":
                this.sacar(data)
                break;
            case "transferir":
                this.transferir(data)
                break;
            case "depositar":
                this.depositar(data)
                break;
        }

        this.view.atualizar()

    }

    sacar = (data) => {
        OperacaoBancaria.sacar(this.contaLogada.numeroConta, data.valor)
    }

    transferir = (data) => {
        OperacaoBancaria.transferir(this.contaLogada.numeroConta, data.conta, data.valor)
    }

    depositar = (data) => {
        OperacaoBancaria.depositar(this.contaLogada.numeroConta, data.valor)
    }
}

new CaixaEletronico();