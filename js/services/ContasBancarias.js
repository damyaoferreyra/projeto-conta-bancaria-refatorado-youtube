class ContasBancarias {

    static contas = [
        new Conta(new Pessoa("Damião Ferreira"), (Math.random() * 999).toFixed(6)),
        new Conta(new Pessoa("João Batista"), (Math.random() * 999).toFixed(6)),
        new Conta(new Pessoa("Dominic Ferreira"), (Math.random() * 999).toFixed(6))

    ]

    static obterConta(numeroConta) {
        return ContasBancarias.contas.find(c => c.numeroConta == numeroConta)
    }
}