"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageLoader from "./components/page-loader";

export default function Home() {
  // * Check if session exists, if not, redirect to signin
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    setLoading(false);

    if (!session?.user?.email) {
      router.push("/signin");
    } else {
      router.push("/profile");
    }
  }, [session, status, router]);

  return loading ? <PageLoader /> : null;
}
