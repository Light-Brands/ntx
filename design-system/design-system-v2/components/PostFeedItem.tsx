
import React from 'react';
import { Post } from '../types';
import { Avatar } from './Avatar';
import { Card } from './Card';
import { LikeButton } from './LikeButton';

interface PostFeedItemProps {
  post: Post;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export const PostFeedItem: React.FC<PostFeedItemProps> = ({ post, onLike, onComment, onShare }) => {
  return (
    <Card className="mb-6 hover:border-aqua-light/40 transition-all duration-700 shadow-2xl" elevation="deep">
      <div className="flex gap-5">
        <Avatar src={post.author.avatarUrl} alt={post.author.name} size="md" className="border-2 border-abyss-light" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-black text-sm text-aqua-light hover:text-gold-accent transition-colors cursor-pointer uppercase tracking-tight">{post.author.name}</span>
            <span className="text-teal-light text-sm opacity-50">•</span>
            <span className="text-muted text-[10px] font-black uppercase tracking-[0.2em]">{post.createdAt}</span>
          </div>
          
          <p className="text-base text-pearl leading-relaxed mb-5 font-medium">{post.content}</p>
          
          {post.mediaUrl && (
            <div className="rounded-vibe-card overflow-hidden border border-abyss-light mb-5 aspect-video bg-abyss-base group cursor-pointer relative">
               <div className="absolute inset-0 bg-aqua-light/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
               <img src={post.mediaUrl} alt="Post content" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out" />
            </div>
          )}

          <div className="flex items-center gap-8 text-muted">
            <div className="flex items-center group cursor-pointer hover:text-aqua-light transition-all" onClick={onComment}>
              <div className="p-2.5 group-hover:bg-aqua-light/10 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </div>
              <span className="text-xs font-black ml-1 uppercase">{post.commentsCount}</span>
            </div>

            <LikeButton count={post.likesCount} isLiked={post.isLiked} onClick={onLike} />

            <div className="flex items-center group cursor-pointer hover:text-gold-accent transition-all" onClick={onShare}>
              <div className="p-2.5 group-hover:bg-gold-accent/10 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
