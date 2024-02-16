import { useState } from "react";

const App = () => {
  // Define state variables for click counts
  const [goodClicks, setGoodClicks] = useState(0);
  const [neutralClicks, setNeutralClicks] = useState(0);
  const [badClicks, setBadClicks] = useState(0);
  const [showStatistics, setShowStatistics] = useState(false);

  // Function to handle feedback clicks
  const handleFeedbackClicks = (type) => {
    switch (type) {
      case "good":
        setGoodClicks((prevGoodClicks) => prevGoodClicks + 1);
        break;
      case "neutral":
        setNeutralClicks((prevNeutralClicks) => prevNeutralClicks + 1);
        break;
      case "bad":
        setBadClicks((prevBadClicks) => prevBadClicks + 1);
        break;
      default:
        break;
    }

    // Show statistics after feedback is collected
    setShowStatistics(true);
  };

  // Calculate total feedback count
  const totalFeedback = goodClicks + neutralClicks + badClicks;

  // Calculate average score
  const averageScore =
    totalFeedback === 0 ? 0 : (goodClicks - badClicks) / totalFeedback;

  // Calculate positive percentage
  const positivePercentage =
    totalFeedback === 0 ? 0 : (goodClicks / totalFeedback) * 100;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleFeedbackClicks={handleFeedbackClicks} />
      <h1>statistics</h1>

      {showStatistics && totalFeedback > 0 && (
        <Statistics
          goodClicks={goodClicks}
          neutralClicks={neutralClicks}
          badClicks={badClicks}
          totalFeedback={totalFeedback}
          averageScore={averageScore}
          positivePercentage={positivePercentage}
        />
      )}

      {!showStatistics && totalFeedback === 0 && <p>No feedback given</p>}
    </div>
  );
};

const Button = ({ handleFeedbackClicks }) => {
  // Define event handler functions to update click counts
  const handleGoodClicks = () => {
    handleFeedbackClicks("good");
  };

  const handleNeutralClicks = () => {
    handleFeedbackClicks("neutral");
  };

  const handleBadClicks = () => {
    handleFeedbackClicks("bad");
  };

  return (
    <div>
      <button onClick={handleGoodClicks}> good </button>
      <button onClick={handleNeutralClicks}> neutral </button>
      <button onClick={handleBadClicks}> bad </button>
    </div>
  );
};

const Statistics = ({
  goodClicks,
  neutralClicks,
  badClicks,
  totalFeedback,
  averageScore,
  positivePercentage,
}) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <StatisticLine text="good" value={goodClicks} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="neutral" value={neutralClicks} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="bad" value={badClicks} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="total feedback" value={totalFeedback} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="average score" value={averageScore} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine
                text="positive percentage"
                value={positivePercentage + "%"}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      <p>
        {text}: {value}
      </p>
    </div>
  );
};

export default App;
