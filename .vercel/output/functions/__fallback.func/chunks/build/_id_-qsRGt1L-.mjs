import { aj as vue_exports, ad as useRoute$1, R as server_renderer_exports, e as _sfc_main, j as _sfc_main$5 } from '../virtual/entry.mjs';
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

//#region app/pages/provider/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "[id]",
	__ssrInlineRender: true,
	setup(__props) {
		useRoute$1();
		const provider = (0, vue_exports.ref)(null);
		const loading = (0, vue_exports.ref)(true);
		const selectedImage = (0, vue_exports.ref)(null);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UButton = _sfc_main;
			const _component_UIcon = _sfc_main$5;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900" }, _attrs))}>`);
			if ((0, vue_exports.unref)(loading)) _push(`<div class="flex items-center justify-center min-h-screen"><div class="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div></div>`);
			else if (!(0, vue_exports.unref)(provider)) {
				_push(`<div class="flex items-center justify-center min-h-screen"><div class="text-center"><div class="text-6xl mb-4">😕</div><p class="text-gray-500 text-lg">Provider not found</p>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					to: "/services",
					class: "mt-4",
					color: "primary"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Browse Services`);
						else return [(0, vue_exports.createTextVNode)("Browse Services")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div>`);
			} else {
				_push(`<div><div class="relative h-48 md:h-64 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500"><div class="absolute inset-0 bg-black/20"></div><div class="max-w-5xl mx-auto px-4 h-full flex items-start pt-4 relative z-10"><button class="flex items-center gap-2 text-white/80 hover:text-white transition">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: "i-lucide-arrow-left",
					class: "w-5 h-5"
				}, null, _parent));
				_push(` Back </button></div></div><div class="max-w-5xl mx-auto px-4 -mt-16 relative z-10 pb-10"><div class="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl mb-6"><div class="flex flex-col md:flex-row gap-6"><div class="flex-shrink-0">`);
				if ((0, vue_exports.unref)(provider).image) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", (0, vue_exports.unref)(provider).image)}${(0, server_renderer_exports.ssrRenderAttr)("alt", (0, vue_exports.unref)(provider).serviceName)} class="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-white shadow-lg">`);
				else _push(`<div class="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 flex items-center justify-center text-emerald-600 font-bold text-4xl border-4 border-white shadow-lg">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(provider).serviceName?.charAt(0))}</div>`);
				_push(`</div><div class="flex-1"><div class="flex items-center gap-3 mb-2"><h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(provider).serviceName)}</h1>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: "i-lucide-check-circle",
					class: "w-6 h-6 text-emerald-500"
				}, null, _parent));
				_push(`</div><p class="text-gray-500 capitalize mb-4">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(provider).category?.replace(/-/g, " "))}</p><div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6"><div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: "i-lucide-map-pin",
					class: "w-5 h-5 text-emerald-500"
				}, null, _parent));
				_push(`<span>${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(provider).location)}</span></div>`);
				if ((0, vue_exports.unref)(provider).experience) {
					_push(`<div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
						name: "i-lucide-clock",
						class: "w-5 h-5 text-emerald-500"
					}, null, _parent));
					_push(`<span>${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(provider).experience)} experience</span></div>`);
				} else _push(`<!---->`);
				if ((0, vue_exports.unref)(provider).priceRange) _push(`<div class="flex items-center gap-2 text-gray-600 dark:text-gray-400"><span class="text-emerald-500 font-bold">₦</span><span>${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(provider).priceRange)}</span></div>`);
				else _push(`<!---->`);
				if ((0, vue_exports.unref)(provider).rating > 0) {
					_push(`<div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
						name: "i-lucide-star",
						class: "w-5 h-5 text-yellow-400"
					}, null, _parent));
					_push(`<span>${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(provider).rating)} (${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(provider).totalReviews)} reviews)</span></div>`);
				} else _push(`<!---->`);
				_push(`</div><div class="flex gap-3"><a${(0, server_renderer_exports.ssrRenderAttr)("href", `tel:${(0, vue_exports.unref)(provider).phone}`)} class="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: "i-lucide-phone",
					class: "w-5 h-5"
				}, null, _parent));
				_push(` Call Now </a><a${(0, server_renderer_exports.ssrRenderAttr)("href", `https://wa.me/${(0, vue_exports.unref)(provider).phone?.replace(/[^0-9]/g, "")}?text=Hi, I found you on JosMKT. I need your ${(0, vue_exports.unref)(provider).serviceName} service.`)} target="_blank" class="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: "i-lucide-message-circle",
					class: "w-5 h-5"
				}, null, _parent));
				_push(` WhatsApp </a></div></div></div></div><div class="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm mb-6"><h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">About</h2><p class="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(provider).description)}</p></div>`);
				if ((0, vue_exports.unref)(provider).gallery?.length) {
					_push(`<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm mb-6"><h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
						name: "i-lucide-image",
						class: "w-5 h-5"
					}, null, _parent));
					_push(` Gallery </h2><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"><!--[-->`);
					(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(provider).gallery, (img, idx) => {
						_push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", img)}${(0, server_renderer_exports.ssrRenderAttr)("alt", `Work ${idx + 1}`)} class="w-full h-40 object-cover rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-300 transition cursor-pointer hover:scale-105">`);
					});
					_push(`<!--]--></div></div>`);
				} else _push(`<!---->`);
				_push(`<div class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 md:p-8 shadow-sm text-white"><h2 class="text-xl font-bold mb-2">Need this service?</h2><p class="text-emerald-100 mb-4">Contact ${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(provider).serviceName)} directly and get started today.</p><div class="flex flex-wrap gap-3"><a${(0, server_renderer_exports.ssrRenderAttr)("href", `tel:${(0, vue_exports.unref)(provider).phone}`)} class="px-5 py-2.5 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition flex items-center gap-2">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: "i-lucide-phone",
					class: "w-4 h-4"
				}, null, _parent));
				_push(` ${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(provider).phone)}</a><a${(0, server_renderer_exports.ssrRenderAttr)("href", `https://wa.me/${(0, vue_exports.unref)(provider).phone?.replace(/[^0-9]/g, "")}?text=Hi, I need your service.`)} target="_blank" class="px-5 py-2.5 bg-white/20 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition flex items-center gap-2">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: "i-lucide-message-circle",
					class: "w-4 h-4"
				}, null, _parent));
				_push(` WhatsApp </a></div></div></div></div>`);
			}
			if ((0, vue_exports.unref)(selectedImage)) _push(`<div class="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"><img${(0, server_renderer_exports.ssrRenderAttr)("src", (0, vue_exports.unref)(selectedImage))} alt="Gallery" class="max-w-full max-h-[90vh] rounded-xl"></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/provider/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/provider/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-qsRGt1L-.mjs.map
