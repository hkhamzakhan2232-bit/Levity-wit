/**
 * Bunny.net Edge Script – Auth API
 * Compatible with levity-wit frontend (register, login, profile, verify)
 *
 * Storage: Supabase (Postgres) via REST API
 * Env: SUPABASE_URL, SUPABASE_SERVICE_KEY, JWT_SECRET, FRONTEND_URL (optional)
 */

import * as BunnySDK from "https://esm.sh/@bunny.net/edgescript-sdk@latest";

function env(name: string, def = ""): string {
  if (typeof Deno !== "undefined" && Deno.env?.get) return Deno.env.get(name) ?? def;
  if (typeof process !== "undefined" && process.env?.[name]) return process.env[name];
  return def;
}

const SUPABASE_URL = env("SUPABASE_URL");
const SUPABASE_KEY = env("SUPABASE_SERVICE_KEY");
const JWT_SECRET = env("JWT_SECRET", "change-me-in-production");
const FRONTEND_URL = env("FRONTEND_URL", "*");

const USERS_TABLE = "users";

function json(data: object, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": FRONTEND_URL,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function corsPreflight() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": FRONTEND_URL,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}

async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );
  const hash = btoa(String.fromCharCode(...new Uint8Array(bits)));
  const saltB64 = btoa(String.fromCharCode(...salt));
  return `pbkdf2:${saltB64}:${hash}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [_, saltB64, hash] = stored.split(":");
  const salt = Uint8Array.from(atob(saltB64), (c) => c.charCodeAt(0));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );
  const computed = btoa(String.fromCharCode(...new Uint8Array(bits)));
  return computed === hash;
}

// Minimal JWT sign (HS256) – no external deps
function base64UrlEncode(buf: Uint8Array): string {
  return btoa(String.fromCharCode(...buf))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function signJWT(payload: object, expDays = 1): Promise<string> {
  const enc = new TextEncoder();
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const body = { ...payload, iat: now, exp: now + expDays * 86400 };
  const headerB64 = base64UrlEncode(enc.encode(JSON.stringify(header)));
  const bodyB64 = base64UrlEncode(enc.encode(JSON.stringify(body)));
  const toSign = enc.encode(`${headerB64}.${bodyB64}`);
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, toSign);
  const sigB64 = base64UrlEncode(new Uint8Array(sig));
  return `${headerB64}.${bodyB64}.${sigB64}`;
}

async function verifyJWT(token: string): Promise<{ userId: string; username: string; email: string } | null> {
  try {
    const enc = new TextEncoder();
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [headerB64, bodyB64, sigB64] = parts;
    const toSign = enc.encode(`${headerB64}.${bodyB64}`);
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const sig = Uint8Array.from(atob(sigB64.replace(/-/g, "+").replace(/_/g, "/")), (c) =>
      c.charCodeAt(0)
    );
    const ok = await crypto.subtle.verify("HMAC", key, sig, toSign);
    if (!ok) return null;
    const payload = JSON.parse(
      atob(bodyB64.replace(/-/g, "+").replace(/_/g, "/") + "==".slice((bodyB64.length % 4) || 4))
    );
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return {
      userId: payload.userId ?? payload.sub,
      username: payload.username ?? "",
      email: payload.email ?? "",
    };
  } catch {
    return null;
  }
}

async function supabaseFetch(
  method: string,
  path: string,
  body?: object,
  opts?: { preferRepresentation?: boolean }
) {
  const url = `${SUPABASE_URL.replace(/\/$/, "")}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  };
  if (opts?.preferRepresentation) headers["Prefer"] = "return=representation";
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function findUserByEmailOrUsername(email?: string, username?: string) {
  const filters: string[] = [];
  if (email) filters.push(`email.eq.${encodeURIComponent(email.toLowerCase())}`);
  if (username) filters.push(`username.eq.${encodeURIComponent(username.toLowerCase())}`);
  if (filters.length === 0) return null;
  const orQuery = filters.join(",");
  const { data, ok } = await supabaseFetch(
    "GET",
    `/rest/v1/${USERS_TABLE}?select=*&or=(${orQuery})&limit=1`
  );
  if (!ok || !Array.isArray(data) || data.length === 0) return null;
  return data[0];
}

