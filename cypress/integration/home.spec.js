

describe('Home', () =>{
    it('App deve estar online', () =>{
        //Tamanho da tela
        //Coloquei as informações no Cypress Json
        cy.visit('/');
        //cy.viewport(1440, 900)
        //Acessando a tela
        //cy.visit('https://buger-eats.vercel.app')
        //Validando o texto
        //Should serve para validar. No caso estamos valindo a propiedade have.text
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')
    })
})