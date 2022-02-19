//Sem Page Objects

describe('Cadastro', () => {
    it('Usuário deve se tornar um entregador', () => {
        //Acessando a pagina através do arquivo json 
        cy.visit('/');
        //Botão cadastro 
        cy.get('a[href="/deliver"]').click()
        //CheckPoint para confirmar se estamos na tela
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

        //Massa de teste
        //Antes
        //var entregador = {
        //    nome: 'Teste Massa1',
        //    cpf: '00000015141',
        //    email: 'teste@gmail.com',
        //    zap: '81991655555'
        //}
        //var endereco = {
        //    cep: '50660420',
        //    numero: '123445',
        //    complemento: 'casa'
        //}

        //Depois separei em 2 objetos
        var deliver = {
            dados: {
                name: 'Teste Massa1',
                cpf: '00000015141',
                email: 'teste@gmail.com',
                zap: '81991655555'
            },
            address: {
                postalcode: '50660420',
                number: '123445',
                details: 'casa',
                street: 'Rua Luiz da Câmara Cascudo',
                district: 'Torrões',
                city_state: 'Recife/PE'
            },
            deliver_method: 'Moto',
            cnh: 'cnh-digital.jpg' 
        }


        //Preenchimento dos dados
        //Dados pessoais  
        cy.get('input[name= "fullName"]').type(deliver.dados.name)
        cy.get('input[name= "cpf"]').type(deliver.dados.cpf)
        cy.get('input[name= "email"]').type(deliver.dados.email)
        cy.get('input[name= "whatsapp"]').type(deliver.dados.zap)

        //Endereço
        cy.get('input[name= "postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name= "address-number"]').type(deliver.address.number)
        cy.get('input[name= "address-details"]').type(deliver.address.details)

        //Validando o endereço
        cy.get('input[name= "address"]').should('have.value', deliver.address.street)
        cy.get('input[name= "district"]').should('have.value', deliver.address.district)
        cy.get('input[name= "city-uf"]').should('have.value', deliver.address.city_state)

        //Selecionando a modalidade
        cy.contains('.delivery-method li', deliver.deliver_method).click()

        //Enviando arquivo 'Uploud' - attachFile é uma função do "cypress-file-upload"
        cy.get('input[accept^="image"]').attachFile(/imagens/ + deliver.cnh)
        cy.get('form button[type="submit"]').click()
        
        //Validando se o cadastro foi realizado com sucesso
        const textMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', textMessage)
        cy.get('.swal2-container .swal2-confirm').click()
            

    })

    it('CPF incorreto', () => {
        //Acessando a pagina através do arquivo json 
        cy.visit('/');
        //Botão cadastro 
        cy.get('a[href="/deliver"]').click()
        //CheckPoint para confirmar se estamos na tela
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

        //Massa de teste
        //Antes
        //var entregador = {
        //    nome: 'Teste Massa1',
        //    cpf: '00000015141',
        //    email: 'teste@gmail.com',
        //    zap: '81991655555'
        //}
        //var endereco = {
        //    cep: '50660420',
        //    numero: '123445',
        //    complemento: 'casa'
        //}

        //Depois separei em 2 objetos
        var deliver = {
            dados: {
                name: 'Teste Massa1',
                cpf: '000000151AA',
                email: 'teste@gmail.com',
                zap: '81991655555'
            },
            address: {
                postalcode: '50660420',
                number: '123445',
                details: 'casa',
                street: 'Rua Luiz da Câmara Cascudo',
                district: 'Torrões',
                city_state: 'Recife/PE'
            },
            deliver_method: 'Moto',
            cnh: 'cnh-digital.jpg' 
        }


        //Preenchimento dos dados
        //Dados pessoais  
        cy.get('input[name= "fullName"]').type(deliver.dados.name)
        cy.get('input[name= "cpf"]').type(deliver.dados.cpf)
        cy.get('input[name= "email"]').type(deliver.dados.email)
        cy.get('input[name= "whatsapp"]').type(deliver.dados.zap)

        //Endereço
        cy.get('input[name= "postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name= "address-number"]').type(deliver.address.number)
        cy.get('input[name= "address-details"]').type(deliver.address.details)

        //Validando o endereço
        cy.get('input[name= "address"]').should('have.value', deliver.address.street)
        cy.get('input[name= "district"]').should('have.value', deliver.address.district)
        cy.get('input[name= "city-uf"]').should('have.value', deliver.address.city_state)

        //Selecionando a modalidade
        cy.contains('.delivery-method li', deliver.deliver_method).click()
        cy.get('form button[type="submit"]').click()

        //Validando o erro no CPF
        cy.get('.alert-error').should('have.text', 'Oops! CPF inválido')
    })
})