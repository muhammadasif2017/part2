const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ total }) => <p><b>total of {total} exercises</b></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);
  return (
    <>
      {parts.map((part) => <Part key={part.id} part={part}/>)}
      <Total total={total}/>  
    </>
  );
};

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <>
      <Header name={name}/>
      <Content parts={parts}/>
    </>
  );
};

export default Course;