import React from "react"

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.name1} exercises={props.exercises1} />
      <Part part={props.name2} exercises={props.exercises2} />
      <Part part={props.name3} exercises={props.exercises3} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
        {props.part} {props.exercises}
      </p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.tot}</p>
    
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  } 

  return (
    <div>
      <Header course={course} />
      <Content name1={part1.name} exercises1={part1.exercises} 
        name2={part2.name} exercises2={part2.exercises} 
        name3={part3.name} exercises3={part3.exercises} />
      <Total tot={part1.exercises + part2.exercises + part3.exercises} />
      </div>
  )
}

export default App