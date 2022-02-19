//Com Page Objects
//Sem importação
//import SingupPage from '../pages/SingupPage'
//Com importação e chamada direta da classe
import singup from '../pages/SingupPage'

describe('Cadastro', () => {
    //Ganchos consegimos uma visibilidade melhor da nossa execução

    // before(function(){
    //     cy.log('Tudo aqui é executado uma única vez ANTES de todos os casos de testes')
    // })

    // beforeEach(function(){
    //     cy.log('Tudo aqui é executado sempre ANTES de CADA casos de testes')
    // })

    // after(function(){
    //     cy.log('Tudo aqui é executado uma única vez Depois de todos os casos de testes')
    // })

    // afterEach(function(){
    //     cy.log('Tudo aqui é executado sempre DEPOIS de CADA casos de testes')
    // })

    it('Usuário deve se tornar um entregador', () => {

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

        //var singup = new SingupPage()

        singup.go();
        singup.fillForm(deliver);
        singup.submit();
        //Validando se o cadastro foi realizado com sucesso
        const textMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        singup.modalContentShouldBe(textMessage);
    })

    it('CPF incorreto', () => {

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

        //var singup = new SingupPage()

        singup.go();
        singup.fillForm(deliver);
        singup.submit();
        singup.alertMessageShouldBe('Oops! CPF inválido');
    })
})