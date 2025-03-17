import { COLORS } from "@/constants/colors";
import { CakeIcon } from "@/app/components/icons/cake-icon";
import { MarkerIcon } from "@/app/components/icons/marker-icon";
import { LanguageIcon } from "@/app/components/icons/language-icon";
import { QualificationIcon } from "@/app/components/icons/qualification-icon";

interface ProfileDetail {
  icon: JSX.Element;
  title: string;
  value: string;
  onClick: () => void;
}

export interface IService {
  label: string;
  icon: JSX.Element;
}

export interface IServiceAge {
  ageValue: string;
  children: number;
}

export const getProfileBioComponents = (
  selectedCity: string,
  selectedLanguages: string[],
  selectedDOB: { month: string; day: string; year: string },
  selectedQualification: string,
  setIsCityModalOpen: (value: boolean) => void,
  setIsLanguageModalOpen: (value: boolean) => void,
  setIsDOBModalOpen: (value: boolean) => void,
  setIsQualificationModalOpen: (value: boolean) => void,
): ProfileDetail[] => [
  {
    icon: <MarkerIcon color={selectedCity ? COLORS.PRIMARY_COLOR : ""} />,
    title: "Where I live",
    value: selectedCity || "Click to select",
    onClick: () => setIsCityModalOpen(true),
  },
  {
    icon: (
      <LanguageIcon
        color={selectedLanguages.length > 0 ? COLORS.PRIMARY_COLOR : ""}
      />
    ),
    title: "Languages",
    value:
      selectedLanguages.length > 0
        ? selectedLanguages.join(", ")
        : "Click to select",
    onClick: () => setIsLanguageModalOpen(true),
  },
  {
    icon: (
      <CakeIcon
        color={
          selectedDOB.month && selectedDOB.day && selectedDOB.year
            ? COLORS.PRIMARY_COLOR
            : ""
        }
      />
    ),
    title: "Date of Birth",
    value:
      selectedDOB.month && selectedDOB.day && selectedDOB.year
        ? `${selectedDOB.month} ${selectedDOB.day}, ${selectedDOB.year}`
        : "Click to select",
    onClick: () => setIsDOBModalOpen(true),
  },
  {
    icon: (
      <QualificationIcon
        color={selectedQualification ? COLORS.PRIMARY_COLOR : ""}
      />
    ),
    title: "Qualification",
    value: selectedQualification || "Click to select",
    onClick: () => setIsQualificationModalOpen(true),
  },
];

export const toggleServiceAgeGroup = (
  ageObject: IServiceAge,
  setSelectedAges: Function,
) => {
  setSelectedAges((prev: IServiceAge[]) =>
    prev.some((item: IServiceAge) => item.ageValue === ageObject.ageValue)
      ? prev.filter((item) => item.ageValue !== ageObject.ageValue)
      : [...prev, { ...ageObject }],
  );
};

export const toggleService = (
  service: IService,
  setSelectedServices: Function,
) => {
  setSelectedServices((prev: IService[]) =>
    prev.some((s) => s.label === service.label)
      ? prev.filter((s) => s.label !== service.label)
      : [...prev, service],
  );
};

export const toggleAdditionalInfo = (
  info: any,
  setSelectedAdditionalInfo: Function,
) => {
  setSelectedAdditionalInfo((prev: any) => {
    if (prev.some((i: any) => i.label === info.label)) {
      return prev.filter((i: any) => i.label !== info.label);
    }
    return [...prev, info];
  });
};
