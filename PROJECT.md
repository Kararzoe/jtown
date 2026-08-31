# JosMKT — Full Project Documentation

## What It Is
A marketplace and service directory for Jos, Plateau State, Nigeria.
Built with Nuxt 3 + Nuxt UI + Supabase. Deployed on Vercel.

---

## Tech Stack
| Layer | Tech |
|---|---|
| Frontend | Nuxt 3 (SPA, SSR disabled) |
| UI | Nuxt UI v3 (Tailwind-based) |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth |
| File Uploads | Cloudinary (`dfye3j2bs`, preset: `jos_marketplace`) |
| Deployment | Vercel (`Kararzoe/jtown` repo) |

---

## Environment Variables
| Key | Where | Purpose |
|---|---|---|
| `NUXT_PUBLIC_SUPABASE_URL` | Vercel + `.env` | Supabase project URL |
| `NUXT_PUBLIC_SUPABASE_KEY` | Vercel + `.env` | Supabase anon/publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel + `.env` | Service role key — bypasses RLS for admin server routes |

---

## Pages

| Route | File | Access |
|---|---|---|
| `/` | `index.vue` | Public |
| `/products` | `products.vue` | Public |
| `/product/[id]` | `product/[id].vue` | Public |
| `/services` | `services.vue` | Public |
| `/provider/[id]` | `provider/[id].vue` | Public |
| `/seller/[id]` | `seller/[id].vue` | Public |
| `/category/[slug]` | `category/` | Public |
| `/become-seller` | `become-seller.vue` | Public |
| `/trending` | `trending.vue` | Public |
| `/about` | `about.vue` | Public |
| `/contact` | `contact.vue` | Public |
| `/privacy` | `privacy.vue` | Public |
| `/terms` | `terms.vue` | Public |
| `/login` | `login.vue` | Public |
| `/confirm` | `confirm.vue` | Public |
| `/forgot-password` | `forgot-password.vue` | Public |
| `/reset-password` | `reset-password.vue` | Public |
| `/dashboard` | `dashboard.vue` | Auth required |
| `/profile` | `profile.vue` | Auth required |
| `/orders` | `orders.vue` | Auth required |
| `/wishlist` | `wishlist.vue` | Auth required |
| `/upload-product` | `upload-product.vue` | Auth required |
| `/seller-dashboard` | `seller-dashboard.vue` | Auth required |
| `/chat` | `chat.vue` | Auth required |
| `/compare` | `compare.vue` | Auth required |
| `/saved-searches` | `saved-searches.vue` | Auth required |
| `/admin` | `admin.vue` | Admin only (`role = 'admin'`) |

---

## Database Tables (Supabase)

### `profiles`
Extends `auth.users`. Auto-created on signup via trigger.
```
id, full_name, email, phone, location, avatar_url,
shop_name, shop_description, shop_logo,
role (default: 'buyer'),
is_verified, rating, total_reviews, loyalty_points, created_at
```
- Set `role = 'admin'` manually in Supabase for admin users.

### `products`
```
id, seller_id, title, description, price, category,
condition, location, images (text[]), tags (text[]),
stock, views, status (pending/active/rejected), created_at
```
- New products default to `status = 'pending'` — admin must approve.

### `orders`
```
id, buyer_id, seller_id, product_id,
status (pending/processing/completed/cancelled), created_at
```

### `favorites`
```
id, user_id, product_id, created_at
```

### `reviews`
```
id, reviewer_id, seller_id, product_id, rating (1-5), comment, created_at
```

### `chats` + `messages`
Peer-to-peer chat between buyers and sellers.

### `service_providers`
```
id, service_name, category, description, phone, location,
experience, price_range, image, gallery (text[]),
id_image, selfie_image,
status (pending/approved/rejected), created_at
```
- Public can only read `approved` providers.
- Admin reads all via server API route (bypasses RLS).

### `support_messages`
```
id, user_id, user_name, user_email, content,
is_admin (bool), read (bool), created_at
```

---

## Admin Panel (`/admin`)

### Access
- User must have `role = 'admin'` in `profiles` table.
- Set it manually: Supabase → Table Editor → profiles → edit your row → set `role` to `admin`.

### Tabs

#### Overview
- Recent 5 users
- Recent 5 products with delete button
- Stats: total users, pending products, orders, revenue

