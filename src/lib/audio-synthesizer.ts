/**
 * Tactical Web Audio Synthesizer
 * Zero-dependency procedural sound effects for Peddie Soccer SAC:
 * - Referee Whistle (dual sine wave FM modulation)
 * - Ball Kick / Impact (sub-bass transient)
 * - Crowd Goal Roar (bandpass noise envelope)
 * - Crossbar / Post Clang (harmonic metallic resonance)
 */

class TacticalAudioEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Authentic Referee Whistle:
   * Two simultaneous high-pitch oscillators (around 2800Hz and 3000Hz)
   * with slight frequency modulation to create the iconic pea-whistle trill.
   */
  playWhistle(durationMs: number = 350) {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const durationSec = durationMs / 1000;

      // Master Gain for Whistle
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, now);
      masterGain.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);
      masterGain.connect(ctx.destination);

      // Low Frequency Oscillator for the trill effect
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(25, now); // 25Hz pea wobble
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(40, now);
      lfo.connect(lfoGain);

      // Two tone oscillators
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(2850, now);
      lfoGain.connect(osc1.frequency);
      osc1.connect(masterGain);

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(3100, now);
      lfoGain.connect(osc2.frequency);
      osc2.connect(masterGain);

      lfo.start(now);
      osc1.start(now);
      osc2.start(now);

      lfo.stop(now + durationSec);
      osc1.stop(now + durationSec);
      osc2.stop(now + durationSec);
    } catch {
      // Audio fallback silent
    }
  }

  /**
   * Ball Kick / Clean Strike:
   * Fast decaying sine frequency drop + subtle white noise click.
   */
  playKick() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }

  /**
   * Crowd Roar / Goal Celebration:
   * Filtered white noise with exponential swell and decay.
   */
  playGoalCheer(durationMs: number = 1800) {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const bufferSize = ctx.sampleRate * (durationMs / 1000);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      // Generate pink/white noise
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.11;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 0.5);
      filter.frequency.exponentialRampToValueAtTime(600, now + durationMs / 1000);
      filter.Q.setValueAtTime(1.5, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.25, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationMs / 1000);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + durationMs / 1000);
    } catch {}
  }

  /**
   * Metallic Crossbar / Post Clang
   */
  playPostClang() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.4);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch {}
  }
}

export const TacticalAudio = new TacticalAudioEngine();
