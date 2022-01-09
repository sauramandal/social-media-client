import { useState } from 'react'

const useForm = (initialState = {}, cb) => {
    const [formData, setFormData] = useState(initialState)

    const onChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        cb()
    }

    return { formData, onChange, onSubmit }
}

export { useForm }
