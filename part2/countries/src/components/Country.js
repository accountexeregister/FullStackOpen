import Area from './Area.js'
import Capital from './Capital.js'
import Languages from './Languages.js'
import Flag from './Flag.js'

const Country = ({country}) => (
    <div>
        <h1>{country.name.common}</h1>
        <Capital country={country}/>
        <Area country={country}/>
        <h2>languages:</h2>
        <Languages country={country} />
        <Flag country={country} />
    </div>
)

export default Country