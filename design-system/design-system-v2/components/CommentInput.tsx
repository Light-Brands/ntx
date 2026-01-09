
import React, { useState } from 'react';
import { Avatar } from './Avatar';
import { Button } from './Button';

interface CommentInputProps {
  userAvatar?: string;
  placeholder?: string;
  onSubmit?: (content: string) => void;
}

export const CommentInput: React.FC<CommentInputProps> = ({ 
  userAvatar, 
  placeholder = "Post your reply", 
  onSubmit 
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit?.(value);
      setValue('');
    }
  };

  return (
    <div className="flex gap-4 p-6 border-t border-abyss-light items-start bg-abyss-mystic/30 rounded-b-vibe-card">
      <Avatar src={userAvatar} size="sm" className="border-2 border-abyss-light" />
      <div className="flex-1 flex flex-col gap-3">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-pearl text-sm resize-none focus:outline-none placeholder-muted/40 font-medium"
          rows={2}
        />
        <div className="flex justify-end">
          <Button 
            size="sm" 
            variant="primary"
            disabled={!value.trim()} 
            onClick={handleSubmit}
            className="px-8"
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};
