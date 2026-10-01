/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Optional GitHub PAT for anonymous rate-limit bypass on the
   * GitHub REST v3 API. Read client-side in ProjectsApp,
   * CICDStatusApp, and Terminal `curl github-stats`.
   */
  readonly VITE_GITHUB_TOKEN?: string;
  /**
   * Verified Resend FROM email address for the contact form.
   * The full Resend API key is NOT exposed to the client — only
   * the From header is, for UI display purposes.
   */
  readonly VITE_RESEND_FROM_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
