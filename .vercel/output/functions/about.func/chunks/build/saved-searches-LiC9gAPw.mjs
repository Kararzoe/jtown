import { aj as vue_exports, ae as useRouter, R as server_renderer_exports, e as _sfc_main, j as _sfc_main$5 } from '../virtual/entry.mjs';
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

//#region app/pages/saved-searches.vue?vue&type=script&setup=true&lang.ts
var saved_searches_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "saved-searches",
	__ssrInlineRender: true,
	setup(__props) {
		const router = useRouter();
		const searches = (0, vue_exports.ref)([]);
		const runSearch = (s) => {
			const params = new URLSearchParams({
				search: s.query,
				...s.filters
			});
			router.push(`/products?${params.toString()}`);
		};
		const remove = (id) => {
			searches.value = searches.value.filter((s) => s.id !== id);
			localStorage.setItem("saved_searches", JSON.stringify(searches.value));
		};
		const clearAll = () => {
			searches.value = [];
			localStorage.removeItem("saved_searches");
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UButton = _sfc_main;
			const _component_UIcon = _sfc_main$5;
			const _component_UBadge = _sfc_main$1;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" }, _attrs))}><div class="max-w-3xl mx-auto"><div class="flex items-center justify-between mb-8"><div class="flex items-center gap-3">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/dashboard",
				icon: "i-lucide-arrow-left",
				variant: "ghost",
				color: "neutral"
			}, null, _parent));
			_push(`<h1 class="text-3xl font-black text-gray-900 dark:text-white">Saved Searches</h1></div>`);
			if ((0, vue_exports.unref)(searches).length) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				icon: "i-lucide-trash",
				color: "error",
				variant: "outline",
				size: "sm",
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
			if ((0, vue_exports.unref)(searches).length === 0) {
				_push(`<div class="text-center py-20"><div class="text-6xl mb-4">🔍</div><h3 class="text-xl font-bold mb-2">No saved searches</h3><p class="text-gray-500 mb-6">Save searches from the products page to quickly find items later</p>`);
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
				_push(`<div class="space-y-3"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(searches), (s) => {
					_push(`<div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md flex items-center gap-4 card-hover"><div class="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
						name: "i-lucide-search",
						class: "w-5 h-5 text-primary-600"
					}, null, _parent));
					_push(`</div><div class="flex-1 min-w-0"><p class="font-bold truncate">${(0, server_renderer_exports.ssrInterpolate)(s.query || "All Products")}</p><div class="flex flex-wrap gap-1 mt-1"><!--[-->`);
					(0, server_renderer_exports.ssrRenderList)(s.filters, (val, key) => {
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UBadge, {
							key,
							color: "neutral",
							variant: "soft",
							size: "xs"
						}, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)(key)}: ${(0, server_renderer_exports.ssrInterpolate)(val)}`);
								else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(key) + ": " + (0, vue_exports.toDisplayString)(val), 1)];
							}),
							_: 2
						}, _parent));
					});
					_push(`<!--]--></div><p class="text-xs text-gray-400 mt-1">Saved ${(0, server_renderer_exports.ssrInterpolate)(new Date(s.savedAt).toLocaleDateString())}</p></div><div class="flex gap-2">`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
						icon: "i-lucide-play",
						color: "primary",
						size: "xs",
						onClick: ($event) => runSearch(s)
					}, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Run`);
							else return [(0, vue_exports.createTextVNode)("Run")];
						}),
						_: 2
					}, _parent));
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
						icon: "i-lucide-trash",
						color: "error",
						variant: "ghost",
						size: "xs",
						onClick: ($event) => remove(s.id)
					}, null, _parent));
					_push(`</div></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/pages/saved-searches.vue
var _sfc_setup = saved_searches_vue_vue_type_script_setup_true_lang_default.setup;
saved_searches_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/saved-searches.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var saved_searches_default = saved_searches_vue_vue_type_script_setup_true_lang_default;

export { saved_searches_default as default };
//# sourceMappingURL=saved-searches-LiC9gAPw.mjs.map
