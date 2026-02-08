import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

if (!MONGODB_URI) {
  console.warn('MONGODB_URI is not set')
}
if (!JWT_SECRET) {
  console.warn('JWT_SECRET is not set')
}

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
    const { username, email, password } = await request.json()
    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Username, email, and password are required' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 })
    }
    const existing = await User.findOne({ $or: [{ email }, { username }] })
    if (existing) {
      return NextResponse.json({ message: 'Email or username already exists' }, { status: 400 })
    }
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)
    const user = await User.create({ username, email, password: hash })
    const token = jwt.sign({ userId: user._id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
    return NextResponse.json({ message: 'User registered successfully', token, user: { id: user._id, username: user.username, email: user.email } }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
