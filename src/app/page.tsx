"use client";

import { useState } from "react";
import SearchInput from "../Components/SearchInput";
import WhyFavoriteForm from "../Components/WhyFavoriteForm";
import CustomModal from "../Components/CustomModal";
import { NpmPackage } from "../../src/type/npmPackage";

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<NpmPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const handlePackageSelect = (pkg: NpmPackage) => {
    setSelectedPackage(pkg);
  };

  const handleFavoriteSubmit = (pkg: NpmPackage, reason: string) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorite = { ...pkg, reason };
    localStorage.setItem("favorites", JSON.stringify([...favorites, newFavorite]));

    setModalMessage(
      `${pkg.name} has been added to your favorites! Would you like to add more favorites from the list?`
    );
    setIsModalOpen(true);

    setSelectedPackage(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search NPM Packages</h1>
      <SearchInput onPackageSelect={handlePackageSelect} />
      {selectedPackage && (
        <WhyFavoriteForm
          selectedPackage={selectedPackage}
          onSubmit={handleFavoriteSubmit}
        />
      )}

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Success"
      >
        <p>{modalMessage}</p>
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        >
          Close
        </button>
      </CustomModal>
    </div>
  );
}
