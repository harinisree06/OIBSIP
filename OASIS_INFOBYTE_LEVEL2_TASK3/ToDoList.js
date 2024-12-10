const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const pendingTasks = document.getElementById('pending-tasks');
const completedTasks = document.getElementById('completed-tasks');

// Helper function to get current date and time
function getCurrentTimestamp() {
  const now = new Date();
  return now.toLocaleString(); // Example: "12/10/2024, 10:30 AM"
}

// Add a new task
function addTask() {
  const taskText = input.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Create pending task item
  createTaskItem(taskText, false, getCurrentTimestamp());

  // Clear input
  input.value = '';
}

// Create a task item
function createTaskItem(taskText, isCompleted, timestamp) {
  const listItem = document.createElement('li');

  // Task text
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  taskSpan.className = 'task-text';

  // Timestamp
  const timeSpan = document.createElement('span');
  timeSpan.textContent = `Added: ${timestamp}`;
  timeSpan.className = 'timestamp';

  // Mark as completed or undo button
  const completeButton = document.createElement('button');
  completeButton.textContent = isCompleted ? 'Undo' : 'Complete';
  completeButton.className = isCompleted ? 'undo-btn' : 'complete-btn';

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  // Event for marking as complete/undo
  completeButton.addEventListener('click', () => {
    const parentList = listItem.parentNode;

    if (parentList.id === 'pending-tasks') {
      pendingTasks.removeChild(listItem);
      createTaskItem(taskText, true, `Completed: ${getCurrentTimestamp()}`);
    } else {
      completedTasks.removeChild(listItem);
      createTaskItem(taskText, false, timestamp);
    }
  });

  // Event for deleting the task
  deleteButton.addEventListener('click', () => {
    const parentList = listItem.parentNode;

    if (parentList.id === 'pending-tasks') {
      pendingTasks.removeChild(listItem);
    } else {
      completedTasks.removeChild(listItem);
    }
  });

  // Append elements to list item
  listItem.appendChild(taskSpan);
  listItem.appendChild(timeSpan);
  listItem.appendChild(completeButton);
  listItem.appendChild(deleteButton);

  // Add to appropriate list
  if (isCompleted) {
    taskSpan.classList.add('completed');
    completedTasks.appendChild(listItem);
  } else {
    pendingTasks.appendChild(listItem);
  }
}

// Event listener for adding tasks
addButton.addEventListener('click', addTask);

// Add task on pressing Enter
input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});
