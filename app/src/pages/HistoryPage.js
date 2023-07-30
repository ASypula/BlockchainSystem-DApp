import React, {useState} from 'react';
import ShipRecordsTable from '../components/ShipRecordsTable';
import ShipsList from '../components/ShipsList';
 


const HistoryPage = () => {

    const [chosenShip, setShip] = useState("");
    const handleChangeShip = (e) => setShip(e.target.value);


    return (
        <div className="page">
            <h1 className='title'>HISTORY</h1>
            <label>
                Ship:
            </label>
            <div>
                <ShipsList value={chosenShip} handleChange={handleChangeShip} />
            </div>
            <div >
            <ShipRecordsTable shipName={chosenShip}/>
            </div>
        </div>
    );
}

export default HistoryPage;