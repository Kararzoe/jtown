import { aj as vue_exports, ad as useRoute$1, ae as useRouter, R as server_renderer_exports, e as _sfc_main, j as _sfc_main$5, $ as $fetch$2 } from '../virtual/entry.mjs';
import 'unhead/utils';
import 'vue';
import '../routes/renderer.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'nostics';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'devalue';
import '@supabase/supabase-js';
import 'tailwindcss/colors';

//#region app/pages/services.vue?vue&type=script&setup=true&lang.ts
var API = "https://jos-backend.onrender.com/api";
var services_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "services",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute$1();
		const router = useRouter();
		const category = (0, vue_exports.ref)(route.query.category || "");
		const providers = (0, vue_exports.ref)([]);
		const loading = (0, vue_exports.ref)(false);
		const categories = [
			{
				label: "Plumbing",
				slug: "plumbing"
			},
			{
				label: "Electricians",
				slug: "electrical"
			},
			{
				label: "AC Installation",
				slug: "ac"
			},
			{
				label: "Furniture",
				slug: "furniture"
			},
			{
				label: "Catering & Food",
				slug: "catering"
			},
			{
				label: "Painting",
				slug: "painting"
			},
			{
				label: "Auto Mechanic",
				slug: "mechanic"
			},
			{
				label: "Barbing & Salon",
				slug: "barbing"
			},
			{
				label: "Carpentry",
				slug: "carpentry"
			},
			{
				label: "Fashion Design",
				slug: "fashion-design"
			},
			{
				label: "Shoe Making",
				slug: "shoemaking"
			},
			{
				label: "Photography",
				slug: "photography"
			},
			{
				label: "Tech & Repairs",
				slug: "tech"
			},
			{
				label: "Logistics",
				slug: "logistics"
			},
			{
				label: "Laundry & Cleaning",
				slug: "laundry"
			},
			{
				label: "Education",
				slug: "education"
			},
			{
				label: "Perfumery",
				slug: "perfumery"
			},
			{
				label: "Make Up",
				slug: "makeup"
			},
			{
				label: "Event Planning",
				slug: "event-planning"
			},
			{
				label: "Rentals",
				slug: "rentals"
			},
			{
				label: "Mason",
				slug: "mason"
			},
			{
				label: "Phone Accessories",
				slug: "phone-accessories"
			},
			{
				label: "Legal & Solicitors",
				slug: "legal"
			},
			{
				label: "Housing Agent",
				slug: "housing-agent"
			},
			{
				label: "E-Wallet Services",
				slug: "e-wallet"
			}
		];
		const loadProviders = async () => {
			if (!category.value) return;
			loading.value = true;
			try {
				const data = await $fetch$2(`${API}/services/category/${category.value}`);
				providers.value = Array.isArray(data) ? data : [];
			} catch {
				providers.value = [];
			}
			loading.value = false;
		};
		(0, vue_exports.watch)(category, loadProviders);
		const categoryLabel = (0, vue_exports.computed)(() => categories.find((c) => c.slug === category.value)?.label || category.value.replace(/-/g, " "));
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UButton = _sfc_main;
			const _component_UIcon = _sfc_main$5;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" }, _attrs))}><div class="max-w-7xl mx-auto"><div class="flex items-center gap-3 mb-6">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				icon: "i-lucide-arrow-left",
				variant: "ghost",
				color: "neutral",
				onClick: ($event) => (0, vue_exports.unref)(router).back()
			}, null, _parent));
			_push(`<div><h1 class="text-3xl font-bold text-gray-900 dark:text-white capitalize">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(category) ? (0, vue_exports.unref)(categoryLabel) + " Services" : "All Services")}</h1><p class="text-gray-500 text-sm">Verified professionals ready to help you</p></div></div><div class="flex gap-2 flex-wrap mb-8"><!--[-->`);
			(0, server_renderer_exports.ssrRenderList)(categories, (cat) => {
				_push(`<button class="${(0, server_renderer_exports.ssrRenderClass)(`px-4 py-2 rounded-full text-sm font-medium transition-all ${(0, vue_exports.unref)(category) === cat.slug ? "bg-emerald-500 text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"}`)}">${(0, server_renderer_exports.ssrInterpolate)(cat.label)}</button>`);
			});
			_push(`<!--]--></div>`);
			if ((0, vue_exports.unref)(loading)) {
				_push(`<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)(6, (i) => {
					_push(`<div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow"><div class="flex items-center gap-3 mb-3"><div class="skeleton w-12 h-12 rounded-full"></div><div class="flex-1 space-y-2"><div class="skeleton h-4 rounded w-2/3"></div><div class="skeleton h-3 rounded w-1/3"></div></div></div><div class="skeleton h-3 rounded w-full mb-2"></div><div class="skeleton h-3 rounded w-4/5 mb-4"></div><div class="flex gap-2"><div class="skeleton h-9 rounded-lg flex-1"></div><div class="skeleton h-9 rounded-lg flex-1"></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (!(0, vue_exports.unref)(category)) _push(`<div class="text-center py-20"><div class="text-6xl mb-4">🔧</div><h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">Select a Category</h3><p class="text-gray-500">Choose a service category above to see providers</p></div>`);
			else if ((0, vue_exports.unref)(providers).length === 0) {
				_push(`<div class="text-center py-16"><div class="text-6xl mb-4">🔍</div><h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">No providers yet</h3><p class="text-gray-500 mb-6">No service providers in this category yet</p>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					to: "/become-seller",
					color: "primary",
					size: "lg"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Be the first to apply`);
						else return [(0, vue_exports.createTextVNode)("Be the first to apply")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(providers), (provider, idx) => {
					_push(`<div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 group relative overflow-hidden"><div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div><div class="flex items-start justify-between mb-3"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-full overflow-hidden bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">`);
					if (provider.image) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", provider.image)}${(0, server_renderer_exports.ssrRenderAttr)("alt", provider.serviceName)} class="w-full h-full object-cover">`);
					else _push(`<span class="text-emerald-600 font-bold text-lg">${(0, server_renderer_exports.ssrInterpolate)(provider.serviceName?.charAt(0))}</span>`);
					_push(`</div><div><h3 class="font-bold text-lg leading-tight">${(0, server_renderer_exports.ssrInterpolate)(provider.serviceName)}</h3><p class="text-sm text-gray-500">${(0, server_renderer_exports.ssrInterpolate)(provider.location)}</p></div></div><span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full flex-shrink-0">Verified</span></div><p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">${(0, server_renderer_exports.ssrInterpolate)(provider.description)}</p><div class="space-y-1.5 text-sm text-gray-600 dark:text-gray-400 mb-4"><div class="flex items-center gap-2">`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
						name: "i-lucide-map-pin",
						class: "w-4 h-4 text-emerald-500"
					}, null, _parent));
					_push(` ${(0, server_renderer_exports.ssrInterpolate)(provider.location)}</div>`);
					if (provider.experience) {
						_push(`<div class="flex items-center gap-2">`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
							name: "i-lucide-clock",
							class: "w-4 h-4 text-emerald-500"
						}, null, _parent));
						_push(` ${(0, server_renderer_exports.ssrInterpolate)(provider.experience)} experience </div>`);
					} else _push(`<!---->`);
					if (provider.priceRange) _push(`<div class="flex items-center gap-2"><span class="text-emerald-500 font-bold text-xs">₦</span> ${(0, server_renderer_exports.ssrInterpolate)(provider.priceRange)}</div>`);
					else _push(`<!---->`);
					if (provider.rating > 0) {
						_push(`<div class="flex items-center gap-2">`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
							name: "i-lucide-star",
							class: "w-4 h-4 text-yellow-400"
						}, null, _parent));
						_push(` ${(0, server_renderer_exports.ssrInterpolate)(provider.rating)} (${(0, server_renderer_exports.ssrInterpolate)(provider.totalReviews)} reviews) </div>`);
					} else _push(`<!---->`);
					_push(`</div>`);
					if (provider.gallery?.length) {
						_push(`<div class="flex gap-1 mb-4"><!--[-->`);
						(0, server_renderer_exports.ssrRenderList)(provider.gallery.slice(0, 3), (img, i) => {
							_push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", img)} class="w-16 h-16 object-cover rounded-lg">`);
						});
						_push(`<!--]--></div>`);
					} else _push(`<!---->`);
					_push(`<div class="flex gap-2"><a${(0, server_renderer_exports.ssrRenderAttr)("href", `tel:${provider.phone}`)} class="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-semibold hover:bg-emerald-600 transition">`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
						name: "i-lucide-phone",
						class: "w-4 h-4"
					}, null, _parent));
					_push(` Call </a><a${(0, server_renderer_exports.ssrRenderAttr)("href", `https://wa.me/${provider.phone?.replace(/[^0-9]/g, "")}?text=Hi, I found you on JosMKT. I need your ${provider.serviceName} service`)} target="_blank" class="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition">`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
						name: "i-lucide-message-circle",
						class: "w-4 h-4"
					}, null, _parent));
					_push(` WhatsApp </a></div></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`<div class="mt-12 text-center bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 text-white"><h3 class="text-2xl font-bold mb-2">Are you a service provider?</h3><p class="text-emerald-100 mb-6">List your business and get discovered by thousands in Jos</p>`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/become-seller",
				color: "white",
				size: "lg",
				class: "font-bold"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Register Your Business`);
					else return [(0, vue_exports.createTextVNode)("Register Your Business")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div>`);
		};
	}
});
//#endregion
//#region app/pages/services.vue
var _sfc_setup = services_vue_vue_type_script_setup_true_lang_default.setup;
services_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var services_default = services_vue_vue_type_script_setup_true_lang_default;

export { services_default as default };
//# sourceMappingURL=services-Bnrxa_Ee.mjs.map
