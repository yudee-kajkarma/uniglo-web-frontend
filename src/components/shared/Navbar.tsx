"use client";
import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "motion/react";
import {
    Phone,
    Mail,
    Clock,
    Facebook,
    Twitter,
    Instagram,
    ChevronDown,
    ChevronRight,
    Menu,
    X,
    UserIcon,
    LogOut,
    ShoppingCart,
    ShoppingBag,
    Users,
    FileStack,
    Shield,
    FormInputIcon,
    Gem,
    UserPlus,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "@/assets/Uniglo-Logo-Horizontal1.png";
import logoIcon from "@/../public/logo/logo.png";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/context/AuthContext";
import NotificationBell from "./NotificationBell";
import { useTranslations } from "next-intl";

type SubmenuItem = {
    nameKey: string;
    href?: string;
    subItems?: { nameKey: string; href: string }[];
};

type NavLink = {
    nameKey: string;
    href: string;
    hasDropdown?: boolean;
    submenuItems?: SubmenuItem[];
};

// NOTE: "nameKey" points at a key inside messages/en.json and messages/de.json.
// Labels are translated at render time via t(nameKey) — nothing here is hardcoded English anymore.
const NAV_LINKS: NavLink[] = [
    { nameKey: "nav.about", href: "/about" },
    { nameKey: "nav.sellDiamonds", href: "/sell-your-diamonds" }, origin/prod
    {
        nameKey: "nav.services",
        href: "#",
        hasDropdown: true,
        submenuItems: [
            { nameKey: "nav.diamondManufacturing", href: "/diamond-manufacturing" },
            {
                nameKey: "nav.freeDiamondEstimation",
                href: "/the-best-price-for-your-diamonds",
            },
            {
                nameKey: "nav.diamondFinancingOptions",
                href: "/diamond-financing-options",
            },
            { nameKey: "nav.investmentDiamonds", href: "/investment-diamonds" },
            { nameKey: "nav.partners", href: "/partners" },
        ],
    },
    {
        nameKey: "nav.education",
        href: "#",
        hasDropdown: true,
        submenuItems: [
            {
                nameKey: "nav.supplyChainPolicyProcedure",
                href: "/supply-chain-policy-procedure",
            },
            { nameKey: "nav.diamond4Cs", href: "/the-diamond-4cs" },
            { nameKey: "nav.diamondCertificates", href: "/diamond-certificates" },
            { nameKey: "nav.diamondShapes", href: "/diamond-shapes" },
            { nameKey: "nav.fancyColoredDiamond", href: "/fancy-colored-diamonds" },
            { nameKey: "nav.ethicalDiamond", href: "/ethical-diamonds" },
            { nameKey: "nav.conflictFreeDiamond", href: "/conflict-free-diamonds" },
            { nameKey: "nav.securitySeals", href: "/security-seals" },
            { nameKey: "nav.oldCutDiamonds", href: "/old-cut-diamonds" },
        ],
    },
    {
        nameKey: "nav.marketplaces",
        href: "#",
        hasDropdown: true,
        submenuItems: [
            {
                nameKey: "nav.unigloDiamondsOnRapnet",
                href: "/uniglo-diamonds-on-rapnet",
            },
        ],
    },
    {
        nameKey: "nav.resources",
        href: "#",
        hasDropdown: true,
        submenuItems: [
            {
                nameKey: "nav.labGrownDiamondGuides",
                subItems: [
                    { nameKey: "nav.labGrownDiamonds", href: "/lab-grown-diamonds" },
                    {
                        nameKey: "nav.labGrownDiamondPrices",
                        href: "/lab-grown-diamond-prices",
                    },
                    {
                        nameKey: "nav.looseLabGrownDiamonds",
                        href: "/loose-lab-grown-diamonds",
                    },
                    {
                        nameKey: "nav.labGrownVsNaturalDiamonds",
                        href: "/lab-grown-diamonds-vs-natural-diamonds",
                    },
                    {
                        nameKey: "nav.labGrownDiamondsVsMoissanite",
                        href: "/lab-grown-diamonds-vs-moissanite",
                    },
                    {
                        nameKey: "nav.areLabGrownDiamondsReal",
                        href: "/are-lab-grown-diamonds-real",
                    },
                    {
                        nameKey: "nav.areLabGrownDiamondsWorthIt",
                        href: "/are-lab-grown-diamonds-worth-it",
                    },
                    {
                        nameKey: "nav.igiCertifiedLabGrownDiamonds",
                        href: "/igi-certified-lab-grown-diamonds",
                    },
                    {
                        nameKey: "nav.giaCertifiedLabGrownDiamonds",
                        href: "/gia-certified-lab-grown-diamonds",
                    },
                    {
                        nameKey: "nav.wholesaleLabGrownDiamonds",
                        href: "/wholesale-lab-grown-diamonds",
                    },
                    {
                        nameKey: "nav.labGrownDiamondSupplier",
                        href: "/lab-grown-diamond-supplier",
                    },
                ],
            },
            {
                nameKey: "nav.guideToLabGrownDiamonds", origin/prod
                href: "/guide-to-lab-grown-diamonds",
            },
            {
                nameKey: "nav.sourceLabGrownDiamonds",
                href: "/source-lab-grown-diamonds-for-jewelers",
            },
            {
                nameKey: "nav.labGrownDiamondSuppliers",
                href: "/lab-grown-diamond-supplier-jewelers",
            },
            {
                nameKey: "nav.bestLabGrownDiamondSupplierEurope",
                href: "/lab-grown-diamond-supplier-europe",
            },
            {
                nameKey: "nav.igiCertifiedLabGrownDiamondWholesale",
                href: "/igi-certified-lab-grown-diamond-wholesale",
            },
            {
                nameKey: "nav.buyLabGrownDiamondsWholesale",
                href: "/buy-lab-grown-diamonds-wholesale",
            },
            {
                nameKey: "nav.rapnetDiamondSupplierAntwerp",
                href: "/rapnet-diamond-supplier-antwerp",
            },
            {
                nameKey: "nav.weddingRingEngagementRingGuide",
                href: "/wedding-ring-engagement-ring-guide",
            },
        ],
    },
    { nameKey: "nav.blog", href: "/blogs" },
];

const ADMIN_NAV_LINKS = [
    { nameKey: "adminNav.membersManagement", href: "/members-management", icon: Users },
    { nameKey: "adminNav.createCustomer", href: "/create-customer", icon: UserPlus },
    {
        nameKey: "adminNav.enquiryManagement",
        href: "/enquiry-management",
        icon: FileStack,
    },
    {
        nameKey: "adminNav.sellDiamondsRequests",
        href: "/sell-diamonds-requests",
        icon: FormInputIcon,
    },
    { nameKey: "adminNav.myCart", href: "/cart", icon: ShoppingCart },
    { nameKey: "adminNav.myCheckout", href: "/checkout", icon: ShoppingBag },
    { nameKey: "adminNav.myHoldDiamonds", href: "/hold-diamonds", icon: Gem },
    { nameKey: "adminNav.myEnquiries", href: "/enquiries", icon: FileStack },
    { nameKey: "adminNav.myProfile", href: "/profile", icon: UserIcon },
];

const SUPER_ADMIN_NAV_LINKS = [
    { nameKey: "adminNav.membersManagement", href: "/members-management", icon: Users },
    { nameKey: "adminNav.createCustomer", href: "/create-customer", icon: UserPlus },
    {
        nameKey: "adminNav.enquiryManagement",
        href: "/enquiry-management",
        icon: FileStack,
    },
    { nameKey: "adminNav.adminManagement", href: "/admin-management", icon: Shield },
    {
        nameKey: "adminNav.sellDiamondsRequests",
        href: "/sell-diamonds-form-requests",
        icon: FormInputIcon,
    },
    { nameKey: "adminNav.myCart", href: "/cart", icon: ShoppingCart },
    { nameKey: "adminNav.myCheckout", href: "/checkout", icon: ShoppingBag },
    { nameKey: "adminNav.myHoldDiamonds", href: "/hold-diamonds", icon: Gem },
    { nameKey: "adminNav.myEnquiries", href: "/enquiries", icon: FileStack },
    { nameKey: "adminNav.myProfile", href: "/profile", icon: UserIcon },
];

const USER_NAV_LINKS = [
    { nameKey: "adminNav.myCart", href: "/cart", icon: ShoppingCart },
    { nameKey: "adminNav.myCheckout", href: "/checkout", icon: ShoppingBag },
    { nameKey: "adminNav.myHoldDiamonds", href: "/hold-diamonds", icon: Gem },
    { nameKey: "adminNav.myEnquiries", href: "/enquiries", icon: FileStack },
    { nameKey: "adminNav.myProfile", href: "/profile", icon: UserIcon },
];

export default function Navbar() {
    const t = useTranslations();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(
        null,
    );
    const { scrollY } = useScroll();
    const [lastScrollY, setLastScrollY] = useState(0);
    const { user, logout, isAuthenticated, loading } = useAuth();

    // Get role-specific nav links
    const getRoleNavLinks = () => {
        if (!user) return [];
        if (user.role === "SUPER_ADMIN") return SUPER_ADMIN_NAV_LINKS;
        if (user.role === "ADMIN") return ADMIN_NAV_LINKS;
        if (user.role === "USER") return USER_NAV_LINKS;
        return [];
    };

    useMotionValueEvent(scrollY, "change", (latest: number) => {
        if (latest > lastScrollY) {
            setIsScrolled(true);
        } else if (latest < lastScrollY) {
            setIsScrolled(false);
        }
        setLastScrollY(latest);
    });

    const roleNavLinks = getRoleNavLinks();

    const toggleMobileDropdown = (linkKey: string) => {
        setMobileDropdownOpen(
            mobileDropdownOpen === linkKey ? null : linkKey,
        );
    };

    return (
        <>
            {/* --- HEADER SECTION --- */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-2xl `}
            >
                <motion.div
                    initial={false}
                    animate={{
                        height: isScrolled ? 0 : "auto",
                        opacity: isScrolled ? 1 : 1,
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="border-b border-slate-800 hidden md:block"
                >
                    {/* BRAND BAR: Logo & Primary Buttons */}
                    <div className="px-4 lg:px-8 py-4 bg-brand-gradient border-b border-white/70">
                        <div className="lg:container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                            {/* Left Actions */}
                            <div className="hidden md:flex gap-3 lg:w-1/3 w-fit">
                                {loading ? (
                                    <>
                                        <div className="h-10 w-32 bg-gray-200/50 animate-pulse " />
                                        <div className="h-10 w-24 bg-gray-200/50 animate-pulse " />
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            asChild
                                            className="gold-reveal-btn font-cormorantGaramond uppercase"
                                        >
                                            <Link href="/inventory">
                                                <span>{t('nav.inventory')}</span>
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            className="gold-reveal-btn font-cormorantGaramond uppercase"
                                        >
                                            <Link href="/contact-us">
                                                <span>{t('nav.contact')}</span>
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                            {/* Center Logo */}
                            <div className="w-full md:w-1/3 flex justify-center items-center gap-3">
                                <Link href="/">
                                    <Image
                                        src={logo}
                                        alt="Uniglo Logo"
                                        width={350}
                                        height={100}
                                        className="object-contain"
                                    />
                                </Link>
                            </div>
                            {/* Right Actions */}
                            <div className="hidden md:flex gap-3 lg:w-1/3 max-w-1/3 justify-end">
                                {loading ? (
                                    <>
                                        <div className="h-10 w-32 bg-gray-200/50 animate-pulse " />
                                        <div className="h-10 w-24 bg-gray-200/50 animate-pulse " />
                                    </>
                                ) : isAuthenticated && user ? (
                                    <>
                                        <NotificationBell />

                                        {/* Profile Button with Dropdown */}
                                        <div className="relative group">
                                            <Button className="gold-reveal-btn font-cormorantGaramond uppercase flex items-center gap-2">
                                                <span className="flex items-center gap-1">
                                                    <UserIcon size={16} />
                                                    <span>{user.username}</span>
                                                    <ChevronDown
                                                        size={14}
                                                        className="group-hover:rotate-180 transition-transform duration-300"
                                                    />
                                                </span>
                                            </Button>

                                            {/* Dropdown Menu */}
                                            {roleNavLinks.length > 0 && (
                                                <div className="absolute top-full right-0 mt-0 w-56 bg-white border-t-2 border-[#c5a059] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl transform group-hover:translate-y-0 translate-y-2 z-60">
                                                    <div className="flex flex-col text-black font-cormorantGaramond text-base normal-case tracking-normal">
                                                        {roleNavLinks.map(
                                                            (link) => (
                                                                <Link
                                                                    key={
                                                                        link.nameKey
                                                                    }
                                                                    href={
                                                                        link.href
                                                                    }
                                                                    className="p-3 slide-down-link flex items-center gap-2"
                                                                >
                                                                    <span className="flex items-center gap-2">
                                                                        {link.icon && (
                                                                            <link.icon
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        )}
                                                                        {
                                                                            t(link.nameKey)
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            ),
                                                        )}
                                                        <div className="border-t border-gray-200"></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <Button
                                            onClick={logout}
                                            className="gold-reveal-btn font-cormorantGaramond uppercase flex items-center gap-2"
                                        >
                                            <span className="flex items-center gap-1">
                                                <LogOut size={16} />
                                                <span>{t('nav.logout')}</span>
                                            </span>
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            asChild
                                            className="gold-reveal-btn font-cormorantGaramond uppercase"
                                        >
                                            <Link href="/login">
                                                <span>{t('nav.login')}</span>
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            className="gold-reveal-btn font-cormorantGaramond uppercase"
                                        >
                                            <Link href="/register">
                                                <span>{t('nav.signup')}</span>
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* NAV BAR */}
                <nav
                    className={`bg-brand-gradient py-3 w-full border-b border-white/10 relative z-50 transition-colors duration-300 `}
                >
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="flex justify-between md:justify-center items-center h-14">
                            {/* Mobile Menu Toggle */}
                            <div className="md:hidden flex items-center gap-4 w-full justify-between">
                                <Link
                                    href="/"
                                    className="font-serif text-2xl text-white flex items-center gap-2"
                                >
                                    <Image
                                        src={logoIcon}
                                        alt="Uniglo Logo"
                                        width={40}
                                        height={50}
                                        className="object-contain"
                                    />
                                    UNIGLO
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(!isMobileMenuOpen);
                                        setMobileDropdownOpen(null);
                                    }}
                                    className="text-white z-50"
                                >
                                    {isMobileMenuOpen ? (
                                        <X size={28} />
                                    ) : (
                                        <Menu size={28} />
                                    )}
                                </button>
                            </div>

                            {/* Desktop Links */}
                            <ul className="hidden md:flex items-center gap-8 text-xs font-medium tracking-widest uppercase text-slate-300">
                                {NAV_LINKS.map((link) => (
                                    <li
                                        key={link.nameKey}
                                        className="group relative py-4 cursor-pointer"
                                    >
                                        <Link
                                            href={link.href}
                                            className="flex items-center gap-1 font-cormorantGaramond text-lg text-primary font-bold "
                                        >
                                            {t(link.nameKey)}
                                            {link.hasDropdown && (
                                                <ChevronDown
                                                    size={10}
                                                    className="group-hover:rotate-180 transition-transform duration-300"
                                                />
                                            )}
                                        </Link>

                                        {/* Desktop Dropdown */}
                                        {link.hasDropdown && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-48 bg-white border-t-2 border-[#c5a059] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl transform group-hover:translate-y-0 translate-y-2">
                                                <div className="flex flex-col text-black font-cormorantGaramond text-base normal-case tracking-normal ">
                                                    {link.submenuItems?.map(
                                                        (submenu) =>
                                                            submenu.subItems ? (
                                                                <div
                                                                    key={
                                                                        submenu.nameKey
                                                                    }
                                                                    className="relative group/sub"
                                                                >
                                                                    <button className="w-full p-3 slide-down-link flex items-center justify-between gap-2 text-left">
                                                                        <span>
                                                                            {
                                                                                t(submenu.nameKey)
                                                                            }
                                                                        </span>
                                                                        <ChevronRight
                                                                            size={
                                                                                14
                                                                            }
                                                                            className="shrink-0"
                                                                        />
                                                                    </button>
                                                                    {/* Side flyout panel */}
                                                                    <div className="absolute top-0 right-full w-[26rem] bg-white border-t-2 border-[#c5a059] opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 shadow-xl z-50">
                                                                        <div className="grid grid-cols-2 text-black font-cormorantGaramond text-base normal-case tracking-normal">
                                                                            {submenu.subItems.map(
                                                                                (
                                                                                    item,
                                                                                ) => (
                                                                                    <Link
                                                                                        key={
                                                                                            item.nameKey
                                                                                        }
                                                                                        href={
                                                                                            item.href
                                                                                        }
                                                                                        className="p-3 slide-down-link"
                                                                                    >
                                                                                        <span>
                                                                                            {
                                                                                                t(item.nameKey)
                                                                                            }
                                                                                        </span>
                                                                                    </Link>
                                                                                ),
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <Link
                                                                    key={
                                                                        submenu.nameKey
                                                                    }
                                                                    href={
                                                                        submenu.href ??
                                                                        "#"
                                                                    }
                                                                    className="p-3 slide-down-link"
                                                                >
                                                                    <span>
                                                                        {
                                                                            t(submenu.nameKey)
                                                                        }
                                                                    </span>
                                                                </Link>
                                                            ), origin/prod
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Mobile Menu Drawer */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden bg-slate-900 border-t border-slate-800 overflow-hidden absolute top-full left-0 right-0 max-h-[calc(100vh-80px)] overflow-y-auto"
                            >
                                <div className="flex flex-col p-4 gap-2">
                                    {/* Navigation Links */}
                                    {NAV_LINKS.map((link) => (
                                        <div key={link.nameKey}>
                                            {link.hasDropdown ? (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            toggleMobileDropdown(
                                                                link.nameKey,
                                                            )
                                                        }
                                                        className="w-full text-left text-primary text-base uppercase tracking-wider py-3 border-b border-slate-800 font-cormorantGaramond font-bold flex justify-between items-center"
                                                    >
                                                        {t(link.nameKey)}
                                                        <ChevronDown
                                                            size={16}
                                                            className={`transition-transform duration-300 ${
                                                                mobileDropdownOpen ===
                                                                link.nameKey
                                                                    ? "rotate-180"
                                                                    : ""
                                                            }`}
                                                        />
                                                    </button>
                                                    <AnimatePresence>
                                                        {mobileDropdownOpen ===
                                                            link.nameKey && (
                                                            <motion.div
                                                                initial={{
                                                                    height: 0,
                                                                    opacity: 0,
                                                                }}
                                                                animate={{
                                                                    height: "auto",
                                                                    opacity: 1,
                                                                }}
                                                                exit={{
                                                                    height: 0,
                                                                    opacity: 0,
                                                                }}
                                                                transition={{
                                                                    duration: 0.2,
                                                                }}
                                                                className="overflow-hidden bg-slate-800/50"
                                                            >
                                                                {link.submenuItems?.map(
                                                                    (submenu) =>
                                                                        submenu.subItems ? (
                                                                            <div
                                                                                key={
                                                                                    submenu.nameKey
                                                                                }
                                                                            >
                                                                                <p className="text-primary/70 text-xs uppercase tracking-wider py-2 px-6 font-cormorantGaramond">
                                                                                    {
                                                                                        t(submenu.nameKey)
                                                                                    }
                                                                                </p>
                                                                                {submenu.subItems.map(
                                                                                    (
                                                                                        item,
                                                                                    ) => (
                                                                                        <Link
                                                                                            key={
                                                                                                item.nameKey
                                                                                            }
                                                                                            href={
                                                                                                item.href
                                                                                            }
                                                                                            className="block text-slate-300 text-sm py-2 px-9 font-cormorantGaramond hover:text-primary transition-colors"
                                                                                            onClick={() => {
                                                                                                setIsMobileMenuOpen(
                                                                                                    false,
                                                                                                );
                                                                                                setMobileDropdownOpen(
                                                                                                    null,
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            {
                                                                                                t(item.nameKey)
                                                                                            }
                                                                                        </Link>
                                                                                    ),
                                                                                )}
                                                                            </div>
                                                                        ) : (
                                                                            <Link
                                                                                key={
                                                                                    submenu.nameKey
                                                                                }
                                                                                href={
                                                                                    submenu.href ??
                                                                                    "#"
                                                                                }
                                                                                className="block text-slate-300 text-sm py-2 px-6 font-cormorantGaramond hover:text-primary transition-colors"
                                                                                onClick={() => {
                                                                                    setIsMobileMenuOpen(
                                                                                        false,
                                                                                    );
                                                                                    setMobileDropdownOpen(
                                                                                        null,
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {
                                                                                    t(submenu.nameKey)
                                                                                }
                                                                            </Link>
                                                                        ), origin/prod
                                                                )}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    className="block text-primary text-base uppercase tracking-wider py-3 border-b border-slate-800 font-cormorantGaramond font-bold"
                                                    onClick={() =>
                                                        setIsMobileMenuOpen(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    {t(link.nameKey)}
                                                </Link>
                                            )}
                                        </div>
                                    ))}

                                    {/* Role-specific links for mobile */}
                                    {isAuthenticated &&
                                        roleNavLinks.length > 0 && (
                                            <div className="border-t border-slate-700 pt-2 mt-2">
                                                <p className="text-primary text-xs uppercase px-2 mb-2 font-cormorantGaramond">
                                                    {t('nav.myAccount')}
                                                </p>
                                                <div className="px-2 pb-3">
                                                    <NotificationBell className="border-slate-700 bg-slate-800 hover:bg-slate-700" />
                                                </div>
                                                {roleNavLinks.map((link) => (
                                                    <Link
                                                        key={link.nameKey}
                                                        href={link.href}
                                                        className="text-slate-300 text-sm uppercase tracking-wider py-2 border-b border-slate-800 font-cormorantGaramond flex items-center gap-2"
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        {link.icon && (
                                                            <link.icon
                                                                size={16}
                                                            />
                                                        )}
                                                        {t(link.nameKey)}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-700">
                                        <Button
                                            asChild
                                            className="gold-reveal-btn font-cormorantGaramond uppercase w-full py-6 text-base font-bold"
                                        >
                                            <Link
                                                href="/inventory"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                <span>{t('nav.inventory')}</span>
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            className="gold-reveal-btn font-cormorantGaramond uppercase w-full py-6 text-base font-bold"
                                        >
                                            <Link
                                                href="/contact-us"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                <span>{t('nav.contact')}</span>
                                            </Link>
                                        </Button>
                                        {isAuthenticated ? (
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="w-full py-3 border-2 border-red-500 text-white text-base font-cormorantGaramond font-bold uppercase rounded hover:bg-red-500 transition-colors"
                                            >
                                                {t('nav.logout')}
                                            </button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <Button
                                                    asChild
                                                    className="gold-reveal-btn font-cormorantGaramond uppercase flex-1 py-6 text-base font-bold"
                                                >
                                                    <Link
                                                        href="/login"
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        <span>{t('nav.login')}</span>
                                                    </Link>
                                                </Button>
                                                <Button
                                                    asChild
                                                    className="gold-reveal-btn font-cormorantGaramond uppercase flex-1 py-6 text-base font-bold"
                                                >
                                                    <Link
                                                        href="/register"
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        <span>{t('nav.signup')}</span>
                                                    </Link>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </header>
        </>
    );
}