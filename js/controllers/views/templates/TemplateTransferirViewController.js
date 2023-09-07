class TemplateTransferirViewController {

    carregarDadosIniciasTemplate = (dados) => {

        switch (dados.operacao) {
            case "transferir":
                this.carregarContasTransferencia(dados)
                break;
        }
    }

    carregarContasTransferencia = (dados) => {
        dados.contas.forEach(conta => {
            const selectContaInput = dados.template.querySelector("#conta_select");

            const option = document.createElement("option");
            option.value = conta.numeroConta;
            option.text = `Conta: ${conta.numeroConta} / Nome: ${conta.pessoa.nome}`
            selectContaInput.appendChild(option)
        })
    }

    atualizar = () => {
        this.carregarDadosHeader(this.contaLogada)
    }
}