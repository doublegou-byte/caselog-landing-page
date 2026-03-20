import React from "react";
import Image from "next/image";

const About: React.FC = () => {
  return (
    <section id="about" className="pb-14 pt-6 md:pb-20 md:pt-10">
      <div className="shell-wide grid grid-cols-1 gap-6 md:grid-cols-12 md:items-stretch">
        <article className="section-shell flex h-full flex-col p-7 md:col-span-7 md:p-9">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">关于 CaseLog</p>
          <h2 className="font-display text-2xl font-bold leading-tight text-white md:text-[2.2rem]">
            不只是记录沟通
            <br />
            而是把碎片信息变成可执行资产
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
            通过自动转写、重点提炼和任务分发，CaseLog 让销售过程从“聊完即散”变成“持续沉淀、持续转化”。
          </p>

          <div className="mt-6 grid max-w-[640px] grid-cols-1 gap-2.5 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-3">
              <p className="text-sm font-semibold text-white">完整记录</p>
              <p className="mt-1 text-xs text-white/65">会话自动归档，不再遗漏细节。</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/35 p-3">
              <p className="text-sm font-semibold text-white">自动提炼</p>
              <p className="mt-1 text-xs text-white/65">摘要与待办自动生成。</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/35 p-3">
              <p className="text-sm font-semibold text-white">多端同步</p>
              <p className="mt-1 text-xs text-white/65">手机与桌面实时同步更新。</p>
            </div>
          </div>
        </article>

        <article className="section-shell flex h-full items-center justify-center p-5 md:col-span-5 md:p-6">
          <div className="flex items-start justify-center gap-2.5 md:gap-3">
            <Image
              src="/images/2.png"
              alt="CaseLog 客户沟通移动端界面一"
              width={198}
              height={396}
              className="h-auto w-[168px] rounded-[1.4rem] border border-white/10 md:w-[184px]"
            />
            <Image
              src="/images/3.webp"
              alt="CaseLog 客户沟通移动端界面二"
              width={198}
              height={396}
              className="h-auto w-[168px] rounded-[1.4rem] border border-white/10 md:w-[184px]"
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default About;
