"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SpinnerCircle from "@/components/ui/spinner/spinner";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <SpinnerCircle />
      </div>
    );
  }
  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <Card className="max-w-md w-full  shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex flex-col items-center gap-8">
              <Avatar className="h-36 w-36 border-4 border-white rounded-full shadow-md overflow-hidden hover:scale-105 transition-transform duration-200">
                <AvatarImage
                  src={session.user.image || ""}
                  alt={session.user.name}
                  className="object-cover w-full h-full"
                />
                <AvatarFallback className="flex items-center justify-center h-full w-full bg-indigo-100">
                  <User className="h-16 w-16 text-indigo-600" />
                </AvatarFallback>
              </Avatar>
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {session.user.name}
                </h2>
                <p className="text-gray-600 bg-gray-100 px-4 py-1 rounded-full text-sm font-medium">
                  {session.user.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
