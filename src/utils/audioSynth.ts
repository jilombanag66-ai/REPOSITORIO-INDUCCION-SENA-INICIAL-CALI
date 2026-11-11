/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Audio API melody player for SENA Anthem march
class SenaAnthemSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private noteTimeouts: number[] = [];
  private onProgressCallback: ((stanzaIndex: number, currentVerseIndex: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // SENA Anthem march notes sequence (Note, duration in beats)
  // Key of C major / G major martial march
  private melodyNotes: { freq: number; dur: number; stanza: number; verse: number }[] = [
    // Coro: "Estudiantes del SENA adelante..."
    { freq: 261.63, dur: 0.4, stanza: 0, verse: 0 }, // C4 - Es-
    { freq: 329.63, dur: 0.4, stanza: 0, verse: 0 }, // E4 - tu-
    { freq: 392.00, dur: 0.6, stanza: 0, verse: 0 }, // G4 - dian-
    { freq: 392.00, dur: 0.4, stanza: 0, verse: 0 }, // G4 - tes
    { freq: 440.00, dur: 0.4, stanza: 0, verse: 0 }, // A4 - del
    { freq: 392.00, dur: 0.4, stanza: 0, verse: 0 }, // G4 - SE-
    { freq: 329.63, dur: 0.6, stanza: 0, verse: 0 }, // E4 - NA_a-
    { freq: 261.63, dur: 0.8, stanza: 0, verse: 0 }, // C4 - de-lan-te

    // "por Colombia luchad con amor..."
    { freq: 293.66, dur: 0.4, stanza: 0, verse: 1 }, // D4 - por
    { freq: 349.23, dur: 0.4, stanza: 0, verse: 1 }, // F4 - Co-
    { freq: 440.00, dur: 0.6, stanza: 0, verse: 1 }, // A4 - lom-
    { freq: 392.00, dur: 0.4, stanza: 0, verse: 1 }, // G4 - bia
    { freq: 349.23, dur: 0.4, stanza: 0, verse: 1 }, // F4 - lu-
    { freq: 329.63, dur: 0.4, stanza: 0, verse: 1 }, // E4 - chad
    { freq: 293.66, dur: 0.6, stanza: 0, verse: 1 }, // D4 - con
    { freq: 261.63, dur: 0.8, stanza: 0, verse: 1 }, // C4 - a-mor

    // "con el ánimo noble y constante..."
    { freq: 261.63, dur: 0.4, stanza: 0, verse: 2 }, // C4 - con
    { freq: 329.63, dur: 0.4, stanza: 0, verse: 2 }, // E4 - el
    { freq: 392.00, dur: 0.6, stanza: 0, verse: 2 }, // G4 - á-
    { freq: 523.25, dur: 0.4, stanza: 0, verse: 2 }, // C5 - ni-
    { freq: 493.88, dur: 0.4, stanza: 0, verse: 2 }, // B4 - mo
    { freq: 440.00, dur: 0.4, stanza: 0, verse: 2 }, // A4 - no-
    { freq: 392.00, dur: 0.6, stanza: 0, verse: 2 }, // G4 - ble_y
    { freq: 349.23, dur: 0.8, stanza: 0, verse: 2 }, // F4 - con-stan-te

    // "al trabajo brindad ilusión..."
    { freq: 329.63, dur: 0.4, stanza: 0, verse: 3 }, // E4 - al
    { freq: 392.00, dur: 0.4, stanza: 0, verse: 3 }, // G4 - tra-
    { freq: 440.00, dur: 0.6, stanza: 0, verse: 3 }, // A4 - ba-
    { freq: 392.00, dur: 0.4, stanza: 0, verse: 3 }, // G4 - jo
    { freq: 329.63, dur: 0.4, stanza: 0, verse: 3 }, // E4 - brin-
    { freq: 293.66, dur: 0.6, stanza: 0, verse: 3 }, // D4 - dad
    { freq: 261.63, dur: 1.2, stanza: 0, verse: 3 }, // C4 - i-lu-sión

    // I Estrofa: "Desde el campo bravío y la urbe..."
    { freq: 329.63, dur: 0.4, stanza: 1, verse: 0 },
    { freq: 349.23, dur: 0.4, stanza: 1, verse: 0 },
    { freq: 392.00, dur: 0.6, stanza: 1, verse: 0 },
    { freq: 440.00, dur: 0.4, stanza: 1, verse: 0 },
    { freq: 392.00, dur: 0.4, stanza: 1, verse: 0 },
    { freq: 349.23, dur: 0.4, stanza: 1, verse: 0 },
    { freq: 329.63, dur: 0.8, stanza: 1, verse: 0 },

    // "un ejército alegre de paz..."
    { freq: 293.66, dur: 0.4, stanza: 1, verse: 1 },
    { freq: 329.63, dur: 0.4, stanza: 1, verse: 1 },
    { freq: 349.23, dur: 0.6, stanza: 1, verse: 1 },
    { freq: 392.00, dur: 0.4, stanza: 1, verse: 1 },
    { freq: 329.63, dur: 0.4, stanza: 1, verse: 1 },
    { freq: 293.66, dur: 0.4, stanza: 1, verse: 1 },
    { freq: 261.63, dur: 0.8, stanza: 1, verse: 1 },

    // "va tejiendo los mil porvenires..."
    { freq: 261.63, dur: 0.4, stanza: 1, verse: 2 },
    { freq: 329.63, dur: 0.4, stanza: 1, verse: 2 },
    { freq: 392.00, dur: 0.6, stanza: 1, verse: 2 },
    { freq: 440.00, dur: 0.4, stanza: 1, verse: 2 },
    { freq: 493.88, dur: 0.4, stanza: 1, verse: 2 },
    { freq: 523.25, dur: 0.8, stanza: 1, verse: 2 },

    // "al compás del trabajo tenaz..."
    { freq: 440.00, dur: 0.4, stanza: 1, verse: 3 },
    { freq: 392.00, dur: 0.4, stanza: 1, verse: 3 },
    { freq: 329.63, dur: 0.6, stanza: 1, verse: 3 },
    { freq: 293.66, dur: 0.6, stanza: 1, verse: 3 },
    { freq: 261.63, dur: 1.2, stanza: 1, verse: 3 }
  ];

  public play(onProgress: (stanza: number, verse: number) => void, onEnd: () => void) {
    this.stop();
    this.initCtx();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.onProgressCallback = onProgress;
    this.onEndCallback = onEnd;

    let accumTimeMs = 0;
    const tempoFactor = 650; // ms per beat

    this.melodyNotes.forEach((note, index) => {
      const timeoutId = window.setTimeout(() => {
        if (!this.isPlaying || !this.ctx) return;
        this.playTone(note.freq, note.dur * 0.6);
        if (this.onProgressCallback) {
          this.onProgressCallback(note.stanza, note.verse);
        }

        // If last note
        if (index === this.melodyNotes.length - 1) {
          window.setTimeout(() => {
            this.stop();
            if (this.onEndCallback) this.onEndCallback();
          }, note.dur * tempoFactor + 200);
        }
      }, accumTimeMs);

      this.noteTimeouts.push(timeoutId);
      accumTimeMs += note.dur * tempoFactor;
    });
  }

  private playTone(freq: number, durationSec: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Brass/Chime rich harmonic synth
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now); // 1 octave overtone

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.2, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + durationSec + 0.05);
    osc2.stop(now + durationSec + 0.05);
  }

  public stop() {
    this.isPlaying = false;
    this.noteTimeouts.forEach(id => clearTimeout(id));
    this.noteTimeouts = [];
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const senaAnthemPlayer = new SenaAnthemSynth();
