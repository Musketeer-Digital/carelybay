"use client";

import { useEffect, useState } from "react";
import { Button, Typography, Divider, Box, Link, Grid } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import ServiceModal from "./service-model/service-model";
import AgeModal from "./service-model/service-age";
import AdditionalInfoModal from "./service-model/service-additional-info";
import { COLORS } from "@/constants/colors";
import CustomButton from "@/app/components/CustomButton";
import { EditIcon } from "@/app/components/icons/edit-icon";
import { BabySitterIcon } from "@/app/components/icons/babysitter-icon";
import { ChildCareIcon } from "@/app/components/icons/childcare-icon";
import { PlusIcon } from "@/app/components/icons/plus-icon";
import { SPAIcon } from "@/app/components/icons/spa-icon";
import { GreyDotIcon } from "@/app/components/icons/greydot-icon";
import BabySitterModal from "./service-model/baby-sitter";
import {
  IAdditionalInfo,
  IService,
  IServiceAge,
  toggleService,
  toggleServiceAgeGroup,
} from "@/utils/profileUtils";
import { useProfileStore } from "@/store/profileSlice";
import { updateProfile } from "@/utils/api/profile";
import { getIconByLabel } from "@/utils/utils";
import { additionalInfoOptions } from "../profile-options";

const Services = () => {
  // model toggle states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBabysitterModalOpen, setIsBabysitterModalOpen] = useState(false);
  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);
  const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] =
    useState(false);

  // local states
  const [childCarerTypes, setChildCarTypes] = useState<string[]>([]);
  const [storedServices, setStoredServices] = useState<IService[]>([]);
  const [storedAdditionalInfo, setStoredAdditionalInfo] = useState<
    IAdditionalInfo[]
  >([]);
  const [selectedAges, setSelectedAges] = useState<IServiceAge[]>([]);

  const { userProfile, setUserProfile } = useProfileStore();

  useEffect(() => {
    if (userProfile?.servicesExperience) {
      setStoredServices(userProfile.servicesExperience.services || []);
      setStoredAdditionalInfo(
        userProfile.servicesExperience.additionalInfo || [],
      );
      setChildCarTypes(userProfile.servicesExperience.childCarerType || []);
      setSelectedAges(userProfile.servicesExperience.ageGroupExperience || []);
    }
  }, [userProfile]);

  const handleUpdateProfileField = async (
    field: keyof typeof userProfile.servicesExperience,
    value: any,
  ) => {
    try {
      if (!userProfile?._id) {
        console.error("Profile ID is missing");
        return;
      }

      const updatedProfile = await updateProfile({
        ...userProfile,
        servicesExperience: {
          ...userProfile.servicesExperience,
          [field]: value,
        },
      });

      setUserProfile(updatedProfile);
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        mx: "auto",
        mt: 5,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Services & Experience
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <ChildCareIcon /> What kind of child carer are you?
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {childCarerTypes.map((childCare) => {
            return (
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  bgcolor: "#E0E8EF",
                  borderRadius: 4,
                  px: 1,
                  p: 3,
                  py: 1.2,
                  width: "fit-content",
                  mb: 3,
                  mt: 2,
                  height: 65,
                }}
                onClick={() => setIsBabysitterModalOpen(true)}
              >
                <Box
                  sx={{
                    bgcolor: "white",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 30,
                    height: 30,
                  }}
                >
                  <BabySitterIcon />
                </Box>
                <Typography fontSize="1rem">{childCare}</Typography>
              </Box>
            );
          })}
        </Box>
        {!childCarerTypes.length && (
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "#E0E8EF",
              borderRadius: 4,
              px: 1,
              p: 3,
              py: 1.2,
              width: "fit-content",
              mb: 3,
              mt: 2,
              height: 65,
            }}
            onClick={() => setIsBabysitterModalOpen(true)}
          >
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                height: 30,
              }}
            >
              <BabySitterIcon />
            </Box>
            <Typography fontSize="1rem">Babysitter</Typography>
          </Box>
        )}
      </Box>
      <Divider />
      <Box
        sx={{ mt: 3, mb: 4, cursor: "pointer" }}
        onClick={() => setIsAgeModalOpen(true)}
      >
        <Typography
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <CalendarMonth /> I am comfortable caring for children aged *
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
          {selectedAges.length === 0 ? (
            <Typography sx={{ ml: 4 }} color="textSecondary">
              Ex: “Newborn · up to 12 months”
            </Typography>
          ) : (
            selectedAges.map((ageObjct: IServiceAge) => (
              <Button
                key={ageObjct.ageValue}
                variant="outlined"
                onClick={() => toggleServiceAgeGroup(ageObjct, setSelectedAges)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  borderRadius: "24px",
                  textTransform: "none",
                  color: "black",
                  borderColor: "black",
                  fontSize: {
                    xs: "12px",
                    sm: "13px",
                    md: "14px",
                  },
                }}
              >
                0-{ageObjct.ageValue} Year · {ageObjct.children}
                {ageObjct.children > 1 ? " children" : " child"}
              </Button>
            ))
          )}
        </Box>
        {selectedAges.length > 0 && (
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
            onClick={() => setIsAgeModalOpen(true)}
          >
            <EditIcon />
            <Link
              href="#"
              sx={{
                color: COLORS.BLACK_COLOR,
                textDecoration: "none",
              }}
            >
              Edit your experience
            </Link>
          </Box>
        )}
      </Box>
      <Divider />

      <Box sx={{ mt: 3 }}>
        <Typography
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <SPAIcon /> Add your Services provided
        </Typography>
        <Typography sx={{ ml: 4 }} color="textSecondary">
          Skills Ex: Cooking/Meal preparation
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
          {storedServices.map((service: IService) => (
            <CustomButton
              variant="outlined"
              key={service.id}
              onClick={() => toggleService(service, setStoredServices)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderRadius: "30px",
                color: "black",
                border: "1px solid black",
                fontSize: {
                  xs: "12px",
                  sm: "13px",
                  md: "14px",
                },
              }}
            >
              <GreyDotIcon />
              <Box component="span">{service.label}</Box>
            </CustomButton>
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
          {storedServices.length === 0 ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              {[...Array(3)].map((_, index) => (
                <CustomButton
                  key={index}
                  variant="outlined"
                  sx={{
                    border: "1px dashed black",
                    borderRadius: "24px",
                    width: 70,
                    height: 35,
                    minWidth: "unset",
                    padding: 0,
                    color: "black",
                    "&:hover": { bgcolor: "transparent" },
                    fontSize: 18,
                  }}
                  onClick={() => setIsModalOpen(true)}
                >
                  +
                </CustomButton>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                color: COLORS.BLACK_COLOR,
                alignItems: "center",
                cursor: "pointer",
                mt: 3,
              }}
              onClick={() => setIsModalOpen(true)}
            >
              <EditIcon />
              <Link
                href="#"
                sx={{
                  color: COLORS.BLACK_COLOR,
                  textDecoration: "none",
                }}
              >
                Edit your services
              </Link>
            </Box>
          )}
        </Box>
      </Box>
      <Divider />
      <Box sx={{ mt: 3, mb: 4, cursor: "pointer" }}>
        {storedAdditionalInfo.length > 0 && (
          <Grid container spacing={3} alignItems="center" sx={{ mt: 2 }}>
            {storedAdditionalInfo.map(({ id, label, icon }) => (
              <Grid
                item
                key={id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {/* Circular Icon */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: "#E0E8EF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {getIconByLabel(label, additionalInfoOptions)}
                </Box>

                {/* Label */}
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    width: 100,
                    fontSize: "11px",
                    lineHeight: "14px",
                    height: "28px",
                    textAlign: "center",
                    wordWrap: "break-word",
                  }}
                >
                  {label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}

        {storedAdditionalInfo.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              color: COLORS.BLACK_COLOR,
              alignItems: "center",
              cursor: "pointer",
              mt: 3,
            }}
            onClick={() => setIsAdditionalInfoModalOpen(true)}
          >
            <EditIcon />
            <Link
              href="#"
              sx={{
                color: COLORS.BLACK_COLOR,
                textDecoration: "none",
              }}
            >
              Edit additional information
            </Link>
          </Box>
        ) : (
          <CustomButton
            variant="outlined"
            onClick={() => setIsAdditionalInfoModalOpen(true)}
            sx={{
              mt: 3,
              color: COLORS.BLACK_COLOR,
              borderColor: COLORS.BLACK_COLOR,
              height: 35,
              borderRadius: 4,
              gap: 1,
            }}
          >
            <PlusIcon /> Add additional information
          </CustomButton>
        )}
      </Box>
      <BabySitterModal
        isBabysitterModalOpen={isBabysitterModalOpen}
        setIsBabysitterModalOpen={setIsBabysitterModalOpen}
        handleUpdateProfileField={handleUpdateProfileField}
      />
      <ServiceModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        storedServices={storedServices}
        handleUpdateProfileField={handleUpdateProfileField}
      />
      <AgeModal
        isAgeModalOpen={isAgeModalOpen}
        setIsAgeModalOpen={setIsAgeModalOpen}
        toggleServiceAgeGroup={(ageObject: IServiceAge) =>
          toggleServiceAgeGroup(ageObject, setSelectedAges)
        }
        handleUpdateProfileField={handleUpdateProfileField}
      />
      <AdditionalInfoModal
        isAdditionalInfoModalOpen={isAdditionalInfoModalOpen}
        setIsAdditionalInfoModalOpen={setIsAdditionalInfoModalOpen}
        storedAdditionalInfo={storedAdditionalInfo}
        handleUpdateProfileField={handleUpdateProfileField}
      />
    </Box>
  );
};

export default Services;
