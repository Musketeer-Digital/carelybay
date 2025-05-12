"use client";

import {
  Box,
  Typography,
  Avatar,
  Stack,
  IconButton,
  useTheme,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import { SmokeFreeIcon } from "../components/icons/smoke-free-icon";
import { CarDirectionIcon } from "../components/icons/car-direction-icon";
import { PetIcon } from "../components/icons/pets.icon";
import { SickIcon } from "../components/icons/sick-icon";
import { ChildCareIcon } from "../components/icons/childcare-icon";
import CustomButton from "../components/CustomButton";
import { FavIcon } from "../components/icons/fav-icon";
import { CheckCircle, LocationOn } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const JobCard = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        mb: 3,
        p: 2.5,
        border: "1px solid #E5E7EB",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        cursor: "pointer",
      }}
      onClick={() => {
        router.push("/find-job/view-job");
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="flex-start"
        flexWrap="wrap"
      >
        <Avatar src="/avatar.jpg" sx={{ width: 48, height: 48 }} />

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            flexWrap="wrap"
          >
            <Typography fontWeight={600} fontSize="14px">
              Alanna Doe
            </Typography>
            <Typography fontSize="12px" color="text.secondary">
              Posted 16 Dec · Job starts 16 Jan
            </Typography>
          </Stack>

          <Typography fontWeight={700} fontSize="16px" sx={{ mt: 0.5 }}>
            Need a Trustworthy Babysitter
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
            <LocationOn sx={{ fontSize: 16, color: "#777" }} />
            <Typography fontSize="13px" color="text.secondary">
              Melbourne · 11km
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexWrap="wrap"
      >
        <Stack direction="row" spacing={0.5} alignItems="center">
          <PersonIcon sx={{ fontSize: 16 }} />
          <Typography fontSize="14px">1 Child</Typography>
        </Stack>

        <Stack direction="row" spacing={0.5} alignItems="center">
          <AccessTimeIcon sx={{ fontSize: 16 }} />
          <Typography fontSize="14px">8h./Day, ASAP</Typography>
        </Stack>

        <Typography fontSize="14px" fontWeight={500}>
          $32/h
        </Typography>

        <Stack direction="row" spacing={0.5} alignItems="center">
          <CheckCircle sx={{ fontSize: 16 }} />
          <Typography fontSize="14px">98% match</Typography>
        </Stack>
      </Stack>

      <Typography fontSize="14px" color="text.secondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Typography>

      <Box sx={{ borderBottom: "1px solid #E5E7EB" }} />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
      >
        <Stack direction="row" spacing={1}>
          {[
            SmokeFreeIcon,
            CarDirectionIcon,
            PetIcon,
            SickIcon,
            ChildCareIcon,
          ].map((IconComp, index) => (
            <IconButton
              key={index}
              sx={{
                border: "1px solid #eee",
                borderRadius: "50%",
                width: 40,
                height: 40,
              }}
            >
              <IconComp />
            </IconButton>
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            width: "100%",
            justifyContent: { xs: "space-between", sm: "flex-end" },
          }}
        >
          <CustomButton variant="outlined" sx={{ flexShrink: 0 }}>
            View job and apply
          </CustomButton>
          <IconButton
            sx={{
              border: "1px solid #00000033",
              borderRadius: "50%",
              width: 40,
              height: 40,
            }}
          >
            <FavIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default JobCard;
