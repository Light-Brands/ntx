import { NextResponse } from 'next/server'
import { readAllDocuments } from '@/lib/fs/documents'

export async function GET() {
  try {
    const documents = await readAllDocuments()
    
    return NextResponse.json({
      count: documents.length,
      slugs: documents.map(doc => ({
        slug: doc.slug,
        path: doc.path,
        title: doc.metadata.title,
      })),
    })
  } catch (error) {
    return NextResponse.json({
      error: String(error),
      message: 'Failed to read documents',
    }, { status: 500 })
  }
}

