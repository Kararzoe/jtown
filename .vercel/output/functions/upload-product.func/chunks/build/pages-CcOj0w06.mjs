import { af as useState, aj as vue_exports, R as server_renderer_exports, j as _sfc_main$5, N as NuxtLink, I as navigateTo, e as _sfc_main$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main } from './Input-COSn-l8y.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CEFOh9bN.mjs';
import { P as ProductCard_default } from './ProductCard-DE7dQGQo.mjs';
import { A as publicAssetsURL } from '../_/nitro.mjs';
import 'unhead/utils';
import 'vue';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'nostics';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'devalue';
import '@supabase/supabase-js';
import 'tailwindcss/colors';
import './Badge-ldsEE6tG.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';

//#region app/composables/useLanguage.ts
var translations = {
	en: {
		home: "Home",
		services: "Services",
		products: "Products",
		sell: "Get Started",
		dashboard: "Dashboard",
		wishlist: "Wishlist",
		logout: "Logout",
		login: "Login",
		tagline: "Your #1 Site to Find Professional Service Providers in Jos",
		heroTitle1: "Find the",
		heroHighlight1: "Right Help",
		heroTitle2: "When You",
		heroHighlight2: "Need It",
		heroDescription: "Plumbers, electricians, bakers, mechanics & more — find trusted service providers in Jos, fast.",
		searchPlaceholder: "Search for a service... e.g. plumber, electrician",
		popular: "Popular",
		plumbing: "Plumbing",
		electricians: "Electricians",
		acRepair: "AC Repair",
		bakers: "Bakers",
		ourServices: "Our Services",
		findA: "Find a",
		findServiceProvider: "Service Provider",
		trustedProfessionals: "Trusted professionals in Jos ready to get the job done",
		explore: "Explore →",
		simpleProcess: "Simple Process",
		howItWorks: "How It Works",
		fourSteps: "Four simple steps to boost your business visibility",
		step1Title: "Create Your Profile",
		step1Desc: "Sign up and set up your business or service profile in minutes",
		step2Title: "Choose a Promo Plan",
		step2Desc: "Pick a visibility package that fits your budget and goals",
		step3Title: "Get Discovered",
		step3Desc: "Your business gets seen by thousands of active buyers in Jos",
		step4Title: "Grow & Scale",
		step4Desc: "Track results, get reviews, and watch your business grow",
		faqTitle: "Frequently Asked Questions",
		faqSubtitle: "Everything you need to know about our services",
		faq1Q: "How does JosMKT boost my business visibility?",
		faq1A: "We list your business on our platform seen by thousands of active buyers in Jos. Our promotion packages include featured listings, social media shoutouts, and targeted ads.",
		faq2Q: "What promotion packages are available?",
		faq2A: "We offer Basic (free listing), Standard (featured placement + social media), and Premium (full promotion suite with analytics). Contact us for custom packages.",
		faq3Q: "How do I list my business or service?",
		faq3A: "Click 'Get Started' in the navigation, fill out your business profile, and choose a promotion plan. Your listing goes live within 24 hours.",
		faq4Q: "Is there a free option?",
		faq4A: "Yes! Our Basic listing is completely free. You can upgrade anytime to get more visibility and promotion features.",
		faq5Q: "Can I track how my business is performing?",
		faq5A: "Absolutely! Our dashboard shows views, clicks, inquiries, and engagement metrics so you can measure your growth.",
		faq6Q: "What areas does JosMKT cover?",
		faq6A: "We cover all areas in Jos including Bukuru, Rayfield, Terminus, Lamingo, and surrounding areas in Plateau State.",
		readyToGrow: "Ready to Grow Your Business?",
		getStartedFree: "Get Started Free",
		monthlyViews: "Monthly Views",
		businesses: "Businesses Listed",
		growthRate: "Growth Rate",
		happyCustomers: "Happy Customers",
		language: "Language",
		english: "English",
		hausa: "Hausa",
		pidgin: "Pidgin",
		noListingsYet: "No listings yet",
		beFirstToList: "Be the first to list your service or product",
		listYourService: "List Your Service",
		featuredListings: "Featured Listings",
		discoverServices: "Discover amazing services from local providers",
		viewAll: "View All",
		shopWithConfidence: "Shop with Confidence",
		safetyPriority: "Your safety is our priority",
		verifiedSellers: "Verified Sellers",
		verifiedSellersDesc: "All sellers are verified before listing",
		qualityAssured: "Quality Assured",
		qualityAssuredDesc: "Products checked for authenticity",
		secureContacts: "Secure Contacts",
		secureContactsDesc: "Your information is protected",
		communityTrust: "Community Trust",
		communityTrustDesc: "Ratings from real buyers",
		registerBusiness: "Register Your Business",
		joinThousands: "Join thousands of service providers and reach customers across Jos"
	},
	ha: {
		home: "Gida",
		services: "Ayyuka",
		products: "Kayayyaki",
		sell: "Fara",
		dashboard: "Shafin Sarrafa",
		wishlist: "Abubuwan da nake so",
		logout: "Fita",
		login: "Shiga",
		tagline: "Shafin ku na #1 don Nemo Masu Bayar da Sabis a Jos",
		heroTitle1: "Nemo",
		heroHighlight1: "Taimakon da ya dace",
		heroTitle2: "Lokacin da kuke",
		heroHighlight2: "Bukata",
		heroDescription: "Masu gyaran bututu, masu lantarki, masu yin burodi, injiniyoyi da sauransu — nemo masu bayar da sabis da ake amincewa da su a Jos, cikin sauri.",
		searchPlaceholder: "Nemo sabis... misali mai gyaran bututu, mai lantarki",
		popular: "Shahararru",
		plumbing: "Bututu",
		electricians: "Lantarki",
		acRepair: "Gyaran AC",
		bakers: "Masu Burodi",
		ourServices: "Ayyukanmu",
		findA: "Nemo",
		findServiceProvider: "Mai Bayar da Sabis",
		trustedProfessionals: "Ƙwararru masu aminci a Jos da suke shirye su yi aiki",
		explore: "Bincika →",
		simpleProcess: "Tsari Mai Sauƙi",
		howItWorks: "Yadda Yake Aiki",
		fourSteps: "Matakai huɗu masu sauƙi don ƙara ganin kasuwancin ku",
		step1Title: "Ƙirƙiri Bayanan ku",
		step1Desc: "Yi rajista kuma saita bayanan kasuwancin ku cikin mintuna",
		step2Title: "Zaɓi Shirin Tallata",
		step2Desc: "Zaɓi kunshin ganewa da ya dace da kasafin kuɗin ku",
		step3Title: "A Same ku",
		step3Desc: "Dubban masu saye a Jos za su ga kasuwancin ku",
		step4Title: "Girma da Faɗaɗa",
		step4Desc: "Bi diddigin sakamako, sami ra'ayoyi, kuma ku ga kasuwancin ku yana girma",
		faqTitle: "Tambayoyin da Ake Yawan Yi",
		faqSubtitle: "Duk abin da kuke bukata ku sani game da ayyukanmu",
		faq1Q: "Ta yaya JosMKT ke ƙara ganin kasuwancina?",
		faq1A: "Muna jera kasuwancin ku a dandamali ɗin mu wanda dubban masu saye a Jos ke gani.",
		faq2Q: "Wane irin kunshin tallata ake da su?",
		faq2A: "Muna ba da Basic (jerin kyauta), Standard, da Premium. Tuntuɓe mu don kunshin musamman.",
		faq3Q: "Ta yaya zan jera kasuwancina?",
		faq3A: "Danna 'Fara' a cikin kewayawa, cika bayanan kasuwancin ku, kuma zaɓi shirin tallata.",
		faq4Q: "Akwai zaɓi na kyauta?",
		faq4A: "Eh! Jerin mu na Basic kyauta ne gaba ɗaya.",
		faq5Q: "Zan iya bin diddigin yadda kasuwancina ke yi?",
		faq5A: "Tabbas! Shafin sarrafa mu yana nuna kallon, dannawa, tambayoyi, da hulɗa.",
		faq6Q: "Wane yanki ne JosMKT ke rufe?",
		faq6A: "Muna rufe duk yankuna a Jos ciki har da Bukuru, Rayfield, Terminus, Lamingo.",
		readyToGrow: "Kuna Shirye ku Girma Kasuwancin ku?",
		getStartedFree: "Fara Kyauta",
		monthlyViews: "Kallon Wata",
		businesses: "Kasuwanci",
		growthRate: "Yawan Girma",
		happyCustomers: "Abokan Ciniki",
		language: "Harshe",
		english: "Turanci",
		hausa: "Hausa",
		pidgin: "Pidgin",
		noListingsYet: "Babu jeri har yanzu",
		beFirstToList: "Ku zama na farko",
		listYourService: "Jera Sabis ɗin ku",
		featuredListings: "Jerin da aka Tallata",
		discoverServices: "Gano ayyuka masu kyau daga masu bayarwa na gida",
		viewAll: "Duba Duka",
		shopWithConfidence: "Saya da Kwanciyar Hankali",
		safetyPriority: "Amincin ku shine fifikon mu",
		verifiedSellers: "Masu Sayarwa da aka Tabbatar",
		verifiedSellersDesc: "Duk masu sayarwa ana tabbatar da su kafin jera",
		qualityAssured: "Inganci Tabbatacce",
		qualityAssuredDesc: "Ana duba kayayyaki don inganci",
		secureContacts: "Sadarwa Mai Aminci",
		secureContactsDesc: "Bayanan ku suna kariya",
		communityTrust: "Amincin Al'umma",
		communityTrustDesc: "Ra'ayoyi daga masu saye na gaske",
		registerBusiness: "Yi Rajistan Kasuwancin ku",
		joinThousands: "Ku shiga tare da dubban masu bayar da sabis a Jos"
	},
	pcm: {
		home: "Home",
		services: "Services",
		products: "Products",
		sell: "Start Now",
		dashboard: "Dashboard",
		wishlist: "Tins Wey I Like",
		logout: "Comot",
		login: "Enter",
		tagline: "Your #1 Site to Find People Wey Fit Help You for Jos",
		heroTitle1: "Find the",
		heroHighlight1: "Correct Help",
		heroTitle2: "When You",
		heroHighlight2: "Need Am",
		heroDescription: "Plumber, electrician, baker, mechanic & more — find people wey you fit trust for Jos, sharp sharp.",
		searchPlaceholder: "Search for service... e.g. plumber, electrician",
		popular: "Popular",
		plumbing: "Plumbing",
		electricians: "Electricians",
		acRepair: "AC Repair",
		bakers: "Bakers",
		ourServices: "Our Services",
		findA: "Find",
		findServiceProvider: "Service Provider",
		trustedProfessionals: "Trusted professionals for Jos wey ready to do the work",
		explore: "Check am →",
		simpleProcess: "Simple Process",
		howItWorks: "How E Dey Work",
		fourSteps: "Four simple steps to make people see your business",
		step1Title: "Create Your Profile",
		step1Desc: "Sign up and set up your business profile for few minutes",
		step2Title: "Pick Promo Plan",
		step2Desc: "Choose visibility package wey fit your budget",
		step3Title: "People Go See You",
		step3Desc: "Thousands of buyers for Jos go see your business",
		step4Title: "Grow & Expand",
		step4Desc: "Track results, get reviews, watch your business grow",
		faqTitle: "Questions Wey People Dey Ask",
		faqSubtitle: "Everything wey you need to know about our services",
		faq1Q: "How JosMKT go help people see my business?",
		faq1A: "We go list your business for our platform wey thousands of buyers for Jos dey see.",
		faq2Q: "Which promo packages dey available?",
		faq2A: "We get Basic (free listing), Standard, and Premium. Contact us for custom packages.",
		faq3Q: "How I go list my business or service?",
		faq3A: "Click 'Start Now' for the navigation, fill your business profile, and choose promo plan.",
		faq4Q: "E get free option?",
		faq4A: "Yes! Our Basic listing na free completely.",
		faq5Q: "I fit track how my business dey perform?",
		faq5A: "Sure! Our dashboard go show you views, clicks, inquiries, and engagement.",
		faq6Q: "Which areas JosMKT dey cover?",
		faq6A: "We cover all areas for Jos including Bukuru, Rayfield, Terminus, Lamingo.",
		readyToGrow: "You Ready to Grow Your Business?",
		getStartedFree: "Start Free",
		monthlyViews: "Monthly Views",
		businesses: "Businesses",
		growthRate: "Growth Rate",
		happyCustomers: "Happy Customers",
		language: "Language",
		english: "English",
		hausa: "Hausa",
		pidgin: "Pidgin",
		noListingsYet: "Nothing dey here yet",
		beFirstToList: "Be the first person to list",
		listYourService: "List Your Service",
		featuredListings: "Featured Listings",
		discoverServices: "Discover better services from local providers",
		viewAll: "See All",
		shopWithConfidence: "Buy with Confidence",
		safetyPriority: "Your safety na our priority",
		verifiedSellers: "Verified Sellers",
		verifiedSellersDesc: "All sellers don verify before listing",
		qualityAssured: "Quality Assured",
		qualityAssuredDesc: "Products don check for authenticity",
		secureContacts: "Secure Contacts",
		secureContactsDesc: "Your information dey protected",
		communityTrust: "Community Trust",
		communityTrustDesc: "Ratings from real buyers",
		registerBusiness: "Register Your Business",
		joinThousands: "Join thousands of service providers for Jos"
	}
};
var currentLang = useState("lang", () => "en");
var useLanguage = () => {
	const t = (key) => {
		return translations[currentLang.value][key] || translations.en[key] || key;
	};
	const setLang = (lang) => {
		currentLang.value = lang;
	};
	return {
		t,
		currentLang,
		setLang
	};
};

