import React, { useState, useEffect } from "react";
import { useData, Appointment } from "../context/DataContext";
import { 
  Lock, 
  KeyRound, 
  User, 
  Layers, 
  Calendar, 
  HelpCircle, 
  Star, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  X, 
  Clock, 
  AlertTriangle, 
  Trash2, 
  Edit2, 
  Plus, 
  Search, 
  Save, 
  RotateCcw, 
  MapPin, 
  Paperclip,
  Phone,
  Mail,
  FileText,
  Briefcase,
  Sliders,
  ChevronRight,
  LogOut,
  UploadCloud,
  Globe,
  Eye,
  Download
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ShowcaseItem } from "./Gallery";

export default function AdminPanel() {
  const {
    appointments,
    updateAppointment,
    deleteAppointment,
    addAppointment,

    showcases,
    addShowcase,
    updateShowcase,
    deleteShowcase,
    resetShowcases,

    faqs,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    resetFAQs,

    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    resetTestimonials,

    conditions,
    addCondition,
    updateCondition,
    deleteCondition,
    resetConditions,

    blogs,
    addBlog,
    updateBlog,
    deleteBlog,
    resetBlogs,

    adminPin,
    setAdminPin
  } = useData();

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Check existing session
  useEffect(() => {
    const sessionToken = localStorage.getItem("dr_dheeraj_admin_session");
    if (sessionToken) {
      try {
        const parsed = JSON.parse(sessionToken);
        if (Date.now() - parsed.timestamp < 1000 * 60 * 60 * 4) { // 4 hour session
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("dr_dheeraj_admin_session");
        }
      } catch (e) {}
    }
  }, []);

  // Tabs management
  type ActiveTab = "appointments" | "showcases" | "blogs" | "faqs" | "testimonials" | "conditions" | "settings";
  const [activeTab, setActiveTab] = useState<ActiveTab>("appointments");

  // Filter and search states
  const [aptSearch, setAptSearch] = useState("");
  const [aptFilterStatus, setAptFilterStatus] = useState<string>("all");

  // Create & Edit Modal states
  const [editingItem, setEditingItem] = useState<{ type: string; id: string; data: any } | null>(null);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [formType, setFormType] = useState<"appointment" | "showcase" | "blogs" | "faq" | "testimonial" | "condition">("appointment");
  const [isUploading, setIsUploading] = useState(false);

  // Calendar view states
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [calendarDate, setCalendarDate] = useState(() => new Date(2026, 5, 23)); // Set to June 2026 to match preloaded appointments
  const [activeAptDetails, setActiveAptDetails] = useState<Appointment | null>(null);

  // Security Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: passwordInput })
      });

      if (res.ok) {
        setIsAuthenticated(true);
        setAuthError("");
        setAdminPin(passwordInput);
        localStorage.setItem("dr_dheeraj_admin_pin", passwordInput);
        localStorage.setItem("dr_dheeraj_admin_session", JSON.stringify({
          authenticated: true,
          timestamp: Date.now()
        }));
        setPasswordInput("");
      } else {
        setAuthError("Invalid Security PIN Code. Please try again.");
      }
    } catch (err) {
      setAuthError("Server verification failed. Please try again later.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminPin("");
    localStorage.removeItem("dr_dheeraj_admin_session");
  };

  // Safe reset configurations
  const handleSystemReset = (type: "all" | "galleries" | "blogs" | "faqs" | "testimonials" | "conditions") => {
    if (!confirm("Are you sure you want to restore default demo records? Your custom edits will be reverted.")) return;
    
    if (type === "all" || type === "galleries") resetShowcases();
    if (type === "all" || type === "blogs") resetBlogs();
    if (type === "all" || type === "faqs") resetFAQs();
    if (type === "all" || type === "testimonials") resetTestimonials();
    if (type === "all" || type === "conditions") resetConditions();
    
    alert("Records refreshed back to premium clinical defaults!");
  };

  // Status Color Utilities
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400";
      case "pending":
        return "bg-amber-500/10 border border-amber-500/20 text-amber-400";
      case "rescheduled":
        return "bg-blue-500/10 border border-blue-500/20 text-blue-400";
      case "cancelled":
        return "bg-rose-500/10 border border-rose-500/20 text-rose-400";
      default:
        return "bg-gray-500/10 border border-gray-500/20 text-gray-400";
    }
  };

  // Appointment Action triggers
  const handleConfirmAppointment = (id: string) => {
    updateAppointment(id, { status: "confirmed" });
  };

  const handleRescheduleAppointment = (id: string) => {
    const nextDate = prompt("Enter new schedule date (YYYY-MM-DD):", "2026-06-05");
    const nextTime = prompt("Enter new consultation slot (e.g. 11:30 AM):", "11:30 AM");
    if (nextDate && nextTime) {
      updateAppointment(id, {
        status: "rescheduled",
        bookingDate: nextDate,
        bookingTime: nextTime
      });
    }
  };

  const handleCancelAppointment = (id: string) => {
    updateAppointment(id, { status: "cancelled" });
  };

  // CRUD operation triggers (Modal launcher)
  const openEditModal = (type: "appointment" | "showcase" | "blogs" | "faq" | "testimonial" | "condition", id: string, data: any) => {
    setEditingItem({ type, id, data: { ...data } });
    setFormType(type);
    setIsOpenForm(true);
  };

  const openCreateModal = (type: "appointment" | "showcase" | "blogs" | "faq" | "testimonial" | "condition", prefillData?: any) => {
    const emptyModels = {
      appointment: { fullName: "", email: "", phone: "", selectedTreatment: "fess", symptoms: "", sessionType: "video", isInternational: false, status: "pending", bookingDate: "", bookingTime: "11:30 AM" },
      showcase: { id: `sc-${Date.now()}`, title: "", subtitle: "", description: "", category: "surgical", location: "Jaipur Clinic", date: "May 2026", imageUrl: "", sizeClass: "md:col-span-1 md:row-span-1", badge: "New Case" },
      blogs: { id: `blog-${Date.now()}`, title: "", summary: "", content: "", category: "Clinical Guide", date: "May 2026", readTime: "6 min read", author: "Dr. Dheeraj Vishwakarma" },
      faq: { id: `faq-${Date.now()}`, question: "", answer: "", category: "technology" },
      testimonial: { id: `test-${Date.now()}`, name: "", location: "Google Review", condition: "", quote: "", recoverySummary: "", rating: 5 },
      condition: { id: `cond-${Date.now()}`, name: "", shortDescription: "", fullDescription: "", symptoms: [], treatmentMetric: "99% Precision", recoveryTime: "Walk Same Day", detailedKey: "", iconName: "Zap" }
    };

    const mergedData = prefillData ? { ...emptyModels[type], ...prefillData } : emptyModels[type];

    setEditingItem({ type, id: "", data: mergedData });
    setFormType(type);
    setIsOpenForm(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const { type, id, data } = editingItem;

    if (type === "appointment") {
      if (id) {
        updateAppointment(id, data);
      } else {
        addAppointment(data);
      }
    } else if (type === "showcase") {
      if (id) {
        updateShowcase(id, data);
      } else {
        addShowcase(data);
      }
    } else if (type === "faq") {
      if (id) {
        updateFAQ(id, data);
      } else {
        addFAQ(data);
      }
    } else if (type === "testimonial") {
      if (id) {
        updateTestimonial(id, data);
      } else {
        addTestimonial(data);
      }
    } else if (type === "condition") {
      if (id) {
        updateCondition(id, data);
      } else {
        addCondition(data);
      }
    } else if (type === "blogs") {
      if (id) {
        updateBlog(id, data);
      } else {
        addBlog(data);
      }
    }

    setIsOpenForm(false);
    setEditingItem(null);
  };

  const deleteItem = (type: string, id: string) => {
    if (!confirm(`Are you sure you want to permanently delete this ${type} item?`)) return;

    if (type === "appointment") deleteAppointment(id);
    if (type === "showcase") deleteShowcase(id);
    if (type === "blogs") deleteBlog(id);
    if (type === "faq") deleteFAQ(id);
    if (type === "testimonial") deleteTestimonial(id);
    if (type === "condition") deleteCondition(id);
  };

  // Appointment statistics
  const countPending = appointments.filter(a => a.status === "pending").length;
  const countConfirmed = appointments.filter(a => a.status === "confirmed").length;
  const countReschedules = appointments.filter(a => a.status === "rescheduled").length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center py-20 px-4 relative">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-gold-400/5 rounded-full pointer-events-none blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-sky-500/5 rounded-full pointer-events-none blur-[120px]" />

        <div className="w-full max-w-md bg-cosmic-card border border-white/10 rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl relative z-10 text-center">
          <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="font-display font-medium text-2xl text-white tracking-tight mb-2">
            Secure Admin Portal Gate
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-6">
            Enter the authorized security credential code to manage clinical appointments and page content.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input
                type="password"
                placeholder="Enter Access PIN (Try: admin123)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/20 transition-all text-center tracking-widest font-mono font-bold"
                id="admin-pin-field"
                required
              />
            </div>

            {authError && (
              <p className="text-xs font-semibold text-rose-400 bg-rose-500/15 border border-rose-500/20 p-2.5 rounded-lg flex items-center justify-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-black font-extrabold text-xs tracking-wider uppercase py-3.5 rounded-full transition-transform hover:scale-[1.02] shadow-lg shadow-gold-500/10 cursor-pointer"
            >
              Verify Authority and Login
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-white/5 text-[10px] text-stone-500 font-mono">
            <span>PROTECTED GATE • CLINICAL PRIVACY PROTOCOLS ACTIVE</span>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchStatus = aptFilterStatus === "all" || apt.status === aptFilterStatus;
    const matchSearch = apt.fullName.toLowerCase().includes(aptSearch.toLowerCase()) || 
                        apt.phone.includes(aptSearch) || 
                        apt.symptoms.toLowerCase().includes(aptSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <section className="relative min-h-screen py-10 px-4 xs:px-6 sm:px-8 max-w-7xl mx-auto text-white">
      {/* Background Ambient flares */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gold-400/5 rounded-full pointer-events-none blur-[140px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-500/5 rounded-full pointer-events-none blur-[140px]" />

      {/* Admin Panel Header */}
      <div className="relative pb-6 border-b border-white/5 mb-8 pt-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full w-fit">
            <Sliders className="w-3.5 h-3.5 text-gold-400" />
            <span className="font-mono text-[9px] tracking-widest text-gold-300 font-bold uppercase">
              Authenticated EHR Console
            </span>
          </div>
          <h1 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight">
            Clinic Content & Appointment Manager
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-xl">
            Register appointments, monitor patient files, edit medical treatments information, testimony logs, and FAQ catalogs dynamically.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/15 hover:bg-rose-500/20 px-4 py-2 rounded-full font-mono font-bold transition-all shrink-0 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Session</span>
        </button>
      </div>

      {/* Analytics Dashboard Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 relative">
        <div className="bg-cosmic-card/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
          <span className="text-stone-500 font-mono text-[10px] tracking-wider uppercase font-semibold">
            Total Inquiries
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-display font-semibold text-3xl text-white">
              {appointments.length}
            </span>
            <span className="text-[10px] text-stone-400">cases</span>
          </div>
        </div>

        <div className="bg-cosmic-card/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
          <span className="text-amber-400 font-mono text-[10px] tracking-wider uppercase font-semibold">
            ● Pending Queue
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-display font-semibold text-3xl text-amber-400 animate-pulse">
              {countPending}
            </span>
            <span className="text-[10px] text-stone-400 font-medium">pending</span>
          </div>
        </div>

        <div className="bg-cosmic-card/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
          <span className="text-emerald-400 font-mono text-[10px] tracking-wider uppercase font-semibold">
            ✓ Confirmed Sessions
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-display font-semibold text-3xl text-emerald-400">
              {countConfirmed}
            </span>
            <span className="text-[10px] text-stone-400 font-medium">confirmed</span>
          </div>
        </div>

        <div className="bg-cosmic-card/50 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
          <span className="text-sky-450 font-mono text-[10px] tracking-wider uppercase font-semibold">
            Active Showcases
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-display font-semibold text-3xl text-sky-400">
              {showcases.length}
            </span>
            <span className="text-[10px] text-stone-400">items</span>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation Buttons */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-cosmic-card/40 rounded-2xl border border-white/5 mb-8 backdrop-blur-md">
        {[
          { id: "appointments", label: "Appointments Queue", icon: Calendar },
          { id: "showcases", label: "Photo Gallery", icon: Layers },
          { id: "blogs", label: "Publications Manager", icon: FileText },
          { id: "conditions", label: "Treatments", icon: TrendingUp },
          { id: "testimonials", label: "Testimonials", icon: Star },
          { id: "faqs", label: "FAQ Center", icon: HelpCircle },
          { id: "settings", label: "Security & Factory Resets", icon: KeyRound }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? "bg-gold-400/15 border border-gold-400/20 text-gold-300 shadow-[0_4px_15px_rgba(193,161,113,0.15)]"
                  : "text-stone-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? "text-gold-400" : "text-stone-500"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN CONTAINER ACTIVE VIEWS */}
      <div className="bg-cosmic-card/40 border border-white/5 rounded-3xl p-6 relative backdrop-blur-lg">

        {/* 1. APPOINTMENTS TAB */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/5">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                {/* View Switcher */}
                <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 shrink-0 mr-1.5">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                      viewMode === "list"
                        ? "bg-white text-black"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    <Sliders className="w-3 h-3" /> List
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("calendar")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                      viewMode === "calendar"
                        ? "bg-white text-black"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    <Calendar className="w-3 h-3" /> Calendar
                  </button>
                </div>

                {["all", "pending", "confirmed", "rescheduled", "cancelled"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setAptFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase font-mono tracking-wider transition-all cursor-pointer ${
                      aptFilterStatus === status
                        ? "bg-white text-black font-semibold"
                        : "bg-white/5 text-stone-400 hover:bg-white/10"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Search & Add */}
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-56">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-500" />
                  <input
                    type="text"
                    placeholder="Search name/symptoms..."
                    value={aptSearch}
                    onChange={(e) => setAptSearch(e.target.value)}
                    className="w-full bg-cosmic-bg/80 border border-white/15 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-stone-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => openCreateModal("appointment")}
                  className="flex items-center gap-1.5 bg-gold-400 hover:bg-gold-500 text-black px-4 py-2 rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Thru Desk
                </button>
              </div>
            </div>
            {/* Conditional Views */}
            {viewMode === "list" ? (
              /* List View */
              filteredAppointments.length === 0 ? (
                <div className="text-center py-12 text-stone-500">
                  <Calendar className="w-10 h-10 mx-auto mb-3 text-stone-600" />
                  <p className="text-sm font-medium">No appointments fit active filters</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="border border-white/5 rounded-2xl bg-gradient-to-r from-cosmic-card/40 to-cosmic-card/25 p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-gold-400/25 duration-200"
                    >
                      <div className="space-y-3.5 flex-1 text-left">
                        {/* Meta header */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase font-semibold ${getStatusBadgeClass(apt.status)}`}>
                            {apt.status}
                          </span>
                          <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-sky-400" /> Planned: {apt.bookingDate} @ {apt.bookingTime}
                          </span>
                          {apt.isInternational && (
                            <span className="bg-sky-400/10 border border-sky-450/20 text-sky-305 px-2 py-0.5 rounded text-[9px] font-mono font-extrabold uppercase">
                              Global Care
                            </span>
                          )}
                          <span className="text-stone-650 font-mono text-[10px]">ID: {apt.id}</span>
                        </div>

                        {/* Name Card */}
                        <div>
                          <h3 className="font-display text-base font-semibold text-white">
                            {apt.fullName}
                          </h3>
                          {/* Contacts */}
                          <div className="flex flex-wrap gap-4 mt-1 text-xs text-stone-400">
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-gold-400/80" /> {apt.phone}</span>
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-sky-450/80" /> {apt.email}</span>
                            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3 text-stone-500" /> Triage: <strong className="text-stone-300 font-medium uppercase font-mono text-[10px] ml-0.5">{apt.selectedTreatment}</strong></span>
                          </div>
                        </div>

                        {/* Symptoms */}
                        <p className="text-xs text-stone-300 bg-black/15 p-2.5 rounded-xl border border-white/2 outline-none">
                          <strong className="text-stone-550 block text-[9.5px] uppercase font-mono tracking-wider mb-1">Symptoms profile & scan notes:</strong>
                          {apt.symptoms || "No secondary detailed clinical notes filed."}
                        </p>

                        {/* Attachment */}
                        {apt.fileName && (
                          <div className="flex flex-wrap items-center gap-2 bg-emerald-500/5 px-3 py-1.5 rounded-xl border border-emerald-500/15 w-fit text-emerald-450 text-[10px] font-mono select-none">
                            <Paperclip className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="max-w-[200px] truncate text-stone-300">MRI: {apt.fileName}</span>
                            <div className="flex items-center gap-1.5 border-l border-emerald-500/20 pl-2.5 ml-1">
                              <a
                                href={apt.fileName.startsWith('http') ? apt.fileName : `/uploads/${apt.fileName}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors cursor-pointer px-1 py-0.5"
                                title="Preview file in a new tab"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Preview</span>
                              </a>
                              <span className="text-emerald-500/30">|</span>
                              <a
                                href={apt.fileName.startsWith('http') ? apt.fileName : `/uploads/${apt.fileName}`}
                                download
                                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer px-1 py-0.5"
                                title="Download file directly"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Download</span>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Quick CRUD controls */}
                      <div className="flex flex-wrap lg:flex-col gap-2 shrink-0 justify-end pt-4 lg:pt-0 border-t lg:border-t-0 border-white/5">
                        <div className="flex gap-1.5 w-full justify-end">
                          <button
                            onClick={() => handleConfirmAppointment(apt.id)}
                            className="px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold bg-emerald-500 hover:bg-emerald-600 text-black uppercase cursor-pointer"
                            title="Confirm slot"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleRescheduleAppointment(apt.id)}
                            className="px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold bg-blue-500 hover:bg-blue-600 text-black uppercase cursor-pointer"
                            title="Reschedule slot"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(apt.id)}
                            className="px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold bg-amber-500 hover:bg-amber-600 text-black uppercase cursor-pointer"
                            title="Flag as Canceled"
                          >
                            Cancel
                          </button>
                        </div>

                        <div className="flex gap-1.5 w-full justify-end">
                          <button
                            onClick={() => setActiveAptDetails(apt)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-white border border-sky-500/20 cursor-pointer"
                            title="View clinical details"
                          >
                            <FileText className="w-3 h-3" /> View Details
                          </button>
                          <button
                            onClick={() => openEditModal("appointment", apt.id, apt)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" /> Edit Profile
                          </button>
                          <button
                            onClick={() => deleteItem("appointment", apt.id)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold bg-rose-500/10 hover:bg-rose-500 text-rose-450 hover:text-white border border-rose-500/20 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              /* Calendar View */
              <div className="space-y-4 text-left">
                {/* Month navigation controls */}
                <div className="flex justify-between items-center bg-black/30 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const prevDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
                        setCalendarDate(prevDate);
                      }}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white cursor-pointer transition-colors"
                      title="Previous month"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-wide min-w-[130px] text-center">
                      {calendarDate.toLocaleString("default", { month: "long", year: "numeric" })}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        const nextDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
                        setCalendarDate(nextDate);
                      }}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white cursor-pointer transition-colors"
                      title="Next month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        // Reset to June 23, 2026 (matching mockup data dates)
                        setCalendarDate(new Date(2026, 5, 23));
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono font-medium text-stone-300 hover:text-white transition-colors cursor-pointer border border-white/5"
                    >
                      Today
                    </button>
                  </div>
                </div>

                {/* Days of the week headings */}
                <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] tracking-widest text-stone-400 font-bold uppercase py-2 bg-black/10 rounded-xl border border-white/5">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
                    <div key={dayName} className="py-1">
                      {dayName}
                    </div>
                  ))}
                </div>

                {/* Calendar grid cells */}
                <div className="grid grid-cols-7 gap-1 border border-white/5 bg-white/5 rounded-2xl overflow-hidden shadow-2xl">
                  {(() => {
                    const year = calendarDate.getFullYear();
                    const month = calendarDate.getMonth();
                    const numDays = new Date(year, month + 1, 0).getDate();
                    const startDayOfWeek = new Date(year, month, 1).getDay();

                    const prevMonthNumDays = new Date(year, month, 0).getDate();
                    const prevDays = [];
                    for (let i = startDayOfWeek - 1; i >= 0; i--) {
                      prevDays.push({
                        day: prevMonthNumDays - i,
                        month: month === 0 ? 11 : month - 1,
                        year: month === 0 ? year - 1 : year,
                        isCurrentMonth: false,
                      });
                    }

                    const currentDays = [];
                    for (let i = 1; i <= numDays; i++) {
                      currentDays.push({
                        day: i,
                        month,
                        year,
                        isCurrentMonth: true,
                      });
                    }

                    const nextDaysCount = 42 - (prevDays.length + currentDays.length);
                    const nextDays = [];
                    for (let i = 1; i <= nextDaysCount; i++) {
                      nextDays.push({
                        day: i,
                        month: month === 11 ? 0 : month + 1,
                        year: month === 11 ? year + 1 : year,
                        isCurrentMonth: false,
                      });
                    }

                    const allCalendarDays = [...prevDays, ...currentDays, ...nextDays];

                    return allCalendarDays.map((cell, idx) => {
                      const dateStr = `${cell.year}-${String(cell.month + 1).padStart(2, "0")}-${String(cell.day).padStart(2, "0")}`;
                      const cellApts = filteredAppointments.filter(
                        (apt) => apt.bookingDate === dateStr
                      );
                      const isToday =
                        cell.day === new Date().getDate() &&
                        cell.month === new Date().getMonth() &&
                        cell.year === new Date().getFullYear();

                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (cell.isCurrentMonth) {
                              openCreateModal("appointment", { bookingDate: dateStr });
                            }
                          }}
                          className={`min-h-[105px] xs:min-h-[125px] md:min-h-[145px] p-2 bg-cosmic-card/30 flex flex-col justify-between transition-all duration-200 border border-white/5 relative group cursor-pointer hover:bg-white/5 ${
                            !cell.isCurrentMonth ? "opacity-35 pointer-events-none bg-black/10" : ""
                          }`}
                        >
                          {/* Day Number and Add Appointment button */}
                          <div className="flex justify-between items-start">
                            <span
                              className={`text-xs font-mono font-bold flex items-center justify-center ${
                                isToday
                                  ? "bg-gold-400 text-black rounded-full w-5 h-5"
                                  : "text-stone-300"
                              }`}
                            >
                              {cell.day}
                            </span>
                            {cell.isCurrentMonth && (
                              <button
                                type="button"
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white"
                                title="Add appointment direct on this day"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            )}
                          </div>

                          {/* Appointments stack container */}
                          <div className="mt-2 space-y-1 overflow-y-auto max-h-[85px] scrollbar-thin select-none">
                            {cellApts.map((apt) => {
                              let statusDot = "bg-stone-500";
                              let statusBg = "bg-stone-500/10 border-stone-500/20 text-stone-400";
                              if (apt.status === "confirmed") {
                                statusDot = "bg-emerald-450";
                                statusBg = "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20";
                              } else if (apt.status === "pending") {
                                statusDot = "bg-amber-450";
                                statusBg = "bg-amber-500/10 border-amber-500/20 text-amber-450 hover:bg-amber-500/20";
                              } else if (apt.status === "rescheduled") {
                                statusDot = "bg-blue-450";
                                statusBg = "bg-blue-500/10 border-blue-500/20 text-blue-450 hover:bg-blue-500/20";
                              } else if (apt.status === "cancelled") {
                                statusDot = "bg-rose-450";
                                statusBg = "bg-rose-500/10 border-rose-500/20 text-rose-450 hover:bg-rose-500/20";
                              }

                              return (
                                <button
                                  key={apt.id}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveAptDetails(apt);
                                  }}
                                  className={`w-full text-left px-1.5 py-1 rounded text-[9px] font-medium leading-tight truncate border flex items-center gap-1.5 transition-all cursor-pointer ${statusBg}`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot}`} />
                                  <span className="font-bold font-mono opacity-85">{apt.bookingTime}</span>
                                  <span className="truncate">{apt.fullName}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. PHOTO GALLERY TAB */}
        {activeTab === "showcases" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-medium text-lg text-white">Curate Grid Gallery Files</h3>
              <button
                onClick={() => openCreateModal("showcase")}
                className="flex items-center gap-1 bg-gold-400 hover:bg-gold-500 text-black px-4.5 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Photo
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {showcases.map((sc) => (
                <div key={sc.id} className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between">
                  <div className="relative aspect-video bg-zinc-950">
                    <img src={sc.imageUrl} alt={sc.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 bg-black/75 px-2.5 py-0.5 rounded text-[8px] font-mono tracking-wider font-extrabold uppercase text-gold-300 border border-white/10">
                      {sc.badge}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between text-left">
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2 text-[9px] text-stone-500 font-mono">
                        <span>{sc.location}</span>
                        <span>•</span>
                        <span>{sc.date}</span>
                      </div>
                      <h4 className="font-display font-medium text-sm text-stone-100 line-clamp-1">{sc.title}</h4>
                      <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">{sc.subtitle}</p>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => openEditModal("showcase", sc.id, sc)}
                        className="flex-1 flex justify-center items-center gap-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono font-bold cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => deleteItem("showcase", sc.id)}
                        className="p-1.5 rounded-lg bg-rose-500/15 border border-rose-500/20 text-rose-450 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. TREATMENTS TAB */}
        {activeTab === "conditions" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-medium text-lg text-white">Dynamic Spinal Pathology Indices</h3>
              <button
                onClick={() => openCreateModal("condition")}
                className="flex items-center gap-1 bg-gold-400 hover:bg-gold-500 text-black px-4.5 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" /> New Specialty
              </button>
            </div>

            <div className="space-y-4">
              {conditions.map((cond) => (
                <div key={cond.id} className="bg-black/20 p-5 rounded-2xl border border-white/5 text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-gold-400/10 border border-gold-400/20 text-gold-300 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold">
                        {cond.treatmentMetric}
                      </span>
                      <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] text-stone-400 font-mono">
                        {cond.recoveryTime}
                      </span>
                      <span className="text-stone-600 font-mono text-[10px]">ID: {cond.id}</span>
                    </div>

                    <h4 className="font-display font-medium text-base text-stone-100">{cond.name}</h4>
                    <p className="text-xs text-stone-450 line-clamp-2 font-sans md:max-w-2xl">{cond.shortDescription}</p>
                    
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cond.symptoms.map((s, idx) => (
                        <span key={idx} className="bg-white/2 border border-white/5 text-stone-400 px-2 py-0.5 rounded text-[9.5px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end shrink-0 sm:mt-4 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                    <button
                      onClick={() => openEditModal("condition", cond.id, cond)}
                      className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold font-mono cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit Specialty
                    </button>
                    <button
                      onClick={() => deleteItem("condition", cond.id)}
                      className="p-1.5 rounded-lg bg-rose-500/15 border border-rose-500/20 text-rose-450 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. TESTIMONIALS TAB */}
        {activeTab === "testimonials" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-medium text-lg text-white">Patient Verified Critiques</h3>
              <button
                onClick={() => openCreateModal("testimonial")}
                className="flex items-center gap-1 bg-gold-400 hover:bg-gold-500 text-black px-4.5 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Review
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((test) => (
                <div key={test.id} className="bg-black/20 p-5 rounded-2xl border border-white/5 text-left flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: test.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-gold-400 fill-gold-400" />
                        ))}
                      </div>
                      <span className="text-stone-550 font-mono text-[9px]">ID: {test.id}</span>
                    </div>

                    <div>
                      <h4 className="font-display font-semibold text-stone-100 text-sm">{test.name}</h4>
                      <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">{test.location}</p>
                    </div>

                    <div className="p-2.5 rounded bg-black/15 border border-white/2 text-xs italic text-stone-300">
                      "{test.quote}"
                    </div>

                    <div className="text-[11px] font-mono">
                      <span className="text-stone-500 uppercase block">INDICATED AT DIAGNOSIS:</span>
                      <span className="text-stone-350">{test.condition}</span>
                    </div>

                    <div className="text-[11px] font-mono">
                      <span className="text-stone-500 uppercase block">RECOVERY SUMMARY STATEMENT:</span>
                      <span className="text-emerald-400 font-bold">{test.recoverySummary}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 mt-4 border-t border-white/5">
                    <button
                      onClick={() => openEditModal("testimonial", test.id, test)}
                      className="flex-1 flex justify-center items-center gap-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono font-bold cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" /> Edit Quote
                    </button>
                    <button
                      onClick={() => deleteItem("testimonial", test.id)}
                      className="p-1.5 rounded-lg bg-rose-500/15 border border-rose-500/20 text-rose-455 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4.5 Blogs TAB */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-medium text-lg text-white">Clinical Publications & Blogs</h3>
              <button
                onClick={() => openCreateModal("blogs")}
                className="flex items-center gap-1.5 bg-gold-400 hover:bg-gold-500 text-black px-4.5 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Create Publication
              </button>
            </div>

            <div className="space-y-4 text-left">
              {blogs.map((b) => (
                <div key={b.id} className="bg-black/20 p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-sky-400/5 border border-sky-400/10 text-sky-400 px-2.5 py-0.5 rounded text-[9.5px] font-mono uppercase tracking-wider">
                        Category: {b.category}
                      </span>
                      <span className="text-[10px] text-stone-500 font-mono">
                        Published: {b.date} • {b.readTime} • By {b.author}
                      </span>
                    </div>
                    <h4 className="font-display font-medium text-stone-100 text-sm sm:text-base pt-1">
                      {b.title}
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed max-w-3xl mb-2 font-semibold">{b.summary}</p>
                    <p className="text-[11px] text-stone-500 bg-black/10 p-2.5 rounded-xl border border-white/5 line-clamp-3 font-sans leading-relaxed">{b.content}</p>
                  </div>

                  <div className="flex gap-2 justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    <button
                      onClick={() => openEditModal("blogs", b.id, b)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-bold cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => deleteItem("blogs", b.id)}
                      className="p-1.5 rounded-lg bg-rose-500/15 border border-rose-500/20 text-rose-455 hover:bg-rose-550 hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. FAQs TAB */}
        {activeTab === "faqs" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-medium text-lg text-white">Clinical Q&A Portal</h3>
              <button
                onClick={() => openCreateModal("faq")}
                className="flex items-center gap-1 bg-gold-400 hover:bg-gold-500 text-black px-4.5 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Create FAQ
              </button>
            </div>

            <div className="space-y-4 text-left">
              {faqs.map((f) => (
                <div key={f.id} className="bg-black/20 p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <span className="bg-sky-400/5 border border-sky-400/10 text-sky-405 px-2.5 py-0.5 rounded text-[9.5px] font-mono uppercase tracking-wider">
                      Category: {f.category}
                    </span>
                    <h4 className="font-display font-medium text-stone-100 text-sm sm:text-base pt-1">
                      {f.question}
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed max-w-3xl">{f.answer}</p>
                  </div>

                  <div className="flex gap-2 justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    <button
                      onClick={() => openEditModal("faq", f.id, f)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-bold cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => deleteItem("faq", f.id)}
                      className="p-1.5 rounded-lg bg-rose-500/1.5 border border-rose-500/20 text-rose-455 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. SETTINGS & ACCESS TAB */}
        {activeTab === "settings" && (
          <div className="text-left space-y-8 max-w-2xl mx-auto">
            {/* PIN edit */}
            <div className="bg-black/20 p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="font-display font-medium text-lg text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-gold-400" /> Administrative Access Codes Configuration
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                The administrative PIN is verified securely on the server. To change it permanently for your website, update the <code className="text-gold-400 font-mono">ADMIN_PIN</code> environment variable in your Render dashboard. You can also set a temporary browser session override PIN below.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-stone-500 uppercase font-semibold">Active session passcode</label>
                  <input
                    type="text"
                    disabled
                    value={adminPin}
                    className="w-full bg-black/40 border border-white/5 rounded-lg p-2.5 text-xs text-stone-500 font-mono text-center tracking-widest outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gold-400 uppercase font-semibold">Session override passcode</label>
                  <input
                    type="text"
                    placeholder="Enter override PIN"
                    id="new-admin-pin"
                    className="w-full bg-black/50 border border-gold-400/20 rounded-lg p-2.5 text-xs text-white font-mono text-center tracking-widest focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("new-admin-pin") as HTMLInputElement;
                    if (el && el.value.trim().length >= 4) {
                      setAdminPin(el.value.trim());
                      localStorage.setItem("dr_dheeraj_admin_pin", el.value.trim());
                      el.value = "";
                      alert("Session override PIN updated! If the server doesn't match this override, queries may return unauthorized.");
                    } else {
                      alert("Please specify a pin code that has at least 4 characters!");
                    }
                  }}
                  className="bg-gold-400/10 border border-gold-400/25 text-gold-300 hover:bg-gold-400 hover:text-black px-4.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer"
                >
                  Apply Session Override
                </button>
              </div>
            </div>

            {/* Factoring db resets */}
            <div className="bg-black/20 p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="font-display font-medium text-lg text-rose-400 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-rose-500" /> Diagnostics Factory Database Resets
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                If the local memory cache becomes corrupt or if you would like to restore the website back to its original visual catalogs (images, clinical guides, ratings and FAQs), trigger individual or complete restore routines below.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-2">
                <button
                  onClick={() => handleSystemReset("all")}
                  className="bg-rose-500/15 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/25 px-4 py-2 rounded-full text-xs font-bold transition-all font-mono cursor-pointer"
                >
                  Reset Entire Database Factory
                </button>
                <button
                  onClick={() => handleSystemReset("blogs")}
                  className="bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 px-4 py-2 rounded-full text-xs font-bold font-mono cursor-pointer"
                >
                  Reset Publications
                </button>
                <button
                  onClick={() => handleSystemReset("galleries")}
                  className="bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 px-4 py-2 rounded-full text-xs font-bold font-mono cursor-pointer"
                >
                  Reset Photo Gallery
                </button>
                <button
                  onClick={() => handleSystemReset("conditions")}
                  className="bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 px-4 py-2 rounded-full text-xs font-bold font-mono cursor-pointer"
                >
                  Reset Treatments
                </button>
                <button
                  onClick={() => handleSystemReset("testimonials")}
                  className="bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 px-4 py-2 rounded-full text-xs font-bold font-mono cursor-pointer"
                >
                  Reset Testimonials
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* DYNAMIC MODAL BOX FOR EDITING / ADDING COMPILATIONS */}
      <AnimatePresence>
        {isOpenForm && editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-cosmic-card border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-6 sm:p-8 text-left overflow-y-auto max-h-[92vh]"
            >
              <button
                onClick={() => {
                  setIsOpenForm(false);
                  setEditingItem(null);
                }}
                className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 hover:bg-white/5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="font-display font-medium text-xl text-white border-b border-white/5 pb-3 mb-6">
                {editingItem.id ? "Edit Custom Item Content" : "Publish New Register Record"} ({editingItem.type.toUpperCase()})
              </h2>

              <form onSubmit={handleSaveForm} className="space-y-4 text-xs font-medium">
                
                {/* 1. Appointment editing fields */}
                {formType === "appointment" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-stone-400 font-bold">Patient Name *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.fullName || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, fullName: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-stone-400 font-bold">Phone Number *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.phone || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, phone: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={editingItem.data.email || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, email: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Select Triage treatment</label>
                      <select
                        value={editingItem.data.selectedTreatment || "fess"}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, selectedTreatment: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      >
                        <option value="fess">FESS</option>
                        <option value="monoportal">Monoportal</option>
                        <option value="miss">MISS</option>
                        <option value="sciatica">Sciatica</option>
                        <option value="slipdisc">Slip Disc</option>
                        <option value="cervical-lumbar">Cervical & Lumbar</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Consultation Mode</label>
                      <select
                        value={editingItem.data.sessionType || "video"}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, sessionType: e.target.value as any } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      >
                        <option value="video">Virtual Video Call</option>
                        <option value="clinic">In-Person Clinic (India)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Appointment status</label>
                      <select
                        value={editingItem.data.status || "pending"}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, status: e.target.value as any } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="rescheduled">Rescheduled</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Booking Date</label>
                      <input
                        type="date"
                        value={editingItem.data.bookingDate || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, bookingDate: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Booking Hours Limit</label>
                      <input
                        type="text"
                        placeholder="e.g. 11:30 AM"
                        value={editingItem.data.bookingTime || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, bookingTime: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="col-span-2 py-1">
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={editingItem.data.isInternational || false}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, isInternational: e.target.checked } })}
                          className="w-4 h-4 rounded bg-transparent border-white/20 checked:bg-gold-400"
                        />
                        <span className="text-xs text-stone-300">This candidate is seeking offshore treatment support (International Patient)</span>
                      </label>
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-stone-400 font-bold">Symptoms profile descriptives *</label>
                      <textarea
                        rows={3}
                        required
                        value={editingItem.data.symptoms || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, symptoms: e.target.value } })}
                        placeholder="Pathology duration and key indicators..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* 2. Showcase editing fields */}
                {formType === "showcase" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-stone-400 font-bold">Display Title *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.title || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-stone-400 font-bold">Display Subtitle / Caption *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.subtitle || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, subtitle: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Class Category</label>
                      <select
                        value={editingItem.data.category || "surgical"}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, category: e.target.value as any } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      >
                        <option value="surgical">Surgical Action</option>
                        <option value="news">News Press Coverage</option>
                        <option value="workshop">Event Workshop</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Accent Badge Name *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.badge || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, badge: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Action Location *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.location || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, location: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Surgical Date label *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.date || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, date: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-stone-400 font-bold block mb-1">Upload Gallery Image File *</label>
                      <div className="flex flex-col sm:flex-row items-stretch gap-4">
                        {/* Interactive File Input Area */}
                        <div className="flex-1 relative border border-dashed border-white/10 hover:border-gold-400/40 rounded-xl p-4 bg-black/30 transition-all flex flex-col items-center justify-center text-center min-h-[120px]">
                          <input
                            type="file"
                            accept="image/*"
                            id="admin-gallery-file-uploader"
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            disabled={isUploading}
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setIsUploading(true);
                                try {
                                  const signRes = await fetch('/api/upload/sign', {
                                    method: 'POST',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      'x-admin-pin': adminPin
                                    },
                                    body: JSON.stringify({
                                      fileName: file.name,
                                      contentType: file.type,
                                      bucket: 'gallery'
                                    })
                                  });
                                  if (!signRes.ok) throw new Error("Failed to generate upload signature");
                                  const signData = await signRes.json();

                                  const uploadRes = await fetch(signData.signedUrl, {
                                    method: 'PUT',
                                    headers: {
                                      'Content-Type': file.type
                                    },
                                    body: file
                                  });
                                  if (!uploadRes.ok) throw new Error("Failed to upload file to storage");

                                  setEditingItem({
                                    ...editingItem,
                                    data: { ...editingItem.data, imageUrl: signData.publicUrl }
                                  });
                                } catch (error: any) {
                                  console.error("Image upload error:", error);
                                  alert("Error uploading image: " + error.message);
                                } finally {
                                  setIsUploading(false);
                                }
                              }
                            }}
                          />
                          <UploadCloud className="w-8 h-8 text-gold-400/80 mb-2" />
                          <span className="text-xs font-semibold text-stone-200">
                            {isUploading ? "Uploading image..." : "Click or drag image file here"}
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono mt-1">
                            Supports PNG, JPG, WEBP formats
                          </span>
                        </div>

                        {/* Preview / Image status Box */}
                        <div className="w-full sm:w-48 bg-black/40 border border-white/10 rounded-xl p-3 flex flex-col justify-between items-center text-center min-h-[120px]">
                          {editingItem.data.imageUrl ? (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                              <img
                                src={editingItem.data.imageUrl}
                                alt="Pre-selection preview"
                                className="max-h-20 w-full object-cover rounded-lg border border-white/10"
                                referrerPolicy="no-referrer"
                              />
                              <span className="text-[9px] font-mono text-emerald-400 flex items-center justify-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Image Loaded
                              </span>
                            </div>
                          ) : (
                            <div className="text-stone-500 text-[11px] font-sans my-auto flex flex-col items-center gap-1">
                              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-stone-500" />
                              </div>
                              No image selected
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Direct URL Input Textbox if they still want custom URL fallbacks */}
                      <div className="mt-3">
                        <span className="text-[10px] text-stone-500 font-mono block mb-1 font-bold">OR ENTER MANUAL IMAGE ASSET URL:</span>
                        <input
                          type="text"
                          placeholder="https://images.unsplash.com/photo-..."
                          value={editingItem.data.imageUrl || ""}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, imageUrl: e.target.value } })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none placeholder-stone-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-stone-400 font-bold block mb-1">Upload Gallery Video File</label>
                      <div className="flex flex-col sm:flex-row items-stretch gap-4">
                        {/* Interactive File Input Area */}
                        <div className="flex-1 relative border border-dashed border-white/10 hover:border-gold-400/40 rounded-xl p-4 bg-black/30 transition-all flex flex-col items-center justify-center text-center min-h-[120px]">
                          <input
                            type="file"
                            accept="video/*"
                            id="admin-gallery-video-uploader"
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            disabled={isUploading}
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setIsUploading(true);
                                try {
                                  const signRes = await fetch('/api/upload/sign', {
                                    method: 'POST',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      'x-admin-pin': adminPin
                                    },
                                    body: JSON.stringify({
                                      fileName: file.name,
                                      contentType: file.type,
                                      bucket: 'gallery'
                                    })
                                  });
                                  if (!signRes.ok) throw new Error("Failed to generate upload signature");
                                  const signData = await signRes.json();

                                  const uploadRes = await fetch(signData.signedUrl, {
                                    method: 'PUT',
                                    headers: {
                                      'Content-Type': file.type
                                    },
                                    body: file
                                  });
                                  if (!uploadRes.ok) throw new Error("Failed to upload file to storage");

                                  setEditingItem({
                                    ...editingItem,
                                    data: { ...editingItem.data, videoUrl: signData.publicUrl }
                                  });
                                } catch (error: any) {
                                  console.error("Video upload error:", error);
                                  alert("Error uploading video: " + error.message);
                                } finally {
                                  setIsUploading(false);
                                }
                              }
                            }}
                          />
                          <UploadCloud className="w-8 h-8 text-gold-400/80 mb-2" />
                          <span className="text-xs font-semibold text-stone-200">
                            {isUploading ? "Uploading video..." : "Click or drag video file here"}
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono mt-1">
                            Supports MP4, WEBM, OGG formats
                          </span>
                        </div>

                        {/* Preview / Video status Box */}
                        <div className="w-full sm:w-48 bg-black/40 border border-white/10 rounded-xl p-3 flex flex-col justify-between items-center text-center min-h-[120px]">
                          {editingItem.data.videoUrl ? (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                              <video
                                src={editingItem.data.videoUrl}
                                className="max-h-20 w-full object-cover rounded-lg border border-white/10"
                                controls
                              />
                              <span className="text-[9px] font-mono text-emerald-400 flex items-center justify-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Video Loaded
                              </span>
                            </div>
                          ) : (
                            <div className="text-stone-500 text-[11px] font-sans my-auto flex flex-col items-center gap-1">
                              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-stone-500" />
                              </div>
                              No video selected
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Direct URL Input Textbox if they still want custom URL fallbacks */}
                      <div className="mt-3">
                        <span className="text-[10px] text-stone-500 font-mono block mb-1 font-bold">OR ENTER MANUAL VIDEO ASSET URL:</span>
                        <input
                          type="text"
                          placeholder="https://www.w3schools.com/html/mov_bbb.mp4"
                          value={editingItem.data.videoUrl || ""}
                          onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, videoUrl: e.target.value } })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none placeholder-stone-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Bento grid layout span size</label>
                      <select
                        value={editingItem.data.sizeClass || "md:col-span-1 md:row-span-1"}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, sizeClass: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      >
                        <option value="md:col-span-1 md:row-span-1">Standard Card (1x1)</option>
                        <option value="md:col-span-2 md:row-span-1">Wide Card (2x1)</option>
                        <option value="md:col-span-1 md:row-span-2">Deep Card (1x2)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-stone-400 font-bold">Detailed Surgical Narrative summary *</label>
                      <textarea
                        rows={3}
                        required
                        value={editingItem.data.description || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, description: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* 3. Condition/Treatment editing fields */}
                {formType === "condition" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-stone-400 font-bold">Treatment Name *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.name || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, name: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Diagnostic Success Metric *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.treatmentMetric || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, treatmentMetric: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Standard Recovery speed *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.recoveryTime || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, recoveryTime: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Icon graphics configuration</label>
                      <select
                        value={editingItem.data.iconName || "Zap"}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, iconName: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      >
                        <option value="Eye">Eye (hd visual clarity)</option>
                        <option value="Zap">Zap (electric/monoportal precision)</option>
                        <option value="Shield">Shield (safe keyhole protection)</option>
                        <option value="Activity">Activity (sciatic nerve track)</option>
                        <option value="Layers">Layers (spinal disk disc cushioning)</option>
                        <option value="Compass">Compass (cervical range guide)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Common Indications (Separated by commas) *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.symptoms ? editingItem.data.symptoms.join(", ") : ""}
                        onChange={(e) => {
                          const list = e.target.value.split(",").map(val => val.trim()).filter(val => val.length > 0);
                          setEditingItem({ ...editingItem, data: { ...editingItem.data, symptoms: list } });
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-stone-400 font-bold">Brief Description *</label>
                      <textarea
                        rows={2}
                        required
                        value={editingItem.data.shortDescription || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, shortDescription: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-stone-400 font-bold">Complete Surgical Narrative & Biomechanical path *</label>
                      <textarea
                        rows={3}
                        required
                        value={editingItem.data.fullDescription || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, fullDescription: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* 4. Testimonial editing fields */}
                {formType === "testimonial" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-stone-400 font-bold">Patient Name *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.name || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, name: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-stone-400 font-bold">Patient Location *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.location || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, location: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Target Diagnosis *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.condition || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, condition: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Recovery Milestone statement *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.recoverySummary || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, recoverySummary: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Clinical Rating stars (1 to 5)</label>
                      <select
                        value={editingItem.data.rating || 5}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, rating: Number(e.target.value) } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      >
                        <option value="5">5 stars (Verified Outstanding)</option>
                        <option value="4">4 stars (Highly Satisfied)</option>
                        <option value="3">3 stars (Satisfied)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-stone-400 font-bold">Quote Statement Text *</label>
                      <textarea
                        rows={3}
                        required
                        value={editingItem.data.quote || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, quote: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* 5. FAQ editing fields */}
                {formType === "faq" && (
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Question *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.question || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, question: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Category Class</label>
                      <select
                        value={editingItem.data.category || "technology"}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, category: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      >
                        <option value="technology">Endoscopic technology benefits</option>
                        <option value="safety">Safety anesthetic benchmarks</option>
                        <option value="international">Medical travel services</option>
                        <option value="booking">Teleconsultation schedulers</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Detailed Answer text *</label>
                      <textarea
                        rows={3}
                        required
                        value={editingItem.data.answer || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, answer: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* 6. Blogs/Publications editing fields */}
                {formType === "blogs" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-stone-400 font-bold">Article Title *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.title || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Category Class *</label>
                      <select
                        value={editingItem.data.category || "Clinical Guide"}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, category: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      >
                        <option value="Clinical Guide">Clinical Guide</option>
                        <option value="Research">Research</option>
                        <option value="Case Study">Case Study</option>
                        <option value="Book Chapter">Book Chapter</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Read Time *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.readTime || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, readTime: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                        placeholder="e.g. 6 min read"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Publish Date *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.date || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, date: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                        placeholder="e.g. May 2026"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-stone-400 font-bold">Author *</label>
                      <input
                        type="text"
                        required
                        value={editingItem.data.author || "Dr. Dheeraj Vishwakarma"}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, author: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-stone-400 font-bold">Summary *</label>
                      <textarea
                        rows={2}
                        required
                        value={editingItem.data.summary || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, summary: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-stone-400 font-bold">Rich Publication Content *</label>
                      <textarea
                        rows={6}
                        required
                        value={editingItem.data.content || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, content: e.target.value } })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex justify-end gap-3 pt-6 border-t border-white/5 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpenForm(false);
                      setEditingItem(null);
                    }}
                    className="p-3 bg-transparent hover:bg-white/5 border border-white/10 px-6 py-2.5 rounded-full text-stone-300 font-bold transition-all cursor-pointer"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-350 hover:to-gold-450 text-black px-7 py-2.5 rounded-full font-bold transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> Save Data Entry
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
        {/* CALENDAR APPOINTMENT DETAILS PANEL/OVERLAY */}
        {activeAptDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-cosmic-card border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-6 sm:p-8 text-left overflow-y-auto max-h-[92vh]"
            >
              <button
                type="button"
                onClick={() => setActiveAptDetails(null)}
                className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 hover:bg-white/5 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase font-semibold ${getStatusBadgeClass(activeAptDetails.status)}`}>
                      {activeAptDetails.status}
                    </span>
                    <span className="text-[10px] font-mono text-stone-450 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sky-400" /> Planned: {activeAptDetails.bookingDate} @ {activeAptDetails.bookingTime}
                    </span>
                    {activeAptDetails.isInternational && (
                      <span className="bg-sky-400/10 border border-sky-450/20 text-sky-305 px-2 py-0.5 rounded text-[9px] font-mono font-extrabold uppercase">
                        Global Care
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight leading-tight">
                    {activeAptDetails.fullName}
                  </h3>
                  <p className="text-stone-500 font-mono text-[9px] mt-0.5">Appointment ID: {activeAptDetails.id}</p>
                </div>

                {/* Key Information Fields */}
                <div className="grid grid-cols-2 gap-4 text-xs bg-black/25 p-4 rounded-xl border border-white/5">
                  <div className="space-y-1">
                    <span className="text-stone-500 block uppercase font-mono text-[9px] tracking-wider">Contact Phone</span>
                    <span className="text-stone-200 font-medium select-all flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gold-400" /> {activeAptDetails.phone}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-stone-500 block uppercase font-mono text-[9px] tracking-wider">Email Address</span>
                    <span className="text-stone-200 font-medium select-all flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-sky-450" /> {activeAptDetails.email}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-stone-500 block uppercase font-mono text-[9px] tracking-wider">Triage Specialty</span>
                    <span className="text-gold-300 font-semibold uppercase font-mono text-[10px] flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-stone-500" /> {activeAptDetails.selectedTreatment}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-stone-500 block uppercase font-mono text-[9px] tracking-wider">Consultation Mode</span>
                    <span className="text-stone-200 font-medium capitalize flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-sky-400" /> {activeAptDetails.sessionType} consult
                    </span>
                  </div>
                </div>

                {/* Symptoms notes */}
                <div className="space-y-2">
                  <h4 className="text-stone-400 font-bold font-mono text-[10px] uppercase tracking-widest">Symptoms & Clinical Notes</h4>
                  <p className="text-xs text-stone-300 bg-black/15 p-3.5 rounded-xl border border-white/2 leading-relaxed">
                    {activeAptDetails.symptoms || "No secondary detailed clinical notes filed."}
                  </p>
                  {/* Attachment file */}
                  {activeAptDetails.fileName && (
                    <div className="flex flex-wrap items-center gap-2 bg-emerald-500/5 px-3 py-2 rounded-xl border border-emerald-500/15 w-fit text-emerald-450 text-[10.5px] font-mono select-none">
                      <Paperclip className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="max-w-[220px] truncate text-stone-300">MRI: {activeAptDetails.fileName}</span>
                      <div className="flex items-center gap-1.5 border-l border-emerald-500/20 pl-2.5 ml-1">
                        <a
                          href={activeAptDetails.fileName.startsWith('http') ? activeAptDetails.fileName : `/uploads/${activeAptDetails.fileName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors cursor-pointer px-1 py-0.5"
                          title="Preview file in a new tab"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </a>
                        <span className="text-emerald-500/30">|</span>
                        <a
                          href={activeAptDetails.fileName.startsWith('http') ? activeAptDetails.fileName : `/uploads/${activeAptDetails.fileName}`}
                          download
                          className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer px-1 py-0.5"
                          title="Download file directly"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions Grid */}
                <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        handleConfirmAppointment(activeAptDetails.id);
                        setActiveAptDetails({ ...activeAptDetails, status: "confirmed" });
                      }}
                      disabled={activeAptDetails.status === "confirmed"}
                      className="flex-1 py-2.5 rounded-xl text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-emerald-500 text-black uppercase cursor-pointer transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleRescheduleAppointment(activeAptDetails.id);
                        setActiveAptDetails(null);
                      }}
                      className="flex-1 py-2.5 rounded-xl text-xs font-mono font-bold bg-blue-500 hover:bg-blue-600 text-black uppercase cursor-pointer transition-colors"
                    >
                      Reschedule
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleCancelAppointment(activeAptDetails.id);
                        setActiveAptDetails({ ...activeAptDetails, status: "cancelled" });
                      }}
                      disabled={activeAptDetails.status === "cancelled"}
                      className="flex-1 py-2.5 rounded-xl text-xs font-mono font-bold bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:hover:bg-amber-500 text-black uppercase cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const id = activeAptDetails.id;
                        const data = activeAptDetails;
                        setActiveAptDetails(null);
                        openEditModal("appointment", id, data);
                      }}
                      className="flex-1 py-2.5 rounded-xl text-xs font-mono font-bold bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const id = activeAptDetails.id;
                        setActiveAptDetails(null);
                        deleteItem("appointment", id);
                      }}
                      className="flex-1 py-2.5 rounded-xl text-xs font-mono font-bold bg-rose-500/10 hover:bg-rose-500 text-rose-450 hover:text-white border border-rose-500/20 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Record
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
