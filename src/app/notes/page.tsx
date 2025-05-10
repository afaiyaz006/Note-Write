"use client";
import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SpinnerCircle from "@/components/ui/spinner/spinner";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
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
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [searchTerm, setSearchTerm] = useState(""); // State for submitted search term
  const router = useRouter();

  // Dynamic API URL based on submitted search term
  const apiUrl = searchTerm
    ? `/api/note/search?query=${encodeURIComponent(
        searchTerm
      )}&page=${page}&limit=${limit}`
    : `/api/note/all?page=${page}&limit=${limit}`;

  const { data, error, isLoading } = useSWR(apiUrl, fetcher);
  const notes = data?.notes || [];
  const totalNotes = data?.count || 0;
  const totalPages = Math.ceil(totalNotes / limit);

  const handleDeletion = async (noteId: string) => {
    try {
      await axios.delete(`/api/note?noteId=${noteId}`);
      // Re-fetch data after deletion
      mutate(apiUrl);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission refresh
    setSearchTerm(searchQuery); // Update the submitted search term
    setPage(1); // Reset to first page on new search
    // No need to call mutate here; SWR will automatically re-fetch due to apiUrl change
  };

  if (isPending || isLoading) {
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
    return <p className="text-red-500 text-center">Failed to load notes.</p>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4"
      >
        <Input
          className="w-full sm:w-64"
          placeholder="Search notes by title and content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Only updates local state
        />
        <Button type="submit" className="w-full sm:w-auto">
          Search
        </Button>
      </form>

      <div className="flex flex-col items-center space-y-4 mt-5">
        {notes.length > 0 ? (
          <div className="overflow-x-auto w-full">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note: Note) => (
                  <tr key={note.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{note.title}</td>
                    <td className="px-4 py-2 border space-x-2">
                      <div className="flex justify-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => router.push(`/note/${note.id}`)}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeletion(note.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No notes found.</p>
        )}

        {/* Pagination Section */}
        <div className="flex flex-wrap justify-center items-center space-x-2 mt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <div className="flex flex-wrap justify-center space-x-1">
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
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
