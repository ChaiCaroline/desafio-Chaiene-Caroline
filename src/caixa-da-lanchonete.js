import { cardapio } from "./cardapio";

class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        this.metodoDePagamento = metodoDePagamento;
        this.itens = itens;

        const formaDePagamento = new verificadorDePagamento().pagamentoValor(metodoDePagamento)
        if (!formaDePagamento) {
            return ("Forma de pagamento inválida!")
        }

        const verificarPedidoCardapio = new produtoDosPedidos().pedidos(itens)
        if (!verificarPedidoCardapio) {
            return ("Não há itens no carrinho de compra!")
        }

        if (verificarPedidoCardapio === 1) {
            return ("Item inválido!")
        }
        if (verificarPedidoCardapio === 2) {
            return ("Quantidade inválida!")
        }
        if (verificarPedidoCardapio === 3) {
            return ("Item extra não pode ser pedido sem o principal")
        }

        let valorTotalCompra = 0;
        for (const item of verificarPedidoCardapio) {
            if (cardapio[item[0]]) {
                valorTotalCompra += (cardapio[item[0]] * parseFloat(item[1]))
            }
        }
        if (formaDePagamento != 1) {
            valorTotalCompra += valorTotalCompra * formaDePagamento
        }

        return "R$ " + valorTotalCompra.toFixed(2).replace('.', ',')
        /* return "R$ " + Number(valorTotalCompra.toFixed(2)).toLocaleString('pt-BR', {
            minimumFractionDigits: 2
        }) */
    }
}

class produtoDosPedidos {
    pedidos(itens) {
        if (!itens.length) {
            return false
        }

        let pedidoEQuantidades = []

        itens.forEach(element => {
            pedidoEQuantidades.push(element.split(','))
        });

        for (const pedido of pedidoEQuantidades) {
            if (!cardapio[pedido[0]]) {
                return 1
            }

            if (pedido[1] == 0) {
                return 2
            }
        }

        const chantily = (pedidoEQuantidades.some(item => item.includes('chantily')))
        const cafe = (pedidoEQuantidades.some(item => item.includes('cafe')))
        const queijo = (pedidoEQuantidades.some(item => item.includes('queijo')))
        const sanduiche = (pedidoEQuantidades.some(item => item.includes('sanduiche')))

        if (chantily && !cafe || queijo && !sanduiche) {
            return 3
        }

        return pedidoEQuantidades
    }
}

class verificadorDePagamento {
    pagamentoValor(metodoDePagamento) {
        if (metodoDePagamento.includes('dinheiro')) {
            return -0.05
        } else if (metodoDePagamento.includes('credito')) {
            return 0.03
        } else if (metodoDePagamento.includes('debito')) {
            return 1
        } else {
            return false
        }
    }
}

export { CaixaDaLanchonete };