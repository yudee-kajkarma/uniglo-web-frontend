// Crawlable hub page listing every natural loose diamond with real links.
import type { Metadata } from "next";
import {
    DiamondHubPage,
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
    return hubMetadata("natural", parseHubPage(page));
}

export default async function NaturalDiamondsHub({ searchParams }: Props) {
    const { page } = await searchParams;
    return <DiamondHubPage hub="natural" page={parseHubPage(page)} />;
}
