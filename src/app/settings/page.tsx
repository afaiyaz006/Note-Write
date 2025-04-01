"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import SpinnerCircle from "@/components/ui/spinner/spinner";

// Assume these are imported from your Better Auth setup
// import { useUser, updateUserProfile, updateUserPassword } from '@/lib/auth'

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z.string().email().optional(),
  image: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This would be replaced with your Better Auth user hook
const mockUser = {
  id: "user123",
  name: "John Doe",
  email: "john.doe@example.com",
  emailVerified: true,
  image: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  useEffect(() => {
    if (session) {
      profileForm.setValue("name", session.user.name);
      profileForm.setValue("email", session.user.email);
      setImagePreview(session.user.image as string);
    }
  }, [session]);
  // Replace with your Better Auth hook
  // const { user } = useUser()

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onProfileSubmit(data: ProfileFormValues) {
    setIsProfileUpdating(true);

    try {
      await authClient.updateUser({
        name: data.name,
        image: data.image,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error", {
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsProfileUpdating(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        profileForm.setValue("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpinnerCircle />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and profile information
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information and email address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-6"
                >
                  <div className="flex flex-col gap-8 md:flex-row">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={imagePreview || mockUser.image || ""}
                        />
                        <AvatarFallback className="text-lg">
                          <User className="h-12 w-12" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-center">
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer text-sm text-primary hover:underline"
                        >
                          Change avatar
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your email"
                                {...field}
                                disabled
                              />
                            </FormControl>
                            <FormDescription>
                              {mockUser.emailVerified ? (
                                <span className="text-green-600">
                                  Email verified
                                </span>
                              ) : (
                                <span className="text-yellow-600">
                                  Email not verified
                                </span>
                              )}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isProfileUpdating}>
                      {isProfileUpdating && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.<br></br>
                <Button>Send Reset Link</Button>
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
