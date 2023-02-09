import { useState } from "react";
import { debug, log } from "../../constans";
import { datatype } from'../../Type/Todo.type'
import connect from '../HOC/connect'
import{typedatawrapper} from'../HOC/connect'

interface inputType extends typedatawrapper{
  addListItem: (name: string) => void;
  curen:datatype|null
  editcuren:(name: string) => void
  editActive:() => void
}

 function Input({ addListItem, curen ,editcuren,editActive}: inputType) {
  const [nameItem, setNameItem] = useState<string>("");

  const handlechange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(curen){
        editcuren(e.target.value)
       
    }else{
        return setNameItem(e.target.value)
    }
  }

  const handleSubmit=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault()
    if(curen){
        editActive()
        if(nameItem){
            return setNameItem('')
        }
    }else{
        addListItem(nameItem)
        setNameItem('')
    }
  }
  return (
    <div>
      <input
        value={ curen ? curen.name :nameItem }
        type="text"
        onChange={(e) =>handlechange(e) }
      />
      <button onClick={(e)=>handleSubmit(e)}>{curen ? 'sua' :'them'}</button>
    </div>
  );
}

export default connect({debug:debug,log:log})(Input)

