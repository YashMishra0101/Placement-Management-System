
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userRole: "student" | "recruiter" | "admin" | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  getProfile: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<"student" | "recruiter" | "admin" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchUserRole(session.user.id);
          }, 0);
        } else {
          setUserRole(null);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }

      setUserRole(data.role);
      return data.role;
    } catch (error) {
      console.error('Error in fetchUserRole:', error);
      return null;
    }
  };

  const getProfile = async () => {
    try {
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getProfile:', error);
      return null;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Special handling for admin credentials (hardcoded)
      if (email === "yashrkm@gmail.com" && password === "825TGBvdf@#&") {
        // Set admin role directly for our hardcoded admin
        setUserRole("admin");
        toast({
          title: "Success",
          description: "Admin login successful.",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Success",
          description: "Login successful.",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName || "",
            last_name: userData.lastName || "",
          },
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Additional profile data update
      if (userData.role) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            first_name: userData.firstName || "",
            middle_name: userData.middleName || "",
            last_name: userData.lastName || "",
            role: userData.role,
            dob: userData.dob || null,
            tenth_percentage: userData.tenthPercentage || null,
            twelfth_percentage: userData.twelfthPercentage || null,
            cgpa: userData.cgpa || null,
            branch: userData.branch || null,
            semester: userData.semester || null,
            backlogs: userData.backlogs || null,
            company_name: userData.companyName || null,
            company_info: userData.companyInfo || null,
            logo: userData.logo || null,
          })
          .eq('id', user?.id);

        if (profileError) {
          console.error("Error updating profile:", profileError);
        }
      }

      toast({
        title: "Success",
        description: "Account created! Please verify your email.",
      });
      
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      navigate("/login");
      toast({
        title: "Success",
        description: "You have been logged out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userRole,
        isLoading,
        signIn,
        signUp,
        signOut,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
