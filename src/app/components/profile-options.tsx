import { IAdditionalInfo, IService } from "@/utils/profileUtils";
import { BabyChangingIcon } from "./icons/baby-changing-icon";
import { BathIcon } from "./icons/bath-icon";
import { BedroomIcon } from "./icons/bedroom-icon";
import { CarDirectionIcon } from "./icons/car-direction-icon";
import { ChildCareIcon } from "./icons/childcare-icon";
import { HouseIcon } from "./icons/house-icon";
import { HouseSidingIcon } from "./icons/house-siding-icon";
import { NightShelterIcon } from "./icons/night-shelter-icon";
import { OutDoorGrillIcon } from "./icons/outdoorgrill-icon";
import { PetIcon } from "./icons/pets.icon";
import { SickIcon } from "./icons/sick-icon";
import { SmokeFreeIcon } from "./icons/smoke-free-icon";
import { SwimmingIcon } from "./icons/swimming-icon";
import { VaccineIcon } from "./icons/vaccine-icon";
import { VirtualCareIcon } from "./icons/virtualcare-icon";
import { YardIcon } from "./icons/yard-icon";

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

export const additionalInfoOptions: IAdditionalInfo[] = [
  { id: "info-1", label: "Non-smoker", icon: <SmokeFreeIcon /> },
  { id: "info-2", label: "Own transport", icon: <CarDirectionIcon /> },
  { id: "info-3", label: "Comfortable with pets", icon: <PetIcon /> },
  { id: "info-4", label: "Willing to care for sick kids", icon: <SickIcon /> },
  { id: "info-5", label: "Exp. with twins/multiples", icon: <ChildCareIcon /> },
  {
    id: "info-6",
    label: "Exp. with special needs",
    icon: <BabyChangingIcon />,
  },
  { id: "info-7", label: "Exp. with nursing", icon: <VaccineIcon /> },
  {
    id: "info-8",
    label: "Available for after-school care",
    icon: <HouseIcon />,
  },
  {
    id: "info-9",
    label: "Interested in live-in jobs",
    icon: <HouseSidingIcon />,
  },
  { id: "info-10", label: "Interested in live-out jobs", icon: <YardIcon /> },
];

export const servicesList: IService[] = [
  {
    id: "service-1",
    label: "Cooking/Meal preparation",
    icon: <OutDoorGrillIcon />,
  },
  { id: "service-2", label: "Pick-up/Drop off", icon: <CarDirectionIcon /> },
  { id: "service-3", label: "Light housekeeping", icon: <HouseIcon /> },
  {
    id: "service-4",
    label: "Activities (e.g swimming)",
    icon: <SwimmingIcon />,
  },
  { id: "service-5", label: "Putting kids to bed", icon: <NightShelterIcon /> },
  { id: "service-6", label: "Homework help", icon: <BedroomIcon /> },
  { id: "service-7", label: "Bathing", icon: <BathIcon /> },
  { id: "service-8", label: "Virtual Care", icon: <VirtualCareIcon /> },
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
