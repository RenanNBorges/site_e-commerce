// criar a variável modalKey sera global
let modalKey = 0

// variavel para controlar a quantidade inicial de pizzas na modal
let quantProdutos = 1


const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    document.querySelector('.produtoWindowArea').style.opacity = 0 // transparente
    document.querySelector('.produtoWindowArea').style.display = 'flex'
    setTimeout(() => document.querySelector('.produtoWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    document.querySelector('.produtoWindowArea').style.opacity = 0 // transparente
    setTimeout(() => document.querySelector('.produtoWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    document.querySelectorAll('.produtoInfo--cancelButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosProdutos = (produtoItem, item, index) => {
    // setar um atributo para identificar qual elemento foi clicado
	produtoItem.setAttribute('data-key', index)
    produtoItem.querySelector('.produto-item--img img').src = item.img
    produtoItem.querySelector('.produto-item--price').innerHTML = formatoReal(item.price[0])
    produtoItem.querySelector('.produto-item--name').innerHTML = item.name
    
}

const preencheDadosModal = (item) => {
    document.querySelector('.produtoBig img').src = item.img
    document.querySelector('.produtoInfo h1').innerHTML = item.name
    document.querySelector('.produtoInfo--desc').innerHTML = item.description
    document.querySelector('.produtoInfo--actualPrice').innerHTML = formatoReal(item.price[0])
}


const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .pizza-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.produto-item').getAttribute('data-key')
    console.log(produtosJson[key])

    // garantir que a quantidade inicial de pizzas é 1
    quantProdutos = 1

    // Para manter a informação de qual pizza foi clicada
    modalKey = key

    return key
}

const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    document.querySelector('.produtoInfo--qtmais').addEventListener('click', () => {
        quantProdutos++
        document.querySelector('.produtoInfo--qt').innerHTML = quantProdutos
    })

    document.querySelector('.produtoInfo--qtmenos').addEventListener('click', () => {
        if(quantProdutos > 1) {
            quantProdutos--
            document.querySelector('.produtoInfo--qt').innerHTML = quantProdutos	
        }
    })
}

produtosJson.map((item, index ) => {
    //console.log(item)
    let produtoItem = document.querySelector('.models .produto-item').cloneNode(true)
    //console.log(pizzaItem)
    //document.querySelector('.pizza-area').append(pizzaItem)
    document.querySelector('.produto-area').append(produtoItem)

    // preencher os dados de cada pizza
    preencheDadosProdutos(produtoItem, item, index)
    
    // pizza clicada
    produtoItem.querySelector('.produto-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na pizza')

        let chave = pegarKey(e)

        // abrir janela modal
        abrirModal()

        // preenchimento dos dados
        preencheDadosModal(item)

        // pegar tamanho selecionado
        preencherTamanhos(chave)

		// definir quantidade inicial como 1
		document.querySelector('.produtoInfo--qt').innerHTML = quantProdutos

        // selecionar o tamanho e preco com o clique no botao
        escolherTamanhoPreco(chave)

    })

    botoesFechar()

}) // fim do MAPEAR pizzaJson para gerar lista de pizzas


// mudar quantidade com os botoes + e -
mudarQuantidade()

