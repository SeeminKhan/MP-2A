import { useState } from "react";

import React from "react";
import { FaSearch } from "react-icons/fa";

export const SearchBar= () => {

    const [input, setInput] = useState("");

    return(
        <div className="w-[300] h-10 border-none rounded-lg px-4 shadow-md bg-white flex items-center bg-transparent">
            <input placeholder="Type to search..." 
            className="bg-transparent border border-black rounded-lg border-none h-full text-xl w-full ml-1 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ></input>
            <FaSearch id="search-icon" class="text-black"/>
        </div>
    );
}