import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const mockCompanies = [
    { id: 1, name: "Afaq Distribution", role: "Admin" },
    { id: 2, name: "Société Générale Imports", role: "Accountant" },
    { id: 3, name: "Arfa Traders Paris", role: "Manager" },
    { id: 4, name: "Bordeaux Logistics", role: "Supervisor" },
    { id: 5, name: "Nice Merchandisers", role: "Sales Head" },
    { id: 6, name: "Lyon Agro Distribution", role: "Finance Officer" },
    { id: 7, name: "Toulouse Trading Co.", role: "Operations Manager" },
];

const CompanySwitcher = () => {
    const navigate = useNavigate();

    const selectCompany = (company) => {
        toast.success(`Switched to ${company.name}`);
        localStorage.setItem("selectedCompany", JSON.stringify(company));
        navigate("/");
    };

    const getBadgeVariant = (role) => {
        switch (role) {
            case "Admin":
                return "success";
            case "Accountant":
                return "destructive";
            case "Manager":
                return "outline";
            case "Supervisor":
                return "default";
            case "Sales Head":
                return "outline";
            case "Finance Officer":
            case "Operations Manager":
                return "secondary";
            default:
                return "default";
        }
    };

    return (
        <DashboardLayout>
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
                        {mockCompanies.map((company) => (
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
                                        <Badge variant={getBadgeVariant(company.role)}>
                                            {company.role}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="text-xl mb-2">{company.name}</CardTitle>
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
