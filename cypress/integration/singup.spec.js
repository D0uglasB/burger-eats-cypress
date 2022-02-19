//Usando o page objetcs e fixtures

import singup from '../pages/SingupPage'

describe('Singup', () => {

    beforeEach(function () {
        cy.fixture('deliver').then((d) => {
            this.deliver = d
        })
    })

    it('Usuário deve se tornar um entregador', function () {
        singup.go();
        singup.fillForm(this.deliver.singup);
        singup.submit();

        const textMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        singup.modalContentShouldBe(textMessage);
    })

    it('CPF incorreto', function () {
        singup.go();
        singup.fillForm(this.deliver.cpf_inv);
        singup.submit();
        singup.alertMessageShouldBe('Oops! CPF inválido');
    })
})