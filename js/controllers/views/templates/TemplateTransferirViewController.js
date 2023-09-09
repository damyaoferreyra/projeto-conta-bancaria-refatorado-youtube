class TemplateTransferirViewController {

    init = (dados) => {

        this.carregarContasTransferencia(dados)
        this.carregarEventosForm(dados);
    }

    carregarContasTransferencia = (dados) => {
        dados.contas.forEach(conta => {
            const selectContaInput = dados.view.querySelector("#conta_select");

            const option = document.createElement("option");
            option.value = conta.numeroConta;
            option.text = `Conta: ${conta.numeroConta} / Nome: ${conta.pessoa.nome}`
            selectContaInput.appendChild(option)
        })
    }

    carregarEventosForm = (dados) => {
        dados.view.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            dados.onSubmit(data)

            // limpar formulário
            e.target.reset();
        })
        dados.view.querySelector("form > input").focus()
    }
}