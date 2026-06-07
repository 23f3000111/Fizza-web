// Minimal JSON-file collection store. One JSON array per collection file.
// Async API with atomic writes (write tmp -> rename) + serialized mutations.

import fs from "node:fs/promises";
import path from "node:path";
import { newId } from "./ids";
import type { Category, SubCategory, FilterField, Listing, Lead, Inquiry, ContactMsg } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

type Row = Record<string, any> & { id: string; createdAt?: string };

export class Collection<T extends Row> {
  name: string;
  dir: string;
  file: string;
  private lock: Promise<unknown> = Promise.resolve();

  constructor(name: string, dir: string = DATA_DIR) {
    this.name = name;
    this.dir = dir;
    this.file = path.join(dir, `${name}.json`);
  }

  private async ensure() {
    await fs.mkdir(this.dir, { recursive: true });
    try {
      await fs.access(this.file);
    } catch {
      await fs.writeFile(this.file, "[]", "utf8");
    }
  }

  private async read(): Promise<T[]> {
    await this.ensure();
    const raw = await fs.readFile(this.file, "utf8");
    try {
      return JSON.parse(raw || "[]") as T[];
    } catch {
      return [];
    }
  }

  private async write(rows: T[]) {
    await this.ensure();
    const tmp = `${this.file}.${process.pid}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(rows, null, 2), "utf8");
    await fs.rename(tmp, this.file);
  }

  private mutate<R>(fn: (rows: T[]) => R | Promise<R>): Promise<R> {
    const run = this.lock.then(async () => {
      const rows = await this.read();
      const result = await fn(rows);
      await this.write(rows);
      return result;
    });
    this.lock = run.then(
      () => {},
      () => {}
    );
    return run as Promise<R>;
  }

  async find(filter?: Partial<T>): Promise<T[]> {
    const rows = await this.read();
    if (!filter) return rows;
    return rows.filter((r) => Object.entries(filter).every(([k, v]) => (r as any)[k] === v));
  }

  async get(id: string): Promise<T | null> {
    const rows = await this.read();
    return rows.find((r) => r.id === id) || null;
  }

  async insert(obj: Partial<T> & Record<string, any>): Promise<T> {
    return this.mutate((rows) => {
      const row = { id: obj.id || newId(), createdAt: new Date().toISOString(), ...obj } as T;
      if (!row.id) row.id = newId();
      rows.push(row);
      return row;
    });
  }

  async update(id: string, patch: Partial<T>): Promise<T | null> {
    return this.mutate((rows) => {
      const i = rows.findIndex((r) => r.id === id);
      if (i === -1) return null;
      rows[i] = { ...rows[i], ...patch, id, updatedAt: new Date().toISOString() };
      return rows[i];
    });
  }

  async remove(id: string): Promise<boolean> {
    return this.mutate((rows) => {
      const i = rows.findIndex((r) => r.id === id);
      if (i === -1) return false;
      rows.splice(i, 1);
      return true;
    });
  }

  async count(): Promise<number> {
    return (await this.read()).length;
  }
}

export const db = {
  categories: new Collection<Category>("categories"),
  subcategories: new Collection<SubCategory>("subcategories"),
  filterFields: new Collection<FilterField>("filterFields"),
  listings: new Collection<Listing>("listings"),
  leads: new Collection<Lead>("leads"),
  inquiries: new Collection<Inquiry>("inquiries"),
  contacts: new Collection<ContactMsg>("contacts"),
};
