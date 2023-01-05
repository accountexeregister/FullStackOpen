import { useState } from 'react'

const Button = ({clickevent, text}) => (
  <button onClick = {clickevent}>
    {text}
  </button>
)

const DisplayFeedback = ({text, value}) => (
  <div>
    {text} {value}
  </div>
)

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


  return (
    <div>
      <h1>give feedback</h1>
      <Button clickevent = {() => setGood(good + 1)} text = "good" />
      <Button clickevent = {() => setNeutral(neutral + 1)} text = "neutral" />
      <Button clickevent = {() => setBad(bad + 1)} text = "bad" />
      <h1>statistics</h1>
      <DisplayFeedback text = "good" value = {good}/>
      <DisplayFeedback text = "neutral" value = {neutral}/>
      <DisplayFeedback text = "bad" value = {bad}/>
      <DisplayFeedback text = "all" value = {totalFeedbacks}/>
      <DisplayFeedback text = "average" value = {average}/>
      <DisplayFeedback text = "positive" value = {positiveRate}/>
    </div>
  )
}

export default App
