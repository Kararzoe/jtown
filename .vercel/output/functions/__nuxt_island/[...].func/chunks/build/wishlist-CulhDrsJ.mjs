import { aj as vue_exports, ag as useSupabaseUser, R as server_renderer_exports, e as _sfc_main } from '../virtual/entry.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CEFOh9bN.mjs';
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
import './Badge-ldsEE6tG.mjs';

//#region app/pages/wishlist.vue?vue&type=script&setup=true&lang.ts
var wishlist_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "wishlist",
	__ssrInlineRender: true,
	setup(__props) {
		useSupabaseUser();
		const supabase = useSupabaseClient();
		const favorites = (0, vue_exports.ref)([]);
		const loading = (0, vue_exports.ref)(true);
		const remove = async (id) => {
			await supabase.from("favorites").delete().eq("id", id);
			favorites.value = favorites.value.filter((f) => f.id !== id);
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UButton = _sfc_main;
			const _component_ProductCard = ProductCard_default;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" }, _attrs))}><div class="max-w-7xl mx-auto"><h1 class="text-3xl font-black mb-8 text-gray-900 dark:text-white">My Wishlist</h1>`);
			if ((0, vue_exports.unref)(loading)) {
				_push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)(4, (i) => {
					_push(`<div class="skeleton aspect-square rounded-2xl"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if ((0, vue_exports.unref)(favorites).length === 0) {
				_push(`<div class="text-center py-20"><div class="text-6xl mb-4">❤️</div><h3 class="text-xl font-bold mb-2">No favorites yet</h3>`);
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
				_push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(favorites), (fav) => {
					_push(`<div class="relative">`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_ProductCard, { product: fav.product }, null, _parent));
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
						icon: "i-lucide-x",
						color: "error",
						size: "xs",
						class: "absolute top-2 right-2 rounded-full",
						onClick: ($event) => remove(fav.id)
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
//#region app/pages/wishlist.vue
var _sfc_setup = wishlist_vue_vue_type_script_setup_true_lang_default.setup;
wishlist_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/wishlist.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var wishlist_default = wishlist_vue_vue_type_script_setup_true_lang_default;

export { wishlist_default as default };
//# sourceMappingURL=wishlist-CulhDrsJ.mjs.map
