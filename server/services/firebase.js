// 🔥 Force REST mode (fix Node/OpenSSL issues)
process.env.GOOGLE_CLOUD_DISABLE_GRPC = 'true';

import 'dotenv/config';
import admin from 'firebase-admin';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// 🔒 Required ENV variables
const requiredEnvVars = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY'
];

// ❌ Validate ENV
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
}

// 🔧 Clean and normalize private key
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

// Remove wrapping quotes if accidentally added
privateKey = privateKey.replace(/^"(.*)"$/s, '$1');

// Convert \n → real new lines
privateKey = privateKey.replace(/\\n/g, '\n');

// Remove any carriage returns (Windows line endings)
privateKey = privateKey.replace(/\r/g, '');

// Trim whitespace
privateKey = privateKey.trim();

// 🔧 FIX: Convert PKCS#1 → PKCS#8 format if needed
// Old Firebase keys use PKCS#1 (RSA PRIVATE KEY) which OpenSSL 3 dropped support for
// New keys use PKCS#8 (PRIVATE KEY) which works fine
if (privateKey.includes('BEGIN RSA PRIVATE KEY')) {
  // This is PKCS#1 format - the problematic old format
  // We need to re-wrap it as PKCS#8
  const { createPrivateKey } = await import('node:crypto');
  try {
    const keyObject = createPrivateKey({
      key: privateKey,
      format: 'pem',
    });
    privateKey = keyObject.export({
      type: 'pkcs8',
      format: 'pem'
    });
    console.log('✅ Private key converted from PKCS#1 to PKCS#8');
  } catch (err) {
    throw new Error(`❌ Failed to convert private key: ${err.message}`);
  }
}

// 🚨 Validate key format
if (!privateKey.includes('BEGIN PRIVATE KEY') && !privateKey.includes('BEGIN RSA PRIVATE KEY')) {
  throw new Error('❌ Invalid Firebase Private Key format. Check your FIREBASE_PRIVATE_KEY env variable.');
}

// 🚀 Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey
    })
  });

  console.log("✅ Firebase Admin initialized (SAFE MODE)");
}

// 🔥 Use modular Firestore
export const db = getFirestore();

// 🔥 Force REST transport (avoids gRPC/OpenSSL issues)
db.settings({
  preferRest: true
});

// ✅ Export Timestamp
export { Timestamp };

// 🔄 Serialize Firestore data safely
export function serializeFirestore(value) {
  if (value === null || value === undefined) return value;

  if (Array.isArray(value)) {
    return value.map(serializeFirestore);
  }

  if (value && typeof value.toDate === 'function') {
    return value.toDate().toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === 'object' && value.constructor.name === 'Object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        serializeFirestore(nestedValue)
      ])
    );
  }

  return value;
}

// 🔄 Map Firestore document
export function mapDocument(snapshot) {
  if (!snapshot.exists) return null;

  return {
    id: snapshot.id,
    ...serializeFirestore(snapshot.data())
  };
}