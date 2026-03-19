import React from 'react';
import Image from 'next/image';
import Header from './Header';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero-background.png"
          alt="Background"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
      <Header/>
      
      <div className="container mx-auto px-4 z-10 pt-80 md:pt-32 lg:pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative w-full md:w-160 h-auto md:h-120">
            <div className="hidden md:block absolute top-0 left-20 w-160 h-100 border-[#7572FF] border-[18px]"></div>
            <div className="bg-white p-6 md:p-8 pb-8 md:pb-12 mb-6 md:ml-8 md:mt-8 z-10 md:absolute md:top-10 rounded-lg md:rounded-none shadow-lg md:shadow-none">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary uppercase leading-tight text-[#5956E9]">
                你和客户聊过的内容，<br />
                90%都被浪费了
              </h1>
              <p className="text-gray-800 my-4 md:mb-8 max-w-xl">
                录音只是开始<br />
                自动转录、提炼重点、生成待办，并持续沉淀为客户档案<br />
                让每一次沟通，不只是结束，而是积累<br />
                从一次对话，到长期可复用的客户资产
              </p>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-secondary uppercase mb-4">
                  扫码联系我们，获取内测，速来尝鲜
                </h3>
                <div className="flex flex-row flex-wrap gap-4">
                  <div className="block w-32 h-32 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                    <Image 
                      src="/images/qr-code-1.jpg"
                      alt="QR Code 1"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="block w-32 h-32 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                    <Image 
                      src="/images/qr-code-2.jpg"
                      alt="QR Code 2"
                      width={120}
                      height={120}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative hidden md:block absolute top-0 -right-40">
            <Image 
              src="/images/1.gif"
              alt="App Demo"
              width={280}
              height={560}
              className="mx-auto rounded-3xl shadow-xl"
            />
          </div>
          
          {/* Mobile phone mockup - only visible on mobile */}
          <div className="relative flex justify-center md:hidden mb-8">
            <Image 
              src="/images/mobile-mockup.png"
              alt="Mobile App Mockup"
              width={300}
              height={400}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 