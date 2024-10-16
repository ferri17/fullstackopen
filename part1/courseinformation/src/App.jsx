import { useState } from "react"

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
  <>
    <p>{props.title} {props.number}</p>
  </>
)
  
}

const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part title={props.parts[0].name} number={props.parts[0].exercises}/>
      <Part title={props.parts[1].name} number={props.parts[1].exercises}/>
      <Part title={props.parts[2].name} number={props.parts[2].exercises}/>
    </>
  )
}

const Total = (props) => {
  let totalExercises = 0;

  props.parts.forEach( (item) => {
    totalExercises += item.exercises;
  })
  return (
    <>
      <p>Number of exercises {totalExercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Counter = () => {
    const [counter, setCounter] = useState(0);
    return (
      <>
        <h1>{counter}</h1>
        <button onClick={() => setCounter(counter + 1)}>Add</button>
        <button onClick={() => setCounter(counter - 1)}>Substract</button>
      </>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <Counter />
    </div>
  )
}

export default App