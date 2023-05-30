import { Outlet, useNavigate, useResolvedPath } from "react-router-dom";
import MenuHeader from "@Layout/MenuHeader";
import Footer from "@Layout/Footer";
import firebase from 'firebase/compat/app';
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAuthor } from "reduxSlice/slice";


export default function MainLayout() {
   const [isSignedIn, setIsSignedIn] = useState(false)
   const { pathname } = useResolvedPath()
   const navigate = useNavigate()
   const dispatch = useDispatch();



   console.log('pathname', pathname);
   console.log('update code deploy');

   useLayoutEffect(() => {


   }, []);



   return (
      <>
         <header>
            <MenuHeader />
         </header>
         <main>
            <div className="mx-4">
               {/* {(isSignedIn || pathname ==='/sign-up' || pathname ==='/sign-in' ) && <Outlet />} */}
               <Outlet />
            </div>
         </main>
         <Footer />

      </>
   )
}