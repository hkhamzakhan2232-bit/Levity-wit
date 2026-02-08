import bcrypt from 'bcrypt';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
    credentials: false
  })
);
app.use(morgan('dev'));

const JWT_SECRET = process.env.JWT_SECRET || 'change_me';
const users = [];

function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const exists =
      users.find((u) => u.username === username) ||
      users.find((u) => u.email === email);
    if (exists) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = {
      id: String(Date.now()),
      username,
      email,
      passwordHash: hash
    };
    users.push(user);
    const token = createToken({ id: user.id, username: user.username });
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Missing credentials' });
    }
    const user =
      users.find((u) => u.username === username) ||
      users.find((u) => u.email === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = createToken({ id: user.id, username: user.username });
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // server started
});
