import React from 'react';
import { GnomeDesktop } from './components/Gnome/GnomeDesktop';
import { ErrorBoundary } from './components/Gnome/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <GnomeDesktop />
    </ErrorBoundary>
  );
}