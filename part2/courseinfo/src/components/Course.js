import Header from './Header.js'
import Content from './Content.js'

const Course = ({course}) => {
    return (
        <div>
            <Header courseName={course.name}/>
            <Content parts={course.parts} />
        </div>
    )
}

export default Course;