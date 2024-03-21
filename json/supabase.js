import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://vfbprahcsrdbafoglrmn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmYnByYWhjc3JkYmFmb2dscm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0NzQ3OTcsImV4cCI6MjAyMzA1MDc5N30.tzQEqF6h8OKUyu_yP0yXmZfXbgHiPpUhTb6BwaHGV94'
);

export default supabase;
