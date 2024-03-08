// Quiz.js
import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { quizData } from "./data";
import Landing from "./Landing";

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        भगवान राम Quiz
      </Typography>
      {/* Replace the following URL with the path to your logo image */}
      <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/lord-rama-2120408-1784750.png" alt="Logo" style={{ height: 40, marginRight: 10 }} />
    </Toolbar>
  </AppBar>
);

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [incorrectlyAnswered, setIncorrectlyAnswered] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNextQuestion = () => {
    // Check if the selected option is correct and update the score
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }  else {
      // Store the incorrectly answered question
      setIncorrectlyAnswered((prev) => [
        ...prev,
        {
          question: quizData[currentQuestion].question,
          selectedAnswer: selectedOption,
          correctAnswer: quizData[currentQuestion].correctAnswer,
        },
      ]);
    }

    // Move to the next question or show results if all questions are answered
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    } else {
      setShowResult(true);
    }
  };

  const handleShareResults = () => {
    // Check if the Web Share API is available
    if (navigator.share) {
      navigator.share({
        title: "भगवान राम Quiz Score",
        text: "भगवान राम Quiz में मेरा स्कोर " + score + "/10! आप भी ट्राई करें - https://lordramquiz.in",
        icon: "https://cdn.iconscout.com/icon/premium/png-256-thumb/lord-rama-2120408-1784750.png",
      })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert("Sharing results: " + score + "/10");
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div>
      <Header />

      {/* Conditional rendering based on quizStarted state */}
      {quizStarted ? (
        <Card >
          <CardContent>
            {showResult ? (
              <div>
                <h3>आपका स्कोर है: {score}/10</h3>
                <Button variant="contained" color="primary" onClick={handleShareResults}>
                  शेयर करें
                </Button>

                {/* Display incorrectly answered questions */}
                {incorrectlyAnswered.length > 0 && (
                  <div style={{ marginTop: 20 }}>
                    <h3>गलत उत्तर दिए गए प्रश्न:</h3>
                    <ul>
                      {incorrectlyAnswered.map((item, index) => (
                        <>
                          <li key={index}>
                            <strong>प्रश्न:</strong> {item.question}
                            <br />
                            <strong>आपका उत्तर:</strong> {item.selectedAnswer}
                            <br />
                            <strong>सही उत्तर:</strong> {item.correctAnswer}
                          </li>
                          <br />
                        </>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            ) : (
              <div>
                <h3>{quizData[currentQuestion].question}</h3>
                <FormControl component="fieldset">
                  <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                    {quizData[currentQuestion].options.map((option, index) => (
                      <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                    ))}
                  </RadioGroup>
                </FormControl>
                <div style={{ marginTop: 20 }}>
                  <Button variant="contained" color="primary" onClick={handleNextQuestion}>
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Landing onStartQuiz={handleStartQuiz} />
      )}

    </div>
    
  );
};

export default Quiz;
