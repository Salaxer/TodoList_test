import { motion, Variants } from 'framer-motion';
import { FC, useState } from 'react'
import './ItemList.css'

import { useDispatch } from 'react-redux'
import { modifyItem, deleteItem } from '../../state/features/todoList'

import trash from '../../assets/trash.svg'

interface PropsItemList{
  message: string;
  index: number;
  check: boolean;
  date: number;
}

const ItemList:FC<PropsItemList> = ({message, index, check, date}) => {
  const [newMessage, setnewMessage] = useState<{modifying: boolean, text: string}>({
    modifying: false,
    text: message,
  }) 
  const dispatch = useDispatch();
  const checkItem = () =>{
    dispatch(modifyItem({ index, newList: { 
      message,
      date,
      check: !check,
     } }))
  }
  const showInput = () =>{
    setnewMessage({...newMessage, modifying: true});
  }
  const setCurrentMessage = (e: any) =>{
    setnewMessage({...newMessage, text: e.target.value});
  }
  const newCurrentMessage = (e:any) =>{
    e.preventDefault();
    if (newMessage.text.length>0) {

      dispatch(modifyItem({ index, newList: { 
        check,
        date,
        message: newMessage.text
       } }))
      setnewMessage({modifying: false, text: newMessage.text});
    }
  }
  const deleteSelectedItem = () =>{
    dispatch(deleteItem(index));
  }
  return (
  <motion.li 
  initial={{ opacity: 0, y: 50, scale: 0.3}}
  animate={!check ? { opacity: 1, y: 0, scale: 1} : { opacity: 1, y: 0, scale: 1, backgroundColor: "var(--white-dark)"}}
  whileTap={{scale: 0.9}}
  transition={{ duration: 0.2 }}
  layout
  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
  className='contListItem'>
    <label className='contListItem__checkbox' htmlFor={`${message}-${index}`}>
      <input readOnly checked={check} type="checkbox" id={`${message}-${index}`}/>
      <span onClick={checkItem} className='contListItem__checkbox--check'></span>
    </label>
    {newMessage.modifying ? 
    <form onSubmit={newCurrentMessage} className='contListItem__setMessage'>
      <input type="text" autoFocus onChange={setCurrentMessage} name="" value={newMessage.text}/>
      <input type="submit" value="OK"/>
    </form>
    :
      <p
        onClick={showInput}
        className="contListItem__message"
        style={{
          textDecoration: check ? "line-through" : "none",
        }}
      >{message}</p>
    }
    <img onClick={deleteSelectedItem} width={25} src={trash} className="contListItem__trash"/>
  </motion.li>
  )
}

export default ItemList