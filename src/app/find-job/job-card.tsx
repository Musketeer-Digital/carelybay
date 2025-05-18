"use client";

import { Box, Typography, Avatar, Stack, IconButton } from "@mui/material";
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
import { useState, useEffect } from "react";
import { additionalInfoOptions } from "../components/profile-options";
import { useJobStore } from "@/store/jobSlice";
import { useUserStore } from "@/store/userSlice";
import { toggleFavorite, checkFavoriteStatus } from "@/utils/api/favorite";
import { showToast } from "@/utils/toast";
import { COLORS } from "@/constants/colors";

const iconMap = {
  smokeFree: SmokeFreeIcon,
  carDirection: CarDirectionIcon,
  pet: PetIcon,
  sick: SickIcon,
  childCare: ChildCareIcon,
};

const JobCard = ({ job }: any) => {
  const router = useRouter();
  const { setSelectedJob } = useJobStore();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Check favorite status when component mounts
  useEffect(() => {
    const checkFavorite = async () => {
      if (!job?._id || !user?._id) return;
      try {
        const response = await checkFavoriteStatus(job._id, user._id);
        setIsFavorited(response.isFavorite);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavorite();
  }, [job?._id, user?._id]);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!job?._id || !user?._id || isLoading) return;

    setIsLoading(true);
    const currentState = isFavorited;

    try {
      console.log("Current favorite state:", currentState);

      const response = await toggleFavorite(job._id, user._id);
      console.log("Server response:", response);

      if (!response.success) {
        throw new Error(response.error || "Failed to update favorite status");
      }

      setIsFavorited(response.isFavorite);
      showToast(response.message);

      // Update the job in the store if needed
      if (setSelectedJob) {
        setSelectedJob({
          ...job,
          isFavorite: response.isFavorite,
        });
      }
    } catch (error: any) {
      console.error("Error in handleFavorite:", error);
      showToast(error.message || "Failed to update favorite status", "error");
      setIsFavorited(currentState);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewJob = () => {
    setSelectedJob({
      ...job,
      isFavorite: isFavorited,
    });
    router.push("/find-job/view-job");
  };
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
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="flex-start"
        flexWrap="wrap"
      >
        <Avatar src={job.avatar} sx={{ width: 48, height: 48 }} />

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            flexWrap="wrap"
          >
            <Typography fontWeight={600} fontSize="14px">
              {job.name}
            </Typography>
            <Typography fontSize="12px" color="text.secondary">
              Posted {job.postedDate} · Job starts {job.startDate}
            </Typography>
          </Stack>

          <Typography fontWeight={700} fontSize="16px" sx={{ mt: 0.5 }}>
            {job.title}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
            <LocationOn sx={{ fontSize: 16, color: "#777" }} />
            <Typography fontSize="13px" color="text.secondary">
              {job.location} · {job.distance}
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
          <Typography fontSize="14px">{job.children} Child</Typography>
        </Stack>

        <Stack direction="row" spacing={0.5} alignItems="center">
          <AccessTimeIcon sx={{ fontSize: 16 }} />
          <Typography fontSize="14px">{job.time}</Typography>
        </Stack>

        <Typography fontSize="14px" fontWeight={500}>
          {job.rate}
        </Typography>

        <Stack direction="row" spacing={0.5} alignItems="center">
          <CheckCircle sx={{ fontSize: 16 }} />
          <Typography fontSize="14px">{job.match} match</Typography>
        </Stack>
      </Stack>

      <Typography fontSize="14px" color="text.secondary">
        {job.description}
      </Typography>

      <Box sx={{ borderBottom: "1px solid #E5E7EB" }} />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
      >
        <Stack direction="row" spacing={1}>
          {additionalInfoOptions.map((additionalInfo, index) => {
            const isIncluded = job.serviceTags?.some(
              (tag: any) => tag.label === additionalInfo.label,
            );

            if (!isIncluded) return null;

            return (
              <IconButton
                key={index}
                sx={{
                  border: "1px solid #eee",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                }}
              >
                {additionalInfo.icon}
              </IconButton>
            );
          })}
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
          <CustomButton
            variant="outlined"
            sx={{ flexShrink: 0 }}
            onClick={() => handleViewJob()}
          >
            View job and apply
          </CustomButton>
          <IconButton
            onClick={handleFavorite}
            disabled={isLoading}
            sx={{
              border: "1px solid #00000033",
              borderRadius: "50%",
              width: 40,
              height: 40,
              backgroundColor: isFavorited ? "#FFF0ED" : "transparent",
              "&:hover": {
                backgroundColor: isFavorited ? "#FFE4E0" : "#f5f5f5",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <FavIcon fill={isFavorited ? COLORS.PRIMARY_COLOR : "none"} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default JobCard;
