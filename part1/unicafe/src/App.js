import { useState } from 'react'

const Button = ({clickevent, text}) => (
  <button onClick = {clickevent}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <>
    <td>{text} </td><td>{value}</td>
  </>
)

// a proper place to define a component
const Statistics = (props) => {
  if (props.stats.good == 0 && props.stats.neutral == 0 && props.stats.bad == 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <StatisticLine text = "good" value = {props.stats.good}/>
          </tr>
          <tr>
            <StatisticLine text = "neutral" value = {props.stats.neutral}/>
          </tr>
          <tr>
            <StatisticLine text = "bad" value = {props.stats.bad}/>
          </tr>
          <tr>
            <StatisticLine text = "all" value = {props.stats.all}/>
          </tr>
          <tr>
            <StatisticLine text = "average" value = {props.stats.average}/>
          </tr>
          <tr>
            <StatisticLine text = "positive" value = {props.stats.positiveRate}/>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const totalFeedbacks = good + neutral + bad
  const totalScore = good - bad
  let average
  let positiveRate
  if (totalFeedbacks == 0) {
    average = 0
    positiveRate = 0
  } else {
    average = totalScore / totalFeedbacks
    positiveRate = (good / totalFeedbacks * 100)
  }
  positiveRate = positiveRate + " %"

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: totalFeedbacks,
    average: average,
    positiveRate: positiveRate
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickevent = {() => setGood(good + 1)} text = "good" />
      <Button clickevent = {() => setNeutral(neutral + 1)} text = "neutral" />
      <Button clickevent = {() => setBad(bad + 1)} text = "bad" />
      <Statistics stats = {stats} />
    </div>
  )
}

export default App
