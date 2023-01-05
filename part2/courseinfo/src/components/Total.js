const Total = ({parts}) => {
    const total = parts.reduce((sum, currentPart) => {
        return (sum + currentPart.exercises)
    }, 0)

    return (<p><strong>total of {total} exercises</strong></p>)
}

export default Total