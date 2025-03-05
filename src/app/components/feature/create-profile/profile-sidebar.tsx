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
} from "@mui/material";
import { Edit, Add, ChildCare, Elderly, Info } from "@mui/icons-material";
import { COLORS } from "@/constants/colors";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckIcon from "@mui/icons-material/Check";
import CustomButton from "../../CustomButton";

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
        <CustomButton
          variant="outlined"
          size="small"
          startIcon={<Add />}
          sx={{
            color: "black",
            bgcolor: "white",
            border: "1px solid #eee",
            mt: -4,
            position: "relative",
            zIndex: 1,
            borderRadius: 5,
          }}
        >
          Add
        </CustomButton>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mt: 2 }}
        >{`${profileData.firstName} ${profileData.lastName}`}</Typography>
      </Box>

      <Card
        sx={{
          p: 2,
          mt: 2,
          borderRadius: 4,
          boxShadow: 1,
          bgcolor: COLORS.WHITE_COLOR,
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "1.1rem",
            mb: 2,
          }}
        >
          Your profile
          <AddCircleOutlineIcon sx={{ ml: 1, fontSize: "30px" }} />
        </Typography>

        <List sx={{ p: 0 }}>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 2,
              mb: 1,
              p: 1.2,
              bgcolor: COLORS.BG_LIGHT_GREY_COLOR,
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ChildCare sx={{ mr: 1 }} />
              <Typography fontSize="0.95rem" fontWeight="medium">
                Childcare
              </Typography>

              <Edit sx={{ ml: 2 }} fontSize="small" />
            </Box>

            <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
          </ListItem>

          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: 2,
              p: 1.2,
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Elderly sx={{ mr: 1 }} />
              <Typography fontSize="0.95rem" fontWeight="medium">
                Aged care
              </Typography>
            </Box>
            <Edit sx={{ ml: 2 }} fontSize="small" />
          </ListItem>
        </List>
      </Card>

      <Card
        sx={{
          mt: 3,
          p: 3,
          borderRadius: 4,
          boxShadow: 1,
          bgcolor: COLORS.WHITE_COLOR,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {`${profileData.firstName} ${profileData.lastName}`} confirmed info
        </Typography>
        <List>
          {confirmedInfo.map((item, index) => (
            <ListItem
              key={index}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <CheckIcon sx={{ mr: 1 }} />
              {item.title}
            </ListItem>
          ))}
        </List>
        <Typography
          fontWeight="medium"
          sx={{ display: "flex", alignItems: "center", mt: 2 }}
        >
          Identity Verifications by CarelyBay
          <Info sx={{ ml: 1, color: "#4D4D4D" }} />
        </Typography>
        <CustomButton
          variant="outlined"
          sx={{
            color: "#4D4D4D",
            border: `1px solid #4D4D4D`,
            mt: 2,
            borderRadius: 20,
            height: 40,
          }}
        >
          Get the badge
        </CustomButton>
      </Card>
    </Box>
  );
};
export default ProfileSidebar;
