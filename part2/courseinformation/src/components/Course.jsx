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
  
  const Total = ({parts}) => {
	const totalExercises = parts.reduce( (acc, next) => acc + next.exercises, 0);
	return (
	  <p><b>total of {totalExercises} exercises</b></p>
	)
  }
  
  const Content = ({parts}) => {
  
	return (
	  <>
		{parts.map( (part) =>
		  <Part key={part.id} title={part.name} number={part.exercises}/>
		)
		}
	  </>
	)
  }
  
  const Course = ({courses}) => {
	return (
	  <>
		{courses.map(course =>
		  <div key={course.id}>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		  </div>
		)}
	  </>
	)
  }

export default Course