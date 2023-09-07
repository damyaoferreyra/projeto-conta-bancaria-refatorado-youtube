class OperacaoBancaria {

    static transferir = (numeroContaOrigem, numeroContaDestino, valor) => {
        const contaOrigem = ContasBancarias.obterConta(numeroContaOrigem)
        const contaDestino = ContasBancarias.obterConta(numeroContaDestino)

        const valorNumero = parseFloat(valor);
        contaOrigem.saldo -= valorNumero;
        contaDestino.saldo += valorNumero;
    }

    static depositar = (numeroContaDestino, valor) => {
        const contaDestino = ContasBancarias.obterConta(numeroContaDestino)
        contaDestino.saldo += parseFloat(valor);
    }

    static sacar = (numeroContaOrigem, valor) => {
        const contaOrigem = ContasBancarias.obterConta(numeroContaOrigem)
        contaOrigem.saldo -= parseFloat(valor);;
    }

    static saldo = (numeroConta) => {
        const conta = ContasBancarias.obterConta(numeroConta)
        return conta.saldo
    }
}