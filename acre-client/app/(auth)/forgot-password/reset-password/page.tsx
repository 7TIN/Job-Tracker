"use client";

import React, { Suspense } from "react";
import ResetPasswordForm from "./resetPasswordForm"; // Move your entire form logic into this component.

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}