"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SpinnerCircle from "@/components/ui/spinner/spinner";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useState } from "react";

interface Note {
  id: string;
  title: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Page() {
  const { data: session, isPending } = authClient.useSession();
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const router = useRouter();

  const { data, error } = useSWR(
    `/api/note/all?page=${page}&limit=${limit}`,
    fetcher
  );
  const notes = data?.notes || [];
  const totalNotes = data?.count || 0;

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpinnerCircle />
      </div>
    );
  }

  if (!session) {
    router.push("/");
    return null;
  }

  if (error) {
    return <p className="text-red-500">Failed to load notes.</p>;
  }

  const totalPages = Math.ceil(totalNotes / limit);

  return (
    <>
      <div className="flex justify-center items-center space-x-4">
        <Input className="w-64" placeholder="Search notes..." />
        <Button>Search</Button>
      </div>

      <div className="flex flex-col justify-center items-center space-y-4 mt-5">
        {notes.length > 0 ? (
          notes.map((note: Note) => (
            <Card key={note.id} className="w-128 mt-3">
              <CardHeader className="flex flex-row items-center">
                <CardTitle>{note.title}</CardTitle>
                <div className="ml-auto flex gap-2">
                  <Button>View</Button>
                  <Button>Delete</Button>
                </div>
              </CardHeader>
            </Card>
          ))
        ) : (
          <p>No notes found.</p>
        )}

        {/* Pagination Section */}
        <div className="flex items-center space-x-2 mt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i + 1}
                variant={page === i + 1 ? "default" : "outline"}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
