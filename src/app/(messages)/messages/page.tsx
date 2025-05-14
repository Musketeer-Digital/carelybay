"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  InputAdornment,
  Avatar,
  Button,
} from "@mui/material";
import Image, { StaticImageData } from "next/image";
import SessionControls from "@/app/components/session-controls";
import Spooderman from "/public/spooderman.webp";
import { NorthEast, AttachFile, Send, Search } from "@mui/icons-material";

interface Conversation {
  id: string;
  participantName: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  participantId: string;
  avatarUrl: string | undefined;
}

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
}

const conversationSet1 = [
  {
    id: "conv1",
    participantName: "Jane Doe",
    lastMessage: "Looking forward to the interview!",
    lastMessageTimestamp: "2023-06-01T10:00:00Z",
    participantId: "user_123",
    avatarUrl: "spooderman.webp",
  },
  {
    id: "conv2",
    participantName: "John Smith",
    lastMessage:
      "Thanks for applying! longtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtext",
    lastMessageTimestamp: "2023-06-01T10:00:00Z",
    participantId: "user_456",
    avatarUrl: "spooderman.webp",
  },
  {
    id: "conv3",
    participantName: "Emma Johnson",
    lastMessage: "Can you start next week?",
    lastMessageTimestamp: "2023-06-01T10:00:00Z",
    participantId: "user_789",
    avatarUrl: "spooderman.webp",
  },
];

const messageSet: Record<string, Message[]> = {
  conv1: [
    {
      id: "msg1",
      senderId: "me",
      recipientId: "user_123",
      content: "Hi Jane, thanks for applying!",
      timestamp: "2025-04-11T10:00:00Z",
    },
    {
      id: "msg2",
      senderId: "user_123",
      recipientId: "me",
      content: "Looking forward to the interview!",
      timestamp: "2025-04-11T10:05:00Z",
    },
  ],
  conv2: [
    {
      id: "msg3",
      senderId: "me",
      recipientId: "user_456",
      content:
        "Hi John! longtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtext",
      timestamp: "2025-04-11T09:00:00Z",
    },
    {
      id: "msg4",
      senderId: "user_456",
      recipientId: "me",
      content:
        "Thanks for applying! longtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtext",
      timestamp: "2025-04-11T09:01:00Z",
    },
  ],
  conv3: [
    {
      id: "msg5",
      senderId: "user_789",
      recipientId: "me",
      content: "Can you start next week?",
      timestamp: "2025-04-10T08:00:00Z",
    },
  ],
};

