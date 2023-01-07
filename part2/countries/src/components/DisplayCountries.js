import SmallViewCountry from './SmallViewCountry.js'
import Country from './Country.js'

const DisplayCountries = ({countries}) => {
    if (countries.length <= 0) {
        return
    }

    if (countries.length > 10) {
        return (
            <div>
                Too many countries, specify another filter
            </div>
        )
    }

    if (countries.length > 1) {
        return (
            <div>
                {countries.map(country => <SmallViewCountry key={country.name.common} country={country}/>)}
            </div>
        )
    }

    const country = countries[0]
    return (
        <Country country={country}/>
    )
}

export default DisplayCountries