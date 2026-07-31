import SiteChrome from "@/components/shared/SiteChrome";

export default function SuperAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SiteChrome>{children}</SiteChrome>;
}
