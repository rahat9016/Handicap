"use client";

import { Button } from "@/components/ui/button";
import { Contrast, Volume2, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useState } from "react";

export function AccessibilityControls() {
  const [fontSize, setFontSize] = useState("base");
  const [highContrast, setHighContrast] = useState(false);
  const [speechSynthesisAvailable, setSpeechSynthesisAvailable] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) setFontSize(savedFontSize);

    const savedHighContrast = localStorage.getItem("highContrast") === "true";
    setHighContrast(savedHighContrast);

    if ("speechSynthesis" in window) {
      setSpeechSynthesisAvailable(true);
    }

    applySettings(savedFontSize || "base", savedHighContrast);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const handleFocus = (e: FocusEvent) => {
      if (!isSpeaking) return;
      const target = e.target as HTMLElement;
      const mainContent = document.getElementById("main-content");
      if (!mainContent || !mainContent.contains(target)) return;

      const style = window.getComputedStyle(target);
      if (style.display === "none" || style.visibility === "hidden") return;

      const ariaLabel = target.getAttribute("aria-label")?.trim();
      if (ariaLabel) {
        speak(ariaLabel);
        return;
      }

      const visibleText = target.textContent?.trim();
      if (visibleText) {
        speak(visibleText);
        return;
      }

      const labelledBy = target.getAttribute("aria-labelledby");
      if (labelledBy) {
        const labelText = labelledBy
          .split(" ")
          .map((id) => document.getElementById(id)?.textContent?.trim())
          .filter(Boolean)
          .join(" ");
        if (labelText) {
          speak(labelText);
        }
      }
    };

    document.addEventListener("focusin", handleFocus);
    return () => document.removeEventListener("focusin", handleFocus);
  }, [isSpeaking]);

  const applySettings = (newFontSize: string, newHighContrast: boolean) => {
    document.documentElement.classList.remove("text-size-base", "text-size-large", "text-size-larger");
    document.documentElement.classList.add(`text-size-${newFontSize}`);

    if (newHighContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  };

  const changeFontSize = (increase: boolean) => {
    const newFontSize =
      increase
        ? fontSize === "base" ? "large" : "larger"
        : fontSize === "larger" ? "large" : "base";

    if (newFontSize !== fontSize) {
      setFontSize(newFontSize);
      localStorage.setItem("fontSize", newFontSize);
      applySettings(newFontSize, highContrast);
    }
  };

  const toggleHighContrast = () => {
    const newHighContrast = !highContrast;
    setHighContrast(newHighContrast);
    localStorage.setItem("highContrast", String(newHighContrast));
    applySettings(fontSize, newHighContrast);
  };

  const toggleTextToSpeech = () => {
    if (!speechSynthesisAvailable) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speak("Text to speech started");
    }
  };

  const speak = (text: string) => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className="fixed right-4 top-[25%] z-50 flex flex-col gap-2 bg-background border rounded-lg p-2 shadow-md"
      role="region"
      aria-label="Accessibility controls"
      tabIndex={0}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => changeFontSize(true)}
        disabled={fontSize === "larger"}
        aria-label="Increase font size"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => changeFontSize(false)}
        disabled={fontSize === "base"}
        aria-label="Decrease font size"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleHighContrast}
        aria-pressed={highContrast}
        aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
         className={highContrast ? "bg-primary" : ""}
      >
        <Contrast className={`h-4 w-4 ${highContrast && "text-white"}`} />
      </Button>

      {speechSynthesisAvailable && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTextToSpeech}
          aria-pressed={isSpeaking}
          aria-label={isSpeaking ? "Stop text-to-speech" : "Start text-to-speech"}
          className={isSpeaking ? "bg-primary text-primary-foreground" : ""}
        >
          <Volume2 className={`h-4 w-4 ${isSpeaking  && "text-white"}`} />
        </Button>
      )}
    </div>
  );
}
