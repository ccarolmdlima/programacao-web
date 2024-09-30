// TO-DO:
// organizar código
const diaSemana = document.getElementById("dia-semana");
const dataAtual = document.getElementById("data-atual");
const horaAtual = document.getElementById("hora-atual");
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");

btnRegistrarPonto.addEventListener("click", register);

diaSemana.textContent = getWeekDay();
dataAtual.textContent = getCurrentDate();

const dialogPonto = document.getElementById("dialog-ponto");

const dialogData = document.getElementById("dialog-data");
dialogData.textContent = getCurrentDate();

const dialogHora = document.getElementById("dialog-hora");
dialogHora.textContent = getCurrentTime();

const selectRegisterType = document.getElementById("register-type");


// TO-DO:
// finalizar a função
function setRegisterType() {
    let lastType = localStorage.getItem("lastRegisterType");
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
    // Continuar de acordo com as regras abaixo
    // REGRA
    // ÚLTIMO PONTO DO USUÁRIO  |  VALOR DA OPTION DO SELECT
    // Entrada                  |  Intervalo
    // Intervalo                |  Volta Intervalo
    // Volta Intervalo          |  Saída
    // Saída                    |  Entrada
}



const btnDialogRegister = document.getElementById("btn-dialog-register");
btnDialogRegister.addEventListener("click", () => {
    // PENSAR: o que fazer quando um usuário registrar o mesmo tipo de ponto
    // dentro de x minutos?

    let register = getObjectRegister(selectRegisterType.value);
    saveRegisterLocalStorage(register);
    
    localStorage.setItem("lastRegisterType", selectRegisterType.value);

    // TO-DO:
    // Informar o usuário do status do registro do ponto
    // Sucesso ou falha
    // Pode ser apresentado na tela principal no cabeçalho
    // Efeito de transição e aparecer por 3 a 5s depois sumir
    dialogPonto.close();
});



// cria um objeto correspondente a um registro de ponto
// com data/hora/localizacao atualizados
// o parâmetro é o tipo de ponto
function getObjectRegister(registerType) {    
    ponto = {
        "date": getCurrentDate(),
        "time": getCurrentTime(),
        "location": getUserLocation(),
        "id": 1,
        "type": registerType
    }
    return ponto;
}

const btnDialogFechar = document.getElementById("dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
})


let registersLocalStorage = getRegisterLocalStorage("register");


function saveRegisterLocalStorage(register) {

    registersLocalStorage.push(register);

    localStorage.setItem("register", JSON.stringify(registersLocalStorage));
}

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
function getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {   
        let userLocation = {
            "lat": position.coords.latitude,
            "long": position.coords.longitude
        }
        return userLocation;
    });
}



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
 


function register() {
    dialogPonto.showModal();
}


function updateContentHour() {
    horaAtual.textContent = getCurrentTime();
}

// Retorna a hora atual (hora/minuto/segundo)
function getCurrentTime() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

// Retorna a data atual no padrão dd/mm/aaaa
function getCurrentDate() {
    const date = new Date(); 
    let mes = date.getMonth() + 1;
    return String(date.getDate()).padStart(2, '0') + "/" + String(mes).padStart(2, '0') + "/" +  String(date.getFullYear()).padStart(2, '0');
}

function getWeekDay() {
    const date = new Date()
    const day = date.getDay()
    const daynames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return daynames[day]
}

updateContentHour();
setInterval(updateContentHour, 1000);

console.log(getCurrentTime());
console.log(getCurrentDate());
console.log(getWeekDay());