import React, { useState } from 'react'
import Form from './Form'
import Table from './Table'

export default function FormData() {

    const [formData, setFormData] = useState([]);

    return (
        <>
            <Form formData={formData} setFormData={setFormData}/>

            <Table formData={formData} setFormData={setFormData}/>
        </>
    )
}
