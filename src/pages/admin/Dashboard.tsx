import { useEffect, useState } from "react";
import { useAuth } from "../../useAuth/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase, supabaseAdmin } from "../../supabase/Client.jsx";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react"; // 🛠️ You missed importing Loader2 for the spinner

type PendingUser = {
  id: string;
  email: string;
  role: "student" | "recruiter";
  raw_user_meta_data: any;
  created_at: string;
};

const AdminDashboard = () => {
  const { user, isAdmin, approveUser } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      fetchPendingUsers();
    }
  }, [isAdmin]);

  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("pending_requests")
        .select("*")
        .eq("status", "pending");

      if (error) throw error;
      setPendingUsers(data || []);
    } catch (error) {
      console.error("Error fetching pending users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch pending users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId: number, email: string) => {
    try {
      setLoading(true);

      // 1. Update the pending request status
      const { error: updateError } = await supabase
        .from("pending_requests")
        .update({ status: "approved" })
        .eq("id", requestId);

      if (updateError) throw updateError;

      // 2. Get the pending request data
      const { data: requestData, error: requestError } = await supabase
        .from("pending_requests")
        .select("*")
        .eq("id", requestId)
        .single();

      if (requestError) throw requestError;

      // 3. Create the user in auth and profile tables
      const { error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: requestData.email,
        password: requestData.password_hash,
        email_confirm: true,
        user_metadata: requestData.raw_user_meta_data,
      });

      if (authError) throw authError;

      // 4. Create profile
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          email: requestData.email,
          role: requestData.role,
          is_approved: true,
          ...requestData.raw_user_meta_data,
        },
      ]);

      if (profileError) throw profileError;

      toast({
        title: "Success",
        description: `Approved user: ${email}`,
        variant: "default",
      });

      // Refresh the list
      await fetchPendingUsers();
    } catch (error) {
      console.error("Approval error:", error);
      toast({
        title: "Error",
        description: `Failed to approve user: ${email}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (requestId: number, email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("pending_requests")
        .update({ status: "rejected" })
        .eq("id", requestId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Rejected user: ${email}`,
        variant: "default",
      });

      await fetchPendingUsers();
    } catch (error) {
      console.error("Rejection error:", error);
      toast({
        title: "Error",
        description: `Failed to reject user: ${email}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-600">
          You must be an admin to access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : pendingUsers.length === 0 ? (
            <p className="text-gray-500">No pending approvals</p>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((user) => (
                <div
                  key={user.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{user.email}</p>
                    <p className="text-sm text-gray-500 capitalize">
                      {user.role}
                    </p>
                    <p className="text-sm text-gray-500">
                      Registered: {new Date(user.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleReject(user.id, user.email)}
                      disabled={loading}
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApprove(user.id, user.email)}
                      disabled={loading}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
