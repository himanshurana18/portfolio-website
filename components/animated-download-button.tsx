"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, FileText, Sparkles, Check } from "lucide-react";

export function AnimatedDownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDownload = async () => {
    if (!isMounted || typeof window === "undefined") return;

    setIsDownloading(true);

    setTimeout(() => {
      setIsDownloading(false);
      setIsComplete(true);

      setTimeout(() => {
        setIsComplete(false);
      }, 2000);

      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Himanshu_Rana_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2000);
  };

  if (!isMounted) return null;

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        className="relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-6 py-3 rounded-full shadow-lg group"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent to-primary"
          initial={{ x: "-100%" }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10 flex items-center gap-2">
          <motion.div
            animate={isDownloading ? { rotate: 360 } : { rotate: 0 }}
            transition={{
              duration: 0.5,
              repeat: isDownloading ? Number.POSITIVE_INFINITY : 0,
            }}
          >
            {isComplete ? (
              <Check className="w-5 h-5" />
            ) : isDownloading ? (
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ) : (
              <Download className="w-5 h-5" />
            )}
          </motion.div>

          <span>
            {isComplete
              ? "Downloaded!"
              : isDownloading
              ? "Downloading..."
              : "Download Resume"}
          </span>

          {!isDownloading && !isComplete && (
            <>
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{
                  y: [-5, -15, -5],
                  rotate: [0, 10, -10, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
              >
                <FileText className="w-4 h-4 text-accent" />
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2"
                animate={{
                  y: [5, 15, 5],
                  rotate: [0, -10, 10, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 4,
                  delay: 1,
                }}
              >
                <Sparkles className="w-3 h-3 text-primary" />
              </motion.div>
            </>
          )}
        </div>

        {isDownloading && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        )}

        {isComplete && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: Math.cos((i * 60 * Math.PI) / 180) * 30,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 30,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </Button>

      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-0 blur-xl -z-10"
        whileHover={{ opacity: 0.3, scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
