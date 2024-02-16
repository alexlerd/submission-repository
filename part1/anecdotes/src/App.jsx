import { useState } from "react";

const useRandom = (array) => {
  const [element, setElement] = useState(array[0]);
  const randomize = () => {
    const randomIndex = Math.floor(Math.random() * array.length);
    setElement(array[randomIndex]);
  };

  return [element, randomize];
};

const useMostVoted = (array) => {
  const [votes, setVotes] = useState(new Array(array.length).fill(0));
  const vote = (index) => {
    const newVotes = [...votes];
    newVotes[index]++;
    setVotes(newVotes);
  };
  const maxIndex = votes.indexOf(Math.max(...votes));
  return [array[maxIndex], votes, vote];
};

const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [randomAnecdote, randomize] = useRandom(anecdotes);
  const [mostVotedAnecdote, votes, vote] = useMostVoted(anecdotes);
  const currentIndex = anecdotes.indexOf(randomAnecdote);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{randomAnecdote}</div>
      <p>has {votes[currentIndex]} votes</p>
      <Button label="vote" onClick={() => vote(currentIndex)} />
      <Button label="next anecdote" onClick={randomize} />
      <div>
        <h1>Anecdote with most votes</h1>
        <div>{mostVotedAnecdote}</div>
        <p>has {Math.max(...votes)} votes</p>
      </div>
    </div>
  );
};

export default App;
