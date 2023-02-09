import Input from "../Input";
import TaskList from "../TaskList";
import { datatype } from "../../Type/Todo.type";
import { useEffect, useState } from "react";

interface callbackcustom {
  (list: datatype[]): datatype[];
}

const customfunction = (handle: callbackcustom) => {
  const getlocoll = localStorage.getItem("listall");
  const resul = JSON.parse(getlocoll || "[]");
  const enforcement = handle(resul);
  localStorage.setItem("listall", JSON.stringify(enforcement));
};
export default function Todo() {
  const [list, setList] = useState<datatype[]>([]);
  const [curen, setCuren] = useState<datatype | null>(null);

  useEffect(() => {
    const getlocoll = localStorage.getItem("listall");

    const resul: datatype[] = JSON.parse(getlocoll || "[]");
    setList(resul);
  }, []);

  const addListItem = (name: string) => {
    const handle = () => {
      const task: datatype = {
        name,
        id: new Date().toISOString(),
        done: false,
      };
      return [...list, task];
    };
    setList(handle);

    customfunction(handle);
  };

  const removeItem = (idItem: string) => {
    const handle = (list: datatype[]) => {
      return list.filter((item) => item.id !== idItem);
    };
    setList(handle);

    customfunction(handle);
  };

  const editStart = (idItem: string) => {
    const curenitem = list.find((item) => item.id === idItem);
    if (curenitem) {
      setCuren(curenitem);
    }
  };

  const editcuren = (name: string) => {
    setCuren((pre) => {
      if (pre) {
        return { ...pre, name };
      }
      return null;
    });
  };

  const editActive = () => {
    const handle = (list: datatype[]) => {
      return list.map((item) => {
        if (item.id === (curen as datatype).id) {
          return curen as datatype;
        }
        return item;
      });
    };
    setList(handle);
    setCuren(null);
    customfunction(handle);
  };

  return (
    <div>
      <Input
        editActive={editActive}
        editcuren={editcuren}
        curen={curen}
        addListItem={addListItem}
        
      />
      <TaskList editStart={editStart} removeItem={removeItem} list={list} />
    </div>
  );
}
