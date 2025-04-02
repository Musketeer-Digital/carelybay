"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  // * Check if session exists, if not, redirect to signin
  // const { data: session } = useSession();
  // const router = useRouter();
  // if (!session?.user?.email) {
  //   router.push("/signin");
  // }
  return <></>;
}
