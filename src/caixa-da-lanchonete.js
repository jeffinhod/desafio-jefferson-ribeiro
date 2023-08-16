class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: { descricao: 'Café', valor: 3.0 },
      chantily: { descricao: 'Chantily (extra do Café)', valor: 1.5 },
      suco: { descricao: 'Suco Natural', valor: 6.2 },
      sanduiche: { descricao: 'Sanduíche', valor: 6.5 },
      queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.0 },
      salgado: { descricao: 'Salgado', valor: 7.25 },
      combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.5 },
      combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.5 }
    }
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    const formasDePagamentoValidas = ['debito', 'credito', 'dinheiro']
    if (!formasDePagamentoValidas.includes(formaDePagamento.toLowerCase())) {
      return 'Forma de pagamento inválida!'
    }

    let total = 0
    let listaPedido = []

    let percorrerLista = function (listaPedido, item) {
      return listaPedido.includes(item)
    }

    for (const itemInfo of itens) {
      const [item, quantidade] = itemInfo.split(',')
      listaPedido.push(item)

      if (parseInt(quantidade) === 0) {
        return 'Quantidade inválida!'
      }

      if (
        formaDePagamento === 'dinheiro' &&
        percorrerLista(listaPedido, 'chantily') &&
        !percorrerLista(listaPedido, 'cafe')
      ) {
        return 'Item extra não pode ser pedido sem o principal'
      }

      if (
        formaDePagamento === 'credito' &&
        percorrerLista(listaPedido, 'chantily') &&
        !percorrerLista(listaPedido, 'cafe')
      ) {
        return 'Item extra não pode ser pedido sem o principal'
      }

      if (
        formaDePagamento === 'credito' &&
        percorrerLista(listaPedido, 'queijo') &&
        !percorrerLista(listaPedido, 'sanduiche')
      ) {
        return 'Item extra não pode ser pedido sem o principal'
      }

      if (
        formaDePagamento === 'debito' &&
        percorrerLista(listaPedido, 'queijo') &&
        !percorrerLista(listaPedido, 'sanduiche')
      ) {
        return 'Item extra não pode ser pedido sem o principal'
      }

      if (item in this.cardapio) {
        const itemValor = this.cardapio[item].valor * parseInt(quantidade)
        total += itemValor
      } else {
        return 'Item inválido!'
      }
    }

    if (total === 0) {
      return 'Não há itens no carrinho de compra!'
    }

    if (formaDePagamento === 'dinheiro') {
      total *= 0.95
    } else if (formaDePagamento === 'credito') {
      total *= 1.03
    }

    return `R$ ${total.toFixed(2).replace('.', ',')}`
  }
}

export { CaixaDaLanchonete }
