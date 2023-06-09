import React from "react";


const AdminActionBtns = () => {
    return (
        <div className="bg-light">
            <div className="container">
                <div className="row pb-3">
                    <div className="col-md-4 mb-1 my-1">
                        <button className="btn btn-outline-info btn-block"
                        data-bs-toggle='modal'
                        data-bs-target='#addCategoryModal'
                        >
                            <i className="fas fa-plus">Add Category</i>
                        </button>
                    </div>

                    <div className="col-md-4 mb-1 my-1">
                        <button className="btn btn-outline-warning btn-block" data-bs-toggle='modal' data-bs-target='#addFoodModal'>
                            <i className="fas fa-plus">Add Food</i>
                        </button>
                    </div>

                    <div className="col-md-4 mb-1 my-1">
                        <button className="btn btn-outline-success btn-block">
                            <i className="fas fa-money-check-alt">View Orders</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default AdminActionBtns;