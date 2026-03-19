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
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/90">Core Capabilities</p>
          <h2 className="font-display mt-3 text-2xl font-bold leading-tight text-white md:text-4xl">
            Make customer communication manageable
            <br />
            Make sales execution scalable
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="section-shell p-6 md:p-8">
            <div className="space-y-3 rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between rounded-xl bg-black/45 px-3 py-2">
                <span className="text-sm text-white/70">New Conversations This Week</span>
                <span className="font-display text-lg font-bold text-primary">32 Sessions</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-black/45 px-3 py-2">
                <span className="text-sm text-white/70">Auto-Generated Action Items</span>
                <span className="font-display text-lg font-bold text-primary">18 Items</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-black/45 px-3 py-2">
                <span className="text-sm text-white/70">Reusable Customer Insights</span>
                <span className="font-display text-lg font-bold text-primary">95%</span>
              </div>
            </div>

            <h3 className="font-display mt-7 text-3xl font-bold leading-[1.08] text-white md:text-4xl">
              Choose your pace
              <br />
              Let CaseLog handle the busywork
            </h3>
            <p className="mt-3 max-w-md text-white/68">
              You stay focused on critical conversations while the system records, extracts, and follows through in the
              background.
            </p>
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
              Configurable preferences
              <br />
              Flexible, controllable workflows
            </h3>
            <p className="mt-3 max-w-md text-white/68">
              From talk-track focus to task cadence, configure rules for your team and keep improving the conversion path.
            </p>
          </article>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="section-shell p-6">
            <IconShell>
              <TranscriptIcon />
            </IconShell>
            <h4 className="mt-4 text-xl font-bold text-white">Call Transcription Summary</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/66">
              Every meeting is converted into structured notes and smart summaries that are searchable and reviewable.
            </p>
          </article>

          <article className="section-shell p-6">
            <IconShell>
              <TaskIcon />
            </IconShell>
            <h4 className="mt-4 text-xl font-bold text-white">Automatic Task Breakdown</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/66">
              Generate owners, next actions, and due dates automatically to prevent execution gaps after conversations.
            </p>
          </article>

          <article className="section-shell p-6">
            <IconShell>
              <ProfileIcon />
            </IconShell>
            <h4 className="mt-4 text-xl font-bold text-white">Customer Profile Iteration</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/66">
              Every interaction enriches customer context so your understanding gets sharper over time.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Features;
