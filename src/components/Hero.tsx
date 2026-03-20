import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden pb-12 pt-3 md:pb-20 md:pt-4">
      <div className="section-shell shell-wide relative overflow-hidden rounded-[2.2rem]">
        <div className="relative px-5 pt-3 md:px-10 md:pt-4">
          <div className="flex items-center justify-between">
            <a href="#home" className="relative block h-8 w-28 md:h-9 md:w-32">
              <Image src="/images/logo (3).png" alt="CaseLog" fill className="object-contain" />
            </a>

            <div className="flex items-center gap-4 md:gap-8">
              <a href="#about" className="hidden text-sm font-medium text-white/82 transition-colors hover:text-white md:block">
                关于
              </a>
              <a href="#features" className="hidden text-sm font-medium text-white/82 transition-colors hover:text-white md:block">
                功能
              </a>
              <a
                href="#contact"
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#ffb340]"
              >
                立即体验
              </a>
            </div>
          </div>
        </div>

        <div className="grid min-h-[66vh] grid-cols-1 items-center gap-8 px-6 pb-10 pt-4 md:grid-cols-12 md:px-10 md:pb-14 md:pt-6">
          <div className="md:col-span-7">
            <p className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/8 px-3 py-1 text-xs font-semibold text-white/88">
              CaseLog CRM Intelligence
            </p>
            <h1 className="font-display text-3xl font-bold leading-[1.06] tracking-tight text-white md:text-[3.25rem] lg:text-[3.75rem]">
              每次沟通都沉淀价值
              <br />
              每位客户都可持续跟进
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/72 md:text-lg">
              从录音、转写到待办与客户档案，自动串起完整闭环。你的每一次销售动作，都能被留存、复用、增长。
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-[1.03] hover:bg-[#ffb340]"
              >
                申请内测名额
              </a>
              <a
                href="#features"
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/12"
              >
                查看核心功能
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md md:col-span-5 md:max-w-none">
            <Image
              src="/images/1.gif"
              alt="CaseLog app preview"
              width={320}
              height={600}
              className="relative mx-auto rounded-[2rem] border border-white/10 shadow-[0_35px_90px_rgba(0,0,0,0.58)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
