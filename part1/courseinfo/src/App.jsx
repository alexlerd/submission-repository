//Header component
const Header = ({ course }) => {
  return (
    <div>
      <p>{course.name}</p>
    </div>
  );
};

//Part component
const Part = ({ name, exercises }) => {
  return (
    <p>
      {name}
      {exercises}
    </p>
  );
};
//Content component
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};
//Total component
const Total = ({ parts }) => {
  const totalExcecises =
    parts[0].exercises + parts[1].exercises + parts[2].exercises;
  return (
    <div>
      <p>Number of exercises: {totalExcecises}</p>
    </div>
  );
};
//App component
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React ",
        exercises: 10,
      },

      {
        name: "Using props to pass data ",
        exercises: 7,
      },

      {
        name: "State of a component ",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <h1>
        <Header course={course} />
      </h1>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
