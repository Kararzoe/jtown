import { aj as vue_exports, ag as useSupabaseUser, ae as useRouter, ah as useToast, R as server_renderer_exports, e as _sfc_main$1, N as NuxtLink } from '../virtual/entry.mjs';
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

//#region app/pages/login.vue?vue&type=script&setup=true&lang.ts
var login_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "login",
	__ssrInlineRender: true,
	setup(__props) {
		const supabase = useSupabaseClient();
		const user = useSupabaseUser();
		const router = useRouter();
		const toast = useToast();
		const isLogin = (0, vue_exports.ref)(true);
		const loading = (0, vue_exports.ref)(false);
		const emailSent = (0, vue_exports.ref)(false);
		const form = (0, vue_exports.reactive)({
			email: "",
			password: "",
			name: "",
			phone: ""
		});
		(0, vue_exports.watchEffect)(() => {
			if (user.value) router.push("/dashboard");
		});
		const submit = async () => {
			loading.value = true;
			try {
				if (isLogin.value) {
					const { error } = await supabase.auth.signInWithPassword({
						email: form.email,
						password: form.password
					});
					if (error) throw error;
					toast.add({
						title: "Welcome back!",
						color: "success"
					});
					router.push("/dashboard");
				} else {
					const { error } = await supabase.auth.signUp({
						email: form.email,
						password: form.password,
						options: {
							data: {
								full_name: form.name,
								phone: form.phone
							},
							emailRedirectTo: `${(void 0).location.origin}/confirm`
						}
					});
					if (error) throw error;
					emailSent.value = true;
				}
			} catch (e) {
				toast.add({
					title: e.message,
					color: "error"
				});
			}
			loading.value = false;
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UCard = _sfc_main;
			const _component_UButton = _sfc_main$1;
			const _component_NuxtLink = NuxtLink;
			const _component_UFormField = _sfc_main$2;
			const _component_UInput = _sfc_main$3;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-16" }, _attrs))}><div class="w-full max-w-md">`);
			if ((0, vue_exports.unref)(emailSent)) {
				_push(`<div class="text-center">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UCard, { class: "shadow-xl p-8" }, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="text-6xl mb-4"${_scopeId}>📧</div><h2 class="text-2xl font-black mb-2"${_scopeId}>Check Your Email!</h2><p class="text-gray-600 dark:text-gray-400 mb-2"${_scopeId}>We sent a confirmation link to</p><p class="font-bold text-emerald-600 mb-6"${_scopeId}>${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(form).email)}</p><p class="text-sm text-gray-500 mb-6"${_scopeId}>Click the link in the email to verify your account, then come back to login.</p>`);
							_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
								block: "",
								color: "primary",
								onClick: ($event) => {
									emailSent.value = false;
									isLogin.value = true;
								}
							}, {
								default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
									if (_push) _push(`Back to Login`);
									else return [(0, vue_exports.createTextVNode)("Back to Login")];
								}),
								_: 1
							}, _parent, _scopeId));
						} else return [
							(0, vue_exports.createVNode)("div", { class: "text-6xl mb-4" }, "📧"),
							(0, vue_exports.createVNode)("h2", { class: "text-2xl font-black mb-2" }, "Check Your Email!"),
							(0, vue_exports.createVNode)("p", { class: "text-gray-600 dark:text-gray-400 mb-2" }, "We sent a confirmation link to"),
							(0, vue_exports.createVNode)("p", { class: "font-bold text-emerald-600 mb-6" }, (0, vue_exports.toDisplayString)((0, vue_exports.unref)(form).email), 1),
							(0, vue_exports.createVNode)("p", { class: "text-sm text-gray-500 mb-6" }, "Click the link in the email to verify your account, then come back to login."),
							(0, vue_exports.createVNode)(_component_UButton, {
								block: "",
								color: "primary",
								onClick: ($event) => {
									emailSent.value = false;
									isLogin.value = true;
								}
							}, {
								default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)("Back to Login")]),
								_: 1
							}, 8, ["onClick"])
						];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div><div class="text-center mb-8">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
					to: "/",
					class: "text-3xl font-black gradient-text"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`JosMKT`);
						else return [(0, vue_exports.createTextVNode)("JosMKT")];
					}),
					_: 1
				}, _parent));
				_push(`<h1 class="text-2xl font-black mt-2 text-gray-900 dark:text-white">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(isLogin) ? "Welcome Back" : "Create Account")}</h1><p class="text-gray-500 text-sm mt-1">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(isLogin) ? "Login to your account" : "Join Jos Marketplace today")}</p></div>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UCard, { class: "shadow-xl" }, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<form class="space-y-4"${_scopeId}>`);
							if (!(0, vue_exports.unref)(isLogin)) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Full Name" }, {
								default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
									if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
										modelValue: (0, vue_exports.unref)(form).name,
										"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).name = $event,
										placeholder: "Your full name",
										icon: "i-lucide-user",
										size: "lg",
										class: "w-full",
										required: ""
									}, null, _parent, _scopeId));
									else return [(0, vue_exports.createVNode)(_component_UInput, {
										modelValue: (0, vue_exports.unref)(form).name,
										"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).name = $event,
										placeholder: "Your full name",
										icon: "i-lucide-user",
										size: "lg",
										class: "w-full",
										required: ""
									}, null, 8, ["modelValue", "onUpdate:modelValue"])];
								}),
								_: 1
							}, _parent, _scopeId));
							else _push(`<!---->`);
							_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Email" }, {
								default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
									if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
										modelValue: (0, vue_exports.unref)(form).email,
										"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).email = $event,
										type: "email",
										placeholder: "your@email.com",
										icon: "i-lucide-mail",
										size: "lg",
										class: "w-full",
										required: ""
									}, null, _parent, _scopeId));
									else return [(0, vue_exports.createVNode)(_component_UInput, {
										modelValue: (0, vue_exports.unref)(form).email,
										"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).email = $event,
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
							if (!(0, vue_exports.unref)(isLogin)) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Phone" }, {
								default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
									if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
										modelValue: (0, vue_exports.unref)(form).phone,
										"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).phone = $event,
										placeholder: "+234 900 000 0000",
										icon: "i-lucide-phone",
										size: "lg",
										class: "w-full"
									}, null, _parent, _scopeId));
									else return [(0, vue_exports.createVNode)(_component_UInput, {
										modelValue: (0, vue_exports.unref)(form).phone,
										"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).phone = $event,
										placeholder: "+234 900 000 0000",
										icon: "i-lucide-phone",
										size: "lg",
										class: "w-full"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])];
								}),
								_: 1
							}, _parent, _scopeId));
							else _push(`<!---->`);
							_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Password" }, {
								default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
									if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
										modelValue: (0, vue_exports.unref)(form).password,
										"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).password = $event,
										type: "password",
										placeholder: "••••••••",
										icon: "i-lucide-lock",
										size: "lg",
										class: "w-full",
										required: "",
										minlength: "6"
									}, null, _parent, _scopeId));
									else return [(0, vue_exports.createVNode)(_component_UInput, {
										modelValue: (0, vue_exports.unref)(form).password,
										"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).password = $event,
										type: "password",
										placeholder: "••••••••",
										icon: "i-lucide-lock",
										size: "lg",
										class: "w-full",
										required: "",
										minlength: "6"
									}, null, 8, ["modelValue", "onUpdate:modelValue"])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
								type: "submit",
								color: "primary",
								size: "lg",
								block: "",
								loading: (0, vue_exports.unref)(loading),
								class: "bg-gradient-to-r from-emerald-500 to-teal-500"
							}, {
								default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(isLogin) ? "Login" : "Create Account")}`);
									else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(isLogin) ? "Login" : "Create Account"), 1)];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</form><div class="mt-4 text-center space-y-2"${_scopeId}><button class="text-emerald-600 hover:underline text-sm font-medium"${_scopeId}>${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(isLogin) ? "Don't have an account? Sign up" : "Already have an account? Login")}</button>`);
							if ((0, vue_exports.unref)(isLogin)) {
								_push(`<div${_scopeId}>`);
								_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
									to: "/forgot-password",
									class: "text-gray-400 hover:text-gray-600 text-xs block"
								}, {
									default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
										if (_push) _push(`Forgot password?`);
										else return [(0, vue_exports.createTextVNode)("Forgot password?")];
									}),
									_: 1
								}, _parent, _scopeId));
								_push(`</div>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						} else return [(0, vue_exports.createVNode)("form", {
							class: "space-y-4",
							onSubmit: (0, vue_exports.withModifiers)(submit, ["prevent"])
						}, [
							!(0, vue_exports.unref)(isLogin) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_component_UFormField, {
								key: 0,
								label: "Full Name"
							}, {
								default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).name,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).name = $event,
									placeholder: "Your full name",
									icon: "i-lucide-user",
									size: "lg",
									class: "w-full",
									required: ""
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})) : (0, vue_exports.createCommentVNode)("", true),
							(0, vue_exports.createVNode)(_component_UFormField, { label: "Email" }, {
								default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).email,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).email = $event,
									type: "email",
									placeholder: "your@email.com",
									icon: "i-lucide-mail",
									size: "lg",
									class: "w-full",
									required: ""
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							!(0, vue_exports.unref)(isLogin) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_component_UFormField, {
								key: 1,
								label: "Phone"
							}, {
								default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).phone,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).phone = $event,
									placeholder: "+234 900 000 0000",
									icon: "i-lucide-phone",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})) : (0, vue_exports.createCommentVNode)("", true),
							(0, vue_exports.createVNode)(_component_UFormField, { label: "Password" }, {
								default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).password,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).password = $event,
									type: "password",
									placeholder: "••••••••",
									icon: "i-lucide-lock",
									size: "lg",
									class: "w-full",
									required: "",
									minlength: "6"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							(0, vue_exports.createVNode)(_component_UButton, {
								type: "submit",
								color: "primary",
								size: "lg",
								block: "",
								loading: (0, vue_exports.unref)(loading),
								class: "bg-gradient-to-r from-emerald-500 to-teal-500"
							}, {
								default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(isLogin) ? "Login" : "Create Account"), 1)]),
								_: 1
							}, 8, ["loading"])
						], 32), (0, vue_exports.createVNode)("div", { class: "mt-4 text-center space-y-2" }, [(0, vue_exports.createVNode)("button", {
							class: "text-emerald-600 hover:underline text-sm font-medium",
							onClick: ($event) => isLogin.value = !(0, vue_exports.unref)(isLogin)
						}, (0, vue_exports.toDisplayString)((0, vue_exports.unref)(isLogin) ? "Don't have an account? Sign up" : "Already have an account? Login"), 9, ["onClick"]), (0, vue_exports.unref)(isLogin) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", { key: 0 }, [(0, vue_exports.createVNode)(_component_NuxtLink, {
							to: "/forgot-password",
							class: "text-gray-400 hover:text-gray-600 text-xs block"
						}, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)("Forgot password?")]),
							_: 1
						})])) : (0, vue_exports.createCommentVNode)("", true)])];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			}
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/pages/login.vue
var _sfc_setup = login_vue_vue_type_script_setup_true_lang_default.setup;
login_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var login_default = login_vue_vue_type_script_setup_true_lang_default;

export { login_default as default };
//# sourceMappingURL=login-Cm6dtFqK.mjs.map
