import { Suspense } from "react";
import VerifyEmailClient from "../views/VerifyEmailClient";


export const metadata = {
  title: "Verify Email | YourTimer",
};

export default function Page() {
  return (
    <Suspense fallback={<div>Verifying...</div>}>
      <VerifyEmailClient/>
    </Suspense>
  );
}