import React from 'react';
import WindowFrame from './WindowFrame';
import ProjectsWindow from './Windows/ProjectsWindow';
import TerminalWindow from './Windows/TerminalWindow';
import ResumeWindow from './Windows/ResumeWindow';
import SkillsWindow from './Windows/SkillsWindow';
import ExperienceWindow from './Windows/ExperienceWindow';
import CertificationsWindow from './Windows/CertificationsWindow';
import ContactWindow from './Windows/ContactWindow';

export default function WindowManager({
  openWindows = {},
  activeWindow,
  onCloseWindow,
  onMinimizeWindow,
  onFocusWindow,
  onOpenWindow,
}) {
  const windowDefinitions = [
    {
      id: 'projects',
      title: 'Projects — Finder',
      icon: 'bi-folder2-open',
      defaultWidth: 'max-w-5xl',
      defaultHeight: 'h-[580px]',
      component: <ProjectsWindow />,
    },
    {
      id: 'terminal',
      title: 'yash@macbook-pro: ~ (zsh)',
      icon: 'bi-terminal-fill',
      defaultWidth: 'max-w-3xl',
      defaultHeight: 'h-[460px]',
      component: <TerminalWindow onOpenWindow={onOpenWindow} />,
    },
    {
      id: 'resume',
      title: 'Resume.pdf — Preview',
      icon: 'bi-file-earmark-pdf-fill',
      defaultWidth: 'max-w-4xl',
      defaultHeight: 'h-[600px]',
      component: <ResumeWindow />,
    },
    {
      id: 'skills',
      title: 'Expertise & Tech Stack — System Profiler',
      icon: 'bi-tools',
      defaultWidth: 'max-w-4xl',
      defaultHeight: 'h-[520px]',
      component: <SkillsWindow />,
    },
    {
      id: 'experience',
      title: 'Academic & Experience Timeline',
      icon: 'bi-mortarboard-fill',
      defaultWidth: 'max-w-3xl',
      defaultHeight: 'h-[500px]',
      component: <ExperienceWindow />,
    },
    {
      id: 'certifications',
      title: 'Technical Pathways & Validation',
      icon: 'bi-patch-check-fill',
      defaultWidth: 'max-w-4xl',
      defaultHeight: 'h-[520px]',
      component: <CertificationsWindow />,
    },
    {
      id: 'contact',
      title: 'Compose — Mail',
      icon: 'bi-envelope-fill',
      defaultWidth: 'max-w-3xl',
      defaultHeight: 'h-[540px]',
      component: <ContactWindow />,
    },
  ];

  return (
    <>
      {windowDefinitions.map((w) => {
        const isOpen = !!openWindows[w.id];
        const isFocused = activeWindow === w.id;
        const zIndex = isFocused ? 30 : 20;

        return (
          <WindowFrame
            key={w.id}
            id={w.id}
            title={w.title}
            icon={w.icon}
            isOpen={isOpen}
            onClose={() => onCloseWindow(w.id)}
            onMinimize={() => onMinimizeWindow(w.id)}
            onFocus={() => onFocusWindow(w.id)}
            zIndex={zIndex}
            defaultWidth={w.defaultWidth}
            defaultHeight={w.defaultHeight}
          >
            {w.component}
          </WindowFrame>
        );
      })}
    </>
  );
}
