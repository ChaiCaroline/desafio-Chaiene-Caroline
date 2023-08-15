class CaixaDaLanchonete {
    cardapio = {
        'cafe': 3.00,
        'chantily': 1.50,
        'suco': 6.20,
        'sanduiche': 6.50,
        'queijo': 2.00,
        'salgado': 7.25,
        'combo1': 9.50,
        'combo2': 7.50
    };

    pagamento(metodo){
        let pagamento = 0
        if (metodo.includes('dinheiro')){
            return pagamento = -0.05
        }else if (metodo.includes('credito')) {
            return pagamento = 0.03
        }else if (metodo.includes('debito')){
            return pagamento = 1
        }else {
            return false
        }
    }
    pedido(itens){
        let pedidoEQuantidades = [];
        for (let index = 0; index < itens.length; index++) {
            if(itens[index].includes('chantily')){
                let temItemPrincipal = 0
                for (let indext = 0; indext < itens.length; indext++) {
                    if (itens[indext].includes('cafe')){
                        temItemPrincipal ++
                    }
                }
                if(temItemPrincipal === 0){
                    return 3
                }
            }
        }
        for (let index = 0; index < itens.length; index++) {
            if(itens[index].includes('queijo')){
                let temItemPrincipal = 0
                for (let indext = 0; indext < itens.length; indext++) {
                    if (itens[indext].includes('sanduiche')){
                        temItemPrincipal ++
                    }
                }
                if(temItemPrincipal === 0){
                    return 3
                }
            }
        }
        itens.forEach(element => {
            pedidoEQuantidades.push(element.split(','))
        });
        for (const pedido of pedidoEQuantidades) {
            if(!this.cardapio[pedido[0]]){
                return 1
            }
            
            if(pedido[1] == 0){
                return 2
            } 
        return pedidoEQuantidades
    }
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        this.metodoDePagamento = metodoDePagamento;
        this.itens = itens;
        if(!this.pagamento(metodoDePagamento)){
            return ("Forma de pagamento inválida!")
        }
        if(!itens.length){
            return ("Não há itens no carrinho de compra!")
        }
        const pedidos = this.pedido(itens)
        if(pedidos === 1){
            return ("Item inválido!")
        }
        if(pedidos === 2){
            return ("Quantidade inválida!")
        }
        if(pedidos === 3){
            return ("Item extra não pode ser pedido sem o principal")
        }
        let valorTotalCompra = 0;
        if(itens.length > 0){
            for (const item of pedidos) {
                if(this.cardapio[item[0]]){
                    valorTotalCompra += (this.cardapio[item[0]] * parseFloat(item[1])) 
                }
            }
            if(this.pagamento(metodoDePagamento) != 1){
                valorTotalCompra += valorTotalCompra * this.pagamento(metodoDePagamento)
            }
            }
        return "R$ " + valorTotalCompra.toFixed(2).replace('.', ',')
    }
    }
export { CaixaDaLanchonete };