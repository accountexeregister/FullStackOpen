import Area from './Area.js'
import Capital from './Capital.js'
import Languages from './Languages.js'
import Flag from './Flag.js'

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
                {countries.map(country => <div key = {country.name.common}>{country.name.common}</div>)}
            </div>
        )
    }

    const country = countries[0]
    return (
        <div>
            <h1>{country.name.common}</h1>
            <Capital country={country}/>
            <Area country={country}/>
            <h2>languages:</h2>
            <Languages country={country} />
            <Flag country={country} />
        </div>
    )
}

export default DisplayCountries