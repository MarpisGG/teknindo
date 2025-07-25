// AppSidebar.tsx

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Archive, BookOpen, FileText, FileUser, Folder, Layers, LayoutGrid, Mail, MessageCircle, Newspaper, UsersRound } from 'lucide-react';

interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
        permissions: string[];
    };
    [key: string]: any; // Allow additional properties for Inertia.js PageProps
}

// 👇 Sidebar item dengan permission
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: UsersRound,
        permission: 'user-create',
    },
    {
        title: 'Roles',
        href: '/admin/roles',
        icon: UsersRound,
        permission: 'role-create',
    },
    {
        title: 'Blogs',
        href: '/admin/blogs',
        icon: Newspaper,
        permission: 'blog-create',
    },
    {
        title: 'Jobs',
        href: '/admin/jobs',
        icon: FileUser,
        permission: 'job-create',
    },
    {
        title: 'Products',
        href: '/admin/products',
        icon: Archive,
        permission: 'product-create',
    },
    {
        title: 'Category Products',
        href: '/admin/categories',
        icon: Folder,
        permission: 'product-create',
    },
    {
        title: 'Product Types',
        href: '/admin/types',
        icon: Layers,
        permission: 'product-create',
    },
    {
        title: 'Message',
        href: '/admin/messages',
        icon: MessageCircle,
        permission: 'message-list',
    },
    {
        title: 'Subscriptions',
        href: '/admin/subscriptions',
        icon: Mail,
        permission: 'subscription-list',
    },
    {
        title: 'Quotation',
        href: '/admin/quotations',
        icon: FileText,
        permission: 'product-list',
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<PageProps>().props;
    const userPermissions = auth?.permissions || [];

    const filteredItems = mainNavItems.filter((item) => !item.permission || userPermissions.includes(item.permission));

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <div className="ml-1 grid flex-1 text-left text-sm">
                                    <span className="mb-0.5 truncate leading-tight font-semibold">Teknindo Group Admin</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
