class TemplateDepositarViewController {

    init = (dados) => {

        this.carregarEventosForm(dados);
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