import { useState } from 'react'

const DisplayAnecdote = ({anecdotes, votes, index}) => (
  <>
    <div>
        {anecdotes[index]}
    </div>
    <div>
      has {votes[index]} votes
    </div>
  </>
)

const DisplayDailyAnecdote = ({anecdotes, selected, votes, increaseVote, getRandomInt}) => (
  <div>
    <h1>Anecdote of the day</h1>
    <DisplayAnecdote anecdotes={anecdotes} votes={votes} index={selected}/>
    <button onClick = {increaseVote}>vote</button>
    <button onClick = {getRandomInt}>next anecdote</button>
  </div>
)

const DisplayHighestVoteAnecdote = ({anecdotes, votes}) => {
  let highestVotesIndex = votes[0]
  for (let i = 0; i < votes.length; i++) {
    if (votes[highestVotesIndex] < votes[i]) {
      highestVotesIndex = i
    }
  }

  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      <DisplayAnecdote anecdotes={anecdotes} votes={votes} index={highestVotesIndex} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const getRandomInt = () => {
     setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const increaseVote = () => {
    const newVotes = [...votes]
    newVotes[selected] = newVotes[selected] + 1
    setVotes(newVotes)
  }

  return (
    <>
      <DisplayDailyAnecdote anecdotes={anecdotes} selected={selected} votes={votes} increaseVote={increaseVote} getRandomInt={getRandomInt}/>
      <DisplayHighestVoteAnecdote anecdotes={anecdotes} votes={votes} />
    </>
  )
}

export default App