class Todo{
  constructor(){
    // conta o número de tasks (irá começar com 1 devido ao template)
    this.totalTasks = document.querySelectorAll('.task').length
  }

  addTask(taskText){
    // cria uma task clonando o template
    let newTask = document.querySelector('.task').cloneNode(true)
    // remove classe hide
    newTask.classList.remove('hide')
    // adicionar texto na nova task
    let newTaskText = newTask.querySelector('.task-title');
    newTaskText.textContent = taskText;

    // Pega a lista de tasks e adiciona a nova task
    let tasksList = document.querySelector('#tasks-container')
    tasksList.appendChild(newTask)

    // adicionar eventos de concluir e deletar task
    this.addEvents();
    this.checkTasks('add') 
  }

  removeTask(task){
    // achar elemento pai e remover
    const parentElement = task.parentElement;
    parentElement.remove(); // método para remover elemento
    this.checkTasks('remove') 
  }

  completeTask(task){
    // Pega a imagem dentro do botão
    const iconCheck = task.children[0];
    // Verifica se está ativa ou inativa
    const isActive = iconCheck.src.includes('active')
    // Altera o status da task mudando a imagem do ícone
    if(!isActive)
      iconCheck.setAttribute('src', '../Icons/check-active.svg');
    else
      iconCheck.setAttribute('src', '../Icons/check-disabled.svg'); 
  }

  addEvents(){
    // Pegando o último elemento e adiciona o evento
    const deleteBtns = document.querySelectorAll('.trash');
    const lastDeleteBtn = deleteBtns[deleteBtns.length - 1];
    lastDeleteBtn.addEventListener('click', function() {
      todo.removeTask(this) // this é o próprio botão
    })

    // Pegando o último elemento e adiciona o evento
    const doneBtns = document.querySelectorAll('.done');
    const lastDoneBtn = doneBtns[doneBtns.length - 1];
    lastDoneBtn.addEventListener('click', function() {
      todo.completeTask(this) // this é o próprio botão
    })
  }

  checkTasks(command){
    // Verifica o número de tasks e se deve ou não mostrar a mensagem de 'não existem tarefas'
    const message = document.querySelector('#empty-tasks');

    // Altera o número de tarefas segundo o comando
    if(command === 'add')
      this.totalTasks += 1;
    if(command === 'remove')
      this.totalTasks -= 1;

    // checa se existem tasks e adiciona ou remove a mensagem
    if(this.totalTasks === 1) // 1 pois já existe pelo menos o template
      message.classList.remove('hide')
    else 
      message.classList.add('hide')
  }
}

const todo = new Todo();


// events
const addBtn = document.querySelector('#btn-add');

addBtn.addEventListener('click', function(e){
  e.preventDefault();
  let taskText = document.querySelector('#task')
  
  if(taskText.value !== '')
    todo.addTask(taskText.value)

  taskText.value= ''

})