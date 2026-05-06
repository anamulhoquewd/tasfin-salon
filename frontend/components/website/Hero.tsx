"use client";

import type { ReelSettings, Settings } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";
import SalonIcon from "./SalonIcon";

interface HeroProps {
  settings: Settings;
  reel: ReelSettings;
}

import v from "./../../public/videos/car.mp4";
console.log("Video URL:", v);

export default function Hero({ settings, reel }: HeroProps) {
  const [loops, setLoops] = useState(0);
  const whatsappNum = settings.whatsapp.replace(/\D/g, "");
  return (
    <section className="lm-hero">
      <div className="lm-hero-bg" />
      <div className="lm-hero-content">
        <div>
          <div className="lm-hero-eyebrow">{settings.established}</div>
          <h1 className="lm-hero-title">{settings.hero.salonName}</h1>
          <p className="lm-hero-slogan">{settings.hero.slogan}</p>
          <div className="lm-hero-ctas">
            <Link href="/about" className="lm-btn lm-btn-gold">
              <SalonIcon name="calendar" size={16} /> {settings.hero.primaryCta}
            </Link>
            <a
              className="lm-btn lm-btn-wa"
              href={`https://wa.me/${whatsappNum}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SalonIcon name="whatsapp" size={16} />{" "}
              {settings.hero.secondaryCta}
            </a>
          </div>
        </div>
        <div className="lm-hero-reel">
          {reel.src ? (
            (() => {
              const embed = getEmbedUrl(v);
              const isDirect = reel.src.match(/\.(mp4|webm|ogg)(\?.*)?$/i);

              console.log({ embed, isDirect });

              if (isDirect) {
                return (
                  <video
                    src={reel.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                );
              }

              if (embed) {
                return (
                  <iframe
                    src={embed}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    style={{ width: "100%", height: "100%", border: "none" }}
                  />
                );
              }

              return (
                <div style={{ color: "red", padding: 16 }}>
                  Invalid video URL
                </div>
              );
            })()
          ) : (
            <div className="lm-hero-reel-placeholder">
              <SalonIcon name="play" size={36} />
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 13,
                  opacity: 0.7,
                }}
              >
                No video set
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function getEmbedUrl(url: string): string | null {
  if (!url) return null;
  console.log("Parsing video URL:", url);
  // YouTube
  const yt = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  console.log("YouTube match:", yt);
  if (yt)
    return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&loop=1&mute=1&controls=0&playlist=${yt[1]}`;

  // Facebook
  if (url.includes("facebook.com") || url.includes("fb.watch")) {
    console.log("Facebook video URL:", url);
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&autoplay=true&muted=true`;
  }

  // S3 / R2 / direct MP4
  if (url.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
    console.log("Direct video URL:", url);
    return url;
  }

  return null;
}