export default function Messages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setConversations(conversationSet1);
  }, []);

  return (
    <Container sx={{ display: "flex", flexDirection: "row" }}>
      {/* LEFT */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
          padding: 4,
          backgroundColor: "rgba(224, 232, 239, 0.1)",
          maxWidth: "546px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "700", fontSize: "24px", lineHeight: "36px" }}
          >
            Messages
          </Typography>
          <Typography sx={{ fontWeight: "700", fontSize: "18px" }}>
            Filter
          </Typography>
        </Box>

        {/* SEARCH BAR */}
        <TextField
          id="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#171717" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            border: "1px solid #EAEAEA",
            borderRadius: "8px",
            backgroundColor: " #FFFFFF",
          }}
        />

        {/* CONVERSATIONS */}
        {conversations
          .filter((conversation) =>
            conversation.participantName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
          )
          .map((conversation) => (
            <Box
              key={conversation.id}
              sx={{
                cursor: "pointer",
                backgroundColor:
                  conversation.id === activeConversation?.id
                    ? "#E0E8EF"
                    : "#FFFFFF",
                borderRadius: "16px",
                paddingY: "16px",
                paddingRight: "20px",
                paddingLeft: "16px",
                gap: "20px",
                display: "flex",
                flexDirection: "row",
                maxHeight: "108px",
              }}
              onClick={() => {
                setActiveConversation(conversation);
                setMessages(messageSet[conversation.id] || []);
              }}
            >
              <Avatar
                src={conversation.avatarUrl}
                alt={conversation.participantName}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "15px",
                      lineHeight: "26px",
                    }}
                  >
                    {conversation.participantName}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "400",
                        fontSize: "12px",
                        lineHeight: "15px",
                      }}
                    >
                      {/* TODO: Add colour based on status */}
                      (STATUS)
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "22px",
                      }}
                    >
                      {new Date(
                        conversation.lastMessageTimestamp,
                      ).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "22px",
                    maxWidth: "270px",
                    wordBreak: "break-word",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {conversation.lastMessage}
                </Typography>
              </Box>
            </Box>
          ))}

        <Box sx={{ marginTop: "auto" }}>
          <SessionControls />
        </Box>
      </Box>

      {/* RIGHT */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 2,
          padding: 4,
          maxWidth: "1154px",
        }}
      >
        {activeConversation ? (
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <Avatar
                src={activeConversation?.avatarUrl}
                alt={activeConversation?.participantName}
                sx={{ width: "66px", height: "66px" }}
              />
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: "24px",
                      lineHeight: "36px",
                    }}
                  >
                    {activeConversation?.participantName}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      lineHeight: "26px",
                      color: "#5E5E5E",
                      textDecoration: "underline",
                    }}
                  >
                    (Job/Contract name goes here)
                  </Typography>
                </Box>
                <Button variant="primary">
                  View Application <NorthEast />
                </Button>
              </Box>
              <Typography>test</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography>Contract with you</Typography>
              <Typography>Total (##)</Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                maxHeight: "400px",
              }}
            >
              {/* MESSAGES */}
              {messages.map((message, index) => {
                const isMe = message.senderId === "me";

                const prevMessage = messages[index - 1];
                const currentDate = new Date(message.timestamp).toDateString();
                const prevDate = prevMessage
                  ? new Date(prevMessage.timestamp).toDateString()
                  : null;

                return (
                  <Box key={message.id}>
                    {/* Insert date separator if day changed */}
                    {currentDate !== prevDate && (
                      <Typography
                        sx={{
                          textAlign: "center",
                          color: "gray",
                          fontSize: "14px",
                          marginBottom: "10px",
                        }}
                      >
                        {currentDate}
                      </Typography>
                    )}

                    {/* MESSAGE */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: isMe ? "flex-end" : "flex-start",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: isMe ? "row-reverse" : "row",
                          alignItems: "flex-start",
                          maxWidth: "75%",
                          gap: "20px",
                        }}
                      >
                        <Avatar
                          src={
                            isMe
                              ? activeConversation?.avatarUrl // TODO: replace later
                              : activeConversation?.avatarUrl
                          }
                          alt={
                            isMe ? "You" : activeConversation?.participantName
                          }
                          sx={{ width: 32, height: 32, mx: 1 }}
                        />

                        {/* BUBBLE AND TIMESTAMP */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                          }}
                        >
                          {/* BUBBLE */}
                          <Box
                            sx={{
                              width: "fit-content",
                              backgroundColor: "#FBFBFB",
                              padding: "8px 12px",
                              borderRadius: "12px",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-word" }}>
                              {message.content}
                            </Typography>
                          </Box>

                          {/* TIMESTAMP */}
                          <Typography
                            sx={{
                              fontSize: "10px",
                              color: "gray",
                              textAlign: isMe ? "right" : "left",
                            }}
                          >
                            {new Date(message.timestamp).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <TextField
              placeholder="Write your message..."
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box
                        sx={{
                          display: "flex",
                          gap: "16px",
                          alignItems: "center",
                        }}
                      >
                        <AttachFile sx={{ color: "#171717" }} />
                        <Send
                          sx={{
                            color: "white",
                            backgroundColor: "#171717",
                            borderRadius: "8px",
                            width: "40px",
                            height: "40px",
                            padding: "10px",
                          }}
                        />
                      </Box>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ marginTop: "auto" }}
            />
          </Box>
        ) : (
          <Typography>
            Select a conversation from the list on the left.
          </Typography>
        )}
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
