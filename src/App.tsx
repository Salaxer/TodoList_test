import { Layout } from './components/layout'
import './App.css'
import TodoList from './container/todoList/TodoList'

function App() {

  return (
    <Layout>
      <main className='contApp'>
        <TodoList></TodoList>
      </main>
    </Layout>
  )
}

export default App