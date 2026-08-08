import { motion, AnimatePresence } from 'framer-motion';
import { useCV } from '../context/CVContext';

export default function InteractiveCV() {
  const { isOpen, closeCV } = useCV();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCV}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden"
          >
            {/* Modal Header without CGPA */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/90">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg font-bold">
                  <i className="bi bi-file-earmark-pdf-fill" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold font-heading text-slate-900 leading-tight">
                    Yash Baviskar — Curriculum Vitae (CV)
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Cloud Engineer & DevOps • Verified Official PDF
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/yash_cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                  title="Open in new browser tab"
                >
                  <i className="bi bi-box-arrow-up-right text-xs" />
                  <span className="hidden sm:inline">Open in Tab</span>
                </a>
                <a
                  href="/yash_cv.pdf"
                  download="Yash_Baviskar_CV.pdf"
                  className="px-4 py-1.5 rounded-xl gradient-btn text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <i className="bi bi-download" />
                  <span>Download PDF</span>
                </a>
                <button
                  type="button"
                  onClick={closeCV}
                  className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close CV preview modal"
                >
                  <i className="bi bi-x-lg text-xs" />
                </button>
              </div>
            </div>

            {/* PDF Preview Frame */}
            <div className="flex-1 bg-slate-100 min-h-[60vh] sm:min-h-[70vh] relative flex flex-col">
              <iframe
                src="/yash_cv.pdf#view=FitH&toolbar=0&navpanes=0"
                title="Yash Baviskar CV PDF Preview"
                className="w-full h-full flex-1 border-0 bg-white"
                style={{ minHeight: '62vh' }}
              />
            </div>

            {/* Bottom Quick-Action Bar */}
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/90 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Verified Official CV
                </span>
                <span className="hidden sm:inline text-slate-400">•</span>
                <span className="hidden sm:inline text-slate-500 font-mono">yashbaviskar0215@outlook.com</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="mailto:yashbaviskar0215@outlook.com?subject=Opportunity%20Discussion%20-%20Cloud%20Engineer%20%26%20DevOps"
                  className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
                >
                  <i className="bi bi-send-fill text-xs" />
                  <span>Contact Directly</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
