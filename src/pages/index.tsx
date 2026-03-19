import React from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";

export default function Home() {
  return (
    <Layout title="CaseLog - 让客户沟通持续沉淀">
      <Hero />
      <About />
      <Features />
    </Layout>
  );
}
