const prompt = require('prompt-sync')();

//esta é uma array, que tem como função receber os objetos que foram criados
let remedios = [
    {
        "id": 1,
        "nome": "tylenol",
        "preco": Number("15.99"),
        "categoria": "Antitérmico",
        "controlado": true
    },
    {
        "id": 2,
        "nome": "paracetamol",
        "preco": Number("15.99"),
        "categoria": "Antitérmico",
        "controlado": false
    },

]

//aqui temos um prompt pra receber o nome do cliente, e um for para mostrar a lista dos medicamentos disponíveis
let nomeCliente = prompt(`Olá, qual seu nome? `)
console.log(`Olá ${nomeCliente}, estes são os remédios disponíveis: `)
for (let index = 0; index < remedios.length; index++) {
    const element = remedios[index];
    console.log(element.id + " - " + element.nome)
}

//aqui criamos um array vazio, e definimos inicialmente a condição como falsa
let carrinho = []
let condition = false;

//neste do-while o cliente irá inserir o código dos remédios que ele quer, e enquanto a condiçao for verdadeira, o processo se repete para ele comprar quantos quiser
do {
    let codigoRemedio = Number(prompt(`Digite o código do remédio que você deseja: `))
    if (codigoRemedio > remedios.length) {
        console.log(`Este código não existe`)
    } else {
        carrinho.push(codigoRemedio)
    }
    let continuar = prompt(`Deseja adicionar outro remédio? sim ou nao? `)
    if (continuar == `sim`) {
        condition = true;
    } else {
        condition = false;
    }
} while (condition);

//função para inserir os códigos de compra dentro do carrinho 
function obterRemedios(listaCodigos) {
    let resultado = []
    for (let index = 0; index < remedios.length; index++) {
        const element = remedios[index];
        for (let indexC = 0; indexC < listaCodigos.length; indexC++) {
            const codRemedio = listaCodigos[indexC];
            if (element.id == codRemedio) {
                resultado.push(element)
            }
        }
    }
    return resultado;
}
let listaRemedios = obterRemedios(carrinho);


//array vazia para criar a lista de remédios selecionada pelo cliente 
let listaRemediosAtual = []

//este for foi criado para verificar se o cliente tem receita para o remédio desejado, ou não
for (let indexC = 0; indexC < listaRemedios.length; indexC++) {
    const remedio = listaRemedios[indexC];
    if (remedio.controlado == true) {
        let temReceita = prompt(`Você tem receita para ${remedio.nome}? sim ou nao? `)
        if (temReceita == "sim") {
            listaRemediosAtual.push(remedio);
        }
    } else {
        console.log(`${remedio.nome} não precisa de receita`)
        listaRemediosAtual.push(remedio);
    }

}

//esta função exibe os remédios que o cliente selecionou para o carrinho
function exibirRemedios(lista, acao) {
    console.log(`Aqui estão os remédios que você ${acao}: `)
    for (let index = 0; index < lista.length; index++) {
        const element = lista[index];
        console.log(element.nome)

    }

}
exibirRemedios(listaRemediosAtual, "selecionou");

//esta parte do código confirma a compra do cliente ou não
let confirmaCompra = prompt(`${nomeCliente}, você deseja concluir sua compra? sim ou nao? `)
if (confirmaCompra == `sim`) {
    console.log(`Obrigado pela compra! `)
    exibirRemedios(listaRemediosAtual, "comprou");
} else {
    console.log(`Compra cancelada com sucesso!`)
}