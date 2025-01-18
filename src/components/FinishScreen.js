export default function FinishScreen({ points, maxPossiblePoints , highscore}) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage > 90) {
    emoji = "🎉";
  } else if (percentage >= 80) {
    emoji = "👏";
  } else {
    emoji = "😬";
  }

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
    </>
  );
}
