-- Profiles table (extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  phone text,
  location text,
  avatar_url text,
  shop_name text,
  shop_description text,
  shop_logo text,
  role text default 'buyer',
  is_verified boolean default false,
  rating numeric default 0,
  total_reviews int default 0,
  loyalty_points int default 0,
  created_at timestamptz default now()
);

-- Products table
create table products (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  price numeric not null,
  category text,
  condition text default 'new',
  location text,
  images text[],
  tags text[],
  stock int default 1,
  views int default 0,
  status text default 'active',
  created_at timestamptz default now()
);

-- Orders table
create table orders (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references profiles(id),
  seller_id uuid references profiles(id),
  product_id uuid references products(id),
  status text default 'pending',
  created_at timestamptz default now()
);

-- Favorites table
create table favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, product_id)
);

-- Reviews table
create table reviews (
  id uuid default gen_random_uuid() primary key,
  reviewer_id uuid references profiles(id),
  seller_id uuid references profiles(id),
  product_id uuid references products(id),
  rating int check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz default now()
);

-- Chats table
create table chats (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references profiles(id),
  seller_id uuid references profiles(id),
  product_id uuid references products(id),
  last_message text,
  created_at timestamptz default now()
);

-- Messages table
create table messages (
  id uuid default gen_random_uuid() primary key,
  chat_id uuid references chats(id) on delete cascade,
  sender_id uuid references profiles(id),
  content text,
  created_at timestamptz default now()
);

-- Auto create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Enable RLS
alter table profiles enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table favorites enable row level security;
alter table reviews enable row level security;
alter table chats enable row level security;
alter table messages enable row level security;

-- RLS Policies
create policy "Public profiles" on profiles for select using (true);
create policy "Update own profile" on profiles for update using (auth.uid() = id);

create policy "Public products" on products for select using (status = 'active');
create policy "Sellers manage products" on products for all using (auth.uid() = seller_id);

create policy "Users see own orders" on orders for select using (auth.uid() = buyer_id or auth.uid() = seller_id);
create policy "Users create orders" on orders for insert with check (auth.uid() = buyer_id);

create policy "Users manage favorites" on favorites for all using (auth.uid() = user_id);

create policy "Public reviews" on reviews for select using (true);
create policy "Users create reviews" on reviews for insert with check (auth.uid() = reviewer_id);

create policy "Users see own chats" on chats for select using (auth.uid() = buyer_id or auth.uid() = seller_id);
create policy "Users create chats" on chats for insert with check (auth.uid() = buyer_id);

create policy "Chat members see messages" on messages for select using (
  exists (select 1 from chats where id = chat_id and (buyer_id = auth.uid() or seller_id = auth.uid()))
);
create policy "Chat members send messages" on messages for insert with check (auth.uid() = sender_id);
