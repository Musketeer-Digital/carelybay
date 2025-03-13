"use client";

import { useState } from "react";
import { Button, Typography, Divider, Box, Link, Grid } from "@mui/material";
import { CalendarMonth, Edit } from "@mui/icons-material";
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
interface IService {
  label: string;
  icon: JSX.Element;
}

interface IAge {
  ageValue: string;
  children: number;
}
const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBabysitterModalOpen, setIsBabysitterModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const [isAgeModalOpen, setIsAgeModalOpen] = useState(false);
  const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] =
    useState(false);
  const [selectedAdditionalInfo, setSelectedAdditionalInfo] = useState([]);

  const [selectedAges, setSelectedAges] = useState<IAge[]>([]);

  const toggleAgeGroup = (ageObject: IAge) => {
    setSelectedAges((prev: IAge[]) =>
      prev.some((item: IAge) => item.ageValue === ageObject.ageValue)
        ? prev.filter((item) => item.ageValue !== ageObject.ageValue)
        : [...prev, { ...ageObject }],
    );
  };

  const toggleService = (service: IService) => {
    setSelectedServices((prev: IService[]) =>
      prev.some((s) => s.label === service.label)
        ? prev.filter((s) => s.label !== service.label)
        : [...prev, service],
    );
  };

  const toggleAdditionalInfo = (info: any) => {
    setSelectedAdditionalInfo((prev: any) => {
      if (prev.some((i: any) => i.label === info.label)) {
        return prev.filter((i: any) => i.label !== info.label);
      }
      return [...prev, info];
    });
  };

  console.log("selectedAges", selectedAges);
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
          {selectedServices.map((service: IService) => (
            <CustomButton
              variant="outlined"
              key={service.label}
              onClick={() => toggleService(service)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderRadius: "30px",
                color: "black",
                border: "1px solid black",
              }}
            >
              <GreyDotIcon />
              <Box component="span">{service.label}</Box>
            </CustomButton>
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
          {selectedServices.length === 0 ? (
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
            selectedAges.map((ageObjct: IAge) => (
              <Button
                key={ageObjct.ageValue}
                variant="outlined"
                onClick={() => toggleAgeGroup(ageObjct)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  borderRadius: "24px",
                  textTransform: "none",
                  color: "black",
                  borderColor: "black",
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
      <Box sx={{ mt: 3, mb: 4, cursor: "pointer" }}>
        {selectedAdditionalInfo.length > 0 && (
          <Grid container spacing={3} alignItems="center" sx={{ mt: 2 }}>
            {selectedAdditionalInfo.map(({ label, icon }) => (
              <Grid
                item
                key={label}
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
                  {icon}
                </Box>

                {/* Label */}
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    width: 100,
                    fontSize: "11px",
                    wordWrap: "break-word",
                  }}
                >
                  {label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}

        {selectedAdditionalInfo.length > 0 ? (
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
            }}
          >
            <PlusIcon />
            Add additional information
          </CustomButton>
        )}
      </Box>
      <BabySitterModal
        isBabysitterModalOpen={isBabysitterModalOpen}
        setIsBabysitterModalOpen={setIsBabysitterModalOpen}
      />
      <ServiceModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedServices={selectedServices}
        toggleService={toggleService}
      />
      <AgeModal
        isAgeModalOpen={isAgeModalOpen}
        setIsAgeModalOpen={setIsAgeModalOpen}
        toggleAgeGroup={toggleAgeGroup}
      />
      <AdditionalInfoModal
        isAdditionalInfoModalOpen={isAdditionalInfoModalOpen}
        setIsAdditionalInfoModalOpen={setIsAdditionalInfoModalOpen}
        selectedAdditionalInfo={selectedAdditionalInfo}
        toggleAdditionalInfo={toggleAdditionalInfo}
      />
    </Box>
  );
};

export default Services;
