import { aj as vue_exports, ag as useSupabaseUser, R as server_renderer_exports, e as _sfc_main$1 } from '../virtual/entry.mjs';
import { _ as _sfc_main } from './Input-COSn-l8y.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CEFOh9bN.mjs';
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

//#region app/pages/chat.vue?vue&type=script&setup=true&lang.ts
var chat_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "chat",
	__ssrInlineRender: true,
	setup(__props) {
		const supabase = useSupabaseClient();
		const user = useSupabaseUser();
		const chats = (0, vue_exports.ref)([]);
		const selectedChat = (0, vue_exports.ref)(null);
		const messages = (0, vue_exports.ref)([]);
		const newMessage = (0, vue_exports.ref)("");
		(0, vue_exports.ref)(null);
		const loading = (0, vue_exports.ref)(true);
		const sendMessage = async () => {
			if (!newMessage.value.trim() || !selectedChat.value) return;
			const content = newMessage.value.trim();
			newMessage.value = "";
			await supabase.from("messages").insert({
				chat_id: selectedChat.value.id,
				sender_id: user.value?.id,
				content
			});
			await supabase.from("chats").update({ updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", selectedChat.value.id);
		};
		const otherParticipant = (chat) => {
			return chat.participants?.find((p) => p.id !== user.value?.id);
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UInput = _sfc_main;
			const _component_UButton = _sfc_main$1;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4" }, _attrs))}><div class="max-w-7xl mx-auto"><div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden" style="${(0, server_renderer_exports.ssrRenderStyle)({ "height": "70vh" })}"><div class="flex h-full"><div class="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto"><div class="p-4 border-b border-gray-200 dark:border-gray-700"><h2 class="text-xl font-bold text-gray-900 dark:text-white">Messages</h2></div>`);
			if ((0, vue_exports.unref)(loading)) {
				_push(`<div class="p-4 space-y-3"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)(4, (i) => {
					_push(`<div class="skeleton h-16 rounded-xl"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if ((0, vue_exports.unref)(chats).length === 0) _push(`<div class="p-8 text-center text-gray-500"><div class="text-4xl mb-2">💬</div><p>No chats yet</p></div>`);
			else {
				_push(`<div><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(chats), (chat) => {
					_push(`<button class="${(0, server_renderer_exports.ssrRenderClass)([(0, vue_exports.unref)(selectedChat)?.id === chat.id ? "bg-emerald-50 dark:bg-emerald-900/20" : "", "w-full p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition text-left"])}"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-lg flex-shrink-0">${(0, server_renderer_exports.ssrInterpolate)(otherParticipant(chat)?.full_name?.charAt(0) || "👤")}</div><div class="flex-1 min-w-0"><p class="font-semibold text-gray-900 dark:text-white truncate">${(0, server_renderer_exports.ssrInterpolate)(otherParticipant(chat)?.full_name || "User")}</p><p class="text-sm text-gray-500 truncate">${(0, server_renderer_exports.ssrInterpolate)(chat.product?.title)}</p></div></div></button>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div><div class="hidden md:flex flex-1 flex-col">`);
			if (!(0, vue_exports.unref)(selectedChat)) _push(`<div class="flex-1 flex items-center justify-center text-gray-400"><div class="text-center"><div class="text-5xl mb-3">💬</div><p>Select a chat to start messaging</p></div></div>`);
			else {
				_push(`<!--[--><div class="p-4 border-b border-gray-200 dark:border-gray-700"><h3 class="font-bold text-gray-900 dark:text-white">${(0, server_renderer_exports.ssrInterpolate)(otherParticipant((0, vue_exports.unref)(selectedChat))?.full_name)}</h3><p class="text-sm text-gray-500">${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(selectedChat).product?.title)}</p></div><div class="flex-1 overflow-y-auto p-4 space-y-3"><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)((0, vue_exports.unref)(messages), (msg, i) => {
					_push(`<div class="${(0, server_renderer_exports.ssrRenderClass)([msg.sender_id === (0, vue_exports.unref)(user)?.id ? "justify-end" : "justify-start", "flex"])}"><div class="${(0, server_renderer_exports.ssrRenderClass)([msg.sender_id === (0, vue_exports.unref)(user)?.id ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white", "max-w-xs px-4 py-2 rounded-2xl text-sm"])}">${(0, server_renderer_exports.ssrInterpolate)(msg.content)}</div></div>`);
				});
				_push(`<!--]--><div></div></div><div class="p-4 border-t border-gray-200 dark:border-gray-700"><div class="flex gap-2">`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
					modelValue: (0, vue_exports.unref)(newMessage),
					"onUpdate:modelValue": ($event) => (0, vue_exports.isRef)(newMessage) ? newMessage.value = $event : null,
					placeholder: "Type a message...",
					class: "flex-1",
					onKeyup: sendMessage
				}, null, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					color: "primary",
					icon: "i-lucide-send",
					onClick: sendMessage
				}, null, _parent));
				_push(`</div></div><!--]-->`);
			}
			_push(`</div></div></div></div></div>`);
		};
	}
});
//#endregion
//#region app/pages/chat.vue
var _sfc_setup = chat_vue_vue_type_script_setup_true_lang_default.setup;
chat_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/chat.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var chat_default = chat_vue_vue_type_script_setup_true_lang_default;

export { chat_default as default };
//# sourceMappingURL=chat-CVt8RPaU.mjs.map
