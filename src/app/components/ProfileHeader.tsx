"use client";

import { Avatar, Card, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { COLORS } from "@/constants/colors";
import { ChildCareIcon } from "./icons/childcare-icon";
import { useUserStore } from "@/store/userSlice";
import { getFirstLetter } from "@/utils/utils";
import { useProfileStore } from "@/store/profileSlice";

const ProfileHeader = () => {
  const { user } = useUserStore();
  const { userProfile } = useProfileStore();

  return (
    <Card
      sx={{
        boxShadow: 1,
        borderRadius: 2,
        textAlign: "center",
        padding: { xs: 3, md: 5 },
        marginTop: 3,
        width: "100%",
        maxWidth: 400,
        marginX: "auto",
        bgcolor: COLORS.WHITE_COLOR,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Avatar
          sx={{
            bgcolor: "#FFF7E9",
            width: { xs: 70, md: 100 },
            height: { xs: 70, md: 100 },
            fontSize: { xs: 30, md: 50 },
            fontWeight: "bold",
            color: COLORS.BLACK_COLOR,
          }}
        >
          {getFirstLetter(userProfile?.name ?? "S")}
        </Avatar>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 2 }}>
        {userProfile?.name ?? ""}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Box
          sx={{
            bgcolor: COLORS.BG_LIGHT_GREY_COLOR,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            px: { xs: 1, md: 2 },
            py: 1,
            width: "100%",
            maxWidth: 300,
            borderRadius: 2,
            marginTop: 2,
            flexBasis: "fit-content",
          }}
        >
          <IconButton
            sx={{
              width: 40,
              height: 40,
              flexShrink: 0,
              borderRadius: 2,
              backgroundColor: "#FFF",
              border: "1px solid #CDCDCD",
              color: COLORS.BLACK_COLOR,
              boxShadow: 0,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#F5F5F5",
              },
            }}
          >
            <ChildCareIcon />
          </IconButton>

          <Typography
            sx={{
              flex: 1,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            Childcare
          </Typography>
          <IconButton sx={{ color: COLORS.BLACK_COLOR }}>
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default ProfileHeader;
