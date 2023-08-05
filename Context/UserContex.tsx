import { createContext, useState } from 'react';
type userContex = {
 
    userMail:{mail:string,password:string,name:string,mobile:string}[],
   setUserMail: Function,
   totalCartValue1:number,
   setTotalCartValue:Function,
   setIsAdminLogged:Function,
   isAdminLogged:boolean,
}
export const  userList = createContext<userContex>(undefined);

const UserContex = ({ children }) => {
 
   const [userMail,setUserMail] = useState([]);
   const [isAdminLogged,setIsAdminLogged] = useState(false)
   const [totalCartValue1,setTotalCartValue]=useState(0)
   return (
      <userList.Provider value={{userMail,setUserMail,totalCartValue1,setTotalCartValue,isAdminLogged,setIsAdminLogged}} >
         {children}
      </userList.Provider>
   )
}
export { UserContex }