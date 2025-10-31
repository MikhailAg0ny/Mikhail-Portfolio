const contactChannels = [
  {
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/username",
    href: "https://linkedin.com/in/username",
  },
  {
    label: "GitHub",
    value: "github.com/username",
    href: "https://github.com/username",
  },
];

function ContactPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl px-6 py-16 sm:px-10">
      <header className="space-y-6">
        <p className="text-sm uppercase tracking-[0.45em] text-teal-500">Contact</p>
        <h1 className="text-3xl font-semibold text-slate-100 md:text-4xl">
          Let&apos;s collaborate on your next project.
        </h1>
        <p className="text-base text-slate-300 md:text-lg">
          Share the story you want to tell, the problem you want to solve, or the experience you want to build. I&apos;ll respond within two business days.
        </p>
      </header>

      <section className="mt-12 space-y-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
          <h2 className="text-xl font-semibold text-slate-100">Project Brief Starter</h2>
          <p className="mt-4 text-sm text-slate-300">
            When reaching out, let me know about the audience, the outcomes you&apos;re aiming for, and any timelines or constraints. This context helps me prepare meaningful next steps.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
          <h2 className="text-xl font-semibold text-slate-100">Contact Channels</h2>
          <ul className="mt-6 space-y-4 text-sm text-teal-300">
            {contactChannels.map((channel) => (
              <li key={channel.label}>
                <a className="transition hover:text-teal-200" href={channel.href}>
                  <span className="text-slate-400">{channel.label}:</span> {channel.value}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
          <h2 className="text-xl font-semibold text-slate-100">Availability</h2>
          <p className="mt-4 text-sm text-slate-300">
            Currently open for contract collaborations, portfolio consultations, and speaking engagements focused on front-end craft and game development pipelines.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
