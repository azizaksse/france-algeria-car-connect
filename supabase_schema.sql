-- Create vehicles table
create table vehicles (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  brand text not null,
  model text not null,
  year integer not null,
  fuel text not null,
  price numeric not null,
  image text not null, -- Main thumbnail
  images text[] default '{}', -- Gallery images
  category text not null,
  mileage integer,
  available boolean default true,
  transmission text,
  reference text,
  body_type text,
  exterior_color text,
  motorisation text,
  status text default 'available'
);

-- Enable Row Level Security (RLS)
alter table vehicles enable row level security;

-- Create policy to allow public read access
create policy "Public vehicles are viewable by everyone"
  on vehicles for select
  using ( true );

-- Create policy to allow authenticated users to insert/update/delete
create policy "Authenticated users can modify vehicles"
  on vehicles for all
  using ( auth.role() = 'authenticated' );

-- Create policy to allow anon users to insert (TEMPORARY FOR MIGRATION ONLY)
create policy "Anon users can insert vehicles"
  on vehicles for insert
  with check ( true );

-- Storage Bucket for Images
insert into storage.buckets (id, name, public) values ('vehicles', 'vehicles', true);

-- Storage Policies
create policy "Public Access" on storage.objects for select using ( bucket_id = 'vehicles' );
create policy "Auth Upload" on storage.objects for insert using ( bucket_id = 'vehicles' and auth.role() = 'authenticated' );
create policy "Auth Update" on storage.objects for update using ( bucket_id = 'vehicles' and auth.role() = 'authenticated' );
create policy "Auth Delete" on storage.objects for delete using ( bucket_id = 'vehicles' and auth.role() = 'authenticated' );
