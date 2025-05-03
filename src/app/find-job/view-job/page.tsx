"use client";

import {
  Box,
  Typography,
  Stack,
  Avatar,
  Chip,
  Button,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import { CheckCircle, LocationOn } from "@mui/icons-material";
import CustomButton from "@/app/components/CustomButton";
import { LeftArrowIcon } from "@/app/components/icons/left-arrow-icon";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import PaymentIcon from "@mui/icons-material/AttachMoney";
import DurationIcon from "@mui/icons-material/WorkOutline"; // optional custom icon
import InformationCard from "@/app/components/signup-marketing-panel/InformationCard";
import {
  additionalInfoOptions,
  days,
  servicesList,
  timeSlots,
} from "@/app/components/signup-marketing-panel/create-profile/profile-options";
import { useState } from "react";
import { COLORS } from "@/constants/colors";
import { getIconByLabel } from "@/utils/utils";
import { IAdditionalInfo, IService } from "@/utils/profileUtils";
import JobSidebar from "./find-job-sidebar";
import { useMediaQuery, useTheme } from "@mui/material";

const ViewJob = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const [selectedAdditionalInfo, setSelectedAdditionalInfo] = useState<
    IAdditionalInfo[]
  >([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, py: 3 }}>
      <Typography
        component="a"
        href="#"
        sx={{
          fontSize: 14,
          display: "flex",
          color: "black",
          alignItems: "center",
        }}
      >
        <IconButton sx={{ width: 30, height: 30 }}>
          <LeftArrowIcon />
        </IconButton>
        Back to All Job Posts
      </Typography>

      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            borderRight: { md: "1px solid #E0E0E0" },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Box
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: "20px",
                p: 3,
                mb: 3,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                mb={2}
              >
                <Avatar src="/avatar.jpg" sx={{ width: 60, height: 60 }} />
                <CustomButton
                  variant="primary"
                  sx={{
                    height: 40,
                    borderRadius: 999,
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  Apply
                </CustomButton>
              </Stack>

              <Box mb={2}>
                <Typography fontWeight={600}>Alanna Doe</Typography>
                <Typography fontWeight={700} fontSize="20px" mt={0.5}>
                  Need a Trustworth Babysitter
                </Typography>
              </Box>

              <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                <LocationOn fontSize="small" sx={{ color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  Melbourne · 11km
                </Typography>
              </Stack>

              <Typography variant="caption" color="text.secondary">
                <Box
                  component="span"
                  display="inline-flex"
                  alignItems="center"
                  mr={1}
                >
                  <CheckCircle sx={{ fontSize: 16, mr: 0.5 }} />
                  98% match · Posted 16 Dec · Job starts 16 Jan
                </Box>
              </Typography>

              <Grid container spacing={2} mt={2}>
                {[
                  {
                    label: "Number of kids:",
                    value: "1 Child",
                    icon: <PersonIcon fontSize="small" />,
                  },
                  {
                    label: "Job Duration:",
                    value: "Long-term",
                    icon: <DurationIcon fontSize="small" />,
                  },
                  {
                    label: "Urgency:",
                    value: "ASAP",
                    icon: <AccessTimeIcon fontSize="small" />,
                  },
                  {
                    label: "Payment:",
                    value: "$32/h",
                    icon: <PaymentIcon fontSize="small" />,
                  },
                ].map((item, index) => (
                  <Grid item xs={6} sm={6} md={isMobile ? 3 : 2} key={index}>
                    <InformationCard
                      label={item.label}
                      value={item.value}
                      icon={item.icon}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Typography variant="h6" mb={1}>
              Job Description
            </Typography>
            <Typography mb={3}>
              We are a family of three looking for a responsible and energetic
              after-school nanny for our 9-year-old child. The ideal candidate
              should be able to help with homework, engage in fun and
              educational activities, and oversee after-school routines. Our
              child enjoys reading, sports, and creative activities, so we’re
              seeking someone who can nurture these interests and be a positive
              role model.
            </Typography>
            <Divider />
            <Typography variant="h6" mb={2} mt={4}>
              Availability
            </Typography>
            <Stack direction="row" spacing={1} mb={1}>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                {days.map((day) => {
                  const isSelected = selectedDays.includes(day);
                  return (
                    <Button
                      key={day}
                      variant="contained"
                      onClick={() =>
                        setSelectedDays((prev) =>
                          isSelected
                            ? prev.filter((d) => d !== day)
                            : [...prev, day],
                        )
                      }
                      sx={{
                        minWidth: "0 !important",
                        width: {
                          xs: 30,
                          sm: 50,
                          md: 62,
                        },
                        height: {
                          xs: 40,
                          sm: 50,
                          md: 62,
                        },
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "14px",
                        },
                        borderRadius: "50%",
                        backgroundColor: isSelected
                          ? COLORS.PRIMARY_COLOR
                          : COLORS.WHITE_COLOR,
                        color: isSelected
                          ? COLORS.WHITE_COLOR
                          : COLORS.BLACK_COLOR,
                        border: `1px solid ${isSelected ? COLORS.PRIMARY_COLOR : "#E0E0E0"}`,
                        fontWeight: "500",
                        textTransform: "none",
                      }}
                    >
                      {day}
                    </Button>
                  );
                })}
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} mb={3} mt={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 1,
                  mt: 1,
                }}
              >
                {timeSlots.map((slot) => (
                  <Chip
                    key={slot}
                    label={slot}
                    onClick={() =>
                      setSelectedTimeSlots((prev) =>
                        prev.includes(slot)
                          ? prev.filter((s) => s !== slot)
                          : [...prev, slot],
                      )
                    }
                    sx={{
                      borderRadius: "24px",
                      backgroundColor: selectedTimeSlots.includes(slot)
                        ? COLORS.BG_LIGHT_ORANGE_COLOR
                        : COLORS.WHITE_COLOR,

                      border: `1px solid ${
                        selectedTimeSlots.includes(slot)
                          ? COLORS.PRIMARY_COLOR
                          : ""
                      }`,
                    }}
                  />
                ))}
              </Box>
            </Stack>
            <Divider />
            <Typography variant="h6" mb={2} mt={4}>
              Must have skills
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" mb={3}>
              <Grid container spacing={1}>
                {servicesList.map((service) => {
                  const isSelected = selectedServices.some(
                    (s) => s.id === service.id,
                  );
                  return (
                    <Grid item key={service.id}>
                      <Chip
                        label={service.label}
                        icon={
                          isSelected ? (
                            <IconButton
                              sx={{
                                width: "35px",
                                height: "35px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: isSelected
                                  ? COLORS.WHITE_COLOR
                                  : "white",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  bgcolor: isSelected
                                    ? "#FFC4A1"
                                    : COLORS.BG_LIGHT_GREY_COLOR,
                                },
                              }}
                            >
                              {getIconByLabel(service.label, servicesList)}
                            </IconButton>
                          ) : (
                            <IconButton
                              sx={{
                                width: "35px",
                                height: "35px",
                                borderRadius: "50%",
                              }}
                            >
                              <span
                                style={{
                                  color: COLORS.BLACK_COLOR,
                                }}
                              >
                                {getIconByLabel(service.label, servicesList)}
                              </span>
                            </IconButton>
                          )
                        }
                        onClick={() => null}
                        sx={{
                          height: "45px",
                          fontSize: "14px",
                          padding: "8px 12px",
                          borderRadius: "24px",
                          backgroundColor: isSelected
                            ? COLORS.BG_LIGHT_ORANGE_COLOR
                            : COLORS.WHITE_COLOR,
                          border: isSelected
                            ? `1px solid ${COLORS.PRIMARY_COLOR}`
                            : `1px solid ${COLORS.BORDER_COLOR}`,
                          "&:hover": {
                            backgroundColor: isSelected
                              ? "#FFC4A1"
                              : COLORS.BG_LIGHT_GREY_COLOR,
                          },
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Stack>
            <Typography variant="h6" mb={1}>
              Additional requirements
            </Typography>
            <Grid container justifyContent="left" spacing={2} sx={{ mt: 2 }}>
              {additionalInfoOptions.slice(0, 5).map((item, index) => {
                const isSelected = selectedAdditionalInfo.some(
                  (i) => i.id === item.id,
                );
                return (
                  <Grid
                    item
                    key={item.id + index}
                    xs={6}
                    sm={1.5}
                    textAlign="center"
                    sx={{ cursor: "pointer" }}
                    onClick={() => null}
                  >
                    <IconButton
                      sx={{
                        width: 48,
                        height: 48,
                        border: `1px solid #CDCDCD`,
                        borderRadius: "50%",
                        bgcolor: isSelected
                          ? COLORS.PRIMARY_COLOR
                          : COLORS.WHITE_COLOR,
                        color: isSelected
                          ? COLORS.WHITE_COLOR
                          : COLORS.BLACK_COLOR,
                        boxShadow: isSelected ? 3 : 0,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: COLORS.PRIMARY_COLOR,
                          color: COLORS.WHITE_COLOR,
                          "& svg": { filter: "invert(1)" },
                        },
                        "& svg": {
                          filter: isSelected ? "invert(1)" : "invert(0)",
                        },
                      }}
                    >
                      {getIconByLabel(item.label, additionalInfoOptions)}
                    </IconButton>

                    <Typography
                      variant="caption"
                      fontWeight={500}
                      display="block"
                      sx={{ mt: 1 }}
                    >
                      {item.label}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <JobSidebar />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewJob;
