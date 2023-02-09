import React from "react";
import { datatype } from "../../Type/Todo.type";
import connect from "../HOC/connect";
import {userall} from'../HOC/connect'

interface taskListItem extends userall{
  list: datatype[];
  removeItem:(idItem: string) => void
  editStart:  (idItem:string) => void
}

 function TaskList({ list,removeItem,editStart }: taskListItem) {
  return (
    <div>
      {list.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <button onClick={()=>editStart(item.id)}>sua</button>
          <button onClick={()=>removeItem(item.id)}>xoa</button>
        </div>
      ))}
    </div>
  );
}

export default connect({user:{name:'minh'}})(TaskList)
