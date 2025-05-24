import ButtonAppBar from "@/components/ButtonAppBar";
import { auth } from "@/lib/auth";

export default async function Landing() {
  const session = await auth();
  console.log(session);
  return <>
    <ButtonAppBar session={session}/>
  </>;
}
