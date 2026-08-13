import "./globals.css";

export const metadata = {
  title: "Clinic Dashboard",
  description: "Internal Clinic Operations Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}