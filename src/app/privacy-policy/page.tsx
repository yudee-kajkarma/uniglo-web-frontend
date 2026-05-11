export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-brand-gradient text-white">
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
                {/* Header */}
                <div className="mb-12 border-b border-[#bb923a]/30 pb-8">
                    <h1
                        className="text-4xl md:text-5xl font-semibold mb-4"
                        style={{
                            fontFamily: "var(--font-cormorant-garamond)",
                            color: "#e7d7b4",
                        }}
                    >
                        Privacy Policy
                    </h1>
                    <p
                        className="text-sm text-[#d1b06b]"
                        style={{ fontFamily: "var(--font-lato)" }}
                    >
                        Effective as of 2026-03-04
                    </p>
                </div>

                {/* Content */}
                <div
                    className="space-y-10 text-[#e7d7b4]/80 leading-relaxed"
                    style={{ fontFamily: "var(--font-lato)" }}
                >
                    <p>
                        This privacy policy applies to the{" "}
                        <span className="text-[#bb923a] font-medium">
                            Uniglo Diamonds
                        </span>{" "}
                        app (hereby referred to as &ldquo;Application&rdquo;)
                        for mobile devices that was created by Uniglo Diamonds
                        (hereby referred to as &ldquo;Service Provider&rdquo;)
                        as a Free service. This service is intended for use
                        &ldquo;AS IS&rdquo;.
                    </p>

                    {/* Section */}
                    <section>
                        <h2
                            className="text-2xl font-semibold text-[#e7d7b4] mb-4"
                            style={{
                                fontFamily: "var(--font-cormorant-garamond)",
                            }}
                        >
                            Information Collection and Use
                        </h2>
                        <p className="mb-4">
                            The Application collects information when you
                            download and use it. This information may include
                            information such as:
                        </p>
                        <ul className="list-none space-y-2 pl-4">
                            {[
                                "Your device's Internet Protocol address (e.g. IP address)",
                                "The pages of the Application that you visit, the time and date of your visit, the time spent on those pages",
                                "The time spent on the Application",
                                "The operating system you use on your mobile device",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#bb923a] flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4">
                            The Application does not gather precise information
                            about the location of your mobile device.
                        </p>
                        <p className="mt-4">
                            The Application does not use Artificial Intelligence
                            (AI) technologies to process your data or provide
                            features.
                        </p>
                        <p className="mt-4">
                            The Service Provider may use the information you
                            provided to contact you from time to time to provide
                            you with important information, required notices and
                            marketing promotions.
                        </p>
                        <p className="mt-4">
                            For a better experience, while using the
                            Application, the Service Provider may require you to
                            provide us with certain personally identifiable
                            information. The information that the Service
                            Provider request will be retained by them and used
                            as described in this privacy policy.
                        </p>
                    </section>

                    {/* Section */}
                    <section>
                        <h2
                            className="text-2xl font-semibold text-[#e7d7b4] mb-4"
                            style={{
                                fontFamily: "var(--font-cormorant-garamond)",
                            }}
                        >
                            Third Party Access
                        </h2>
                        <p className="mb-4">
                            Only aggregated, anonymized data is periodically
                            transmitted to external services to aid the Service
                            Provider in improving the Application and their
                            service. The Service Provider may share your
                            information with third parties in the ways that are
                            described in this privacy statement.
                        </p>
                        <p className="mb-4">
                            The Service Provider may disclose User Provided and
                            Automatically Collected Information:
                        </p>
                        <ul className="list-none space-y-3 pl-4">
                            {[
                                "as required by law, such as to comply with a subpoena, or similar legal process;",
                                "when they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;",
                                "with their trusted services providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#bb923a] flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Section */}
                    <section>
                        <h2
                            className="text-2xl font-semibold text-[#e7d7b4] mb-4"
                            style={{
                                fontFamily: "var(--font-cormorant-garamond)",
                            }}
                        >
                            Opt-Out Rights
                        </h2>
                        <p>
                            You can stop all collection of information by the
                            Application easily by uninstalling it. You may use
                            the standard uninstall processes as may be available
                            as part of your mobile device or via the mobile
                            application marketplace or network.
                        </p>
                    </section>

                    {/* Section */}
                    <section>
                        <h2
                            className="text-2xl font-semibold text-[#e7d7b4] mb-4"
                            style={{
                                fontFamily: "var(--font-cormorant-garamond)",
                            }}
                        >
                            Data Retention Policy
                        </h2>
                        <p>
                            The Service Provider will retain User Provided data
                            for as long as you use the Application and for a
                            reasonable time thereafter. If you&apos;d like them
                            to delete User Provided Data that you have provided
                            via the Application, please contact them at{" "}
                            <a
                                href="mailto:sales@uniglodiamonds.com"
                                className="text-[#bb923a] hover:text-[#e7d7b4] underline underline-offset-2 transition-colors"
                            >
                                sales@uniglodiamonds.com
                            </a>{" "}
                            and they will respond in a reasonable time.
                        </p>
                    </section>

                    {/* Section */}
                    <section>
                        <h2
                            className="text-2xl font-semibold text-[#e7d7b4] mb-4"
                            style={{
                                fontFamily: "var(--font-cormorant-garamond)",
                            }}
                        >
                            Children
                        </h2>
                        <p className="mb-4">
                            The Service Provider does not use the Application to
                            knowingly solicit data from or market to children
                            under the age of 13.
                        </p>
                        <p className="mb-4">
                            The Service Provider does not knowingly collect
                            personally identifiable information from children.
                            The Service Provider encourages all children to
                            never submit any personally identifiable information
                            through the Application and/or Services. The Service
                            Provider encourage parents and legal guardians to
                            monitor their children&apos;s Internet usage and to
                            help enforce this Policy by instructing their
                            children never to provide personally identifiable
                            information through the Application and/or Services
                            without their permission.
                        </p>
                        <p className="mb-4">
                            If you have reason to believe that a child has
                            provided personally identifiable information to the
                            Service Provider through the Application and/or
                            Services, please contact the Service Provider at{" "}
                            <a
                                href="mailto:sales@uniglodiamonds.com"
                                className="text-[#bb923a] hover:text-[#e7d7b4] underline underline-offset-2 transition-colors"
                            >
                                sales@uniglodiamonds.com
                            </a>{" "}
                            so that they will be able to take the necessary
                            actions.
                        </p>
                        <p>
                            You must also be at least 16 years of age to consent
                            to the processing of your personally identifiable
                            information in your country (in some countries we
                            may allow your parent or guardian to do so on your
                            behalf).
                        </p>
                    </section>

                    {/* Section */}
                    <section>
                        <h2
                            className="text-2xl font-semibold text-[#e7d7b4] mb-4"
                            style={{
                                fontFamily: "var(--font-cormorant-garamond)",
                            }}
                        >
                            Security
                        </h2>
                        <p>
                            The Service Provider is concerned about safeguarding
                            the confidentiality of your information. The Service
                            Provider provides physical, electronic, and
                            procedural safeguards to protect information the
                            Service Provider processes and maintains.
                        </p>
                    </section>

                    {/* Section */}
                    <section>
                        <h2
                            className="text-2xl font-semibold text-[#e7d7b4] mb-4"
                            style={{
                                fontFamily: "var(--font-cormorant-garamond)",
                            }}
                        >
                            Changes
                        </h2>
                        <p className="mb-4">
                            This Privacy Policy may be updated from time to time
                            for any reason. The Service Provider will notify you
                            of any changes to the Privacy Policy by updating
                            this page with the new Privacy Policy. You are
                            advised to consult this Privacy Policy regularly for
                            any changes, as continued use is deemed approval of
                            all changes.
                        </p>
                        <p>
                            This privacy policy is effective as of{" "}
                            <span className="text-[#bb923a]">2026-03-04</span>.
                        </p>
                    </section>

                    {/* Section */}
                    <section>
                        <h2
                            className="text-2xl font-semibold text-[#e7d7b4] mb-4"
                            style={{
                                fontFamily: "var(--font-cormorant-garamond)",
                            }}
                        >
                            Your Consent
                        </h2>
                        <p>
                            By using the Application, you are consenting to the
                            processing of your information as set forth in this
                            Privacy Policy now and as amended by us.
                        </p>
                    </section>

                    {/* Section */}
                    <section>
                        <h2
                            className="text-2xl font-semibold text-[#e7d7b4] mb-4"
                            style={{
                                fontFamily: "var(--font-cormorant-garamond)",
                            }}
                        >
                            Contact Us
                        </h2>
                        <p>
                            If you have any questions regarding privacy while
                            using the Application, or have questions about the
                            practices, please contact the Service Provider via
                            email at{" "}
                            <a
                                href="mailto:sales@uniglodiamonds.com"
                                className="text-[#bb923a] hover:text-[#e7d7b4] underline underline-offset-2 transition-colors"
                            >
                                sales@uniglodiamonds.com
                            </a>
                            .
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
