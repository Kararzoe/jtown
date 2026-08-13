import { aj as vue_exports, ag as useSupabaseUser, R as server_renderer_exports, e as _sfc_main } from '../virtual/entry.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CEFOh9bN.mjs';
import { _ as _sfc_main$1 } from './Badge-ldsEE6tG.mjs';
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

//#region app/pages/seller-dashboard.vue?vue&type=script&setup=true&lang.ts
var seller_dashboard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "seller-dashboard",
	__ssrInlineRender: true,
	setup(__props) {
		useSupabaseUser();
		const supabase = useSupabaseClient();
		const tab = (0, vue_exports.ref)("products");
		const products = (0, vue_exports.ref)([]);
		const orders = (0, vue_exports.ref)([]);
		const analytics = (0, vue_exports.ref)({
			totalViews: 0,
			totalOrders: 0,
			totalRevenue: 0
		});
		const loading = (0, vue_exports.ref)(true);
		const deleteProduct = async (id) => {
			await supabase.from("products").delete().eq("id", id);
			products.value = products.value.filter((p) => p.id !== id);
		};
		const tabs = [
			{
				label: "Products",
				value: "products",
				icon: "i-lucide-package"
			},
			{
				label: "Orders",
				value: "orders",
				icon: "i-lucide-shopping-bag"
			},
			{
				label: "Analytics",
				value: "analytics",
				icon: "i-lucide-bar-chart"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UButton = _sfc_main;
			const _component_UBadge = _sfc_main$1;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" }, _attrs))}><div class="max-w-7xl mx-auto"><div class="flex items-center justify-between mb-8"><h1 class="text-3xl font-black text-gray-900 dark:text-white">Seller Dashboard</h1>`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/upload-product",
				color: "primary",
				icon: "i-lucide-plus"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Add Product`);
					else return [(0, vue_exports.createTextVNode)("Add Product")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="grid grid-cols-3 gap-4 mb-8"><!--[-->`);
			(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(analytics), (val, key) => {
				_push(`<div class="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-md text-center"><p class="text-2xl md:text-3xl font-black text-primary-600">${(0, server_renderer_exports.ssrInterpolate)(key === "totalRevenue" ? `₦${val.toLocaleString()}` : val)}</p><p class="text-sm text-gray-600 dark:text-gray-400 capitalize">${(0, server_renderer_exports.ssrInterpolate)(key.replace("total", "Total "))}</p></div>`);
			});
			_push(`<!--]--></div><div class="flex gap-2 mb-6"><!--[-->`);
			(0, server_renderer_exports.ssrRenderList)(tabs, (t) => {
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					key: t.value,
					icon: t.icon,
					variant: (0, vue_exports.unref)(tab) === t.value ? "solid" : "outline",
					color: (0, vue_exports.unref)(tab) === t.value ? "primary" : "neutral",
					onClick: ($event) => tab.value = t.value
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)(t.label)}`);
						else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(t.label), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div>`);
			if ((0, vue_exports.unref)(tab) === "products") {
				_push(`<div>`);
				if ((0, vue_exports.unref)(loading)) {
					_push(`<div class="space-y-3"><!--[-->`);
					(0, server_renderer_exports.ssrRenderList)(4, (i) => {
						_push(`<div class="skeleton h-20 rounded-xl"></div>`);
					});
					_push(`<!--]--></div>`);
				} else if ((0, vue_exports.unref)(products).length === 0) {
					_push(`<div class="text-center py-12"><p class="text-gray-500 mb-4">No products yet</p>`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
						to: "/upload-product",
						color: "primary"
					}, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Upload First Product`);
							else return [(0, vue_exports.createTextVNode)("Upload First Product")];
						}),
						_: 1
					}, _parent));
					_push(`</div>`);
				} else {
					_push(`<div class="space-y-3"><!--[-->`);
					(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(products), (p) => {
						_push(`<div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4"><div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">`);
						if (p.images?.[0]) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", p.images[0])}${(0, server_renderer_exports.ssrRenderAttr)("alt", p.title)} class="w-full h-full object-cover">`);
						else _push(`<div class="w-full h-full flex items-center justify-center text-2xl">📦</div>`);
						_push(`</div><div class="flex-1 min-w-0"><p class="font-bold truncate">${(0, server_renderer_exports.ssrInterpolate)(p.title)}</p><p class="text-primary-600 font-semibold">₦${(0, server_renderer_exports.ssrInterpolate)(p.price?.toLocaleString())}</p><div class="flex items-center gap-2 text-xs text-gray-500"><span>${(0, server_renderer_exports.ssrInterpolate)(p.views || 0)} views</span><span>Stock: ${(0, server_renderer_exports.ssrInterpolate)(p.stock)}</span></div></div><div class="flex gap-2">`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
							to: `/product/${p.id}`,
							icon: "i-lucide-eye",
							variant: "ghost",
							size: "xs"
						}, null, _parent));
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
							icon: "i-lucide-trash",
							variant: "ghost",
							color: "error",
							size: "xs",
							onClick: ($event) => deleteProduct(p.id)
						}, null, _parent));
						_push(`</div></div>`);
					});
					_push(`<!--]--></div>`);
				}
				_push(`</div>`);
			} else _push(`<!---->`);
			if ((0, vue_exports.unref)(tab) === "orders") {
				_push(`<div>`);
				if ((0, vue_exports.unref)(orders).length === 0) _push(`<div class="text-center py-12 text-gray-500">No orders yet</div>`);
				else {
					_push(`<div class="space-y-3"><!--[-->`);
					(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(orders), (o) => {
						_push(`<div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4"><div class="text-3xl">📦</div><div class="flex-1"><p class="font-bold">${(0, server_renderer_exports.ssrInterpolate)(o.product?.title)}</p><p class="text-sm text-gray-500">${(0, server_renderer_exports.ssrInterpolate)(new Date(o.created_at).toLocaleDateString())}</p></div>`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UBadge, { color: o.status === "completed" ? "success" : o.status === "cancelled" ? "error" : "warning" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)(o.status)}`);
								else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(o.status), 1)];
							}),
							_: 2
						}, _parent));
						_push(`</div>`);
					});
					_push(`<!--]--></div>`);
				}
				_push(`</div>`);
			} else _push(`<!---->`);
			if ((0, vue_exports.unref)(tab) === "analytics") {
				_push(`<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"><h3 class="font-black text-xl mb-6">Performance Overview</h3><div class="space-y-4"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(products).slice(0, 5), (p) => {
					_push(`<div class="flex items-center gap-4"><p class="flex-1 truncate text-sm font-medium">${(0, server_renderer_exports.ssrInterpolate)(p.title)}</p><div class="w-32 bg-gray-100 rounded-full h-2"><div class="bg-primary-500 h-2 rounded-full" style="${(0, server_renderer_exports.ssrRenderStyle)(`width: ${Math.min((p.views || 0) / 100 * 100, 100)}%`)}"></div></div><span class="text-sm text-gray-500 w-16 text-right">${(0, server_renderer_exports.ssrInterpolate)(p.views || 0)} views</span></div>`);
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/pages/seller-dashboard.vue
var _sfc_setup = seller_dashboard_vue_vue_type_script_setup_true_lang_default.setup;
seller_dashboard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/seller-dashboard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var seller_dashboard_default = seller_dashboard_vue_vue_type_script_setup_true_lang_default;

export { seller_dashboard_default as default };
//# sourceMappingURL=seller-dashboard-7SQlfcd4.mjs.map
