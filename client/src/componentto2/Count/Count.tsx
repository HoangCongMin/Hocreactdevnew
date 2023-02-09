import React, { useReducer } from 'react'
import reducer, {initState}from '../reduccer/reducer'
import {additem,giamcount,addeitem} from'../reduccer/Action'
export default function Count() {
    const [state,dispacth]=useReducer(reducer,initState)

    const handleadd=()=>{
        dispacth(additem())
    }

    const handlegiam=()=>{
        dispacth(giamcount())
    }

    const add3=()=>{
        dispacth(addeitem(3))
    }
    
  return (
    <div>{state.age}
    <button onClick={handleadd}>add</button>
    <button onClick={handlegiam}>giam</button>
    <button onClick={add3}>tang 3</button>
    </div>

  )
}
