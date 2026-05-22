-- ==========================================
-- FUTUREPATH — DATABASE INIT SCHEMA
-- Run this in your Supabase SQL Editor
-- ==========================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Shared base user table)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  role text not null check (role in ('student', 'advisor')),
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Advisor Profiles Table (Details specific to advisors)
create table if not exists public.advisor_profiles (
  advisor_id uuid references public.profiles(id) on delete cascade primary key,
  bio text,
  specialties text[] default '{}'::text[] not null,
  rating numeric(3,2) default 5.00 check (rating >= 0 and rating <= 5)
);

-- 3. Appointments Table
create table if not exists public.appointments (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.profiles(id) on delete cascade not null,
  advisor_id uuid references public.profiles(id) on delete cascade not null,
  scheduled_at timestamp with time zone not null,
  duration_minutes integer default 30 not null check (duration_minutes > 0),
  status text default 'upcoming' not null check (status in ('upcoming', 'in_progress', 'completed', 'cancelled', 'no_show')),
  mode text default 'video' not null check (mode in ('video', 'chat', 'in_person')),
  student_notes text,
  advisor_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Advisor Availability slots
create table if not exists public.availability (
  id uuid default uuid_generate_v4() primary key,
  advisor_id uuid references public.profiles(id) on delete cascade not null,
  day_of_week integer not null check (day_of_week >= 0 and day_of_week <= 6), -- 0=Sunday, 6=Saturday
  start_time time not null,
  end_time time not null,
  unique(advisor_id, day_of_week, start_time, end_time)
);

-- 5. Student Gamification Stats
create table if not exists public.student_gamification (
  student_id uuid references public.profiles(id) on delete cascade primary key,
  xp integer default 0 not null check (xp >= 0),
  level integer default 1 not null check (level >= 1),
  current_streak integer default 0 not null check (current_streak >= 0),
  last_activity_date date,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Badges Catalog Table (Pre-seeded milestone badges)
create table if not exists public.badges (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  description text not null,
  icon_key text not null, -- references icons like 'compass', 'fire', 'rocket'
  xp_reward integer default 100 not null
);

-- 7. Student Earned Badges
create table if not exists public.student_badges (
  student_id uuid references public.profiles(id) on delete cascade not null,
  badge_id uuid references public.badges(id) on delete cascade not null,
  earned_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (student_id, badge_id)
);

-- 8. Quests Table (Advisor-assigned or system action items)
create table if not exists public.quests (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references public.profiles(id) on delete cascade not null,
  appointment_id uuid references public.appointments(id) on delete set null,
  title text not null,
  description text,
  xp_reward integer default 150 not null,
  status text default 'pending' not null check (status in ('pending', 'completed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone
);

-- Seed Initial Badges
insert into public.badges (name, description, icon_key, xp_reward) values
  ('First Step', 'Scheduled your first career counseling slot!', 'compass', 50),
  ('Super Committed', 'Attended 3 educational advice sessions!', 'fire', 100),
  ('Planner Pro', 'Shared detailed prep notes before a meeting!', 'target', 50),
  ('Action Taker', 'Completed 3 career advisor-assigned quests!', 'rocket', 150),
  ('Networking Rookie', 'Consulted with 2 different advisors!', 'users', 100)
on conflict (name) do update set
  description = excluded.description,
  icon_key = excluded.icon_key,
  xp_reward = excluded.xp_reward;

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

alter table public.profiles enable row level security;
alter table public.advisor_profiles enable row level security;
alter table public.appointments enable row level security;
alter table public.availability enable row level security;
alter table public.student_gamification enable row level security;
alter table public.badges enable row level security;
alter table public.student_badges enable row level security;
alter table public.quests enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);
create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- Advisor Profiles Policies
create policy "Advisor profiles are viewable by everyone" on public.advisor_profiles
  for select using (true);
create policy "Advisors can update their own advisor details" on public.advisor_profiles
  for update using (auth.uid() = advisor_id);

-- Appointments Policies
create policy "Users can view their own appointments" on public.appointments
  for select using (auth.uid() = student_id or auth.uid() = advisor_id);
create policy "Students can book appointments" on public.appointments
  for insert with check (auth.uid() = student_id);
create policy "Parties can update their own appointments" on public.appointments
  for update using (auth.uid() = student_id or auth.uid() = advisor_id);

-- Availability Policies
create policy "Everyone can view availability" on public.availability
  for select using (true);
create policy "Advisors can manage their availability" on public.availability
  for all using (auth.uid() = advisor_id);

-- Gamification Policies
create policy "Everyone can view student stats" on public.student_gamification
  for select using (true);
create policy "System/Users can update student stats" on public.student_gamification
  for update using (auth.uid() = student_id);

-- Badges Policies
create policy "Everyone can view badges catalog" on public.badges
  for select using (true);

-- Student Earned Badges Policies
create policy "Everyone can view student earned badges" on public.student_badges
  for select using (true);
create policy "Students can earn new badges" on public.student_badges
  for insert with check (auth.uid() = student_id);

-- Quests Policies
create policy "Users can view their linked quests" on public.quests
  for select using (
    auth.uid() = student_id or exists (
      select 1 from public.appointments a where a.id = appointment_id and a.advisor_id = auth.uid()
    )
  );
create policy "Students can update their quests to complete" on public.quests
  for update using (auth.uid() = student_id);
create policy "Advisors can create quests for scheduled students" on public.quests
  for insert with check (
    exists (
      select 1 from public.appointments a where a.id = appointment_id and a.advisor_id = auth.uid()
    )
  );

-- ==========================================
-- AUTOMATION TRIGGER FOR USER REGISTRATION
-- ==========================================
-- Automatically inserts a profile and gamification record when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Explorer'),
    coalesce(new.raw_user_meta_data->>'role', 'student'),
    new.raw_user_meta_data->>'avatar_url'
  );

  -- If student, also seed gamification profile
  if (coalesce(new.raw_user_meta_data->>'role', 'student') = 'student') then
    insert into public.student_gamification (student_id, xp, level, current_streak)
    values (new.id, 0, 1, 0);
  end if;

  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
