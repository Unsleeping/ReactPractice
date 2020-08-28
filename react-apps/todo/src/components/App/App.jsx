import React, { Component } from 'react';
import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';
import './App.scss';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Build Awesome React App'),
      this.createTodoItem('Have a lunch')
    ],
    origTodoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Build Awesome React App'),
      this.createTodoItem('Have a lunch')
    ],
    filter: 'all',
    term: ''
  };

  onFilter = (term) => {
    this.setState({term});
  };

  filter(items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  search(items, term) {
    if (term.length === 0) return items;

    return items.filter(el => el.label.toLowerCase().includes(term.toLowerCase()));
  };

  onFilterChange = (filter) => {
    this.setState({filter});
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  };

  findIdx(arr, id) {
    return arr.findIndex(el => el.id === id);
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = this.findIdx(todoData, id);
      return {
        todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      }
    });
  };

  addItem = (text) => {
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, this.createTodoItem(text)]
      };
    })
  };

  toggleProperty(arr, id, propName) {
    const idx = this.findIdx(arr, id);

      const oldItem = arr[idx];
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };

      return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important'),
        origTodoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
        origTodoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  render() {
    const { todoData, term, filter } = this.state;
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;

    const visibleItems = this.filter(this.search(todoData, term), filter);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onFilter={this.onFilter} />
          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
        </div>
        <TodoList 
          todos={visibleItems}
          onDeleted={ this.deleteItem }
          onToggleDone={ this.onToggleDone }
          onToggleImportant={ this.onToggleImportant }
          />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}