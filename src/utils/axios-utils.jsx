import axios from 'axios'

const client = axios.create({baseURL: 'http://localhost:4000'})

export const request = ({...options}) => {
    //client.defaults.headers.common.Authorization = `Bearer token` // add custom headers
    //  client.defaults.headers.common['x-apikey'] = '59a7ad19f5a9fa0808f11931'
    //client.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
    //client.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS'

    const onSuccess = response => response // handle success
    const onError = error => { // handle errors
        // optionaly catch errors and add additional logging here
        return error
    }

    return client(options).then(onSuccess).catch(onError)
}