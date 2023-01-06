const Filter = ({filter, updateFilter}) => (
    <div>
        filter shown with <input value = {filter} onChange = {updateFilter}/>
    </div>
)

export default Filter