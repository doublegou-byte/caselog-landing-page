import React from "react";
import Image from "next/image";

const About: React.FC = () => {
  return (
    <section id="about" className="pb-14 pt-6 md:pb-20 md:pt-10">
      <div className="shell-wide grid grid-cols-1 gap-6 md:grid-cols-12 md:items-stretch">
        <article className="section-shell flex h-full flex-col p-7 md:col-span-7 md:p-9">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">About CaseLog</p>
          <h2 className="font-display text-2xl font-bold leading-tight text-white md:text-[2.2rem]">
            Not just conversation logs
            <br />
            Turn fragmented information into executable assets
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
            With automatic transcription, key-point extraction, and task routing, CaseLog turns the sales process from
            one-off chats into a continuously compounding system.
          </p>

          <div className="mt-6 grid max-w-[640px] grid-cols-1 gap-2.5 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-3">
              <p className="text-sm font-semibold text-white">Complete Capture</p>
              <p className="mt-1 text-xs text-white/65">Every conversation is archived automatically with no details lost.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/35 p-3">
              <p className="text-sm font-semibold text-white">Auto Distillation</p>
              <p className="mt-1 text-xs text-white/65">Summaries and next actions are generated instantly.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/35 p-3">
              <p className="text-sm font-semibold text-white">Cross-Device Sync</p>
              <p className="mt-1 text-xs text-white/65">Phone and desktop stay synchronized in real time.</p>
            </div>
          </div>
        </article>

        <article className="section-shell flex h-full items-center justify-center p-5 md:col-span-5 md:p-6">
          <div className="flex items-start justify-center gap-2.5 md:gap-3">
            <Image
              src="/images/2.png"
              alt="CaseLog mobile interface preview one"
              width={198}
              height={396}
              className="h-auto w-[168px] rounded-[1.4rem] border border-white/10 md:w-[184px]"
            />
            <Image
              src="/images/3.gif"
              alt="CaseLog mobile interface preview two"
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
