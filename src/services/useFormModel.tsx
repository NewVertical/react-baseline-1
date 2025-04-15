import { ChangeEvent, useEffect, useState } from "react"

export function useFormModel<T>(initialState: any) {
    const [formState, setFormState] = useState<T>(initialState)
    const change = (e: ChangeEvent<HTMLInputElement>) => {
        updateValue(e.target.name, e.target.value)
    }
    const changeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        updateValue(e.target.name, e.target.value)
    }
    const changeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateValue(e.target.name, e.target.value)
    }
    const updateValue = (name: string, value: string) => {
        setFormState({
            ...formState,
            [name]: value,
        })
    }
    return {
        formState,
        change,
        changeSelect,
        changeTextArea,
        setFormState,
        updateValue,
    }
}

export const useMultiFormModel = (initialState: any[], onChange: (items: any[]) => void = () => {}) => {
    const [formState, setFormState] = useState(initialState)

    useEffect(() => {
        setFormState(initialState)
    }, [initialState])

    const change = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        updateValue(e.target.name, e.target.value, index)
    }
    const changeSelect = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
        updateValue(e.target.name, e.target.value, index)
    }
    const updateValue = (name: string, value: string, index: number) => {
        const tmpData = [...formState]
        tmpData[index][name] = value
        setFormState(tmpData)
        onChange(tmpData)
    }
    const addRow = (index: number, data: any) => {
        const tmpData = [...formState]
        tmpData.splice(index + 1, 0, data)
        setFormState(tmpData)
        onChange(tmpData)
    }
    const removeRow = (index: number) => {
        const tmpData = [...formState]
        tmpData.splice(index, 1)
        setFormState(tmpData)
        onChange(tmpData)
    }
    return {
        formState,
        change,
        changeSelect,
        updateValue,
        addRow,
        removeRow,
    }
}
