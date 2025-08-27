import React from 'react'

export default function Table({formData, setFormData}) {
    return (
        <>
            <div class="table-container">
                <h2>User Data</h2>
                <table id="data-table" border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody id="fetch-data">
                        {
                            formData.length > 0
                            ?
                                formData.map((v,i) => {
                                    return(
                                        <TableData key={i} data={v} index={i} formData={formData} setFormData={setFormData}/>
                                    )
                                })
                            :
                            <tr>
                                <td colSpan={7}>No Record Found !!</td>
                            </tr>
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}


const TableData = ({data, index, formData, setFormData}) => {

    const deleteRecord = (index) => {
        if(confirm('Are you sure you want to delete ?')){
            const data = formData.filter((v,i) => {
                if(index != i){
                    return v;
                }
            }) 

            setFormData([...data]);
        }
    }

    return(
        <tr>
            <td>{index+1 }</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.mobile_number}</td>
            <td>{data.country_name}</td>
            <td>{data.state_name}</td>
            <td><button onClick={ () => deleteRecord(index) }> Delete </button></td>
        </tr>
    )
}