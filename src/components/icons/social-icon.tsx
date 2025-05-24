import { GoogleIcon } from "./google-icon";
import { FBIcon } from "./fb-icon";

interface SocialIconProps {
  provider: "google" | "facebook";
}

export default function SocialIcon({ provider }: SocialIconProps) {
  const providerIcons = {
    google: <GoogleIcon />,
    facebook: <FBIcon />,
  };

  return providerIcons[provider];
}
