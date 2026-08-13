import { aj as vue_exports, ad as useRoute$1, R as server_renderer_exports, j as _sfc_main$5, e as _sfc_main$1 } from '../virtual/entry.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CEFOh9bN.mjs';
import { _ as _sfc_main } from './Badge-ldsEE6tG.mjs';
import { P as ProductCard_default } from './ProductCard-DE7dQGQo.mjs';
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

//#region app/pages/seller/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "[id]",
	__ssrInlineRender: true,
	setup(__props) {
		useRoute$1();
		useSupabaseClient();
		const seller = (0, vue_exports.ref)(null);
		const products = (0, vue_exports.ref)([]);
		const loading = (0, vue_exports.ref)(true);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$5;
			const _component_UBadge = _sfc_main;
			const _component_UButton = _sfc_main$1;
			const _component_ProductCard = ProductCard_default;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" }, _attrs))}>`);
			if ((0, vue_exports.unref)(loading)) _push(`<div class="max-w-7xl mx-auto"><div class="skeleton h-48 rounded-2xl mb-8"></div></div>`);
			else if ((0, vue_exports.unref)(seller)) {
				_push(`<div class="max-w-7xl mx-auto"><div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8"><div class="flex items-start gap-6"><div class="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-5xl">🏪</div><div class="flex-1"><h1 class="text-3xl font-black mb-2">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(seller).shop_name || (0, vue_exports.unref)(seller).full_name)}</h1><div class="flex items-center gap-4 mb-4"><div class="flex items-center gap-1">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: "i-lucide-star",
					class: "w-5 h-5 text-yellow-400"
				}, null, _parent));
				_push(`<span class="font-semibold">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(seller).rating || 0)}</span></div>`);
				if ((0, vue_exports.unref)(seller).is_verified) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UBadge, { color: "info" }, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`✓ Verified`);
						else return [(0, vue_exports.createTextVNode)("✓ Verified")];
					}),
					_: 1
				}, _parent));
				else _push(`<!---->`);
				_push(`</div><div class="flex items-center gap-2 text-gray-600 mb-4">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: "i-lucide-map-pin",
					class: "w-4 h-4"
				}, null, _parent));
				_push(`<span>${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(seller).location || "Jos, Nigeria")}</span></div><p class="text-gray-600 mb-4">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(seller).shop_description)}</p><div class="flex gap-3">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					color: "success",
					icon: "i-lucide-message-circle",
					onClick: () => _ctx.window.open(`https://wa.me/${(0, vue_exports.unref)(seller).phone}`, "_blank")
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Contact`);
						else return [(0, vue_exports.createTextVNode)("Contact")];
					}),
					_: 1
				}, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					variant: "outline",
					color: "primary",
					icon: "i-lucide-phone",
					onClick: () => _ctx.window.open(`tel:${(0, vue_exports.unref)(seller).phone}`)
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Call`);
						else return [(0, vue_exports.createTextVNode)("Call")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div></div></div><h2 class="text-2xl font-black mb-6">Products (${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(products).length)})</h2>`);
				if ((0, vue_exports.unref)(products).length === 0) _push(`<div class="text-center py-12 text-gray-600">No products available</div>`);
				else {
					_push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4"><!--[-->`);
					(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(products), (p) => {
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_ProductCard, {
							key: p.id,
							product: p
						}, null, _parent));
					});
					_push(`<!--]--></div>`);
				}
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/seller/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/seller/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-DMMoB-_5.mjs.map
