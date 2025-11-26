import axios, { Axios } from "axios";

const URL_API ="http://localhost:8080/api"

export const getAllPersonas = async () =>{
    const response = await axios.get(`${URL_API}/personas`)
    return response.data;
}

export const savePersona = async (persona) =>{
    const response = await axios.post(`${URL_API}/personas/save`,persona)
    return response.data;
}

export const findPersonId = async (id) =>{
    const  response = await axios.get(`${URL_API}/personas/find/${id}`)
    return response.data;
}