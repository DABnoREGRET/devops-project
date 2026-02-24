import { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080');

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/api/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      await fetch(`${API_URL}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo })
      });
      setNewTodo('');
      fetchTodos();
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/api/todos/${id}`, {
        method: 'DELETE',
      });
      fetchTodos();
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const toggleTodo = async (todo) => {
    try {
      await fetch(`${API_URL}/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed })
      });
      fetchTodos();
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };

  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="app-container">
      <header>
        <h1>🚀 DevOps Todo App</h1>
        <p>Live CI/CD Pipeline Tracking ✨</p>
      </header>

      <div className="card">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value">{todos.length}</span>
            <span className="stat-label">Total Task</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: '#10b981' }}>{completedCount}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-value" style={{ color: '#f59e0b' }}>{pendingCount}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>

        <div className="input-group">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="What needs to be done?"
          />
          <button className="btn-primary" onClick={addTodo}>
            Add Task
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#64748b' }}>Loading tasks...</p>
        ) : (
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className="todo-item">
                <div className="todo-content" onClick={() => toggleTodo(todo)}>
                  <span className="status-icon">
                    {todo.completed ? '✅' : '⏳'}
                  </span>
                  <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                    {todo.title}
                  </span>
                </div>
                <button 
                  className="btn-delete" 
                  onClick={() => deleteTodo(todo.id)}
                  title="Delete task"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
        
        {todos.length === 0 && !loading && (
          <p style={{ textAlign: 'center', color: '#64748b', marginTop: '20px' }}>
             No tasks yet. Add one above! 
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
