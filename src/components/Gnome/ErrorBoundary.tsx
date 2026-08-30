import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Terminal } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Linux Desktop Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-[#110519] text-neutral-200 flex items-center justify-center p-4 font-mono select-none">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-neutral-900 border border-rose-500/40 shadow-2xl space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto text-2xl">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white font-heading">
                Ubuntu GNOME Session Exception
              </h2>
              <p className="text-xs text-neutral-400">
                A system process encountered an unhandled exception.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-lg bg-black/60 text-left text-xs text-rose-300 overflow-x-auto max-h-32 border border-white/5">
                <code>{this.state.error.toString()}</code>
              </div>
            )}

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart Desktop Session</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
