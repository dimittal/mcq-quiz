// Landing.js
import React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";

const Landing = ({ onStartQuiz }) => (
  <Card style={{ marginTop: 20, maxWidth: 400 }}>
    <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h5" gutterBottom>
        Welcome to the भगवान राम Quiz
      </Typography>
      {/* Replace the following URL with the path to your landing image */}
      <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/lord-rama-2120408-1784750.png" alt="Landing" style={{ width: "100%", marginBottom: 20 }} />
      <Typography variant="body1">
        भगवान राम के बारे में 10 प्रश्नों के उत्तर दें और अपना स्कोर दोस्तों के साथ साझा करें
      </Typography>
      <Button variant="contained" color="primary" onClick={onStartQuiz} style={{ marginTop: "10px" }}>
        प्रारंभ करें
      </Button>
    </CardContent>
  </Card>
);

export default Landing;
