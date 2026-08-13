import { aj as vue_exports, ae as useRouter, ah as useToast, R as server_renderer_exports, e as _sfc_main$1 } from '../virtual/entry.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CEFOh9bN.mjs';
import { _ as _sfc_main } from './Card-io6hwcC-.mjs';
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

//#region app/pages/confirm.vue?vue&type=script&setup=true&lang.ts
var confirm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "confirm",
	__ssrInlineRender: true,
	setup(__props) {
		useSupabaseClient();
		useRouter();
		useToast();
		const status = (0, vue_exports.ref)("loading");
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UCard = _sfc_main;
			const _component_UButton = _sfc_main$1;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen flex items-center justify-center px-4" }, _attrs))}>`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UCard, { class: "max-w-md w-full text-center p-8 shadow-xl" }, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) if ((0, vue_exports.unref)(status) === "loading") _push(`<div${_scopeId}><div class="text-5xl mb-4"${_scopeId}>⏳</div><h2 class="text-2xl font-black mb-2"${_scopeId}>Verifying your email...</h2><p class="text-gray-500"${_scopeId}>Please wait a moment</p><div class="mt-4 flex justify-center"${_scopeId}><div class="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"${_scopeId}></div></div></div>`);
					else if ((0, vue_exports.unref)(status) === "success") {
						_push(`<div${_scopeId}><div class="text-5xl mb-4"${_scopeId}>✅</div><h2 class="text-2xl font-black mb-2 text-emerald-600"${_scopeId}>Email Verified!</h2><p class="text-gray-500 mb-6"${_scopeId}>Your account is confirmed. Redirecting to dashboard...</p>`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
							to: "/dashboard",
							color: "primary",
							block: ""
						}, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Go to Dashboard`);
								else return [(0, vue_exports.createTextVNode)("Go to Dashboard")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else {
						_push(`<div${_scopeId}><div class="text-5xl mb-4"${_scopeId}>❌</div><h2 class="text-2xl font-black mb-2 text-red-500"${_scopeId}>Verification Failed</h2><p class="text-gray-500 mb-6"${_scopeId}>The link may have expired. Please try signing up again.</p>`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
							to: "/login",
							color: "primary",
							block: ""
						}, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Back to Login`);
								else return [(0, vue_exports.createTextVNode)("Back to Login")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					}
					else return [(0, vue_exports.unref)(status) === "loading" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", { key: 0 }, [
						(0, vue_exports.createVNode)("div", { class: "text-5xl mb-4" }, "⏳"),
						(0, vue_exports.createVNode)("h2", { class: "text-2xl font-black mb-2" }, "Verifying your email..."),
						(0, vue_exports.createVNode)("p", { class: "text-gray-500" }, "Please wait a moment"),
						(0, vue_exports.createVNode)("div", { class: "mt-4 flex justify-center" }, [(0, vue_exports.createVNode)("div", { class: "w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" })])
					])) : (0, vue_exports.unref)(status) === "success" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", { key: 1 }, [
						(0, vue_exports.createVNode)("div", { class: "text-5xl mb-4" }, "✅"),
						(0, vue_exports.createVNode)("h2", { class: "text-2xl font-black mb-2 text-emerald-600" }, "Email Verified!"),
						(0, vue_exports.createVNode)("p", { class: "text-gray-500 mb-6" }, "Your account is confirmed. Redirecting to dashboard..."),
						(0, vue_exports.createVNode)(_component_UButton, {
							to: "/dashboard",
							color: "primary",
							block: ""
						}, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)("Go to Dashboard")]),
							_: 1
						})
					])) : ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", { key: 2 }, [
						(0, vue_exports.createVNode)("div", { class: "text-5xl mb-4" }, "❌"),
						(0, vue_exports.createVNode)("h2", { class: "text-2xl font-black mb-2 text-red-500" }, "Verification Failed"),
						(0, vue_exports.createVNode)("p", { class: "text-gray-500 mb-6" }, "The link may have expired. Please try signing up again."),
						(0, vue_exports.createVNode)(_component_UButton, {
							to: "/login",
							color: "primary",
							block: ""
						}, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)("Back to Login")]),
							_: 1
						})
					]))];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/pages/confirm.vue
var _sfc_setup = confirm_vue_vue_type_script_setup_true_lang_default.setup;
confirm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/confirm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var confirm_default = confirm_vue_vue_type_script_setup_true_lang_default;

export { confirm_default as default };
//# sourceMappingURL=confirm-BNcyEaw5.mjs.map
