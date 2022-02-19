//Usando as pages e substituindo as fixture por factories
//Usando os dados dinamicos
//Criação do cenário de campos obrigatórios
//import pages
import singupPage from '../pages/SingupPage'
//import factories
import singupFactory from '../factories/SingupFactory'

describe('Singup', () => {

    // beforeEach(function () {
    //     cy.fixture('deliver').then((d) => {
    //         this.deliver = d
    //     })
    // })

    it('User should be deliver', function () {
        //Chamando a factori que criamos aonde vai receber a massa de teste e aplicar no codigo
        var deliver = singupFactory.deliver()

        singupPage.go();
        singupPage.fillForm(deliver);
        singupPage.submit();

        const textMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        singupPage.modalContentShouldBe(textMessage);
    })

    it('Incorrect document', function () {
        var deliver = singupFactory.deliver()
        deliver.dados.cpf = 'x95332594Xa'

        singupPage.go();
        singupPage.fillForm(deliver);
        singupPage.submit();
        singupPage.alertMessageShouldBe('Oops! CPF inválido');
    })

    it('Incorrect email', function () {
        var deliver = singupFactory.deliver()
        deliver.dados.email = 'teste.com.br'

        singupPage.go();
        singupPage.fillForm(deliver);
        singupPage.submit();
        singupPage.alertMessageShouldBe('Oops! Email com formato inválido.');
    })

    //Com validação dinancia usando arreys/matrizes
    //dessa maneira irá validar todas as mensagens mesmo em caso de erro não parando a execução
    context('Required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]
        //Gancho parra execução
        before(function () {
            singupPage.go();
            singupPage.submit();
        })
        //msg.field para o nome do caso de teste ser dinanico 
        // messages.forEach(function(msg){
        //     it(`${msg.field} is required`, function(){
        //         singupPage.alertMessageShouldBe(msg.output)


        //Outra forma
        messages.map(function ({ field, output }) {
            it(`${field} is required`, function () {
                singupPage.alertMessageShouldBe(output)

            })
        })


    })


    //Sem validação dinamica
    // it('Required fields', function () {       
    //     singup.go();
    //     singup.submit();
    //     singup.alertMessageShouldBe('É necessário informar o nome');
    //     singup.alertMessageShouldBe('É necessário informar o CPF');
    //     singup.alertMessageShouldBe('É necessário informar o email');
    //     singup.alertMessageShouldBe('É necessário informar o CEP');
    //     singup.alertMessageShouldBe('É necessário informar o número do endereço');
    //     singup.alertMessageShouldBe('Selecione o método de entrega');
    //     singup.alertMessageShouldBe('Adicione uma foto da sua CNH');
    // })
})