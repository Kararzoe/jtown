import { aj as vue_exports, ae as useRouter, ah as useToast, R as server_renderer_exports, e as _sfc_main$3 } from '../virtual/entry.mjs';
import { _ as _sfc_main$1 } from './FormField-ooD2R-NN.mjs';
import { _ as _sfc_main$2 } from './Input-COSn-l8y.mjs';
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

//#region app/pages/reset-password.vue?vue&type=script&setup=true&lang.ts
var reset_password_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "reset-password",
	__ssrInlineRender: true,
	setup(__props) {
		const supabase = useSupabaseClient();
		const router = useRouter();
		const toast = useToast();
		const password = (0, vue_exports.ref)("");
		const confirm = (0, vue_exports.ref)("");
		const loading = (0, vue_exports.ref)(false);
		const submit = async () => {
			if (password.value !== confirm.value) {
				toast.add({
					title: "Passwords do not match",
					color: "error"
				});
				return;
			}
			loading.value = true;
			const { error } = await supabase.auth.updateUser({ password: password.value });
			if (error) toast.add({
				title: error.message,
				color: "error"
			});
			else {
				toast.add({
					title: "Password updated successfully!",
					color: "success"
				});
				router.push("/dashboard");
			}
			loading.value = false;
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UCard = _sfc_main;
			const _component_UFormField = _sfc_main$1;
			const _component_UInput = _sfc_main$2;
			const _component_UButton = _sfc_main$3;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen flex items-center justify-center px-4" }, _attrs))}><div class="w-full max-w-md">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UCard, { class: "shadow-xl p-2" }, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="text-center mb-6"${_scopeId}><h1 class="text-2xl font-black text-gray-900 dark:text-white"${_scopeId}>Reset Password</h1><p class="text-gray-500 text-sm mt-1"${_scopeId}>Enter your new password</p></div><form class="space-y-4"${_scopeId}>`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "New Password" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(password),
									"onUpdate:modelValue": ($event) => (0, vue_exports.isRef)(password) ? password.value = $event : null,
									type: "password",
									placeholder: "Min 6 characters",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full",
									required: "",
									minlength: "6"
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(password),
									"onUpdate:modelValue": ($event) => (0, vue_exports.isRef)(password) ? password.value = $event : null,
									type: "password",
									placeholder: "Min 6 characters",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full",
									required: "",
									minlength: "6"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Confirm Password" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(confirm),
									"onUpdate:modelValue": ($event) => (0, vue_exports.isRef)(confirm) ? confirm.value = $event : null,
									type: "password",
									placeholder: "Repeat password",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full",
									required: ""
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(confirm),
									"onUpdate:modelValue": ($event) => (0, vue_exports.isRef)(confirm) ? confirm.value = $event : null,
									type: "password",
									placeholder: "Repeat password",
									icon: "i-lucide-lock",
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
								if (_push) _push(`Update Password`);
								else return [(0, vue_exports.createTextVNode)("Update Password")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</form>`);
					} else return [(0, vue_exports.createVNode)("div", { class: "text-center mb-6" }, [(0, vue_exports.createVNode)("h1", { class: "text-2xl font-black text-gray-900 dark:text-white" }, "Reset Password"), (0, vue_exports.createVNode)("p", { class: "text-gray-500 text-sm mt-1" }, "Enter your new password")]), (0, vue_exports.createVNode)("form", {
						class: "space-y-4",
						onSubmit: (0, vue_exports.withModifiers)(submit, ["prevent"])
					}, [
						(0, vue_exports.createVNode)(_component_UFormField, { label: "New Password" }, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UInput, {
								modelValue: (0, vue_exports.unref)(password),
								"onUpdate:modelValue": ($event) => (0, vue_exports.isRef)(password) ? password.value = $event : null,
								type: "password",
								placeholder: "Min 6 characters",
								icon: "i-lucide-lock",
								size: "lg",
								class: "w-full",
								required: "",
								minlength: "6"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						(0, vue_exports.createVNode)(_component_UFormField, { label: "Confirm Password" }, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UInput, {
								modelValue: (0, vue_exports.unref)(confirm),
								"onUpdate:modelValue": ($event) => (0, vue_exports.isRef)(confirm) ? confirm.value = $event : null,
								type: "password",
								placeholder: "Repeat password",
								icon: "i-lucide-lock",
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
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)("Update Password")]),
							_: 1
						}, 8, ["loading"])
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/pages/reset-password.vue
var _sfc_setup = reset_password_vue_vue_type_script_setup_true_lang_default.setup;
reset_password_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reset-password.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var reset_password_default = reset_password_vue_vue_type_script_setup_true_lang_default;

export { reset_password_default as default };
//# sourceMappingURL=reset-password-DpND6n0A.mjs.map
