import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Oops! Lost in Space?
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-md">
          It seems we have ventured into uncharted territory. The page you are
          looking for might have drifted off into the cosmic abyss or never
          existed in the first place.
        </p>
        <p className="mt-2 text-base text-gray-500">Don’t worry!</p>
        <div className="mt-6 flex gap-4">
          <Button asChild>
            <Link href="/">Return to Mission Control</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
