/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { ThreeFacesSection } from './components/ThreeFacesSection';
import { StatusHudSection } from './components/StatusHudSection';
import { BelongingsSection } from './components/BelongingsSection';
import { MayoCatSection } from './components/MayoCatSection';
import { ContactSheetSection } from './components/ContactSheetSection';
import { AcademicTimelineSection } from './components/AcademicTimelineSection';
import { FooterCtaSection } from './components/FooterCtaSection';
import { RawPromptModal } from './components/RawPromptModal';
import { ImageLightboxModal, LightboxImage } from './components/ImageLightboxModal';
import { ShareModal } from './components/ShareModal';
import { Check } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<'angel' | 'realist'>('angel');
  const [isSwitching, setIsSwitching] = useState(false);
  const [showScanline, setShowScanline] = useState(false);
  const [isFlustered, setIsFlustered] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Sync dark class on documentElement for Tailwind
  useEffect(() => {
    if (mode === 'realist') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  const handleToggleMode = () => {
    // 0.4s fast snap transition with single horizontal scanline pass
    setShowScanline(true);
    setIsSwitching(true);

    setTimeout(() => {
      setMode((prev) => (prev === 'angel' ? 'realist' : 'angel'));
    }, 80);

    setTimeout(() => {
      setShowScanline(false);
      setIsSwitching(false);
    }, 400);
  };

  const handleTriggerFlustered = () => {
    if (isFlustered) return;
    setIsFlustered(true);
    setTimeout(() => {
      setIsFlustered(false);
    }, 3800);
  };

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden paper-grain transition-colors duration-200 ${
        mode === 'angel'
          ? 'bg-[#F6F1EA] text-[#2A2624] selection:bg-[#E85D75]/20 selection:text-[#E85D75]'
          : 'bg-[#15161C] text-[#E7E2DA] selection:bg-[#E85D75]/30 selection:text-[#E85D75]'
      } ${isSwitching ? 'animate-paper-flip' : ''}`}
    >
      {/* 0.4s Single Scanline Transition Overlay */}
      {showScanline && (
        <div
          className="fixed inset-0 z-50 pointer-events-none bg-[#E85D75]/10 animate-scanline"
          aria-hidden="true"
        />
      )}

      {/* Subtle Restrained Particles (5~8 petals or 9 micro dust specks) */}
      <ParticleCanvas mode={mode} />

      {/* Editorial Top Navigation */}
      <TopNav
        mode={mode}
        onToggleMode={handleToggleMode}
        onOpenPrompt={() => setIsPromptOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Main Editorial Content */}
      <main className="relative z-10">
        <HeroSection
          mode={mode}
          isFlustered={isFlustered}
          onTriggerFlustered={handleTriggerFlustered}
          onOpenLightbox={(img) => setLightboxImage(img)}
          onOpenShare={() => setIsShareOpen(true)}
        />

        <ThreeFacesSection
          mode={mode}
          onOpenLightbox={(img) => setLightboxImage(img)}
        />

        <StatusHudSection
          mode={mode}
          isFlustered={isFlustered}
          onOpenLightbox={(img) => setLightboxImage(img)}
        />

        <BelongingsSection
          mode={mode}
          onOpenLightbox={(img) => setLightboxImage(img)}
        />

        <MayoCatSection
          mode={mode}
          onOpenLightbox={(img) => setLightboxImage(img)}
        />

        <ContactSheetSection
          mode={mode}
          onOpenLightbox={(img) => setLightboxImage(img)}
        />

        <AcademicTimelineSection mode={mode} />

        <FooterCtaSection
          mode={mode}
          onOpenPrompt={() => setIsPromptOpen(true)}
          onOpenShare={() => setIsShareOpen(true)}
        />
      </main>

      {/* RAW Prompt Modal */}
      <RawPromptModal
        isOpen={isPromptOpen}
        onClose={() => setIsPromptOpen(false)}
        mode={mode}
      />

      {/* Universal Image Lightbox Modal with Zoom */}
      <ImageLightboxModal
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
        mode={mode}
      />

      {/* Share Link Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        mode={mode}
        onShowToast={showToast}
      />

      {/* Floating Paper Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xs border shadow-xl flex items-center gap-2 font-mono text-xs select-none animate-bounce-in bg-[#2A2624] text-[#F6F1EA] dark:bg-[#E7E2DA] dark:text-[#15161C] border-[#E85D75]"
        >
          <div className="w-2 h-2 rounded-full bg-[#E85D75] shrink-0" />
          <Check className="w-3.5 h-3.5 text-[#E85D75] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
