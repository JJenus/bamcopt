<script setup lang="ts">
usePublicSeo(
    "Banking, with a clearer view",
    "Manage your account, follow your transfers, and keep your financial activity in view. Explore a simpler digital banking experience.",
);
const { auth, accountPath } = usePublicSite();
const features = [
    {
        icon: "ki-wallet",
        title: "Know where you stand",
        description:
            "See your account balance and recent activity together. Less searching, more clarity.",
        to: "/banking",
        linkLabel: "Explore banking",
    },
    {
        icon: "ki-send",
        title: "Move money with purpose",
        description:
            "Review recipient details, send a transfer, and keep a reference for what comes next.",
        to: "/transfers",
        linkLabel: "Discover transfers",
    },
    {
        icon: "ki-time",
        title: "Keep the full picture",
        description:
            "Find your transaction history and check the progress of a payment when you need it.",
        to: "/track/transaction",
        linkLabel: "Track a transaction",
    },
];
const steps = [
    {
        title: "Make it yours",
        description:
            "Create your account with your contact details and a unique password.",
    },
    {
        title: "Find your way around",
        description:
            "Review your account information and follow the available funding instructions.",
    },
    {
        title: "Take the next step",
        description:
            "Manage transfers, check your balance, and stay on top of your activity.",
    },
];
</script>

