import { aj as vue_exports, ah as useToast, R as server_renderer_exports, e as _sfc_main$1, N as NuxtLink } from '../virtual/entry.mjs';
import { _ as _sfc_main$2 } from './FormField-ooD2R-NN.mjs';
import { _ as _sfc_main$3 } from './Input-COSn-l8y.mjs';
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

//#region app/pages/forgot-password.vue?vue&type=script&setup=true&lang.ts
var forgot_password_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "forgot-password",
	__ssrInlineRender: true,
	setup(__props) {
		const supabase = useSupabaseClient();
		const toast = useToast();
		const email = (0, vue_exports.ref)("");
		const loading = (0, vue_exports.ref)(false);
		const sent = (0, vue_exports.ref)(false);
		const submit = async () => {
			loading.value = true;
			const { error } = await supabase.auth.resetPasswordForEmail(email.value, { redirectTo: `${(void 0).location.origin}/reset-password` });
			if (error) toast.add({
				title: error.message,
				color: "error"
			});
			else sent.value = true;
			loading.value = false;
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UCard = _sfc_main;
			const _component_UButton = _sfc_main$1;
			const _component_UFormField = _sfc_main$2;
			const _component_UInput = _sfc_main$3;
			const _component_NuxtLink = NuxtLink;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen flex items-center justify-center px-4" }, _attrs))}><div class="w-full max-w-md">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UCard, { class: "shadow-xl p-2" }, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) if ((0, vue_exports.unref)(sent)) {
						_push(`<div class="text-center py-4"${_scopeId}><div class="text-5xl mb-4"${_scopeId}>📧</div><h2 class="text-2xl font-black mb-2"${_scopeId}>Check Your Email</h2><p class="text-gray-500 mb-6"${_scopeId}>We sent a password reset link to <strong${_scopeId}>${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(email))}</strong></p>`);
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
					} else {
						_push(`<div${_scopeId}><div class="text-center mb-6"${_scopeId}><h1 class="text-2xl font-black text-gray-900 dark:text-white"${_scopeId}>Forgot Password</h1><p class="text-gray-500 text-sm mt-1"${_scopeId}>Enter your email to reset your password</p></div><form class="space-y-4"${_scopeId}>`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Email" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(email),
									"onUpdate:modelValue": ($event) => (0, vue_exports.isRef)(email) ? email.value = $event : null,
									type: "email",
									placeholder: "your@email.com",
									icon: "i-lucide-mail",
									size: "lg",
									class: "w-full",
									required: ""
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(email),
									"onUpdate:modelValue": ($event) => (0, vue_exports.isRef)(email) ? email.value = $event : null,
									type: "email",
									placeholder: "your@email.com",
									icon: "i-lucide-mail",
									size: "lg",
									class: "w-full",
									required: ""
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
							type: "submit",
							color: "primary",
							size: "lg",
							block: "",
							loading: (0, vue_exports.unref)(loading)
						}, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Send Reset Link`);
								else return [(0, vue_exports.createTextVNode)("Send Reset Link")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<div class="text-center"${_scopeId}>`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
							to: "/login",
							class: "text-sm text-emerald-600 hover:underline"
						}, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Back to Login`);
								else return [(0, vue_exports.createTextVNode)("Back to Login")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></form></div>`);
					}
					else return [(0, vue_exports.unref)(sent) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", {
						key: 0,
						class: "text-center py-4"
					}, [
						(0, vue_exports.createVNode)("div", { class: "text-5xl mb-4" }, "📧"),
						(0, vue_exports.createVNode)("h2", { class: "text-2xl font-black mb-2" }, "Check Your Email"),
						(0, vue_exports.createVNode)("p", { class: "text-gray-500 mb-6" }, [(0, vue_exports.createTextVNode)("We sent a password reset link to "), (0, vue_exports.createVNode)("strong", null, (0, vue_exports.toDisplayString)((0, vue_exports.unref)(email)), 1)]),
						(0, vue_exports.createVNode)(_component_UButton, {
							to: "/login",
							color: "primary",
							block: ""
						}, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)("Back to Login")]),
							_: 1
						})
					])) : ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", { key: 1 }, [(0, vue_exports.createVNode)("div", { class: "text-center mb-6" }, [(0, vue_exports.createVNode)("h1", { class: "text-2xl font-black text-gray-900 dark:text-white" }, "Forgot Password"), (0, vue_exports.createVNode)("p", { class: "text-gray-500 text-sm mt-1" }, "Enter your email to reset your password")]), (0, vue_exports.createVNode)("form", {
						class: "space-y-4",
						onSubmit: (0, vue_exports.withModifiers)(submit, ["prevent"])
					}, [
						(0, vue_exports.createVNode)(_component_UFormField, { label: "Email" }, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UInput, {
								modelValue: (0, vue_exports.unref)(email),
								"onUpdate:modelValue": ($event) => (0, vue_exports.isRef)(email) ? email.value = $event : null,
								type: "email",
								placeholder: "your@email.com",
								icon: "i-lucide-mail",
								size: "lg",
								class: "w-full",
								required: ""
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						(0, vue_exports.createVNode)(_component_UButton, {
							type: "submit",
							color: "primary",
							size: "lg",
							block: "",
							loading: (0, vue_exports.unref)(loading)
						}, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)("Send Reset Link")]),
							_: 1
						}, 8, ["loading"]),
						(0, vue_exports.createVNode)("div", { class: "text-center" }, [(0, vue_exports.createVNode)(_component_NuxtLink, {
							to: "/login",
							class: "text-sm text-emerald-600 hover:underline"
						}, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)("Back to Login")]),
							_: 1
						})])
					], 32)]))];
				}),
				_: 1
			}, _parent));
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/pages/forgot-password.vue
var _sfc_setup = forgot_password_vue_vue_type_script_setup_true_lang_default.setup;
forgot_password_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forgot-password.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var forgot_password_default = forgot_password_vue_vue_type_script_setup_true_lang_default;

export { forgot_password_default as default };
//# sourceMappingURL=forgot-password-CkpmKx-Y.mjs.map
