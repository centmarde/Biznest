import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useTheme } from "@/theme/theme";
import DefaultLayout from "@/layout/default";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import Papa from 'papaparse';

const newBusinessData = [
  { name: 'Coffee Shop', established: 2022, revenue: 80000, employees: 4, location: "321 J.C. Aquino Ave, Butuan City" },
  { name: 'Co-working Space', established: 2023, revenue: 150000, employees: 6, location: "654 P. Burgos St, Butuan City" },
  { name: 'Fitness Studio', established: 2022, revenue: 90000, employees: 5, location: "987 T. Calo St, Butuan City" },
  { name: 'Online Boutique', established: 2023, revenue: 60000, employees: 2, location: "111 Rosales St, Butuan City" },
  { name: 'Tech Startup', established: 2022, revenue: 300000, employees: 10, location: "222 Capitol Dr, Butuan City" },
];

const revenueByMonth = [
    { month: 'Jan', revenue: 50000 },
    { month: 'Feb', revenue: 65000 },
    { month: 'Mar', revenue: 80000 },
    { month: 'Apr', revenue: 75000 },
    { month: 'May', revenue: 95000 },
    { month: 'Jun', revenue: 110000 },
];

const NewBusinessStatistics: React.FC = () => {
    const theme = useTheme();

    const chartConfig = {
        revenue: {
          label: "Revenue",
          color: theme.colors.primary,
        },
        employees: {
            label: "Employees",
            color: theme.colors.secondary,
        }
    } satisfies import("@/components/ui/chart").ChartConfig;

    const handleExport = () => {
        const csv = Papa.unparse(newBusinessData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "new_business_statistics.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <DefaultLayout>
            <div className="p-4 md:p-8" style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold" style={{ color: theme.colors.primary }}>New Businesses Statistics</h1>
                    <Button onClick={handleExport} style={{ backgroundColor: theme.colors.primary, color: theme.colors.card }}>
                        Export to CSV
                    </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.tertiary }}>
                        <CardHeader>
                            <CardTitle style={{ color: theme.colors.primary }}>Revenue and Employees by Business</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={newBusinessData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.tertiary} />
                                        <XAxis dataKey="name" stroke={theme.colors.mutedText} />
                                        <YAxis yAxisId="left" stroke={theme.colors.mutedText} />
                                        <YAxis yAxisId="right" orientation="right" stroke={theme.colors.mutedText} />
                                        <Tooltip
                                            content={<ChartTooltipContent />}
                                            cursor={{ fill: theme.colors.tertiary }}
                                            wrapperStyle={{ backgroundColor: theme.colors.card, border: `1px solid ${theme.colors.tertiary}` }}
                                        />
                                        <Legend />
                                        <Bar yAxisId="left" dataKey="revenue" fill={theme.colors.primary} />
                                        <Bar yAxisId="right" dataKey="employees" fill={theme.colors.secondary} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.tertiary }}>
                        <CardHeader>
                            <CardTitle style={{ color: theme.colors.primary }}>Total Revenue Over Time (Last 6 Months)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={revenueByMonth}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.tertiary} />
                                        <XAxis dataKey="month" stroke={theme.colors.mutedText} />
                                        <YAxis stroke={theme.colors.mutedText} />
                                        <Tooltip
                                            content={<ChartTooltipContent />}
                                            cursor={{ stroke: theme.colors.primary, strokeWidth: 2 }}
                                            wrapperStyle={{ backgroundColor: theme.colors.card, border: `1px solid ${theme.colors.tertiary}` }}
                                        />
                                        <Legend />
                                        <Line type="monotone" dataKey="revenue" stroke={theme.colors.primary} activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
                <div className="mt-8">
                    <Card style={{ backgroundColor: theme.colors.card, borderColor: theme.colors.tertiary }}>
                        <CardHeader>
                            <CardTitle style={{ color: theme.colors.primary }}>Business Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <table className="w-full text-left">
                                <thead>
                                    <tr style={{ borderBottom: `2px solid ${theme.colors.tertiary}` }}>
                                        <th className="py-2 px-4">Name</th>
                                        <th className="py-2 px-4">Year Established</th>
                                        <th className="py-2 px-4">Revenue (PHP)</th>
                                        <th className="py-2 px-4">Employees</th>
                                        <th className="py-2 px-4">Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newBusinessData.map((business, index) => (
                                        <tr key={index} style={{ borderBottom: `1px solid ${theme.colors.tertiary}` }}>
                                            <td className="py-2 px-4">{business.name}</td>
                                            <td className="py-2 px-4">{business.established}</td>
                                            <td className="py-2 px-4">{business.revenue.toLocaleString()}</td>
                                            <td className="py-2 px-4">{business.employees}</td>
                                            <td className="py-2 px-4">{business.location}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default NewBusinessStatistics;
