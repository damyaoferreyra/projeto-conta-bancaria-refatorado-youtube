class CaixaEletronicoViewController {
    constructor({ iniciarOperacao, contaLogada, onSubmit }) {
        this.contaLogada = contaLogada;
        this.init(iniciarOperacao ? iniciarOperacao : console.log, onSubmit);
    }

    init = function(iniciarOperacao, onSubmit) {

        this.carregarEventos(iniciarOperacao, onSubmit);
        this.carregarDadosHeader(this.contaLogada);
    }

    carregarDadosHeader = (contaLogada) => {
        const headerArea = document.querySelector(".section_header ");

        const nomePessoaArea = headerArea.querySelector("#pessoa_nome");
        nomePessoaArea.innerText = contaLogada.pessoa.nome;

        const dadosConta = headerArea.querySelector("#conta_logada");
        dadosConta.innerText = ` |  Conta ${contaLogada.numeroConta}`;

        const saldoArea = headerArea.querySelector("#saldo_conta");
        saldoArea.innerText = contaLogada.saldo;
    }

    carregarEventos = (iniciarOperacao, onSubmit) => {
        document.querySelectorAll("#operacao_action li[data-template]").forEach(li => {
            li.addEventListener("click", (e) => {
                const templateId = e.target.getAttribute('data-template');
                const template = document.getElementById(templateId);

                // Cria uma cópia do conteúdo do template
                const clone = document.importNode(template.content, true);

                // Anexa o conteúdo clonado ao body, ou a qualquer outro elemento desejado
                const operacaoContentForm = document.getElementById("operacao_form_content");
                operacaoContentForm.innerHTML = ''
                operacaoContentForm.appendChild(clone);

                const operacao = operacaoContentForm.querySelector("form #operacao").value;
                iniciarOperacao({ operacao, template: operacaoContentForm });

                operacaoContentForm.querySelector("form").addEventListener("submit", (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData);
                    onSubmit(data)

                    // limpar formulário
                    e.target.reset();
                })
            })
        })
    }

    atualizar = () => {
        this.carregarDadosHeader(this.contaLogada)
    }
}