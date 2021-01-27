import React from "react";
const ClientContent = ({ children }) => {
    return (
        <div
            className="client-contain"
            data-simplebar
        >
            <div>
                {children}
            </div>
        </div>
    );
};


export default ClientContent;
