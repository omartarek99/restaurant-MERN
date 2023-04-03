import React, {Fragment, useState} from "react";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { createCategory } from "../API/category";
import isEmpty from "validator/lib/isEmpty";

const AdminCatModal = () => {

    /* COMPONENT STATE PROPERTIES */
    const [category, setCategory] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);




    const handleMessages = (evt) => {
        setErrorMsg('');
        setSuccessMsg('');
    }


    const handleCategoryChange = (evt) => {
        setErrorMsg('');
        setSuccessMsg('');


        setCategory(evt.target.value);
        

    };
    const handleCategorySubmit = (evt) => {

        evt.preventDefault();

        if (isEmpty(category)) {
            setErrorMsg('Please enter a category');

        } else {
            const data = { category };

            setLoading(true);

            createCategory(data)
                    .then(response => {
                        setLoading(false);
                        setSuccessMsg(response.data.successMessage);
                        setCategory('');
                    })
                    .catch(err => {
                        setLoading(false);
                        setErrorMsg(err.response.data.errorMessage)
                    })

        }

    };

    return (
        <div id="addCategoryModal" className='modal' onClick={handleMessages}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                <form onSubmit={handleCategorySubmit}>
                    <div className='modal-header bg-info text-white'>
                        <h5 className="modal-title">Add Category</h5>
                        <button className="close" data-bs-dismiss="modal">
                            <span data-dismiss="modal">
                                <i className="fas fa-times">
                                    </i></span>
                        </button>
                        </div>  
                    <div className="modal-body my-2">
                        {errorMsg && showErrorMsg(errorMsg)}
                        {successMsg && showSuccessMsg(successMsg)}

                        {
                            
                            loading ? (
                                <div className="text-center">{showLoading()}</div>
                                
                                ) : (
                                <Fragment>
                                    <label class='text-secondary'>Category</label>
                                    <input name='category'
                                    value={category} 
                                    type='text'
                                    class="form-control" 
                                    onChange={handleCategoryChange}/>

                                </Fragment>

                               

                            )
                        }
                        
                            
                        
                        </div>
                    <div className="modal-footer">
                        <button className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                        <button type='submit'className="btn btn-info">Submit</button>
                        </div>
                </form>

                </div>
                
            </div>
            
        </div>
    );
}

export default AdminCatModal