"use client";

import {
  Box,
  Typography,
  Stack,
  Avatar,
  Chip,
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
import DurationIcon from "@mui/icons-material/WorkOutline";
import InformationCard from "@/app/components/InformationCard";

import { useEffect, useState } from "react";
import { COLORS } from "@/constants/colors";
import { getIconByLabel } from "@/utils/utils";
import { IService } from "@/utils/profileUtils";
import JobReviews from "./job-reviews";
import { useMediaQuery, useTheme } from "@mui/material";
import ApplyJob from "../apply-job/apply-job";
import DaySelector from "@/app/components/DaySelector";
import TimeSlotSelector from "@/app/components/TimeSlotSelector";
import {
  additionalInfoOptions,
  servicesList,
  timeSlots,
} from "@/app/components/profile-options";
import { JobPostDocument } from "@/models/JobModel";
import { FullscreenSpinner } from "@/app/components/CustomSpinner";
import { useJobStore } from "@/store/jobSlice";
import { useRouter } from "next/navigation";
import { checkJobApplication } from "@/utils/api/appliedJob";
import { useUserStore } from "@/store/userSlice";
import { showToast } from "@/utils/toast";

const ViewJob = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const [applyClicked, setApplyClicked] = useState<boolean>(false);
  const [isApplied, setIsApplied] = useState(false);
  const [existingMessage, setExistingMessage] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jobPost, setJobPost] = useState<JobPostDocument | null>(null);
  const { selectedJob } = useJobStore();
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!selectedJob) {
      router.push("/find-job");
      return;
    }
    setJobPost(selectedJob);

    checkExistingApplication();
  }, [selectedJob, user?._id, router]);

  const checkExistingApplication = async () => {
    if (!selectedJob?._id || !user?._id) return;

    try {
      const response = await checkJobApplication(selectedJob._id, user._id);
      if (response) {
        setIsApplied(true);
        setExistingMessage(response.message);
      }
    } catch (error) {
      showToast("Error checking application status", "error");
    }
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, py: 3 }}>
      {isLoading && <FullscreenSpinner />}

      <Typography
        component="a"
        href="/find-job"
        sx={{
          fontSize: 14,
          display: "flex",
          color: "black",
          alignItems: "center",
          cursor: "pointer",
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
                {!isApplied && (
                  <CustomButton
                    variant="primary"
                    sx={{
                      height: 40,
                      borderRadius: 999,
                      width: { xs: "100%", sm: "auto" },
                    }}
                    onClick={() => setApplyClicked(true)}
                  >
                    Apply
                  </CustomButton>
                )}
              </Stack>

              <Box mb={2}>
                <Typography fontWeight={600}>Alanna Doe</Typography>
                <Typography fontWeight={700} fontSize="20px" mt={0.5}>
                  {jobPost?.title}
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
                  98% match · Posted {jobPost?.postedAt} · Job starts{" "}
                  {jobPost?.startDate}
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
                  <Grid
                    item
                    md={isMobile ? 3 : 2}
                    xs={12}
                    sm={6}
                    lg={3}
                    xl={2}
                    key={index}
                  >
                    <InformationCard
                      label={item.label}
                      value={item.value}
                      icon={item.icon}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            {
              <ApplyJob
                setApplyClicked={setApplyClicked}
                isApplied={isApplied}
                existingMessage={existingMessage}
                checkExistingApplication={checkExistingApplication}
                applyClicked={applyClicked}
              />
            }
            <Typography
              variant="h6"
              mb={1}
              sx={{ fontSize: "24px", fontWeight: 600, mb: 1 }}
            >
              Job Description
            </Typography>
            <Typography mb={3}>{jobPost?.description}</Typography>
            <Divider />
            <Typography
              variant="h6"
              mb={2}
              mt={4}
              sx={{ fontSize: "24px", fontWeight: 600, mb: 1 }}
            >
              Availability
            </Typography>
            <Stack direction="row" spacing={1} mb={1}>
              <DaySelector
                selectedDays={selectedDays}
                onChange={setSelectedDays}
              />
            </Stack>
            <Stack direction="row" spacing={1} mb={3} mt={2}>
              <TimeSlotSelector
                slots={timeSlots}
                selected={selectedTimeSlots}
                onChange={setSelectedTimeSlots}
              />
            </Stack>
            <Divider />
            <Typography
              variant="h6"
              mb={2}
              mt={4}
              sx={{ fontSize: "24px", fontWeight: 600, mb: 1 }}
            >
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
            <Divider />
            <Typography
              variant="h6"
              mb={1}
              mt={4}
              sx={{ fontSize: "24px", fontWeight: 600, mb: 1 }}
            >
              Additional requirements
            </Typography>
            <Grid container justifyContent="left" spacing={2} sx={{ mt: 2 }}>
              {additionalInfoOptions
                .filter((item) =>
                  jobPost?.serviceTags?.some(
                    (tag: any) => tag.label === item.label,
                  ),
                )
                .map((item, index) => {
                  return (
                    <Grid
                      item
                      key={item.id + index}
                      xs={6}
                      sm={1.5}
                      textAlign="center"
                      sx={{ cursor: "default" }}
                    >
                      <IconButton
                        sx={{
                          width: 48,
                          height: 48,
                          border: `1px solid #CDCDCD`,
                          borderRadius: "50%",
                          bgcolor: COLORS.WHITE_COLOR,
                          color: COLORS.BLACK_COLOR,
                          boxShadow: 0,
                          transition: "all 0.3s ease",

                          "& svg": {
                            filter: "invert(0)",
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
          <JobReviews jobId={selectedJob?._id} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewJob;
