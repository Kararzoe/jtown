import { aj as vue_exports, ag as useSupabaseUser, ah as useToast, R as server_renderer_exports, e as _sfc_main, j as _sfc_main$5, N as NuxtLink, $ as $fetch$2 } from '../virtual/entry.mjs';
import { _ as _sfc_main$2 } from './Select-PQNYhlOg.mjs';
import { _ as _sfc_main$3 } from './Input-COSn-l8y.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CEFOh9bN.mjs';
import { _ as _sfc_main$1 } from './Badge-ldsEE6tG.mjs';
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

//#region app/pages/admin.vue?vue&type=script&setup=true&lang.ts
var admin_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "admin",
	__ssrInlineRender: true,
	setup(__props) {
		const user = useSupabaseUser();
		const supabase = useSupabaseClient();
		const toast = useToast();
		const tab = (0, vue_exports.ref)("overview");
		const loading = (0, vue_exports.ref)(true);
		const stats = (0, vue_exports.ref)({
			users: 0,
			products: 0,
			orders: 0,
			revenue: 0
		});
		const users = (0, vue_exports.ref)([]);
		const products = (0, vue_exports.ref)([]);
		const orders = (0, vue_exports.ref)([]);
		(0, vue_exports.computed)(() => user.value?.email === "kararzoe@gmail.com" || user.value?.user_metadata?.role === "admin");
		const deleteProduct = async (id) => {
			await supabase.from("products").delete().eq("id", id);
			products.value = products.value.filter((p) => p.id !== id);
			stats.value.products--;
			toast.add({
				title: "Product deleted",
				color: "success"
			});
		};
		const updateOrderStatus = async (id, status) => {
			await supabase.from("orders").update({ status }).eq("id", id);
			const o = orders.value.find((o) => o.id === id);
			if (o) o.status = status;
			toast.add({
				title: "Order updated",
				color: "success"
			});
		};
		const serviceProviders = (0, vue_exports.ref)([]);
		const loadingServices = (0, vue_exports.ref)(false);
		const loadServiceProviders = async () => {
			loadingServices.value = true;
			try {
				const data = await $fetch$2("https://jos-backend.onrender.com/api/services/all", { headers: { Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` } });
				serviceProviders.value = Array.isArray(data) ? data : [];
			} catch {
				serviceProviders.value = [];
			}
			loadingServices.value = false;
		};
		const updateServiceStatus = async (id, status) => {
			try {
				await $fetch$2(`https://jos-backend.onrender.com/api/services/${id}/status`, {
					method: "PATCH",
					body: { status }
				});
				const s = serviceProviders.value.find((s) => s._id === id);
				if (s) s.status = status;
				toast.add({
					title: `Provider ${status}`,
					color: "success"
				});
			} catch {
				toast.add({
					title: "Failed to update",
					color: "error"
				});
			}
		};
		const deleteServiceProvider = async (id) => {
			try {
				await $fetch$2(`https://jos-backend.onrender.com/api/services/${id}`, { method: "DELETE" });
				serviceProviders.value = serviceProviders.value.filter((s) => s._id !== id);
				toast.add({
					title: "Provider deleted",
					color: "success"
				});
			} catch {
				toast.add({
					title: "Failed to delete",
					color: "error"
				});
			}
		};
		(0, vue_exports.watch)(tab, (val) => {
			if (val === "services") loadServiceProviders();
		});
		const tabs = [
			{
				label: "Overview",
				value: "overview",
				icon: "i-lucide-layout-dashboard"
			},
			{
				label: "Users",
				value: "users",
				icon: "i-lucide-users"
			},
			{
				label: "Products",
				value: "products",
				icon: "i-lucide-package"
			},
			{
				label: "Orders",
				value: "orders",
				icon: "i-lucide-shopping-bag"
			},
			{
				label: "Service Providers",
				value: "services",
				icon: "i-lucide-wrench"
			},
			{
				label: "+ Add Provider",
				value: "addProvider",
				icon: "i-lucide-plus-circle"
			}
		];
		const newProvider = (0, vue_exports.reactive)({
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
		const uploading = (0, vue_exports.ref)(false);
		const serviceCategories = [
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
		const statCards = (0, vue_exports.computed)(() => [
			{
				label: "Total Users",
				value: stats.value.users,
				icon: "i-lucide-users",
				color: "bg-blue-500"
			},
			{
				label: "Total Products",
				value: stats.value.products,
				icon: "i-lucide-package",
				color: "bg-purple-500"
			},
			{
				label: "Total Orders",
				value: stats.value.orders,
				icon: "i-lucide-shopping-bag",
				color: "bg-orange-500"
			},
			{
				label: "Revenue",
				value: `₦${stats.value.revenue.toLocaleString()}`,
				icon: "i-lucide-trending-up",
				color: "bg-green-500"
			}
		]);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UButton = _sfc_main;
			const _component_UBadge = _sfc_main$1;
			const _component_UIcon = _sfc_main$5;
			const _component_NuxtLink = NuxtLink;
			const _component_USelect = _sfc_main$2;
			const _component_UInput = _sfc_main$3;
			const _component_UTextarea = _sfc_main$4;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" }, _attrs))}><div class="max-w-7xl mx-auto"><div class="flex items-center justify-between mb-8"><div class="flex items-center gap-3">`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				to: "/dashboard",
				icon: "i-lucide-arrow-left",
				variant: "ghost",
				color: "neutral"
			}, null, _parent));
			_push(`<div><h1 class="text-3xl font-black text-gray-900 dark:text-white">Admin Dashboard</h1><p class="text-sm text-gray-500">Jos Marketplace Control Panel</p></div></div>`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UBadge, {
				color: "error",
				size: "lg",
				icon: "i-lucide-shield"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Admin`);
					else return [(0, vue_exports.createTextVNode)("Admin")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"><!--[-->`);
			(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(statCards), (s) => {
				_push(`<div class="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-md card-hover"><div class="${(0, server_renderer_exports.ssrRenderClass)([s.color, "w-10 h-10 rounded-xl flex items-center justify-center mb-3"])}">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
					name: s.icon,
					class: "w-5 h-5 text-white"
				}, null, _parent));
				_push(`</div><p class="text-2xl font-black">${(0, server_renderer_exports.ssrInterpolate)(s.value)}</p><p class="text-xs text-gray-500">${(0, server_renderer_exports.ssrInterpolate)(s.label)}</p></div>`);
			});
			_push(`<!--]--></div><div class="flex gap-2 mb-6 flex-wrap"><!--[-->`);
			(0, server_renderer_exports.ssrRenderList)(tabs, (t) => {
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					key: t.value,
					icon: t.icon,
					variant: (0, vue_exports.unref)(tab) === t.value ? "solid" : "outline",
					color: (0, vue_exports.unref)(tab) === t.value ? "primary" : "neutral",
					size: "sm",
					onClick: ($event) => tab.value = t.value
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)(t.label)}`);
						else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(t.label), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div>`);
			if ((0, vue_exports.unref)(loading)) {
				_push(`<div class="space-y-3"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)(5, (i) => {
					_push(`<div class="skeleton h-16 rounded-xl"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if ((0, vue_exports.unref)(tab) === "overview") {
				_push(`<div class="grid md:grid-cols-2 gap-6"><div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"><h3 class="font-black text-lg mb-4">Recent Users</h3><div class="space-y-3"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(users).slice(0, 5), (u) => {
					_push(`<div class="flex items-center gap-3"><div class="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center overflow-hidden">`);
					if (u.avatar_url) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", u.avatar_url)} class="w-full h-full object-cover">`);
					else _push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
						name: "i-lucide-user",
						class: "w-4 h-4 text-primary-600"
					}, null, _parent));
					_push(`</div><div class="flex-1 min-w-0"><p class="font-semibold text-sm truncate">${(0, server_renderer_exports.ssrInterpolate)(u.full_name || "No name")}</p><p class="text-xs text-gray-400 truncate">${(0, server_renderer_exports.ssrInterpolate)(u.id)}</p></div><p class="text-xs text-gray-400">${(0, server_renderer_exports.ssrInterpolate)(new Date(u.created_at).toLocaleDateString())}</p></div>`);
				});
				_push(`<!--]--></div></div><div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"><h3 class="font-black text-lg mb-4">Recent Products</h3><div class="space-y-3"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(products).slice(0, 5), (p) => {
					_push(`<div class="flex items-center gap-3"><div class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">`);
					if (p.images?.[0]) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", p.images[0])} class="w-full h-full object-cover">`);
					else _push(`<div class="w-full h-full flex items-center justify-center text-lg">📦</div>`);
					_push(`</div><div class="flex-1 min-w-0"><p class="font-semibold text-sm truncate">${(0, server_renderer_exports.ssrInterpolate)(p.title)}</p><p class="text-xs text-primary-600 font-bold">₦${(0, server_renderer_exports.ssrInterpolate)(p.price?.toLocaleString())}</p></div>`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
						icon: "i-lucide-trash",
						variant: "ghost",
						color: "error",
						size: "xs",
						onClick: ($event) => deleteProduct(p.id)
					}, null, _parent));
					_push(`</div>`);
				});
				_push(`<!--]--></div></div></div>`);
			} else if ((0, vue_exports.unref)(tab) === "users") {
				_push(`<div class="space-y-3"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(users), (u) => {
					_push(`<div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4"><div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center overflow-hidden flex-shrink-0">`);
					if (u.avatar_url) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", u.avatar_url)} class="w-full h-full object-cover">`);
					else _push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
						name: "i-lucide-user",
						class: "w-5 h-5 text-primary-600"
					}, null, _parent));
					_push(`</div><div class="flex-1 min-w-0"><p class="font-bold truncate">${(0, server_renderer_exports.ssrInterpolate)(u.full_name || "No name")}</p><p class="text-sm text-gray-500 truncate">${(0, server_renderer_exports.ssrInterpolate)(u.phone || "No phone")}</p></div><p class="text-xs text-gray-400 hidden md:block">${(0, server_renderer_exports.ssrInterpolate)(new Date(u.created_at).toLocaleDateString())}</p>`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, { to: `/seller/${u.id}` }, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
								icon: "i-lucide-eye",
								variant: "ghost",
								size: "xs"
							}, null, _parent, _scopeId));
							else return [(0, vue_exports.createVNode)(_component_UButton, {
								icon: "i-lucide-eye",
								variant: "ghost",
								size: "xs"
							})];
						}),
						_: 2
					}, _parent));
					_push(`</div>`);
				});
				_push(`<!--]--></div>`);
			} else if ((0, vue_exports.unref)(tab) === "products") {
				_push(`<div class="space-y-3"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(products), (p) => {
					_push(`<div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4"><div class="w-14 h-14 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex-shrink-0">`);
					if (p.images?.[0]) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", p.images[0])}${(0, server_renderer_exports.ssrRenderAttr)("alt", p.title)} class="w-full h-full object-cover">`);
					else _push(`<div class="w-full h-full flex items-center justify-center text-2xl">📦</div>`);
					_push(`</div><div class="flex-1 min-w-0"><p class="font-bold truncate">${(0, server_renderer_exports.ssrInterpolate)(p.title)}</p><p class="text-sm text-primary-600 font-semibold">₦${(0, server_renderer_exports.ssrInterpolate)(p.price?.toLocaleString())}</p><p class="text-xs text-gray-400">by ${(0, server_renderer_exports.ssrInterpolate)(p.seller?.full_name || "Unknown")}</p></div><div class="flex gap-2">`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, { to: `/product/${p.id}` }, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
								icon: "i-lucide-eye",
								variant: "ghost",
								size: "xs"
							}, null, _parent, _scopeId));
							else return [(0, vue_exports.createVNode)(_component_UButton, {
								icon: "i-lucide-eye",
								variant: "ghost",
								size: "xs"
							})];
						}),
						_: 2
					}, _parent));
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
						icon: "i-lucide-trash",
						variant: "ghost",
						color: "error",
						size: "xs",
						onClick: ($event) => deleteProduct(p.id)
					}, null, _parent));
					_push(`</div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if ((0, vue_exports.unref)(tab) === "services") {
				_push(`<div><div class="flex justify-between items-center mb-4"><p class="text-sm text-gray-500">All service provider applications from the backend</p>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					icon: "i-lucide-refresh-cw",
					size: "xs",
					variant: "outline",
					onClick: loadServiceProviders
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Refresh`);
						else return [(0, vue_exports.createTextVNode)("Refresh")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
				if ((0, vue_exports.unref)(loadingServices)) {
					_push(`<div class="space-y-3"><!--[-->`);
					(0, server_renderer_exports.ssrRenderList)(4, (i) => {
						_push(`<div class="skeleton h-20 rounded-xl"></div>`);
					});
					_push(`<!--]--></div>`);
				} else if ((0, vue_exports.unref)(serviceProviders).length === 0) _push(`<div class="text-center py-12 text-gray-500"><p>No service providers found</p><p class="text-xs mt-1">Make sure the Render backend is running</p></div>`);
				else {
					_push(`<div class="space-y-3"><!--[-->`);
					(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(serviceProviders), (s) => {
						_push(`<div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4"><div class="w-12 h-12 rounded-full overflow-hidden bg-emerald-100 flex-shrink-0 flex items-center justify-center">`);
						if (s.image) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", s.image)} class="w-full h-full object-cover">`);
						else _push(`<span class="text-emerald-600 font-bold">${(0, server_renderer_exports.ssrInterpolate)(s.serviceName?.charAt(0))}</span>`);
						_push(`</div><div class="flex-1 min-w-0"><p class="font-bold truncate">${(0, server_renderer_exports.ssrInterpolate)(s.serviceName)}</p><p class="text-sm text-gray-500">${(0, server_renderer_exports.ssrInterpolate)(s.category)} · ${(0, server_renderer_exports.ssrInterpolate)(s.location)}</p><p class="text-xs text-gray-400">${(0, server_renderer_exports.ssrInterpolate)(s.phone)}</p></div>`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UBadge, {
							color: s.status === "approved" ? "success" : s.status === "rejected" ? "error" : "warning",
							size: "sm"
						}, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)(s.status)}`);
								else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(s.status), 1)];
							}),
							_: 2
						}, _parent));
						_push(`<div class="flex gap-1">`);
						if (s.status !== "approved") _push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
							size: "xs",
							color: "success",
							onClick: ($event) => updateServiceStatus(s._id, "approved")
						}, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Approve`);
								else return [(0, vue_exports.createTextVNode)("Approve")];
							}),
							_: 2
						}, _parent));
						else _push(`<!---->`);
						if (s.status !== "rejected") _push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
							size: "xs",
							color: "warning",
							variant: "outline",
							onClick: ($event) => updateServiceStatus(s._id, "rejected")
						}, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Reject`);
								else return [(0, vue_exports.createTextVNode)("Reject")];
							}),
							_: 2
						}, _parent));
						else _push(`<!---->`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
							size: "xs",
							color: "error",
							variant: "ghost",
							icon: "i-lucide-trash",
							onClick: ($event) => deleteServiceProvider(s._id)
						}, null, _parent));
						_push(`</div></div>`);
					});
					_push(`<!--]--></div>`);
				}
				_push(`</div>`);
			} else if ((0, vue_exports.unref)(tab) === "orders") {
				_push(`<div class="space-y-3"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(orders), (o) => {
					_push(`<div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center gap-4"><div class="text-3xl">📦</div><div class="flex-1 min-w-0"><p class="font-bold truncate">${(0, server_renderer_exports.ssrInterpolate)(o.product?.title)}</p><p class="text-sm text-gray-500">${(0, server_renderer_exports.ssrInterpolate)(o.buyer?.full_name || "Unknown buyer")}</p><p class="text-xs text-gray-400">${(0, server_renderer_exports.ssrInterpolate)(new Date(o.created_at).toLocaleDateString())}</p></div><p class="font-black text-primary-600 hidden md:block">₦${(0, server_renderer_exports.ssrInterpolate)(o.product?.price?.toLocaleString())}</p>`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_USelect, {
						"model-value": o.status,
						items: [
							"pending",
							"processing",
							"completed",
							"cancelled"
						],
						size: "xs",
						class: "w-32",
						"onUpdate:modelValue": ($event) => updateOrderStatus(o.id, $event)
					}, null, _parent));
					_push(`</div>`);
				});
				_push(`<!--]--></div>`);
			} else if ((0, vue_exports.unref)(tab) === "addProvider") {
				_push(`<div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md max-w-2xl"><h3 class="font-black text-xl mb-6">Add Service Provider</h3><form class="space-y-4">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
					modelValue: (0, vue_exports.unref)(newProvider).serviceName,
					"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(newProvider).serviceName = $event,
					required: "",
					placeholder: "Business / Service name",
					size: "lg"
				}, null, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UTextarea, {
					modelValue: (0, vue_exports.unref)(newProvider).description,
					"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(newProvider).description = $event,
					required: "",
					placeholder: "Description",
					rows: 3
				}, null, _parent));
				_push(`<div class="grid grid-cols-2 gap-4">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
					modelValue: (0, vue_exports.unref)(newProvider).phone,
					"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(newProvider).phone = $event,
					required: "",
					placeholder: "Phone number"
				}, null, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
					modelValue: (0, vue_exports.unref)(newProvider).location,
					"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(newProvider).location = $event,
					placeholder: "Location (e.g. Terminus, Jos)"
				}, null, _parent));
				_push(`</div><div class="grid grid-cols-2 gap-4">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
					modelValue: (0, vue_exports.unref)(newProvider).experience,
					"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(newProvider).experience = $event,
					placeholder: "Experience (e.g. 5 years)"
				}, null, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
					modelValue: (0, vue_exports.unref)(newProvider).priceRange,
					"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(newProvider).priceRange = $event,
					placeholder: "Price range (e.g. ₦5k - ₦50k)"
				}, null, _parent));
				_push(`</div>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_USelect, {
					modelValue: (0, vue_exports.unref)(newProvider).category,
					"onUpdate:modelValue": ($event) => (0, vue_exports.unref)(newProvider).category = $event,
					items: serviceCategories.map((c) => ({
						label: c.replace(/-/g, "  ").replace(/\b\w/g, (l) => l.toUpperCase()),
						value: c
					})),
					placeholder: "Select category"
				}, null, _parent));
				_push(`<div><p class="text-sm font-semibold mb-2">Business Logo / Photo</p><input type="file" accept="image/*" class="w-full text-sm">`);
				if ((0, vue_exports.unref)(uploading)) _push(`<p class="text-xs text-emerald-500 mt-1">Uploading...</p>`);
				else _push(`<!---->`);
				if ((0, vue_exports.unref)(newProvider).image) _push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", (0, vue_exports.unref)(newProvider).image)} class="mt-2 w-24 h-24 object-cover rounded-xl">`);
				else _push(`<!---->`);
				_push(`</div><div><p class="text-sm font-semibold mb-2">Gallery / Work Samples</p><input type="file" accept="image/*" multiple class="w-full text-sm">`);
				if ((0, vue_exports.unref)(newProvider).gallery.length) {
					_push(`<div class="flex gap-2 mt-2 flex-wrap"><!--[-->`);
					(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(newProvider).gallery, (url, i) => {
						_push(`<img${(0, server_renderer_exports.ssrRenderAttr)("src", url)} class="w-16 h-16 object-cover rounded-lg">`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					type: "submit",
					color: "primary",
					size: "lg",
					block: "",
					loading: (0, vue_exports.unref)(uploading)
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Add Provider`);
						else return [(0, vue_exports.createTextVNode)("Add Provider")];
					}),
					_: 1
				}, _parent));
				_push(`</form></div>`);
			} else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region app/pages/admin.vue
var _sfc_setup = admin_vue_vue_type_script_setup_true_lang_default.setup;
admin_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var admin_default = admin_vue_vue_type_script_setup_true_lang_default;

export { admin_default as default };
//# sourceMappingURL=admin-Dkpf-KR9.mjs.map
