const Header = ({ course }) => {
  return (
    <div key={course.id}>
      <h1>{course.name}</h1>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <div key={part.id}>
          <p>
            {part.name} {part.exercises}
          </p>
        </div>
      ))}
    </div>
  );
};
const Course = ({ course }) => {
  const grandTotal = course.parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />

      <p>
        <b>total of {grandTotal} exercises</b>
      </p>
    </div>
  );
};

export default Course;
