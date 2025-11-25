# PlantPetz 🌱

An iOS-first React Native app that lets users add plants, chat with them via AI, and auto-save chats as journals.

## Tech Stack

- **React Native** (Expo managed workflow)
- **Expo SDK 54** (latest)
- **TypeScript**
- **Firebase** (Auth, Firestore, Storage)
- **Virag's AI API** (Chat & Plant Detection)
- **OneSignal** (Email notifications)
- **React Native Reanimated** (Animations)
- **EAS** (Build & Distribution)

## Project Structure

```
plantPetz/
├── app/                    # Expo Router screens
├── assets/                 # PNG images, icons, splash screens
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
│   ├── use-auth.ts        # Authentication hook
│   ├── use-plants.ts      # Plant management
│   ├── use-chat.ts        # Chat functionality
│   └── use-journals.ts    # Journal operations
├── screens/               # Screen components (to be created)
├── services/
│   ├── api/              # Virag's API integration
│   │   └── virag-api.ts  # /chat, /detect-plant
│   └── firebase/         # Firebase services
│       ├── config.ts     # Firebase initialization
│       ├── auth.ts       # Authentication
│       ├── firestore.ts  # Database operations
│       └── storage.ts    # File uploads
├── store/                # Global state management
│   └── auth-context.tsx  # Auth context provider
├── types/                # TypeScript type definitions
│   └── index.ts
├── utils/                # Utility functions
│   ├── image.ts         # Image handling
│   ├── validation.ts    # Form validation
│   └── date.ts          # Date formatting
├── app.json             # Expo configuration
├── eas.json             # EAS build configuration
└── .env.example         # Environment variables template
```

## Setup Instructions

### 1. Install Dependencies

   ```bash
   npm install
   ```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

   ```bash
cp .env.example .env
```

Fill in your credentials:
- Firebase configuration (from Firebase Console)
- Virag's AI API URL and key
- OneSignal App ID
- Google iOS Client ID

### 3. Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password & Google)
3. Create Firestore database
4. Enable Storage
5. Copy configuration to `.env`

### 4. Configure Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /plants/{plantId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    match /journals/{journalId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

### 5. Google Sign-In Setup (iOS)

1. Get iOS Client ID from Google Cloud Console
2. Add to `.env` as `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`
3. Update `app.json` with reversed client ID

### 6. EAS Setup

```bash
npm install -g eas-cli
eas login
eas build:configure
```

### 7. Run the App

```bash
# iOS Simulator (macOS only)
npm run ios

# Start development server
npm start
```

## Core Features (MVP - Dec 15)

### ✅ Completed Setup
- [x] Project initialization
- [x] Firebase integration
- [x] API service layer
- [x] Type definitions
- [x] Custom hooks
- [x] Utility functions
- [x] Environment configuration

### 🚧 To Be Implemented

1. **Onboarding Flow**
   - Splash screen
   - Email-OTP authentication
   - Google Sign-In
   - Profile setup
   - Permission requests

2. **Add Plant**
   - Camera/gallery picker
   - AI plant detection
   - Plant profile creation

3. **Chat Interface**
   - Chat UI with typing indicator
   - Text & image messages
   - AI responses
   - Message persistence

4. **Journal**
   - Auto-save chat sessions
   - Journal list view
   - Read-only journal viewer

## Firestore Schema

```typescript
users/{uid}
  - name: string
  - email: string
  - level?: string
  - city?: string
  - avatarUrl?: string
  - createdAt: timestamp

plants/{plantId}
  - userId: string
  - name: string
  - type: string
  - imageUrl: string
  - createdAt: timestamp

journals/{journalId}
  - userId: string
  - plantId: string
  - date: timestamp
  - summary?: string
  - messages: [
      {
        role: "user" | "ai"
        text: string
        imageUrl?: string
        timestamp: timestamp
      }
    ]
```

## API Endpoints

### Virag's AI API

**POST /detect-plant**
```json
Request: {
  "userId": "string",
  "imageUrl": "string"
}
Response: {
  "name": "string",
  "type": "string",
  "confidence": number
}
```

**POST /chat**
```json
Request: {
  "userId": "string",
  "plantId": "string",
  "message": "string",
  "imageUrl?": "string",
  "context?": "string"
}
Response: {
  "reply_text": "string",
  "tags?": ["string"],
  "sentiment?": "string"
}
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint

## Development Guidelines

- Use **TypeScript** everywhere
- Keep components small and pure
- Extract business logic into hooks
- Use components from [React Native Reusables](https://reactnativereusables.com/)
- Follow **kebab-case** for files, **PascalCase** for components, **camelCase** for variables
- All assets should be **PNG format**

## Build & Deploy

### iOS Build (EAS)

```bash
# Development build
eas build --platform ios --profile development

# Preview build
eas build --platform ios --profile preview

# Production build
eas build --platform ios --profile production
```

### TestFlight Distribution

```bash
eas submit --platform ios
```

## License

Private - Bombay Blokes © 2025
