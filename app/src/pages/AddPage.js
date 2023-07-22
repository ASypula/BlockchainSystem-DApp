import { React, useState } from 'react';
import AddShipForm from '../components/AddShipForm';
import AddButton from '../components/AddButton'
 
const AddPage = () => {

    const [isShown, setIsShown] = useState(false);
    const handleClick = event => {
        // 👇️ toggle shown state
        setIsShown(current => !current);
      };

    return (
        <div className="page">


            <button onClick={handleClick}>Click</button>
            {/* 👇️ show elements on click */}
            {isShown && (
            <div>
                <AddShipForm/>
            </div>
            )}



            <h1 className='title'>ADD</h1>
            <div class="btn-group-vertical">
                <AddButton text="Add ship" />
                <AddButton text="Add part" />
                <AddButton text="Add record" />
            </div>
        </div>
    );
}

export default AddPage;