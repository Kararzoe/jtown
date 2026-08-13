import { aj as vue_exports, ag as useSupabaseUser, R as server_renderer_exports, e as _sfc_main, N as NuxtLink } from '../virtual/entry.mjs';
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

//#region app/pages/compare.vue?vue&type=script&setup=true&lang.ts
var compare_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "compare",
	__ssrInlineRender: true,
	setup(__props) {
		useSupabaseClient();
		useSupabaseUser();
		(0, vue_exports.ref)([]);
		const compareList = (0, vue_exports.ref)([]);
		const loading = (0, vue_exports.ref)(true);
		(0, vue_exports.ref)("");
		const removeFromCompare = (id) => {
			compareList.value = compareList.value.filter((p) => p.id !== id);
			localStorage.setItem("compare_ids", JSON.stringify(compareList.value.map((p) => p.id)));
		};
		const clearAll = () => {
			compareList.value = [];
			localStorage.removeItem("compare_ids");
		};
		const fields = [
			"price",
			"category",
			"condition",
			"location",
			"stock"
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UButton = _sfc_main;
			const _component_NuxtLink = NuxtLink;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" }, _attrs))}><div class="max-w-7xl mx-auto"><div class="flex items-center justify-between mb-8"><div class="flex items-center gap-3">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/dashboard",
				icon: "i-lucide-arrow-left",
				variant: "ghost",
				color: "neutral"
			}, null, _parent));
			_push(`<h1 class="text-3xl font-black text-gray-900 dark:text-white">Compare Products</h1></div>`);
			if ((0, vue_exports.unref)(compareList).length) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				icon: "i-lucide-trash",
				color: "error",
				variant: "outline",
				onClick: clearAll
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Clear All`);
					else return [(0, vue_exports.createTextVNode)("Clear All")];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`</div>`);
			if ((0, vue_exports.unref)(loading)) {
				_push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)(3, (i) => {
					_push(`<div class="skeleton h-64 rounded-2xl"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if ((0, vue_exports.unref)(compareList).length === 0) {
				_push(`<div class="text-center py-20"><div class="text-6xl mb-4">⚖️</div><h3 class="text-xl font-bold mb-2">Nothing to compare</h3><p class="text-gray-500 mb-6">Add products to compare by clicking the compare button on product pages</p>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					to: "/products",
					color: "primary"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Browse Products`);
						else return [(0, vue_exports.createTextVNode)("Browse Products")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div class="overflow-x-auto"><table class="w-full"><thead><tr><td class="w-32 p-3 font-bold text-gray-500 text-sm uppercase">Feature</td><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(compareList), (p) => {
					_push(`<th class="p-3 min-w-48"><div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md relative">`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
						icon: "i-lucide-x",
						variant: "ghost",
						color: "error",
						size: "xs",
						class: "absolute top-2 right-2",
						onClick: ($event) => removeFromCompare(p.id)
					}, null, _parent));
					_push(`<div class="w-full aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">`);
					if (p.images?.[0]) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", p.images[0])}${(0, server_renderer_exports.ssrRenderAttr)("alt", p.title)} class="w-full h-full object-cover">`);
					else _push(`<div class="w-full h-full flex items-center justify-center text-4xl">📦</div>`);
					_push(`</div><p class="font-bold text-sm line-clamp-2">${(0, server_renderer_exports.ssrInterpolate)(p.title)}</p>`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
						to: `/product/${p.id}`,
						class: "text-xs text-primary-600 hover:underline"
					}, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push(`View Product`);
							else return [(0, vue_exports.createTextVNode)("View Product")];
						}),
						_: 2
					}, _parent));
					_push(`</div></th>`);
				});
				_push(`<!--]--></tr></thead><tbody><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)(fields, (field) => {
					_push(`<tr class="border-t border-gray-200 dark:border-gray-700"><td class="p-3 text-sm font-semibold text-gray-600 dark:text-gray-400 capitalize">${(0, server_renderer_exports.ssrInterpolate)(field)}</td><!--[-->`);
					(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(compareList), (p) => {
						_push(`<td class="p-3 text-center">`);
						if (field === "price") _push(`<span class="font-black text-primary-600">₦${(0, server_renderer_exports.ssrInterpolate)(p.price?.toLocaleString())}</span>`);
						else if (field === "stock") _push(`<span class="${(0, server_renderer_exports.ssrRenderClass)([p.stock > 0 ? "text-green-600" : "text-red-500", "font-semibold"])}">${(0, server_renderer_exports.ssrInterpolate)(p.stock > 0 ? `${p.stock} available` : "Out of stock")}</span>`);
						else _push(`<span class="text-gray-700 dark:text-gray-300 capitalize">${(0, server_renderer_exports.ssrInterpolate)(p[field] || "-")}</span>`);
						_push(`</td>`);
					});
					_push(`<!--]--></tr>`);
				});
				_push(`<!--]--><tr class="border-t border-gray-200 dark:border-gray-700"><td class="p-3 text-sm font-semibold text-gray-600 dark:text-gray-400">Seller</td><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(compareList), (p) => {
					_push(`<td class="p-3 text-center text-sm">${(0, server_renderer_exports.ssrInterpolate)(p.seller?.full_name || "Unknown")}</td>`);
				});
				_push(`<!--]--></tr><tr class="border-t border-gray-200 dark:border-gray-700"><td class="p-3"></td><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(compareList), (p) => {
					_push(`<td class="p-3 text-center">`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
						to: `https://wa.me/234${p.seller?.whatsapp?.replace(/\D/g, "").slice(-10)}`,
						target: "_blank",
						color: "success",
						size: "sm",
						icon: "i-lucide-message-circle"
					}, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push(` Contact `);
							else return [(0, vue_exports.createTextVNode)(" Contact ")];
						}),
						_: 2
					}, _parent));
					_push(`</td>`);
				});
				_push(`<!--]--></tr></tbody></table></div>`);
			}
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/pages/compare.vue
var _sfc_setup = compare_vue_vue_type_script_setup_true_lang_default.setup;
compare_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/compare.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var compare_default = compare_vue_vue_type_script_setup_true_lang_default;

export { compare_default as default };
//# sourceMappingURL=compare-CpV4s4Vf.mjs.map
