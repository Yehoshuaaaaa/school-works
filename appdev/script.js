// ============================================
// Task Manager — vanilla JS, no dependencies
// ============================================

const STORAGE_KEY = 'taskManager.tasks';

// DOM references
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const inputError = document.getElementById('input-error');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const emptyState = document.getElementById('empty-state');

// In-memory state, hydrated from localStorage on load
let tasks = [];

/**
 * Load tasks from localStorage.
 * Falls back to an empty array if nothing is saved or data is corrupt.
 */
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Could not read saved tasks:', err);
    return [];
  }
}

/**
 * Persist the current tasks array to localStorage.
 */
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('Could not save tasks:', err);
  }
}

/**
 * Generate a reasonably unique id for a new task.
 */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Create a single <li> task card element from a task object.
 */
function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = 'task-item' + (task.completed ? ' completed' : '');
  li.dataset.id = task.id;

  const text = document.createElement('span');
  text.className = 'task-text';
  text.textContent = task.text;

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const completeBtn = document.createElement('button');
  completeBtn.type = 'button';
  completeBtn.className = 'btn btn-icon btn-complete' + (task.completed ? ' is-active' : '');
  completeBtn.textContent = task.completed ? 'Completed' : 'Complete';
  completeBtn.setAttribute('aria-pressed', String(task.completed));
  completeBtn.setAttribute('aria-label', `Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`);
  completeBtn.addEventListener('click', () => toggleComplete(task.id));

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'btn btn-icon btn-delete';
  deleteBtn.textContent = 'Delete';
  deleteBtn.setAttribute('aria-label', `Delete task "${task.text}"`);
  deleteBtn.addEventListener('click', () => deleteTask(task.id));

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(text);
  li.appendChild(actions);

  return li;
}

/**
 * Re-render the full task list and related UI (count, empty state).
 * Simpler than diffing the DOM, and fast enough for a personal task list.
 */
function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    emptyState.classList.add('visible');
  } else {
    emptyState.classList.remove('visible');
    const fragment = document.createDocumentFragment();
    tasks.forEach((task) => fragment.appendChild(createTaskElement(task)));
    taskList.appendChild(fragment);
  }

  updateTaskCount();
}

/**
 * Update the "X tasks" summary text.
 */
function updateTaskCount() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  if (total === 0) {
    taskCount.textContent = '0 tasks';
  } else {
    taskCount.textContent = `${completed} of ${total} completed`;
  }
}

/**
 * Add a new task from the input field's current value.
 */
function addTask(rawText) {
  const text = rawText.trim();

  if (!text) {
    showInputError('Please enter a task before adding.');
    return;
  }

  clearInputError();

  tasks.unshift({
    id: generateId(),
    text,
    completed: false,
  });

  saveTasks();
  renderTasks();

  taskInput.value = '';
  taskInput.focus();
}

/**
 * Toggle a task's completed state on/off by id.
 */
function toggleComplete(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

/**
 * Remove a task by id.
 */
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

/**
 * Display a validation error under the input field.
 */
function showInputError(message) {
  inputError.textContent = message;
  taskInput.setAttribute('aria-invalid', 'true');
}

/**
 * Clear any validation error under the input field.
 */
function clearInputError() {
  inputError.textContent = '';
  taskInput.removeAttribute('aria-invalid');
}

// ============================================
// Event listeners
// ============================================

// Handles both the "Add Task" button click and Enter key (native form submit)
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(taskInput.value);
});

// Clear inline error as soon as the user starts typing again
taskInput.addEventListener('input', () => {
  if (inputError.textContent) {
    clearInputError();
  }
});

// ============================================
// Init
// ============================================
tasks = loadTasks();
renderTasks();