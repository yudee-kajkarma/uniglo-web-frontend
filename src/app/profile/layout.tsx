import SiteChrome from "@/components/shared/SiteChrome";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SiteChrome>{children}</SiteChrome>;
}
