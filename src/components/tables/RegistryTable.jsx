import React from 'react'

const RegistryTable = ({ registry }) => {
    return (
        <div className='registry-table'>
            <table>
                <thead>
                    <tr>
                        <th>Issue ID</th>
                        <th>Book Name</th>
                        <th>Reader ID</th>
                        <th>Issue Date</th>
                        <th>Expected Return Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {registry?.map(r => {

                        const issueDate = new Date(r?.issueDate).toLocaleDateString();
                        const expectedReturnDate = new Date(r?.expectedReturnDate).toLocaleDateString();
                        const returnDate = r?.returnDate ? new Date(r?.returnDate).toLocaleDateString() : "NA";

                        return (
                            <tr key={r?.issueId}>
                                <td>{r?.issueId}</td>
                                <td>{r?.BookInventory?.title}</td>
                                <td>{r?.readerId}</td>
                                <td>{issueDate}</td>
                                <td>{expectedReturnDate}</td>
                                <td>{returnDate}</td>
                                <td>{r?.issueStatus}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RegistryTable