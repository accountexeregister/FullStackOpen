import { useState, useEffect} from 'react'
import axios from 'axios'
import DisplayCountries from './components/DisplayCountries.js'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState(countries)

  const getCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }

  useEffect(getCountries, [])

  const updateFilter = (event) => {
    const newFilter = event.target.value
    filterCountries(newFilter)
    setFilter(newFilter)
  }

  const filterCountries = (newFilter) => {
    const filteredCountries = countries.filter(country => 
      country.name.common.toLowerCase().trim().includes(newFilter.toLowerCase().trim()))
    setFilteredCountries(filteredCountries)
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={updateFilter}/>
      </div>
      <DisplayCountries countries={filteredCountries}/>
    </div>
  )
}

export default App;
