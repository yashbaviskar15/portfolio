import React from 'react';

export default function ExperienceWindow() {
  const timeline = [
    {
      period: '2023 – 2026',
      title: 'Bachelor of Computer Applications (BCA)',
      institution: 'Sandip University, Nashik',
      grade: 'CGPA: 8.14 / 10.0',
      badge: 'Academic Excellence',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
      details: [
        'Advanced coursework in Operating Systems, Computer Networks, Database Management Systems, and Cloud Computing architecture.',
        'Actively applied academic foundational theory directly into practical cloud infrastructure automation and containerization labs.',
      ],
    },
    {
      period: '2023 – Present',
      title: 'Cloud & DevOps Community Contributor',
      institution: 'Open Source & Technical Learning Circles',
      grade: 'Hands-on Labs',
      badge: 'Community & Projects',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      details: [
        'Built, automated, and documented four comprehensive cloud repositories across AWS, Terraform, Docker, and Kubernetes.',
        'Collaborated on open-source DevOps scripts, Prometheus dashboards, and cloud deployment guides.',
      ],
    },
    {
      period: '2021 – 2023',
      title: 'Higher Secondary Certificate (HSC) — Science',
      institution: 'Maharashtra State Board',
      grade: 'Completed',
      badge: 'Foundations',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      details: [
        'Foundations in Physics, Chemistry, Mathematics, and Computer Science fundamentals.',
      ],
    },
  ];

  return (
    <div className="p-4 sm:p-6 overflow-y-auto macos-scrollbar space-y-6 select-none bg-slate-950/30">
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
            Academic Background & Milestones
          </h2>
          <p className="text-xs text-white/60">Education, community engagement, and practical learning trajectory</p>
        </div>
        <div className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-xs font-mono text-cyan-300">
          CGPA 8.14
        </div>
      </div>

      {/* Timeline Items */}
      <div className="space-y-4">
        {timeline.map((item, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-2.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {item.period}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>
              <span className="text-xs font-mono text-white/80">{item.grade}</span>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-bold text-white font-heading">{item.title}</h3>
              <p className="text-xs text-white/60">{item.institution}</p>
            </div>

            <ul className="space-y-1 text-xs text-white/80 pt-1">
              {item.details.map((detail, di) => (
                <li key={di} className="flex items-start gap-2">
                  <i className="bi bi-check2-circle text-cyan-400 mt-0.5 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
