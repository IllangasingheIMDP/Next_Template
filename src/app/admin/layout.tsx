import React from "react";
import { Providers } from "@/GlobalRedux/provider";
export default function AdminLayout({
    children, // This will be the page content
  }: {
    children: React.ReactNode;
  }) {
    return (
     
        
        
        
            
             <>{children}</>  
           
            
            
            
     
    );
  }