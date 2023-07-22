import React from 'react';
 
const data = [
    { name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male" },
]

const shipDetails = ['Part', 'Action', 'Update', 'Description']

const HistoryPage = () => {
    return (
        <div className="page">
            <h1 className='title'>HISTORY</h1>
            <div >
            <table className="recordsTable">
                <tr>
                    {shipDetails.map(function(label){
                        return (<th>{label}</th>)
                     })}
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.age}</td>
                            <td>{val.gender}</td>
                            <td>{val.gender}</td>
                        </tr>
                    )
                })}
            </table>
            </div>
        </div>
    );
}

export default HistoryPage;