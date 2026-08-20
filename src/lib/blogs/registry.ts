// Central registry of blogs served by the shared on-demand `blogs/[slug]`
// route. Each entry maps a blog slug to the next-intl namespace that holds
// its content (title / sections / faqs).
//
// Only the "standard" blogs — the ones rendered generically via
// DynamicArticle + FAQSection — live here. Blogs with a bespoke layout keep
// their own folder under `blogs/<slug>/`; a real folder always wins over the
// `[slug]` catch-all, so they are intentionally omitted.
//
// Migration note: while the individual `blogs/<slug>/page.tsx` folders still
// exist they take precedence, so adding a slug here is a no-op until that
// folder is deleted. Delete folders one at a time and verify the slug renders
// through the shared route.

export interface BlogEntry {
    slug: string;
    /** next-intl namespace holding this blog's content. */
    namespace: string;
}

export const BLOGS: BlogEntry[] = [
    { slug: "3-carat-diamond-ring-guide", namespace: "blog3CaratDiamondRingGuide" },
    { slug: "3-carat-lab-grown-diamond-price-2026", namespace: "blog3CaratLabGrownDiamondPrice2026" },
    { slug: "3-carat-natural-diamond-price-2026", namespace: "blog3CaratNaturalDiamondPrice2026" },
    { slug: "4-carat-lab-grown-diamond-price-2026", namespace: "blog4CaratLabGrownDiamondPrice2026" },
    { slug: "antwerp-certified-lab-grown-diamonds-hrd-certificate-guide", namespace: "blogAntwerpCertifiedLabGrownDiamondsHrdCertificateGuide" },
    { slug: "antwerp-mothers-day-15-august-practical-guide", namespace: "blogAntwerpMothersDay15AugustPracticalGuide" },
    { slug: "are-lab-grown-diamonds-ethical", namespace: "blogAreLabGrownDiamondsEthical" },
    { slug: "are-lab-grown-diamonds-real", namespace: "blogAreLabGrownDiamondsReal" },
    { slug: "best-diamond-settings-for-engagement-rings", namespace: "blogBestDiamondSettingsForEngagementRings" },
    { slug: "best-diamond-shapes-for-engagement-rings", namespace: "blogBestDiamondShapesForEngagementRings" },
    { slug: "best-diamond-size-for-engagement-ring", namespace: "blogBestDiamondSizeForEngagementRing" },
    { slug: "best-place-to-buy-lab-grown-diamonds-antwerp", namespace: "blogBestPlaceToBuyLabGrownDiamondsAntwerp" },
    { slug: "cheap-diamonds-antwerp-vs-lab-grown-diamond-value", namespace: "blogCheapDiamondsAntwerpVsLabGrownDiamondValue" },
    { slug: "circle-of-love-valentines-day-diamonds", namespace: "blogCircleOfLoveValentinesDayDiamonds" },
    { slug: "custom-diamond-jewelry-design-guide-2026", namespace: "blogCustomDiamondJewelryDesignGuide2026" },
    { slug: "cvd-vs-hpht-diamonds-which-is-better", namespace: "blogCvdVsHphtDiamondsWhichIsBetter" },
    { slug: "diamond-buying-checklist-2026", namespace: "blogDiamondBuyingChecklist2026" },
    { slug: "diamond-certification-vs-appraisal", namespace: "blogDiamondCertificationVsAppraisal" },
    { slug: "diamond-color-vs-clarity-which-matters", namespace: "blogDiamondColorVsClarityWhichMatters" },
    { slug: "diamond-cut-vs-clarity-which-matters", namespace: "blogDiamondCutVsClarityWhichMatters" },
    { slug: "diamond-cut-vs-color-which-matters", namespace: "blogDiamondCutVsColorWhichMatters" },
    { slug: "diamond-fluorescence-explained-good-or-bad", namespace: "blogDiamondFluorescenceExplainedGoodOrBad" },
    { slug: "diamond-jewelry-pieces-that-look-expensive", namespace: "blogDiamondJewelryPiecesThatLookExpensive" },
    { slug: "diamond-resale-value-guide", namespace: "blogDiamondResaleValueGuide" },
    { slug: "diamonds-are-not-made-from-coal", namespace: "blogDiamondsAreNotMadeFromCoal" },
    { slug: "disadvantages-of-lab-grown-diamonds", namespace: "blogDisadvantagesOfLabGrownDiamonds" },
    { slug: "do-lab-grown-diamonds-hold-value", namespace: "blogDoLabGrownDiamondsHoldValue" },
    { slug: "do-lab-grown-diamonds-pass-diamond-tester", namespace: "blogDoLabGrownDiamondsPassDiamondTester" },
    { slug: "gia-certified-lab-grown-diamonds-guide", namespace: "blogGiaCertifiedLabGrownDiamondsGuide" },
    { slug: "how-are-lab-grown-diamonds-made-cvd-vs-hpht", namespace: "blogHowAreLabGrownDiamondsMadeCvdVsHpht" },
    { slug: "how-to-buy-diamond-online-safely", namespace: "blogHowToBuyDiamondOnlineSafely" },
    { slug: "how-to-buy-lab-grown-diamond-ring-antwerp", namespace: "blogHowToBuyLabGrownDiamondRingAntwerp" },
    { slug: "how-to-choose-engagement-ring-guide", namespace: "blogHowToChooseEngagementRingGuide" },
    { slug: "how-to-choose-jewellery-gift-for-mum", namespace: "blogHowToChooseJewelleryGiftForMum" },
    { slug: "how-to-choose-natural-diamond-supplier", namespace: "blogHowToChooseNaturalDiamondSupplier" },
    { slug: "how-to-clean-diamond-jewelry-at-home", namespace: "blogHowToCleanDiamondJewelryAtHome" },
    { slug: "how-to-insure-diamond-jewelry", namespace: "blogHowToInsureDiamondJewelry" },
    { slug: "how-to-know-if-diamond-ring-is-real", namespace: "blogHowToKnowIfDiamondRingIsReal" },
    { slug: "how-to-match-lab-grown-diamond-wedding-band-engagement-ring-2026", namespace: "blogHowToMatchLabGrownDiamondWeddingBandEngagementRing2026" },
    { slug: "how-to-spot-fake-diamond", namespace: "blogHowToSpotFakeDiamond" },
    { slug: "how-to-store-diamond-jewelry-safely", namespace: "blogHowToStoreDiamondJewelrySafely" },
    { slug: "how-to-tell-if-a-diamond-is-real-at-home", namespace: "blogHowToTellIfADiamondIsRealAtHome" },
    { slug: "jewellery-assortment-planning", namespace: "blogJewelleryAssortmentPlanning" },
    { slug: "jewellery-gift-without-knowing-ring-size", namespace: "blogJewelleryGiftWithoutKnowingRingSize" },
    { slug: "jewellery-show-london-2026-exhibitors", namespace: "blogJewelleryShowLondon2026Exhibitors" },
    { slug: "jewellery-show-london-2026-programme", namespace: "blogJewelleryShowLondon2026Programme" },
    { slug: "jewellery-show-london-2026-visitor-guide", namespace: "blogJewelleryShowLondon2026VisitorGuide" },
    { slug: "jewellery-that-speaks-love-valentines-day", namespace: "blogJewelleryThatSpeaksLoveValentinesDay" },
    { slug: "jewellery-trade-show-buyer-checklist", namespace: "blogJewelleryTradeShowBuyerChecklist" },
    { slug: "lab-grown-diamond-earrings-buying-guide", namespace: "blogLabGrownDiamondEarringsBuyingGuide" },
    { slug: "lab-grown-diamond-engagement-rings", namespace: "blogLabGrownDiamondEngagementRings" },
    { slug: "lab-grown-diamond-necklace-buying-guide", namespace: "blogLabGrownDiamondNecklaceBuyingGuide" },
    { slug: "lab-grown-diamond-resale-value-2026", namespace: "blogLabGrownDiamondResaleValue2026" },
    { slug: "lab-grown-diamond-rings-buying-guide-2026", namespace: "blogLabGrownDiamondRingsBuyingGuide2026" },
    { slug: "lab-grown-diamond-tennis-bracelet-buying-guide", namespace: "blogLabGrownDiamondTennisBraceletBuyingGuide" },
    { slug: "lab-grown-diamond-wedding-band-trends-2026", namespace: "blogLabGrownDiamondWeddingBandTrends2026" },
    { slug: "lab-grown-diamonds-in-belgium", namespace: "blogLabGrownDiamondsInBelgium" },
    { slug: "lab-grown-vs-natural-diamond-price-2026", namespace: "blogLabGrownVsNaturalDiamondPrice2026" },
    { slug: "lab-grown-vs-natural-diamond-resale-value", namespace: "blogLabGrownVsNaturalDiamondResaleValue" },
    { slug: "last-minute-mothers-day-gift-antwerp", namespace: "blogLastMinuteMothersDayGiftAntwerp" },
    { slug: "little-sparks-forever-love-valentines-day", namespace: "blogLittleSparksForeverLoveValentinesDay" },
    { slug: "looks-expensive-diamond-edit", namespace: "blogLooksExpensiveDiamondEdit" },
    { slug: "minimal-bridal-diamond-jewellery-modern-wedding", namespace: "minimalBridalBlog" },
    { slug: "modern-heirloom-jewelry-designed-to-last", namespace: "blogModernHeirloomJewelryDesignedToLast" },
    { slug: "mothers-day-natural-vs-lab-grown-diamond-gift", namespace: "blogMothersDayNaturalVsLabGrownDiamondGift" },
    { slug: "natural-diamond-necklace-buying-guide", namespace: "blogNaturalDiamondNecklaceBuyingGuide" },
    { slug: "natural-diamond-rings-buying-guide-2026", namespace: "blogNaturalDiamondRingsBuyingGuide2026" },
    { slug: "natural-diamond-stud-earrings-buying-guide", namespace: "blogNaturalDiamondStudEarringsBuyingGuide" },
    { slug: "natural-diamond-tennis-bracelet-buying-guide", namespace: "blogNaturalDiamondTennisBraceletBuyingGuide" },
    { slug: "natural-vs-lab-created-diamonds-two-origins-one-emotion", namespace: "blogNaturalVsLabCreatedDiamondsTwoOriginsOneEmotion" },
    { slug: "natural-vs-lab-grown-diamonds-guide", namespace: "blogNaturalVsLabGrownDiamondsGuide" },
    { slug: "oval-diamond-obsession", namespace: "blogOvalDiamondObsession" },
    { slug: "oval-diamond-rings-why-popular-who-they-suit", namespace: "blogOvalDiamondRingsWhyPopularWhoTheySuit" },
    { slug: "radiant-cut-diamond-guide", namespace: "blogRadiantCutDiamondGuide" },
    { slug: "should-jewellery-be-a-surprise-gift-mothers-day", namespace: "blogShouldJewelleryBeASurpriseGiftMothersDay" },
    { slug: "si-vs-vs-diamonds-which-better", namespace: "blogSiVsVsDiamondsWhichBetter" },
    { slug: "summer-2026-bridal-guide-engagement-rings-wedding-bands-couples", namespace: "blogSummer2026BridalGuideEngagementRingsWeddingBandsCouples" },
    { slug: "uk-jewellery-trends-2026", namespace: "blogUkJewelleryTrends2026" },
    { slug: "uniglo-25th-anniversary-diamonds-memories-legacy", namespace: "blogUniglo25thAnniversaryDiamondsMemoriesLegacy" },
    { slug: "uniglo-at-cannes-festival-2026", namespace: "blogUnigloAtCannesFestival2026" },
    { slug: "uniglo-jewels-cannes-2026-pink-diamonds", namespace: "blogUnigloJewelsCannes2026PinkDiamonds" },
    { slug: "valentines-day-diamond-gifts-for-every-heart", namespace: "circleOfLoveBlog" },
    { slug: "valentines-day-diamond-jewellery-for-children", namespace: "littleSparksBlog" },
    { slug: "valentines-day-diamond-jewellery-gifts", namespace: "speaksLoveBlog" },
    { slug: "vs-vs-vvs-diamonds-difference", namespace: "blogVsVsVvsDiamondsDifference" },
    { slug: "what-are-the-4-types-of-diamonds", namespace: "blogWhatAreThe4TypesOfDiamonds" },
    { slug: "what-does-a-real-diamond-look-like", namespace: "blogWhatDoesARealDiamondLookLike" },
    { slug: "what-is-a-lab-grown-diamond-guide", namespace: "blogWhatIsALabGrownDiamondGuide" },
    { slug: "what-is-diamond-certification-gia-vs-igi", namespace: "blogWhatIsDiamondCertificationGiaVsIgi" },
    { slug: "what-to-wear-summer-wedding-2026-fine-jewellery-guest-guide", namespace: "blogWhatToWearSummerWedding2026FineJewelleryGuestGuide" },
    { slug: "where-to-buy-lab-grown-diamonds-online-belgium", namespace: "blogWhereToBuyLabGrownDiamondsOnlineBelgium" },
    { slug: "why-antwerp-celebrates-mothers-day-15-august", namespace: "blogWhyAntwerpCelebratesMothersDay15August" },
    { slug: "why-are-lab-grown-diamonds-cheaper-than-natural", namespace: "blogWhyAreLabGrownDiamondsCheaperThanNatural" },
    { slug: "why-are-lab-grown-diamonds-so-expensive", namespace: "blogWhyAreLabGrownDiamondsSoExpensive" },
    { slug: "why-diamonds-mean-forever", namespace: "blogWhyDiamondsMeanForever" },
];

const BLOG_BY_SLUG = new Map(BLOGS.map((entry) => [entry.slug, entry]));

export function getBlogEntry(slug: string): BlogEntry | undefined {
    return BLOG_BY_SLUG.get(slug);
}
