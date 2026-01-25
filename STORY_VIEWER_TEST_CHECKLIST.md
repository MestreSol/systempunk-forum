# ✅ Story Viewer Modernization - Test Checklist

## Pre-Testing Setup
- [ ] Development server is running (`npm run dev`)
- [ ] Browser DevTools open (F12)
- [ ] Test on both desktop (>1024px) and mobile (<1024px) viewports

## 🎯 Core Functionality Tests

### Page Load & Animations
- [ ] ✨ Reading progress bar appears at top (lime-cyan gradient)
- [ ] ✨ Header content slides up smoothly
- [ ] ✨ Cards fade in with staggered timing
- [ ] ✨ No layout shift or flashing
- [ ] ⚡ Page loads within 2 seconds

### Navigation & Back Button
- [ ] 🔙 "Voltar" button returns to `/about/historias`
- [ ] 📄 "Ver Markdown" opens file in new tab (if `filePath` exists)
- [ ] 🔗 "Copiar Link" copies URL to clipboard
- [ ] 📋 Feedback shows "Copiado!" for 2 seconds
- [ ] 🔄 "Compartilhar" triggers native share (mobile) or copies link

## 📖 Table of Contents Tests

### Desktop (≥1024px width)
- [ ] 📌 TOC sidebar visible on left side
- [ ] 📌 Fixed position (doesn't scroll with content)
- [ ] 📌 Shows only H2 and H3 headings
- [ ] 📌 Active section highlighted in lime-400
- [ ] 📌 Smooth scroll when clicking TOC item
- [ ] 📌 Active section updates while scrolling
- [ ] 📌 H3 items indented more than H2
- [ ] 📌 Sidebar has max-height with overflow scroll

### Mobile (<1024px width)
- [ ] 📱 TOC sidebar hidden
- [ ] 📱 FAB button visible in bottom-right (lime-600 circle)
- [ ] 📱 Menu icon (☰) visible in FAB
- [ ] 📱 Tap FAB opens bottom sheet
- [ ] 📱 Bottom sheet covers 70% of viewport
- [ ] 📱 Sheet header shows "📖 Índice"
- [ ] 📱 Content scrollable inside sheet
- [ ] 📱 Active section highlighted
- [ ] 📱 Tap heading scrolls to section and closes sheet
- [ ] 📱 Swipe down or tap outside closes sheet

## 📊 Reading Progress Features

### Progress Bar
- [ ] 🟢 Bar starts at 0% width on page load
- [ ] 🟢 Width increases as user scrolls down
- [ ] 🟢 Reaches 100% at bottom of page
- [ ] 🟢 Smooth animation (not jumpy)
- [ ] 🟢 Gradient visible (lime → cyan)
- [ ] 🟢 Fixed at top, stays visible while scrolling

### Scroll-to-Top Button
- [ ] ⬆️ Hidden when page top (<400px scroll)
- [ ] ⬆️ Appears after scrolling 400px
- [ ] ⬆️ Visible on mobile only (hidden on desktop)
- [ ] ⬆️ Positioned bottom-left
- [ ] ⬆️ Tap scrolls smoothly to top
- [ ] ⬆️ Fades in/out with animation

### Reading Time Badge
- [ ] ⏱️ Badge shows reading time estimate
- [ ] ⏱️ Format: "X min" (e.g., "5 min")
- [ ] ⏱️ Visible in header badges
- [ ] ⏱️ Also shown in metadata tab
- [ ] ⏱️ Calculation: ~200 words per minute

## 🖼️ Header Image Tests

### With `headerImage` (when present)
- [ ] 🎨 Full-width hero image displayed
- [ ] 🎨 Height: 400px (mobile), 500px (desktop)
- [ ] 🎨 Gradient overlay visible (dark bottom)
- [ ] 🎨 Title overlaid on image (readable)
- [ ] 🎨 Badges overlaid on image
- [ ] 🎨 Action buttons have backdrop blur
- [ ] 🎨 Rounded corners (2xl = ~16px)
- [ ] 🎨 Image loads with priority (no delay)

### Without `headerImage` (standard)
- [ ] 📝 Standard header layout shown
- [ ] 📝 Title at top (lime-200)
- [ ] 📝 Action buttons in row
- [ ] 📝 Badges below title
- [ ] 📝 Tags shown if present
- [ ] 📝 No image placeholder or error

## 📑 Tabs & Content Organization

### Tab Navigation
- [ ] 📂 Three tabs visible: "História", "Conexões", "Metadados"
- [ ] 📂 "História" selected by default
- [ ] 📂 Tab switches smoothly (no page jump)
- [ ] 📂 Active tab highlighted
- [ ] 📂 Connection count shown in "Conexões" tab (if >0)

### História Tab
- [ ] 📖 Summary card shown (if summary exists)
- [ ] 📖 Summary title: "Resumo" in cyan-200
- [ ] 📖 Intro card shown (if intro exists)
- [ ] 📖 Intro title: "Introdução" in cyan-200
- [ ] 📖 Main content card visible
- [ ] 📖 Markdown rendered correctly
- [ ] 📖 H2 headings have generated IDs
- [ ] 📖 H3 headings have generated IDs
- [ ] 📖 Blockquotes styled with lime border
- [ ] 📖 Code blocks have dark background
- [ ] 📖 Inline code has lime text on dark bg
- [ ] 📖 Links are cyan-400 with underline
- [ ] 📖 Images rounded with shadow
- [ ] 📖 Tables have borders and styled headers

### Conexões Tab (Related Stories)
- [ ] 🔗 Tab hidden if no connections
- [ ] 🔗 Tab shows count if connections exist
- [ ] 🔗 Grid layout (1 col mobile, 2 cols desktop)
- [ ] 🔗 Up to 6 stories shown
- [ ] 🔗 Each card shows: title, summary, badges
- [ ] 🔗 Chevron icon (►) on right side
- [ ] 🔗 Hover: border glows lime-500/50
- [ ] 🔗 Hover: title changes to lime-200
- [ ] 🔗 Hover: shadow appears
- [ ] 🔗 Hover: chevron changes to lime-400
- [ ] 🔗 Click navigates to story page
- [ ] 🔗 Empty state: "Nenhuma história conectada"

### Metadados Tab
- [ ] ℹ️ Card header: "Informações da História"
- [ ] ℹ️ Grid layout (1 col mobile, 2 cols desktop)
- [ ] ℹ️ Shows: Autor (if present)
- [ ] ℹ️ Shows: Era (title case)
- [ ] ℹ️ Shows: Categoria (title case)
- [ ] ℹ️ Shows: Status (title case)
- [ ] ℹ️ Shows: Importância (title case)
- [ ] ℹ️ Shows: Última Modificação (BR format)
- [ ] ℹ️ Shows: Conexões (count)
- [ ] ℹ️ Shows: Tempo de Leitura (minutes)
- [ ] ℹ️ Tags section below divider
- [ ] ℹ️ All tags displayed with # prefix

## 🎨 Visual & Styling Tests

### Colors
- [ ] 🎨 Primary headings: Lime-200
- [ ] 🎨 Secondary headings: Cyan-200
- [ ] 🎨 Body text: Zinc-300
- [ ] 🎨 Muted text: Zinc-400/500
- [ ] 🎨 Backgrounds: Zinc-800/900/950
- [ ] 🎨 Borders: Zinc-700/800
- [ ] 🎨 Active highlights: Lime-400

### Typography
- [ ] 📝 H1: 4xl (mobile), 5xl (desktop)
- [ ] 📝 H2: 2xl, bold
- [ ] 📝 H3: xl, bold
- [ ] 📝 Body: Base size, relaxed leading
- [ ] 📝 All text readable on dark bg

### Spacing & Layout
- [ ] 📐 Proper padding on all cards
- [ ] 📐 Consistent gap between elements
- [ ] 📐 Max-width container (5xl = ~896px)
- [ ] 📐 Responsive padding (4/6/8)
- [ ] 📐 No overflow on mobile

### Badges
- [ ] 🏷️ Category badge: Custom color from story
- [ ] 🏷️ Importance badge: Secondary variant
- [ ] 🏷️ Status badge: Secondary variant
- [ ] 🏷️ Reading time badge: Outline variant
- [ ] 🏷️ Tag badges: Outline variant, small
- [ ] 🏷️ All badges: Proper spacing, readable

## 🔄 Interactive Element Tests

### Hover States
- [ ] 🖱️ Buttons: Color change on hover
- [ ] 🖱️ Links: Underline decoration change
- [ ] 🖱️ TOC items: Background highlight
- [ ] 🖱️ Related story cards: Border/shadow/color
- [ ] 🖱️ All hover effects smooth (transition)

### Click/Tap Interactions
- [ ] 👆 All buttons respond immediately
- [ ] 👆 No double-tap delay on mobile
- [ ] 👆 Tap targets ≥44px (accessibility)
- [ ] 👆 Visual feedback on click

### Smooth Scrolling
- [ ] 🌊 TOC navigation scrolls smoothly
- [ ] 🌊 Scroll-to-top scrolls smoothly
- [ ] 🌊 No jarring jumps
- [ ] 🌊 Target section positioned correctly (scroll-mt-24)

## 🚀 Performance Tests

### Load Time
- [ ] ⚡ Initial page load <2s (good connection)
- [ ] ⚡ No render blocking resources
- [ ] ⚡ Images lazy load (except hero)
- [ ] ⚡ Smooth animations (60fps)

### Scroll Performance
- [ ] ⚡ Smooth scrolling at 60fps
- [ ] ⚡ No lag when updating progress bar
- [ ] ⚡ No layout recalculation lag
- [ ] ⚡ Active section updates without jank

### Memory & Resources
- [ ] 💾 No memory leaks on scroll
- [ ] 💾 Event listeners cleaned up
- [ ] 💾 No console errors
- [ ] 💾 No console warnings (except regex style)

## 📱 Responsive Design Tests

### Desktop (≥1024px)
- [ ] 💻 Sidebar visible, properly positioned
- [ ] 💻 Content shifted right (ml-72)
- [ ] 💻 Two-column related stories grid
- [ ] 💻 Two-column metadata grid
- [ ] 💻 No scroll-to-top button
- [ ] 💻 Proper spacing and margins

### Tablet (768px-1023px)
- [ ] 📱 No sidebar (use bottom sheet)
- [ ] 📱 Full-width content
- [ ] 📱 Two-column related stories
- [ ] 📱 Two-column metadata
- [ ] 📱 FAB buttons visible

### Mobile (<768px)
- [ ] 📱 Single column layout
- [ ] 📱 Stacked elements
- [ ] 📱 Reduced padding (4px)
- [ ] 📱 Smaller hero image (400px)
- [ ] 📱 Touch-friendly tap areas
- [ ] 📱 Bottom sheet works well

## ♿ Accessibility Tests

### Keyboard Navigation
- [ ] ⌨️ Tab through all interactive elements
- [ ] ⌨️ Enter/Space activates buttons
- [ ] ⌨️ Escape closes bottom sheet
- [ ] ⌨️ Focus visible on all elements
- [ ] ⌨️ Logical tab order

### Screen Reader
- [ ] 🔊 All images have alt text
- [ ] 🔊 Buttons have descriptive labels
- [ ] 🔊 Headings properly structured
- [ ] 🔊 ARIA labels where needed
- [ ] 🔊 Links announce destination

### Contrast & Readability
- [ ] 👁️ Text contrast ratio ≥4.5:1
- [ ] 👁️ Readable on all backgrounds
- [ ] 👁️ Focus indicators visible
- [ ] 👁️ Color not sole indicator

## 🐛 Edge Cases & Error Handling

### Missing Data
- [ ] ❌ No summary: Section hidden
- [ ] ❌ No intro: Section hidden
- [ ] ❌ No connections: Tab hidden or empty state
- [ ] ❌ No tags: Section hidden
- [ ] ❌ No author: Field hidden
- [ ] ❌ No headerImage: Standard header shown
- [ ] ❌ No headings: TOC hidden

### Content Variations
- [ ] 📝 Very short content: Progress bar works
- [ ] 📝 Very long content: Scroll works, TOC scrollable
- [ ] 📝 No H2/H3: TOC shows empty or hidden
- [ ] 📝 Many connections (>6): Only 6 shown
- [ ] 📝 Long titles: Wrap properly, no overflow

### Browser Compatibility
- [ ] 🌐 Chrome/Edge: All features work
- [ ] 🌐 Firefox: All features work
- [ ] 🌐 Safari: All features work (iOS too)
- [ ] 🌐 clipboard API: Fallback if not supported
- [ ] 🌐 Share API: Fallback to copy

## 🔒 Alert Modal Tests (Existing Feature)
- [ ] ⚠️ Alert detected in content
- [ ] ⚠️ Modal appears with animation
- [ ] ⚠️ Content blocked until confirmed
- [ ] ⚠️ "Prosseguir" shows content
- [ ] ⚠️ "Voltar"/"Fechar" returns to list
- [ ] ⚠️ Modal backdrop blur effect

## 📸 Visual Regression Tests

### Screenshots to Take
- [ ] 📷 Desktop: Full page with sidebar
- [ ] 📷 Desktop: Hero image header
- [ ] 📷 Desktop: Conexões tab
- [ ] 📷 Desktop: Metadados tab
- [ ] 📷 Mobile: Bottom sheet open
- [ ] 📷 Mobile: Hero image header
- [ ] 📷 Hover states on related cards
- [ ] 📷 Active TOC item highlighted

## ✅ Final Checks

### Code Quality
- [ ] ✅ No TypeScript errors
- [ ] ✅ No ESLint errors (except regex warnings)
- [ ] ✅ No console errors in browser
- [ ] ✅ Clean code formatting
- [ ] ✅ Comments where needed

### Documentation
- [ ] 📚 STORY_VIEWER_MODERNIZATION.md complete
- [ ] 📚 STORY_VIEWER_VISUAL_GUIDE.md complete
- [ ] 📚 README updated (if needed)
- [ ] 📚 Comments in code for complex logic

### User Experience
- [ ] 😊 Page feels fast and responsive
- [ ] 😊 Animations enhance (not distract)
- [ ] 😊 Navigation intuitive
- [ ] 😊 Content readable and engaging
- [ ] 😊 Mobile experience polished

---

## 🎯 Testing Priority

**Critical (Must Pass):**
1. Page loads without errors
2. Content displays correctly
3. Navigation works (back, TOC, tabs)
4. Mobile and desktop layouts work

**High Priority:**
5. Animations smooth and performant
6. Related stories clickable
7. Progress bar accurate
8. Hero image displays (when present)

**Medium Priority:**
9. Hover effects work well
10. Copy/share functionality
11. Active section tracking
12. All badges display correctly

**Nice to Have:**
13. Perfect pixel alignment
14. All animations perfectly timed
15. Screen reader optimization
16. Keyboard shortcuts

---

## 📝 Testing Notes Template

```
Date: ___________
Tester: ___________
Browser: ___________ (version: ___)
Device: ___________ (screen size: ___)

Story Tested: ___________
Has headerImage: Yes / No
Has connections: Yes / No (count: ___)
Content length: Short / Medium / Long

Issues Found:
1. ___________
2. ___________
3. ___________

Performance Notes:
- Load time: _____ seconds
- Scroll smoothness: Excellent / Good / Poor
- Animation quality: Excellent / Good / Poor

Overall Rating: ⭐⭐⭐⭐⭐
```

---

**Ready to Test!** 🚀

Start with a simple story, then test edge cases like very long content or stories with many connections.

