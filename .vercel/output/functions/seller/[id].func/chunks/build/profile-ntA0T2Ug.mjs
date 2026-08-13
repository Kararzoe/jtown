import { aj as vue_exports, ag as useSupabaseUser, ah as useToast, R as server_renderer_exports, e as _sfc_main, j as _sfc_main$5 } from '../virtual/entry.mjs';
import { _ as _sfc_main$2 } from './FormField-ooD2R-NN.mjs';
import { _ as _sfc_main$3 } from './Input-COSn-l8y.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CEFOh9bN.mjs';
import { _ as _sfc_main$4 } from './Textarea-DqZ1vXrp.mjs';
import { _ as _sfc_main$1 } from './Card-io6hwcC-.mjs';
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

//#region app/pages/profile.vue?vue&type=script&setup=true&lang.ts
var profile_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "profile",
	__ssrInlineRender: true,
	setup(__props) {
		const user = useSupabaseUser();
		const supabase = useSupabaseClient();
		const toast = useToast();
		const loading = (0, vue_exports.ref)(false);
		const uploading = (0, vue_exports.ref)(false);
		const avatarFile = (0, vue_exports.ref)(null);
		const avatarPreview = (0, vue_exports.ref)("");
		const form = (0, vue_exports.reactive)({
			full_name: "",
			phone: "",
			address: "",
			bio: "",
			avatar_url: "",
			whatsapp: ""
		});
		const onFileChange = (e) => {
			const file = e.target.files?.[0];
			if (!file) return;
			avatarFile.value = file;
			avatarPreview.value = URL.createObjectURL(file);
		};
		const save = async () => {
			loading.value = true;
			try {
				if (avatarFile.value) {
					uploading.value = true;
					const ext = avatarFile.value.name.split(".").pop();
					const path = `avatars/${user.value?.id}.${ext}`;
					const { error: upErr } = await supabase.storage.from("products").upload(path, avatarFile.value, { upsert: true });
					if (upErr) throw upErr;
					const { data: { publicUrl } } = supabase.storage.from("products").getPublicUrl(path);
					form.avatar_url = publicUrl;
					uploading.value = false;
				}
				const { error } = await supabase.from("profiles").upsert({
					id: user.value?.id,
					...form,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				});
				if (error) throw error;
				toast.add({
					title: "Profile updated!",
					color: "success"
				});
			} catch (e) {
				toast.add({
					title: e.message,
					color: "error"
				});
			}
			loading.value = false;
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UButton = _sfc_main;
			const _component_UCard = _sfc_main$1;
			const _component_UIcon = _sfc_main$5;
			const _component_UFormField = _sfc_main$2;
			const _component_UInput = _sfc_main$3;
			const _component_UTextarea = _sfc_main$4;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" }, _attrs))}><div class="max-w-2xl mx-auto"><div class="flex items-center gap-3 mb-8">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/dashboard",
				icon: "i-lucide-arrow-left",
				variant: "ghost",
				color: "neutral"
			}, null, _parent));
			_push(`<h1 class="text-3xl font-black text-gray-900 dark:text-white">Edit Profile</h1></div>`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UCard, { class: "shadow-xl" }, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-col items-center mb-8"${_scopeId}><div class="relative"${_scopeId}><div class="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 ring-4 ring-primary-500/30"${_scopeId}>`);
						if ((0, vue_exports.unref)(avatarPreview)) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", (0, vue_exports.unref)(avatarPreview))} alt="Avatar" class="w-full h-full object-cover"${_scopeId}>`);
						else _push(`<div class="w-full h-full flex items-center justify-center text-4xl"${_scopeId}>👤</div>`);
						_push(`</div><label class="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors"${_scopeId}>`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
							name: "i-lucide-camera",
							class: "w-4 h-4 text-white"
						}, null, _parent, _scopeId));
						_push(`<input type="file" accept="image/*" class="hidden"${_scopeId}></label></div><p class="mt-3 text-lg font-black"${_scopeId}>${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(form).full_name || (0, vue_exports.unref)(user)?.email)}</p><p class="text-sm text-gray-500"${_scopeId}>${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(user)?.email)}</p></div><form class="space-y-4"${_scopeId}><div class="grid md:grid-cols-2 gap-4"${_scopeId}>`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Full Name" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).full_name,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).full_name = $event,
									placeholder: "Your full name",
									icon: "i-lucide-user",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).full_name,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).full_name = $event,
									placeholder: "Your full name",
									icon: "i-lucide-user",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Phone" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).phone,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).phone = $event,
									placeholder: "+234 900 000 0000",
									icon: "i-lucide-phone",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).phone,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).phone = $event,
									placeholder: "+234 900 000 0000",
									icon: "i-lucide-phone",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "WhatsApp Number" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).whatsapp,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).whatsapp = $event,
									placeholder: "+234 900 000 0000",
									icon: "i-lucide-message-circle",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).whatsapp,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).whatsapp = $event,
									placeholder: "+234 900 000 0000",
									icon: "i-lucide-message-circle",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Address" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).address,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).address = $event,
									placeholder: "Your address in Jos",
									icon: "i-lucide-map-pin",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).address,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).address = $event,
									placeholder: "Your address in Jos",
									icon: "i-lucide-map-pin",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Bio" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UTextarea, {
									modelValue: (0, vue_exports.unref)(form).bio,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).bio = $event,
									placeholder: "Tell buyers about yourself...",
									rows: 3,
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_UTextarea, {
									modelValue: (0, vue_exports.unref)(form).bio,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).bio = $event,
									placeholder: "Tell buyers about yourself...",
									rows: 3,
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<div class="pt-2"${_scopeId}>`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
							type: "submit",
							color: "primary",
							size: "lg",
							block: "",
							loading: (0, vue_exports.unref)(loading) || (0, vue_exports.unref)(uploading)
						}, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(uploading) ? "Uploading..." : "Save Changes")}`);
								else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(uploading) ? "Uploading..." : "Save Changes"), 1)];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div></form><div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"${_scopeId}><h3 class="font-bold mb-3 text-gray-700 dark:text-gray-300"${_scopeId}>Account</h3><div class="space-y-2 text-sm text-gray-600 dark:text-gray-400"${_scopeId}><div class="flex justify-between"${_scopeId}><span${_scopeId}>Email</span><span class="font-medium"${_scopeId}>${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(user)?.email)}</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>Member since</span><span class="font-medium"${_scopeId}>${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(user)?.created_at ? new Date((0, vue_exports.unref)(user).created_at).toLocaleDateString() : "-")}</span></div></div></div>`);
					} else return [
						(0, vue_exports.createVNode)("div", { class: "flex flex-col items-center mb-8" }, [
							(0, vue_exports.createVNode)("div", { class: "relative" }, [(0, vue_exports.createVNode)("div", { class: "w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 ring-4 ring-primary-500/30" }, [(0, vue_exports.unref)(avatarPreview) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("img", {
								key: 0,
								src: (0, vue_exports.unref)(avatarPreview),
								alt: "Avatar",
								class: "w-full h-full object-cover"
							}, null, 8, ["src"])) : ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", {
								key: 1,
								class: "w-full h-full flex items-center justify-center text-4xl"
							}, "👤"))]), (0, vue_exports.createVNode)("label", { class: "absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors" }, [(0, vue_exports.createVNode)(_component_UIcon, {
								name: "i-lucide-camera",
								class: "w-4 h-4 text-white"
							}), (0, vue_exports.createVNode)("input", {
								type: "file",
								accept: "image/*",
								class: "hidden",
								onChange: onFileChange
							}, null, 32)])]),
							(0, vue_exports.createVNode)("p", { class: "mt-3 text-lg font-black" }, (0, vue_exports.toDisplayString)((0, vue_exports.unref)(form).full_name || (0, vue_exports.unref)(user)?.email), 1),
							(0, vue_exports.createVNode)("p", { class: "text-sm text-gray-500" }, (0, vue_exports.toDisplayString)((0, vue_exports.unref)(user)?.email), 1)
						]),
						(0, vue_exports.createVNode)("form", {
							class: "space-y-4",
							onSubmit: (0, vue_exports.withModifiers)(save, ["prevent"])
						}, [
							(0, vue_exports.createVNode)("div", { class: "grid md:grid-cols-2 gap-4" }, [(0, vue_exports.createVNode)(_component_UFormField, { label: "Full Name" }, {
								default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).full_name,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).full_name = $event,
									placeholder: "Your full name",
									icon: "i-lucide-user",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}), (0, vue_exports.createVNode)(_component_UFormField, { label: "Phone" }, {
								default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).phone,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).phone = $event,
									placeholder: "+234 900 000 0000",
									icon: "i-lucide-phone",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							})]),
							(0, vue_exports.createVNode)(_component_UFormField, { label: "WhatsApp Number" }, {
								default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).whatsapp,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).whatsapp = $event,
									placeholder: "+234 900 000 0000",
									icon: "i-lucide-message-circle",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							(0, vue_exports.createVNode)(_component_UFormField, { label: "Address" }, {
								default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).address,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).address = $event,
									placeholder: "Your address in Jos",
									icon: "i-lucide-map-pin",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							(0, vue_exports.createVNode)(_component_UFormField, { label: "Bio" }, {
								default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UTextarea, {
									modelValue: (0, vue_exports.unref)(form).bio,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).bio = $event,
									placeholder: "Tell buyers about yourself...",
									rows: 3,
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
								_: 1
							}),
							(0, vue_exports.createVNode)("div", { class: "pt-2" }, [(0, vue_exports.createVNode)(_component_UButton, {
								type: "submit",
								color: "primary",
								size: "lg",
								block: "",
								loading: (0, vue_exports.unref)(loading) || (0, vue_exports.unref)(uploading)
							}, {
								default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(uploading) ? "Uploading..." : "Save Changes"), 1)]),
								_: 1
							}, 8, ["loading"])])
						], 32),
						(0, vue_exports.createVNode)("div", { class: "mt-6 pt-6 border-t border-gray-200 dark:border-gray-700" }, [(0, vue_exports.createVNode)("h3", { class: "font-bold mb-3 text-gray-700 dark:text-gray-300" }, "Account"), (0, vue_exports.createVNode)("div", { class: "space-y-2 text-sm text-gray-600 dark:text-gray-400" }, [(0, vue_exports.createVNode)("div", { class: "flex justify-between" }, [(0, vue_exports.createVNode)("span", null, "Email"), (0, vue_exports.createVNode)("span", { class: "font-medium" }, (0, vue_exports.toDisplayString)((0, vue_exports.unref)(user)?.email), 1)]), (0, vue_exports.createVNode)("div", { class: "flex justify-between" }, [(0, vue_exports.createVNode)("span", null, "Member since"), (0, vue_exports.createVNode)("span", { class: "font-medium" }, (0, vue_exports.toDisplayString)((0, vue_exports.unref)(user)?.created_at ? new Date((0, vue_exports.unref)(user).created_at).toLocaleDateString() : "-"), 1)])])])
					];
				}),
				_: 1
			}, _parent));
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/pages/profile.vue
var _sfc_setup = profile_vue_vue_type_script_setup_true_lang_default.setup;
profile_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var profile_default = profile_vue_vue_type_script_setup_true_lang_default;

export { profile_default as default };
//# sourceMappingURL=profile-ntA0T2Ug.mjs.map
