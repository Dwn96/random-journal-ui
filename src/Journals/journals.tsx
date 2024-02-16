import * as React from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  ThemeProvider,
  createTheme,
  Typography,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6c63ff",
    },
  },
});

function Journal() {
  const [inputText, setInputText] = React.useState("");
  const [cards, setCards] = React.useState<{content:string, createdOn: Date}[]>([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    if (inputText.trim() !== "") {
      setCards([...cards, { content: inputText.trim(), createdOn: new Date() }]);
      setInputText("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container  style={{ marginTop: "20px" }}>
        <TextField
          label="Enter journal"
          variant="outlined"
          fullWidth
          value={inputText}
          onChange={handleInputChange}
          multiline
          rows={4}
          style={{ marginBottom: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <div style={{ marginTop: "20px" }}>
          {cards.map((card, index) => (
            <Card key={index} style={{ marginBottom: "10px"}}>
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  {card.createdOn.toLocaleString()}
                </Typography>
                <Typography>{card.content}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default Journal;
