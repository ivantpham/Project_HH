import { useEffect } from "react"
import { useSelector } from "react-redux"
import FilterProduct from "../components/FilterProduct"
import AllProducts from "../components/AllProducts"


export default function PageHome() {
   const author = useSelector(state => state.author)
   useEffect(() => {
      console.log('newState Author', author);
   }, [author])
   return (
      <>
         <h2 className="text-red-700">Home Page</h2>
         {/* <FilterProduct /> */}
         <AllProducts />
      </>
   )
}