class Despesas{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano,
        this.mes = mes,
        this.dia = dia,
        this.tipo = tipo,
        this.descricao = descricao,
        this.valor = valor
    }

    //verificação se os campos estao preenchidos
    validarDados(){
        for(let i in this){
            //console.log(i, this[i])// é igual a this.ano, this.mes...
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}

class Bd{
   
    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)// vai setar o id inicial na posicao zero
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')//vai pegar o id
        return parseInt(proximoId) + 1
    }

    gravar(d){
        let id = this.getProximoId()//usou o this pq o metodo é da msm class

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
        
        //para ver isso funcionando, vai nas setinhas do lado de console
        //aplication
        //local Storage e clica no primeiro item que estiver em baixo
        //o primeiro parâmetro é a chave(key), e o segundo é o valor(value)
    }

    recuperarTodosRegistros(){
        let id = localStorage.getItem('id') //o valor é o ultimo numero que esta sendo usado. Ex: o último id é 4, entao essa variavel vai valer 4

        let despesas = []   
        //recuperar as despesas cadastradas

        for (let i = 1; i<=id; i++){

            let despesa = JSON.parse(localStorage.getItem(i))
            //transforma o resultado em obj literal


            //caso haja algum item que foi excluido, dessa forma, vai pular esse indice e nao vai mostrar, vai seguir o laço de repetição
            if(despesa === null){
                continue 
            }

            despesa.id = i
            despesas.push(despesa)//colocando as informações do laço no array
        }

        return despesas
    }

    //metodo para pesquisar os cadastros na consulta
    pesquisar(despesa){
        let despesasFiltradas = {}

        despesasFiltradas = this.recuperarTodosRegistros()
        //console.log(despesasFiltradas)
        //console.log(despesa)

        //ano
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(function(f) {return f.ano == despesa.ano})
        }

        //mes
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(function(f) {return f.mes == despesa.mes})
        }

        //dia
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(function(f) {return f.dia == despesa.dia})
        }

        //tipo
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(function(f) {return f.tipo == despesa.tipo})
        }

        //descricao
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(function(f) {return f.descricao == despesa.descricao})
        }

        //valor
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(function(f) {return f.valor == despesa.valor})
        }

        return despesasFiltradas
       
    }

    remover(id){
        localStorage.removeItem(id)
    }


}
let bd = new Bd()

function cadastrarDespesa(){

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    /*
    let coisas ={
        ano: ano.value,
        mes: mes.value,
        dia: dia.value,
        tipo: tipo.value,
        descricao: descricao.value,
        valor: valor.value,
        exibirResumo (){
            console.log(`${this.ano}, ${this.mes}, ${this.dia}, ${this.tipo}, ${this.descricao}, ${this.valor}`)
        }
    }

    console.log(coisas)
    coisas.exibirResumo()*/

 

    let despesa = new Despesas(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value )
    

    if(despesa.validarDados() == true){
        bd.gravar(despesa)
        $('#mensagemPadrao').modal('show')// aparece o modal na pag

        /*mudando o modal para sucesso*/
        let titulo = document.querySelector('.modal-title')
        titulo.style.color = 'green'
        titulo.innerHTML = "mensagem de sucesso"

        let texto = document.querySelector('.modal-body').innerHTML = "Despesa cadastrada"

        let btn = document.getElementById('botao-modal')
        btn.innerHTML = 'Voltar'
        btn.style.backgroundColor = 'green'

        /*deixando as caixas em branco*/
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''


        //ou
        //document.getElementById('botao-modal').className = 'btn btn-sucess'

    }else{
        $('#mensagemPadrao').modal('show')// aparece o modal na pag

        /*mudando o modal para erro*/
        let titulo = document.querySelector('.modal-title')
        titulo.style.color = 'red'
        titulo.innerHTML = "mensagem de erro"

        let texto = document.querySelector('.modal-body').innerHTML = "Existem campos obrigatorios"

        let btn = document.getElementById('botao-modal')
        btn.innerHTML = 'Voltar e corrigir'
        //btn.style.backgroundColor = 'red'

    }

}

function carregaListaDespesas(despesas = Array(), filtro = false){

    if(despesas.length == 0 && filtro == 0){
        despesas = bd.recuperarTodosRegistros()
    }
    
    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML =''


    //percorrer o array despesas, listando cada despes de forma dinâmica
    despesas.forEach(function(d){
        //console.log(d)

        //criando a linha (tr)
        let linha = listaDespesas.insertRow()

        //criando as columas (td), esse medtodo recebe o numero de colunas
        linha.insertCell(0).innerHTML = d.dia + '/' + d.mes + '/' + d.ano
        
        switch (parseInt(d.tipo)){

            case 1:
                linha.insertCell(1).innerHTML = "alimentação";
            break;

            case 2:
                linha.insertCell(1).innerHTML = "Educação";
            break;

            case 3:
                linha.insertCell(1).innerHTML = "Lazer";
            break;

            case 4:
                linha.insertCell(1).innerHTML = "Saúde";
            break;

            case 5: 
            linha.insertCell(1).innerHTML = "Transporte";
            break;


        }
      
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        //criando elemento de exclusão de elementos
        let btn = document.createElement("button")
        btn.className="btn btn-danger"
        btn.innerHTML='<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            //remover despesa

            //o 'id_despesas' vai ser substituido por vazio
            let id = this.id.replace('id_despesa_', '')
            
            //bd.remover(id)//removendo o item com o id

            $('#mensagemPadrao').modal('show')// aparece o modal na pag

            /*mudando o modal para sucesso*/
            let titulo = document.querySelector('.modal-title')
            titulo.style.color = 'yellow'
            titulo.innerHTML = "mensagem de exclusão"
    
            let texto = document.querySelector('.modal-body').innerHTML = `Você realmente deseja eliminar a despesa "${d.descricao}"? `
    
            let botaoModal = document.getElementById('botao-modal')
            botaoModal.innerHTML = 'Sim'
            botaoModal.style.backgroundColor = 'yellow'

            botaoModal.onclick = function(){
                $('#mensagemPadrao').modal('hide')//fechando o modal
                bd.remover(id)//removendo o item com o id
                window.location.reload()//recarregar a pagina
            }

        }
        linha.insertCell(4).append(btn)//colocando o botao em todas as linhas


    })
}

function pesquisarDespesa(){
     let ano = document.getElementById('ano').value
     let mes= document.getElementById('mes').value
     let dia = document.getElementById('dia').value
     let tipo = document.getElementById('tipo').value
     let descricao =document.getElementById('descricao').value
     let valor = document.getElementById('valor').value

    let despesa = new Despesas(ano, mes, dia, tipo, descricao, valor)


    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')

    //limpando o tbody para mostrar somente o valor procurado
    listaDespesas.innerHTML = ''

    let despesas = bd.pesquisar(despesa)

   carregaListaDespesas(despesas, true)

   
}

