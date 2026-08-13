import { aj as vue_exports, ag as useSupabaseUser, R as server_renderer_exports, j as _sfc_main$5, e as _sfc_main$1 } from '../virtual/entry.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CEFOh9bN.mjs';
import { _ as _sfc_main } from './Badge-ldsEE6tG.mjs';
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

//#region app/pages/dashboard.vue?vue&type=script&setup=true&lang.ts
var dashboard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "dashboard",
	__ssrInlineRender: true,
	setup(__props) {
		const user = useSupabaseUser();
		useSupabaseClient();
		const orders = (0, vue_exports.ref)([]);
		const favorites = (0, vue_exports.ref)([]);
		const profile = (0, vue_exports.ref)(null);
		const loading = (0, vue_exports.ref)(true);
		const displayName = (0, vue_exports.computed)(() => profile.value?.full_name || user.value?.user_metadata?.full_name || user.value?.email?.split("@")[0] || "User");
		const isAdmin = (0, vue_exports.computed)(() => user.value?.email === "kararzoe@gmail.com" || user.value?.user_metadata?.role === "admin");
		const stats = (0, vue_exports.computed)(() => [
			{
				label: "Orders",
				value: orders.value.length,
				icon: "i-lucide-package",
				color: "bg-blue-500"
			},
			{
				label: "Wishlist",
				value: favorites.value.length,
				icon: "i-lucide-heart",
				color: "bg-pink-500"
			},
			{
				label: "Messages",
				value: 0,
				icon: "i-lucide-message-circle",
				color: "bg-green-500"
			}
		]);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$5;
			const _component_UBadge = _sfc_main;
			const _component_UButton = _sfc_main$1;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" }, _attrs))}><div class="max-w-7xl mx-auto"><div class="mb-8 animate-fade-up flex items-center gap-4"><div class="w-14 h-14 rounded-full overflow-hidden bg-primary-100 dark:bg-primary-900/30 ring-4 ring-primary-500/20 flex-shrink-0">`);
			if ((0, vue_exports.unref)(profile)?.avatar_url) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", (0, vue_exports.unref)(profile).avatar_url)} alt="Avatar" class="w-full h-full object-cover">`);
			else _push(`<div class="w-full h-full flex items-center justify-center text-2xl">👤</div>`);
			_push(`</div><div><h1 class="text-3xl font-black text-gray-900 dark:text-white mb-1">Welcome back, ${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(displayName))}! 👋</h1><p class="text-gray-600 dark:text-gray-400">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(user)?.email)}</p></div></div><div class="grid grid-cols-3 gap-4 md:gap-6 mb-8"><!--[-->`);
			(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(stats), (stat) => {
				_push(`<div class="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-md card-hover animate-fade-up"><div class="${(0, server_renderer_exports.ssrRenderClass)([stat.color, "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4"])}">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: stat.icon,
					class: "w-5 h-5 md:w-6 md:h-6 text-white"
				}, null, _parent));
				_push(`</div><p class="text-2xl md:text-3xl font-black mb-1">${(0, server_renderer_exports.ssrInterpolate)(stat.value)}</p><p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">${(0, server_renderer_exports.ssrInterpolate)(stat.label)}</p></div>`);
			});
			_push(`<!--]--></div><div class="grid md:grid-cols-2 gap-6"><div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"><h2 class="text-xl font-black mb-4">Recent Orders</h2>`);
			if ((0, vue_exports.unref)(loading)) {
				_push(`<div class="space-y-3"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)(3, (i) => {
					_push(`<div class="skeleton h-16 rounded-xl"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if ((0, vue_exports.unref)(orders).length === 0) _push(`<div class="text-center py-8 text-gray-500">No orders yet</div>`);
			else {
				_push(`<div class="space-y-3"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(orders), (order) => {
					_push(`<div class="flex items-center gap-3 p-3 border dark:border-gray-700 rounded-xl"><div class="text-3xl">📦</div><div class="flex-1 min-w-0"><p class="font-semibold truncate">${(0, server_renderer_exports.ssrInterpolate)(order.product?.title)}</p>`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UBadge, {
						color: order.status === "completed" ? "success" : order.status === "cancelled" ? "error" : "warning",
						size: "xs"
					}, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)(order.status)}`);
							else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(order.status), 1)];
						}),
						_: 2
					}, _parent));
					_push(`</div><p class="font-bold text-primary-600">₦${(0, server_renderer_exports.ssrInterpolate)(order.product?.price?.toLocaleString())}</p></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div><div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"><h2 class="text-xl font-black mb-4">Quick Actions</h2><div class="space-y-3">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/wishlist",
				variant: "outline",
				color: "neutral",
				block: "",
				icon: "i-lucide-heart",
				class: "justify-start"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`View Wishlist`);
					else return [(0, vue_exports.createTextVNode)("View Wishlist")];
				}),
				_: 1
			}, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/orders",
				variant: "outline",
				color: "neutral",
				block: "",
				icon: "i-lucide-package",
				class: "justify-start"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`All Orders`);
					else return [(0, vue_exports.createTextVNode)("All Orders")];
				}),
				_: 1
			}, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/upload-product",
				variant: "outline",
				color: "neutral",
				block: "",
				icon: "i-lucide-plus",
				class: "justify-start"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Upload Product`);
					else return [(0, vue_exports.createTextVNode)("Upload Product")];
				}),
				_: 1
			}, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/seller-dashboard",
				variant: "outline",
				color: "neutral",
				block: "",
				icon: "i-lucide-store",
				class: "justify-start"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Seller Dashboard`);
					else return [(0, vue_exports.createTextVNode)("Seller Dashboard")];
				}),
				_: 1
			}, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/compare",
				variant: "outline",
				color: "neutral",
				block: "",
				icon: "i-lucide-scale",
				class: "justify-start"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Compare Products`);
					else return [(0, vue_exports.createTextVNode)("Compare Products")];
				}),
				_: 1
			}, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/saved-searches",
				variant: "outline",
				color: "neutral",
				block: "",
				icon: "i-lucide-bookmark",
				class: "justify-start"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Saved Searches`);
					else return [(0, vue_exports.createTextVNode)("Saved Searches")];
				}),
				_: 1
			}, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/profile",
				variant: "outline",
				color: "neutral",
				block: "",
				icon: "i-lucide-user-circle",
				class: "justify-start"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Edit Profile`);
					else return [(0, vue_exports.createTextVNode)("Edit Profile")];
				}),
				_: 1
			}, _parent));
			if ((0, vue_exports.unref)(isAdmin)) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/admin",
				color: "error",
				variant: "outline",
				block: "",
				icon: "i-lucide-shield",
				class: "justify-start"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Admin Dashboard`);
					else return [(0, vue_exports.createTextVNode)("Admin Dashboard")];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`</div></div></div></div></div>`);
		};
	}
});
//#endregion
//#region app/pages/dashboard.vue
var _sfc_setup = dashboard_vue_vue_type_script_setup_true_lang_default.setup;
dashboard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var dashboard_default = dashboard_vue_vue_type_script_setup_true_lang_default;

export { dashboard_default as default };
//# sourceMappingURL=dashboard-B5nJyv1e.mjs.map
