# Audio Provenance, Licensing & Chrono Trigger Legal Assessment

## 1. Executive Summary & Legal Go / No-Go Decision

| Query | Assessment | Recommendation / Status |
|---|---|---|
| **Chrono Trigger Master Recording / Sample Licensing** | **NO-GO (Strict Prohibition)** | Commercial synchronization and master-use rights for Yasunori Mitsuda / Square Enix compositions are commercially prohibitive, rights-restricted by territory, and legally incompatible with standalone independent Steam distribution without multimillion-dollar licensing contracts. |
| **Direct Melodic Arranging / Transcription** | **NO-GO (Derivative Infringement Risk)** | Transcriptions or close recreations of "Secrets of the Forest" or other protected motifs carry direct copyright infringement liability under US Title 17 and international Berne Convention protections. |
| **Original Solarpunk Ambient Score (*Verdant Harmonies: Solarpunk Echoes*)** | **GO (100% Original Asset)** | An original procedural, multi-stem solarpunk score created natively within the Web Audio API with zero copyrighted audio, samples, or transcriptions. |

---

## 2. Chrono Trigger Licensing Investigation (Issue #28 Resolution)

### 2.1 Rights Holders & Licensing Complexities
- **Master Rights & Publishing Rights:** Square Enix Holdings Co., Ltd. (Japan) & Procyon Studio (Yasunori Mitsuda).
- **Scope of Required Rights:** Worldwide, perpetual commercial synchronization, master use, and mechanical rights across Steam (Windows, macOS, Linux), digital trailers, web demos, and future console/portable ports.
- **Feasibility Findings:**
  1. Square Enix does not offer standardized or royalty-free indie sync licenses for their flagship legacy IP (Chrono Trigger, Final Fantasy).
  2. Commercial sync licenses for iconic titles from Japanese publishers require bespoke negotiation, minimum upfront guarantees typically exceeding $50,000–$150,000 USD, strict territory limitations, and revenue-sharing royalties that would jeopardize Aegis Florae's commercial viability on Steam.
  3. Fair use does not protect background music in a commercial game or digital distribution store.

### 2.2 Written Decision: NO-GO
**Decision:** Under no circumstances will any copyrighted Chrono Trigger recording, extracted ROM audio, fan transcription, MIDI arrangement, or sampled waveform be incorporated into Aegis Florae.

Instead, the project delivers an **original, royalty-free solarpunk soundtrack** inspired solely by the high-level aesthetic qualities of classic 16-bit forest music: warm pentatonic woodwinds, kalimba/harp plucked arpeggios, and gentle ambient subterranean resonance.

---

## 3. Original Shipped Soundtrack: *Verdant Harmonies: Solarpunk Echoes*

### 3.1 Provenance & Copyright Grant
- **Title:** *Verdant Harmonies: Solarpunk Echoes*
- **Composer / Sound Designer:** Aegis Florae Core Engineering Team
- **License:** MIT License / Dedicated to Aegis Florae Public Repository
- **Commercial Rights:** 100% royalty-free, worldwide, perpetual commercial rights for Steam, web, demos, and promotional media.
- **External Dependencies:** Zero (0 MB). Synthesized entirely via native browser Web Audio API oscillators, biquad filters, and custom envelope gain nodes.

### 3.2 Dynamic Stem Architecture & State Machine

The audio engine features 4 dynamic stems crossfading smoothly across gameplay phases:

```
                      ┌────────────────────────────────────────┐
                      │          Web Audio Context             │
                      └──────────────────┬─────────────────────┘
                                         │
                   ┌─────────────────────┴──────────────────────┐
                   │                                            │
        ┌──────────▼──────────┐                      ┌──────────▼──────────┐
        │     AC._master      │                      │     AC._limiter     │
        │    (Master Vol)     │                      │   (-6dB Brickwall)  │
        └──────────▲──────────┘                      └──────────▲──────────┘
                   │                                            │
         ┌─────────┴───────────────┬────────────────────────────┴────────┐
         │                         │                                     │
┌────────┴────────┐       ┌────────┴────────┐                   ┌────────┴────────┐
│   AC._sfxBus    │       │ AC._explosionBus│                   │   AC._musicBus  │
│ (Lasers/Hits)   │       │  (Blast Punch)  │                   │(Dynamic Stems)  │
└─────────────────┘       └─────────────────┘                   └────────▲────────┘
                                                                         │
                                       ┌─────────────────────────────────┼─────────────────────────┐
                                       │                                 │                         │
                              ┌────────┴────────┐               ┌────────┴────────┐       ┌────────┴────────┐
                              │  Stem: Ambience │               │  Stem: Arpeggio │       │Stem: Percussion │
                              │(Sub-bass Drone) │               │ (Plucked Harp)  │       │(Clockwork Beat) │
                              └─────────────────┘               └─────────────────┘       └─────────────────┘
```

1. **Stem 1 — Ambience (Verdant Sanctuary):**
   - Continuous subterranean crystal resonance (E2 82.41Hz + B2 123.47Hz dual sine drone) and soft wind whispering through ancient stone ruin arches.
2. **Stem 2 — Arpeggio (Plucked Harp / Kalimba):**
   - 32-step original pentatonic melody in E Dorian / Minor Pentatonic with warm triangular waveforms, exponential filter ramps, and reflective solarpunk character. Active during both build and combat phases.
3. **Stem 3 — Clockwork Percussion:**
   - 16-step polyrhythmic clockwork rhythm featuring acoustic woodblock strikes, high-frequency filtered ticks, and soft sine thuds. Dynamically fades in when the combat wave begins.
4. **Stem 4 — Colossus Boss Bass Drive:**
   - Driving resonant sawtooth sub-bass line that engages automatically during Wave 10 Goliath Colossus encounters or boss waves, multiplying combat tension.
5. **Pause State — Underwater Low-Pass Filter:**
   - When game is paused (`P` or menu), the music master filter smoothly ramps down to 350Hz cutoff, creating a serene, reflective "submerged" acoustic texture without restarting tracks.
6. **Visibility Lifecycle:**
   - Automatically ducks and pauses on tab blur / window minimize (`visibilitychange`) and resumes smoothly on return, preventing audio stacking or duplicate loops.

---

## 4. User Controls & Custom Audio Fallback

- **Settings Controls:**
  - `Master Volume` (0–100%)
  - `Music Volume` (0–100%)
  - `SFX Volume` (0–100%)
  - `Ambience Volume` (0–100%)
  - `Explosion Volume` (0–100%)
  - `Master Mute Toggle` (`M`)
- **Custom Soundtrack Support:**
  - The runtime can optionally mount external `.ogg` / `.mp3` background loops if provided in `assets/music/`.
  - If external files are missing, corrupted, or blocked by browser CORS, the engine automatically and silently falls back to the built-in procedural *Verdant Harmonies* Web Audio engine with zero downtime or console warnings.
