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
import Alert from "@mui/material/Alert";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6c63ff",
    },
  },
});

function Journal(props) {
  const [inputText, setInputText] = React.useState("");
  const [cards, setCards] = React.useState<{content:string, createdOn: Date}[]>([]);
  const [message, setMessage] = React.useState({});

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };


  const handleSubmit = async () => {
    if (
      !inputText
    ) {
      setMessage({
        severity: "error",
        text: "Cannot submit empty journal",
      });
      return;
    }
    const baseURL = import.meta.env.VITE_BASE_URL;
    const config = {
      headers: {
        Authorization: `Bearer ${props.authUser.token}`,
      },
    };
    try {
      const url = `${baseURL}/journal`;
      const payload = {
        content: inputText,
      }
      await axios.post(url, payload, config);
      
      setMessage({
        severity: "success",
        text: `Success`,
      });
    } catch (e) {
      setMessage({
        severity: "error",
        text: "Error creating journal",
      });
    }
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
        {message.text && (
            <Alert style={{ marginTop: "12px" }} severity={message.severity}>
              {message.text}
            </Alert>
          )}
      </Container>
    </ThemeProvider>
  );
}

export default Journal;
