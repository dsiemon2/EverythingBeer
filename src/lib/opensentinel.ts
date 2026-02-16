/**
 * OpenSentinel Integration Service
 * AI-powered assistant integration for EverythingBeer
 */

class OpenSentinelService {
  private url: string;
  private apiKey: string | null;
  private appName: string;
  private appType: string;
  private enabled: boolean;
  private registered: boolean;

  constructor() {
    this.url = process.env.OPENSENTINEL_URL || 'http://localhost:8030';
    this.apiKey = process.env.OPENSENTINEL_API_KEY || null;
    this.appName = 'EverythingBeer';
    this.appType = 'beer-discovery';
    this.enabled = process.env.OPENSENTINEL_ENABLED === 'true';
    this.registered = false;
  }

  async register(): Promise<void> {
    if (!this.enabled || this.registered) return;
    try {
      const res = await fetch(`${this.url}/api/sdk/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.appName, type: this.appType }),
      });
      if (res.ok) {
        const d = await res.json();
        this.apiKey = d.apiKey;
        this.registered = true;
      }
    } catch {
      console.warn('[OpenSentinel] Registration failed');
    }
  }

  async chat(message: string, context?: Record<string, unknown>): Promise<Record<string, unknown> | null> {
    if (!this.enabled || !this.apiKey) return null;
    try {
      const res = await fetch(`${this.url}/api/sdk/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ message, context, useTools: true }),
      });
      if (res.ok) return await res.json();
    } catch {}
    return null;
  }

  async notify(channel: string, message: string): Promise<void> {
    if (!this.enabled || !this.apiKey) return;
    try {
      await fetch(`${this.url}/api/sdk/notify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ channel, message }),
      });
    } catch {}
  }

  async storeMemory(content: string, type: string = 'semantic'): Promise<void> {
    if (!this.enabled || !this.apiKey) return;
    try {
      await fetch(`${this.url}/api/sdk/memory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ content, type, importance: 5 }),
      });
    } catch {}
  }

  isEnabled(): boolean {
    return this.enabled && this.registered;
  }
}

export const openSentinelService = new OpenSentinelService();