//#region app/components/TestimonialsSection.vue?vue&type=script&setup=true&lang.ts
var TestimonialsSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "TestimonialsSection",
	__ssrInlineRender: true,
	setup(__props) {
		const testimonials = [
			{
				name: "Amina Bello",
				role: "Fashion Designer, Jos",
				text: "Since joining JosMKT, my customer base has grown by 300%. I now get calls from all over Plateau State!"
			},
			{
				name: "Emmanuel Dung",
				role: "Plumber, Bukuru",
				text: "I used to struggle finding customers. Now my phone rings every day thanks to JosMKT. Best decision I ever made."
			},
			{
				name: "Fatima Yakubu",
				role: "Caterer, Terminus",
				text: "JosMKT helped me turn my passion for cooking into a real business. I get bookings for events every week now."
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$5;
			const _component_UButton = _sfc_main$1;
			_push(`<section${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "py-20 px-4 bg-gray-50 dark:bg-gray-800" }, _attrs))}><div class="max-w-7xl mx-auto"><div class="text-center mb-14"><div class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4"> Success Stories </div><h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">What Business Owners Say</h2><p class="text-gray-500 dark:text-gray-400">Real results from real businesses in Jos</p></div>`);
			if (testimonials.length === 0) {
				_push(`<div class="text-center py-12">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: "i-lucide-quote",
					class: "w-14 h-14 text-gray-300 dark:text-gray-600 mx-auto mb-4"
				}, null, _parent));
				_push(`<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No reviews yet</h3><p class="text-gray-500 dark:text-gray-400">Be the first to share your experience with JosMKT</p>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					to: "/become-seller",
					color: "primary",
					class: "mt-4"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Get Started`);
						else return [(0, vue_exports.createTextVNode)("Get Started")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div class="grid md:grid-cols-3 gap-6"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)(testimonials, (t, i) => {
					_push(`<div class="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
						name: "i-lucide-quote",
						class: "w-8 h-8 text-emerald-400 mb-4"
					}, null, _parent));
					_push(`<p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">${(0, server_renderer_exports.ssrInterpolate)(t.text)}</p><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center font-bold text-emerald-600">${(0, server_renderer_exports.ssrInterpolate)(t.name.charAt(0))}</div><div><p class="font-bold text-gray-900 dark:text-white text-sm">${(0, server_renderer_exports.ssrInterpolate)(t.name)}</p><p class="text-xs text-gray-500">${(0, server_renderer_exports.ssrInterpolate)(t.role)}</p></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div></section>`);
		};
	}
});
//#endregion
//#region app/components/TestimonialsSection.vue
var _sfc_setup$2 = TestimonialsSection_vue_vue_type_script_setup_true_lang_default.setup;
TestimonialsSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TestimonialsSection.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var TestimonialsSection_default = Object.assign(TestimonialsSection_vue_vue_type_script_setup_true_lang_default, { __name: "TestimonialsSection" });
//#endregion
//#region \0virtual:public?%2Fjosmkt-logo-2.png
var _virtual_public__2Fjosmkt_logo_2_default = publicAssetsURL("/josmkt-logo-2.png");
//#endregion
//#region app/components/NewsletterSection.vue?vue&type=script&setup=true&lang.ts
var NewsletterSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "NewsletterSection",
	__ssrInlineRender: true,
	setup(__props) {
		const email = (0, vue_exports.ref)("");
		const status = (0, vue_exports.ref)("idle");
		useSupabaseClient();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$5;
			const _component_UInput = _sfc_main;
			const _component_UButton = _sfc_main$1;
			_push(`<section${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "py-20 px-4 bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900" }, _attrs))}><div class="max-w-4xl mx-auto text-center"><div class="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-6"><img${(0, server_renderer_exports.ssrRenderAttr)("src", _virtual_public__2Fjosmkt_logo_2_default)} alt="JosMKT" class="w-full h-full object-contain"></div><h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated with JosMKT</h2><p class="text-gray-400 mb-8 max-w-md mx-auto">Get weekly tips, new service providers, and exclusive deals delivered to your inbox.</p><div class="max-w-md mx-auto">`);
			if ((0, vue_exports.unref)(status) === "success") {
				_push(`<div class="flex items-center justify-center gap-2 text-emerald-400 py-4">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: "i-lucide-check-circle",
					class: "w-5 h-5"
				}, null, _parent));
				_push(`<span class="font-medium">Subscribed successfully!</span></div>`);
			} else {
				_push(`<form class="flex flex-col sm:flex-row gap-2">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
					modelValue: (0, vue_exports.unref)(email),
					"onUpdate:modelValue": ($event) => (0, vue_exports.isRef)(email) ? email.value = $event : null,
					type: "email",
					required: "",
					placeholder: "Enter your email address",
					size: "lg",
					class: "flex-1"
				}, null, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					type: "submit",
					color: "primary",
					size: "lg",
					icon: "i-lucide-send",
					loading: (0, vue_exports.unref)(status) === "loading"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Subscribe `);
						else return [(0, vue_exports.createTextVNode)(" Subscribe ")];
					}),
					_: 1
				}, _parent));
				_push(`</form>`);
			}
			_push(`<p class="text-xs text-gray-500 mt-3">Free forever. No spam. Unsubscribe anytime.</p></div></div></section>`);
		};
	}
});
//#endregion
//#region app/components/NewsletterSection.vue
var _sfc_setup$1 = NewsletterSection_vue_vue_type_script_setup_true_lang_default.setup;
NewsletterSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NewsletterSection.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var NewsletterSection_default = Object.assign(NewsletterSection_vue_vue_type_script_setup_true_lang_default, { __name: "NewsletterSection" });
//#endregion
//#region app/pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useSupabaseClient();
		const { t } = useLanguage();
		const products = (0, vue_exports.ref)([]);
		const loading = (0, vue_exports.ref)(true);
		const currentBanner = (0, vue_exports.ref)(0);
		const openFaq = (0, vue_exports.ref)(null);
		const banners = [
			{
				text: "🚀 Register your business on JosMKT — Get discovered by thousands in Jos!",
				bg: "from-emerald-600 to-teal-600"
			},
			{
				text: "📍 Find trusted plumbers, electricians, bakers & more in Jos",
				bg: "from-purple-600 to-indigo-600"
			},
			{
				text: "📢 List your service for FREE — Start getting customers today",
				bg: "from-amber-600 to-orange-600"
			}
		];
		const categories = [
			{
				label: "Plumbing",
				icon: "🔧",
				slug: "plumbing"
			},
			{
				label: "Electricians",
				icon: "⚡",
				slug: "electrical"
			},
			{
				label: "AC Installation",
				icon: "❄️",
				slug: "ac"
			},
			{
				label: "Furniture",
				icon: "🛋️",
				slug: "furniture"
			},
			{
				label: "Catering & Food",
				icon: "🍰",
				slug: "catering"
			},
			{
				label: "Painting",
				icon: "🎨",
				slug: "painting"
			},
			{
				label: "Auto Mechanic",
				icon: "🚗",
				slug: "mechanic"
			},
			{
				label: "Barbing & Salon",
				icon: "✂️",
				slug: "barbing"
			},
			{
				label: "Carpentry",
				icon: "🔨",
				slug: "carpentry"
			},
			{
				label: "Fashion Design",
				icon: "👗",
				slug: "fashion-design"
			},
			{
				label: "Shoe Making",
				icon: "👟",
				slug: "shoemaking"
			},
			{
				label: "Photography",
				icon: "📷",
				slug: "photography"
			},
			{
				label: "Tech & Repairs",
				icon: "💻",
				slug: "tech"
			},
			{
				label: "Logistics",
				icon: "🚚",
				slug: "logistics"
			},
			{
				label: "Laundry & Cleaning",
				icon: "🧺",
				slug: "laundry"
			},
			{
				label: "Education",
				icon: "🎓",
				slug: "education"
			},
			{
				label: "Perfumery",
				icon: "✨",
				slug: "perfumery"
			},
			{
				label: "Make Up",
				icon: "💄",
				slug: "makeup"
			},
			{
				label: "Event Planning",
				icon: "📅",
				slug: "event-planning"
			},
			{
				label: "Rentals",
				icon: "🏠",
				slug: "rentals"
			},
			{
				label: "Mason",
				icon: "🧱",
				slug: "mason"
			},
			{
				label: "Phone Accessories",
				icon: "📱",
				slug: "phone-accessories"
			},
			{
				label: "Legal & Solicitors",
				icon: "⚖️",
				slug: "legal"
			},
			{
				label: "Housing Agent",
				icon: "🏡",
				slug: "housing-agent"
			},
			{
				label: "E-Wallet Services",
				icon: "💳",
				slug: "e-wallet"
			}
		];
		const categoryHref = (slug) => `/services?category=${slug}`;
		const stats = [
			{
				label: "Monthly Views",
				value: "50,000+",
				icon: "i-lucide-eye"
			},
			{
				label: "Businesses Listed",
				value: "1,000+",
				icon: "i-lucide-store"
			},
			{
				label: "Growth Rate",
				value: "98%",
				icon: "i-lucide-trending-up"
			},
			{
				label: "Happy Customers",
				value: "25,000+",
				icon: "i-lucide-users"
			}
		];
		const howItWorks = (0, vue_exports.computed)(() => [
			{
				icon: "👤",
				title: t("step1Title"),
				desc: t("step1Desc")
			},
			{
				icon: "📢",
				title: t("step2Title"),
				desc: t("step2Desc")
			},
			{
				icon: "👁️",
				title: t("step3Title"),
				desc: t("step3Desc")
			},
			{
				icon: "📈",
				title: t("step4Title"),
				desc: t("step4Desc")
			}
		]);
		const trust = (0, vue_exports.computed)(() => [
			{
				icon: "i-lucide-shield",
				title: t("verifiedSellers"),
				desc: t("verifiedSellersDesc")
			},
			{
				icon: "i-lucide-check-circle",
				title: t("qualityAssured"),
				desc: t("qualityAssuredDesc")
			},
			{
				icon: "i-lucide-lock",
				title: t("secureContacts"),
				desc: t("secureContactsDesc")
			},
			{
				icon: "i-lucide-users",
				title: t("communityTrust"),
				desc: t("communityTrustDesc")
			}
		]);
		const faqs = (0, vue_exports.computed)(() => [
			{
				q: t("faq1Q"),
				a: t("faq1A")
			},
			{
				q: t("faq2Q"),
				a: t("faq2A")
			},
			{
				q: t("faq3Q"),
				a: t("faq3A")
			},
			{
				q: t("faq4Q"),
				a: t("faq4A")
			},
			{
				q: t("faq5Q"),
				a: t("faq5A")
			},
			{
				q: t("faq6Q"),
				a: t("faq6A")
			}
		]);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$5;
			const _component_NuxtLink = NuxtLink;
			const _component_UInput = _sfc_main;
			const _component_UButton = _sfc_main$1;
			const _component_ProductCard = ProductCard_default;
			const _component_TestimonialsSection = TestimonialsSection_default;
			const _component_NewsletterSection = NewsletterSection_default;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)(_attrs)}><div class="${(0, server_renderer_exports.ssrRenderClass)(`bg-gradient-to-r ${banners[(0, vue_exports.unref)(currentBanner)].bg} py-2.5 px-4 transition-all duration-500`)}"><div class="max-w-7xl mx-auto flex items-center justify-center gap-3 text-white">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
				name: "i-lucide-sparkles",
				class: "w-4 h-4 flex-shrink-0"
			}, null, _parent));
			_push(`<p class="text-xs md:text-sm font-semibold text-center">${(0, server_renderer_exports.ssrInterpolate)(banners[(0, vue_exports.unref)(currentBanner)].text)}</p>`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
				to: "/become-seller",
				class: "px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/30 text-xs border border-white/30 transition whitespace-nowrap"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Get Started `);
					else return [(0, vue_exports.createTextVNode)(" Get Started ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><section class="relative min-h-[85vh] flex items-center bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 overflow-hidden"><video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover opacity-30"><source${(0, server_renderer_exports.ssrRenderAttr)("src", "/7669651-hd_1920_1080_25fps.mp4")} type="video/mp4"></video><div class="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-emerald-900/40 to-gray-900/80"></div><div class="max-w-7xl mx-auto relative z-10 px-4 py-20 w-full"><div class="text-center"><div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm font-medium mb-8 backdrop-blur-sm">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
				name: "i-lucide-zap",
				class: "w-4 h-4"
			}, null, _parent));
			_push(` ${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("tagline"))}</div><h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("heroTitle1"))} <span class="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("heroHighlight1"))}</span><br>${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("heroTitle2"))} <span class="bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("heroHighlight2"))}</span></h1><p class="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("heroDescription"))}</p><div class="max-w-2xl mx-auto mb-10"><div class="relative">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
				placeholder: (0, vue_exports.unref)(t)("searchPlaceholder"),
				size: "xl",
				icon: "i-lucide-search",
				class: "w-full",
				onKeyup: (e) => ("navigateTo" in _ctx ? _ctx.navigateTo : (0, vue_exports.unref)(navigateTo))(`/products?search=${e.target.value}`)
			}, null, _parent));
			_push(`</div></div><div class="flex flex-wrap justify-center gap-3"><span class="text-gray-400 text-sm">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("popular"))}:</span><!--[-->`);
			(0, server_renderer_exports.ssrRenderList)([
				(0, vue_exports.unref)(t)("plumbing"),
				(0, vue_exports.unref)(t)("electricians"),
				(0, vue_exports.unref)(t)("acRepair"),
				(0, vue_exports.unref)(t)("bakers")
			], (tag) => {
				_push(`<button class="px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-emerald-500/20 hover:border-emerald-400/40 transition-all text-sm font-medium">${(0, server_renderer_exports.ssrInterpolate)(tag)}</button>`);
			});
			_push(`<!--]--></div></div></div></section><section class="py-16 bg-emerald-600"><div class="max-w-7xl mx-auto px-4"><div class="grid grid-cols-2 md:grid-cols-4 gap-8"><!--[-->`);
			(0, server_renderer_exports.ssrRenderList)(stats, (stat) => {
				_push(`<div class="text-center text-white">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: stat.icon,
					class: "w-8 h-8 mx-auto mb-3 text-emerald-200"
				}, null, _parent));
				_push(`<p class="text-3xl font-black mb-1">${(0, server_renderer_exports.ssrInterpolate)(stat.value)}</p><p class="text-emerald-200 text-sm">${(0, server_renderer_exports.ssrInterpolate)(stat.label)}</p></div>`);
			});
			_push(`<!--]--></div></div></section><section id="services" class="py-20 px-4 bg-white dark:bg-gray-900 relative overflow-hidden"><div class="absolute top-0 left-0 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl"></div><div class="absolute bottom-0 right-0 w-72 h-72 bg-teal-300/20 rounded-full blur-3xl"></div><div class="max-w-7xl mx-auto relative z-10"><div class="text-center mb-14"><div class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("ourServices"))}</div><h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("findA"))} <span class="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("findServiceProvider"))}</span></h2><p class="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("trustedProfessionals"))}</p></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"><!--[-->`);
			(0, server_renderer_exports.ssrRenderList)(categories, (cat) => {
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
					key: cat.slug,
					to: categoryHref(cat.slug),
					class: "group bg-white dark:bg-gray-800 rounded-2xl p-5 md:p-7 shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<div class="text-3xl md:text-4xl mx-auto mb-4 text-center group-hover:scale-110 transition-transform duration-300"${_scopeId}>${(0, server_renderer_exports.ssrInterpolate)(cat.icon)}</div><h3 class="text-center font-semibold text-sm md:text-base text-gray-900 dark:text-white"${_scopeId}>${(0, server_renderer_exports.ssrInterpolate)(cat.label)}</h3><p class="text-center text-xs text-gray-400 mt-1 hidden md:block"${_scopeId}>Explore →</p>`);
						else return [
							(0, vue_exports.createVNode)("div", { class: "text-3xl md:text-4xl mx-auto mb-4 text-center group-hover:scale-110 transition-transform duration-300" }, (0, vue_exports.toDisplayString)(cat.icon), 1),
							(0, vue_exports.createVNode)("h3", { class: "text-center font-semibold text-sm md:text-base text-gray-900 dark:text-white" }, (0, vue_exports.toDisplayString)(cat.label), 1),
							(0, vue_exports.createVNode)("p", { class: "text-center text-xs text-gray-400 mt-1 hidden md:block" }, "Explore →")
						];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div></div></section><section class="py-16 px-4 bg-gray-50 dark:bg-gray-800"><div class="max-w-7xl mx-auto"><div class="flex items-center justify-between mb-12"><div><h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("featuredListings"))}</h2><p class="text-gray-600 dark:text-gray-400">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("discoverServices"))}</p></div>`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/products",
				variant: "outline",
				color: "primary",
				"trailing-icon": "i-lucide-arrow-right"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("viewAll"))}`);
					else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(t)("viewAll")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			if ((0, vue_exports.unref)(loading)) {
				_push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)(8, (i) => {
					_push(`<div class="rounded-2xl overflow-hidden shadow-md"><div class="skeleton aspect-square"></div><div class="p-4 space-y-2"><div class="skeleton h-4 rounded w-3/4"></div><div class="skeleton h-4 rounded w-1/2"></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if ((0, vue_exports.unref)(products).length === 0) {
				_push(`<div class="text-center py-16"><div class="text-6xl mb-4">🏪</div><h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("noListingsYet"))}</h3><p class="text-gray-500 mb-6">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("beFirstToList"))}</p>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					to: "/upload-product",
					color: "primary",
					size: "lg"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("listYourService"))}`);
						else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(t)("listYourService")), 1)];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(products), (product) => {
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_ProductCard, {
						key: product.id,
						product
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div></section><section class="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"><div class="max-w-7xl mx-auto"><div class="text-center mb-14"><div class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("simpleProcess"))}</div><h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("howItWorks"))}</h2><p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("fourSteps"))}</p></div><div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"><!--[-->`);
			(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(howItWorks), (step, i) => {
				_push(`<div class="relative text-center"><div class="relative inline-block mb-4"><div class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg text-3xl">${(0, server_renderer_exports.ssrInterpolate)(step.icon)}</div><div class="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-gray-900 font-bold text-xs shadow-md">${(0, server_renderer_exports.ssrInterpolate)(i + 1)}</div></div><h3 class="font-bold text-sm md:text-lg mb-2 text-gray-900 dark:text-white">${(0, server_renderer_exports.ssrInterpolate)(step.title)}</h3><p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">${(0, server_renderer_exports.ssrInterpolate)(step.desc)}</p></div>`);
			});
			_push(`<!--]--></div></div></section><section class="py-16 px-4 bg-white dark:bg-gray-900"><div class="max-w-7xl mx-auto"><div class="text-center mb-12"><h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("shopWithConfidence"))}</h2><p class="text-gray-600 dark:text-gray-400">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("safetyPriority"))}</p></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"><!--[-->`);
			(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(trust), (f) => {
				_push(`<div class="text-center p-4 md:p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"><div class="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: f.icon,
					class: "w-6 h-6 md:w-8 md:h-8 text-emerald-600"
				}, null, _parent));
				_push(`</div><h3 class="font-bold text-sm md:text-lg mb-2 text-gray-900 dark:text-white">${(0, server_renderer_exports.ssrInterpolate)(f.title)}</h3><p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">${(0, server_renderer_exports.ssrInterpolate)(f.desc)}</p></div>`);
			});
			_push(`<!--]--></div></div></section>`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_TestimonialsSection, null, null, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_NewsletterSection, null, null, _parent));
			_push(`<section class="py-20 px-4 bg-white dark:bg-gray-900"><div class="max-w-3xl mx-auto"><div class="text-center mb-14"><div class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("faqTitle"))}</div><h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("faqTitle"))}</h2><p class="text-gray-500 dark:text-gray-400">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("faqSubtitle"))}</p></div><div class="space-y-3"><!--[-->`);
			(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(faqs), (faq, i) => {
				_push(`<div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:border-emerald-200 dark:hover:border-emerald-700 transition-colors"><button class="w-full px-6 py-4 flex items-center justify-between hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition"><span class="font-semibold text-left text-gray-900 dark:text-white text-sm md:text-base">${(0, server_renderer_exports.ssrInterpolate)(faq.q)}</span><div class="${(0, server_renderer_exports.ssrRenderClass)(`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${(0, vue_exports.unref)(openFaq) === i ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400"}`)}">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: (0, vue_exports.unref)(openFaq) === i ? "i-lucide-minus" : "i-lucide-plus",
					class: "w-4 h-4"
				}, null, _parent));
				_push(`</div></button>`);
				if ((0, vue_exports.unref)(openFaq) === i) _push(`<div class="px-6 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">${(0, server_renderer_exports.ssrInterpolate)(faq.a)}</div>`);
				else _push(`<!---->`);
				_push(`</div>`);
			});
			_push(`<!--]--></div></div></section><section class="py-16 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center"><div class="max-w-3xl mx-auto"><h2 class="text-3xl md:text-4xl font-bold mb-4">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("readyToGrow"))}</h2><p class="text-emerald-100 mb-8 text-lg">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("joinThousands"))}</p>`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/become-seller",
				size: "xl",
				color: "white",
				class: "font-bold"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("getStartedFree"))}`);
					else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(t)("getStartedFree")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></section></div>`);
		};
	}
});
//#endregion
//#region app/pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };
//# sourceMappingURL=pages-CcOj0w06.mjs.map
