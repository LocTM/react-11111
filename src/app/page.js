"use client";

import { AppButton } from "@app/components/app-button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToStudentsPage = () => {
    router.push("/students");
  }
  return (
  <main className="">
    <div className="text-2xl">
      
       <AppButton className="mr-2" color="blue" onClick={goToStudentsPage}>
          Go to students
       </AppButton>
       <AppButton color="red">
          Demo
       </AppButton>
    </div>
  </main>
  );
}
