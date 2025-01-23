"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarField from "@/components/star-field";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Send, Phone, Mail } from "lucide-react";
import { isValidEmail } from "@/lib/utils";

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const sendOtp = async () => {
    if (!isValidEmail(formData.email)) {
      setValidationErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage(""); // Clear any previous success message
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setShowOtpInput(true);
      } else {
        setValidationErrors((prev) => ({
          ...prev,
          email: "Failed to send OTP. Please try again.",
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      setValidationErrors((prev) => ({
        ...prev,
        email: "An error occurred. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtp = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      if (response.ok) {
        setIsEmailVerified(true);
        setShowOtpInput(false);
        setSuccessMessage("Email verified successfully!");
      } else {
        setValidationErrors((prev) => ({
          ...prev,
          otp: "Invalid OTP. Please try again.",
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      setValidationErrors((prev) => ({
        ...prev,
        otp: "An error occurred. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailVerified) {
      setValidationErrors((prev) => ({
        ...prev,
        email: "Please verify your email before submitting.",
      }));
      return;
    }

    setIsSubmitting(true);
    setValidationErrors({});

    // Validate phone number
    const phoneRegex = /^(010|011|012|015)\d{8}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      setValidationErrors((prev) => ({
        ...prev,
        phone:
          "Phone number must be 11 digits and start with 010, 011, 012, or 015",
      }));
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setShowSuccessMessage(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          phone: "",
        });
        setIsEmailVerified(false);
      } else {
        setValidationErrors((prev) => ({
          ...prev,
          submit: "Failed to send message. Please try again.",
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      setValidationErrors((prev) => ({
        ...prev,
        submit: "An error occurred. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      <StarField />
      <Navbar />

      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed top-0 left-0 right-0 bg-green-500 text-white p-4 text-center z-50"
          >
            <p className="font-orbitron">
              Thank you for your message! We will contact you shortly.
            </p>
            <Button
              onClick={() => setShowSuccessMessage(false)}
              className="mt-2 bg-white text-green-500 hover:bg-gray-100"
            >
              Close
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-10 w-full max-w-6xl px-4 py-8 mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-center text-[#17b6a7] mb-8 font-orbitron">
          Contact Us
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white/10 backdrop-blur-md p-6 rounded-lg"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  required
                  className="bg-white/20 text-white placeholder-gray-400"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    required
                    className="bg-white/20 text-white placeholder-gray-400 flex-grow"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isEmailVerified}
                  />
                  {!isEmailVerified && (
                    <Button
                      type="button"
                      onClick={sendOtp}
                      className="bg-[#17b6a7] hover:bg-[#14a090] text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Verify"
                      )}
                    </Button>
                  )}
                </div>
                {validationErrors.email && (
                  <p className="text-green-500 text-sm mt-1">
                    {validationErrors.email}
                  </p>
                )}
              </div>
              {showOtpInput && (
                <div>
                  <Label htmlFor="otp" className="text-white">
                    OTP
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      id="otp"
                      placeholder="Enter OTP"
                      required
                      className="bg-white/20 text-white placeholder-gray-400 flex-grow"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <Button
                      type="button"
                      onClick={verifyOtp}
                      className="bg-[#17b6a7] hover:bg-[#14a090] text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Submit OTP"
                      )}
                    </Button>
                  </div>
                  {validationErrors.otp && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.otp}
                    </p>
                  )}
                </div>
              )}
              {successMessage && (
                <p className="text-green-500 text-sm mt-2">{successMessage}</p>
              )}
              <div>
                <Label htmlFor="phone" className="text-white">
                  Phone Number (Optional)
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  placeholder="Your phone number"
                  className="bg-white/20 text-white placeholder-gray-400"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {validationErrors.phone && (
                  <p className="text-green-500 text-sm mt-1">
                    {validationErrors.phone}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="subject" className="text-white">
                  Subject
                </Label>
                <Input
                  type="text"
                  id="subject"
                  placeholder="Message Subject"
                  required
                  className="bg-white/20 text-white placeholder-gray-400"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-white">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Your message here..."
                  required
                  className="bg-white/20 text-white placeholder-gray-400 min-h-[150px]"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#17b6a7] hover:bg-[#14a090] text-white font-orbitron"
                disabled={isSubmitting || !isEmailVerified}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? "Sending..." : "Launch Message"}
              </Button>
              {validationErrors.submit && (
                <p className="text-green-500 text-sm mt-1">
                  {validationErrors.submit}
                </p>
              )}
            </form>
          </motion.div>
          <motion.div
            className="bg-white/10 backdrop-blur-md p-6 rounded-lg flex flex-col justify-between"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4 font-orbitron">
                How to reach us
              </h2>
              <ul className="space-y-4 text-gray-300">
                <motion.li
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <Phone className="h-6 w-6 text-[#17b6a7]" />
                  <span>+2011434584929</span>
                </motion.li>
                <motion.li
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <Mail className="h-6 w-6 text-[#17b6a7]" />
                  <span>contact@devhouse.dev</span>
                </motion.li>
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4 font-orbitron">
                Join Our Constellation
              </h3>
              <div className="flex space-x-4">
                <motion.a
                  href="https://x.com/devhouse_eg"
                  className="text-[#17b6a7] hover:text-[#14a090] transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  Twitter
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/company/devhouse-eg"
                  className="text-[#17b6a7] hover:text-[#14a090] transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  LinkedIn
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/devhouse.eg/"
                  className="text-[#17b6a7] hover:text-[#14a090] transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  Instagram
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
