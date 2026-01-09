// =============================================================================
// Feedback Preview - Hover card showing feedback summary
// =============================================================================

import React from 'react';
import {
  categoryConfig,
  priorityConfig,
  statusConfig,
  type FeedbackItem,
} from '../../data/feedbackTypes';

interface FeedbackPreviewProps {
  feedback: FeedbackItem;
}

export function FeedbackPreview({ feedback }: FeedbackPreviewProps) {
  const category = categoryConfig[feedback.category];
  const priority = priorityConfig[feedback.priority];
  const status = statusConfig[feedback.status];

  const createdDate = new Date(feedback.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="w-72 bg-abyss-mystic border border-white/10 rounded-xl shadow-2xl overflow-hidden pointer-events-none">
      {/* Header */}
      <div className="bg-abyss-base/50 px-3 py-2 flex items-center gap-2">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${status.color}`}>
          {status.label}
        </span>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${priority.color}`}>
          {priority.label}
        </span>
        <span className="text-[10px] text-white/30 ml-auto">{createdDate}</span>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <div className="flex items-start gap-2">
          <span className="text-sm">{category.icon}</span>
          <h4 className="text-sm font-bold text-moonlight line-clamp-2">{feedback.title}</h4>
        </div>

        {/* Notes preview */}
        {feedback.notes && (
          <p className="text-xs text-white/50 line-clamp-2">{feedback.notes}</p>
        )}

        {/* Location */}
        <div className="text-[10px] text-teal-light/50 truncate">
          {feedback.sectionPath}
        </div>

        {/* Screenshot thumbnail */}
        {feedback.screenshot && (
          <div className="mt-2">
            <img
              src={feedback.screenshot}
              alt="Feedback screenshot"
              className="w-full h-20 object-cover rounded border border-white/10"
            />
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="bg-abyss-base/30 px-3 py-1.5 text-center">
        <span className="text-[10px] text-white/30">Click to view details</span>
      </div>
    </div>
  );
}
