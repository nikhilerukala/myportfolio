"use client";

import { Toaster } from "sonner";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      expand={false}
      closeButton={false}
      visibleToasts={1}
      mobileOffset={20}
      offset={20}
      gap={10}
    />
  );
}
