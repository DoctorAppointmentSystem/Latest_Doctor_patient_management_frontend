import React from 'react'

function PatientTable() {
    return (
        <table className=" w-full text-primary">
            <thead className="border-1 border-black">
                <th className="border-1 border-black p-2">Token</th>
                <th className="border-1 border-black p-2">Name</th>
                <th className="border-1 border-black p-2">Age</th>
                <th className="border-1 border-black p-2">unknown</th>
                <th className="border-1 border-black p-2">unknown</th>
            </thead>
            <tbody>
                <tr className="border-1 border-black">
                    <td className="border-1 border-black p-2">Token</td>
                    <td className="border-1 border-black p-2">Name</td>
                    <td className="border-1 border-black p-2">Age</td>
                    <td className="border-1 border-black p-2">unknown</td>
                    <td className="border-1 border-black p-2">unknown</td>
                </tr>
            </tbody>
        </table>
    )
}

export default PatientTable