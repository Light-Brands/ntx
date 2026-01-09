import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, addPost } from '@/lib/storage';

// GET all posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const category = searchParams.get('category') || undefined;
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || undefined;

    const posts = await getAllPosts({ status, category, sortOrder });
    
    return NextResponse.json({
      success: true,
      posts: posts,
      count: posts.length
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch posts',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST create new post
export async function POST(request: NextRequest) {
  try {
    const postData = await request.json();
    
    // Validate required fields
    if (!postData.title || !postData.content) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields: title and content are required' 
        },
        { status: 400 }
      );
    }
    
    const newPost = await addPost(postData);
    
    return NextResponse.json({
      success: true,
      post: newPost,
      message: 'Post saved successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to save post',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

