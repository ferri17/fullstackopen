import { useState } from 'react'

const TitleText = ({text}) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}

const Button = ({onClick, text}) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <>
      <tr>
        <td>{text}</td><td>{value}</td>
      </tr>
    </>
  )

}

const Statistics = ({title, good, neutral, bad}) => {
  const all = good + bad + neutral

  if (!all)
    return (
    <>
      <TitleText text={title}></TitleText>
      <p>No feedback given</p>
    </>)
  return (
    <>
      <TitleText text={title}></TitleText>
      <table>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value ={all} />
        <StatisticLine text="average" value ={(good - bad) / all} />
        <StatisticLine text="positive" value ={good / all * 100 + '%'}/>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <TitleText text="give feedback"></TitleText>
      <div>
        <Button text="good" onClick={() => setGood(good + 1)}/>
        <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
        <Button text="bad" onClick={() => setBad(bad + 1)}/>
      </div>
      <Statistics title="statistics" good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App