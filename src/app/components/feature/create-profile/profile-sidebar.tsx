"use client";

import React from "react";
import {
  Typography,
  Box,
  Card,
  Avatar,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { COLORS } from "@/constants/colors";
import CustomButton from "../../CustomButton";
import { PlusIcon } from "../../icons/plus-icon";
import { ChildCareIcon } from "../../icons/childcare-icon";
import { EditIcon } from "../../icons/edit-icon";
import { GreaterIcon } from "../../icons/greater-icon";
import { ElderAgeIcon } from "../../icons/elderage-icon";
import { InfoIcon } from "../../icons/info-icon";
import { CheckIcon } from "../../icons/check-icon";

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
          startIcon={<PlusIcon />}
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
          <IconButton sx={{ border: "1px solid grey", ml: 1 }}>
            <PlusIcon />
          </IconButton>
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
              <ChildCareIcon />
              <Typography
                sx={{ ml: 1, mr: 1 }}
                fontSize="0.95rem"
                fontWeight="medium"
              >
                Childcare
              </Typography>

              <EditIcon />
            </Box>

            <GreaterIcon />
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
              <ElderAgeIcon />
              <Typography
                sx={{ ml: 1, mr: 1 }}
                fontSize="0.95rem"
                fontWeight="medium"
              >
                Aged care
              </Typography>
            </Box>
            <EditIcon />
          </ListItem>
        </List>
      </Card>

      <Card
        sx={{
          mt: 3,
          p: 3,
          borderRadius: 4,
          boxShadow: "none",
          bgcolor: COLORS.WHITE_COLOR,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {`${profileData.firstName} ${profileData.lastName}`} confirmed info
        </Typography>
        <List>
          {confirmedInfo.map((item, index) => (
            <ListItem
              key={index + item.title}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <CheckIcon />
              <Typography sx={{ ml: 1 }}> {item.title}</Typography>
            </ListItem>
          ))}
        </List>
        <Box
          sx={{ display: "flex", alignItems: "center", alignContent: "center" }}
        >
          <Typography
            fontWeight="medium"
            sx={{ display: "flex", alignItems: "center", mr: 1 }}
          >
            Identity Verifications by CarelyBay
          </Typography>
          <InfoIcon />
        </Box>
        <CustomButton
          variant="outlined"
          sx={{
            color: "#4D4D4D",
            border: `1px solid #4D4D4D`,
            mt: 2,

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
