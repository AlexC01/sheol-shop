import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import ToasterProvider from "./components/providers/ToasterProvider";
import "./globals.css";
import { Poppins } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";
import getCategoriesNavbar from "./actions/getCategories";

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
  const categories = await getCategoriesNavbar();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} categories={categories} />
        {children}
      </body>
    </html>
  );
}
