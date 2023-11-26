import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [tasks, setTasks] = useState([])
  //const [newSn, setNewSn] = useState('')
  const [newTask, setNewTask] = useState('')
  const [n, setN] = useState('')
  const[ updateTask, setUpdateTask] = useState(false);
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://todosql.onrender.com/')
      console.log(response)
      setTasks(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const createTask = async () => {
    try {
      const response = await axios.post('https://todosql.onrender.com/', { title: newTask })
      setTasks([...tasks, response.data]);
      //setNewSn('')
      setNewTask('')
      //setNewDes('')
      fetchTasks();
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTask = async (taskId) => {
    console.log(taskId);
    try {
      await axios.delete(`https://todosql.onrender.com/`, { data:{id: taskId} })
      fetchTasks();
    } catch (error) {
      console.error(error)
    }
  }
  const updateU = async (taskId) => {
    setUpdateTask(true);
    setN(taskId);
  }

  const update = async (taskId) => {
    try {
      const response = await axios.patch('https://todosql.onrender.com/', {title: newTask, id: taskId} )
      setTasks([...tasks, response.data]);
      //setNewSn('')
      setNewTask('')
      //setNewDes('')
      fetchTasks();
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className='relative flex flex-col items-center justify-center '>
        <div className="fixed   top-0 mb-5 p-5 w-full bg-white items-center justify-center">
          <h1 className='text-3xl font-bold  text-center'>Task Manager</h1>
        </div>
        <div className="pt-20 pb-20 w-6/12">
          <div className='w-full overflow-y-auto h-'>
            {tasks.map(task => (
              <div key={task.sn} className='flex items-center justify-between border border-gray-300 rounded-md px-4 py-2 mb-2'>
                {task.title}
                <div>
                  <button onClick={() => deleteTask(task.id)} className='bg-black text-white px-2 py-1 rounded-md mr-2'>❌</button>
                  <button onClick={() => updateU(task.id)} className='bg-black text-white px-2 py-1 rounded-md'>📝</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex fixed bottom-0 w-full justify-center bg-white">
          <input
            type='text'
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            className='border border-gray-300 rounded-md px-2 py-1 mb-2'
            style={{ width: '50%' }}
          />
          <button onClick={updateTask ? ()=>update(n) : createTask} className='bg-blue-500 text-white px-4 py-2 rounded-md mb-2 ml-2'>{updateTask ?'update Task': 'Add Task'}</button>
        </div>
      </div>
    </>
  )
}
export default App
