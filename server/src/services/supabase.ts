import { createClient } from '@supabase/supabase-js';

const options = {};

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
  options,
);
