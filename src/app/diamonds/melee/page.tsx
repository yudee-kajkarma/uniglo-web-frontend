// Crawlable hub page listing every melee diamond parcel with real links.
import type { Metadata } from "next";
import {
    MelleHubPage,
    hubMetadata,
    parseHubPage,
} from "@/components/seo/DiamondHubPage";

interface Props {
    searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
    searchParams,
}: Props): Promise<Metadata> {
    const { page } = await searchParams;
    return hubMetadata("melee", parseHubPage(page));
}

export default async function MeleeDiamondsHub({ searchParams }: Props) {
    const { page } = await searchParams;
    return <MelleHubPage page={parseHubPage(page)} />;
}
