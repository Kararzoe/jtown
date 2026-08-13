import { d as _plugin_vue_export_helper_default, R as server_renderer_exports, aj as vue_exports } from '../virtual/entry.mjs';
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

//#region app/pages/about.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen bg-white dark:bg-gray-900 py-16 px-4" }, _attrs))}><div class="max-w-3xl mx-auto"><h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">About JosMKT</h1><div class="space-y-6 text-gray-600 dark:text-gray-400"><p class="text-lg"> JosMKT is the #1 platform for finding trusted service providers in Jos, Plateau State, Nigeria. We connect people who need services with verified professionals in their area. </p><h2 class="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2><p>To make it easy for everyone in Jos to find reliable, professional service providers — from plumbers and electricians to bakers and photographers — all in one place.</p><h2 class="text-2xl font-bold text-gray-900 dark:text-white">What We Do</h2><ul class="list-disc pl-6 space-y-2"><li>Connect customers with verified service providers in Jos</li><li>Help businesses grow their visibility and reach more customers</li><li>Provide a trusted platform for service discovery</li><li>Support the local economy in Plateau State</li></ul><h2 class="text-2xl font-bold text-gray-900 dark:text-white">Our Coverage</h2><p>We cover all areas in Jos including Bukuru, Rayfield, Terminus, Lamingo, Tudun Wada, Nassarawa, Hwolshe, Old Airport, Polo, British, Sukuwa, and surrounding areas in Plateau State.</p><h2 class="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2><p> 📞 +234 904 383 2380<br> 📧 support@josmkt.com.ng<br> 📍 Jos, Plateau State, Nigeria </p></div></div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var about_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { about_default as default };
//# sourceMappingURL=about-CvgWbfJP.mjs.map
