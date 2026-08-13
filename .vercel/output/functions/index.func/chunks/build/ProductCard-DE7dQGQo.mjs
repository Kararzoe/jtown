import { aj as vue_exports, ag as useSupabaseUser, ah as useToast, R as server_renderer_exports, e as _sfc_main$1 } from '../virtual/entry.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CEFOh9bN.mjs';
import { _ as _sfc_main } from './Badge-ldsEE6tG.mjs';

//#region app/components/ProductCard.vue?vue&type=script&setup=true&lang.ts
var ProductCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "ProductCard",
	__ssrInlineRender: true,
	props: { product: {} },
	setup(__props) {
		const props = __props;
		const user = useSupabaseUser();
		const supabase = useSupabaseClient();
		const toast = useToast();
		const isFav = (0, vue_exports.ref)(false);
		const toggleFav = async () => {
			if (!user.value) return toast.add({
				title: "Please login first",
				color: "error"
			});
			isFav.value = !isFav.value;
			if (isFav.value) await supabase.from("favorites").insert({
				user_id: user.value.id,
				product_id: props.product.id
			});
			else await supabase.from("favorites").delete().eq("user_id", user.value.id).eq("product_id", props.product.id);
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UBadge = _sfc_main;
			const _component_UButton = _sfc_main$1;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "card-hover bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md group cursor-pointer" }, _attrs))}><div class="relative"><div class="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">`);
			if (__props.product.images?.[0]) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", __props.product.images[0])}${(0, server_renderer_exports.ssrRenderAttr)("alt", __props.product.title)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">`);
			else _push(`<div class="w-full h-full flex items-center justify-center text-5xl">📦</div>`);
			_push(`</div>`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UBadge, {
				class: "absolute top-2 left-2",
				color: "primary",
				variant: "solid"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)(__props.product.category)}`);
					else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(__props.product.category), 1)];
				}),
				_: 1
			}, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				class: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity",
				icon: (0, vue_exports.unref)(isFav) ? "i-lucide-heart" : "i-lucide-heart",
				color: (0, vue_exports.unref)(isFav) ? "error" : "neutral",
				variant: "solid",
				size: "xs",
				onClick: toggleFav
			}, null, _parent));
			_push(`</div><div class="p-3 md:p-4"><h3 class="font-semibold text-sm md:text-base text-gray-900 dark:text-white truncate mb-1">${(0, server_renderer_exports.ssrInterpolate)(__props.product.title)}</h3><p class="text-xs text-gray-500 mb-2 truncate">${(0, server_renderer_exports.ssrInterpolate)(__props.product.seller?.shop_name || __props.product.seller?.full_name)}</p><div class="flex items-center justify-between"><span class="text-lg md:text-xl font-black text-primary-600">₦${(0, server_renderer_exports.ssrInterpolate)(__props.product.price?.toLocaleString())}</span>`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				icon: "i-lucide-message-circle",
				color: "success",
				size: "xs",
				onClick: () => _ctx.window.open(`https://wa.me/${__props.product.seller?.phone}?text=Hi, I'm interested in ${__props.product.title}`, "_blank")
			}, null, _parent));
			_push(`</div></div></div>`);
		};
	}
});
//#endregion
//#region app/components/ProductCard.vue
var _sfc_setup = ProductCard_vue_vue_type_script_setup_true_lang_default.setup;
ProductCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProductCard_default = Object.assign(ProductCard_vue_vue_type_script_setup_true_lang_default, { __name: "ProductCard" });

export { ProductCard_default as P };
//# sourceMappingURL=ProductCard-DE7dQGQo.mjs.map
