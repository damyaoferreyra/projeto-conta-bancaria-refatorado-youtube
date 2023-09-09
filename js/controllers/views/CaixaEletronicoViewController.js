class CaixaEletronicoViewController {
    constructor({ iniciarOperacao, contaLogada }) {
        this.headerTags = {
            nomePessoa: document.querySelector(".section_header #pessoa_nome"),
            conta: document.querySelector(".section_header #conta_logada"),
            saldo: document.querySelector(".section_header #saldo_conta"),
        }
        this.operacaoActionTags = document.querySelectorAll("#operacao_action li[data-template]");
        this.mainTemplateArea = document.getElementById("main_template_area");

        this.contaLogada = contaLogada;
        this.init(iniciarOperacao ? iniciarOperacao : console.log);
        this.operacaoAtual = null
    }

    init = function(iniciarOperacao) {

        this.carregarEventosOperacoes(iniciarOperacao);
        this.carregarDadosHeader(this.contaLogada);
    }

    carregarDadosHeader = (contaLogada) => {

        this.headerTags.nomePessoa.innerText = contaLogada.pessoa.nome;
        this.headerTags.conta.innerText = ` |  Conta ${contaLogada.numeroConta}`;
        this.headerTags.saldo.innerText = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(contaLogada.saldo);
    }

    limparOperacao = () => {
        this.operacaoActionTags.forEach(li => {
            li.style = 'opacity: 1'
        });
        this.mainTemplateArea.innerHTML = '';

    }

    carregarEventosOperacoes = (iniciarOperacao) => {


        this.operacaoActionTags.forEach(li => {
            li.addEventListener("click", (e) => {

                this.limparOperacao()

                const currentTarget = e.currentTarget
                currentTarget.style = 'opacity: 0.5'

                const templateId = currentTarget.getAttribute('data-template');
                const template = this.carregarTemplate(templateId);
                // Anexa o conteúdo clonado ao body, ou a qualquer outro elemento desejado
                this.mainTemplateArea.appendChild(template);

                this.operacaoAtual = currentTarget.attributes['data-operacao'].value;
                iniciarOperacao({ operacao: this.operacaoAtual, view: this.mainTemplateArea });
            })
        })
    }

    carregarTemplate = (elementId) => {
        const template = document.getElementById(elementId);
        // Cria uma cópia do conteúdo do template
        return document.importNode(template.content, true);
    }

    atualizar = () => {
        this.carregarDadosHeader(this.contaLogada);
    }

    finalizar = () => {
        const operacaoFinalizada = this.operacaoAtual

        this.atualizar();
        this.limparOperacao();
        this.mainTemplateArea.appendChild(this.carregarTemplate('template_sucesso'));

        setTimeout(() => {
            if (operacaoFinalizada === this.operacaoAtual) this.limparOperacao()
        }, 2000)
    }
}