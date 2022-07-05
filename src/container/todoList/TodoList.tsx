import { motion, AnimatePresence } from 'framer-motion';

import { useSelector } from 'react-redux'
import { selectTodoList } from '../../state/features/todoList'
import { ItemList } from '../../components/itemList';

import './TodoList.css';

const TodoList = () =>{
    const todoList = useSelector(selectTodoList);
    return (
        <section className='contToDoList'>
            <ul className='contToDoList__list'>
                <AnimatePresence>
                {todoList.map((item, index)=>{
                    if (item.check){
                        return (<motion.div className='contToDoList__list--item' key={`item-${item.date}`} style={{order: 1, opacity: 0.8}}>
                            <ItemList index={index} {...item}/>
                        </motion.div>)
                    }
                    return  <motion.div className='contToDoList__list--item' key={`item-${item.date}`} style={{order: 0}} >
                        <ItemList index={index} {...item}/>
                    </motion.div>
                })}
                </AnimatePresence>
            </ul>
        </section>
    )
}

export default TodoList;