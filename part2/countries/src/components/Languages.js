import Language from './Language.js'

const printLanguages = (country) => {
    let languageArray = []
    for (const language in country.languages) {
        languageArray = languageArray.concat(country.languages[language])
    }

    return languageArray.map(language => <Language key={language} language={language} />)
}

const Languages = ({country}) => (
    <ul>
        {printLanguages(country)}
    </ul>
)

export default Languages