#### Users
- Lists all registered users
- Link to each seller profile

#### Products
- Filter by: pending / active / rejected / all
- Approve, Reject, View, Delete each product
- New products come in as `pending` — must be approved to go live

#### Orders
- All orders with buyer name, product, price
- Change order status via dropdown

#### Service Providers
- Loaded via `/api/admin/providers` (server route, bypasses RLS)
- Shows all providers including `pending`
- Approve / Reject / Delete
- Shows verification documents (Government ID + Selfie)

#### Messages (Support Inbox)
- Grouped conversations by user
- Real-time thread view
- Admin can reply — messages stored in `support_messages`

#### Add Provider
- Admin can manually add a service provider
- Fields: name, category, description, phone, location, experience, price range
- Upload: logo, gallery, ID image, selfie image
- Inserted directly as `approved`

---

## Server API Routes

### `GET /api/admin/providers`
File: `server/api/admin/providers.get.ts`

Uses `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS and return ALL service providers (including pending).

---

## Service Provider Flow

1. Provider fills form at `/become-seller`
2. Uploads logo, gallery, Government ID, selfie with ID
3. Images go to Cloudinary
4. Record inserted into `service_providers` with `status = 'pending'`
5. Admin sees it in `/admin` → Services tab
6. Admin approves → `status = 'approved'`
7. Provider appears on `/services` page

---

## Product Flow

1. Seller uploads product at `/upload-product`
2. Images go to Supabase Storage (`images` bucket)
3. Product inserted with `status = 'pending'`
4. Admin sees it in `/admin` → Products tab (filter: pending)
5. Admin approves → `status = 'active'`
6. Product appears on `/products` and homepage

---

## Cloudinary Setup
- Cloud name: `dfye3j2bs`
- Upload preset: `jos_marketplace` (must be set to **unsigned** in Cloudinary dashboard)
- Used for: service provider logos, gallery images, ID/selfie verification docs

---

## Supabase Storage
- Bucket: `images` (must be public)
- Used for: product images uploaded by sellers

---

## Auth Flow
- Login/signup via Supabase Auth
- Email confirmation via `/confirm` page
- Password reset via `/forgot-password` → `/reset-password`
- Session restored on mount in SPA mode (SSR is disabled)
- Admin guard in `admin.vue` waits for session before checking role

---

## Key SQL to Run in Supabase (Migrations)

```sql
-- Add missing columns to service_providers
ALTER TABLE service_providers ADD COLUMN IF NOT EXISTS id_image text DEFAULT '';
ALTER TABLE service_providers ADD COLUMN IF NOT EXISTS selfie_image text DEFAULT '';

-- Fix RLS policies for service_providers
DROP POLICY IF EXISTS "Admin manages providers" ON service_providers;
DROP POLICY IF EXISTS "Public read approved providers" ON service_providers;

CREATE POLICY "Public read approved providers" ON service_providers
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Admin read all providers" ON service_providers
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin update providers" ON service_providers
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin delete providers" ON service_providers
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Create support_messages table
CREATE TABLE IF NOT EXISTS support_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  user_name text,
  user_email text,
  content text NOT NULL,
  is_admin boolean DEFAULT false,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own messages" ON support_messages
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admin read all messages" ON support_messages
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin send replies" ON support_messages
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin update read status" ON support_messages
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Make yourself admin (replace with your actual user ID)
UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';
```

---

## Deployment Checklist

- [ ] `NUXT_PUBLIC_SUPABASE_URL` set in Vercel
- [ ] `NUXT_PUBLIC_SUPABASE_KEY` set in Vercel
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set in Vercel
- [ ] Cloudinary upload preset `jos_marketplace` set to **unsigned**
- [ ] Supabase `images` storage bucket set to **public**
- [ ] SQL migrations run in Supabase
- [ ] Your profile `role` set to `admin` in Supabase
- [ ] Push to `Kararzoe/jtown` repo to trigger Vercel deploy

---

## Service Categories
plumbing, electrical, ac, furniture, catering, painting, mechanic, barbing,
carpentry, fashion-design, shoemaking, photography, tech, logistics, laundry,
education, perfumery, makeup, event-planning, rentals, mason, phone-accessories,
legal, housing-agent, e-wallet
