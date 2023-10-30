 // Função para aplicar a máscara de CPF
function formatarCPF() {
    const cpfInput = document.getElementById('txtcpf'); //Define o input de cpf
    let valor = cpfInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (valor.length > 11) {
        valor = valor.slice(0, 11); // Limita a 11 dígitos
    }

    valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Aplica a máscara

    cpfInput.value = valor; // Define o valor formatado de volta no campo de entrada
}

const cpfInput = document.getElementById('txtcpf'); //Define o input de cpf(de novo)
cpfInput.addEventListener('input', formatarCPF); // Adiciona um ouvinte de eventos de entrada, e assim que o CPF terminar de ser digitado a máscara será aplicada
//Adiciona um ouvinte de eventos ao botão de enviar
document.getElementById('submit').addEventListener('click', function () {
    const cpf = document.getElementById('txtcpf').value //Define o input de CPF(pela ultima vez)
    const resultado = document.getElementById('resultado') //Define o parágrafo de resultados
    resultado.innerHTML == null //limpa o parágrafo de resultados
    //Validar o cpf
    if (validateCPF(cpf)) {
        console.log('CPF válido')
        resultado.innerHTML = 'CPF <strong>verdadeiro</strong>' //Mostra no parágrafo que o CPF inserido passou na validação
    } else {
        console.log('CPF inválido')
        resultado.innerHTML = 'CPF <strong>falso</strong>' //Mostra no parágrafo que o CPF inserido NÃO passou na validação
    }
})
//Funççao que valida o cpf
function validateCPF(cpf) {
    cpf = cpf.split("") //Separa todos os digitos do cpf em uma array
    //Transforma todos os digitos do cpf em número
    for (let i in cpf) { 
        cpf[i] = Number(cpf[i])
    }
    cpf = cpf.filter(digito => !isNaN(digito)); //Remove a máscara do CPF
    //Checa se o CPF é menor que 11
    if (cpf.length < 11) {
        return false;
    //Checa se todos os digitos do CPF são iguais
    } else if (digitosIguais(cpf)) {
        return false
    //Checa se o CPF passa pelas validações
    } else {
        return primeiraValidacao(cpf) && segundaValidacao(cpf)
    }
}
//Função que define a primeira validação do CPF
function primeiraValidacao(num) {
    let multiplicador = 10 //Multiplicador 
    let numerosMultiplicados = [] //Array que armazena os númweros após serem multiplicados
    //Estrutura que multiplica todos os números
    for (let i = 0; i <= 8; i++, multiplicador--) {
        numerosMultiplicados.push(num[i] * multiplicador) //multiplica o número pelo multiplicador
    }
    let resultado = numerosMultiplicados.reduce((acumulador, elemento) => acumulador + elemento, 0) % 11; //Soma todos os números da array
    //Faz a validação do 10° número do CPF
    if (resultado <= 1) { 
        return num[9] === 0 //Se o resultado for menor que 1 o número tem que ser 0
    } else {
        return 11 - resultado == num[9] //Se o resultado for de 2 pra cima o número tem que ser igual a 11 - o resultado
    }
}
//Função que define a segunda validação do CPF
function segundaValidacao(num) {
    let multiplicador = 11 //Multiplicador 
    let numerosMultiplicados = [] //Array que armazena os númweros após serem multiplicados
    //Estrutura que multiplica todos os números
    for (let i = 0; i <= 9; i++, multiplicador--) {
        numerosMultiplicados.push(num[i] * multiplicador) //multiplica o número pelo multiplicador
    }
    let resultado = numerosMultiplicados.reduce((acumulador, elemento) => acumulador + elemento, 0) % 11;  //Soma todos os números da array
    //Faz a validação do 11° número do CPF
    if (resultado <= 1) {
        return num[10] === 0  //Se o resultado for menor que 1 o número tem que ser 0
    } else {
        return 11 - resultado == num[10] //Se o resultado for de 2 pra cima o número tem que ser igual a 11 - o resultado
    } 
}
//Função que checa se os dígitos são iguais
function digitosIguais(num) {
    //itera pelos digitos do CPF
    for (let i = 1; i < num.length; i++){
        //Se algúm digito diferente for encontrado então o loop é parado e é retornado que existem digitos diferentes
        if (num[i] !== num[0]){
            return false
        }
        //Se o loop acabar e não for parado então existe, números iguais
        return true
    }
}