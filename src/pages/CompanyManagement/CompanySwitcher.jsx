import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import api from "../../Api/AxiosInstance";

const CompanySwitcher = () => {
  const [switching, setSwitching] = useState(false);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/companies/assigned", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // your API route
        setCompanies(res.data.data || []);
      } catch (error) {
        console.error("Error fetching companies", error);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const selectCompany = async (company) => {
    try {
      setSwitching(true);
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await api.post(
        "/auth/login/company",
        {
          email: user.email,
          companyId: company._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Reset token & user from response
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(`Switched to ${company.companyName}`);
    } catch (error) {
      console.error("Company switch failed", error);
      toast.error("Failed to switch company");
    } finally {
      setSwitching(false); // 👈 stop loader
    }
  };

  return (
    <DashboardLayout>
      {switching && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-white text-sm">Switching company…</p>
          </div>
        </div>
      )}

      <div className="min-h-screen flex justify-center bg-gradient-to-br from-background via-secondary to-background p-4">
        <div className="w-full max-w-8xl justify-between">
          <div className="text-left mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Select Company
            </h1>
            <p className="text-muted-foreground mt-2 flex items-center gap-2 justify-left">
              <Building2 className="w-4 h-4" />
              Choose a company to access
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {companies.map((company) => (
              <Card
                key={company.id}
                className="cursor-pointer transform transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:border-primary/50 hover:bg-background/50"
                onClick={() => selectCompany(company)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between w-full">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <Badge
                      className={
                        company.status === "Active"
                          ? "bg-green-500/15 text-green-600"
                          : "bg-red-500/15 text-red-600"
                      }
                    >
                      {company.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle>{company.companyName}</CardTitle>

                  <CardDescription className="flex items-center justify-between">
                    <span>Access dashboard</span>
                    <ChevronRight className="w-4 h-4" />
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanySwitcher;
