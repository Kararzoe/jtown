import { aj as vue_exports, ag as useSupabaseUser, ah as useToast, ae as useRouter, R as server_renderer_exports, e as _sfc_main$1, j as _sfc_main$5 } from '../virtual/entry.mjs';
import { _ as _sfc_main$6 } from './Select-PQNYhlOg.mjs';
import { _ as _sfc_main$2 } from './FormField-ooD2R-NN.mjs';
import { _ as _sfc_main$3 } from './Input-COSn-l8y.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CEFOh9bN.mjs';
import { _ as _sfc_main$4 } from './Textarea-DqZ1vXrp.mjs';
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
import './PopperArrow-CQIWINqG.mjs';

//#region app/pages/upload-product.vue?vue&type=script&setup=true&lang.ts
var upload_product_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "upload-product",
	__ssrInlineRender: true,
	setup(__props) {
		const user = useSupabaseUser();
		const supabase = useSupabaseClient();
		const toast = useToast();
		const router = useRouter();
		const loading = (0, vue_exports.ref)(false);
		const previews = (0, vue_exports.ref)([]);
		const files = (0, vue_exports.ref)([]);
		const form = (0, vue_exports.reactive)({
			title: "",
			description: "",
			price: "",
			category: "Electronics",
			condition: "new",
			location: "Bukuru",
			stock: "1",
			tags: ""
		});
		const categories = [
			"Electronics",
			"Fashion",
			"Food",
			"Home",
			"Sports",
			"Automotive",
			"Books",
			"Services"
		];
		const locations = [
			"Bukuru",
			"Rayfield",
			"Terminus",
			"Lamingo",
			"Angwan Rogo",
			"Tudun Wada",
			"Zaria Road"
		];
		const handleImages = (e) => {
			const input = e.target;
			const selected = Array.from(input.files || []);
			if (files.value.length + selected.length > 8) return toast.add({
				title: "Max 8 images",
				color: "error"
			});
			files.value = [...files.value, ...selected];
			selected.forEach((f) => {
				const reader = new FileReader();
				reader.onloadend = () => previews.value.push(reader.result);
				reader.readAsDataURL(f);
			});
		};
		const removeImage = (i) => {
			files.value.splice(i, 1);
			previews.value.splice(i, 1);
		};
		const submit = async () => {
			if (!form.title || !form.price) return toast.add({
				title: "Fill all required fields",
				color: "error"
			});
			loading.value = true;
			try {
				const imageUrls = [];
				for (const file of files.value) {
					const ext = file.name.split(".").pop();
					const path = `products/${user.value?.id}/${Date.now()}.${ext}`;
					const { error } = await supabase.storage.from("images").upload(path, file);
					if (!error) {
						const { data } = supabase.storage.from("images").getPublicUrl(path);
						imageUrls.push(data.publicUrl);
					}
				}
				const { error } = await supabase.from("products").insert({
					title: form.title,
					description: form.description,
					price: Number(form.price),
					category: form.category,
					condition: form.condition,
					location: form.location,
					stock: Number(form.stock),
					images: imageUrls,
					seller_id: user.value?.id,
					status: "active",
					tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : []
				});
				if (error) throw error;
				toast.add({
					title: "Product uploaded!",
					color: "success"
				});
				router.push("/dashboard");
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
			const _component_UIcon = _sfc_main$5;
			const _component_UFormField = _sfc_main$2;
			const _component_UInput = _sfc_main$3;
			const _component_UTextarea = _sfc_main$4;
			const _component_USelect = _sfc_main$6;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" }, _attrs))}><div class="max-w-3xl mx-auto"><h1 class="text-3xl font-black mb-8 text-gray-900 dark:text-white">Upload Product</h1>`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UCard, { class: "shadow-lg" }, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-6"${_scopeId}><div${_scopeId}><label class="block font-semibold mb-3"${_scopeId}>Product Images (Max 8)</label><div class="grid grid-cols-4 gap-3 mb-3"${_scopeId}><!--[-->`);
						(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(previews), (preview, i) => {
							_push(`<div class="relative aspect-square"${_scopeId}><img${(0, server_renderer_exports.ssrRenderAttr)("src", preview)} class="w-full h-full object-cover rounded-xl"${_scopeId}>`);
							_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
								icon: "i-lucide-x",
								color: "error",
								size: "xs",
								class: "absolute -top-2 -right-2 rounded-full",
								onClick: ($event) => removeImage(i)
							}, null, _parent, _scopeId));
							_push(`</div>`);
						});
						_push(`<!--]-->`);
						if ((0, vue_exports.unref)(files).length < 8) {
							_push(`<label class="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors"${_scopeId}><input type="file" multiple accept="image/*" class="hidden"${_scopeId}>`);
							_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
								name: "i-lucide-upload",
								class: "w-8 h-8 text-gray-400"
							}, null, _parent, _scopeId));
							_push(`</label>`);
						} else _push(`<!---->`);
						_push(`</div></div>`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Title *" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).title,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).title = $event,
									placeholder: "Product title",
									size: "lg",
									class: "w-full",
									required: ""
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).title,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).title = $event,
									placeholder: "Product title",
									size: "lg",
									class: "w-full",
									required: ""
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Description *" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UTextarea, {
									modelValue: (0, vue_exports.unref)(form).description,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).description = $event,
									placeholder: "Describe your product...",
									rows: 4,
									class: "w-full",
									required: ""
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_UTextarea, {
									modelValue: (0, vue_exports.unref)(form).description,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).description = $event,
									placeholder: "Describe your product...",
									rows: 4,
									class: "w-full",
									required: ""
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<div class="grid grid-cols-2 gap-4"${_scopeId}>`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Price (₦) *" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).price,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).price = $event,
									type: "number",
									placeholder: "0",
									size: "lg",
									class: "w-full",
									required: ""
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).price,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).price = $event,
									type: "number",
									placeholder: "0",
									size: "lg",
									class: "w-full",
									required: ""
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Stock" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).stock,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).stock = $event,
									type: "number",
									placeholder: "1",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).stock,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).stock = $event,
									type: "number",
									placeholder: "1",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div><div class="grid grid-cols-2 gap-4"${_scopeId}>`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Category" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_USelect, {
									modelValue: (0, vue_exports.unref)(form).category,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).category = $event,
									options: categories,
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_USelect, {
									modelValue: (0, vue_exports.unref)(form).category,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).category = $event,
									options: categories,
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Condition" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_USelect, {
									modelValue: (0, vue_exports.unref)(form).condition,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).condition = $event,
									options: [
										"new",
										"used",
										"refurbished"
									],
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_USelect, {
									modelValue: (0, vue_exports.unref)(form).condition,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).condition = $event,
									options: [
										"new",
										"used",
										"refurbished"
									],
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Location" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_USelect, {
									modelValue: (0, vue_exports.unref)(form).location,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).location = $event,
									options: locations,
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_USelect, {
									modelValue: (0, vue_exports.unref)(form).location,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).location = $event,
									options: locations,
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UFormField, { label: "Tags (comma separated)" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).tags,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).tags = $event,
									placeholder: "e.g. wireless, bluetooth",
									size: "lg",
									class: "w-full"
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_component_UInput, {
									modelValue: (0, vue_exports.unref)(form).tags,
									"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).tags = $event,
									placeholder: "e.g. wireless, bluetooth",
									size: "lg",
									class: "w-full"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
							type: "submit",
							color: "primary",
							size: "xl",
							block: "",
							loading: (0, vue_exports.unref)(loading)
						}, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push(` Upload Product `);
								else return [(0, vue_exports.createTextVNode)(" Upload Product ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</form>`);
					} else return [(0, vue_exports.createVNode)("form", {
						class: "space-y-6",
						onSubmit: (0, vue_exports.withModifiers)(submit, ["prevent"])
					}, [
						(0, vue_exports.createVNode)("div", null, [(0, vue_exports.createVNode)("label", { class: "block font-semibold mb-3" }, "Product Images (Max 8)"), (0, vue_exports.createVNode)("div", { class: "grid grid-cols-4 gap-3 mb-3" }, [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)((0, vue_exports.unref)(previews), (preview, i) => {
							return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", {
								key: i,
								class: "relative aspect-square"
							}, [(0, vue_exports.createVNode)("img", {
								src: preview,
								class: "w-full h-full object-cover rounded-xl"
							}, null, 8, ["src"]), (0, vue_exports.createVNode)(_component_UButton, {
								icon: "i-lucide-x",
								color: "error",
								size: "xs",
								class: "absolute -top-2 -right-2 rounded-full",
								onClick: ($event) => removeImage(i)
							}, null, 8, ["onClick"])]);
						}), 128)), (0, vue_exports.unref)(files).length < 8 ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("label", {
							key: 0,
							class: "aspect-square border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors"
						}, [(0, vue_exports.createVNode)("input", {
							type: "file",
							multiple: "",
							accept: "image/*",
							class: "hidden",
							onChange: handleImages
						}, null, 32), (0, vue_exports.createVNode)(_component_UIcon, {
							name: "i-lucide-upload",
							class: "w-8 h-8 text-gray-400"
						})])) : (0, vue_exports.createCommentVNode)("", true)])]),
						(0, vue_exports.createVNode)(_component_UFormField, { label: "Title *" }, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UInput, {
								modelValue: (0, vue_exports.unref)(form).title,
								"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).title = $event,
								placeholder: "Product title",
								size: "lg",
								class: "w-full",
								required: ""
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						(0, vue_exports.createVNode)(_component_UFormField, { label: "Description *" }, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UTextarea, {
								modelValue: (0, vue_exports.unref)(form).description,
								"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).description = $event,
								placeholder: "Describe your product...",
								rows: 4,
								class: "w-full",
								required: ""
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						(0, vue_exports.createVNode)("div", { class: "grid grid-cols-2 gap-4" }, [(0, vue_exports.createVNode)(_component_UFormField, { label: "Price (₦) *" }, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UInput, {
								modelValue: (0, vue_exports.unref)(form).price,
								"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).price = $event,
								type: "number",
								placeholder: "0",
								size: "lg",
								class: "w-full",
								required: ""
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}), (0, vue_exports.createVNode)(_component_UFormField, { label: "Stock" }, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UInput, {
								modelValue: (0, vue_exports.unref)(form).stock,
								"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).stock = $event,
								type: "number",
								placeholder: "1",
								size: "lg",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						})]),
						(0, vue_exports.createVNode)("div", { class: "grid grid-cols-2 gap-4" }, [(0, vue_exports.createVNode)(_component_UFormField, { label: "Category" }, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_USelect, {
								modelValue: (0, vue_exports.unref)(form).category,
								"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).category = $event,
								options: categories,
								size: "lg",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}), (0, vue_exports.createVNode)(_component_UFormField, { label: "Condition" }, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_USelect, {
								modelValue: (0, vue_exports.unref)(form).condition,
								"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).condition = $event,
								options: [
									"new",
									"used",
									"refurbished"
								],
								size: "lg",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						})]),
						(0, vue_exports.createVNode)(_component_UFormField, { label: "Location" }, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_USelect, {
								modelValue: (0, vue_exports.unref)(form).location,
								"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).location = $event,
								options: locations,
								size: "lg",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						(0, vue_exports.createVNode)(_component_UFormField, { label: "Tags (comma separated)" }, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_component_UInput, {
								modelValue: (0, vue_exports.unref)(form).tags,
								"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(form).tags = $event,
								placeholder: "e.g. wireless, bluetooth",
								size: "lg",
								class: "w-full"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
							_: 1
						}),
						(0, vue_exports.createVNode)(_component_UButton, {
							type: "submit",
							color: "primary",
							size: "xl",
							block: "",
							loading: (0, vue_exports.unref)(loading)
						}, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)(" Upload Product ")]),
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
//#region app/pages/upload-product.vue
var _sfc_setup = upload_product_vue_vue_type_script_setup_true_lang_default.setup;
upload_product_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/upload-product.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var upload_product_default = upload_product_vue_vue_type_script_setup_true_lang_default;

export { upload_product_default as default };
//# sourceMappingURL=upload-product-p5w5JJOr.mjs.map