async function createUser(user: { username: string; email: string; password: string }) {
  const { data, ok } = await supabaseFetch(
    "POST",
    `/rest/v1/${USERS_TABLE}`,
    {
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
    },
    { preferRepresentation: true }
  );
  if (!ok) return { error: data?.message ?? data?.error_description ?? "Insert failed" };
  const row = Array.isArray(data) ? data[0] : data;
  return { user: row };
}

async function handleRegister(req: Request): Promise<Response> {
  let body: { username?: string; email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return json({ message: "Invalid JSON" }, 400);
  }
  const { username, email, password } = body;
  if (!username || !email || !password) {
    return json({ message: "Username, email, and password are required" }, 400);
  }
  if (password.length < 6) {
    return json({ message: "Password must be at least 6 characters" }, 400);
  }
  const existing = await findUserByEmailOrUsername(email, username);
  if (existing) {
    return json({ message: "Email or username already exists" }, 400);
  }
  const hashed = await hashPassword(password);
  const result = await createUser({ username, email, password: hashed });
  if (result.error) {
    return json({ message: result.error }, 500);
  }
  const u = result.user;
  const token = await signJWT(
    { userId: u.id, username: u.username, email: u.email },
    7
  );
  return json({
    message: "User registered successfully",
    token,
    user: { id: u.id, username: u.username, email: u.email },
  }, 201);
}

async function handleLogin(req: Request): Promise<Response> {
  let body: { username?: string; email?: string; password?: string; rememberMe?: boolean };
  try {
    body = await req.json();
  } catch {
    return json({ message: "Invalid JSON" }, 400);
  }
  const { email, username, password, rememberMe } = body;
  if ((!email && !username) || !password) {
    return json({ message: "Email or username and password are required" }, 400);
  }
  const user = await findUserByEmailOrUsername(email, username);
  if (!user) {
    return json({ message: "Invalid email/username or password" }, 401);
  }
  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return json({ message: "Invalid email/username or password" }, 401);
  }
  const expDays = rememberMe ? 30 : 1;
  const token = await signJWT(
    { userId: user.id, username: user.username, email: user.email },
    expDays
  );
  return json({
    message: "Login successful",
    token,
    user: { id: user.id, email: user.email, username: user.username },
  });
}

function getBearerToken(req: Request): string | null {
  const h = req.headers.get("authorization");
  if (!h?.startsWith("Bearer ")) return null;
  return h.slice(7).trim();
}

async function handleProfile(req: Request): Promise<Response> {
  const token = getBearerToken(req);
  const payload = token ? await verifyJWT(token) : null;
  if (!payload) {
    return json({ message: "Access token required" }, 401);
  }
  const user = await findUserByEmailOrUsername(payload.email, payload.username);
  if (!user) {
    return json({ message: "User not found" }, 404);
  }
  const { password: _, ...safe } = user;
  return json({ user: safe });
}

async function handleVerify(req: Request): Promise<Response> {
  const token = getBearerToken(req);
  const payload = token ? await verifyJWT(token) : null;
  if (!payload) {
    return json({ message: "Access token required" }, 401);
  }
  return json({ valid: true, user: payload });
}

async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return corsPreflight();

  const url = new URL(req.url);
  const path = url.pathname.replace(/\/$/, "") || "/";

  if (path === "/api/register" && req.method === "POST") return handleRegister(req);
  if (path === "/api/login" && req.method === "POST") return handleLogin(req);
  if (path === "/api/profile" && req.method === "GET") return handleProfile(req);
  if (path === "/api/verify" && req.method === "GET") return handleVerify(req);

  if (path === "/" || path === "/health") {
    return json({ ok: true, service: "levity-wit-auth", edge: "bunny" });
  }

  return json({ message: "Not found" }, 404);
}

BunnySDK.net.http.serve(handler);
