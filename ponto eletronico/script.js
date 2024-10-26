function updateDateTime() {
    const diaSemana = document.getElementById("dia-semana");
    const dataAtual = document.getElementById("data-atual");
    const horaAtual = document.getElementById("hora-atual");

    diaSemana.textContent = getWeekDay();
    dataAtual.textContent = getCurrentDate();
    horaAtual.textContent = getCurrentTime();
}

setInterval(updateDateTime, 1000); 

const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");
btnRegistrarPonto.addEventListener("click", () => {
    const dialogPonto = document.getElementById("dialog-ponto");
    const dialogData = document.getElementById("dialog-data");
    const dialogHora = document.getElementById("dialog-hora");
    const dialogUltimoRegistro = document.getElementById("dialog-ultimo-registro");

    dialogData.textContent = "Data: " + getCurrentDate();
    dialogHora.textContent = "Hora: " + getCurrentTime();

    const lastRegister = JSON.parse(localStorage.getItem("lastRegister"));
    if (lastRegister) {
        dialogUltimoRegistro.textContent = `Último Registro: ${lastRegister.date} | ${lastRegister.time} | ${lastRegister.type}`;
    } else {
        dialogUltimoRegistro.textContent = "Nenhum registro encontrado.";
    }

    dialogPonto.showModal();
});

document.getElementById("dialog-fechar").addEventListener("click", () => {
    const dialogPonto = document.getElementById("dialog-ponto");
    dialogPonto.close();
});

const btnDialogRegister = document.getElementById("btn-dialog-register");
btnDialogRegister.addEventListener("click", async () => {
    const registerType = document.getElementById("register-type").value;
    const register = await createRegisterObject(registerType);

    saveRegisterLocalStorage(register);
    localStorage.setItem("lastRegister", JSON.stringify(register));

    showSuccessAlert();
    document.getElementById("dialog-ponto").close();
});

// Funções auxiliares
function getCurrentTime() {
    const date = new Date();
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
}

function getCurrentDate() {
    const date = new Date();
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

function getWeekDay() {
    const dayNames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return dayNames[new Date().getDay()];
}

async function createRegisterObject(type) {
    const location = await getUserLocation();
    return {
        date: getCurrentDate(),
        time: getCurrentTime(),
        location: `Lat: ${location.latitude}, Long: ${location.longitude}`,
        type: type
    };
}

function saveRegisterLocalStorage(register) {
    let registers = JSON.parse(localStorage.getItem("register")) || [];
    registers.push(register);
    localStorage.setItem("register", JSON.stringify(registers));
}

function showSuccessAlert() {
    const alertaSucesso = document.getElementById("alerta-ponto-registrado");
    alertaSucesso.classList.remove("hidden");
    alertaSucesso.classList.add("show");
    setTimeout(() => {
        alertaSucesso.classList.remove("show");
        alertaSucesso.classList.add("hidden");
    }, 3000);
}

function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
            error => reject("Erro ao obter localização: " + error.message)
        );
    });
}
