# Color System Standardization Plan

**Palette:**
- **Primary**: `#398779` (Teal Green)
- **Background**: `#F9FBFB` (Pale Teal-White)
- **Text Main**: `#2C3333` (Dark Charcoal)
- **Accent**: `#D4A373` (Papyrus/Camel)

**Tasks:**

1.  **Configuration**:
    - [ ] Update `app/tailwind.config.js` to include custom color extensions.

2.  **Layouts & Navigation**:
    - [ ] `app/app/(tabs)/_layout.tsx`: Update tab bar active colors and AR button color.
    - [ ] `app/app/_layout.tsx`: Ensure global background is correct (if applicable).

3.  **Main Screens**:
    - [ ] `app/app/(tabs)/index.tsx` (Home): Update headers, icon buttons, search bar, text colors.
    - [ ] `app/app/(tabs)/community.tsx` (Community): Update headers, active chips, FAB.
    - [ ] `app/app/(tabs)/ai.tsx` (AI): Update headers, user bubbles (primary), send button.
    - [ ] `app/app/(tabs)/profile.tsx` (Profile): Update headers, stats text, logout button.
    - [ ] `app/app/(tabs)/ar.tsx` (AR): Update UI overlays (buttons, text) to match theme.

4.  **Detail & Sub-screens**:
    - [ ] `app/app/book-detail.tsx`: Update "Start AR" button, rating stars (accent), tags.
    - [ ] `app/app/post-detail.tsx`: Update headers, follow button, floating input bar icons.
    - [ ] `app/app/bookshelf.tsx`: Update header, progress bars (maybe accent?), buttons.
    - [ ] `app/app/notifications.tsx`: Update header, icon colors.
    - [ ] `app/app/settings.tsx`: Update header, switch colors.
    - [ ] `app/app/sign-in.tsx`: Update active tabs, action buttons.
    - [ ] `app/app/scan.tsx`: Update scan line (primary), buttons.
    - [ ] `app/app/voice-input.tsx`: Update microphone button (primary).

5.  **Review**:
    - [ ] Check for any remaining `bg-blue-600` or `text-gray-900` that clash with the new theme.