<template>
    <div>
        <MarketingHero
            eyebrow="Your money. A clearer picture."
            title="Banking that fits into your life."
            description="A simple place to manage your account, move money, and follow every transfer. Less complexity. More confidence in your next step."
        >
            <NuxtLink
                :to="auth.isAuthenticated.value ? accountPath : '/sign-up'"
                class="btn btn-primary btn-lg"
                >{{
                    auth.isAuthenticated.value
                        ? "Go to your account"
                        : "Create account"
                }}
                <span class="ms-3" aria-hidden="true">↗</span></NuxtLink
            >
            <NuxtLink to="/banking" class="btn btn-light btn-lg"
                >Explore banking</NuxtLink
            >
            <template #visual><MarketingAccountPreview /></template>
        </MarketingHero>
        <div class="container">
            <div
                class="row g-5 border-top border-bottom py-7 text-gray-700 fs-6 fw-semibold"
            >
                <div class="col-md-4">
                    <i
                        class="ki-outline ki-monitor-mobile fs-2 text-primary me-3"
                        aria-hidden="true"
                    ></i
                    >Access through your browser
                </div>
                <div class="col-md-4">
                    <i
                        class="ki-outline ki-sms fs-2 text-primary me-3"
                        aria-hidden="true"
                    ></i
                    >Email-code sign-in
                </div>
                <div class="col-md-4">
                    <i
                        class="ki-outline ki-document fs-2 text-primary me-3"
                        aria-hidden="true"
                    ></i
                    >Transaction history in one place
                </div>
            </div>
        </div>
        <section class="marketing-section">
            <div class="container">
                <div class="row align-items-end mb-10 g-5">
                    <div class="col-lg-7">
                        <span
                            class="text-primary text-uppercase fw-bold fs-7 ls-1"
                            >Built around the everyday</span
                        >
                        <h2 class="marketing-heading mt-4 mb-0">
                            Your finances. Without the extra friction.
                        </h2>
                    </div>
                    <div class="col-lg-5">
                        <p class="text-gray-600 fs-5 lh-lg mb-0">
                            Useful tools for the things you need to do, with a
                            clear view of what is happening.
                        </p>
                    </div>
                </div>
                <div class="row g-6">
                    <div
                        v-for="feature in features"
                        :key="feature.title"
                        class="col-md-4"
                    >
                        <MarketingFeatureCard v-bind="feature" />
                    </div>
                </div>
            </div>
        </section>
        <section class="marketing-section bg-light">
            <div class="container">
                <div class="row align-items-center g-10">
                    <div class="col-lg-5">
                        <span
                            class="text-primary text-uppercase fw-bold fs-7 ls-1"
                            >Getting started</span
                        >
                        <h2 class="marketing-heading mt-4 mb-6">
                            A little setup.<br />A lot more clarity.
                        </h2>
                        <NuxtLink
                            to="/resources/guides/getting-started"
                            class="fw-bold fs-5"
                            >Read the getting started guide
                            <span aria-hidden="true">↗</span></NuxtLink
                        >
                    </div>
                    <div class="col-lg-7">
                        <div
                            v-for="(step, i) in steps"
                            :key="step.title"
                            class="d-flex gap-7 py-6"
                            :class="{ 'border-bottom': i < 2 }"
                        >
                            <span
                                class="marketing-step text-primary opacity-50 fw-bold"
                                >0{{ i + 1 }}</span
                            >
                            <div>
                                <h3 class="fs-3 fw-bold mb-3">
                                    {{ step.title }}
                                </h3>
                                <p class="text-gray-600 fs-6 lh-lg mb-0">
                                    {{ step.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="marketing-section">
            <div class="container">
                <div class="row g-10 align-items-center">
                    <div class="col-lg-6">
                        <img
                            src="/assets/media/banking/flat-lay-business-concept_53876-24738.jpg"
                            alt="A workspace for reviewing financial plans"
                            class="marketing-photo rounded-4"
                            width="600"
                            height="380"
                            loading="lazy"
                        />
                    </div>
                    <div class="col-lg-6 ps-lg-12">
                        <span
                            class="text-primary text-uppercase fw-bold fs-7 ls-1"
                            >Stay in the know</span
                        >
                        <h2 class="marketing-heading mt-4 mb-6">
                            Sent it? See where it stands.
                        </h2>
                        <p class="fs-5 text-gray-600 lh-lg mb-7">
                            A transfer should not leave you guessing. Keep your
                            transaction reference and check the current receipt
                            status, or review your activity after signing in.
                        </p>
                        <NuxtLink
                            to="/track/transaction"
                            class="btn btn-primary"
                            >Track a transaction
                            <span aria-hidden="true">↗</span></NuxtLink
                        >
                    </div>
                </div>
            </div>
        </section>
        <section class="marketing-section pt-0">
            <div class="container">
                <div
                    class="border rounded-4 p-8 p-lg-12 row g-6 m-0 align-items-center"
                >
                    <div class="col-lg-2 text-lg-center">
                        <i
                            class="ki-outline ki-shield-tick text-primary fs-5x"
                            aria-hidden="true"
                        ></i>
                    </div>
                    <div class="col-lg-7">
                        <h2 class="fs-2x fw-bold mb-4">
                            Good banking starts with good habits.
                        </h2>
                        <p class="text-gray-600 fs-5 lh-lg mb-0">
                            Email-code sign-in adds a step to account access.
                            Protect your email, keep codes private, and learn
                            how to spot suspicious requests.
                        </p>
                    </div>
                    <div class="col-lg-3 text-lg-end">
                        <NuxtLink to="/security" class="btn btn-light-primary"
                            >Explore account safety</NuxtLink
                        >
                    </div>
                </div>
            </div>
        </section>
        <section class="marketing-section pt-0">
            <div class="container">
                <div class="row g-10">
                    <div class="col-lg-5">
                        <span
                            class="text-primary text-uppercase fw-bold fs-7 ls-1"
                            >A few things to know</span
                        >
                        <h2 class="marketing-heading mt-4 mb-6">
                            Questions?<br />Start here.
                        </h2>
                        <NuxtLink to="/resources/faq" class="fw-bold fs-5"
                            >All common questions
                            <span aria-hidden="true">↗</span></NuxtLink
                        >
                    </div>
                    <div class="col-lg-7"><MarketingFaq :limit="4" /></div>
                </div>
            </div>
        </section>
        <MarketingCta />
    </div>
</template>
