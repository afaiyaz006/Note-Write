"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { authClient, signUp } from "@/lib/auth-client";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import SpinnerCircle from "../../components/ui/spinner/spinner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [regState, setRegState] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, isPending, error, refetch } = authClient.useSession();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isPending) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <SpinnerCircle></SpinnerCircle>
        </div>
      </>
    );
  }

  if (!session) {
    return (
      <>
        <Toaster></Toaster>
        {regState && (
          <AlertDialog open={regState} onOpenChange={setRegState}>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Email Has</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Email Sent Successfully</AlertDialogTitle>
                <AlertDialogDescription>
                  <b>
                    Verification link has been sent to your email at {email}
                  </b>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Ok
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <div className="min-h-screen flex items-center justify-center p-3">
          <Card className="w-full max-w-md p-6 z-50 rounded-md rounded-t-none max-w-md">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="first-name"
                      placeholder="Max"
                      required
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      value={firstName}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                      id="last-name"
                      placeholder="Robinson"
                      required
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      value={lastName}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Password"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Confirm Password</Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Profile Image (optional)</Label>
                  <div className="flex items-end gap-4">
                    {imagePreview && (
                      <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                        <Image
                          src={imagePreview}
                          alt="Profile preview"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2 w-full">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full"
                      />
                      {imagePreview && (
                        <X
                          className="cursor-pointer"
                          onClick={() => {
                            setImage(null);
                            setImagePreview(null);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  onClick={async () => {
                    await signUp.email({
                      email,
                      password,
                      name: `${firstName} ${lastName}`,
                      image: image ? await convertImageToBase64(image) : "",
                      callbackURL: "/",
                      fetchOptions: {
                        onResponse: () => {
                          setLoading(false);
                        },
                        onRequest: () => {
                          setLoading(true);
                        },
                        onError: (ctx) => {
                          console.log(ctx);
                          toast.error(ctx.error.message);
                        },
                        onSuccess: async () => {
                          setRegState(true);
                        },
                      },
                    });
                  }}
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Create an account"
                  )}
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-center w-full border-t py-4">
                <p className="text-center text-xs text-neutral-500">
                  Secured by{" "}
                  <span className="text-orange-400">better-auth.</span>
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </>
    );
  }
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
