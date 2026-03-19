import React, { ReactNode } from "react";
import Head from "next/head";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "CaseLog",
  description = "Turn every customer conversation into a reusable growth asset.",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="scroll-smooth">
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
