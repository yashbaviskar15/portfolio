import { useEffect } from 'react';

/**
 * Hook to isolate desktop keyboard shortcuts and prevent unwanted browser / PC shortcut interference,
 * while strictly preserving normal typing and editing inside inputs, textareas, terminals, and forms.
 */
export function useShortcutIsolation(options?: {
  onTriggerHelp?: () => void;
  onTriggerFind?: () => void;
}) {
  useEffect(() => {
    const isTextInput = (el: EventTarget | null): boolean => {
      if (!el || !(el instanceof HTMLElement)) return false;
      const tagName = el.tagName;
      return (
        tagName === 'INPUT' ||
        tagName === 'TEXTAREA' ||
        tagName === 'SELECT' ||
        el.isContentEditable ||
        el.closest('input, textarea, [contenteditable="true"]') !== null
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const targetIsInput = isTextInput(e.target);
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      // 1. Universal Dangerous Keys (prevent browser default actions)
      // Save Page (Ctrl+S / Cmd+S)
      if (isCtrlOrMeta && key === 's' && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        if (!targetIsInput) e.stopPropagation();
        return;
      }

      // Tab / Window Close (Ctrl+W / Cmd+W)
      if (isCtrlOrMeta && key === 'w' && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        if (!targetIsInput) e.stopPropagation();
        return;
      }

      // View Source (Ctrl+U / Cmd+U)
      if (isCtrlOrMeta && key === 'u' && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Page Reload (F5, Ctrl+R, Ctrl+F5, Ctrl+Shift+R)
      if (e.key === 'F5' || (isCtrlOrMeta && key === 'r')) {
        e.preventDefault();
        if (!targetIsInput) e.stopPropagation();
        return;
      }

      // Print Page (Ctrl+P / Cmd+P)
      if (isCtrlOrMeta && key === 'p' && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // DevTools Inspection (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C)
      if (
        e.key === 'F12' ||
        (isCtrlOrMeta && e.shiftKey && ['i', 'j', 'c'].includes(key))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Caret Browsing (F7)
      if (e.key === 'F7') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Browser History Back/Forward (Alt+Left, Alt+Right)
      if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // 2. Navigation & Browser Shell Interceptions (Applied when NOT actively editing text)
      if (!targetIsInput) {
        // Browser Bookmark (Ctrl+D / Cmd+D)
        if (isCtrlOrMeta && key === 'd' && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        // Browser History (Ctrl+H / Cmd+H)
        if (isCtrlOrMeta && key === 'h' && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        // Browser Downloads (Ctrl+J / Cmd+J)
        if (isCtrlOrMeta && key === 'j' && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        // Browser Address Bar / Focus (Ctrl+L / Cmd+L)
        if (isCtrlOrMeta && key === 'l' && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        // Browser Find Bar (Ctrl+F, F3, Ctrl+G) -> optionally route to app finder
        if (
          (isCtrlOrMeta && key === 'f' && !e.shiftKey && !e.altKey) ||
          e.key === 'F3' ||
          (isCtrlOrMeta && key === 'g')
        ) {
          e.preventDefault();
          e.stopPropagation();
          options?.onTriggerFind?.();
          return;
        }

        // Browser Help (F1) -> route to app help
        if (e.key === 'F1') {
          e.preventDefault();
          e.stopPropagation();
          options?.onTriggerHelp?.();
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [options]);
}
