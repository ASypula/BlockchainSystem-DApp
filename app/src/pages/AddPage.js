import { React } from 'react';
import AddShipForm from '../components/AddShipForm';
import AddPartForm from '../components/AddPartForm';
import AddRecordForm from '../components/AddRecordForm';
 
const AddPage = ({addShip, addFunction}) => {

    return (
        <div className="page">

            <h1 className='title'>ADD</h1>

            <div class="btn-group-vertical">
                <AddShipForm text="Add ship" addFunction={addShip}/>
                <AddPartForm text="Add part" addFunction={addFunction} />
                <AddRecordForm text="Add record" addFunction={addFunction}/>
            </div>
        </div>
    );
}

export default AddPage;