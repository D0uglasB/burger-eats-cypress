//Criando as classe para o page objects

class SingupPage {

    go() {
        cy.visit('/');
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliver) {
        cy.get('input[name= "fullName"]').type(deliver.dados.name)
        cy.get('input[name= "cpf"]').type(deliver.dados.cpf)
        cy.get('input[name= "email"]').type(deliver.dados.email)
        cy.get('input[name= "whatsapp"]').type(deliver.dados.zap)

        cy.get('input[name= "postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name= "address-number"]').type(deliver.address.number)
        cy.get('input[name= "address-details"]').type(deliver.address.details)

        cy.get('input[name= "address"]').should('have.value', deliver.address.street)
        cy.get('input[name= "district"]').should('have.value', deliver.address.district)
        cy.get('input[name= "city-uf"]').should('have.value', deliver.address.city_state)

        cy.contains('.delivery-method li', deliver.deliver_method).click()
        cy.get('input[accept^="image"]').attachFile(/imagens/ + deliver.cnh)
    }

    submit() {
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(textMessage) {
        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', textMessage)
        cy.get('.swal2-container .swal2-confirm').click()
    }

    alertMessageShouldBe(textMessage) {
        //Essa forma só funciona para 1 mensagem
        //cy.get('.alert-error').should('have.text', textMessage)

        //Para várias mensagens vamos usar a combinação de 2 classes
        cy.contains('.alert-error', textMessage).should('be.visible')

    }

}

export default new SingupPage;
