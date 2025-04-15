import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        setLoading(false);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, role: string, userData: any) => {
    setLoading(true);
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Update profile with role
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', user?.id);

      if (profileError) throw profileError;

      // Insert additional data based on role
      if (role === 'student') {
        const { error: studentError } = await supabase.from('students').insert({
          profile_id: user?.id,
          ...userData
        });
        if (studentError) throw studentError;
      } else if (role === 'recruiter') {
        const { error: recruiterError } = await supabase.from('recruiters').insert({
          profile_id: user?.id,
          ...userData
        });
        if (recruiterError) throw recruiterError;
      }

      return { user, error: null };
    } catch (error) {
      toast({
        title: 'Signup Error',
        description: error.message,
        variant: 'destructive',
      });
      return { user: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) throw error;

      // Check if user is approved
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('account_status')
        .eq('id', user?.id)
        .single();

      if (profileError) throw profileError;

      if (profile.account_status !== 'approved') {
        await supabase.auth.signOut();
        throw new Error('Your account is pending approval. Please wait for admin approval.');
      }

      return { user, error: null };
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive',
      });
      return { user: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      toast({
        title: 'Logout Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, signUp, signIn, signOut };
};