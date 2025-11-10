# Sniplink

### Link Shortener - Complete Project Brief

## 🎯 Project Overview

A modern URL shortener (like Bitly) with analytics, built with SvelteKit 5, Turso (edge SQLite), Drizzle ORM, and Better Auth.

## 📐 Database Schema

### Tables:

1. **users**
   - id (primary key)
   - email (unique)
   - name
   - createdAt

2. **links**
   - id (primary key)
   - userId (foreign key)
   - shortCode (unique, indexed) - e.g., "abc123"
   - destinationUrl - original long URL
   - title - optional description
   - passwordHash - optional security
   - expiresAt - optional expiration
   - isActive - boolean flag
   - folderId - optional organization
   - createdAt, updatedAt

3. **clicks**
   - id (primary key)
   - linkId (foreign key, indexed)
   - country, city, region - geographic data
   - referrer - where they came from
   - referrerSource - categorized (social, email, direct)
   - device - mobile/desktop/tablet
   - os - Windows/macOS/iOS/Android
   - browser - Chrome/Safari/Firefox
   - ipAddress - for geolocation
   - userAgent - full UA string
   - isQrScan - boolean flag
   - clickedAt (indexed)

4. **folders**
   - id (primary key)
   - userId (foreign key)
   - name
   - color - for UI
   - createdAt

5. **qrCodes**
   - id (primary key)
   - linkId (foreign key)
   - imageData - base64 or URL
   - size, format
   - createdAt

6. **linkAnalyticsSummary** (for performance)
   - id (primary key)
   - linkId (foreign key)
   - date - YYYY-MM-DD
   - totalClicks, uniqueClicks, qrScans
   - topReferrers (JSON)
   - topCountries (JSON)
   - deviceBreakdown (JSON)
   - createdAt

## 🔄 Core Flows

### 1. Link Creation Flow:

```
User submits URL + optional custom slug
↓
Validate URL format
↓
Generate unique shortCode (or use custom slug)
↓
Check for collision in database
↓
Insert into links table
↓
Return short URL to user
```

### 2. Redirect Flow (CRITICAL - Must be FAST):

```
User visits: yoursite.com/abc123
↓
SvelteKit catches route: [shortCode]/+server.ts
↓
Query Turso for link by shortCode (< 10ms)
↓
Check if active and not expired
↓
Asynchronously track click (don't wait)
↓
HTTP 302 redirect to destination URL
```

### 3. Click Tracking Flow:

```
Parse request headers:
  - User-Agent → extract device, OS, browser
  - Referer → determine source (social, search, direct)
  - IP address → lookup geolocation (optional)
↓
Insert click record into database
↓
Optionally update summary table (daily aggregation)
```

### 4. Analytics Retrieval:

```
User requests analytics for link
↓
Query clicks table with date range filter
↓
Aggregate data:
  - Count by day (for chart)
  - Group by device, referrer, country
  - Calculate percentages
↓
Return formatted data to frontend
```

## 🛣️ API Routes

### Links:

- `GET /api/links` - List user's links
- `POST /api/links` - Create new link
- `GET /api/links/[id]` - Get single link
- `PATCH /api/links/[id]` - Update link
- `DELETE /api/links/[id]` - Delete link

### Analytics:

- `GET /api/links/[id]/analytics?days=30` - Get link analytics
- `GET /api/analytics/overview?days=30` - Dashboard overview

### Redirect:

- `GET /[shortCode]` - Redirect to destination (main endpoint)

## 📄 Pages/Routes

### Public:

- `/` - Landing page
- `/[shortCode]` - Redirect handler
- `/login` - Login page
- `/register` - Signup page

### Protected (require auth):

- `/dashboard` - Main dashboard (list links)
- `/analytics/[id]` - Detailed analytics for a link
- `/settings` - User settings
- `/folders` - Manage folders (optional)

## 🎨 UI Components

### Dashboard Page:

- Header with "Create Link" button
- Grid/list of link cards showing:
  - Short code
  - Destination URL
  - Total clicks
  - Created date
  - Actions (analytics, edit, delete, copy)
- Empty state for new users

### Create Link Modal:

- Input: Destination URL (required)
- Input: Custom slug (optional)
- Input: Title (optional)
- Select: Folder (optional)
- Date: Expiration (optional)
- Submit button

### Analytics Page:

- Summary cards (total clicks, QR scans, countries)
- Time period selector (7, 30, 90 days)
- Charts:
  - Clicks over time (bar/line chart)
  - Device breakdown (pie/bar chart)
  - Top referrers (list with percentages)
  - Top countries (list with percentages)
  - Browser breakdown

### Link Card Component:

- Title/description
- Short URL with copy button
- Destination URL
- Click count badge
- Action buttons (analytics, delete)
- Created date

### Pre-aggregated (for performance at scale):

- Run daily cron job to populate `linkAnalyticsSummary` table
- Store aggregated data per link per day
- Query summary table instead of raw clicks for older data

### Redirect Optimization:

1. Query only necessary fields for redirect
2. Track click asynchronously (don't await)
3. Use Turso edge replication for global speed
4. Cache frequently accessed links (optional)

### Analytics Optimization:

1. Use summary tables for date ranges > 30 days
2. Limit real-time queries to recent data
3. Pre-calculate percentages on backend
4. Paginate click lists

## 🎯 MVP Feature Priority

### Phase 1 (Week 1) - Core:

✅ User authentication
✅ Create shortened links
✅ Redirect functionality
✅ Basic click tracking
✅ Dashboard (list links)
✅ Basic analytics (total clicks, simple chart)

### Phase 2 (Week 2) - Enhanced:

🎯 Advanced analytics (device, referrer, location)
🎯 Custom slugs
🎯 Link folders/organization
🎯 QR code generation
🎯 Link editing

### Phase 3 (Future) - Premium:

⏭️ Custom domains
⏭️ Password-protected links
⏭️ Link expiration
⏭️ Team collaboration
⏭️ API access
⏭️ Webhooks
⏭️ Export data

## 🐛 Edge Cases to Handle

1. **Short code collisions**: Keep retrying until unique
2. **Expired links**: Check expiration before redirect
3. **Inactive links**: Check isActive flag
4. **Invalid URLs**: Validate before saving
5. **Custom slug taken**: Return error, suggest alternatives
6. **Rate limiting**: Prevent abuse (future)
7. **Malicious URLs**: Scan for spam/phishing (future)

END OF PROJECT CONTEXT
