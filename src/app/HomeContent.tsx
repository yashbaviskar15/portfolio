import { portfolioData } from '@/data/portfolio';
import CopyToClipboard from '@/components/CopyToClipboard';
import ObfuscatedMailto from '@/components/ObfuscatedMailto';

/**
 * Server-rendered, fully crawlable content for SEO, ATS parsers and visitors
 * with JavaScript disabled. Once the interactive desktop mounts, CSS
 * (`html[data-hydrated="true"] #seo-fallback`) hides this block.
 *
 * Content mirrors the interactive apps exactly — nothing here is invented.
 */
export default function HomeContent() {
  const {
    developer,
    education,
    experience,
    languages,
    skills,
    projects,
    technicalSkills,
    contact,
  } = portfolioData;

  const [emailUser, emailDomain] = contact.email.split('@');

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 text-neutral-100">
      {/* ---------- Header ---------- */}
      <header className="border-b border-white/10 pb-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-orange-400">
          Ubuntu-style desktop portfolio
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">{developer.name}</h1>
        <p className="mt-2 text-xl text-neutral-300">{developer.role}</p>
        <p className="mt-1 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
          {developer.status}
        </p>

        <ul className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          <li className="text-neutral-300">
            <span className="sr-only">Email: </span>
            <span aria-hidden="true">{contact.email}</span>
          </li>
          <li>
            <ObfuscatedMailto user={emailUser} domain={emailDomain} label="Email me" />
          </li>
          <li>
            <CopyToClipboard value={contact.phone} label="Copy phone" copiedLabel="Phone copied" toastMessage="Phone number copied" />
          </li>
          <li>
            <a href={contact.github} className="hover:text-white" rel="noopener noreferrer" target="_blank">
              GitHub (yashbaviskar15)
            </a>
          </li>
          <li>
            <a href={contact.linkedin} className="hover:text-white" rel="noopener noreferrer" target="_blank">
              LinkedIn (in/yashbaviskar15)
            </a>
          </li>
          <li>
            <a href="/YASH_BAVISKAR_CV.pdf" download className="hover:text-white">
              Download CV (PDF)
            </a>
          </li>
          <li>
            <a href="/YASH_BAVISKAR_CV.docx" download className="hover:text-white">
              Download CV (Word)
            </a>
          </li>
        </ul>
      </header>

      {/* ---------- About ---------- */}
      <section aria-labelledby="about-heading" className="mt-10">
        <h2 id="about-heading" className="text-2xl font-semibold">
          About
        </h2>
        <p className="mt-3 leading-relaxed text-neutral-300">{developer.summary}</p>
      </section>

      {/* ---------- Experience ---------- */}
      <section aria-labelledby="experience-heading" className="mt-10">
        <h2 id="experience-heading" className="text-2xl font-semibold">
          Experience
        </h2>
        <div className="mt-4 space-y-6">
          {experience.map((job) => (
            <article key={job.id} className="rounded-lg border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold">
                {job.role} — {job.company}
              </h3>
              <p className="text-sm text-neutral-400">
                {job.location} · {job.period}
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-300">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Education ---------- */}
      <section aria-labelledby="education-heading" className="mt-10">
        <h2 id="education-heading" className="text-2xl font-semibold">
          Education
        </h2>
        <article className="mt-4 rounded-lg border border-white/10 bg-white/5 p-5">
          <h3 className="text-lg font-semibold">{education.degree}</h3>
          <p className="text-sm text-neutral-300">
            {education.institution}, {education.location}
          </p>
          <p className="text-sm text-neutral-400">
            {education.period} · CGPA {education.cgpa}
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-300">
            {education.coursework.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </article>
      </section>

      {/* ---------- Skills ---------- */}
      <section aria-labelledby="skills-heading" className="mt-10">
        <h2 id="skills-heading" className="text-2xl font-semibold">
          Technical Skills
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {skills.map((cat) => (
            <div key={cat.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="font-semibold">{cat.category}</h3>
              <p className="mt-2 text-sm text-neutral-300">{cat.items.join(' · ')}</p>
            </div>
          ))}
        </div>
        <details className="mt-4 text-sm text-neutral-400">
          <summary className="cursor-pointer">Full tooling list</summary>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {Object.values(technicalSkills).flat().map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      </section>

      {/* ---------- Projects ---------- */}
      <section aria-labelledby="projects-heading" className="mt-10">
        <h2 id="projects-heading" className="text-2xl font-semibold">
          Projects
        </h2>
        <div className="mt-4 space-y-6">
          {projects.map((p) => (
            <article key={p.id} className="rounded-lg border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-neutral-400">
                {p.category} · {p.status}
              </p>
              <p className="mt-2 text-neutral-300">{p.solution}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-300">
                {p.bulletPoints.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-neutral-400">
                Technologies: {p.technologies.join(', ')}
              </p>
              <p className="mt-1 text-sm">
                <a href={p.github} className="text-orange-400 hover:text-orange-300" rel="noopener noreferrer" target="_blank">
                  {p.github}
                </a>
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Languages ---------- */}
      <section aria-labelledby="languages-heading" className="mt-10">
        <h2 id="languages-heading" className="text-2xl font-semibold">
          Languages
        </h2>
        <ul className="mt-4 grid list-disc gap-1 pl-5 text-neutral-300 sm:grid-cols-2">
          {languages.map((l) => (
            <li key={l.language}>
              {l.language} — {l.proficiency}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Contact ---------- */}
      <section aria-labelledby="contact-heading" className="mt-10 border-t border-white/10 pt-8">
        <h2 id="contact-heading" className="text-2xl font-semibold">
          Contact
        </h2>
        <p className="mt-3 text-neutral-300">
          {contact.location} · Open to relocation to Germany and other EU countries.
        </p>
        <ul className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <li className="text-neutral-300">
            <span className="sr-only">Email: </span>
            <span aria-hidden="true">{contact.email}</span>
          </li>
          <li>
            <ObfuscatedMailto user={emailUser} domain={emailDomain} label="Send an email" />
          </li>
          <li>
            <CopyToClipboard value={contact.phone} label="Copy phone" copiedLabel="Phone copied" toastMessage="Phone number copied" />
          </li>
        </ul>
        <p className="mt-6 text-sm text-neutral-500">
          Tip: this portfolio also opens as an interactive desktop (windows, dock, terminal) once
          JavaScript loads — the text above stays available for search engines, applicant tracking
          systems and non-JavaScript visitors.
        </p>
      </section>
    </main>
  );
}
