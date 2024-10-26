// TO-DO:
// organizar código

// Definição de constantes que selecionam elementos do HTML pelo ID.
const diaSemana = document.getElementById("dia-semana");
const dataAtual = document.getElementById("data-atual");
const horaAtual = document.getElementById("hora-atual");
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");

// Adiciona um evento de clique ao botão 'btnRegistrarPonto' chamando a função 'register' ao clicar.
btnRegistrarPonto.addEventListener("click", register);

// Atualiza o conteúdo de 'diaSemana' e 'dataAtual' chamando as funções 'getWeekDay' e 'getCurrentDate'.
diaSemana.textContent = getWeekDay();
dataAtual.textContent = getCurrentDate();

// Seleciona elementos HTML relacionados ao diálogo de ponto e define o texto do 'dialogData'.
const dialogPonto = document.getElementById("dialog-ponto");
const dialogData = document.getElementById("dialog-data");
dialogData.textContent = "Data: " + getCurrentDate();

const dialogHora = document.getElementById("dialog-hora");
//dialogHora.textContent = getCurrentTime();

const selectRegisterType = document.getElementById("register-type");


// TO-DO:
// finalizar a função
function setRegisterType() {
    let lastType = localStorage.getItem("lastRegisterType"); // Obtém o último tipo de registro do 'localStorage'.
    
    // Verifica o último tipo de ponto registrado e define o próximo valor no seletor 'selectRegisterType'.
    if(lastType == "entrada") {
        selectRegisterType.value = "intervalo";
        return;
    }
    if(lastType == "intervalo") {

    }
    if(lastType == "volta-intervalo") {
        
    }
    if(lastType == "saida") {
    
    }
    // Comentário explica a sequência de alternância dos valores no seletor.
    // Continuar de acordo com as regras abaixo
    // REGRA
    // ÚLTIMO PONTO DO USUÁRIO  |  VALOR DA OPTION DO SELECT
    // Entrada                  |  Intervalo
    // Intervalo                |  Volta Intervalo
    // Volta Intervalo          |  Saída
    // Saída                    |  Entrada
}


// Define o botão 'btnDialogRegister' e adiciona um evento de clique assíncrono que salva o registro.
const btnDialogRegister = document.getElementById("btn-dialog-register");
btnDialogRegister.addEventListener("click", async () => {
    // Pensa em uma solução para registros repetidos em curto intervalo de tempo.
    // PENSAR: o que fazer quando um usuário registrar o mesmo tipo de ponto
    // dentro de x minutos?

    let register = await getObjectRegister(selectRegisterType.value); // Cria um registro de ponto com a função assíncrona 'getObjectRegister'.
    saveRegisterLocalStorage(register); // Salva o registro no 'localStorage'.
    
    localStorage.setItem("lastRegister", JSON.stringify(register)); // Atualiza o 'localStorage' com o último registro.

    // Mostra uma notificação de sucesso ao usuário por 5 segundos.
    const alertaSucesso = document.getElementById("alerta-ponto-registrado");
    alertaSucesso.classList.remove("hidden");
    alertaSucesso.classList.add("show");

    setTimeout(() => {
        alertaSucesso.classList.remove("show");
        alertaSucesso.classList.add("hidden");
    }, 5000);

    dialogPonto.close(); // Fecha o diálogo de ponto.
});


// Função assíncrona que cria um objeto de registro de ponto com data, hora e localização.
// cria um objeto correspondente a um registro de ponto
// com data/hora/localizacao atualizados
// o parâmetro é o tipo de ponto
async function getObjectRegister(registerType) {    

    const location = await getUserLocation(); // Obtém a localização atual do usuário.

    console.log(location);

    // Cria um objeto 'ponto' contendo informações do registro.
    ponto = {
        "date": getCurrentDate(),
        "time": getCurrentTime(),
        "location": location,
        "id": 1,
        "type": registerType
    }
    return ponto; // Retorna o objeto criado.
}

// Botão para fechar o diálogo 'dialogPonto' ao ser clicado.
const btnDialogFechar = document.getElementById("dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
})

// Obtém registros do 'localStorage' com a função 'getRegisterLocalStorage'.
let registersLocalStorage = getRegisterLocalStorage("register");

// Função para salvar um registro no 'localStorage'.
function saveRegisterLocalStorage(register) {
    registersLocalStorage.push(register);
    localStorage.setItem("register", JSON.stringify(registersLocalStorage));
}

// Função para recuperar registros salvos no 'localStorage'.
function getRegisterLocalStorage(key) {

    let registers = localStorage.getItem(key);

    if(!registers) {
        return [];
    }

    return JSON.parse(registers);
}

// O que é uma função assíncrona?
// O que é um objeto Javascript?
// O que é uma instância?
// O que é PROTOTYPE?
/*
function getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {   
        let userLocation = {
            "lat": position.coords.latitude,
            "long": position.coords.longitude
        }
        return userLocation;
    });
}
*/


// Como garantir que uma função assíncrona já foi executada/processada?
// Possíveis soluções

//getUserLocation(functionCallback) {
    //navigator.geolocation.getCurrentPosition((position) => {
        //userLocation = {
            //OBJETO com lat e long
        //}
        //functionCallback(userLocation)
    //})
//}

// OU

//getUserLocation() {
    //return new Promise((suc, fail) => {
        //navigator.geolocation.getCurrentPosition()
    //})

    
//}
 
function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let userLocation = {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            }
            resolve(userLocation);
        }, 
        (error) => {
            reject("Erro " + error);
        });
    });
}

// Função chamada quando o usuário clica em "registrar" para exibir informações do último ponto registrado.
function register() {

    const dialogUltimoRegistro = document.getElementById("dialog-ultimo-registro");
    let lastRegister = JSON.parse(localStorage.getItem("lastRegister"));

    if(lastRegister) {
        let lastDateRegister = lastRegister.date;
        let lastTimeRegister = lastRegister.time;
        let lastRegisterType = lastRegister.type;

        dialogUltimoRegistro.textContent = "Último Registro: " + lastDateRegister + " | " + lastTimeRegister + " | " + lastRegisterType;
    }

    dialogHora.textContent = "Hora: " + getCurrentTime();

    let interval = setInterval(() => {
        dialogHora.textContent = "Hora: " + getCurrentTime();
    }, 1000);

    console.log(interval);

    // TO-DO:
    // Podemos manter esses setInterval sem finalizar?
    // Como podemos usar o clearInterval()?

    dialogPonto.showModal();
}

// Atualiza o conteúdo de 'horaAtual' a cada segundo com a hora atual.
function updateContentHour() {
    horaAtual.textContent = getCurrentTime();
}

// Função que retorna a hora atual formatada como "HH:MM:SS".
function getCurrentTime() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

// Função que retorna a data atual formatada como "DD/MM/AAAA".
function getCurrentDate() {
    const date = new Date(); 
    let mes = date.getMonth() + 1;
    return String(date.getDate()).padStart(2, '0') + "/" + String(mes).padStart(2, '0') + "/" +  String(date.getFullYear()).padStart(2, '0');
}

// Retorna o nome do dia da semana atual.
function getWeekDay() {
    const date = new Date()
    const day = date.getDay()
    const daynames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return daynames[day]
}

// Atualiza o conteúdo da hora a cada segundo.
updateContentHour();
setInterval(updateContentHour, 1000);

// Exibe no console a data, hora e dia da semana atuais.
console.log(getCurrentTime());
console.log(getCurrentDate());
console.log(getWeekDay());