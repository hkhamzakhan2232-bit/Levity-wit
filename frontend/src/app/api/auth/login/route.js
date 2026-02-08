import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

let cached = global._mongo
if (!cached) cached = global._mongo = { conn: null }

async function connect() {
  if (cached.conn) return cached.conn
  cached.conn = await mongoose.connect(MONGODB_URI)
  return cached.conn
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, lowercase: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  createdAt: { type: Date, default: Date.now }
})
const User = mongoose.models.User || mongoose.model('User', userSchema)

export async function POST(request) {
  try {
    if (!MONGODB_URI || !JWT_SECRET) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }
    await connect()
    const { email, username, password, rememberMe } = await request.json()
    if ((!email && !username) || !password) {
      return NextResponse.json({ message: 'Email or username and password are required' }, { status: 400 })
    }
    const user = await User.findOne({
      $or: [{ email: email?.toLowerCase() }, { username: username?.toLowerCase() }]
    })
    if (!user) {
      return NextResponse.json({ message: 'Invalid email/username or password' }, { status: 401 })
    }
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return NextResponse.json({ message: 'Invalid email/username or password' }, { status: 401 })
    }
    const tokenExpiry = rememberMe ? '30d' : '1d'
    const token = jwt.sign({ userId: user._id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: tokenExpiry })
    return NextResponse.json({ message: 'Login successful', token, user: { id: user._id, email: user.email, username: user.username } })
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
