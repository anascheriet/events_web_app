import React, { useState } from 'react'

export const EventsFilterBar = ({ setSearchedEName, searchedEName, setSearchedECountry, searchedECountry, setSearchedECity, searchedECity }) => {


    //Clear filters
    const clearFilters = () => {
        setSearchedECity("");
        setSearchedECountry("");
        setSearchedEName("");

        //console.table(searchedECountry, searchedEName);
    }




   
    return (
        <div className="flex flex-row space-x-10 items-center">
            <div className="styled-input wide multi">
                <div >
                    <input type="text" value={searchedEName} name="fn" id="fn" autoComplete="off" data-placeholder-focus="false" required onChange={(e) => setSearchedEName(e.target.value)} />
                    <label>Event Name</label>
                </div>
                <div>
                    <input type="text" value={searchedECountry} name="fn" id="fn" autoComplete="off" data-placeholder-focus="false" required onChange={(e) => setSearchedECountry(e.target.value)} />
                    <label>Country</label>
                </div>

                <div >
                    <input type="text" value={searchedECity} name="ln" id="ln" autoComplete="off" data-placeholder-focus="false" required
                        onChange={(e) => setSearchedECity(e.target.value)} />
                    <label>City</label>
                </div>
            </div>
            <div >
                <button onClick={clearFilters} className="bg-pink-500 hover:bg-pink-700 text-white text-md rounded-lg w-32 h-20 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50">Clear</button>
            </div>
        </div>
    )
}
