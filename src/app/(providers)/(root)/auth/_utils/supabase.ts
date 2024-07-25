import { supabase } from '@/utils/supabase/supabaseClient';

export const deleteWorkUserById = async (email: string) => {
  const { error } = await supabase.from('workspace_user').delete().eq('email', email);

  if (error) {
    alert(`유저 삭제중 에러가 발생하였습니다. : ${error.message}`);
    return false;
  }

  return true;
};

export const deleteUserById = async (email: string) => {
  const { error } = await supabase.from('user').delete().eq('email', email);

  if (error) {
    console.error('Error deleting user:', error.message);
    return false;
  }

  return true;
};
