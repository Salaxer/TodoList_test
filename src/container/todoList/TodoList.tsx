import { useEffect, useState } from 'react'
import ItemList from '../../components/itemList/ItemList';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence, Variant } from 'framer-motion';
import { resolver } from './resolver';

import { useSelector, useDispatch } from 'react-redux'
import { addItem, selectTodoList } from '../../state/features/todoList'

import './TodoList.css';

export interface TodoListType{
    message: string;
    check: boolean;
    date: number;
}

const scaleInput:Variant = {
    scale: 1.05
}
const desScaleInput:Variant = {
    scale: 0.9
}

const TodoList = () =>{
    const [modal, setModal] = useState<boolean>(true);
    const todoList = useSelector(selectTodoList);
    const { register, handleSubmit, formState: { errors }, resetField, setValue } = useForm<TodoListType>({ resolver });
    const onSubmit = handleSubmit((data) => {
        setValue("date", Date.now());
        dispatch(addItem(data));
        resetField("message");
    });
    const dispatch = useDispatch()
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
            <AnimatePresence>
                {modal &&
                    <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.3}}
                    animate={{ opacity: 1, y: 0, scale: 1}}
                    transition={{ duration: 0.2 }}
                    layout
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className="contToDoList__modal">
                        <motion.form onSubmit={onSubmit} 
                        className='contToDoList__form'>
                            <input 
                            {...register("check")} autoFocus type="checkbox" checked={false} style={{display: 'none'}}/>
                            <motion.input 
                            whileHover={scaleInput}
                            whileTap={desScaleInput}
                            {...register("message")} placeholder="Mensaje" />
                            {errors?.message && <motion.p>{errors.message.message}</motion.p>}
                            <motion.input 
                            whileHover={scaleInput}
                            whileTap={desScaleInput} type="submit" value="Guardar"/>
                        </motion.form>
                    </motion.div>
                    }
            </AnimatePresence>
            <motion.button
                onClick={()=>setModal(!modal)}
                className='contToDoList__modal--open'
                animate={ modal ? {rotate: '-0deg', scale: 0.6} : {rotate: '135deg'}}
                >
                <motion.svg 
                width="30"
                height="30"
                viewBox="0 0 30 30">
                    <motion.line x1="5" y1="25" x2="25" y2="5" strokeWidth={3} stroke="var(--white-normal)" />
                    <motion.line x1="5" y1="5" x2="25" y2="25" strokeWidth={3} stroke="var(--white-normal)" />
                </motion.svg>
            </motion.button>
        </section>
    )
}

export default TodoList;