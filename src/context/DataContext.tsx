import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  SpineCondition, 
  Testimonial, 
  FAQItem,
  BlogArticle,
  VideoItem
} from "../types";
import { 
  conditionsData, 
  testimonialsData, 
  faqData,
  blogsData,
  videoData
} from "../data";
import { ShowcaseItem, INITIAL_SHOWCASES } from "../components/Gallery";

export interface Appointment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  selectedTreatment: string;
  symptoms: string;
  sessionType: "video" | "clinic";
  status: "pending" | "confirmed" | "rescheduled" | "cancelled";
  bookingDate: string; // e.g. "2026-05-30"
  bookingTime: string; // e.g. "11:30 AM"
  isInternational: boolean;
  fileName?: string;
}

interface DataContextType {
  // Appointments
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, "id" | "bookingDate" | "bookingTime" | "status">) => Appointment;
  updateAppointment: (id: string, updated: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;

  // Showcase Items (Gallery)
  showcases: ShowcaseItem[];
  addShowcase: (showcase: ShowcaseItem) => void;
  updateShowcase: (id: string, updated: Partial<ShowcaseItem>) => void;
  deleteShowcase: (id: string) => void;
  resetShowcases: () => void;

  // FAQs
  faqs: FAQItem[];
  addFAQ: (faq: FAQItem) => void;
  updateFAQ: (id: string, updated: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;
  resetFAQs: () => void;

  // Testimonials
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (id: string, updated: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  resetTestimonials: () => void;

  // Spine Conditions
  conditions: SpineCondition[];
  addCondition: (condition: SpineCondition) => void;
  updateCondition: (id: string, updated: Partial<SpineCondition>) => void;
  deleteCondition: (id: string) => void;
  resetConditions: () => void;

  // Blogs (Publications)
  blogs: BlogArticle[];
  addBlog: (blog: BlogArticle) => void;
  updateBlog: (id: string, updated: Partial<BlogArticle>) => void;
  deleteBlog: (id: string) => void;
  resetBlogs: () => void;

  // Video Showcases
  videos: VideoItem[];

  // Administrative Auth
  adminPin: string;
  setAdminPin: (pin: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const PRELOADED_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-101",
    fullName: "Richard Harris",
    email: "richard.harris@gmail.com",
    phone: "+44 7911 123456",
    selectedTreatment: "fess",
    symptoms: "Extreme shooting sciatica down my right calf. MRI reports uploaded. Ready for a video consult.",
    sessionType: "video",
    status: "confirmed",
    bookingDate: "2026-06-02",
    bookingTime: "10:30 AM",
    isInternational: true,
    fileName: "mri-lumbar-richard-harris.pdf"
  },
  {
    id: "apt-102",
    fullName: "Manoj Kumar Sharma",
    email: "manoj.sharma@yahoo.co.in",
    phone: "+91 98450 12345",
    selectedTreatment: "slipdisc",
    symptoms: "L4-L5 localized slip disc. Looking to do a physical outpatient evaluation at the clinic in India.",
    sessionType: "clinic",
    status: "pending",
    bookingDate: "2026-05-31",
    bookingTime: "04:15 PM",
    isInternational: false
  },
  {
    id: "apt-103",
    fullName: "Fatima Al-Sudais",
    email: "fatima.alsudais@outlook.com",
    phone: "+971 50 123 4567",
    selectedTreatment: "monoportal",
    symptoms: "Severe lumbar canal stenosis causing claudication. Can walk barely 50 meters safely.",
    sessionType: "video",
    status: "rescheduled",
    bookingDate: "2026-06-05",
    bookingTime: "02:00 PM",
    isInternational: true,
    fileName: "mri-scan-fatima.jpg"
  },
  {
    id: "apt-104",
    fullName: "Col. Vikram Singh Chauhan (Retd.)",
    email: "vikram.chauhan@gmail.com",
    phone: "+91 99220 88771",
    selectedTreatment: "cervical-lumbar",
    symptoms: "Dynamic neck stiffness and numbness in both hands. Discomfort when using fine motor skills.",
    sessionType: "clinic",
    status: "confirmed",
    bookingDate: "2026-06-01",
    bookingTime: "05:30 PM",
    isInternational: false
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Administrative Auth State
  const [adminPin, setAdminPin] = useState<string>(() => {
    const sessionToken = localStorage.getItem("dr_dheeraj_admin_session");
    if (sessionToken) {
      try {
        const parsed = JSON.parse(sessionToken);
        if (Date.now() - parsed.timestamp < 1000 * 60 * 60 * 4) { // 4 hour session
          return localStorage.getItem("dr_dheeraj_admin_pin") || "admin123";
        }
      } catch (e) {}
    }
    return "";
  });

  // Appointments state initialized with defaults
  const [appointments, setAppointments] = useState<Appointment[]>(PRELOADED_APPOINTMENTS);

  // Showcase state initialized with defaults
  const [showcases, setShowcases] = useState<ShowcaseItem[]>(INITIAL_SHOWCASES);
  const [dbShowcaseIds, setDbShowcaseIds] = useState<Set<string>>(new Set());

  // FAQs state initialized with defaults
  const [faqs, setFaqs] = useState<FAQItem[]>(faqData);

  // Testimonials state initialized with defaults
  const [testimonials, setTestimonials] = useState<Testimonial[]>(testimonialsData);

  // Conditions state initialized with defaults
  const [conditions, setConditions] = useState<SpineCondition[]>(conditionsData);

  // Video Showcases state initialized with defaults
  const [videos, setVideos] = useState<VideoItem[]>(videoData);

  // Blogs state initialized with defaults
  const [blogs, setBlogs] = useState<BlogArticle[]>(blogsData);

  // Fetch initial public data from backend API
  useEffect(() => {
    const loadPublicData = async () => {
      try {
        const [scsRes, faqsRes, testsRes, condsRes, blogsRes, galleryRes, vidsRes] = await Promise.all([
          fetch('/api/showcases'),
          fetch('/api/faqs'),
          fetch('/api/testimonials'),
          fetch('/api/conditions'),
          fetch('/api/blogs'),
          fetch('/api/gallery-images'),
          fetch('/api/videos')
        ]);

        let dbData: ShowcaseItem[] = [];
        if (scsRes.ok) {
          const resJson = await scsRes.json();
          if (Array.isArray(resJson)) {
            dbData = resJson;
            setDbShowcaseIds(new Set(dbData.map((s: any) => s.id)));
          }
        }

        let storageData: any[] = [];
        if (galleryRes.ok) {
          const resJson = await galleryRes.json();
          if (Array.isArray(resJson)) {
            storageData = resJson;
          }
        }

        // Map storage images to ShowcaseItem objects
        const mappedStorageItems: ShowcaseItem[] = storageData.map((img: any) => {
          const nameLower = img.id.toLowerCase();
          let category: "surgical" | "news" | "workshop" = "surgical";
          let badge = "Clinical Showcase";

          if (nameLower.includes("news") || nameLower.includes("press") || nameLower.includes("media")) {
            category = "news";
            badge = "Press Release";
          } else if (nameLower.includes("workshop") || nameLower.includes("lecture") || nameLower.includes("hands")) {
            category = "workshop";
            badge = "Event Workshop";
          }

          return {
            id: img.id,
            title: img.title || "Surgical Case Milestone",
            subtitle: img.subtitle || "Monoportal Endoscopic Spine Care Gallery",
            description: img.description || "Clinical highlight captured during monoportal FESS decompression, medical training workshop lectures, or book presentation milestones.",
            category,
            location: "Jaipur Clinic",
            date: "June 2026",
            imageUrl: img.imageUrl,
            sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
            badge,
            featuredInHero: false
          };
        });

        // Merge them
        const combined = [...dbData];
        mappedStorageItems.forEach(supItem => {
          if (!combined.some(c => c.imageUrl === supItem.imageUrl || c.id === supItem.id)) {
            combined.push(supItem);
          }
        });

        setShowcases(combined);

        if (faqsRes.ok) {
          const resJson = await faqsRes.json();
          if (Array.isArray(resJson)) setFaqs(resJson);
        }
        if (testsRes.ok) {
          const resJson = await testsRes.json();
          if (Array.isArray(resJson)) setTestimonials(resJson);
        }
        if (condsRes.ok) {
          const resJson = await condsRes.json();
          if (Array.isArray(resJson)) setConditions(resJson);
        }
        if (blogsRes.ok) {
          const resJson = await blogsRes.json();
          if (Array.isArray(resJson)) setBlogs(resJson);
        }
        if (vidsRes.ok) {
          const resJson = await vidsRes.json();
          if (Array.isArray(resJson) && resJson.length > 0) {
            const merged = [...resJson];
            videoData.forEach(v => {
              if (!merged.some(mv => mv.videoUrl === v.videoUrl || mv.id === v.id)) {
                merged.push(v);
              }
            });
            setVideos(merged);
          }
        }
      } catch (error) {
        console.warn("Failed to fetch initial public data from backend server. Using local presets.", error);
      }
    };
    loadPublicData();
  }, []);

  // Fetch appointments only when adminPin is set / verified
  useEffect(() => {
    if (!adminPin) return;

    const loadAppointments = async () => {
      try {
        const res = await fetch('/api/appointments', {
          headers: { 'x-admin-pin': adminPin }
        });
        if (res.ok) {
          setAppointments(await res.json());
        } else {
          console.warn("Failed to fetch appointments: Unauthorized (Invalid PIN)");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    loadAppointments();
  }, [adminPin]);

  // Appointment operations
  const addAppointment = (apptData: Omit<Appointment, "id" | "bookingDate" | "bookingTime" | "status">) => {
    const cleanDate = new Date();
    const dateStr = cleanDate.toISOString().split("T")[0]; // YYYY-MM-DD
    
    // Create random target hour between 10 AM and 5 PM
    const hours = Math.floor(Math.random() * 8) + 10;
    const minutes = Math.random() > 0.5 ? "00" : "30";
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHour = hours > 12 ? hours - 12 : hours;
    const timeStr = `${displayHour}:${minutes} ${ampm}`;

    const newAppointment: Appointment = {
      ...apptData,
      id: `apt-${Date.now()}`,
      bookingDate: dateStr,
      bookingTime: timeStr,
      status: "pending"
    };

    setAppointments(prev => [newAppointment, ...prev]);

    fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAppointment)
    }).catch(err => console.error("Error creating appointment on server:", err));

    return newAppointment;
  };

  const updateAppointment = (id: string, updated: Partial<Appointment>) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, ...updated } : apt)
    );

    fetch(`/api/appointments/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-pin': adminPin
      },
      body: JSON.stringify(updated)
    }).catch(err => console.error(`Error updating appointment ${id} on server:`, err));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));

    fetch(`/api/appointments/${id}`, {
      method: 'DELETE',
      headers: {
        'x-admin-pin': adminPin
      }
    }).catch(err => console.error(`Error deleting appointment ${id} on server:`, err));
  };

  // Showcase operations
  const addShowcase = (showcase: ShowcaseItem) => {
    setShowcases(prev => [showcase, ...prev]);
    setDbShowcaseIds(prev => {
      const next = new Set(prev);
      next.add(showcase.id);
      return next;
    });

    fetch('/api/showcases', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-pin': adminPin
      },
      body: JSON.stringify(showcase)
    }).catch(err => console.error("Error creating showcase on server:", err));
  };

  const updateShowcase = (id: string, updated: Partial<ShowcaseItem>) => {
    const currentItem = showcases.find(sc => sc.id === id);
    if (!currentItem) return;

    const fullUpdatedItem = { ...currentItem, ...updated };

    setShowcases(prev => 
      prev.map(sc => sc.id === id ? fullUpdatedItem : sc)
    );

    // If this item was loaded from storage bucket but not yet saved in the DB,
    // we must insert (POST) it so it becomes a DB-backed record with all fields.
    if (!dbShowcaseIds.has(id)) {
      fetch('/api/showcases', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-pin': adminPin
        },
        body: JSON.stringify(fullUpdatedItem)
      })
        .then(() => {
          setDbShowcaseIds(prev => {
            const next = new Set(prev);
            next.add(id);
            return next;
          });
        })
        .catch(err => console.error(`Error saving storage showcase ${id} to DB:`, err));
    } else {
      // Otherwise, update existing record with standard PUT
      fetch(`/api/showcases/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-pin': adminPin
        },
        body: JSON.stringify(updated)
      }).catch(err => console.error(`Error updating showcase ${id} on server:`, err));
    }
  };

  const deleteShowcase = (id: string) => {
    setShowcases(prev => prev.filter(sc => sc.id !== id));

    fetch(`/api/showcases/${id}`, {
      method: 'DELETE',
      headers: {
        'x-admin-pin': adminPin
      }
    }).catch(err => console.error(`Error deleting showcase ${id} on server:`, err));
  };

  const resetShowcases = () => {
    fetch('/api/showcases/reset', { 
      method: 'POST',
      headers: {
        'x-admin-pin': adminPin
      }
    })
      .then(res => res.json())
      .then(data => setShowcases(data))
      .catch(err => console.error("Error resetting showcases on server:", err));
  };

  // FAQ operations
  const addFAQ = (faq: FAQItem) => {
    setFaqs(prev => [...prev, faq]);

    fetch('/api/faqs', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-pin': adminPin
      },
      body: JSON.stringify(faq)
    }).catch(err => console.error("Error creating FAQ on server:", err));
  };

  const updateFAQ = (id: string, updated: Partial<FAQItem>) => {
    setFaqs(prev => 
      prev.map(f => f.id === id ? { ...f, ...updated } : f)
    );

    fetch(`/api/faqs/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-pin': adminPin
      },
      body: JSON.stringify(updated)
    }).catch(err => console.error(`Error updating FAQ ${id} on server:`, err));
  };

  const deleteFAQ = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));

    fetch(`/api/faqs/${id}`, {
      method: 'DELETE',
      headers: {
        'x-admin-pin': adminPin
      }
    }).catch(err => console.error(`Error deleting FAQ ${id} on server:`, err));
  };

  const resetFAQs = () => {
    fetch('/api/faqs/reset', { 
      method: 'POST',
      headers: {
        'x-admin-pin': adminPin
      }
    })
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(err => console.error("Error resetting FAQs on server:", err));
  };

  // Testimonial operations
  const addTestimonial = (testimonial: Testimonial) => {
    setTestimonials(prev => [testimonial, ...prev]);

    fetch('/api/testimonials', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-pin': adminPin
      },
      body: JSON.stringify(testimonial)
    }).catch(err => console.error("Error creating testimonial on server:", err));
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setTestimonials(prev => 
      prev.map(t => t.id === id ? { ...t, ...updated } : t)
    );

    fetch(`/api/testimonials/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-pin': adminPin
      },
      body: JSON.stringify(updated)
    }).catch(err => console.error(`Error updating testimonial ${id} on server:`, err));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));

    fetch(`/api/testimonials/${id}`, {
      method: 'DELETE',
      headers: {
        'x-admin-pin': adminPin
      }
    }).catch(err => console.error(`Error deleting testimonial ${id} on server:`, err));
  };

  const resetTestimonials = () => {
    fetch('/api/testimonials/reset', { 
      method: 'POST',
      headers: {
        'x-admin-pin': adminPin
      }
    })
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error("Error resetting testimonials on server:", err));
  };

  // Condition operations
  const addCondition = (condition: SpineCondition) => {
    setConditions(prev => [...prev, condition]);

    fetch('/api/conditions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-pin': adminPin
      },
      body: JSON.stringify(condition)
    }).catch(err => console.error("Error creating condition on server:", err));
  };

  const updateCondition = (id: string, updated: Partial<SpineCondition>) => {
    setConditions(prev => 
      prev.map(cond => cond.id === id ? { ...cond, ...updated } : cond)
    );

    fetch(`/api/conditions/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-pin': adminPin
      },
      body: JSON.stringify(updated)
    }).catch(err => console.error(`Error updating condition ${id} on server:`, err));
  };

  const deleteCondition = (id: string) => {
    setConditions(prev => prev.filter(cond => cond.id !== id));

    fetch(`/api/conditions/${id}`, {
      method: 'DELETE',
      headers: {
        'x-admin-pin': adminPin
      }
    }).catch(err => console.error(`Error deleting condition ${id} on server:`, err));
  };

  const resetConditions = () => {
    fetch('/api/conditions/reset', { 
      method: 'POST',
      headers: {
        'x-admin-pin': adminPin
      }
    })
      .then(res => res.json())
      .then(data => setConditions(data))
      .catch(err => console.error("Error resetting conditions on server:", err));
  };

  // Blog operations
  const addBlog = (blog: BlogArticle) => {
    setBlogs(prev => [blog, ...prev]);

    fetch('/api/blogs', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-pin': adminPin
      },
      body: JSON.stringify(blog)
    }).catch(err => console.error("Error creating blog on server:", err));
  };

  const updateBlog = (id: string, updated: Partial<BlogArticle>) => {
    setBlogs(prev => 
      prev.map(b => b.id === id ? { ...b, ...updated } : b)
    );

    fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-pin': adminPin
      },
      body: JSON.stringify(updated)
    }).catch(err => console.error(`Error updating blog ${id} on server:`, err));
  };

  const deleteBlog = (id: string) => {
    setBlogs(prev => prev.filter(b => b.id !== id));

    fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        'x-admin-pin': adminPin
      }
    }).catch(err => console.error(`Error deleting blog ${id} on server:`, err));
  };

  const resetBlogs = () => {
    fetch('/api/blogs/reset', { 
      method: 'POST',
      headers: {
        'x-admin-pin': adminPin
      }
    })
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error("Error resetting blogs on server:", err));
  };

  return (
    <DataContext.Provider value={{
      appointments,
      addAppointment,
      updateAppointment,
      deleteAppointment,

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
      videos,

      adminPin,
      setAdminPin
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
