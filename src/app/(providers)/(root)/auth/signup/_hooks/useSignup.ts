import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';

type SignUpProps = {
  email: string;
  password: string;
  name: string;
};

export const useSignUp = ({ ...options }) => {
  return useMutation({
    mutationFn: async ({ email, password, name }: SignUpProps) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_API_URL}/api/signup/email`,
          data: {
            name
          }
        }
      });

      if (error) throw error;
      return data;
    },
    ...options
  });
};
