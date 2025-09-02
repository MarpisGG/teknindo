import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend, Title);

interface DashboardProps {
    stats: {
        users: number;
        roles: number;
        blogs: number;
        jobs: number;
        products: number;
        messages: number;
        subscriptions: number;
        quotations: number;
    };
    visitorStats: {
        total_visitors: number;
        today_visitors: number;
        yesterday_visitors: number;
        unique_visitors: number;
        growth_percentage: number;
    };
    dailyVisitors: {
        date: string;
        visitors?: number;
        unique_visitors: number;
    }[];
    locationData: {
        city: string;
        city_code: string;
        visitors: number;
        percentage: number;
    }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, visitorStats, dailyVisitors, locationData }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* General Stats */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="rounded-xl border shadow">
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold">Total Users</h2>
                            <p className="mt-2 text-2xl font-bold">{stats.users}</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border shadow">
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold">Total Roles</h2>
                            <p className="mt-2 text-2xl font-bold">{stats.roles}</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border shadow">
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold">Total Blogs</h2>
                            <p className="mt-2 text-2xl font-bold">{stats.blogs}</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border shadow">
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold">Total Jobs</h2>
                            <p className="mt-2 text-2xl font-bold">{stats.jobs}</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border shadow">
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold">Total Products</h2>
                            <p className="mt-2 text-2xl font-bold">{stats.products}</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border shadow">
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold">Total Messages</h2>
                            <p className="mt-2 text-2xl font-bold">{stats.messages}</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border shadow">
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold">Total Subscriptions</h2>
                            <p className="mt-2 text-2xl font-bold">{stats.subscriptions}</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border shadow">
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold">Total Quotations</h2>
                            <p className="mt-2 text-2xl font-bold">{stats.quotations}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="mt-6">
                    <h2 className="mb-3 text-xl font-semibold">Quick Actions</h2>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild>
                            <Link href="admin/users/create">+ Add User</Link>
                        </Button>
                        <Button asChild>
                            <Link href="admin/roles/create">+ Add Role</Link>
                        </Button>
                        <Button asChild>
                            <Link href="admin/blogs/create">+ Add Blog</Link>
                        </Button>
                        <Button asChild>
                            <Link href="admin/jobs/create">+ Add Job</Link>
                        </Button>
                        <Button asChild>
                            <Link href="admin/products/create">+ Add Product</Link>
                        </Button>
                        <Button asChild>
                            <Link href="admin/categories/create">+ Add Category</Link>
                        </Button>
                        <Button asChild>
                            <Link href="admin/types/create">+ Add Type</Link>
                        </Button>
                    </div>
                </div>

                {/* Visitor Stats */}
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="rounded-xl border shadow">
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold">Total Visitors</h2>
                            <p className="mt-2 text-2xl font-bold">{visitorStats.total_visitors}</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border shadow">
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold">Today's Visitors</h2>
                            <p className="mt-2 text-2xl font-bold">{visitorStats.today_visitors}</p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border shadow">
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold">Growth Since Yesterday</h2>
                            <p className="mt-2 text-2xl font-bold">{visitorStats.growth_percentage}%</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Visitor Charts */}
                <div className="mt-6">
                    <h2 className="mb-3 text-xl font-semibold">Visitors by City</h2>
                    <div className="mx-auto flex w-full justify-center">
                        <Doughnut
                            data={{
                                labels: locationData.map((loc) => loc.city),
                                datasets: [
                                    {
                                        label: 'Visitors',
                                        data: locationData.map((loc) => loc.visitors),
                                        backgroundColor: [
                                            '#2563eb', // blue-600
                                            '#10b981', // emerald-500
                                            '#f59e42', // orange-400
                                            '#f43f5e', // rose-500
                                            '#a21caf', // purple-800
                                            '#fbbf24', // yellow-400
                                            '#0ea5e9', // sky-500
                                            '#e11d48', // rose-600
                                            '#22d3ee', // cyan-400
                                            '#6366f1', // indigo-500
                                        ].slice(0, locationData.length),
                                        borderColor: '#fff',
                                        borderWidth: 2,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Visitor Distribution by City',
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: function (context) {
                                                const label = context.label || '';
                                                const value = context.raw || 0;
                                                return `${label}: ${value} visitors`;
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
