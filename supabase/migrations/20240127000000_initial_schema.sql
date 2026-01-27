-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Authorized Admins Table
create table public.authorized_admins (
  email text primary key
);

alter table public.authorized_admins enable row level security;

-- Policy: Allow anyone to read authorized admins (useful for checking if an email is admin, though strictly speaking could be private if checked server-side only. 
-- For now, we'll keep it simple: allow public read to let the client know if login is permitted, or better, strictly server-side check. 
-- Actually, strict security: only service role should insert. But let's allow public read for now or restricted. 
-- Safest: Only allow Authenticated users to read their own email if it's in the table? 
-- Let's stick to the plan: "INSERT/UPDATE/DELETE restricted to authenticated users matching the specific admin email".
-- Since this is the "gatekeeper" table, we should seed it with the initial admin.

insert into public.authorized_admins (email) values ('saiamartya19@gmail.com') on conflict do nothing;

create policy "Allow read access for all" on public.authorized_admins for select using (true);

-- 2. Ventures Table
create table public.ventures (
  id uuid not null default uuid_generate_v4() primary key,
  name text not null,
  tagline text not null,
  description text not null,
  image text not null,
  url text not null,
  color text not null,
  metrics jsonb not null default '{}'::jsonb,
  sort_order integer generated always as identity,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.ventures enable row level security;

-- 3. Achievements Table
create table public.achievements (
  id uuid not null default uuid_generate_v4() primary key,
  title text not null,
  subtitle text not null,
  value text not null,
  description text not null,
  category text not null,
  icon_name text not null,
  highlight boolean default false,
  color text not null,
  sort_order integer generated always as identity,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.achievements enable row level security;

-- 4. Experiences Table
create table public.experiences (
  id uuid not null default uuid_generate_v4() primary key,
  role text not null,
  organization text not null,
  location text not null,
  period text not null,
  type text not null,
  description text not null,
  skills text[] not null default '{}',
  active boolean default false,
  sort_order integer generated always as identity,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.experiences enable row level security;

-- 5. Projects Table
create table public.projects (
  id uuid not null default uuid_generate_v4() primary key,
  name text not null,
  tagline text not null,
  description text not null,
  tech text[] not null default '{}',
  status text not null,
  award text,
  url text,
  github text,
  image text not null,
  classified boolean default false,
  sort_order integer generated always as identity,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.projects enable row level security;


-- RLS Helper Function to check if user is admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1
    from public.authorized_admins
    where email = auth.jwt() ->> 'email'
  );
end;
$$ language plpgsql security definer;

-- RLS Policies

-- Ventures
create policy "Enable read access for all users" on public.ventures for select using (true);
create policy "Enable insert for admins" on public.ventures for insert with check (is_admin());
create policy "Enable update for admins" on public.ventures for update using (is_admin());
create policy "Enable delete for admins" on public.ventures for delete using (is_admin());

-- Achievements
create policy "Enable read access for all users" on public.achievements for select using (true);
create policy "Enable insert for admins" on public.achievements for insert with check (is_admin());
create policy "Enable update for admins" on public.achievements for update using (is_admin());
create policy "Enable delete for admins" on public.achievements for delete using (is_admin());

-- Experiences
create policy "Enable read access for all users" on public.experiences for select using (true);
create policy "Enable insert for admins" on public.experiences for insert with check (is_admin());
create policy "Enable update for admins" on public.experiences for update using (is_admin());
create policy "Enable delete for admins" on public.experiences for delete using (is_admin());

-- Projects
create policy "Enable read access for all users" on public.projects for select using (true);
create policy "Enable insert for admins" on public.projects for insert with check (is_admin());
create policy "Enable update for admins" on public.projects for update using (is_admin());
create policy "Enable delete for admins" on public.projects for delete using (is_admin());
