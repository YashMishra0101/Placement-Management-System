
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type PendingUser = {
  id: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  role: "student" | "recruiter" | "admin";
  branch?: string;
  cgpa?: number;
};

const AdminDashboard = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is an admin
    if (userRole !== "admin") {
      navigate("/login");
    }

    // Fetch pending users
    const fetchPendingUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('approval_status', 'pending');

        if (error) {
          console.error("Error fetching pending users:", error);
          return;
        }

        setPendingUsers(data || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingUsers();
  }, [userRole, navigate]);

  const handleApprove = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ approval_status: 'approved' })
        .eq('id', userId);

      if (error) {
        console.error("Error approving user:", error);
        return;
      }

      // Update the local state
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReject = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ approval_status: 'rejected' })
        .eq('id', userId);

      if (error) {
        console.error("Error rejecting user:", error);
        return;
      }

      // Update the local state
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Welcome, Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You are logged in as an administrator.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingUsers.length === 0 ? (
            <p>No pending approvals.</p>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((pendingUser) => (
                <div key={pendingUser.id} className="border p-4 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">
                        {pendingUser.first_name} {pendingUser.last_name || pendingUser.company_name}
                      </h3>
                      <p className="text-sm text-gray-600">{pendingUser.role}</p>
                      {pendingUser.role === "student" && (
                        <div className="mt-2 text-sm">
                          <p>Branch: {pendingUser.branch}</p>
                          <p>CGPA: {pendingUser.cgpa}</p>
                        </div>
                      )}
                      {pendingUser.role === "recruiter" && (
                        <div className="mt-2 text-sm">
                          <p>Company: {pendingUser.company_name}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleApprove(pendingUser.id)}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => handleReject(pendingUser.id)}
                      >
                        Reject
                      </Button>
                    </div>
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
