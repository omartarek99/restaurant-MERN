import React from "react";


const showHeader =  () => {
    return (
        <div className="bg-dark text-white">
            <div className="container">
                <div className='row'>
                    <div className="col-md-6 ">
                        <h1>
                            <i className="fas fa-home"> Dashboard</i> 
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default showHeader;