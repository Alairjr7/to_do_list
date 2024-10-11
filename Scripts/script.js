// Seleciona o botão de adicionar tarefa
var buttonAdicionar = document.querySelector('.button_add');
// Seleciona o campo de entrada para a tarefa
var InputTask = document.getElementById('task');
// Seleciona a lista onde as tarefas serão exibidas
var ListComplet = document.querySelector('.list_tasks');

// Inicializa um array vazio para armazenar as tarefas
let ListTaks = [];

// Adiciona um evento de clique ao botão de adicionar tarefa
buttonAdicionar.addEventListener('click', addTask);

// Adiciona um evento de tecla pressionada ao campo de entrada
InputTask.addEventListener('keypress', function(event) {
    // Verifica se a tecla pressionada foi "Enter"
    if (event.key === 'Enter') {
        addTask(); // Chama a função para adicionar a tarefa
    }
});

// Função para adicionar uma nova tarefa à lista
function addTask() {
    // Obtém o valor do campo de entrada
    var valorInputTask = InputTask.value;
    // Verifica se o campo de entrada está vazio
    if (valorInputTask === "") {
        alert("Por favor adicione uma tarefa valida."); // Exibe um alerta se estiver vazio
    } else {
        // Adiciona um novo objeto de tarefa ao array ListTaks
        ListTaks.push({
            task: valorInputTask, // Armazena a tarefa
            completed: false // Marca a tarefa como não concluída
        });
        InputTask.value = ''; // Limpa o campo de entrada
        showTask(); // Chama a função para exibir as tarefas
    }
}

// Função para exibir as tarefas na lista
function showTask() {
    var newLi = ''; // Inicializa uma string vazia para armazenar os itens da lista

    // Itera sobre cada tarefa no array ListTaks
    ListTaks.forEach((Task, index) => {
        // Constrói o HTML para cada tarefa
        newLi += 
        `<li class="task ${Task.completed && "done"}"> <!-- Aplica a classe "done" se a tarefa estiver concluída -->
            <p>${Task.task}</p> 
            <div class="container_buttons">
                <span class="button_check" onclick="TaskCompleted(${index})"><i class="bi bi-check"></i></span>
                <span class="button_delete" onclick="DeleteTask(${index})"><i class="bi bi-x"></i></span>
            </div>
        </li>`;
    });

    // Atualiza o conteúdo HTML da lista de tarefas
    ListComplet.innerHTML = newLi;

    // Armazena as tarefas no localStorage como uma string JSON
    localStorage.setItem('ListTasklocalStorage', JSON.stringify(ListTaks));
}

// Função para marcar uma tarefa como concluída ou não
function TaskCompleted(index) {
    ListTaks[index].completed = !ListTaks[index].completed; // Alterna o estado de concluída da tarefa
    showTask(); // Atualiza a lista de tarefas exibida
}

// Função para excluir uma tarefa da lista
function DeleteTask(index) {
    ListTaks.splice(index, 1); // Remove a tarefa do array ListTaks pelo índice
    showTask(); // Atualiza a lista de tarefas exibida
}

// Função para recarregar as tarefas armazenadas no localStorage
function ReloadTasks() {
    // Obtém as tarefas do localStorage
    var TasksLocalStorage = localStorage.getItem('ListTasklocalStorage');

    // Se houver tarefas armazenadas, converte a string JSON de volta para um array
    if (TasksLocalStorage) {
        ListTaks = JSON.parse(TasksLocalStorage);
    }
    showTask(); // Exibe as tarefas armazenadas
}

// Chama a função ReloadTasks ao carregar a página para recuperar tarefas salvas
ReloadTasks();
