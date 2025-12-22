"use client";

import { useState, useEffect, FormEvent, Fragment } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Dialog from "@radix-ui/react-dialog";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { FiArrowUpRight, FiX, FiSend, FiCheck, FiAlertCircle, FiChevronDown, FiUsers, FiBriefcase, FiCode, FiHelpCircle, FiMessageSquare, FiTrash2 } from "react-icons/fi";
import { useSectionPadding, useBreakpoints } from "@/hooks/useBreakpoints";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import clsx from "clsx";

const EMAIL_ADDRESS = process.env.NEXT_PUBLIC_EMAIL || "mikhailjpn@gmail.com";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  projectType: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  projectType?: string;
  message?: string;
}

const INQUIRY_TYPES = [
  { value: "collaboration", label: "Collaboration / Project", icon: FiUsers },
  { value: "opportunity", label: "Job Opportunity", icon: FiBriefcase },
  { value: "freelance", label: "Freelance / Commission", icon: FiCode },
  { value: "question", label: "Question", icon: FiHelpCircle },
  { value: "other", label: "Other", icon: FiMessageSquare },
];

const DRAFT_STORAGE_KEY = "contact-form-draft";

export default function ContactSection() {
  const { padding, minHeight } = useSectionPadding();
  const { isShort } = useBreakpoints();

  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    projectType: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        setFormData(JSON.parse(savedDraft));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Initialize EmailJS
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
    }
  }, []);

  // Save draft to localStorage whenever form data changes (and not empty)
  useEffect(() => {
    const hasContent = Object.values(formData).some((val) => val.trim() !== "");
    if (hasContent) {
      try {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [formData]);

  const clearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // Ignore localStorage errors
    }
  };

  const handleClearAll = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      projectType: "",
      message: "",
    });
    setErrors({});
    clearDraft();
  };

  // Lock body scroll and fullpage.js when modal is open
  useEffect(() => {
    const fullpageApi = (window as unknown as { fullpage_api?: { setAllowScrolling: (allow: boolean) => void } }).fullpage_api;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      // Disable fullpage.js scrolling
      fullpageApi?.setAllowScrolling(false);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      // Re-enable fullpage.js scrolling
      fullpageApi?.setAllowScrolling(true);
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      fullpageApi?.setAllowScrolling(true);
    };
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name is required";
    }

    if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dummyDomains = ["test.com", "example.com", "sample.com", "demo.com", "email.com"];

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else {
      const domain = formData.email.split("@")[1]?.toLowerCase();
      if (domain && dummyDomains.some(d => domain === d || domain.endsWith("." + d))) {
        newErrors.email = "Please use a real email address";
      }
    }

    if (formData.subject.trim().length === 0) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.projectType) {
      newErrors.projectType = "Please select an inquiry type";
    }

    if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormState("submitting");

    try {
      // Check if EmailJS is configured
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

      if (!serviceId || !templateId) {
        // Fallback to simulation if EmailJS is not configured
        console.warn("EmailJS not configured. Simulating submission.");
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        // Send via EmailJS
        await emailjs.send(serviceId, templateId, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          senderEmail: formData.email,
          subject: formData.subject,
          inquiryType: formData.projectType,
          message: formData.message,
        });
      }

      setFormState("success");
      clearDraft();

      // Give time to see the thank you animation, then close modal
      setTimeout(() => {
        setIsOpen(false);
        // Show Sonner toast after modal closes
        setTimeout(() => {
          toast.success("Message Sent Successfully!", {
            description: "Thank you for reaching out. I'll get back to you soon!",
            duration: 5000,
          });
        }, 200);
        // Reset form after modal is closed
        setTimeout(() => {
          setFormState("idle");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            subject: "",
            projectType: "",
            message: "",
          });
        }, 300);
      }, 2500);

    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormState("error");
      toast.error("Failed to send message", {
        description: "Please try again or email me directly.",
      });
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClasses = (hasError: boolean) =>
    clsx(
      "w-full rounded-lg border bg-mica-dark/30 px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 transition-all focus:outline-none focus:ring-2",
      hasError
        ? "border-red-400/50 focus:ring-red-400/50"
        : "border-text-secondary/30 focus:border-victus-blue/50 focus:ring-victus-blue/50",
      formState === "submitting" && "opacity-60 cursor-not-allowed"
    );

  return (
    <>
      <section
        className={`flex w-full items-center justify-center overflow-hidden ${padding}`}
        style={{ minHeight }}
      >
        <div
          className={clsx(
            "flex w-full max-w-6xl flex-col items-center justify-center gap-12 px-4 sm:gap-16 sm:px-10 transition-transform duration-300 ease-out",
            isShort && "scale-90 origin-center"
          )}
        >
          <div className="relative max-w-3xl space-y-4 text-center sm:space-y-6">
            {/* Subtle glow behind header */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-72 rounded-full bg-victus-blue/10 blur-3xl" />
            <p className="relative text-xs font-semibold uppercase tracking-[0.3em] text-victus-blue/80 sm:text-sm">
              Get In Touch
            </p>
            <h2 className="relative text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              Let&apos;s Work Together
            </h2>
            <p className="relative text-sm leading-relaxed text-text-secondary/80 sm:text-base md:text-lg">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>

          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Tooltip.Provider delayDuration={150} skipDelayDuration={400}>
              <div className="flex w-full justify-center">
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Dialog.Trigger asChild>
                      <button className="btn-shine inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-victus-blue to-cyan-400 px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-victus-blue/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:text-base">
                        Send Me An Email
                        <FiArrowUpRight className="h-4 w-4" />
                      </button>
                    </Dialog.Trigger>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      sideOffset={8}
                      className="rounded-lg border border-victus-blue/30 bg-mica-dark/95 px-3 py-1.5 text-xs font-medium text-text-secondary shadow-xl backdrop-blur-lg"
                    >
                      Opens contact form
                      <Tooltip.Arrow className="fill-mica-dark/95" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </div>
            </Tooltip.Provider>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-[95vw] sm:max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-text-secondary/20 bg-mica-light/80 p-6 shadow-2xl backdrop-blur-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Dialog.Title className="text-xl font-bold text-text-primary">Send a Message</Dialog.Title>
                    <Dialog.Description className="text-sm text-text-secondary/80 mt-1">
                      I&apos;ll get back to you as soon as possible.
                    </Dialog.Description>
                  </div>
                  <Dialog.Close asChild>
                    <button className="rounded-full p-2 text-text-secondary/60 hover:bg-mica-dark/10 hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-victus-blue/50">
                      <FiX className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </button>
                  </Dialog.Close>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="firstName" className="text-xs font-semibold text-victus-blue ml-1 flex items-center gap-1">
                        First Name
                        <span className={clsx("text-red-400 transition-all duration-300 transform origin-left", formData.firstName ? "opacity-0 scale-0 w-0" : "opacity-100 scale-100 w-auto")}>*</span>
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="First Name"
                        disabled={formState === "submitting"}
                        className={inputClasses(!!errors.firstName)}
                      />
                      {errors.firstName && (
                        <p className="ml-1 flex items-center gap-1 text-xs text-red-400">
                          <FiAlertCircle className="h-3 w-3" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="lastName" className="text-xs font-semibold text-victus-blue ml-1 flex items-center gap-1">
                        Last Name
                        <span className={clsx("text-red-400 transition-all duration-300 transform origin-left", formData.lastName ? "opacity-0 scale-0 w-0" : "opacity-100 scale-100 w-auto")}>*</span>
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Last Name"
                        disabled={formState === "submitting"}
                        className={inputClasses(!!errors.lastName)}
                      />
                      {errors.lastName && (
                        <p className="ml-1 flex items-center gap-1 text-xs text-red-400">
                          <FiAlertCircle className="h-3 w-3" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-victus-blue ml-1 flex items-center gap-1">
                      Email Address
                      <span className={clsx("text-red-400 transition-all duration-300 transform origin-left", formData.email ? "opacity-0 scale-0 w-0" : "opacity-100 scale-100 w-auto")}>*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      disabled={formState === "submitting"}
                      className={inputClasses(!!errors.email)}
                    />
                    {errors.email && (
                      <p className="ml-1 flex items-center gap-1 text-xs text-red-400">
                        <FiAlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject & Inquiry Type Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="text-xs font-semibold text-victus-blue ml-1 flex items-center gap-1">
                        Subject
                        <span className={clsx("text-red-400 transition-all duration-300 transform origin-left", formData.subject ? "opacity-0 scale-0 w-0" : "opacity-100 scale-100 w-auto")}>*</span>
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="What's this about?"
                        maxLength={100}
                        disabled={formState === "submitting"}
                        className={inputClasses(!!errors.subject)}
                      />
                      {errors.subject && (
                        <p className="ml-1 flex items-center gap-1 text-xs text-red-400">
                          <FiAlertCircle className="h-3 w-3" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="projectType" className="text-xs font-semibold text-victus-blue ml-1 flex items-center gap-1">
                        Inquiry Type
                        <span className={clsx("text-red-400 transition-all duration-300 transform origin-left", formData.projectType ? "opacity-0 scale-0 w-0" : "opacity-100 scale-100 w-auto")}>*</span>
                      </label>
                      <div className="relative">
                        <Listbox value={formData.projectType || ""} onChange={(value) => handleInputChange("projectType", value)}>
                          <ListboxButton
                            className={clsx(
                              inputClasses(!!errors.projectType),
                              "flex items-center justify-between text-left",
                              !formData.projectType && "text-text-secondary/50"
                            )}
                          >
                            <span className="flex items-center gap-2 truncate">
                              {formData.projectType ? (
                                <>
                                  {(() => {
                                    const selectedOption = INQUIRY_TYPES.find((t) => t.value === formData.projectType);
                                    const Icon = selectedOption?.icon;
                                    return (
                                      <>
                                        {Icon && <Icon className="h-4 w-4 text-victus-blue" />}
                                        <span className="block truncate">{selectedOption?.label}</span>
                                      </>
                                    );
                                  })()}
                                </>
                              ) : (
                                "Select a type..."
                              )}
                            </span>
                            <FiChevronDown className="h-4 w-4 text-text-secondary/50" aria-hidden="true" />
                          </ListboxButton>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-victus-blue/30 bg-mica-dark/95 py-1 text-sm shadow-xl backdrop-blur-xl ring-1 ring-black/5 focus:outline-none">
                              {INQUIRY_TYPES.map((type) => (
                                <ListboxOption
                                  key={type.value}
                                  value={type.value}
                                  className={({ active, selected }) =>
                                    clsx(
                                      "relative cursor-pointer select-none py-2.5 pl-3 pr-4 transition-colors",
                                      active ? "bg-victus-blue/20 text-cyan-400" : "text-text-primary",
                                      selected && "font-medium text-cyan-400"
                                    )
                                  }
                                >
                                  {({ selected, active }) => (
                                    <div className="flex items-center gap-2.5">
                                      <span className={clsx("flex items-center justify-center rounded-md p-1 transition-colors", active ? "bg-victus-blue/20" : "bg-mica-light/10 text-text-secondary")}>
                                        <type.icon className="h-4 w-4" aria-hidden="true" />
                                      </span>
                                      <span className={clsx("block truncate", selected ? "font-medium" : "font-normal")}>
                                        {type.label}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-cyan-400">
                                          <FiCheck className="h-4 w-4" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </div>
                                  )}
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </Transition>
                        </Listbox>
                      </div>
                      {errors.projectType && (
                        <p className="ml-1 flex items-center gap-1 text-xs text-red-400">
                          <FiAlertCircle className="h-3 w-3" />
                          {errors.projectType}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-semibold text-victus-blue ml-1 flex items-center gap-1">
                      Message
                      <span className={clsx("text-red-400 transition-all duration-300 transform origin-left", formData.message ? "opacity-0 scale-0 w-0" : "opacity-100 scale-100 w-auto")}>*</span>
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell me about your project..."
                      rows={4}
                      disabled={formState === "submitting"}
                      className={clsx(inputClasses(!!errors.message), "resize-none")}
                    />
                    {errors.message && (
                      <p className="ml-1 flex items-center gap-1 text-xs text-red-400">
                        <FiAlertCircle className="h-3 w-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formState === "submitting" || formState === "success"}
                      className={clsx(
                        "btn-shine inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                        formState === "success"
                          ? "bg-green-500 hover:bg-green-600"
                          : formState === "error"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-gradient-to-r from-victus-blue to-cyan-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-victus-blue/40",
                        (formState === "submitting" || formState === "success") && "cursor-not-allowed opacity-80"
                      )}
                    >
                      {formState === "submitting" && (
                        <>
                          <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      )}
                      {formState === "success" && (
                        <div className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-300">
                          <FiCheck className="h-5 w-5 animate-bounce" />
                          <span className="text-base animate-pulse">Thank You!</span>
                        </div>
                      )}
                      {formState === "error" && (
                        <>
                          <FiAlertCircle className="h-5 w-5" />
                          Try Again
                        </>
                      )}
                      {formState === "idle" && (
                        <>
                          Send Message
                          <FiSend className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Clear All Button */}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={handleClearAll}
                      disabled={formState === "submitting"}
                      className="inline-flex items-center gap-1.5 text-xs text-text-secondary/60 hover:text-red-400 transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiTrash2 className="h-3.5 w-3.5" />
                      Clear All
                    </button>
                  </div>
                </form>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <div className="w-full max-w-4xl rounded-2xl border border-text-secondary/20 bg-mica-light/40 p-8 backdrop-blur-xl">
            <Tooltip.Provider delayDuration={0} skipDelayDuration={400}>
              <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3 sm:gap-4">
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div className="glass-card-hover group flex flex-col items-center justify-center rounded-xl p-4 transition-all hover:-translate-y-1">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-victus-blue transition-colors group-hover:text-cyan-400">Email</p>
                      <p className="break-all text-sm font-medium text-text-secondary group-hover:text-text-primary sm:text-base">{EMAIL_ADDRESS}</p>
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      sideOffset={6}
                      className="rounded-lg border border-victus-blue/30 bg-mica-dark/95 px-3 py-1 text-[11px] font-medium text-text-secondary shadow-lg backdrop-blur-md"
                    >
                      Tap to copy or email directly
                      <Tooltip.Arrow className="fill-mica-dark/95" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>

                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div className="glass-card-hover group flex flex-col items-center justify-center rounded-xl p-4 transition-all hover:-translate-y-1">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-victus-blue transition-colors group-hover:text-cyan-400">Phone</p>
                      <p className="text-sm font-medium text-text-secondary group-hover:text-text-primary sm:text-base">0927 720 4496</p>
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      sideOffset={6}
                      className="rounded-lg border border-victus-blue/30 bg-mica-dark/95 px-3 py-1 text-[11px] font-medium text-text-secondary shadow-lg backdrop-blur-md"
                    >
                      Available for quick calls or SMS
                      <Tooltip.Arrow className="fill-mica-dark/95" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>

                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div className="glass-card-hover group flex flex-col items-center justify-center rounded-xl p-4 transition-all hover:-translate-y-1">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-victus-blue transition-colors group-hover:text-cyan-400">Location</p>
                      <p className="text-sm font-medium text-text-secondary group-hover:text-text-primary sm:text-base">Philippines</p>
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      sideOffset={6}
                      className="rounded-lg border border-victus-blue/30 bg-mica-dark/95 px-3 py-1 text-[11px] font-medium text-text-secondary shadow-lg backdrop-blur-md"
                    >
                      GMT+8 — happy to sync across time zones
                      <Tooltip.Arrow className="fill-mica-dark/95" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </div>
            </Tooltip.Provider>
          </div>
        </div>
      </section>
    </>
  );
}
