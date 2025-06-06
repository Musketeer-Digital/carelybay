"use client";

import { useEffect, useState } from "react";
import { Typography, Box, Divider, Button, Link, Tooltip } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AvailabilityRatesModal from "./availability-model/availability-rates";
import AvailabilityForModal from "./availability-model/availability-for";
import AvailabilitySetModal from "./availability-model/availability-set";
import { COLORS } from "@/constants/colors";
import { EditIcon } from "@/app/components/icons/edit-icon";
import { ChildCareIcon } from "@/app/components/icons/childcare-icon";
import { QuestionIcon } from "@/app/components/icons/question-icon";
import CustomButton from "@/app/components/CustomButton";
import { useProfileStore } from "@/store/profileSlice";
import { updateProfile } from "@/utils/api/profile";
import { IRates } from "@/utils/profileUtils";
import DaySelector from "@/app/components/DaySelector";
import { FullscreenSpinner } from "@/app/components/CustomSpinner";

const Availability = () => {
  // model toggle states
  const [isOpen, setIsOpen] = useState(false);
  const [isRatesModalOpen, setIsRatesModalOpen] = useState(false);
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);

  // local states
  const [availabilityData, setAvailabilityData] = useState<{
    selectedAvailability: string | null;
    selectedUrgency: string | null;
  }>({
    selectedAvailability: null,
    selectedUrgency: null,
  });
  const [rateData, setRateData] = useState<{
    generalRate: any;
    rates: IRates;
  }>({
    generalRate: "",
    rates: { nightRate: "", holidayRate: "", additionalChildRate: "" },
  });
  const [availabilityTimeData, setAvailabilityTimeData] = useState<{
    selectedDays: string[];
    selectedTimeSlots: string[];
    additionalHours: { from: string; to: string }[];
  }>({
    selectedDays: [],
    selectedTimeSlots: [],
    additionalHours: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  // Zustand store
  const { userProfile, setUserProfile } = useProfileStore();

  useEffect(() => {
    const profileRates = userProfile.availabilityRates;

    if (profileRates) {
      setAvailabilityData({
        selectedAvailability: profileRates.availableFor?.availability || null,
        selectedUrgency: profileRates.availableFor?.urgency || null,
      });

      setAvailabilityTimeData({
        selectedDays: profileRates.availability?.days || [],
        selectedTimeSlots: profileRates.availability?.timeSlots || [],
        additionalHours: profileRates.availability?.additionalHours || [],
      });

      setRateData({
        generalRate: profileRates.rates?.generalRate ?? "",
        rates: profileRates.rates?.rates || {
          nightRate: "",
          holidayRate: "",
          additionalChildRate: "",
        },
      });
    }
  }, [userProfile.availabilityRates]);

  const handleUpdateProfileField = async (
    field: keyof typeof userProfile.availabilityRates,
    value: any,
  ) => {
    setIsLoading(true);
    try {
      if (!userProfile?._id) {
        console.error("Profile ID is missing");
        return;
      }

      const updatedProfile = await updateProfile({
        ...userProfile,
        availabilityRates: {
          ...userProfile.availabilityRates,
          [field]: value,
        },
      });
      setIsLoading(false);
      setUserProfile(updatedProfile); // Update Zustand state
    } catch (error) {
      setIsLoading(false);
      console.error(`Failed to update ${field}:`, error);
    }
  };

  const handleRatesSelection = (data: { generalRate: any; rates: IRates }) => {
    setRateData(data);
  };

  const handleAvailabilitySelection = (data: {
    selectedAvailability: string | null;
    selectedUrgency: string | null;
  }) => {
    setAvailabilityData(data);
  };

  const onSelectAvailabilitySet = (data: {
    selectedDays: string[];
    selectedTimeSlots: string[];
    additionalHours: { from: string; to: string }[];
  }): void => {
    setAvailabilityTimeData({
      selectedDays: data.selectedDays,
      selectedTimeSlots: data.selectedTimeSlots,
      additionalHours: data.additionalHours,
    });
  };

  const availabilityOptions = [
    {
      title: "Available For",
      description: "Long-Term · As Soon As Possible (ASAP)",
      onClick: () => setIsOpen(true),
    },
    {
      title: "Set your Rates",
      description: "Ex: “Newborn · up to 12 months”",
      onClick: () => setIsRatesModalOpen(true),
    },
    {
      title: "Set your availability",
      description: "Ex: “Mon - Sat’’",
      onClick: () => setIsAvailabilityModalOpen(true),
    },
  ];

  return (
    <Box
      sx={{
        borderRadius: 2,
        mx: "auto",
        mt: 5,
      }}
    >
      {isLoading && <FullscreenSpinner />}

      <Typography variant="h6" fontWeight="bold">
        Availability & Rates
      </Typography>
      <Box sx={{ mt: 2 }}>
        {availabilityOptions.map((option, index) => (
          <Box
            key={index}
            onClick={option.onClick}
            sx={{ cursor: "pointer", mt: 4 }}
          >
            <Typography
              fontWeight="bold"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <ChildCareIcon />
              <span style={{ flexGrow: 1 }}>{option.title}</span>
              <ArrowForwardIosIcon fontSize="small" />
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 0.5, ml: 4 }}
            >
              {option.description}
            </Typography>

            <Box sx={{ ml: 3 }}>
              {option.title === "Available For" &&
                availabilityData.selectedAvailability &&
                availabilityData.selectedUrgency && (
                  <>
                    <CustomButton
                      variant="outlined"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 2,
                        px: 2,
                        py: 1.5,
                        borderRadius: "24px",
                        textTransform: "none",
                        color: "#171717",
                        border: "1px solid #171717",
                        textAlign: "center",
                        flexDirection: {
                          xs: "column",
                          sm: "row",
                        },
                        fontSize: {
                          xs: "12px",
                          sm: "14px",
                        },
                        gap: 0.5,
                      }}
                    >
                      {availabilityData.selectedAvailability}
                      {" · "}
                      {availabilityData.selectedUrgency}
                    </CustomButton>
                    <Box
                      sx={{
                        display: "flex",
                        mt: 3,
                        gap: 1,
                        flexWrap: "wrap",
                        color: COLORS.BLACK_COLOR,
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <EditIcon />
                      <Link
                        href="#"
                        sx={{
                          color: COLORS.BLACK_COLOR,
                          textDecoration: "underline",
                        }}
                      >
                        Edit your experience
                      </Link>
                    </Box>
                  </>
                )}

              {option.title === "Set your Rates" && (
                <Box
                  sx={{
                    mt: 2,
                    borderRadius: "8px",
                    maxWidth: {
                      xs: 290,
                      sm: 330,
                      md: 450,
                    },
                  }}
                >
                  {[
                    { label: "General Rate", key: "generalRate" },
                    {
                      label: "Night Rate",
                      key: "nightRate",
                      tooltip: "This applies for overnight stays",
                    },
                    {
                      label: "Holiday Rate",
                      key: "holidayRate",
                      tooltip: "This applies for public holidays",
                    },
                    {
                      label: "Additional Child Rate",
                      key: "additionalChildRate",
                      tooltip: "This applies for each extra child",
                    },
                  ]
                    .filter(({ key }) => {
                      const value =
                        key in rateData
                          ? (rateData as any)[key]
                          : (rateData.rates as any)?.[key];
                      return (
                        value !== undefined && value !== null && value !== ""
                      );
                    })
                    .map(({ label, key, tooltip }) => {
                      const value =
                        key in rateData
                          ? (rateData as any)[key]
                          : (rateData.rates as any)[key];

                      return (
                        <Box
                          key={key}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Typography variant="body1">{label}</Typography>
                            {tooltip && (
                              <Tooltip title={tooltip} arrow>
                                <span style={{ display: "inline-flex" }}>
                                  <QuestionIcon />
                                </span>
                              </Tooltip>
                            )}
                          </Box>

                          <Typography variant="body1">
                            <span style={{ fontWeight: "bold" }}>${value}</span>{" "}
                            / hour
                          </Typography>
                        </Box>
                      );
                    })}
                </Box>
              )}

              {option.title === "Set your availability" && (
                <Box
                  sx={{
                    mt: 2,
                  }}
                >
                  {availabilityTimeData.selectedDays.length > 0 && (
                    <DaySelector
                      selectedDays={availabilityTimeData.selectedDays}
                      onChange={() => null}
                      justifyContent="left"
                    />
                  )}
                  {availabilityTimeData.selectedTimeSlots.length > 0 && (
                    <Button
                      variant="outlined"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 2,
                        borderRadius: "24px",
                        textTransform: "none",
                        fontSize: {
                          xs: "12px",
                          sm: "13px",
                          md: "14px",
                        },
                      }}
                    >
                      {availabilityTimeData.selectedTimeSlots[0]}s{" "}
                    </Button>
                  )}

                  {(availabilityTimeData.selectedDays.length > 0 ||
                    availabilityTimeData.selectedTimeSlots.length > 0) && (
                    <Box
                      sx={{
                        display: "flex",
                        mt: 3,
                        gap: 1,
                        flexWrap: "wrap",
                        color: COLORS.BLACK_COLOR,
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <EditIcon />
                      <Link
                        href="#"
                        sx={{
                          color: COLORS.BLACK_COLOR,
                          textDecoration: "underline",
                        }}
                      >
                        Edit rates
                      </Link>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
            {index < availabilityOptions.length - 1 && (
              <Divider sx={{ mt: 2 }} />
            )}
          </Box>
        ))}
      </Box>
      <AvailabilityForModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleAvailabilitySelection={handleAvailabilitySelection}
        handleUpdateProfileField={handleUpdateProfileField}
      />
      <AvailabilityRatesModal
        isRatesModalOpen={isRatesModalOpen}
        setIsRatesModalOpen={setIsRatesModalOpen}
        handleRatesSelection={handleRatesSelection}
        handleUpdateProfileField={handleUpdateProfileField}
      />
      <AvailabilitySetModal
        isAvailabilityModalOpen={isAvailabilityModalOpen}
        setIsAvailabilityModalOpen={setIsAvailabilityModalOpen}
        onSelectAvailabilitySet={onSelectAvailabilitySet}
        handleUpdateProfileField={handleUpdateProfileField}
      />
    </Box>
  );
};

export default Availability;
