import { aj as vue_exports, R as server_renderer_exports, e as _sfc_main, j as _sfc_main$5 } from '../virtual/entry.mjs';
import { _ as _sfc_main$1 } from './Input-COSn-l8y.mjs';
import { _ as _sfc_main$2 } from './Textarea-DqZ1vXrp.mjs';
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

//#region app/pages/contact.vue?vue&type=script&setup=true&lang.ts
var contact_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "contact",
	__ssrInlineRender: true,
	setup(__props) {
		const form = (0, vue_exports.reactive)({
			name: "",
			email: "",
			message: ""
		});
		const sent = (0, vue_exports.ref)(false);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UButton = _sfc_main;
			const _component_UInput = _sfc_main$1;
			const _component_UTextarea = _sfc_main$2;
			const _component_UIcon = _sfc_main$5;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4" }, _attrs))}><div class="max-w-2xl mx-auto"><h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contact Us</h1><p class="text-gray-500 dark:text-gray-400 mb-8">Have a question? Send us a message.</p>`);
			if ((0, vue_exports.unref)(sent)) {
				_push(`<div class="text-center py-12"><div class="text-6xl mb-4">✅</div><h2 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Message Sent!</h2><p class="text-gray-500">We&#39;ll get back to you soon.</p>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					class: "mt-6",
					color: "primary",
					onClick: ($event) => sent.value = false
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Send Another`);
						else return [(0, vue_exports.createTextVNode)("Send Another")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<form class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm space-y-4">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
					modelValue: (0, vue_exports.unref)(form).name,
					"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).name = $event,
					required: "",
					placeholder: "Your name",
					size: "lg"
				}, null, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
					modelValue: (0, vue_exports.unref)(form).email,
					"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).email = $event,
					type: "email",
					required: "",
					placeholder: "Your email",
					size: "lg"
				}, null, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UTextarea, {
					modelValue: (0, vue_exports.unref)(form).message,
					"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).message = $event,
					required: "",
					placeholder: "Your message",
					rows: 5,
					size: "lg"
				}, null, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					type: "submit",
					color: "primary",
					size: "lg",
					block: "",
					icon: "i-lucide-send"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Send Message via WhatsApp`);
						else return [(0, vue_exports.createTextVNode)("Send Message via WhatsApp")];
					}),
					_: 1
				}, _parent));
				_push(`</form>`);
			}
			_push(`<div class="mt-8 grid md:grid-cols-2 gap-4"><div class="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
				name: "i-lucide-phone",
				class: "w-5 h-5 text-emerald-500"
			}, null, _parent));
			_push(`<span class="text-gray-700 dark:text-gray-300">+234 904 383 2380</span></div><div class="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
				name: "i-lucide-map-pin",
				class: "w-5 h-5 text-emerald-500"
			}, null, _parent));
			_push(`<span class="text-gray-700 dark:text-gray-300">Jos, Plateau State, Nigeria</span></div><div class="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
				name: "i-lucide-mail",
				class: "w-5 h-5 text-emerald-500"
			}, null, _parent));
			_push(`<span class="text-gray-700 dark:text-gray-300">support@josmkt.com.ng</span></div><a href="https://wa.me/2349043832380" target="_blank" class="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl shadow-sm hover:bg-green-100 dark:hover:bg-green-900/30 transition">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
				name: "i-lucide-message-circle",
				class: "w-5 h-5 text-green-500"
			}, null, _parent));
			_push(`<span class="text-green-700 dark:text-green-400 font-medium">Chat on WhatsApp</span></a></div></div></div>`);
		};
	}
});
//#endregion
//#region app/pages/contact.vue
var _sfc_setup = contact_vue_vue_type_script_setup_true_lang_default.setup;
contact_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var contact_default = contact_vue_vue_type_script_setup_true_lang_default;

export { contact_default as default };
//# sourceMappingURL=contact-BqlFdkJn.mjs.map
