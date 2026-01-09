// =============================================================================
// Feedback Modal - Form for creating/editing feedback
// =============================================================================

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useFeedback } from '../../contexts/FeedbackContext';
import {
  categoryConfig,
  priorityConfig,
  type FeedbackCategory,
  type FeedbackPriority,
} from '../../data/feedbackTypes';
import { formatTextContextPreview } from '../../utils/feedbackCapture';

export function FeedbackModal() {
  const { isModalOpen, closeModal, pendingCapture, createFeedback } = useFeedback();

  // Form state
  const [category, setCategory] = useState<FeedbackCategory>('enhancement');
  const [priority, setPriority] = useState<FeedbackPriority>('medium');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [includeScreenshot, setIncludeScreenshot] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTextContext, setShowTextContext] = useState(false);
  const [expandedScreenshot, setExpandedScreenshot] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setCategory('enhancement');
      setPriority('medium');
      setTitle('');
      setNotes('');
      setIncludeScreenshot(true);
      setShowTextContext(false);
    }
  }, [isModalOpen]);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createFeedback({
        category,
        priority,
        title: title.trim(),
        notes: notes.trim(),
        includeScreenshot,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isModalOpen || !pendingCapture) return null;

  const modal = (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" data-feedback-ui>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-abyss-base/90 backdrop-blur-md"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-abyss-mystic border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-abyss-base/50 border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-black text-moonlight">Leave Feedback</h2>
          <button
            onClick={closeModal}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/50 hover:text-moonlight transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Context Info */}
          <div className="bg-abyss-base/50 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-teal-light/50 uppercase tracking-wider">Location</span>
              <button
                type="button"
                onClick={() => setShowTextContext(!showTextContext)}
                className="text-[10px] text-aqua-light hover:underline"
              >
                {showTextContext ? 'Hide text context' : 'Show text context'}
              </button>
            </div>
            <div className="text-sm text-moonlight font-mono">{pendingCapture.sectionPath}</div>
            {pendingCapture.componentName && (
              <div className="text-xs text-white/40">Component: {pendingCapture.componentName}</div>
            )}
            <div className="text-xs text-white/40">
              {formatTextContextPreview(pendingCapture.textContext)}
            </div>

            {/* Expandable text context */}
            {showTextContext && (
              <div className="mt-4 space-y-3">
                {pendingCapture.textContext.textBefore && (
                  <div>
                    <span className="text-[10px] text-white/30 uppercase">Text Before (50 lines)</span>
                    <pre className="mt-1 p-2 bg-black/30 rounded text-[10px] text-white/50 overflow-x-auto max-h-32 overflow-y-auto font-mono">
                      {pendingCapture.textContext.textBefore}
                    </pre>
                  </div>
                )}
                {pendingCapture.textContext.clickedText && (
                  <div>
                    <span className="text-[10px] text-aqua-light uppercase">Clicked Element</span>
                    <pre className="mt-1 p-2 bg-aqua-light/10 border border-aqua-light/20 rounded text-[10px] text-aqua-light overflow-x-auto max-h-20 overflow-y-auto font-mono">
                      {pendingCapture.textContext.clickedText}
                    </pre>
                  </div>
                )}
                {pendingCapture.textContext.textAfter && (
                  <div>
                    <span className="text-[10px] text-white/30 uppercase">Text After (50 lines)</span>
                    <pre className="mt-1 p-2 bg-black/30 rounded text-[10px] text-white/50 overflow-x-auto max-h-32 overflow-y-auto font-mono">
                      {pendingCapture.textContext.textAfter}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Screenshot Preview */}
          {pendingCapture.screenshot && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-teal-light/50 uppercase tracking-wider">Screenshot</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeScreenshot}
                    onChange={(e) => setIncludeScreenshot(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-abyss-base text-aqua-light focus:ring-aqua-light/20"
                  />
                  <span className="text-xs text-white/50">Include screenshot</span>
                </label>
              </div>
              {includeScreenshot && (
                <img
                  src={pendingCapture.screenshot}
                  alt="Screenshot of clicked area"
                  className="w-full max-h-48 object-contain rounded-xl border border-white/10 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setExpandedScreenshot(true)}
                  title="Click to expand"
                />
              )}

              {/* Expanded Screenshot Lightbox */}
              {expandedScreenshot && pendingCapture.screenshot && (
                <div
                  className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
                  onClick={() => setExpandedScreenshot(false)}
                >
                  <img
                    src={pendingCapture.screenshot}
                    alt="Screenshot expanded"
                    className="max-w-full max-h-full object-contain rounded-xl"
                  />
                  <button
                    className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    onClick={() => setExpandedScreenshot(false)}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Category */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-teal-light/50 uppercase tracking-wider">Category</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(categoryConfig) as FeedbackCategory[]).map((cat) => {
                const config = categoryConfig[cat];
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                      category === cat
                        ? `${config.color} ring-2 ring-offset-2 ring-offset-abyss-mystic ring-current`
                        : 'bg-white/5 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    {config.icon} {config.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-teal-light/50 uppercase tracking-wider">Priority</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(priorityConfig) as FeedbackPriority[]).map((pri) => {
                const config = priorityConfig[pri];
                return (
                  <button
                    key={pri}
                    type="button"
                    onClick={() => setPriority(pri)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                      priority === pri
                        ? `${config.color} ring-2 ring-offset-2 ring-offset-abyss-mystic ring-current`
                        : 'bg-white/5 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-teal-light/50 uppercase tracking-wider">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description of the feedback..."
              className="w-full px-4 py-3 bg-abyss-base border border-white/10 rounded-xl text-moonlight placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-aqua-light/30 focus:border-aqua-light/50"
              required
              autoFocus
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-teal-light/50 uppercase tracking-wider">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detailed notes, suggestions, or context..."
              rows={4}
              className="w-full px-4 py-3 bg-abyss-base border border-white/10 rounded-xl text-moonlight placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-aqua-light/30 focus:border-aqua-light/50 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2.5 text-white/50 hover:text-moonlight font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || isSubmitting}
              className="px-6 py-2.5 bg-aqua-light text-abyss-base font-bold rounded-xl hover:bg-aqua-light/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-abyss-base border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                'Submit Feedback'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}
