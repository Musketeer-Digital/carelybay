"use client";

import { useState, useEffect } from "react";
import { Container, Box, TextField, Typography } from "@mui/material";
import SessionControls from "@/app/components/session-controls";

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  participantId: string;
}

interface Message {
  id: string;
  title: string;
  lastMessage: string;
  participantId: string;
}

const conversationSet1 = [
  {
    id: "conv1",
    title: "Jane Doe",
    lastMessage: "Looking forward to the interview!",
    participantId: "user_123",
  },
  {
    id: "conv2",
    title: "John Smith",
    lastMessage: "Thanks for applying!",
    participantId: "user_456",
  },
  {
    id: "conv3",
    title: "Emma Johnson",
    lastMessage: "Can you start next week?",
    participantId: "user_789",
  },
];

export default function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setConversations(conversationSet1);
  }, []);

  return (
    <Container sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography>Messages</Typography>
        <TextField />
        {conversations.map((conversation) => (
          <Box
            key={conversation.id}
            sx={{ cursor: "pointer" }}
            onClick={() => {}}
          >
            <Typography>{conversation.title}</Typography>
          </Box>
        ))}
        <SessionControls />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography>Test Recipient</Typography>
        {messages.map((message) => (
          <Box key={message.id}>
            <Typography>{message.message}</Typography>
          </Box>
        ))}
      </Box>
      {/* (A conversation is started when a user applies for a job) */}
      {/* (A conversation is between a job poster and an applicant) */}

      {/* TODO... */}
      {/* Retrieve all messages from database where user_id = current_user_id */}
      {/* Group messages from other users */}
      {/* Display coversations with other users on left */}
      {/* Display current conversation messages on right */}
      {/* User messages aligned right side, recipient messages aligned left */}

      {/* BONUS: Retrieve only last message of each conversation for preview display */}
      {/* BONUS (cont): Retrieve rest of messages upon opening of each conversation */}
      {/* ??BONUS: Applicant should see empty conversation if no messages - Display "You've successfully applied for this job" */}
      {/* ??BONUS (cont): Job poster shouldn't see empty conversation */}
    </Container>
  );
}
