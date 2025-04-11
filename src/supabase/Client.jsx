import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// IMPORTANT: This admin client should ONLY be used in secure server environments
// For Next.js, this would be in API routes or getServerSideProps
// For Vite/React, you should move this to a server-side script
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Admin creation function (should be moved to a server-side script)
export async function createAdminUser(email = 'admin@example.com', password = 'securepassword123') {
  try {
    // 1. Create auth user
    const { data: user, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Skip email confirmation
      user_metadata: { role: 'admin' }
    });

    if (authError) throw authError;
    if (!user.user?.id) throw new Error('User creation failed');

    const userId = user.user.id;

    // 2. Add to admins table
    const { error: adminError } = await supabaseAdmin
      .from('admins')
      .insert([{ 
        id: userId, 
        email,
        created_by: userId // First admin creates themselves
      }]);

    if (adminError) throw adminError;

    // 3. Add to profiles table
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert([{ 
        id: userId, 
        email,
        role: 'admin',
        is_approved: true // Admins are auto-approved
      }]);

    if (profileError) throw profileError;

    console.log('✅ Admin created successfully');
    return { success: true, userId };
    
  } catch (error) {
    console.error('❌ Admin creation failed:', error);
    return { success: false, error };
  }
}