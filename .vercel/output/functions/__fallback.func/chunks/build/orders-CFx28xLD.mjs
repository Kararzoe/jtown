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

//#region app/pages/orders.vue?vue&type=script&setup=true&lang.ts
var orders_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "orders",
	__ssrInlineRender: true,
	setup(__props) {
		useSupabaseUser();
		useSupabaseClient();
		const orders = (0, vue_exports.ref)([]);
		const loading = (0, vue_exports.ref)(true);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UButton = _sfc_main;
			const _component_UBadge = _sfc_main$1;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" }, _attrs))}><div class="max-w-7xl mx-auto"><h1 class="text-3xl font-black mb-8 text-gray-900 dark:text-white">Order History</h1>`);
			if ((0, vue_exports.unref)(loading)) {
				_push(`<div class="space-y-4"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)(3, (i) => {
					_push(`<div class="skeleton h-28 rounded-2xl"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if ((0, vue_exports.unref)(orders).length === 0) {
				_push(`<div class="text-center py-20"><div class="text-6xl mb-4">📦</div><h3 class="text-xl font-bold mb-2">No orders yet</h3>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					to: "/products",
					color: "primary"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Start Shopping`);
						else return [(0, vue_exports.createTextVNode)("Start Shopping")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div class="space-y-4"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(orders), (order) => {
					_push(`<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md flex items-start gap-4"><div class="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">`);
					if (order.product?.images?.[0]) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", order.product.images[0])}${(0, server_renderer_exports.ssrRenderAttr)("alt", order.product.title)} class="w-full h-full object-cover">`);
					else _push(`<div class="w-full h-full flex items-center justify-center text-3xl">📦</div>`);
					_push(`</div><div class="flex-1"><h3 class="font-bold text-lg mb-1">${(0, server_renderer_exports.ssrInterpolate)(order.product?.title)}</h3><p class="text-gray-600 text-sm mb-2">Seller: ${(0, server_renderer_exports.ssrInterpolate)(order.seller?.shop_name || order.seller?.full_name)}</p><div class="flex items-center gap-3"><span class="text-xl font-black text-primary-600">₦${(0, server_renderer_exports.ssrInterpolate)(order.product?.price?.toLocaleString())}</span>`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UBadge, { color: order.status === "completed" ? "success" : order.status === "cancelled" ? "error" : "warning" }, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)(order.status)}`);
							else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(order.status), 1)];
						}),
						_: 2
					}, _parent));
					_push(`</div><p class="text-xs text-gray-400 mt-1">${(0, server_renderer_exports.ssrInterpolate)(new Date(order.created_at).toLocaleDateString())}</p></div>`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
						icon: "i-lucide-message-circle",
						color: "success",
						size: "sm",
						onClick: () => _ctx.window.open(`https://wa.me/${order.seller?.phone}`, "_blank")
					}, null, _parent));
					_push(`</div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/pages/orders.vue
var _sfc_setup = orders_vue_vue_type_script_setup_true_lang_default.setup;
orders_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/orders.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var orders_default = orders_vue_vue_type_script_setup_true_lang_default;

export { orders_default as default };
//# sourceMappingURL=orders-CFx28xLD.mjs.map
