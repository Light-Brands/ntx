import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select } from '../ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Search, Filter, Download, MoreVertical, Image as ImageIcon, Film } from 'lucide-react';

const MediaLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for grid
  const mediaItems = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    type: i % 4 === 0 ? 'video' : 'image',
    url: `https://picsum.photos/seed/${i + 100}/800/600`,
    title: `Generated Asset ${i + 1}`,
    date: '2 days ago',
    size: '1.2 MB'
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Manage your AI-generated images and thumbnails.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline">
             <Download className="mr-2 h-4 w-4" /> Export All
           </Button>
           <Button>Upload Manual</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <TabsList>
                <TabsTrigger value="all">All Assets</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="thumbnails">Thumbnails</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-[300px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search assets..." 
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select containerClassName="w-[150px]">
                    <option>Newest First</option>
                    <option>Oldest First</option>
                    <option>Size (Large)</option>
                    <option>Size (Small)</option>
                </Select>
            </div>
        </div>

        <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mediaItems.map((item) => (
                    <div key={item.id} className="group relative rounded-lg border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <div className="aspect-video w-full overflow-hidden bg-muted relative">
                             <img 
                                src={item.url} 
                                alt={item.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                             />
                             <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="secondary" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                             </div>
                             <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                                {item.type === 'video' ? <Film className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                                <span>JPG</span>
                             </div>
                        </div>
                        <div className="p-3">
                            <h3 className="font-medium text-sm truncate">{item.title}</h3>
                            <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                                <span>{item.date}</span>
                                <span>{item.size}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </TabsContent>
        <TabsContent value="images">
            <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Filter view: Images Only</p>
            </div>
        </TabsContent>
        <TabsContent value="thumbnails">
            <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Filter view: Thumbnails Only</p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MediaLibrary;
