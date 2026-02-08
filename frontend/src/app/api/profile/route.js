import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
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

export async function GET(request) {
  try {
    if (!MONGODB_URI || !JWT_SECRET) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }
    await connect()
    const auth = request.headers.get('authorization')
    const token = auth?.split(' ')[1]
    if (!token) return NextResponse.json({ message: 'Access token required' }, { status: 401 })
    let payload
    try {
      payload = jwt.verify(token, JWT_SECRET)
    } catch (err) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 403 })
    }
    const user = await User.findById(payload.userId).select('-password')
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })
    return NextResponse.json({ user })
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
