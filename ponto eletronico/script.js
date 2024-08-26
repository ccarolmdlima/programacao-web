// Seleciona os elementos HTML onde os dados serão exibidos
const diaSemana = document.getElementById("data-semana");
const dataAtual = document.getElementById("data-atual");
const horaAtual = document.getElementById("data-hora");

// Função para atualizar o conteúdo dos elementos com a data e hora atuais
function updateContentHour() {

    // Atualiza o texto do elemento diaSemana com o dia da semana atual
    if (diaSemana) {
        diaSemana.textContent = getWeekDay();
    }

    // Atualiza o texto do elemento dataAtual com a data atual
    if (dataAtual) {
        dataAtual.textContent = getCurrentDate();
    }

    // Atualiza o texto do elemento horaAtual com a hora atual
    if (horaAtual) {
        horaAtual.textContent = getCurrentTime();
    }
}

// Retorna a hora atual no formato HH:MM:SS, com dois dígitos para horas, minutos e segundos
function getCurrentTime() {

    const date = new Date(); // Cria um novo objeto Date com a data e hora atuais

    // Formata as horas, minutos e segundos com dois dígitos
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Retorna a hora no formato HH:MM:SS
    return hours + ":" + minutes + ":" + seconds;
}

// Retorna a data atual no formato DD/MM/AAAA, com zeros à esquerda para dias e meses
function getCurrentDate() {

    const date = new Date(); // Cria um novo objeto Date com a data e hora atuais

    // Formata o dia e o mês com dois dígitos
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear(); // Obtém o ano completo

    // Retorna a data no formato DD/MM/AAAA
    return day + "/" + month + "/" + year;
}

// Retorna o dia da semana atual como uma string com um número e o nome do dia
function getWeekDay() {
    
    // Array com os nomes dos dias da semana e seus respectivos números
    const daysOfWeek = ["0 - Domingo", "1 - Segunda", "2 - Terça", "3 - Quarta", "4 - Quinta", "5 - Sexta", "6 - Sábado"];
    const date = new Date(); // Cria um novo objeto Date com a data e hora atuais
    // Obtém o número do dia da semana e retorna o nome correspondente
    return daysOfWeek[date.getDay()];
}

// Atualiza o conteúdo dos elementos a cada 1000 milissegundos (1 segundo)
setInterval(updateContentHour, 1000);

// Atualiza imediatamente o conteúdo dos elementos ao carregar a página, sem esperar 1 segundo
updateContentHour();