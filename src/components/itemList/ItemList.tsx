import { FC, useState } from 'react'

interface PropsItemList{
    value: string;
}

const ItemList:FC<PropsItemList> = ({value}) => {

  return (
    <li>
        {value}
    </li>
  )
}

export default ItemList