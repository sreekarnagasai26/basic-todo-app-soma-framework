import { h, hfragment, mountDOM } from '../node_modules/soma-runtime/dist/soma-fwk';
// Initial State
const state = {
  currentTodo: '',
  todos: ['Walk the dog'],
};

// Reducers to manage state changes
const reducers = {
  'update-current-todo': (state, currentTodo) => ({
    ...state,
    currentTodo,
  }),
  'add-todo': (state) => ({
    ...state,
    todos: [...state.todos, state.currentTodo],
    currentTodo: '',
  }),
};

// App Component
function App(state, emit) {
  return hfragment([
    h('h1', {}, ['My To-Do App']),
    CreateTodoInput(state, emit),
    TodoList(state),
  ]);
}

// CreateTodoInput Component
function CreateTodoInput({ currentTodo }, emit) {
  return h('div', { class: 'todo-input' }, [
    h('input', {
      value: currentTodo,
      on: {
        input: (e) => emit('update-current-todo', e.target.value),
      },
      placeholder: 'Enter a new task...',
    }),
    h('button', {
      on: { click: () => emit('add-todo') },
    }, ['Add Todo']),
  ]);
}

// TodoList Component
function TodoList({ todos }) {
  return h('ul', {}, todos.map((todo) =>
    h('li', {}, [todo])
  ));
}

// Start the App and Mount It to the DOM
function startApp(initialState) {
  let state = { ...initialState };

  const emit = (action, payload) => {
    const reducer = reducers[action];
    if (reducer) {
      state = reducer(state, payload);
      renderApp();
    }
  };

  const renderApp = () => {
    const appRoot = document.getElementById('app');
    appRoot.innerHTML = ''; // Clear previous content
    mountDOM(App(state, emit), appRoot);
  };

  renderApp(); // Initial render
}

startApp(state);