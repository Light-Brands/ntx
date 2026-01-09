// =============================================================================
// Feedback Dashboard - Central feedback review and management
// =============================================================================

import React, { useState, useMemo, useEffect } from 'react';
import { useFeedback } from '../contexts/FeedbackContext';
import {
  categoryConfig,
  priorityConfig,
  statusConfig,
  type FeedbackItem,
  type FeedbackCategory,
  type FeedbackPriority,
  type FeedbackStatus,
  type PageId,
} from '../data/feedbackTypes';
import { getFeedbackStats } from '../data/feedbackStorage';
import { FeedbackDetail } from '../components/feedback/FeedbackDetail';

interface FeedbackPageProps {
  onNavigate?: (section: string) => void;
}

export default function FeedbackPage({ onNavigate }: FeedbackPageProps) {
  const { items, refreshItems, navigateToFeedback } = useFeedback();

  // Filters
  const [statusFilter, setStatusFilter] = useState<FeedbackStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<FeedbackCategory | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<FeedbackPriority | 'all'>('all');
  const [pageFilter, setPageFilter] = useState<PageId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    inProgress: 0,
    resolved: 0,
    blocked: 0,
    byCategory: {} as Record<string, number>,
    byPage: {} as Record<string, number>,
  });

  // Selected feedback for detail view
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);

  // Load stats
  useEffect(() => {
    getFeedbackStats().then(setStats);
  }, [items]);

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
      if (priorityFilter !== 'all' && item.priority !== priorityFilter) return false;
      if (pageFilter !== 'all' && item.pageId !== pageFilter) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.notes.toLowerCase().includes(query) ||
          item.sectionPath.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [items, statusFilter, categoryFilter, priorityFilter, pageFilter, searchQuery]);

  // Sort by status priority and date
  const sortedItems = useMemo(() => {
    const statusPriority: Record<FeedbackStatus, number> = {
      'new': 0,
      'blocked': 1,
      'in-progress': 2,
      'resolved': 3,
    };
    return [...filteredItems].sort((a, b) => {
      if (statusPriority[a.status] !== statusPriority[b.status]) {
        return statusPriority[a.status] - statusPriority[b.status];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filteredItems]);

  // Unique pages from items
  const pages = useMemo(() => {
    const pageSet = new Set(items.map(i => i.pageId));
    return Array.from(pageSet) as PageId[];
  }, [items]);

  return (
    <div className="min-h-screen bg-abyss-base p-8" data-page="feedback">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-moonlight mb-2">Feedback Center</h1>
        <p className="text-white/50">Review and manage all feedback from the design system</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard
          label="Total"
          value={stats.total}
          color="text-moonlight"
          bgColor="bg-white/5"
        />
        <StatCard
          label="New"
          value={stats.new}
          color="text-gold-accent"
          bgColor="bg-gold-accent/10"
          onClick={() => setStatusFilter('new')}
          active={statusFilter === 'new'}
        />
        <StatCard
          label="In Progress"
          value={stats.inProgress}
          color="text-aqua-light"
          bgColor="bg-aqua-light/10"
          onClick={() => setStatusFilter('in-progress')}
          active={statusFilter === 'in-progress'}
        />
        <StatCard
          label="Resolved"
          value={stats.resolved}
          color="text-teal-light"
          bgColor="bg-teal-light/10"
          onClick={() => setStatusFilter('resolved')}
          active={statusFilter === 'resolved'}
        />
        <StatCard
          label="Blocked"
          value={stats.blocked}
          color="text-red-400"
          bgColor="bg-red-500/10"
          onClick={() => setStatusFilter('blocked')}
          active={statusFilter === 'blocked'}
        />
      </div>

      {/* Filters */}
      <div className="bg-abyss-mystic/50 rounded-2xl border border-white/10 p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search feedback..."
              className="w-full px-4 py-2 bg-abyss-base border border-white/10 rounded-lg text-moonlight placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-aqua-light/30"
            />
          </div>

          {/* Status filter */}
          <FilterSelect
            label="Status"
            value={statusFilter}
            options={[
              { value: 'all', label: 'All Status' },
              ...Object.entries(statusConfig).map(([k, v]) => ({ value: k, label: v.label })),
            ]}
            onChange={(v) => setStatusFilter(v as FeedbackStatus | 'all')}
          />

          {/* Category filter */}
          <FilterSelect
            label="Category"
            value={categoryFilter}
            options={[
              { value: 'all', label: 'All Categories' },
              ...Object.entries(categoryConfig).map(([k, v]) => ({ value: k, label: `${v.icon} ${v.label}` })),
            ]}
            onChange={(v) => setCategoryFilter(v as FeedbackCategory | 'all')}
          />

          {/* Priority filter */}
          <FilterSelect
            label="Priority"
            value={priorityFilter}
            options={[
              { value: 'all', label: 'All Priorities' },
              ...Object.entries(priorityConfig).map(([k, v]) => ({ value: k, label: v.label })),
            ]}
            onChange={(v) => setPriorityFilter(v as FeedbackPriority | 'all')}
          />

          {/* Page filter */}
          {pages.length > 1 && (
            <FilterSelect
              label="Page"
              value={pageFilter}
              options={[
                { value: 'all', label: 'All Pages' },
                ...pages.map(p => ({ value: p, label: p.charAt(0).toUpperCase() + p.slice(1) })),
              ]}
              onChange={(v) => setPageFilter(v as PageId | 'all')}
            />
          )}

          {/* Clear filters */}
          {(statusFilter !== 'all' || categoryFilter !== 'all' || priorityFilter !== 'all' || pageFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setStatusFilter('all');
                setCategoryFilter('all');
                setPriorityFilter('all');
                setPageFilter('all');
                setSearchQuery('');
              }}
              className="px-3 py-2 text-xs text-white/50 hover:text-moonlight transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-white/40 mb-4">
        Showing {sortedItems.length} of {items.length} feedback items
      </div>

      {/* Feedback List */}
      {sortedItems.length === 0 ? (
        <div className="bg-abyss-mystic/30 rounded-2xl border border-white/5 p-12 text-center">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-lg font-bold text-moonlight mb-2">No feedback yet</h3>
          <p className="text-white/40">
            Click the feedback button and then click anywhere on the page to leave feedback
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sortedItems.map((item) => (
            <FeedbackCard
              key={item.id}
              feedback={item}
              onClick={() => setSelectedFeedback(item)}
              onNavigate={() => navigateToFeedback(item, onNavigate)}
            />
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selectedFeedback && (
        <FeedbackDetail
          feedback={selectedFeedback}
          onClose={() => {
            setSelectedFeedback(null);
            refreshItems();
          }}
          onNavigate={() => navigateToFeedback(selectedFeedback, onNavigate)}
        />
      )}
    </div>
  );
}

// =============================================================================
// Helper Components
// =============================================================================

function StatCard({
  label,
  value,
  color,
  bgColor,
  onClick,
  active,
}: {
  label: string;
  value: number;
  color: string;
  bgColor: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-2xl border transition-all ${
        active
          ? 'border-aqua-light/50 ring-2 ring-aqua-light/20'
          : 'border-white/10 hover:border-white/20'
      } ${bgColor}`}
    >
      <div className={`text-3xl font-black ${color}`}>{value}</div>
      <div className="text-xs text-white/50 uppercase tracking-wider">{label}</div>
    </button>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 bg-abyss-base border border-white/10 rounded-lg text-sm text-moonlight focus:outline-none focus:ring-2 focus:ring-aqua-light/30"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function FeedbackCard({
  feedback,
  onClick,
  onNavigate,
}: {
  feedback: FeedbackItem;
  onClick: () => void;
  onNavigate: () => void;
}) {
  const category = categoryConfig[feedback.category];
  const priority = priorityConfig[feedback.priority];
  const status = statusConfig[feedback.status];

  const createdDate = new Date(feedback.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="w-full p-4 bg-abyss-mystic/50 hover:bg-abyss-mystic/70 rounded-2xl border border-white/10 hover:border-white/20 transition-all group">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="text-2xl shrink-0">{category.icon}</div>

        {/* Content - clickable for detail */}
        <button
          onClick={onClick}
          className="flex-1 min-w-0 text-left"
        >
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${status.color}`}>
              {status.label}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${priority.color}`}>
              {priority.label}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-white/40">
              {feedback.pageId}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-moonlight group-hover:text-aqua-light transition-colors mb-1">
            {feedback.title}
          </h3>

          {/* Path */}
          <div className="text-xs text-teal-light/50 truncate mb-2">
            {feedback.sectionPath}
          </div>

          {/* Notes preview */}
          {feedback.notes && (
            <p className="text-sm text-white/50 line-clamp-2">{feedback.notes}</p>
          )}
        </button>

        {/* Thumbnail */}
        {feedback.screenshot && (
          <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-white/10">
            <img
              src={feedback.screenshot}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Actions column */}
        <div className="shrink-0 flex flex-col items-end gap-2">
          {/* Date */}
          <div className="text-xs text-white/30">
            {createdDate}
          </div>

          {/* Navigate button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-aqua-light/10 hover:bg-aqua-light/20 text-aqua-light text-xs font-bold rounded-lg transition-all"
            title="Go to location"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Go to</span>
          </button>
        </div>
      </div>
    </div>
  );
}
