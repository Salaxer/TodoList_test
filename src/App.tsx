import { Layout } from './components/layout';
import { TodoList } from './container/todoList';
import { Modal } from './components/modal';

import './App.css';

function App() {

  return (
    <Layout>
      <main className='contApp'>
        <TodoList></TodoList>
        <Modal />
      </main>
    </Layout>
  )
}

export default App