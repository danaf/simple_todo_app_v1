//import { useState } from 'react'
import React, { useState } from 'react'

export default function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    if (!task.trim()) return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ])

    setTask('')
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed }
          : t
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  return (
    <div className="app-shell">
      <div className="todo-card">
        <h1>Todo App</h1>

        <div className="input-row">
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTask()
            }}
          />

           <button onClick={addTask} className="active:scale-95 active:opacity-80">Add</button>
        </div>

        <ul className="task-list">
          {tasks.map((t) => (
            <li key={t.id} className="task-item">
              <label>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTask(t.id)}
                />

                <span className={t.completed ? 'completed' : ''}>
                  {t.text}
                </span>
              </label>

              <button
                className="delete-btn"
                onClick={() => deleteTask(t.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
