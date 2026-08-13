import { aj as vue_exports, ad as useRoute$1, R as server_renderer_exports, e as _sfc_main$2 } from '../virtual/entry.mjs';
import { _ as _sfc_main$1 } from './Select-PQNYhlOg.mjs';
import { _ as _sfc_main } from './Input-COSn-l8y.mjs';
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
import './PopperArrow-CQIWINqG.mjs';
import './Badge-ldsEE6tG.mjs';

//#region app/pages/products.vue?vue&type=script&setup=true&lang.ts
var products_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "products",
	__ssrInlineRender: true,
	setup(__props) {
		const supabase = useSupabaseClient();
		const route = useRoute$1();
		const products = (0, vue_exports.ref)([]);
		const loading = (0, vue_exports.ref)(true);
		const search = (0, vue_exports.ref)(route.query.search || "");
		const category = (0, vue_exports.ref)(route.query.category || "");
		const sortBy = (0, vue_exports.ref)("newest");
		const categories = [
			"Electronics",
			"Fashion",
			"Food",
			"Home",
			"Sports",
			"Automotive",
			"Books",
			"Services"
		];
		const loadProducts = async () => {
			loading.value = true;
			let query = supabase.from("products").select("*, seller:profiles(*)").eq("status", "active");
			if (search.value) query = query.ilike("title", `%${search.value}%`);
			if (category.value) query = query.eq("category", category.value);
			if (sortBy.value === "newest") query = query.order("created_at", { ascending: false });
			if (sortBy.value === "price_low") query = query.order("price", { ascending: true });
			if (sortBy.value === "price_high") query = query.order("price", { ascending: false });
			const { data } = await query.limit(24);
			products.value = data || [];
			loading.value = false;
		};
		(0, vue_exports.watch)([
			search,
			category,
			sortBy
		], loadProducts);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UInput = _sfc_main;
			const _component_USelect = _sfc_main$1;
			const _component_UButton = _sfc_main$2;
			const _component_ProductCard = ProductCard_default;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" }, _attrs))}><div class="max-w-7xl mx-auto"><h1 class="text-3xl font-black mb-6 text-gray-900 dark:text-white">All Products</h1><div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm mb-6 flex flex-wrap gap-3">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
				modelValue: (0, vue_exports.unref)(search),
				"onUpdate:modelValue": ($event) => (0, vue_exports.isRef)(search) ? search.value = $event : null,
				placeholder: "Search products...",
				icon: "i-lucide-search",
				class: "flex-1 min-w-48",
				onKeyup: loadProducts
			}, null, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_USelect, {
				modelValue: (0, vue_exports.unref)(category),
				"onUpdate:modelValue": ($event) => (0, vue_exports.isRef)(category) ? category.value = $event : null,
				options: ["All", ...categories],
				placeholder: "Category",
				class: "w-40"
			}, null, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_USelect, {
				modelValue: (0, vue_exports.unref)(sortBy),
				"onUpdate:modelValue": ($event) => (0, vue_exports.isRef)(sortBy) ? sortBy.value = $event : null,
				options: [
					{
						label: "Newest",
						value: "newest"
					},
					{
						label: "Price: Low",
						value: "price_low"
					},
					{
						label: "Price: High",
						value: "price_high"
					}
				],
				class: "w-40"
			}, null, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				color: "primary",
				icon: "i-lucide-search",
				onClick: loadProducts
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Search`);
					else return [(0, vue_exports.createTextVNode)("Search")];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			if ((0, vue_exports.unref)(loading)) {
				_push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)(8, (i) => {
					_push(`<div class="rounded-2xl overflow-hidden"><div class="skeleton aspect-square"></div><div class="p-4 space-y-2"><div class="skeleton h-4 rounded w-3/4"></div><div class="skeleton h-4 rounded w-1/2"></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if ((0, vue_exports.unref)(products).length === 0) _push(`<div class="text-center py-20"><div class="text-6xl mb-4">🔍</div><h3 class="text-xl font-bold mb-2">No products found</h3><p class="text-gray-600">Try a different search term</p></div>`);
			else {
				_push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(products), (product) => {
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_ProductCard, {
						key: product.id,
						product
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/pages/products.vue
var _sfc_setup = products_vue_vue_type_script_setup_true_lang_default.setup;
products_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var products_default = products_vue_vue_type_script_setup_true_lang_default;

export { products_default as default };
//# sourceMappingURL=products-ktW3Scz6.mjs.map
