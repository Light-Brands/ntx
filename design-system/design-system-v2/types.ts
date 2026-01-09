
import React from 'react';

export type ComponentVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  isVerified?: boolean;
}

export interface BusinessListing {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  location: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  bannerUrl: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  createdAt: string;
}
