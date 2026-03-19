import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Features from '@/components/Features';

export default function Home() {
  return (
    <Layout title="App Landing Page - 移动应用着陆页">
      <Hero />
      <About />
      <Features />
    </Layout>
  );
}
