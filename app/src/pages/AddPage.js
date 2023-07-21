import React from 'react';
import AddButton from '../components/AddButton'
import './style.css';
 
const AddPage = () => {
    return (
        <div className="page">
            <h1>ADD</h1>
            <div class="btn-group-vertical">
                <AddButton text="Add ship" />
                <AddButton text="Add part" />
                <AddButton text="Add record" />
            </div>
        </div>
    );
}

export default AddPage;