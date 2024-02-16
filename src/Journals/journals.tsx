import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6c63ff",
    },
  },
});

function Journal(props) {
  const navigate = useNavigate()
  useEffect(() => {
    // Function to get the token from the cookie
    const getTokenFromCookie = () => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('token=')) {
          return cookie.substring(6); // Extract token value
        }
      }
      return '';
    };

    const storedToken = getTokenFromCookie();
    if (storedToken) {
      props.setAuthUser({
        token: storedToken,
      })
      
    } else {
      navigate("/");   
    }

  }, []);
  const [inputText, setInputText] = useState("");
  const [cards, setCards] = useState<{ content: string, created_at: Date }[]>([]);
  const [message, setMessage] = useState({});

  const baseURL = import.meta.env.VITE_BASE_URL;
  const config = {
    headers: {
      Authorization: `Bearer ${props.authUser.token}`,
    },
  };

  useEffect(() => {
    if(props.authUser.token) fetchCards()
  }, [props.authUser.token])

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const fetchCards = async () => {

    const url = `${baseURL}/journal`;
    const res = await axios.get(url, config);

    setCards(res.data)
  }

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

    try {
      const url = `${baseURL}/journal`;
      const payload = {
        content: inputText,
      }
      await axios.post(url, payload, config);

      if (inputText.trim() !== "") {
        setCards([...cards, { content: inputText.trim(), created_at: new Date() }]);
        setInputText("");
      }

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

  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ marginTop: "20px" }}>
        <div style={{position: 'sticky'}}>
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
        </div>
        {message.text && (
          <Alert style={{ marginTop: "12px" , width: '50%', margin: "auto"}} severity={message.severity}>
            {message.text}
          </Alert>
        )}
        <div style={{ marginTop: "20px" , display: 'flex', flexWrap: 'wrap'}}>
          {cards.map((card, index) => (
            <Card key={index} style={{ marginRight: "10px", marginTop: "10px" }}>
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  {card.created_at.toLocaleString()}
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
