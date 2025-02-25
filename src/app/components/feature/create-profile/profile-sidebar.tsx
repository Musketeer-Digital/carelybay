"use client";

import React from "react";
import {
  Typography,
  Box,
  Card,
  Avatar,
  Button,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { CheckCircle, Edit, Add, ChildCare } from "@mui/icons-material";

const ProfileSidebar = () => {
  const confirmedInfo = [
    { title: "Email address", verified: true },
    { title: "Phone number", verified: true },
  ];
  const profileData = {
    firstName: "John",
    lastName: "Doe",
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#FFF7E9",
            width: 180,
            height: 180,
            fontSize: 80,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {profileData.firstName.charAt(0)}
        </Avatar>
        <Button
          variant="outlined"
          startIcon={<Add />}
          sx={{ mt: -2, position: "relative", zIndex: 1 }}
        >
          Add
        </Button>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mt: 2 }}
        >{`${profileData.firstName} ${profileData.lastName}`}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#F7F7F7",
            px: 2,
            py: 1,
            borderRadius: 2,
            mt: 2,
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <ChildCare />
          <Typography fontWeight="bold">Childcare</Typography>
          <IconButton>
            <Edit />
          </IconButton>
        </Box>
      </Box>
      <Card sx={{ mt: 3, p: 3, borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          Confirmed Info
        </Typography>
        <List>
          {confirmedInfo.map((item, index) => (
            <ListItem
              key={index}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <CheckCircle sx={{ color: "green", mr: 1 }} />
              {item.title}
            </ListItem>
          ))}
        </List>
        <Typography fontWeight="medium" sx={{ mt: 2, color: "gray" }}>
          Identity Verifications by CarelyBay
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          Get the badge
        </Button>
      </Card>
    </Box>
  );
};
export default ProfileSidebar;
