// =============================================================================
// Feedback Detail - Full detail view and edit modal
// =============================================================================

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useFeedback } from '../../contexts/FeedbackContext';
import {
  categoryConfig,
  priorityConfig,
  statusConfig,
  type FeedbackItem,
  type FeedbackStatus,
} from '../../data/feedbackTypes';

interface FeedbackDetailProps {
  feedback: FeedbackItem;
  onClose: () => void;
  onNavigate?: () => void;
}

export function FeedbackDetail({ feedback, onClose, onNavigate }: FeedbackDetailProps) {
  const { updateFeedback, deleteFeedback } = useFeedback();

  const [status, setStatus] = useState<FeedbackStatus>(feedback.status);
  const [resolution, setResolution] = useState(feedback.resolution || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showTextContext, setShowTextContext] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [expandedScreenshot, setExpandedScreenshot] = useState(false);

  const category = categoryConfig[feedback.category];
  const priority = priorityConfig[feedback.priority];

  const createdDate = new Date(feedback.createdAt).toLocaleString();
  const updatedDate = new Date(feedback.updatedAt).toLocaleString();

  const handleStatusChange = async (newStatus: FeedbackStatus) => {
    setStatus(newStatus);
    setIsUpdating(true);
    try {
      const updates: Partial<FeedbackItem> = { status: newStatus };
      if (newStatus === 'resolved') {
        updates.resolvedAt = new Date().toISOString();
        updates.resolution = resolution;
      }
      await updateFeedback(feedback.id, updates);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveResolution = async () => {
    setIsUpdating(true);
    try {
      await updateFeedback(feedback.id, { resolution });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await deleteFeedback(feedback.id);
    onClose();
  };

  const modal = (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-abyss-base/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-abyss-mystic border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-abyss-base/50 border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{category.icon}</span>
            <div>
              <h2 className="text-lg font-black text-moonlight">{feedback.title}</h2>
              <div className="text-xs text-white/40">{feedback.sectionPath}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/50 hover:text-moonlight transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status & Meta */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Status selector */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/30 uppercase">Status:</span>
              <div className="flex gap-1">
                {(Object.keys(statusConfig) as FeedbackStatus[]).map((s) => {
                  const config = statusConfig[s];
                  return (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      disabled={isUpdating}
                      className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                        status === s
                          ? `${config.color} ring-1 ring-current`
                          : 'bg-white/5 text-white/30 hover:bg-white/10'
                      }`}
                    >
                      {config.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <span className={`px-2 py-1 rounded text-[10px] font-bold ${category.color}`}>
              {category.label}
            </span>
            <span className={`px-2 py-1 rounded text-[10px] font-bold ${priority.color}`}>
              {priority.label}
            </span>
          </div>

          {/* Notes */}
          {feedback.notes && (
            <div className="bg-abyss-base/50 rounded-xl p-4">
              <span className="text-[10px] font-black text-teal-light/50 uppercase tracking-wider">Notes</span>
              <p className="mt-2 text-sm text-white/70 whitespace-pre-wrap">{feedback.notes}</p>
            </div>
          )}

          {/* Resolution */}
          <div className="space-y-2">
            <span className="text-[10px] font-black text-teal-light/50 uppercase tracking-wider">Resolution Notes</span>
            <textarea
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              onBlur={handleSaveResolution}
              placeholder="Add notes when resolving this feedback..."
              rows={3}
              className="w-full px-4 py-3 bg-abyss-base border border-white/10 rounded-xl text-moonlight placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-aqua-light/30 focus:border-aqua-light/50 resize-none"
            />
          </div>

          {/* Screenshot */}
          {feedback.screenshot && (
            <div className="space-y-2">
              <span className="text-[10px] font-black text-teal-light/50 uppercase tracking-wider">Screenshot</span>
              <img
                src={feedback.screenshot}
                alt="Feedback screenshot"
                className="w-full max-h-64 object-contain rounded-xl border border-white/10 bg-black/30 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setExpandedScreenshot(true)}
                title="Click to expand"
              />
            </div>
          )}

          {/* Expanded Screenshot Lightbox */}
          {expandedScreenshot && feedback.screenshot && (
            <div
              className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setExpandedScreenshot(false)}
            >
              <img
                src={feedback.screenshot}
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

          {/* Text Context */}
          <div className="space-y-2">
            <button
              onClick={() => setShowTextContext(!showTextContext)}
              className="flex items-center gap-2 text-[10px] font-black text-teal-light/50 uppercase tracking-wider hover:text-teal-light transition-colors"
            >
              <span>{showTextContext ? '▼' : '▶'}</span>
              Text Context (+/- 50 lines)
            </button>

            {showTextContext && (
              <div className="bg-abyss-base/50 rounded-xl p-4 space-y-4">
                {/* Element Info */}
                <div className="flex flex-wrap gap-2 text-[10px]">
                  <span className="px-2 py-0.5 bg-white/5 rounded text-white/50">
                    &lt;{feedback.textContext.elementTag}&gt;
                  </span>
                  {feedback.textContext.elementId && (
                    <span className="px-2 py-0.5 bg-aqua-light/10 text-aqua-light rounded">
                      #{feedback.textContext.elementId}
                    </span>
                  )}
                  {feedback.textContext.elementClasses.slice(0, 3).map((cls, i) => (
                    <span key={i} className="px-2 py-0.5 bg-teal-light/10 text-teal-light rounded">
                      .{cls}
                    </span>
                  ))}
                </div>

                {/* Clicked Text */}
                {feedback.textContext.clickedText && (
                  <div>
                    <span className="text-[10px] text-aqua-light uppercase">Clicked Element</span>
                    <pre className="mt-1 p-3 bg-aqua-light/5 border border-aqua-light/20 rounded-lg text-xs text-aqua-light overflow-x-auto max-h-32 overflow-y-auto font-mono">
                      {feedback.textContext.clickedText}
                    </pre>
                  </div>
                )}

                {/* Text Before */}
                {feedback.textContext.textBefore && (
                  <div>
                    <span className="text-[10px] text-white/30 uppercase">50 Lines Before</span>
                    <pre className="mt-1 p-3 bg-black/30 rounded-lg text-xs text-white/50 overflow-x-auto max-h-48 overflow-y-auto font-mono">
                      {feedback.textContext.textBefore}
                    </pre>
                  </div>
                )}

                {/* Text After */}
                {feedback.textContext.textAfter && (
                  <div>
                    <span className="text-[10px] text-white/30 uppercase">50 Lines After</span>
                    <pre className="mt-1 p-3 bg-black/30 rounded-lg text-xs text-white/50 overflow-x-auto max-h-48 overflow-y-auto font-mono">
                      {feedback.textContext.textAfter}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Timestamps */}
          <div className="text-[10px] text-white/30 space-y-1">
            <div>Created: {createdDate}</div>
            <div>Updated: {updatedDate}</div>
            {feedback.resolvedAt && <div>Resolved: {new Date(feedback.resolvedAt).toLocaleString()}</div>}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-abyss-base/30 border-t border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
          {/* Left actions */}
          <div className="flex items-center gap-2">
            {/* Delete button */}
            <button
              onClick={handleDelete}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                confirmDelete
                  ? 'bg-red-500 text-white'
                  : 'bg-white/5 text-red-400 hover:bg-red-500/10'
              }`}
            >
              {confirmDelete ? 'Click again to confirm' : 'Delete'}
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Navigate to location button */}
            {onNavigate && (
              <button
                onClick={() => {
                  onClose();
                  onNavigate();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-teal-light/10 hover:bg-teal-light/20 text-teal-light font-bold rounded-lg transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Go to Location</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-6 py-2 bg-aqua-light text-abyss-base font-bold rounded-lg hover:bg-aqua-light/90 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}
