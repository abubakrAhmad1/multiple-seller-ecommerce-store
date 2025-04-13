import { useRef } from "react"

export default function AddProducts() {


    const searchRef = useRef();
    return (
        <div>
            <input type="search" ref ={searchRef}/>
            <button onClick>Search</button>
        </div>
    )
}