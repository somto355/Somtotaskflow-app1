import { useState, useEffect } from "react";
import "./styles.css";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function App() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: task,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="app">
      <div className="dashboard">
        <h1>🚀 TaskFlow</h1>
        <p className="subtitle">Manage your productivity like a pro</p>

        <div className="stats">
          <div className="card">
            <h3>{total}</h3>
            <p>Total Tasks</p>
          </div>
          <div className="card">
            <h3>{completed}</h3>
            <p>Completed</p>
          </div>
          <div className="card">
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="input-section">
          <input
            value={task}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTask(e.target.value)
            }
            placeholder="What needs to be done?"
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="task-list">
          {tasks.length === 0 && (
            <p className="empty">No tasks yet. Start being productive 🚀</p>
          )}

          {tasks.map((t) => (
            <div
              key={t.id}
              className={`task-item ${t.completed ? "done" : ""}`}
            >
              <span onClick={() => toggleTask(t.id)}>{t.text}</span>
              <button onClick={() => deleteTask(t.id)}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}