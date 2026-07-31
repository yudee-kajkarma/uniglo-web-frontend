import SiteChrome from "@/components/shared/SiteChrome";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SiteChrome>{children}</SiteChrome>;
}
