"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const showToast = (type: "success" | "error", message: string) => {
    toast.custom(
      () => (
        <div
          className={`flex w-[min(280px,calc(100vw-2rem))] items-center gap-3 rounded-full border px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl ${
            type === "success"
              ? "border-[#52c95c] bg-[#8df58c] text-black"
              : "border-[#ff8b8b] bg-[#ff9c9c] text-black"
          }`}
        >
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
              type === "success" ? "bg-black/10" : "bg-black/10"
            }`}
          >
            {type === "success" ? (
              <Check className="h-4 w-4 stroke-[2.5]" />
            ) : (
              <X className="h-4 w-4 stroke-[2.5]" />
            )}
          </div>
          <p className="text-sm font-semibold tracking-[0.01em]">{message}</p>
        </div>
      ),
      {
        duration: 2800,
        position: "top-center",
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMessage("");
    try {
      const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => null);

      if (res.ok) {
        setStatus("success");
        const successMessage = data?.message || "Message sent successfully!";
        setFeedbackMessage(successMessage);
        showToast("success", "Message sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setStatus("idle");
          setFeedbackMessage("");
        }, 3000);
      } else {
        setStatus("error");
        const errorMessage = data?.error || "Failed to send message. Please try again.";
        setFeedbackMessage(errorMessage);
        showToast("error", "Message failed");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      const errorMessage = "Failed to send message. Please try again.";
      setFeedbackMessage(errorMessage);
      showToast("error", "Message failed");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-white/5 border-b border-white/5">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Get In Touch</h2>
          <p className="text-zinc-400">Ready to start your next project? Drop a message below.</p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <input type="text" required placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-500 focus:bg-zinc-800 transition-all text-sm" />
             <input type="email" required placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-500 focus:bg-zinc-800 transition-all text-sm" />
          </div>
          <textarea required rows={5} placeholder="Message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-500 focus:bg-zinc-800 transition-all resize-none text-sm" />
          <button type="submit" disabled={status === "loading" || status === "success"} className="w-full mt-2 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 text-sm">
            {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
          </button>
          {feedbackMessage ? (
            <p
              aria-live="polite"
              className={`text-sm ${status === "error" ? "text-red-400" : "text-emerald-400"}`}
            >
              {feedbackMessage}
            </p>
          ) : null}
        </motion.form>
      </div>
    </section>
  );
}
