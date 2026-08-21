import "./globals.css";

export const metadata = {
  title: "Clinic CRM",
  description: "Internal clinic operations dashboard",
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