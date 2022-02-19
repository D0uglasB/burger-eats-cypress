//Importando bibliotecas
var fake = require('faker')
var cpf = require('gerador-validador-cpf')

//Criação de modulo para geração de uma massa dinâmica
export default {

    deliver: function () {

        var firstName = fake.name.firstName()
        var lastName = fake.name.lastName()

        var data = {
            dados: {
                name: `${firstName} ${lastName}`,
                cpf: cpf.generate(),
                email: fake.internet.email(firstName),
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

        return data
    }
}
