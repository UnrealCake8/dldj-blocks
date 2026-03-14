create extension if not exists pgcrypto;

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null default 'Untitled Project',
  workspace_json jsonb not null default '{}'::jsonb,
  html_code text not null default '',
  css_code text not null default '',
  js_code text not null default '',
  is_published boolean not null default false,
  published_slug text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table projects enable row level security;

drop policy if exists "Users can view own projects" on projects;
create policy "Users can view own projects"
on projects for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own projects" on projects;
create policy "Users can insert own projects"
on projects for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own projects" on projects;
create policy "Users can update own projects"
on projects for update
using (auth.uid() = user_id);

drop policy if exists "Users can delete own projects" on projects;
create policy "Users can delete own projects"
on projects for delete
using (auth.uid() = user_id);

drop policy if exists "Anyone can view published projects" on projects;
create policy "Anyone can view published projects"
on projects for select
using (is_published = true);
