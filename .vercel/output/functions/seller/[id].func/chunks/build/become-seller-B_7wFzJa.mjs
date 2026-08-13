import { aj as vue_exports, ah as useToast, R as server_renderer_exports, j as _sfc_main$5, e as _sfc_main } from '../virtual/entry.mjs';
import { _ as _sfc_main$3 } from './Select-PQNYhlOg.mjs';
import { _ as _sfc_main$1 } from './FormField-ooD2R-NN.mjs';
import { _ as _sfc_main$2 } from './Input-COSn-l8y.mjs';
import { _ as _sfc_main$4 } from './Textarea-DqZ1vXrp.mjs';
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

//#region app/pages/become-seller.vue?vue&type=script&setup=true&lang.ts
var CLOUDINARY = "https://api.cloudinary.com/v1_1/dfye3j2bs/image/upload";
var become_seller_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "become-seller",
	__ssrInlineRender: true,
	setup(__props) {
		useToast();
		const submitted = (0, vue_exports.ref)(false);
		const loading = (0, vue_exports.ref)(false);
		const uploading = (0, vue_exports.ref)(false);
		const form = (0, vue_exports.reactive)({
			serviceName: "",
			category: "",
			description: "",
			phone: "",
			location: "",
			experience: "",
			priceRange: "",
			image: "",
			gallery: []
		});
		const categories = [
			"plumbing",
			"electrical",
			"ac",
			"furniture",
			"catering",
			"painting",
			"mechanic",
			"barbing",
			"carpentry",
			"fashion-design",
			"shoemaking",
			"photography",
			"tech",
			"logistics",
			"laundry",
			"education",
			"perfumery",
			"makeup",
			"event-planning",
			"rentals",
			"mason",
			"phone-accessories",
			"legal",
			"housing-agent",
			"e-wallet"
		];
		const locations = [
			"Bukuru",
			"Rayfield",
			"Terminus",
			"Sukuwa",
			"Lamingo",
			"Hwolshe",
			"Tudun Wada",
			"Nassarawa",
			"Old Airport",
			"Polo",
			"British",
			"Other"
		];
		const uploadImage = async (file) => {
			const fd = new FormData();
			fd.append("file", file);
			fd.append("upload_preset", "jos_marketplace");
			fd.append("cloud_name", "dfye3j2bs");
			return (await (await fetch(CLOUDINARY, {
				method: "POST",
				body: fd
			})).json()).secure_url || "";
		};
		const onLogoChange = async (e) => {
			const file = e.target.files?.[0];
			if (!file) return;
			uploading.value = true;
			form.image = await uploadImage(file);
			uploading.value = false;
		};
		const onGalleryChange = async (e) => {
			const files = e.target.files;
			if (!files) return;
			uploading.value = true;
			for (let i = 0; i < files.length; i++) {
				const url = await uploadImage(files[i]);
				if (url) form.gallery.push(url);
			}
			uploading.value = false;
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UIcon = _sfc_main$5;
			const _component_UButton = _sfc_main;
			const _component_UFormField = _sfc_main$1;
			const _component_UInput = _sfc_main$2;
			const _component_USelect = _sfc_main$3;
			const _component_UTextarea = _sfc_main$4;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800 py-10 px-4" }, _attrs))}><div class="max-w-2xl mx-auto">`);
			if ((0, vue_exports.unref)(submitted)) {
				_push(`<div class="flex items-center justify-center min-h-[60vh]"><div class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: "i-lucide-check-circle",
					class: "w-16 h-16 text-emerald-500 mx-auto mb-4"
				}, null, _parent));
				_push(`<h2 class="text-2xl font-bold mb-2">Application Submitted!</h2><p class="text-gray-600 dark:text-gray-400 mb-6"> Your business registration is under review. We&#39;ll contact you once approved and your profile will be live on JosMKT. </p>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					to: "/",
					color: "primary",
					size: "lg"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Back to Home`);
						else return [(0, vue_exports.createTextVNode)("Back to Home")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div>`);
			} else {
				_push(`<div><div class="text-center mb-8"><div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: "i-lucide-store",
					class: "w-4 h-4"
				}, null, _parent));
				_push(` Register Your Business </div><h1 class="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">Get Started on JosMKT</h1><p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">List your service or business and get discovered by thousands of customers in Jos</p></div><form class="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg space-y-5">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Business / Service Name *" }, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
							modelValue: (0, vue_exports.unref)(form).serviceName,
							"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).serviceName = $event,
							placeholder: "e.g. Bright Plumbing Services",
							required: "",
							class: "w-full"
						}, null, _parent, _scopeId));
						else return [(0, vue_exports.createVNode)(_component_UInput, {
							modelValue: (0, vue_exports.unref)(form).serviceName,
							"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).serviceName = $event,
							placeholder: "e.g. Bright Plumbing Services",
							required: "",
							class: "w-full"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])];
					}),
					_: 1
				}, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Category *" }, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_USelect, {
							modelValue: (0, vue_exports.unref)(form).category,
							"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).category = $event,
							items: categories.map((c) => ({
								label: c.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
								value: c
							})),
							placeholder: "Select your category",
							required: "",
							class: "w-full"
						}, null, _parent, _scopeId));
						else return [(0, vue_exports.createVNode)(_component_USelect, {
							modelValue: (0, vue_exports.unref)(form).category,
							"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).category = $event,
							items: categories.map((c) => ({
								label: c.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
								value: c
							})),
							placeholder: "Select your category",
							required: "",
							class: "w-full"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"items"
						])];
					}),
					_: 1
				}, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Describe your business *" }, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UTextarea, {
							modelValue: (0, vue_exports.unref)(form).description,
							"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).description = $event,
							placeholder: "Tell customers what you do, what makes you special...",
							rows: 4,
							required: "",
							class: "w-full"
						}, null, _parent, _scopeId));
						else return [(0, vue_exports.createVNode)(_component_UTextarea, {
							modelValue: (0, vue_exports.unref)(form).description,
							"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).description = $event,
							placeholder: "Tell customers what you do, what makes you special...",
							rows: 4,
							required: "",
							class: "w-full"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])];
					}),
					_: 1
				}, _parent));
				_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Phone / WhatsApp *" }, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
							modelValue: (0, vue_exports.unref)(form).phone,
							"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).phone = $event,
							type: "tel",
							placeholder: "e.g. 08012345678",
							required: "",
							class: "w-full"
						}, null, _parent, _scopeId));
						else return [(0, vue_exports.createVNode)(_component_UInput, {
							modelValue: (0, vue_exports.unref)(form).phone,
							"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).phone = $event,
							type: "tel",
							placeholder: "e.g. 08012345678",
							required: "",
							class: "w-full"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])];
					}),
					_: 1
				}, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Location *" }, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_USelect, {
							modelValue: (0, vue_exports.unref)(form).location,
							"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).location = $event,
							items: locations,
							placeholder: "Select location",
							required: "",
							class: "w-full"
						}, null, _parent, _scopeId));
						else return [(0, vue_exports.createVNode)(_component_USelect, {
							modelValue: (0, vue_exports.unref)(form).location,
							"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).location = $event,
							items: locations,
							placeholder: "Select location",
							required: "",
							class: "w-full"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])];
					}),
					_: 1
				}, _parent));
				_push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Experience" }, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
							modelValue: (0, vue_exports.unref)(form).experience,
							"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).experience = $event,
							placeholder: "e.g. 3 years",
							class: "w-full"
						}, null, _parent, _scopeId));
						else return [(0, vue_exports.createVNode)(_component_UInput, {
							modelValue: (0, vue_exports.unref)(form).experience,
							"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).experience = $event,
							placeholder: "e.g. 3 years",
							class: "w-full"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])];
					}),
					_: 1
				}, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Price Range" }, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
							modelValue: (0, vue_exports.unref)(form).priceRange,
							"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).priceRange = $event,
							placeholder: "e.g. ₦5,000 - ₦50,000",
							class: "w-full"
						}, null, _parent, _scopeId));
						else return [(0, vue_exports.createVNode)(_component_UInput, {
							modelValue: (0, vue_exports.unref)(form).priceRange,
							"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).priceRange = $event,
							placeholder: "e.g. ₦5,000 - ₦50,000",
							class: "w-full"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Business Logo / Photo" }, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<input type="file" accept="image/*" class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 text-sm"${_scopeId}>`);
							if ((0, vue_exports.unref)(uploading)) _push(`<p class="text-sm text-emerald-500 mt-1"${_scopeId}>Uploading...</p>`);
							else _push(`<!---->`);
							if ((0, vue_exports.unref)(form).image) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", (0, vue_exports.unref)(form).image)} alt="Preview" class="mt-2 w-24 h-24 object-cover rounded-xl"${_scopeId}>`);
							else _push(`<!---->`);
						} else return [
							(0, vue_exports.createVNode)("input", {
								type: "file",
								accept: "image/*",
								class: "w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 text-sm",
								onChange: onLogoChange
							}, null, 32),
							(0, vue_exports.unref)(uploading) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("p", {
								key: 0,
								class: "text-sm text-emerald-500 mt-1"
							}, "Uploading...")) : (0, vue_exports.createCommentVNode)("", true),
							(0, vue_exports.unref)(form).image ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("img", {
								key: 1,
								src: (0, vue_exports.unref)(form).image,
								alt: "Preview",
								class: "mt-2 w-24 h-24 object-cover rounded-xl"
							}, null, 8, ["src"])) : (0, vue_exports.createCommentVNode)("", true)
						];
					}),
					_: 1
				}, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Work Samples / Gallery (optional)" }, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<input type="file" accept="image/*" multiple class="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 text-sm"${_scopeId}>`);
							if ((0, vue_exports.unref)(form).gallery.length) {
								_push(`<div class="flex gap-2 mt-2 flex-wrap"${_scopeId}><!--[-->`);
								(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(form).gallery, (url, i) => {
									_push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", url)} class="w-20 h-20 object-cover rounded-lg"${_scopeId}>`);
								});
								_push(`<!--]--></div>`);
							} else _push(`<!---->`);
						} else return [(0, vue_exports.createVNode)("input", {
							type: "file",
							accept: "image/*",
							multiple: "",
							class: "w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 text-sm",
							onChange: onGalleryChange
						}, null, 32), (0, vue_exports.unref)(form).gallery.length ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", {
							key: 0,
							class: "flex gap-2 mt-2 flex-wrap"
						}, [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)((0, vue_exports.unref)(form).gallery, (url, i) => {
							return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("img", {
								key: i,
								src: url,
								class: "w-20 h-20 object-cover rounded-lg"
							}, null, 8, ["src"]);
						}), 128))])) : (0, vue_exports.createCommentVNode)("", true)];
					}),
					_: 1
				}, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					type: "submit",
					size: "xl",
					block: "",
					loading: (0, vue_exports.unref)(loading) || (0, vue_exports.unref)(uploading),
					class: "bg-gradient-to-r from-emerald-500 to-teal-500 font-bold text-lg"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
								name: "i-lucide-send",
								class: "w-5 h-5 mr-2"
							}, null, _parent, _scopeId));
							_push(` ${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(loading) ? "Submitting..." : "Submit Application")}`);
						} else return [(0, vue_exports.createVNode)(_component_UIcon, {
							name: "i-lucide-send",
							class: "w-5 h-5 mr-2"
						}), (0, vue_exports.createTextVNode)(" " + (0, vue_exports.toDisplayString)((0, vue_exports.unref)(loading) ? "Submitting..." : "Submit Application"), 1)];
					}),
					_: 1
				}, _parent));
				_push(`<p class="text-center text-xs text-gray-400">Your application will be reviewed within 24 hours. Once approved, your business will be visible to thousands.</p></form></div>`);
			}
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/pages/become-seller.vue
var _sfc_setup = become_seller_vue_vue_type_script_setup_true_lang_default.setup;
become_seller_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/become-seller.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var become_seller_default = become_seller_vue_vue_type_script_setup_true_lang_default;

export { become_seller_default as default };
//# sourceMappingURL=become-seller-B_7wFzJa.mjs.map
