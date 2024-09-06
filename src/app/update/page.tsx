"use client";

import { useState, FormEvent } from "react";

const UpdatePage = () => {
  const [uniqueId, setUniqueId] = useState<string>("");
  const [isIdValid, setIsIdValid] = useState<boolean | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string | null>(null);
  const [x, setX] = useState<string | null>(null);
  const [discord, setDiscord] = useState<string | null>(null);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [feesType, setFeesType] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  const handleIdSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/actions/check-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uniqueId }),
      });

      if (!res.ok) throw new Error("Failed to check ID");

      const result = await res.json();

      if (result.exists) {
        setIsIdValid(true);
        setName(result.org.name);
        setEmail(result.org.email);
        setWebsite(result.org.website || "");
        setX(result.org.x || "");
        setDiscord(result.org.discord || "");
        setMonth(result.org.month || 0);
        setYear(result.org.year || 0);
        setFeesType(result.org.feesType || "");
      } else {
        setIsIdValid(false);
        clearForm();
      }
    } catch (err) {
      setError("Failed to check ID or fetch project details");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      setError("Name and email are required.");
      return;
    }

    setUpdating(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/actions/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uniqueId,
          name,
          email,
          website,
          x,
          discord,
          month,
          year,
          feesType,
        }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Failed to update project");
      }

      setSuccess("Project updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to update project");
    } finally {
      setUpdating(false);
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setWebsite(null);
    setX(null);
    setDiscord(null);
    setMonth(0);
    setYear(0);
    setFeesType("");
  };

  return (
    <div className="flex justify-center items-center p-6 text-white w-[80%]">
      <div className="w-[80%] bg-gray-900 p-8 rounded-lg shadow-[0_0_13px_rgba(255,255,255,0.4)] border border-gray-500">
        <h1 className="text-3xl text-center font-bold mb-6">Update Project</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
              role="status"
            ></div>
          </div>
        ) : isIdValid === null ? (
          <form onSubmit={handleIdSubmit} className="space-y-6">
            <label
              htmlFor="uniqueId"
              className="block text-lg font-medium mb-2"
            >
              Enter Project&#39;s Unique ID
            </label>
            <input
              id="uniqueId"
              type="text"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
              placeholder="Unique ID"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Checking..." : "Check ID"}
            </button>
            {error && <p className="text-red-400 mt-2">{error}</p>}
          </form>
        ) : isIdValid ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
              placeholder="Name"
              required
            />
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
              placeholder="Email"
              required
            />
            <label htmlFor="website" className="block text-lg font-medium mb-2">
              Website (optional)
            </label>
            <input
              id="website"
              type="url"
              value={website || ""}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
              placeholder="Website"
            />
            <label htmlFor="x" className="block text-lg font-medium mb-2">
              X (optional)
            </label>
            <input
              id="x"
              type="text"
              value={x || ""}
              onChange={(e) => setX(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
              placeholder="X"
            />
            <label htmlFor="discord" className="block text-lg font-medium mb-2">
              Discord (optional)
            </label>
            <input
              id="discord"
              type="text"
              value={discord || ""}
              onChange={(e) => setDiscord(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
              placeholder="Discord"
            />
            <label htmlFor="month" className="block text-lg font-medium mb-2">
              Monthly Fees
            </label>
            <input
              id="month"
              type="number"
              value={month}
              onChange={(e) => setMonth(parseFloat(e.target.value))}
              className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
              placeholder="Monthly Fee"
              min="0"
            />
            <label htmlFor="year" className="block text-lg font-medium mb-2">
              Yearly Fees
            </label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(parseFloat(e.target.value))}
              className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
              placeholder="Yearly Fee"
              min="0"
            />
            <label htmlFor="feesType" className="block text-lg font-medium mb-2">
              Fees Type
            </label>
            <select
              id="feesType"
              value={feesType}
              onChange={(e) => setFeesType(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-white"
              required
            >
              <option value="" disabled>
                Select Fees Type
              </option>
              <option value="sol">SOL</option>
              <option value="bark">BARK</option>
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Project"}
            </button>
            {error && <p className="text-red-400 mt-2">{error}</p>}
            {success && <p className="text-green-400 mt-2">{success}</p>}
          </form>
        ) : (
          <p className="text-red-400 mt-2">Invalid ID provided. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default UpdatePage;
