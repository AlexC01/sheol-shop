import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import ToasterProvider from "./components/providers/ToasterProvider";
import "./globals.css";
import { Poppins } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"]
});

export const metadata = {
  title: "Sheol-Shop",
  description: "Sheol-Shop your clothes store"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
