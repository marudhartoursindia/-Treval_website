"use client";

import * as React from "react";
import { 
  Lock, Unlock, Plus, Edit, Trash2, Loader2, Check, AlertCircle, 
  RefreshCw, FileSpreadsheet, Eye, EyeOff, Save, ChevronRight, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const SECRET_TOKEN = "MarudharToursSecureToken2026"; // Must match Apps Script

interface FormState {
  sheet: string;
  action: "create" | "update" | "delete";
  data: any;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("packages");
  
  // Data State
  const [dbData, setDbData] = React.useState<any>({
    packages: [],
    destinations: [],
    blogs: [],
    testimonials: [],
    faqs: []
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [apiEndpoint, setApiEndpoint] = React.useState("");

  // Form Modal State
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formState, setFormState] = React.useState<FormState | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isUploadingImage, setIsUploadingImage] = React.useState(false);

  React.useEffect(() => {
    // Load config from environment or local storage
    const storedAuth = localStorage.getItem("mti_admin_auth") === "true";
    const storedEndpoint = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API || localStorage.getItem("mti_sheet_api") || "";
    setApiEndpoint(storedEndpoint);
    if (storedAuth && storedEndpoint) {
      setIsAuthenticated(true);
      fetchData(storedEndpoint);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      if (!apiEndpoint) {
        setAuthError("Please configure the Google Sheet API URL first.");
        return;
      }
      setIsAuthenticated(true);
      localStorage.setItem("mti_admin_auth", "true");
      localStorage.setItem("mti_sheet_api", apiEndpoint);
      setAuthError("");
      fetchData(apiEndpoint);
    } else {
      setAuthError("Invalid password. Try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("mti_admin_auth");
  };

  const fetchData = async (url: string) => {
    if (!url) return;
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`/api/admin?endpoint=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error("Failed to load spreadsheet database");
      const data = await res.json();
      setDbData({
        packages: data.packages || [],
        destinations: data.destinations || [],
        blogs: data.blogs || [],
        testimonials: data.testimonials || [],
        faqs: data.faqs || []
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Error connection failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState || !apiEndpoint) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin?endpoint=${encodeURIComponent(apiEndpoint)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: SECRET_TOKEN,
          action: formState.action,
          sheet: formState.sheet,
          data: formState.data
        })
      });

      const resText = await response.text();
      let resJson;
      try {
        resJson = JSON.parse(resText);
      } catch(err) {
        throw new Error("Invalid response from Google Sheets Apps Script");
      }

      if (resJson.error) {
        alert("Error: " + resJson.error + (resJson.details ? "\n\nDetails: " + resJson.details : ""));
      } else {
        alert("Operation successful!");
        setIsModalOpen(false);
        setFormState(null);
        fetchData(apiEndpoint); // Refresh
      }
    } catch (err: any) {
      console.error(err);
      alert("Failed to submit request: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openAddModal = (tab: string) => {
    let initialData: any = { id: "" };
    if (tab === "packages") {
      initialData = {
        id: "", slug: "", title: "", content: "", excerpt: "", featured_media_url: "",
        duration: "", price: 0, discount_price: "", highlights: [], overview: "",
        day_wise_itinerary: [], included_services: [], excluded_services: [],
        hotel_information: "", transportation_information: "", faq: [],
        map_location: "", booking_cta: "", gallery_images: [], destination_id: "",
        categories_names: [], seo_title: "", seo_description: ""
      };
    } else if (tab === "destinations") {
      initialData = {
        id: "", slug: "", title: "", content: "", excerpt: "", featured_media_url: "",
        gallery: [], popular_attractions: [], best_time_to_visit: "", travel_tips: []
      };
    } else if (tab === "blogs") {
      initialData = {
        id: "", slug: "", title: "", content: "", excerpt: "", featured_media_url: "",
        date: new Date().toISOString().split("T")[0], categories_names: [], tags_names: [],
        seo_title: "", seo_description: ""
      };
    } else if (tab === "testimonials") {
      initialData = { id: "", title: "", content: "", rating: 5, location: "", photo: "" };
    } else if (tab === "faqs") {
      initialData = { id: "", title: "", answer: "", category: "" };
    }

    setFormState({
      sheet: tab,
      action: "create",
      data: initialData
    });
    setIsModalOpen(true);
  };

  const openEditModal = (tab: string, item: any) => {
    setFormState({
      sheet: tab,
      action: "update",
      data: { ...item }
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (tab: string, item: any) => {
    if (!confirm(`Are you sure you want to delete "${item.title?.rendered || item.title || "this item"}"?`)) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin?endpoint=${encodeURIComponent(apiEndpoint)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: SECRET_TOKEN,
          action: "delete",
          sheet: tab,
          data: { id: item.id }
        })
      });
      const resData = await response.json();
      if (resData.error) throw new Error(resData.error);
      alert("Deleted successfully!");
      fetchData(apiEndpoint);
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Render auth gate if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center py-12 px-6">
        <div className="max-w-md w-full bg-stone-900 border border-accent/20 p-8 space-y-6 text-center">
          <div className="mx-auto w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center text-accent">
            <Lock size={20} />
          </div>
          <div className="space-y-2">
            <h1 className="font-playfair text-2xl font-bold text-white tracking-wide">
              Marudhar Tours Admin Panel
            </h1>
            <p className="text-xs text-white/50 font-light">
              Enter password to manage packages, blogs, and testimonials.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[9px] uppercase tracking-widest text-white/40 font-semibold block">
                Google Sheets API Url
              </label>
              <input
                type="text"
                required
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-xs focus:outline-none focus:border-accent text-white font-light"
                placeholder="https://script.google.com/macros/s/.../exec"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[9px] uppercase tracking-widest text-white/40 font-semibold block">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-xs focus:outline-none focus:border-accent text-white font-light"
                placeholder="Enter password (default: admin123)"
              />
            </div>

            {authError && (
              <p className="text-[10px] text-red-500 font-medium flex items-center justify-center">
                <AlertCircle size={12} className="mr-1" />
                {authError}
              </p>
            )}

            <Button type="submit" variant="accent" className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider">
              Authenticate
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-6">
      <div className="max-w-[1360px] mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[var(--border-color)] pb-6">
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-semibold block">
              Bespoke CMS Control Panel
            </span>
            <h1 className="font-playfair text-3xl md:text-5xl font-bold text-foreground">
              Spreadsheet Database Manager
            </h1>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchData(apiEndpoint)}
              disabled={isLoading}
              className="border-accent text-accent hover:bg-accent hover:text-primary"
            >
              <RefreshCw size={14} className={`mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Sync Sheets Data
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-500 border border-red-500/20 hover:bg-red-500/10"
            >
              <LogOut size={14} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 border-b border-[var(--border-color)] pb-3">
          {["packages", "destinations", "blogs", "testimonials", "faqs"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab 
                  ? "border-b-2 border-accent text-accent" 
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              {tab} ({dbData[tab]?.length || 0})
            </button>
          ))}
        </div>

        {/* Action Header */}
        <div className="flex justify-between items-center bg-[var(--card-bg)] border border-[var(--border-color)] p-4 shadow-sm">
          <span className="text-xs text-foreground/70 font-light">
            Managing active spreadsheet records under sheet <strong className="text-accent uppercase">'{activeTab}'</strong>.
          </span>
          <Button
            variant="accent"
            size="sm"
            onClick={() => openAddModal(activeTab)}
          >
            <Plus size={14} className="mr-2" />
            Add New Item
          </Button>
        </div>

        {/* Records Listing Grid */}
        {isLoading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
            <Loader2 size={36} className="animate-spin text-accent" />
            <p className="text-xs text-foreground/50">Fetching database schema from Google Sheets...</p>
          </div>
        ) : errorMsg ? (
          <div className="py-12 bg-red-50 border border-red-200 text-center text-red-700 p-6 space-y-2">
            <AlertCircle className="mx-auto text-red-500" size={24} />
            <p className="text-sm font-semibold">Connection failed</p>
            <p className="text-xs font-light">{errorMsg}</p>
          </div>
        ) : (
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] shadow-md overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-900/40 border-b border-[var(--border-color)] uppercase tracking-wider text-[10px] text-foreground/60 font-semibold">
                  <th className="p-4 w-16">ID</th>
                  <th className="p-4">Title / Label</th>
                  <th className="p-4">Slug / Reference</th>
                  {activeTab === "packages" && <th className="p-4 w-28">Price</th>}
                  {activeTab === "packages" && <th className="p-4 w-28">Duration</th>}
                  {activeTab === "testimonials" && <th className="p-4 w-20">Rating</th>}
                  {activeTab === "testimonials" && <th className="p-4">Location</th>}
                  {activeTab === "faqs" && <th className="p-4">Category</th>}
                  <th className="p-4 w-28 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {dbData[activeTab]?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-foreground/50 font-light">
                      No records found in spreadsheet tab. Click "Add New Item" to populate.
                    </td>
                  </tr>
                ) : (
                  dbData[activeTab]?.map((item: any) => (
                    <tr key={item.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-900/10 transition-colors">
                      <td className="p-4 font-bold text-accent">{item.id}</td>
                      <td className="p-4 font-medium text-foreground">
                        {item.title?.rendered || item.title || "Untitled"}
                      </td>
                      <td className="p-4 text-foreground/60 font-mono text-[10px]">
                        {item.slug || item.category || "-"}
                      </td>
                      {activeTab === "packages" && <td className="p-4 text-accent font-semibold">${item.meta?.price || item.price || 0}</td>}
                      {activeTab === "packages" && <td className="p-4 text-foreground/60">{item.meta?.duration || item.duration || "-"}</td>}
                      {activeTab === "testimonials" && <td className="p-4 font-semibold text-accent">{item.meta?.rating || item.rating || 5} ★</td>}
                      {activeTab === "testimonials" && <td className="p-4 text-foreground/60">{item.meta?.location || item.location || "-"}</td>}
                      {activeTab === "faqs" && <td className="p-4 text-foreground/60">{item.meta?.category || item.category || "-"}</td>}
                      <td className="p-4 flex items-center justify-center space-x-2">
                        <button
                          onClick={() => openEditModal(activeTab, item)}
                          className="p-1.5 border border-[var(--border-color)] hover:border-accent hover:text-accent transition-colors"
                          title="Edit"
                        >
                          <Edit size={12} />
                        </button>
                        <button
                          onClick={() => handleDelete(activeTab, item)}
                          className="p-1.5 border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Dynamic Edit/Create Form Overlay Modal */}
      {isModalOpen && formState && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6 overflow-y-auto backdrop-blur-sm">
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] w-full max-w-2xl shadow-xl flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-stone-50 dark:bg-stone-900/20">
              <h2 className="font-playfair text-xl font-bold uppercase tracking-wide text-foreground">
                {formState.action === "create" ? "Create New" : "Edit"} Record ({formState.sheet})
              </h2>
              <button 
                onClick={() => { setIsModalOpen(false); setFormState(null); }}
                className="text-foreground/50 hover:text-foreground text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleAction} className="p-6 overflow-y-auto space-y-4 flex-grow text-xs font-light">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Auto ID */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold block">ID (Optional on Creation)</label>
                  <input
                    type="number"
                    disabled={formState.action === "update"}
                    value={formState.data.id || ""}
                    onChange={(e) => setFormState({
                      ...formState,
                      data: { ...formState.data, id: e.target.value ? Number(e.target.value) : "" }
                    })}
                    className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground disabled:opacity-50"
                    placeholder="Auto-incremented"
                  />
                </div>

                {/* Slug / Ref */}
                {formState.sheet !== "testimonials" && formState.sheet !== "faqs" && (
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold block">Slug / URL Reference</label>
                    <input
                      type="text"
                      required
                      value={formState.data.slug || ""}
                      onChange={(e) => setFormState({
                        ...formState,
                        data: { ...formState.data, slug: e.target.value }
                      })}
                      className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground"
                      placeholder="e.g. jaipur-heritage-tour"
                    />
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold block">Title / Main Label</label>
                <input
                  type="text"
                  required
                  value={formState.data.title?.rendered || formState.data.title || ""}
                  onChange={(e) => setFormState({
                    ...formState,
                    data: { ...formState.data, title: e.target.value }
                  })}
                  className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground font-medium"
                  placeholder="Record title"
                />
              </div>

              {/* Specific Sheet Fields */}
              {formState.sheet === "packages" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold block">Price ($)</label>
                      <input
                        type="number"
                        required
                        value={formState.data.price || 0}
                        onChange={(e) => setFormState({
                          ...formState,
                          data: { ...formState.data, price: Number(e.target.value) }
                        })}
                        className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold block">Discount Price ($)</label>
                      <input
                        type="number"
                        value={formState.data.discount_price || ""}
                        onChange={(e) => setFormState({
                          ...formState,
                          data: { ...formState.data, discount_price: e.target.value ? Number(e.target.value) : "" }
                        })}
                        className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold block">Duration (e.g. 5 Days)</label>
                      <input
                        type="text"
                        required
                        value={formState.data.duration || ""}
                        onChange={(e) => setFormState({
                          ...formState,
                          data: { ...formState.data, duration: e.target.value }
                        })}
                        className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold block">Overview Text</label>
                    <textarea
                      rows={3}
                      value={formState.data.overview || ""}
                      onChange={(e) => setFormState({
                        ...formState,
                        data: { ...formState.data, overview: e.target.value }
                      })}
                      className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground resize-none"
                    />
                  </div>
                </>
              )}

              {/* Image URL & content fields */}
              {formState.sheet !== "faqs" && (
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold block">Featured Image</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={formState.data.featured_media_url || formState.data.photo || ""}
                      onChange={(e) => setFormState({
                        ...formState,
                        data: { 
                          ...formState.data, 
                          featured_media_url: e.target.value,
                          photo: formState.sheet === "testimonials" ? e.target.value : undefined 
                        }
                      })}
                      className="flex-grow bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground"
                      placeholder="https://images.unsplash.com/... or /uploads/... (or upload using button)"
                    />
                    <label className="cursor-pointer bg-accent hover:bg-accent/80 text-primary px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors select-none flex items-center justify-center min-w-[100px] text-center">
                      {isUploadingImage ? <Loader2 size={12} className="animate-spin text-primary" /> : "Upload Image"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setIsUploadingImage(true);
                          try {
                            const formData = new FormData();
                            formData.append("file", file);
                            const res = await fetch("/api/upload", {
                              method: "POST",
                              body: formData,
                            });
                             if (!res.ok) {
                               const errData = await res.json().catch(() => ({}));
                               throw new Error(errData.error || "Upload failed");
                             }
                             const data = await res.json();
                            if (data.url) {
                              const updatedData = {
                                ...formState.data,
                                featured_media_url: data.url,
                                photo: formState.sheet === "testimonials" ? data.url : undefined
                              };
                              
                              setFormState({
                                ...formState,
                                data: updatedData
                              });

                              // If we are in UPDATE (edit) mode, save directly to Google Sheets immediately
                              if (formState.action === "update") {
                                setIsSubmitting(true);
                                const saveRes = await fetch(`/api/admin?endpoint=${encodeURIComponent(apiEndpoint)}`, {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    token: SECRET_TOKEN,
                                    action: "update",
                                    sheet: formState.sheet,
                                    data: updatedData
                                  })
                                });
                                const saveJson = await saveRes.json();
                                if (saveJson.error) {
                                  alert("Image uploaded, but failed to auto-save to Google Sheets: " + saveJson.error);
                                } else {
                                  alert("Image uploaded and saved to Google Sheets successfully!");
                                  setIsModalOpen(false);
                                  setFormState(null);
                                  fetchData(apiEndpoint); // Refresh the list
                                }
                              }
                            }
                          } catch (err: any) {
                            alert("Upload failed: " + err.message);
                          } finally {
                            setIsUploadingImage(false);
                            setIsSubmitting(false);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              )}

              {formState.sheet === "testimonials" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold block">Rating (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      required
                      value={formState.data.rating || 5}
                      onChange={(e) => setFormState({
                        ...formState,
                        data: { ...formState.data, rating: Number(e.target.value) }
                      })}
                      className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold block">Location (e.g. Sydney, Australia)</label>
                    <input
                      type="text"
                      required
                      value={formState.data.location || ""}
                      onChange={(e) => setFormState({
                        ...formState,
                        data: { ...formState.data, location: e.target.value }
                      })}
                      className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground"
                    />
                  </div>
                </div>
              )}

              {formState.sheet === "faqs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold block">FAQ Category</label>
                    <input
                      type="text"
                      required
                      value={formState.data.category || ""}
                      onChange={(e) => setFormState({
                        ...formState,
                        data: { ...formState.data, category: e.target.value }
                      })}
                      className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground"
                    />
                  </div>
                </div>
              )}

              {/* Excerpt / Subtext */}
              {formState.sheet !== "faqs" && (
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold block">Excerpt / Brief Description</label>
                  <input
                    type="text"
                    required
                    value={formState.data.excerpt?.rendered || formState.data.excerpt || ""}
                    onChange={(e) => setFormState({
                      ...formState,
                      data: { ...formState.data, excerpt: e.target.value }
                    })}
                    className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground"
                    placeholder="Short summary for card grids"
                  />
                </div>
              )}

              {/* Main Content Body */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold block">
                  {formState.sheet === "faqs" ? "FAQ Answer" : "Main Content Body (HTML Supported)"}
                </label>
                <textarea
                  rows={5}
                  required
                  value={formState.data.content?.rendered || formState.data.content || formState.data.answer || ""}
                  onChange={(e) => setFormState({
                    ...formState,
                    data: { 
                      ...formState.data, 
                      content: e.target.value,
                      answer: formState.sheet === "faqs" ? e.target.value : undefined
                    }
                  })}
                  className="w-full bg-[var(--background)] border border-[var(--border-color)] px-3 py-2 text-xs focus:outline-none focus:border-accent text-foreground font-mono resize-none"
                  placeholder="Record description or content details..."
                />
              </div>

              {/* Submit panel */}
              <div className="pt-4 border-t border-[var(--border-color)] flex justify-end space-x-3 bg-stone-50 dark:bg-stone-900/20 -mx-6 -mb-6 p-6">
                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); setFormState(null); }}
                  className="px-4 py-2 border border-[var(--border-color)] text-foreground hover:bg-stone-100 dark:hover:bg-stone-900/40 text-xs font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  variant="accent"
                  loading={isSubmitting}
                  className="px-6 text-xs font-semibold uppercase tracking-wider"
                >
                  <Save size={14} className="mr-2" />
                  Save Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
