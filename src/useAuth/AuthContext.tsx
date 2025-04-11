import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabase } from "../supabase/Client.jsx";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { hashPassword } from "../lib/auth.js";
import { createClient } from "@supabase/supabase-js";


type UserProfile = {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  role: "student" | "recruiter" | "admin";
  is_approved: boolean;
};

type User = {
  id: string;
  email?: string;
} & UserProfile;

type StudentMetadata = {
  firstName: string;
  lastName: string;
  dob: string;
  tenthPercentage: string;
  twelfthPercentage: string;
  cgpa: string;
  branch: string;
  semester: string;
  backlogs: string;
};

type RecruiterMetadata = {
  companyName: string;
  companyInfo: string;
  logo?: string;
};

type AuthContextType = {
  user: User | null;
  userRole: UserProfile["role"] | null;
  signUp: (
    email: string,
    password: string,
    metadata: StudentMetadata | RecruiterMetadata,
    role: "student" | "recruiter"
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  approveUser: (email: string) => Promise<{ success: boolean; error?: any }>;
  isAdmin: boolean;
  isLoading: boolean;
  isApproved: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const checkUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        setUser(null);
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (profileError || !profileData) {
        await supabase.auth.signOut();
        setUser(null);
        return;
      }

      setUser({
        id: authUser.id,
        email: authUser.email,
        ...profileData,
      });
    } catch (error) {
      console.error("Error checking user:", error);
      await supabase.auth.signOut();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        await checkUser();
        navigate("/dashboard");
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [checkUser, navigate]);

  const signUp = async (
    email: string,
    password: string,
    metadata: StudentMetadata | RecruiterMetadata,
    role: 'student' | 'recruiter'
  ) => {
    try {
      setIsLoading(true);
      const passwordHash = await hashPassword(password);
  
      // Create a client without authentication for the initial signup
      const supabaseUnauthenticated = createClient(
        supabaseUrl,
        supabaseAnonKey
      );
  
      const { error } = await supabaseUnauthenticated
        .from('pending_requests')
        .insert({
          email,
          password_hash: passwordHash,
          raw_user_meta_data: metadata,
          role,
          status: 'pending',
        });
  
      if (error) throw error;
  
      toast({
        title: "Request Submitted",
        description: "Your account request has been submitted for admin approval.",
      });
    } catch (error) {
      console.error("Signup Error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit request",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("is_approved")
        .eq("id", data.user.id)
        .single();

      if (profileError || !profile?.is_approved) {
        await supabase.auth.signOut();
        throw new Error("Your account is pending admin approval");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description:
          error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const approveUser = async (email: string) => {
    try {
      setIsLoading(true);

      const { data: pendingData, error: pendingError } = await supabase
        .from("pending_requests")
        .select("*")
        .eq("email", email)
        .single();

      if (pendingError || !pendingData) throw pendingError;

      const { data: authData, error: authError } =
        await supabaseAdmin.auth.admin.createUser({
          email: pendingData.email,
          password: pendingData.password_hash,
          email_confirm: true,
          user_metadata: pendingData.raw_user_meta_data,
        });

      if (authError) throw authError;

      await supabase.from("profiles").insert({
        id: authData.user.id,
        email: pendingData.email,
        role: pendingData.role,
        is_approved: true,
        ...pendingData.raw_user_meta_data,
      });

      await supabase.from("pending_requests").delete().eq("email", email);

      toast({
        title: "User Approved",
        description:
          "The user has been successfully approved and account created.",
      });

      return { success: true };
    } catch (error) {
      console.error("Approval error:", error);
      toast({
        title: "Approval Error",
        description: "Something went wrong while approving the user.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = user?.role === "admin";
  const isApproved = user?.is_approved ?? false;

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole: user?.role || null,
        signUp,
        signIn,
        signOut,
        approveUser,
        isAdmin,
        isLoading,
        isApproved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
