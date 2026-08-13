import { aj as vue_exports, R as server_renderer_exports, j as _sfc_main$5, e as _sfc_main, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CEFOh9bN.mjs';
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

//#region app/pages/trending.vue?vue&type=script&setup=true&lang.ts
var trending_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "trending",
	__ssrInlineRender: true,
	setup(__props) {
		const supabase = useSupabaseClient();
		const products = (0, vue_exports.ref)([]);
		const loading = (0, vue_exports.ref)(true);
		const period = (0, vue_exports.ref)("7d");
		const loadTrending = async () => {
			loading.value = true;
			const { data } = await supabase.from("products").select("*, seller:profiles(*)").eq("status", "active").order("views", { ascending: false }).limit(20);
			products.value = data || [];
			loading.value = false;
		};
		(0, vue_exports.watch)(period, loadTrending);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$5;
			const _component_UButton = _sfc_main;
			const _component_NuxtLink = NuxtLink;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" }, _attrs))}><div class="max-w-7xl mx-auto"><div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"><div class="flex items-center gap-3">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
				name: "i-lucide-trending-up",
				class: "w-8 h-8 text-emerald-500"
			}, null, _parent));
			_push(`<h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Trending Products</h1></div><div class="flex gap-2">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				variant: (0, vue_exports.unref)(period) === "24h" ? "solid" : "outline",
				color: (0, vue_exports.unref)(period) === "24h" ? "primary" : "neutral",
				size: "sm",
				onClick: ($event) => period.value = "24h"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`24 Hours`);
					else return [(0, vue_exports.createTextVNode)("24 Hours")];
				}),
				_: 1
			}, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				variant: (0, vue_exports.unref)(period) === "7d" ? "solid" : "outline",
				color: (0, vue_exports.unref)(period) === "7d" ? "primary" : "neutral",
				size: "sm",
				onClick: ($event) => period.value = "7d"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`7 Days`);
					else return [(0, vue_exports.createTextVNode)("7 Days")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div>`);
			if ((0, vue_exports.unref)(loading)) {
				_push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)(8, (i) => {
					_push(`<div class="rounded-2xl overflow-hidden"><div class="skeleton aspect-square"></div><div class="p-4 space-y-2"><div class="skeleton h-4 rounded w-3/4"></div><div class="skeleton h-4 rounded w-1/2"></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if ((0, vue_exports.unref)(products).length === 0) {
				_push(`<div class="text-center py-20"><div class="text-6xl mb-4">📈</div><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No trending products yet</h3>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					to: "/products",
					color: "primary"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Browse All Products`);
						else return [(0, vue_exports.createTextVNode)("Browse All Products")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(products), (product, index) => {
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
						key: product.id,
						to: `/product/${product.id}`,
						class: "bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
					}, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="relative"${_scopeId}><div class="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden"${_scopeId}>`);
								if (product.images?.[0]) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", product.images[0])}${(0, server_renderer_exports.ssrRenderAttr)("alt", product.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"${_scopeId}>`);
								else _push(`<div class="w-full h-full flex items-center justify-center text-7xl"${_scopeId}>📦</div>`);
								_push(`</div><div class="absolute top-2 left-2 px-3 py-1 bg-emerald-500 text-white text-sm font-bold rounded-full"${_scopeId}> #${(0, server_renderer_exports.ssrInterpolate)(index + 1)}</div></div><div class="p-3 md:p-4"${_scopeId}><h3 class="font-semibold text-sm md:text-base mb-2 line-clamp-2 text-gray-900 dark:text-white"${_scopeId}>${(0, server_renderer_exports.ssrInterpolate)(product.title)}</h3><p class="text-lg md:text-2xl font-bold text-emerald-600 mb-2"${_scopeId}>₦${(0, server_renderer_exports.ssrInterpolate)(product.price?.toLocaleString())}</p><div class="flex items-center justify-between text-sm text-gray-500"${_scopeId}><div class="flex items-center gap-1"${_scopeId}>`);
								_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
									name: "i-lucide-eye",
									class: "w-4 h-4"
								}, null, _parent, _scopeId));
								_push(` ${(0, server_renderer_exports.ssrInterpolate)(product.views || 0)}</div><div class="flex items-center gap-1"${_scopeId}>`);
								_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
									name: "i-lucide-heart",
									class: "w-4 h-4"
								}, null, _parent, _scopeId));
								_push(` ${(0, server_renderer_exports.ssrInterpolate)(product.favorites_count || 0)}</div></div></div>`);
							} else return [(0, vue_exports.createVNode)("div", { class: "relative" }, [(0, vue_exports.createVNode)("div", { class: "aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden" }, [product.images?.[0] ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("img", {
								key: 0,
								src: product.images[0],
								alt: product.title,
								class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
							}, null, 8, ["src", "alt"])) : ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", {
								key: 1,
								class: "w-full h-full flex items-center justify-center text-7xl"
							}, "📦"))]), (0, vue_exports.createVNode)("div", { class: "absolute top-2 left-2 px-3 py-1 bg-emerald-500 text-white text-sm font-bold rounded-full" }, " #" + (0, vue_exports.toDisplayString)(index + 1), 1)]), (0, vue_exports.createVNode)("div", { class: "p-3 md:p-4" }, [
								(0, vue_exports.createVNode)("h3", { class: "font-semibold text-sm md:text-base mb-2 line-clamp-2 text-gray-900 dark:text-white" }, (0, vue_exports.toDisplayString)(product.title), 1),
								(0, vue_exports.createVNode)("p", { class: "text-lg md:text-2xl font-bold text-emerald-600 mb-2" }, "₦" + (0, vue_exports.toDisplayString)(product.price?.toLocaleString()), 1),
								(0, vue_exports.createVNode)("div", { class: "flex items-center justify-between text-sm text-gray-500" }, [(0, vue_exports.createVNode)("div", { class: "flex items-center gap-1" }, [(0, vue_exports.createVNode)(_component_UIcon, {
									name: "i-lucide-eye",
									class: "w-4 h-4"
								}), (0, vue_exports.createTextVNode)(" " + (0, vue_exports.toDisplayString)(product.views || 0), 1)]), (0, vue_exports.createVNode)("div", { class: "flex items-center gap-1" }, [(0, vue_exports.createVNode)(_component_UIcon, {
									name: "i-lucide-heart",
									class: "w-4 h-4"
								}), (0, vue_exports.createTextVNode)(" " + (0, vue_exports.toDisplayString)(product.favorites_count || 0), 1)])])
							])];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/pages/trending.vue
var _sfc_setup = trending_vue_vue_type_script_setup_true_lang_default.setup;
trending_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/trending.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var trending_default = trending_vue_vue_type_script_setup_true_lang_default;

export { trending_default as default };
//# sourceMappingURL=trending-Dxq2WfyR.mjs.map
