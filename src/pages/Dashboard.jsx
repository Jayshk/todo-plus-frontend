import { useEffect, useState } from 'react';
import { getMe } from '../api/auth';
import { getTasks } from '../api/tasks';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getMe(), getTasks()])
      .then(([userData, taskData]) => {
        setUser(userData);
        setTasks(taskData);
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}</p>

      <button onClick={logout}>Logout</button>

      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id || task.id}>
              <strong>{task.title}</strong> — {task.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
