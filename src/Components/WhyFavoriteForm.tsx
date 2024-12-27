"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../Components/Button"; 
import { Textarea } from "../Components/Textarea";
import { NpmPackage } from "../../src/type/npmPackage";

interface WhyFavoriteFormProps {
  selectedPackage: NpmPackage;
  onSubmit: (pkg: NpmPackage, reason: string) => void;
}

export default function WhyFavoriteForm({
  selectedPackage,
  onSubmit,
}: WhyFavoriteFormProps) {
  const [reason, setReason] = useState<string>(""); // Track the user's input
  const [error, setError] = useState<string | null>(null); // Track any error messages
  const router = useRouter(); // Initialize router for navigation

  const handleSubmit = async () => {
    if (reason.trim() === "") {
      setError("Please provide a reason why this is your favorite.");
      return;
    }

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isAlreadyFavorite = favorites.some(
      (fav: NpmPackage) => fav.name === selectedPackage.name
    );

    if (isAlreadyFavorite) {
      setError(`${selectedPackage.name} is already in your favorites.`);
      return;
    }

    onSubmit(selectedPackage, reason);

    setReason("");
    setError(null);
    router.push("/");
  };

  return (
    <div className="p-4 border mt-4 rounded">
      <p className="text-lg font-bold">
        Why is <span className="text-blue-500">{selectedPackage.name}</span> your
        favorite?
      </p>
      <Textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Write your reason here..."
        className="mt-2"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <Button onClick={handleSubmit} className="mt-4 bg-green-500">
        Submit
      </Button>
    </div>
  );
}
