import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select } from '../ui/select';
import { Switch } from '../ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Save, Shield, Key, Bell, Monitor } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account, API keys, and generation preferences.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <div className="flex w-full mb-8 border-b">
             <TabsList className="bg-transparent p-0 h-auto">
                <TabsTrigger 
                    value="general" 
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                    General
                </TabsTrigger>
                <TabsTrigger 
                    value="ai" 
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                    AI Providers
                </TabsTrigger>
                <TabsTrigger 
                    value="billing" 
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                    Billing & Plans
                </TabsTrigger>
             </TabsList>
        </div>

        <TabsContent value="general" className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your profile details and public information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="Admin" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="User" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="admin@lumina-cms.com" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize how Lumina looks on your device.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">
                                Enable dark mode for the dashboard interface.
                            </p>
                        </div>
                        <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Compact View</Label>
                            <p className="text-sm text-muted-foreground">
                                Decrease spacing in tables and lists.
                            </p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>API Configuration</CardTitle>
                    <CardDescription>Manage keys for third-party AI services.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="openai-key">OpenAI API Key</Label>
                        <div className="flex gap-2">
                            <Input id="openai-key" type="password" value="sk-................................" readOnly />
                            <Button variant="outline">Change</Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gemini-key">Google Gemini API Key</Label>
                        <div className="flex gap-2">
                            <Input id="gemini-key" type="password" value="AIza................................" readOnly />
                            <Button variant="outline">Change</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Generation Defaults</CardTitle>
                    <CardDescription>Set default parameters for new articles.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Default Text Model</Label>
                            <Select>
                                <option>Google Gemini 2.0 Flash</option>
                                <option>OpenAI GPT-4</option>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Default Image Model</Label>
                            <Select>
                                <option>Gemini 2.5 Flash Image</option>
                                <option>DALL-E 3</option>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Tone of Voice</Label>
                        <Select>
                            <option>Professional</option>
                            <option>Casual</option>
                            <option>Technical</option>
                            <option>Journalistic</option>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="gap-2">
                        <Save className="h-4 w-4" /> Save Preferences
                    </Button>
                </CardFooter>
            </Card>
        </TabsContent>

        <TabsContent value="billing">
             <Card>
                <CardHeader>
                    <CardTitle>Plan & Usage</CardTitle>
                    <CardDescription>You are currently on the Pro Plan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="bg-secondary/30 p-6 rounded-lg flex items-center justify-between">
                        <div>
                            <div className="text-lg font-semibold">Pro Plan</div>
                            <div className="text-sm text-muted-foreground">$29/month</div>
                        </div>
                        <Button variant="outline">Manage Subscription</Button>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
