const Flag = ({country}) => (
    <img src = {country.flags.svg} alt={`Flag of ${country.name.common}`} width = "200px" height = "200px" />
)

export default Flag