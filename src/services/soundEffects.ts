import { AtmosphereType } from '../types';

class SoundEffectsService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private currentAmbienceNodes: { stop: () => void }[] = [];
  private activeAtmosphere: AtmosphereType | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.85;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.85, this.ctx.currentTime, 0.05);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Realistic Page Turning Sound (صوت تقليب الورق)
   * Simulates broadsheet paper moving through air with fiber crinkles
   */
  public playPageFlip() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const dur = 0.42;

    // Noise buffer for swoosh and crinkles
    const bufferSize = this.ctx.sampleRate * dur;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Pinkish noise
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2800, t);
    filter.frequency.exponentialRampToValueAtTime(500, t + dur);
    filter.Q.setValueAtTime(1.8, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.55, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start(t);
    whiteNoise.stop(t + dur);

    // Subtle paper crisp snap at start
    const snapOsc = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snapOsc.type = 'triangle';
    snapOsc.frequency.setValueAtTime(450, t + 0.02);
    snapOsc.frequency.exponentialRampToValueAtTime(80, t + 0.12);
    snapGain.gain.setValueAtTime(0.18, t + 0.02);
    snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    snapOsc.connect(snapGain);
    snapGain.connect(this.masterGain);
    snapOsc.start(t + 0.02);
    snapOsc.stop(t + 0.12);
  }

  /**
   * Pencil Scratch Sound (صوت القلم الرصاص على ملمس الورق)
   */
  public playPencilScratch(speed: number = 1) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const dur = Math.min(0.08, 0.03 + speed * 0.02);

    const bufferSize = Math.floor(this.ctx.sampleRate * dur);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.8;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2200 + Math.random() * 800, t);

    const gain = this.ctx.createGain();
    const vol = Math.min(0.25, 0.08 + speed * 0.05);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + dur);
  }

  /**
   * Ballpoint Pen Scratch Sound (صوت القلم الجاف الحقيقي)
   */
  public playBallpointScratch() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const dur = 0.05;

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1400 + Math.random() * 400, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + dur);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, t);
    filter.Q.value = 3.5;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + dur);
  }

  /**
   * Eraser Rub Sound (صوت الاستيكة ومسح الورق)
   */
  public playEraserRub() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const dur = 0.12;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320 + Math.random() * 80, t);
    osc.frequency.linearRampToValueAtTime(540, t + dur * 0.5);
    osc.frequency.linearRampToValueAtTime(280, t + dur);

    // Friction noise
    const bufferSize = Math.floor(this.ctx.sampleRate * dur);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.4;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, t);
    filter.Q.value = 1.5;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    osc.connect(gain);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + dur);
    noise.start(t);
    noise.stop(t + dur);
  }

  /**
   * Pencil Sharpener Sound (صوت براية القلم الخشبية)
   * 3 crisp spiral wooden shaving crunches and razor peel
   */
  public playPencilSharpener() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;

    for (let i = 0; i < 3; i++) {
      const stepT = t + i * 0.22;
      const dur = 0.18;

      // Wood peeling noise
      const bufferSize = Math.floor(this.ctx.sampleRate * dur);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) {
        output[j] = (Math.random() * 2 - 1) * 0.7;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400 - i * 150, stepT);
      filter.frequency.exponentialRampToValueAtTime(600, stepT + dur);
      filter.Q.setValueAtTime(2.2, stepT);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, stepT);
      gain.gain.linearRampToValueAtTime(0.35, stepT + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, stepT + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(stepT);
      noise.stop(stepT + dur);

      // Ratchet click
      const click = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      click.type = 'triangle';
      click.frequency.setValueAtTime(900 + i * 100, stepT + 0.03);
      click.frequency.exponentialRampToValueAtTime(120, stepT + 0.09);
      clickGain.gain.setValueAtTime(0.2, stepT + 0.03);
      clickGain.gain.exponentialRampToValueAtTime(0.001, stepT + 0.09);

      click.connect(clickGain);
      clickGain.connect(this.masterGain);
      click.start(stepT + 0.03);
      click.stop(stepT + 0.09);
    }
  }

  /**
   * Paper Touch / Rustle (ملمس الورق عند اللمس)
   */
  public playPaperTouch() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const dur = 0.07;

    const bufferSize = Math.floor(this.ctx.sampleRate * dur);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.35;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, t);
    filter.Q.setValueAtTime(1.0, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + dur);
  }

  /**
   * Paper Creasing / Crinkling (صوت ثني وتكسر ألياف الورق عند الضغط المتكرر)
   */
  public playPaperCrease() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const dur = 0.22;

    const bufferSize = Math.floor(this.ctx.sampleRate * dur);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Crackly paper pops
      const crackle = Math.random() > 0.92 ? 1.5 : 0.4;
      output[i] = (Math.random() * 2 - 1) * crackle;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, t);
    filter.frequency.linearRampToValueAtTime(800, t + dur);
    filter.Q.setValueAtTime(1.8, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.02, t);
    gain.gain.linearRampToValueAtTime(0.42, t + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + dur);
  }

  /**
   * Stamp Thud Sound (صوت الختم الصحفي المصري العتيق)
   */
  public playStampSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;

    // Heavy wooden block thud
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.15);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.15);

    // Ink slap noise
    const noiseBuffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.05), this.ctx.sampleRate);
    const out = noiseBuffer.getChannelData(0);
    for (let i = 0; i < out.length; i++) out[i] = (Math.random() * 2 - 1) * 0.5;
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    noise.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start(t);
    noise.stop(t + 0.05);
  }

  /**
   * Stop previous ambience
   */
  public stopAmbience() {
    this.currentAmbienceNodes.forEach(node => {
      try { node.stop(); } catch {}
    });
    this.currentAmbienceNodes = [];
    this.activeAtmosphere = null;
  }

  /**
   * Start procedural mood ambience (الخلفيات الصوتية للأجواء)
   */
  public setAtmosphereAmbience(type: AtmosphereType) {
    if (this.activeAtmosphere === type) return;
    this.stopAmbience();
    this.activeAtmosphere = type;

    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    // Soft organic ambience synth
    if (type === 'morning') {
      // Soft gentle morning breeze
      const noiseNode = this.createGentleWind(0.03, 350);
      this.currentAmbienceNodes.push(noiseNode);
    } else if (type === 'night' || type === 'lamp') {
      // Soft cozy room warmth
      const roomHum = this.createGentleWind(0.02, 180);
      this.currentAmbienceNodes.push(roomHum);
    } else if (type === 'horror') {
      // Subtle rain & eerie wind
      const rain = this.createGentleWind(0.06, 800);
      this.currentAmbienceNodes.push(rain);
    } else if (type === 'cafe') {
      // Baladi café ambient warmth
      const cafeGlow = this.createGentleWind(0.04, 450);
      this.currentAmbienceNodes.push(cafeGlow);
    }
  }

  private createGentleWind(targetVol: number, freq: number) {
    if (!this.ctx || !this.masterGain) return { stop: () => {} };
    const dur = 2.0;
    const bufferSize = this.ctx.sampleRate * dur;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.2;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(targetVol, this.ctx.currentTime + 1.0);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();

    return {
      stop: () => {
        try {
          if (this.ctx) {
            gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
            setTimeout(() => {
              try { noise.stop(); } catch {}
            }, 600);
          } else {
            noise.stop();
          }
        } catch {}
      }
    };
  }
}

export const soundManager = new SoundEffectsService();
