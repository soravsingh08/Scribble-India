import React from 'react'

// Anime-style SVG avatars — inline, lightweight, no external deps
// Each is a 48x48 viewBox SVG character

const avatars = [
  // 0 — Ninja
  ({ size = 48, ring = false }) => (
    <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* bg */}
      <circle cx="24" cy="24" r="23" fill="#1a1a2e" stroke={ring ? '#f59e0b' : '#3f3f46'} strokeWidth={ring ? 2.5 : 1.5} />
      {/* body */}
      <rect x="14" y="30" width="20" height="13" rx="4" fill="#0f0f1a" />
      {/* dark wrap */}
      <rect x="11" y="27" width="26" height="8" rx="3" fill="#1e1e3f" />
      {/* head */}
      <ellipse cx="24" cy="22" rx="9" ry="9.5" fill="#fcd5b5" />
      {/* mask cloth */}
      <rect x="15" y="23" width="18" height="7" rx="2" fill="#0f0f1a" />
      {/* headband */}
      <rect x="15" y="17" width="18" height="4" rx="2" fill="#ef4444" />
      {/* headband symbol */}
      <text x="21" y="20.5" fontSize="4" fill="#fff" fontFamily="sans-serif">忍</text>
      {/* eyes */}
      <ellipse cx="20" cy="23" rx="1.8" ry="2.2" fill="#fff" />
      <ellipse cx="28" cy="23" rx="1.8" ry="2.2" fill="#fff" />
      <circle cx="20" cy="23.5" r="1.2" fill="#1a1aff" />
      <circle cx="28" cy="23.5" r="1.2" fill="#1a1aff" />
      <circle cx="20.5" cy="23" r="0.5" fill="#fff" />
      <circle cx="28.5" cy="23" r="0.5" fill="#fff" />
      {/* scar */}
      <line x1="25" y1="19" x2="27" y2="23" stroke="#c084fc" strokeWidth="0.8" />
      {/* arms */}
      <rect x="6" y="28" width="8" height="4" rx="2" fill="#0f0f1a" />
      <rect x="34" y="28" width="8" height="4" rx="2" fill="#0f0f1a" />
      {/* kunai in hand */}
      <rect x="38" y="25" width="1.5" height="7" rx="0.5" fill="#94a3b8" />
      <polygon points="38.75,23 37.5,25.5 40,25.5" fill="#64748b" />
    </svg>
  ),

  // 1 — Anime Wizard
  ({ size = 48, ring = false }) => (
    <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" fill="#1a0a2e" stroke={ring ? '#f59e0b' : '#3f3f46'} strokeWidth={ring ? 2.5 : 1.5} />
      {/* robe */}
      <path d="M12 45 L16 29 L32 29 L36 45 Z" fill="#4c1d95" />
      {/* collar */}
      <path d="M18 29 L24 35 L30 29 Z" fill="#6d28d9" />
      {/* head */}
      <ellipse cx="24" cy="22" rx="9" ry="9" fill="#fde68a" />
      {/* hat */}
      <path d="M14 20 L24 3 L34 20 Z" fill="#4c1d95" />
      <ellipse cx="24" cy="20" rx="11" ry="3" fill="#5b21b6" />
      {/* hat star */}
      <text x="21" y="16" fontSize="5" fill="#fbbf24">★</text>
      {/* eyes */}
      <ellipse cx="20" cy="22" rx="2" ry="2.5" fill="#fff" />
      <ellipse cx="28" cy="22" rx="2" ry="2.5" fill="#fff" />
      <circle cx="20" cy="22.5" r="1.4" fill="#7c3aed" />
      <circle cx="28" cy="22.5" r="1.4" fill="#7c3aed" />
      <circle cx="20.6" cy="22" r="0.5" fill="#fff" />
      <circle cx="28.6" cy="22" r="0.5" fill="#fff" />
      {/* eyebrows */}
      <path d="M17.5 19.5 Q20 18 22.5 19.5" stroke="#92400e" strokeWidth="0.9" fill="none" />
      <path d="M25.5 19.5 Q28 18 30.5 19.5" stroke="#92400e" strokeWidth="0.9" fill="none" />
      {/* smile */}
      <path d="M20 26 Q24 29 28 26" stroke="#92400e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* beard */}
      <path d="M18 27 Q24 33 30 27" stroke="#e5e7eb" strokeWidth="1.8" fill="none" />
      {/* staff */}
      <rect x="35" y="22" width="2" height="16" rx="1" fill="#7c3aed" />
      <circle cx="36" cy="21" r="3" fill="#fbbf24" />
      <circle cx="36" cy="21" r="1.5" fill="#fff" />
    </svg>
  ),

  // 2 — Anime Hero / Superhero
  ({ size = 48, ring = false }) => (
    <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" fill="#0c1445" stroke={ring ? '#f59e0b' : '#3f3f46'} strokeWidth={ring ? 2.5 : 1.5} />
      {/* cape */}
      <path d="M12 44 Q8 36 10 28 L16 30 Z" fill="#b91c1c" />
      <path d="M36 44 Q40 36 38 28 L32 30 Z" fill="#b91c1c" />
      {/* body suit */}
      <rect x="15" y="29" width="18" height="14" rx="4" fill="#1d4ed8" />
      {/* S emblem */}
      <circle cx="24" cy="35" r="4" fill="#fff" />
      <text x="21.5" y="37.5" fontSize="5" fill="#1d4ed8" fontFamily="Arial" fontWeight="bold">S</text>
      {/* neck */}
      <rect x="21" y="27" width="6" height="4" rx="1" fill="#fcd5b5" />
      {/* head */}
      <ellipse cx="24" cy="22" rx="9" ry="9.5" fill="#fcd5b5" />
      {/* mask */}
      <path d="M15 20 Q16 14 24 14 Q32 14 33 20 L31 22 Q28 19 24 19 Q20 19 17 22 Z" fill="#1d4ed8" />
      {/* eyes */}
      <ellipse cx="20" cy="22.5" rx="2.2" ry="2" fill="#fff" />
      <ellipse cx="28" cy="22.5" rx="2.2" ry="2" fill="#fff" />
      <circle cx="20" cy="23" r="1.3" fill="#1d4ed8" />
      <circle cx="28" cy="23" r="1.3" fill="#1d4ed8" />
      <circle cx="20.5" cy="22.5" r="0.5" fill="#fff" />
      <circle cx="28.5" cy="22.5" r="0.5" fill="#fff" />
      {/* jawline */}
      <path d="M17 25 Q24 30 31 25" stroke="#e8b592" strokeWidth="0.7" fill="none" />
      {/* arms */}
      <rect x="6" y="29" width="9" height="5" rx="2.5" fill="#1d4ed8" />
      <rect x="33" y="29" width="9" height="5" rx="2.5" fill="#1d4ed8" />
      {/* fist */}
      <ellipse cx="7" cy="34" rx="3" ry="3.5" fill="#fcd5b5" />
      <ellipse cx="41" cy="34" rx="3" ry="3.5" fill="#fcd5b5" />
    </svg>
  ),

  // 3 — Anime Gamer / Hacker
  ({ size = 48, ring = false }) => (
    <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" fill="#042f2e" stroke={ring ? '#f59e0b' : '#3f3f46'} strokeWidth={ring ? 2.5 : 1.5} />
      {/* hoodie body */}
      <path d="M13 45 L14 28 L34 28 L35 45 Z" fill="#134e4a" />
      {/* hoodie hood */}
      <path d="M14 28 Q10 22 15 18 L24 20 L33 18 Q38 22 34 28 Z" fill="#0f766e" />
      {/* head */}
      <ellipse cx="24" cy="21" rx="9" ry="9" fill="#d1fae5" />
      {/* hair */}
      <path d="M15 19 Q16 12 24 11 Q32 12 33 19 Q30 15 24 15 Q18 15 15 19 Z" fill="#1e293b" />
      {/* headphones */}
      <path d="M15 19 Q12 14 15 10 Q13 10 11 14 Q10 19 15 22 Z" fill="#0d9488" />
      <path d="M33 19 Q36 14 33 10 Q35 10 37 14 Q38 19 33 22 Z" fill="#0d9488" />
      <rect x="11" y="19" width="5" height="5" rx="2" fill="#0d9488" />
      <rect x="32" y="19" width="5" height="5" rx="2" fill="#0d9488" />
      {/* glasses / visor */}
      <rect x="16" y="21" width="7" height="5" rx="2" fill="#000" />
      <rect x="25" y="21" width="7" height="5" rx="2" fill="#000" />
      <rect x="23" y="22.5" width="2" height="2" rx="0.5" fill="#1e293b" />
      {/* visor glow */}
      <rect x="16.5" y="21.5" width="5" height="1.5" rx="0.5" fill="#14b8a6" opacity="0.7" />
      <rect x="25.5" y="21.5" width="5" height="1.5" rx="0.5" fill="#14b8a6" opacity="0.7" />
      {/* mouth smirk */}
      <path d="M22 28 Q25 30.5 28 28" stroke="#6ee7b7" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* laptop glow hands */}
      <rect x="6" y="30" width="10" height="4" rx="2" fill="#0f766e" />
      <rect x="32" y="30" width="10" height="4" rx="2" fill="#0f766e" />
    </svg>
  ),

  // 4 — Anime Rockstar
  ({ size = 48, ring = false }) => (
    <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" fill="#1c0533" stroke={ring ? '#f59e0b' : '#3f3f46'} strokeWidth={ring ? 2.5 : 1.5} />
      {/* jacket */}
      <path d="M13 45 L15 28 L33 28 L35 45 Z" fill="#1e1e1e" />
      <path d="M15 28 L19 35 L24 30 L29 35 L33 28 Z" fill="#2d2d2d" />
      {/* skull badge */}
      <circle cx="24" cy="36" r="3" fill="#3d3d3d" />
      <text x="22.5" y="38" fontSize="4" fill="#fff">☠</text>
      {/* neck */}
      <rect x="21" y="27" width="6" height="3" rx="1" fill="#fcd5b5" />
      {/* head */}
      <ellipse cx="24" cy="21.5" rx="9" ry="9.5" fill="#fcd5b5" />
      {/* wild spiky hair */}
      <path d="M15 18 L13 8 L17 14 L19 6 L21 14 L24 5 L27 14 L29 6 L31 14 L35 8 L33 18 Q30 12 24 12 Q18 12 15 18 Z" fill="#7c3aed" />
      {/* sunglasses */}
      <rect x="15.5" y="20" width="7" height="4.5" rx="2" fill="#000" />
      <rect x="25.5" y="20" width="7" height="4.5" rx="2" fill="#000" />
      <line x1="22.5" y1="22.2" x2="25.5" y2="22.2" stroke="#555" strokeWidth="1" />
      <line x1="14" y1="22.2" x2="15.5" y2="22.2" stroke="#555" strokeWidth="1" />
      <line x1="32.5" y1="22.2" x2="34" y2="22.2" stroke="#555" strokeWidth="1" />
      {/* smirk */}
      <path d="M21 27 Q25 29 28 26.5" stroke="#c4a882" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* guitar */}
      <ellipse cx="9" cy="35" rx="5" ry="5.5" fill="#92400e" />
      <rect x="10" y="23" width="2" height="13" rx="1" fill="#78350f" />
      <line x1="7" y1="33" x2="11" y2="33" stroke="#fbbf24" strokeWidth="0.7" />
      <line x1="7" y1="35" x2="11" y2="35" stroke="#fbbf24" strokeWidth="0.7" />
      <line x1="7" y1="37" x2="11" y2="37" stroke="#fbbf24" strokeWidth="0.7" />
    </svg>
  ),

  // 5 — Anime Detective
  ({ size = 48, ring = false }) => (
    <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" fill="#1c1410" stroke={ring ? '#f59e0b' : '#3f3f46'} strokeWidth={ring ? 2.5 : 1.5} />
      {/* trench coat */}
      <path d="M13 46 L15 28 L33 28 L35 46 Z" fill="#44403c" />
      <path d="M15 28 L17 34 L24 30 L31 34 L33 28 Z" fill="#57534e" />
      {/* tie */}
      <rect x="23" y="30" width="2" height="8" rx="1" fill="#b91c1c" />
      <polygon points="22,30 26,30 24,33" fill="#dc2626" />
      {/* neck */}
      <rect x="21" y="27" width="6" height="3" rx="1" fill="#fde68a" />
      {/* head */}
      <ellipse cx="24" cy="21.5" rx="9" ry="9" fill="#fde68a" />
      {/* fedora hat */}
      <ellipse cx="24" cy="16" rx="12" ry="3" fill="#292524" />
      <rect x="17" y="9" width="14" height="8" rx="3" fill="#1c1917" />
      <rect x="17" y="13" width="14" height="2" rx="0.5" fill="#57534e" />
      {/* glasses */}
      <circle cx="20" cy="22" r="3.2" fill="none" stroke="#a16207" strokeWidth="1.2" />
      <circle cx="28" cy="22" r="3.2" fill="none" stroke="#a16207" strokeWidth="1.2" />
      <line x1="23.2" y1="22" x2="24.8" y2="22" stroke="#a16207" strokeWidth="1" />
      {/* eyes behind glasses */}
      <circle cx="20" cy="22" r="1.5" fill="#1e1b4b" />
      <circle cx="28" cy="22" r="1.5" fill="#1e1b4b" />
      <circle cx="20.5" cy="21.5" r="0.5" fill="#fff" />
      <circle cx="28.5" cy="21.5" r="0.5" fill="#fff" />
      {/* serious mouth */}
      <line x1="21" y1="26.5" x2="27" y2="26.5" stroke="#a16207" strokeWidth="1.2" strokeLinecap="round" />
      {/* magnifier */}
      <circle cx="38" cy="32" r="5" fill="none" stroke="#d4a835" strokeWidth="1.8" />
      <line x1="41.5" y1="35.5" x2="44" y2="38" stroke="#d4a835" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // 6 — Anime Cat Girl
  ({ size = 48, ring = false }) => (
    <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" fill="#1a0522" stroke={ring ? '#f59e0b' : '#3f3f46'} strokeWidth={ring ? 2.5 : 1.5} />
      {/* outfit */}
      <path d="M14 46 L16 29 L32 29 L34 46 Z" fill="#7e22ce" />
      <path d="M16 29 L20 36 L24 31 L28 36 L32 29 Z" fill="#9333ea" />
      {/* ribbon */}
      <polygon points="21,30 24,33 27,30 24,31" fill="#ec4899" />
      {/* neck */}
      <rect x="21" y="27" width="6" height="4" rx="1.5" fill="#fce7f3" />
      {/* collar bell */}
      <rect x="20" y="29" width="8" height="2" rx="1" fill="#ec4899" />
      <circle cx="24" cy="31" r="1.5" fill="#fbbf24" />
      {/* head */}
      <ellipse cx="24" cy="21" rx="9.5" ry="9" fill="#fce7f3" />
      {/* cat ears */}
      <polygon points="14,17 15,8 20,16" fill="#fce7f3" />
      <polygon points="34,17 33,8 28,16" fill="#fce7f3" />
      <polygon points="15,16 15.5,10 19.5,15.5" fill="#ec4899" />
      <polygon points="33,16 32.5,10 28.5,15.5" fill="#ec4899" />
      {/* hair */}
      <path d="M14.5 19 Q13 12 17 10 Q20 8 24 8 Q28 8 31 10 Q35 12 33.5 19 Q31 14 24 14 Q17 14 14.5 19 Z" fill="#7e22ce" />
      {/* side bangs */}
      <path d="M14.5 19 Q11 21 14 26 Q14 22 16 21 Z" fill="#7e22ce" />
      <path d="M33.5 19 Q37 21 34 26 Q34 22 32 21 Z" fill="#7e22ce" />
      {/* eyes — big anime style */}
      <ellipse cx="19.5" cy="22" rx="3" ry="3.5" fill="#fff" />
      <ellipse cx="28.5" cy="22" rx="3" ry="3.5" fill="#fff" />
      <circle cx="19.5" cy="22.5" r="2.2" fill="#ec4899" />
      <circle cx="28.5" cy="22.5" r="2.2" fill="#ec4899" />
      <circle cx="19.5" cy="22.5" r="1.2" fill="#1a0022" />
      <circle cx="28.5" cy="22.5" r="1.2" fill="#1a0022" />
      <circle cx="20.2" cy="21.8" r="0.8" fill="#fff" />
      <circle cx="29.2" cy="21.8" r="0.8" fill="#fff" />
      {/* blush */}
      <ellipse cx="16" cy="25" rx="2.5" ry="1.5" fill="#f9a8d4" opacity="0.5" />
      <ellipse cx="32" cy="25" rx="2.5" ry="1.5" fill="#f9a8d4" opacity="0.5" />
      {/* cat nose + mouth */}
      <ellipse cx="24" cy="26" rx="1" ry="0.7" fill="#f9a8d4" />
      <path d="M22 27.5 Q24 29 26 27.5" stroke="#c084fc" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* whiskers */}
      <line x1="14" y1="25.5" x2="21" y2="26" stroke="#9ca3af" strokeWidth="0.6" />
      <line x1="14" y1="27" x2="21" y2="26.5" stroke="#9ca3af" strokeWidth="0.6" />
      <line x1="34" y1="25.5" x2="27" y2="26" stroke="#9ca3af" strokeWidth="0.6" />
      <line x1="34" y1="27" x2="27" y2="26.5" stroke="#9ca3af" strokeWidth="0.6" />
    </svg>
  ),

  // 7 — Anime Pirate
  ({ size = 48, ring = false }) => (
    <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" fill="#0c1a2e" stroke={ring ? '#f59e0b' : '#3f3f46'} strokeWidth={ring ? 2.5 : 1.5} />
      {/* coat */}
      <path d="M12 46 L14 28 L34 28 L36 46 Z" fill="#7f1d1d" />
      <path d="M14 28 L18 38 L24 31 L30 38 L34 28 Z" fill="#991b1b" />
      {/* gold buttons */}
      <circle cx="24" cy="33" r="1.5" fill="#fbbf24" />
      <circle cx="24" cy="37" r="1.5" fill="#fbbf24" />
      <circle cx="24" cy="41" r="1.5" fill="#fbbf24" />
      {/* neck */}
      <rect x="21" y="27" width="6" height="3" rx="1" fill="#fbbf24" />
      {/* head */}
      <ellipse cx="24" cy="21" rx="9" ry="9.5" fill="#fde68a" />
      {/* pirate hat */}
      <ellipse cx="24" cy="15" rx="12" ry="3.5" fill="#1e293b" />
      <rect x="17" y="7" width="14" height="9" rx="3" fill="#0f172a" />
      {/* skull crossbones on hat */}
      <circle cx="24" cy="11" r="2.5" fill="#e2e8f0" />
      <circle cx="24" cy="11" r="1" fill="#0f172a" />
      <line x1="22" y1="13" x2="23" y2="14.5" stroke="#e2e8f0" strokeWidth="1" />
      <line x1="26" y1="13" x2="25" y2="14.5" stroke="#e2e8f0" strokeWidth="1" />
      {/* eye patch */}
      <ellipse cx="28" cy="22" rx="3.5" ry="3" fill="#0f172a" />
      <line x1="24.5" y1="21" x2="31.5" y2="20" stroke="#0f172a" strokeWidth="1.5" />
      {/* normal eye */}
      <ellipse cx="19.5" cy="22" rx="2.5" ry="3" fill="#fff" />
      <circle cx="19.5" cy="22.5" r="1.6" fill="#15803d" />
      <circle cx="19.5" cy="22.5" r="0.9" fill="#052e16" />
      <circle cx="20" cy="22" r="0.5" fill="#fff" />
      {/* scar */}
      <line x1="19" y1="17" x2="20" y2="22" stroke="#b91c1c" strokeWidth="0.9" />
      {/* grin */}
      <path d="M19 27 Q24 30 29 27" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* teeth */}
      <rect x="21.5" y="27" width="2" height="2" rx="0.5" fill="#fff" />
      <rect x="24" y="27" width="2" height="2" rx="0.5" fill="#fff" />
    </svg>
  ),

  // 8 — Anime Scientist
  ({ size = 48, ring = false }) => (
    <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" fill="#0d1f0d" stroke={ring ? '#f59e0b' : '#3f3f46'} strokeWidth={ring ? 2.5 : 1.5} />
      {/* lab coat */}
      <path d="M13 46 L15 28 L33 28 L35 46 Z" fill="#f8fafc" />
      <path d="M15 28 L18 40 L24 31 L30 40 L33 28 Z" fill="#f1f5f9" />
      {/* pocket */}
      <rect x="26" y="33" width="5" height="5" rx="1" fill="#e2e8f0" />
      <rect x="27.5" y="32.5" width="1" height="2" rx="0.5" fill="#22c55e" />
      <rect x="29" y="32.5" width="1" height="2" rx="0.5" fill="#ef4444" />
      {/* collar shirt */}
      <path d="M18 28 L21 33 L24 29 L27 33 L30 28 Z" fill="#bfdbfe" />
      {/* head */}
      <ellipse cx="24" cy="21" rx="9" ry="9.5" fill="#d1fae5" />
      {/* hair — messy genius */}
      <path d="M15 18 Q13 10 17 8 L20 13 L22 7 L24 13 L26 7 L28 13 L31 8 Q35 10 33 18 Q30 13 24 13 Q18 13 15 18 Z" fill="#1e293b" />
      {/* thick glasses */}
      <rect x="15" y="20" width="8" height="6" rx="2.5" fill="#fff" stroke="#1e293b" strokeWidth="1.5" />
      <rect x="25" y="20" width="8" height="6" rx="2.5" fill="#fff" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="23" y1="23" x2="25" y2="23" stroke="#1e293b" strokeWidth="1.2" />
      {/* eyes */}
      <circle cx="19" cy="23" r="2" fill="#065f46" />
      <circle cx="29" cy="23" r="2" fill="#065f46" />
      <circle cx="19.5" cy="22.5" r="0.7" fill="#fff" />
      <circle cx="29.5" cy="22.5" r="0.7" fill="#fff" />
      {/* smile + dimple */}
      <path d="M20 27.5 Q24 30 28 27.5" stroke="#6b7280" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* flask */}
      <path d="M37 28 L35 35 Q34 39 36 40 Q40 40 39 35 Z" fill="#22c55e" opacity="0.7" />
      <rect x="35.5" y="25" width="3" height="4" rx="0.5" fill="#4b5563" />
      <line x1="35" y1="26.5" x2="38.5" y2="26.5" stroke="#6b7280" strokeWidth="0.8" />
    </svg>
  ),
]

export const AVATAR_LABELS = [
  'Ninja', 'Wizard', 'Hero', 'Hacker',
  'Rockstar', 'Detective', 'Cat Girl', 'Pirate', 'Scientist'
]

export const AVATAR_COUNT = avatars.length

export default function AvatarSVG({ id = 0, size = 48, ring = false, className = '' }) {
  const Comp = avatars[id % avatars.length]
  return (
    <span className={`inline-block select-none ${className}`} style={{ lineHeight: 0 }}>
      <Comp size={size} ring={ring} />
    </span>
  )
}
