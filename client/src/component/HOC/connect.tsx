import React from "react";
import { log, debug } from "../../constans";

export interface typedatawrapper {
  log: (value: any) => void;
  debug: boolean;
}

export interface userall {
    user:any
  }

// export default function connect<it>(Component: React.ComponentType<it>){
//    return function (prop:Omit<it,keyof typedatawrapper>) {
//        return(<Component  {...(prop as it)} log={log} debug={debug}/>)
//    }
// }

export default function connect<p>(injectprop:p) {
  return function <it>(Component: React.ComponentType<it & p>) {
    return function (props: Omit<it, keyof p>) {
      return <Component {...(props as it &{})} {...injectprop} />;
    };
  };
}
