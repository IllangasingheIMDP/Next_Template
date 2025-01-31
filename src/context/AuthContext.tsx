import {createContext,useContext,ReactNode, useState} from 'react';
type User={
    id:string;
    name:string;
    role:string;
} | null

type AuthContextType={
    user:User;
    login:(user:User)=>void;
    logout:()=>void;
}

const AuthContext=createContext<AuthContextType |undefined>(undefined);

export const AuthProvider=({children}:{children:ReactNode})=>{
    const [user,setUser]=useState<User>(null);
    const login=(userData:User)=> setUser(userData);
    const logout =()=> setUser(null);
    return (
        <AuthContext.Provider value={{user,login,logout}} >
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth=()=> {
    const context=useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used withing Authprovider");
        return context;
    }
};