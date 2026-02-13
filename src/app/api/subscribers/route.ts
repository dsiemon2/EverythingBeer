import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface Subscriber {
  id: string;
  birthday: string;
  email?: string;
  optIn: boolean;
  createdAt: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

async function readSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeSubscribers(subscribers: Subscriber[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2), 'utf-8');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { birthday, email, optIn } = body;

    if (!birthday) {
      return NextResponse.json({ error: 'Birthday is required' }, { status: 400 });
    }

    const subscribers = await readSubscribers();

    const newSubscriber: Subscriber = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      birthday,
      email: email || undefined,
      optIn: Boolean(optIn),
      createdAt: new Date().toISOString(),
    };

    subscribers.push(newSubscriber);
    await writeSubscribers(subscribers);

    // TODO: Future integration point for Mailchimp / MailPoet API
    // if (email && optIn) {
    //   await addToMailingList(email, birthday);
    // }

    return NextResponse.json({ success: true, id: newSubscriber.id });
  } catch (error) {
    console.error('Error saving subscriber:', error);
    return NextResponse.json({ error: 'Failed to save subscriber' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const subscribers = await readSubscribers();
    return NextResponse.json({
      count: subscribers.length,
      subscribers,
    });
  } catch (error) {
    console.error('Error reading subscribers:', error);
    return NextResponse.json({ error: 'Failed to read subscribers' }, { status: 500 });
  }
}
