import { aj as vue_exports, ad as useRoute$1, ag as useSupabaseUser, ah as useToast, R as server_renderer_exports, e as _sfc_main$1, j as _sfc_main$5 } from '../virtual/entry.mjs';
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

//#region app/pages/product/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "[id]",
	__ssrInlineRender: true,
	setup(__props) {
		useRoute$1();
		const supabase = useSupabaseClient();
		const user = useSupabaseUser();
		const toast = useToast();
		const product = (0, vue_exports.ref)(null);
		const related = (0, vue_exports.ref)([]);
		const selectedImage = (0, vue_exports.ref)(0);
		const loading = (0, vue_exports.ref)(true);
		const toggleFav = async () => {
			if (!user.value) return toast.add({
				title: "Please login first",
				color: "error"
			});
			await supabase.from("favorites").insert({
				user_id: user.value.id,
				product_id: product.value.id
			});
			toast.add({
				title: "Added to wishlist!",
				color: "success"
			});
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UBadge = _sfc_main;
			const _component_UButton = _sfc_main$1;
			const _component_UIcon = _sfc_main$5;
			const _component_ProductCard = ProductCard_default;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" }, _attrs))}>`);
			if ((0, vue_exports.unref)(loading)) _push(`<div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-8"><div class="skeleton aspect-square rounded-2xl"></div><div class="space-y-4"><div class="skeleton h-8 rounded w-3/4"></div><div class="skeleton h-6 rounded w-1/2"></div><div class="skeleton h-12 rounded w-1/3"></div></div></div>`);
			else if ((0, vue_exports.unref)(product)) {
				_push(`<div class="max-w-7xl mx-auto"><div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8"><div class="grid md:grid-cols-2 gap-8"><div><div class="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-4">`);
				if ((0, vue_exports.unref)(product).images?.[(0, vue_exports.unref)(selectedImage)]) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", (0, vue_exports.unref)(product).images[(0, vue_exports.unref)(selectedImage)])}${(0, server_renderer_exports.ssrRenderAttr)("alt", (0, vue_exports.unref)(product).title)} class="w-full h-full object-cover">`);
				else _push(`<div class="w-full h-full flex items-center justify-center text-8xl">📦</div>`);
				_push(`</div><div class="grid grid-cols-4 gap-2"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(product).images, (img, i) => {
					_push(`<button class="${(0, server_renderer_exports.ssrRenderClass)([(0, vue_exports.unref)(selectedImage) === i ? "border-primary-500" : "border-gray-200", "aspect-square rounded-lg overflow-hidden border-2 transition-colors"])}"><img${(0, server_renderer_exports.ssrRenderAttr)("src", img)}${(0, server_renderer_exports.ssrRenderAttr)("alt", (0, vue_exports.unref)(product).title)} class="w-full h-full object-cover"></button>`);
				});
				_push(`<!--]--></div></div><div><div class="flex items-start justify-between mb-4"><div>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UBadge, {
					color: "primary",
					class: "mb-2"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(product).category)}`);
						else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(product).category), 1)];
					}),
					_: 1
				}, _parent));
				_push(`<h1 class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(product).title)}</h1></div>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					icon: "i-lucide-heart",
					variant: "ghost",
					color: "error",
					onClick: toggleFav
				}, null, _parent));
				_push(`</div><p class="text-4xl font-black text-primary-600 mb-4">₦${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(product).price?.toLocaleString())}</p><div class="flex items-center gap-3 mb-6">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UBadge, {
					variant: "soft",
					color: "neutral"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(product).condition)}`);
						else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(product).condition), 1)];
					}),
					_: 1
				}, _parent));
				_push(`<div class="flex items-center gap-1 text-gray-600">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: "i-lucide-map-pin",
					class: "w-4 h-4"
				}, null, _parent));
				_push(`<span class="text-sm">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(product).location)}</span></div></div><div class="border-t border-b dark:border-gray-700 py-4 mb-6"><div class="flex items-center gap-4"><div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">🏪</div><div><p class="font-bold">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(product).seller?.shop_name || (0, vue_exports.unref)(product).seller?.full_name)}</p><div class="flex items-center gap-1">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: "i-lucide-star",
					class: "w-4 h-4 text-yellow-400"
				}, null, _parent));
				_push(`<span class="text-sm text-gray-600">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(product).seller?.rating || 0)}</span></div></div>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					to: `/seller/${(0, vue_exports.unref)(product).seller?.id}`,
					variant: "outline",
					size: "sm",
					class: "ml-auto"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`View Shop`);
						else return [(0, vue_exports.createTextVNode)("View Shop")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div><div class="mb-6"><h3 class="font-bold text-lg mb-2">Description</h3><p class="text-gray-600 dark:text-gray-400 leading-relaxed">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(product).description)}</p></div><div class="flex gap-3">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					color: "success",
					size: "lg",
					icon: "i-lucide-message-circle",
					class: "flex-1",
					onClick: () => _ctx.window.open(`https://wa.me/${(0, vue_exports.unref)(product).seller?.phone}?text=Hi, I'm interested in ${(0, vue_exports.unref)(product).title}`, "_blank")
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(` WhatsApp Seller `);
						else return [(0, vue_exports.createTextVNode)(" WhatsApp Seller ")];
					}),
					_: 1
				}, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					variant: "outline",
					color: "primary",
					size: "lg",
					icon: "i-lucide-phone",
					onClick: () => _ctx.window.open(`tel:${(0, vue_exports.unref)(product).seller?.phone}`)
				}, null, _parent));
				_push(`</div></div></div></div>`);
				if ((0, vue_exports.unref)(related).length > 0) {
					_push(`<div><h2 class="text-2xl font-black mb-6">Related Products</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-4"><!--[-->`);
					(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(related), (p) => {
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_ProductCard, {
							key: p.id,
							product: p
						}, null, _parent));
					});
					_push(`<!--]--></div></div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/product/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-zGQKcnVJ.mjs.map
