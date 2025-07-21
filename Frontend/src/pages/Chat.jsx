import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, CircularProgress, Paper, Typography, IconButton, Fade } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";
import "../App.css";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHeading, setShowHeading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/users/history/${user.id}`);
        setChatHistory(res.data.chatHistory || []);
      } catch (err) {
        console.error("Failed to fetch history", err);
      }
    };

    fetchHistory();

    const headingHidden = localStorage.getItem("headingHidden");
    if (headingHidden) setShowHeading(false);
  }, [user]);

  const chat = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setShowHeading(false);
    localStorage.setItem("headingHidden", "true");

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + import.meta.env.VITE_Gemini_API_key,
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );

      const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      setChatHistory(prev => [...prev, { question, answer: reply }]);

      await axios.post("http://localhost:5000/api/users/chatsaved", {
        clerkId: user.id,
        question,
        answer: reply,
      });

      setQuestion("");
    } catch (err) {
      console.error("Error in chat or saving to DB:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (chatId) => {
    try {
      setChatHistory(prev => prev.filter(chat => chat._id !== chatId));
      await axios.delete(`http://localhost:5000/api/users/deletechat/${user.id}/${chatId}`);
    } catch (err) {
      alert("Failed to delete chat. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f0f2f5',
      }}
    >
      {/* Header */}
      {showHeading && (
        <Fade in={showHeading}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              mt: 4,
              background: 'linear-gradient(90deg, #4e54c8, #8f94fb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            How can I make your day easier?
          </Typography>
        </Fade>
      )}
  
      {/* Chat History Section */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 4,
          mt: showHeading ? 2 : 4,
          mb: 3,
        }}
      >
        {chatHistory.map((item, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              backgroundColor: '#f7f9fc',
            }}
          >
            <Typography variant="subtitle2" sx={{ color: '#666', fontWeight: 500 }}>
              You asked:
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, fontSize: '1.1rem' }}>
              {item.question}
            </Typography>
  
            <Typography variant="subtitle2" sx={{ color: '#666', fontWeight: 500 }}>
              Response:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{item.answer}</Typography>
  
            <Box sx={{ textAlign: 'right' }}>
              <IconButton onClick={() => handleDelete(item._id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
  
      {/* Sticky Footer Input */}
      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          p: 2,
          backgroundColor: '#fff',
          borderTop: '1px solid #ddd',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <TextField
          label="Ask anything"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          variant="outlined"
          fullWidth
          multiline
          maxRows={4}
          sx={{ backgroundColor: 'white', flex: 1 }}
          disabled={loading}
        />
  
        <Button
          variant="contained"
          onClick={chat}
          disabled={loading}
          sx={{ height: '56px', minWidth: '200px', fontWeight: 'bold' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Response'}
        </Button>
      </Box>
    </Box>
  );  
}
