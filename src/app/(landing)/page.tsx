import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import { auth } from "@/lib/auth";

export default async function Landing() {
  const session = await auth();
  console.log(session);
  return <>
    <ResponsiveAppBar session={session}/>
  </>;
}
