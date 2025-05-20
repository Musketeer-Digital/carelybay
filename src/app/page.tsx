
export default function Home() {
  return <>Hello</>
}

// "use client";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function Home() {
//   // * Check if session exists, if not, redirect to signin
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     // Wait until session status is determined
//     if (status === "loading") {
//       return; // Do nothing while loading
//     }

//     if (!session?.user?.email) {
//       router.push("/signin"); // Redirect if not authenticated
//     }
//     // Optional: Redirect authenticated users to a dashboard or profile page
//     // else {
//     //   router.push("/profile");
//     // }
//   }, [session, status, router]); // Add dependencies

//   // Render loading state or placeholder for authenticated users
//   if (status === "loading") {
//     return <div>Loading...</div>; // Or return null;
//   }

//   if (session?.user?.email) {
//     // TODO: Replace with actual content for authenticated users or redirect
//     return <div>Welcome, authenticated user!</div>;
//   }

//   // Render null or a loading indicator while redirecting unauthenticated users
//   return null;
// }
