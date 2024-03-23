const calculateGrade = score => {
  if (score === null || score === undefined || typeof score !== 'number') {
    return null;
  }

  const percentage = parseInt(score);

  let grade = null;
  let remarks = null;

  if (percentage >= 75) {
    grade = 'A';
  } else if (percentage >= 65 && percentage < 75) {
    grade = 'B';
  } else if (percentage >= 50 && percentage < 65) {
    grade = 'C';
  } else if (percentage >= 35 && percentage < 50) {
    grade = 'S';
  } else if (percentage < 35) {
    grade = 'F';
  }

  if (score >= 90) {
    remarks = "Outstanding! You've mastered this quiz. Well done!";
  } else if (score >= 80 && score <= 89) {
    remarks = "Great job! You've excelled in this quiz.";
  } else if (score >= 70 && score <= 79) {
    remarks = "Good effort! You've passed the quiz.";
  } else if (score >= 60 && score <= 69) {
    remarks = "You've passed, but there's potential for improvement.";
  } else if (score < 60) {
    remarks = "Learning is a journey. Keep going, and you'll get there.";
  }

  return {
    grade,
    remarks,
  };
};

export default calculateGrade;
