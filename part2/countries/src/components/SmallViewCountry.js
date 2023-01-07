import {useState} from 'react'
import Country from './Country.js'

const showCountry = (show, country) => {
    if (!show) {
        return
    }

    return (<Country country={country}/>)

}
const SmallViewCountry = ({country}) => {
    const [show, setShow] = useState(false)
    return (
        <div key = {country.name.common}>{country.name.common} 
        <button type="button" onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}
        </button>
        {showCountry(show, country)}
        </div>
    )
}

export default SmallViewCountry