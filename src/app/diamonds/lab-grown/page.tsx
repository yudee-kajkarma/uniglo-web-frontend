// Crawlable hub page listing every lab grown loose diamond with real links.
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
    return hubMetadata("lab-grown", parseHubPage(page));
}

export default async function LabGrownDiamondsHub({ searchParams }: Props) {
    const { page } = await searchParams;
    return <DiamondHubPage hub="lab-grown" page={parseHubPage(page)} />;
}
