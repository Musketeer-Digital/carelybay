import { BabyChangingIcon } from "../../icons/baby-changing-icon";
import { BathIcon } from "../../icons/bath-icon";
import { BedroomIcon } from "../../icons/bedroom-icon";
import { CarDirectionIcon } from "../../icons/car-direction-icon";
import { ChildCareIcon } from "../../icons/childcare-icon";
import { HouseIcon } from "../../icons/house-icon";
import { HouseSidingIcon } from "../../icons/house-siding-icon";
import { NightShelterIcon } from "../../icons/night-shelter-icon";
import { OutDoorGrillIcon } from "../../icons/outdoorgrill-icon";
import { PetIcon } from "../../icons/pets.icon";
import { SickIcon } from "../../icons/sick-icon";
import { SmokeFreeIcon } from "../../icons/smoke-free-icon";
import { SwimmingIcon } from "../../icons/swimming-icon";
import { VaccineIcon } from "../../icons/vaccine-icon";
import { VirtualCareIcon } from "../../icons/virtualcare-icon";
import { YardIcon } from "../../icons/yard-icon";
import { Service } from "./tabs/service-model/service-model";

export const qualificationsList: string[] = [
  "High School",
  "Bachelor Degree",
  "Master Degree",
  "Diploma",
  "Other",
];

export const citiesOptions = [
  "San Francisco, CA, USA",
  "New York, NY, USA",
  "Los Angeles, CA, USA",
  "Chicago, IL, USA",
  "Houston, TX, USA",
];

export const languagesOptions = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Arabic",
  "Hindi",
];

export const additionalInfoOptions = [
  { label: "Non-smoker", icon: <SmokeFreeIcon /> },
  { label: "Own transport", icon: <CarDirectionIcon /> },
  { label: "Comfortable with pets", icon: <PetIcon /> },
  {
    label: "Willing to care for sick kids",
    icon: <SickIcon />,
  },
  {
    label: "Exp. with twins/multiples",
    icon: <ChildCareIcon />,
  },
  {
    label: "Exp. with special needs",
    icon: <BabyChangingIcon />,
  },
  {
    label: "Exp. with nursing",
    icon: <VaccineIcon />,
  },
  {
    label: "Available for after-school care",
    icon: <HouseIcon />,
  },
  {
    label: "Interested in live-in jobs",
    icon: <HouseSidingIcon />,
  },
  {
    label: "Interested in live-out jobs",
    icon: <YardIcon />,
  },
];

export const servicesList: Service[] = [
  { label: "Cooking/Meal preparation", icon: <OutDoorGrillIcon /> },
  { label: "Pick-up/Drop off", icon: <CarDirectionIcon /> },
  { label: "Light housekeeping", icon: <HouseIcon /> },
  { label: "Activities (e.g swimming)", icon: <SwimmingIcon /> },
  { label: "Putting kids to bed", icon: <NightShelterIcon /> },
  { label: "Homework help", icon: <BedroomIcon /> },
  { label: "Bathing", icon: <BathIcon /> },
  { label: "Virtual Care", icon: <VirtualCareIcon /> },
];

export const availabilityOptions = ["Long term", "Short Term", "One time"];
export const urgencyOptions = [
  "As Soon As Possible (ASAP)",
  "Next Week",
  "Within Two Weeks",
  "Next Month",
];

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const timeSlots = ["9am - 5 pm", "6am - 9am", "2pm - 6pm", "From 6pm"];
