import React, { useState } from 'react'
import Form from './Form'
import Table from './Table'

export default function FormData() {

    const [formData, setFormData] = useState([1]);

    return (
        <>
            <Form/>

            <Table formData={formData}/>
        </>
    )
}
