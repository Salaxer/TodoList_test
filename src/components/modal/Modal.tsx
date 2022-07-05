import { AnimatePresence, motion, Variant } from "framer-motion";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'

import { resolver } from "./resolver";
import { addItem } from "../../state/features/todoList";

import './Modal.css'

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

const Modal: FC = () =>{
    const dispatch = useDispatch();
    const [modal, setModal] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, resetField, setValue } = useForm<TodoListType>({ resolver });
    const onSubmit = handleSubmit((data) => {
        setValue("date", Date.now());
        dispatch(addItem(data));
        resetField("message");
    });
    return (
        <>
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
        </>
    )
}

export default Modal;
