//Usando as pages e substituindo as fixture por factories
//Usando os dados dinamicos
//import pages
import singup from '../pages/SingupPage'
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

        singup.go();
        singup.fillForm(deliver);
        singup.submit();

        const textMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        singup.modalContentShouldBe(textMessage);
    })

    it('Incorrect document', function () {
        var deliver = singupFactory.deliver()
        deliver.dados.cpf = 'x95332594Xa'

        singup.go();
        singup.fillForm(deliver);
        singup.submit();
        singup.alertMessageShouldBe('Oops! CPF inválido');
    })

    it('Incorrect email', function () {
        var deliver = singupFactory.deliver()
        deliver.dados.email = 'teste.com.br'

        singup.go();
        singup.fillForm(deliver);
        singup.submit();
        singup.alertMessageShouldBe('Oops! Email com formato inválido.');
    })
})