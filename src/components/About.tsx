import React from 'react';
import Image from 'next/image';

interface FeatureProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureProps> = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 relative">
      <div className="relative flex flex-row items-center justify-start">
        <Image 
            src="/images/checkbox-circle.svg"
            alt={title}
            width={24}
            height={24}
            className="text-primary mr-2"
          />
        <h3 className="text-xl font-semibold uppercase text-secondary mt-4 mb-2">{title}</h3>
      </div>
      
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold uppercase text-secondary text-center mb-6">关于客思录</h2>
        <p className="text-gray-500 text-center max-w-2xl mx-auto mb-16">
          不是简单记录沟通<br />
          而是把信息持续沉淀为客户档案
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-6">
              <FeatureCard 
                title="沟通完整记录"
                description="每一次交流都被保留下来，无需额外整理，也不会遗漏细节。"
              />
              <FeatureCard 
                title="内容自动整理"
                description="语音转文字，自动提炼重点，让沟通信息变得清晰、可查、可回看。"
              />
              <FeatureCard 
                title="持续形成客户档案"
                description="所有记录围绕客户沉淀，逐步积累完整的沟通历史与背景。"
              />
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative flex justify-center">
            <div className="w-64 h-64 bg-white rounded-full shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"></div>
            <div className="relative">
              <Image 
                src="/images/2.png"
                alt="Phone Mockup"
                width={350}
                height={600}
                className="mx-auto rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 