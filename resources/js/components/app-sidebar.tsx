// AppSidebar.tsx

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Archive,
    BookOpen,
    Briefcase,
    Building2,
    ClipboardList,
    FileUser,
    Folder,
    Globe,
    Layers,
    LayoutGrid,
    Mail,
    MapPin,
    MessageCircle,
    Newspaper,
    PlayCircle,
    Quote,
    Star,
    Tags,
    UsersRound,
} from 'lucide-react';

interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
        permissions: string[];
    };
    [key: string]: any;
}

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
        icon: Tags,
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
        icon: Quote,
        permission: 'quotation-list',
    },
    {
        title: 'Quotation Product',
        href: '/admin/quotation-products',
        icon: ClipboardList,
        permission: 'product-quotation-list',
    },
    {
        title: 'Quotation Services',
        href: '/admin/quotation-services',
        icon: Briefcase,
        permission: 'product-quotation-list',
    },
    {
        title: 'Testimonials',
        href: '/admin/testimonis',
        icon: Star,
        permission: 'testimonial-list',
    },
    {
        title: 'Location',
        href: '/admin/locations',
        icon: MapPin,
        permission: 'location-list',
    },
    {
        title: 'Location Footer',
        href: '/admin/location-footers',
        icon: Globe,
        permission: 'location-footer-list',
    },
    {
        title: 'Company',
        href: '/admin/companies',
        icon: Building2,
        permission: 'company-list',
    },
    {
        title: 'Landing Video',
        href: '/admin/landing-videos',
        icon: PlayCircle,
        permission: 'landing-video-list',
    },
    {
        title: 'Customer',
        href: '/admin/customers',
        icon: BookOpen,
        permission: 'customer-list',
    },
    {
        title: 'Business',
        href: '/admin/businesses',
        icon: Briefcase,
        permission: 'business-list',
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
