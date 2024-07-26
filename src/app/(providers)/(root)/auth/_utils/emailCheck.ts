import { supabase } from '@/utils/supabase/supabaseClient';

export const checkEmail = async (email: string) => {
  const { data, error } = await supabase.from('user').select('email').eq('email', email);

  if (error) {
    console.error(error.message);
    return false;
  }
  return data.length > 0;
};

export const emailRegex = (email_address: string) => {
  const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  if (!email_regex.test(email_address)) {
    return false;
  }
  return true;
};
