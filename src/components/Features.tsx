import React from 'react';
import Image from 'next/image';

const Features: React.FC = () => {
  return (
    <section id="features" className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/features-bg.png"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold uppercase text-white mb-4">应用功能</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            每一次沟通，都会留下可持续价值<br />
            围绕客户沟通的记录、整理与沉淀，构建完整的信息链路
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Features */}
          <div className="md:col-span-4 flex flex-col justify-center">
            <div className="mb-16">
              <div className="flex justify-center mb-3">
                <Image
                  src="/images/microphone-icon.webp"
                  alt="Recording Feature"
                  width={50}
                  height={50}
                  className="text-white"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold uppercase text-white mb-2 text-center">实时录音</h3>
              <p className="text-white/80 text-center">一键记录沟通过程，自动归档到对应客户。</p>
            </div>
            
            <div className="mb-16">
              <div className="flex justify-center mb-3">
                <Image
                  src="/images/management.webp"
                  alt="Transcription Feature"
                  width={50}
                  height={50}
                  className="text-white"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold uppercase text-white mb-2 text-center">转录与摘要</h3>
              <p className="text-white/80 text-center">自动生成文字记录，快速查看重点线索。</p>
            </div>
          </div>
          
          {/* Center Phone Screenshot */}
          <div className={`md:col-span-4 h-190 flex justify-center items-center order-first md:order-none mb-12 md:mb-0`}>
            <Image
              src="/images/3.gif"
              alt="App Screenshot"
              width={350}
              height={700}
              className="rounded-3xl shadow-xl"
            />
          </div>
          
          {/* Right Features */}
          <div className="md:col-span-4 flex flex-col justify-center">
            <div className="mb-16">
              <div className="flex justify-center mb-3">
                <Image
                  src="/images/task.webp"
                  alt="Tasks Feature"
                  width={50}
                  height={50}
                  className="text-white"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold uppercase text-white mb-2 text-center">待办与跟进</h3>
              <p className="text-white/80 text-center">沟通结束自动形成待办，确保每一次交流都有后续。</p>
            </div>
            
            <div className="mb-16">
              <div className="flex justify-center mb-3">
                <Image
                  src="/images/icon-customer.svg"
                  alt="Customer Management Feature"
                  width={50}
                  height={50}
                  className="text-white"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold uppercase text-white mb-2 text-center">客户管理</h3>
              <p className="text-white/80 text-center">统一管理客户信息，所有沟通记录集中查看。</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="md:col-span-1">
            <div className="flex justify-center mb-3">
              <Image
                src="/images/phone.webp"
                alt="iOS and Android Support"
                width={50}
                height={50}
                className="text-white"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold uppercase text-white mb-2 text-center">iOS 和 Android</h3>
            <p className="text-white/80 text-center">支持主流移动平台，无论您使用什么设备，都能享受优质体验。</p>
          </div>
          <div className="md:col-span-1">
            <div className="flex justify-center mb-3">
              <Image
                src="/images/cloud.webp"
                alt="Cross Platform Feature"
                width={50}
                height={50}
                className="text-white"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold uppercase text-white mb-2 text-center">多端同步</h3>
            <p className="text-white/80 text-center">数据实时同步，随时随地访问您的客户档案和沟通记录。</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 