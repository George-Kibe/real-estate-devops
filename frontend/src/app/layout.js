import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainProvider } from "@/providers/MainProvider";
import AuthProvider  from "@/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Real Estate",
  description: "Search for Properties in Top Us cities ",
  icons: {icon: '/images/house.png'}
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
      <ToastContainer />
      <ThemeProvider 
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        storageKey="abdul-simba"
        >
          <MainProvider>
          <AuthProvider>
            <NavBar />
              {children}
            <Footer />
          </AuthProvider>
          </MainProvider>
        </ThemeProvider>
        </body>
    </html>
  );
}
