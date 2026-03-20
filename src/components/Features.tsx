import React from "react";

type IconShellProps = {
  children: React.ReactNode;
};

const IconShell: React.FC<IconShellProps> = ({ children }) => {
  return <div className="flex h-12 w-12 items-center justify-center text-white">{children}</div>;
};

const TranscriptIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6.5 10.5v1a5.5 5.5 0 0 0 11 0v-1" />
      <path d="M12 17v4" />
      <path d="M8.5 21h7" />
    </svg>
  );
};

const TaskIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="4.5" width="16" height="15.5" rx="2.5" />
      <path d="M8 9h8" />
      <path d="M8 13h4" />
      <path d="M8 17h4" />
      <path d="m14 15 1.8 1.8L19 13.6" />
    </svg>
  );
};

const ProfileIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="9" r="3" />
      <path d="M4 18a5 5 0 0 1 10 0" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M14.5 18a4 4 0 0 1 5.5-3.7" />
    </svg>
  );
};

const Features: React.FC = () => {
  return (
    <section id="features" className="pb-12 pt-2 md:pb-20">
      <div className="shell-wide">
        <div className="mb-6 text-center md:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/90">核心能力</p>
          <h2 className="font-display mt-3 text-2xl font-bold leading-tight text-white md:text-4xl">
            让客户沟通可被管理
            <br />
            让销售动作可被放大
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="section-shell p-6 md:p-8">
            <div className="space-y-3 rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between rounded-xl bg-black/45 px-3 py-2">
                <span className="text-sm text-white/70">本周新增沟通</span>
                <span className="font-display text-lg font-bold text-primary">32 次</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-black/45 px-3 py-2">
                <span className="text-sm text-white/70">自动生成待办</span>
                <span className="font-display text-lg font-bold text-primary">18 项</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-black/45 px-3 py-2">
                <span className="text-sm text-white/70">可复用客户洞察</span>
                <span className="font-display text-lg font-bold text-primary">95%</span>
              </div>
            </div>

            <h3 className="font-display mt-7 text-3xl font-bold leading-[1.08] text-white md:text-4xl">
              选择你的节奏
              <br />
              CaseLog 自动作业
            </h3>
            <p className="mt-3 max-w-md text-white/68">你专注在关键对话，系统负责记录、提炼与跟进，让流程既轻盈又可控。</p>
          </article>

          <article className="section-shell p-6 md:p-8">
            <div className="flex h-52 items-center justify-center rounded-2xl border border-white/10 bg-black/30">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-primary/20">
                <div className="absolute inset-0 rotate-[-30deg] rounded-full border-[12px] border-transparent border-r-primary border-t-primary" />
                <div className="text-center">
                  <p className="font-display text-5xl font-bold text-white">24</p>
                  <p className="text-xs font-semibold tracking-[0.16em] text-white/70">HOURS</p>
                </div>
              </div>
            </div>

            <h3 className="font-display mt-7 text-3xl font-bold leading-[1.08] text-white md:text-4xl">
              交互偏好可配置
              <br />
              工作流灵活可控
            </h3>
            <p className="mt-3 max-w-md text-white/68">从话术重点到任务节奏，你可以按团队打法配置规则，持续优化转化链路。</p>
          </article>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="section-shell p-6">
            <IconShell>
              <TranscriptIcon />
            </IconShell>
            <h4 className="mt-4 text-xl font-bold text-white">录音转写总结</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/66">会后自动沉淀为结构化文本与智能摘要，后续可检索、可回看。</p>
          </article>

          <article className="section-shell p-6">
            <IconShell>
              <TaskIcon />
            </IconShell>
            <h4 className="mt-4 text-xl font-bold text-white">任务自动拆解</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/66">会后自动生成待办与日期，避免“聊完了但没人执行”。</p>
          </article>

          <article className="section-shell p-6">
            <IconShell>
              <ProfileIcon />
            </IconShell>
            <h4 className="mt-4 text-xl font-bold text-white">客户画像迭代</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/66">每一次互动都补全客户背景，让洞察逐步变得更精准。</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Features;
