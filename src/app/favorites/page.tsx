"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomModal from "../../Components/CustomModal";
import { Button } from "../../Components/Button"; // Import reusable Button

export default function Favorites() {
  const [favorites, setFavorites] = useState<
    { name: string; description: string; npmLink: string; reason: string }[]
  >([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editReason, setEditReason] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
    setLoading(false);
  }, []);

  const handleDeleteClick = (name: string) => {
    setItemToDelete(name);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const updatedFavorites = favorites.filter((fav) => fav.name !== itemToDelete);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      setItemToDelete(null);
      setIsModalOpen(false);
    }
  };

  const enableEdit = (name: string, currentReason: string) => {
    setEditingItem(name);
    setEditReason(currentReason);
  };

  const saveEdit = (name: string) => {
    const updatedFavorites = favorites.map((fav) =>
      fav.name === name ? { ...fav, reason: editReason } : fav
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
    setEditingItem(null);
    setEditReason("");
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditReason("");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Favorites</h1>
        <Button onClick={() => router.push("/")}>Add Favorite</Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <p className="text-xl font-semibold mb-4">No favorites added yet.</p>
              <Button onClick={() => router.push("/")}>Add Favorite</Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {favorites.map((fav, index) => (
                <li
                  key={`${fav.name}-${index}`}
                  className="p-4 border rounded flex justify-between items-center"
                >
                  <div className="text-left">
                    <h2 className="text-xl font-bold">{fav.name}</h2>
                    <p className="text-gray-700">Description: {fav.description}</p>
                    {editingItem === fav.name ? (
                      <div className="mt-2">
                        <textarea
                          value={editReason}
                          onChange={(e) => setEditReason(e.target.value)}
                          rows={2}
                          className="border p-2 w-full rounded"
                          placeholder="Edit your reason..."
                        />
                      </div>
                    ) : (
                      <p className="text-gray-600">Reason: {fav.reason}</p>
                    )}
                  </div>
                  <div className="flex gap-4 items-center">
                    <Button
                      onClick={() => window.open(fav.npmLink, "_blank")}
                      className="bg-blue-500"
                    >
                      View
                    </Button>
                    {editingItem === fav.name ? (
                      <>
                        <Button onClick={() => saveEdit(fav.name)}>Save</Button>
                        <Button onClick={cancelEdit} className="bg-gray-500">
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => enableEdit(fav.name, fav.reason)}
                        className="bg-yellow-500"
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDeleteClick(fav.name)}
                      className="bg-red-500"
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Delete Favorite"
      >
        <p>Are you sure you want to delete this favorite?</p>
        <div className="flex gap-4 mt-4">
          <Button onClick={confirmDelete} className="bg-red-500">
            Yes, Delete
          </Button>
          <Button onClick={() => setIsModalOpen(false)} className="bg-gray-500">
            Cancel
          </Button>
        </div>
      </CustomModal>
    </div>
  );
}
