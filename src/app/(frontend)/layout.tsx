import React from "react";
import "./styles.css";

export const metadata = {
  title: "Wetlands",
  description: "This is the frontend application.",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
