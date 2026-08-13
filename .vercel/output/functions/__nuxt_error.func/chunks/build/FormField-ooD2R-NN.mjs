import { aj as vue_exports, a0 as useComponentProps, X as useAppConfig, U as tv, r as formErrorsInjectionKey, t as formInputsInjectionKey, B as inputIdInjectionKey, s as formFieldInjectionKey, R as server_renderer_exports, b as Primitive, a4 as useForwardExpose } from '../virtual/entry.mjs';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Label/Label.js
var Label_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "Label",
	props: {
		for: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "label"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Primitive), (0, vue_exports.mergeProps)(props, { onMousedown: _cache[0] || (_cache[0] = (event) => {
				if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
			}) }), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fform-field.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fform_field_default = {
	"slots": {
		"root": "",
		"wrapper": "",
		"labelWrapper": "flex content-center items-center justify-between gap-1",
		"label": "block font-medium text-default",
		"container": "relative",
		"description": "text-muted",
		"error": "mt-2 text-error",
		"hint": "text-muted",
		"help": "mt-2 text-muted"
	},
	"variants": {
		"size": {
			"xs": { "root": "text-xs" },
			"sm": { "root": "text-xs" },
			"md": { "root": "text-sm" },
			"lg": { "root": "text-sm" },
			"xl": { "root": "text-base" }
		},
		"required": { "true": { "label": "after:content-['*'] after:ms-0.5 after:text-error" } },
		"orientation": {
			"vertical": { "container": "mt-1" },
			"horizontal": { "root": "flex justify-between place-items-baseline gap-2" }
		}
	},
	"defaultVariants": { "size": "md" }
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_34dffa26c25098eb8314796249c1dfc0/node_modules/@nuxt/ui/dist/runtime/components/FormField.vue
var _sfc_main = {
	__name: "UFormField",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		errorPattern: {
			type: null,
			required: false
		},
		label: {
			type: String,
			required: false
		},
		description: {
			type: String,
			required: false
		},
		help: {
			type: String,
			required: false
		},
		error: {
			type: [Boolean, String],
			required: false,
			default: void 0
		},
		hint: {
			type: String,
			required: false
		},
		size: {
			type: null,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		},
		eagerValidation: {
			type: Boolean,
			required: false
		},
		validateOnInputDelay: {
			type: Number,
			required: false
		},
		orientation: {
			type: null,
			required: false,
			default: "vertical"
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		}
	},
	setup(__props) {
		const _props = __props;
		const slots = (0, vue_exports.useSlots)();
		const props = useComponentProps("formField", _props);
		const appConfig = useAppConfig();
		const ui = (0, vue_exports.computed)(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fform_field_default,
			...appConfig.ui?.formField || {}
		})({
			size: props.size,
			required: props.required,
			orientation: props.orientation
		}));
		const formErrors = (0, vue_exports.inject)(formErrorsInjectionKey, null);
		const error = (0, vue_exports.computed)(() => props.error || formErrors?.value?.find((error2) => error2.name === props.name || props.errorPattern && error2.name?.match(props.errorPattern))?.message);
		const id = (0, vue_exports.ref)((0, vue_exports.useId)());
		const ariaId = id.value;
		const formInputs = (0, vue_exports.inject)(formInputsInjectionKey, void 0);
		(0, vue_exports.watch)(id, () => {
			if (formInputs && props.name) formInputs.value[props.name] = {
				id: id.value,
				pattern: props.errorPattern
			};
		}, { immediate: true });
		(0, vue_exports.provide)(inputIdInjectionKey, id);
		(0, vue_exports.provide)(formFieldInjectionKey, (0, vue_exports.computed)(() => ({
			error: error.value,
			name: props.name,
			size: props.size,
			eagerValidation: props.eagerValidation,
			validateOnInputDelay: props.validateOnInputDelay,
			errorPattern: props.errorPattern,
			hint: props.hint,
			description: props.description,
			help: props.help,
			ariaId
		})));
		return (_ctx, _push, _parent, _attrs) => {
			_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(Primitive), (0, vue_exports.mergeProps)({
				as: (0, vue_exports.unref)(props).as,
				"data-orientation": (0, vue_exports.unref)(props).orientation,
				"data-slot": "root",
				class: ui.value.root({ class: [(0, vue_exports.unref)(props).ui?.root, (0, vue_exports.unref)(props).class] })
			}, _attrs), {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div data-slot="wrapper" class="${(0, server_renderer_exports.ssrRenderClass)(ui.value.wrapper({ class: (0, vue_exports.unref)(props).ui?.wrapper }))}"${_scopeId}>`);
						if ((0, vue_exports.unref)(props).label || !!slots.label) {
							_push(`<div data-slot="labelWrapper" class="${(0, server_renderer_exports.ssrRenderClass)(ui.value.labelWrapper({ class: (0, vue_exports.unref)(props).ui?.labelWrapper }))}"${_scopeId}>`);
							_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(Label_default), {
								for: id.value,
								"data-slot": "label",
								class: ui.value.label({ class: (0, vue_exports.unref)(props).ui?.label })
							}, {
								default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
									if (_push) (0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "label", { label: (0, vue_exports.unref)(props).label }, () => {
										_push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(props).label)}`);
									}, _push, _parent, _scopeId);
									else return [(0, vue_exports.renderSlot)(_ctx.$slots, "label", { label: (0, vue_exports.unref)(props).label }, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(props).label), 1)])];
								}),
								_: 3
							}, _parent, _scopeId));
							if ((0, vue_exports.unref)(props).hint || !!slots.hint) {
								_push(`<span${(0, server_renderer_exports.ssrRenderAttr)("id", `${(0, vue_exports.unref)(ariaId)}-hint`)} data-slot="hint" class="${(0, server_renderer_exports.ssrRenderClass)(ui.value.hint({ class: (0, vue_exports.unref)(props).ui?.hint }))}"${_scopeId}>`);
								(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "hint", { hint: (0, vue_exports.unref)(props).hint }, () => {
									_push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(props).hint)}`);
								}, _push, _parent, _scopeId);
								_push(`</span>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						} else _push(`<!---->`);
						if ((0, vue_exports.unref)(props).description || !!slots.description) {
							_push(`<p${(0, server_renderer_exports.ssrRenderAttr)("id", `${(0, vue_exports.unref)(ariaId)}-description`)} data-slot="description" class="${(0, server_renderer_exports.ssrRenderClass)(ui.value.description({ class: (0, vue_exports.unref)(props).ui?.description }))}"${_scopeId}>`);
							(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "description", { description: (0, vue_exports.unref)(props).description }, () => {
								_push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(props).description)}`);
							}, _push, _parent, _scopeId);
							_push(`</p>`);
						} else _push(`<!---->`);
						_push(`</div><div class="${(0, server_renderer_exports.ssrRenderClass)([((0, vue_exports.unref)(props).label || !!slots.label || (0, vue_exports.unref)(props).description || !!slots.description) && ui.value.container({ class: (0, vue_exports.unref)(props).ui?.container })])}"${_scopeId}>`);
						(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "default", { error: error.value }, null, _push, _parent, _scopeId);
						if ((0, vue_exports.unref)(props).error !== false && (typeof error.value === "string" && error.value || !!slots.error)) {
							_push(`<div${(0, server_renderer_exports.ssrRenderAttr)("id", `${(0, vue_exports.unref)(ariaId)}-error`)} data-slot="error" class="${(0, server_renderer_exports.ssrRenderClass)(ui.value.error({ class: (0, vue_exports.unref)(props).ui?.error }))}"${_scopeId}>`);
							(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "error", { error: error.value }, () => {
								_push(`${(0, server_renderer_exports.ssrInterpolate)(error.value)}`);
							}, _push, _parent, _scopeId);
							_push(`</div>`);
						} else if ((0, vue_exports.unref)(props).help || !!slots.help) {
							_push(`<div${(0, server_renderer_exports.ssrRenderAttr)("id", `${(0, vue_exports.unref)(ariaId)}-help`)} data-slot="help" class="${(0, server_renderer_exports.ssrRenderClass)(ui.value.help({ class: (0, vue_exports.unref)(props).ui?.help }))}"${_scopeId}>`);
							(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "help", { help: (0, vue_exports.unref)(props).help }, () => {
								_push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(props).help)}`);
							}, _push, _parent, _scopeId);
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`</div>`);
					} else return [(0, vue_exports.createVNode)("div", {
						"data-slot": "wrapper",
						class: ui.value.wrapper({ class: (0, vue_exports.unref)(props).ui?.wrapper })
					}, [(0, vue_exports.unref)(props).label || !!slots.label ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", {
						key: 0,
						"data-slot": "labelWrapper",
						class: ui.value.labelWrapper({ class: (0, vue_exports.unref)(props).ui?.labelWrapper })
					}, [(0, vue_exports.createVNode)((0, vue_exports.unref)(Label_default), {
						for: id.value,
						"data-slot": "label",
						class: ui.value.label({ class: (0, vue_exports.unref)(props).ui?.label })
					}, {
						default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "label", { label: (0, vue_exports.unref)(props).label }, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(props).label), 1)])]),
						_: 3
					}, 8, ["for", "class"]), (0, vue_exports.unref)(props).hint || !!slots.hint ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("span", {
						key: 0,
						id: `${(0, vue_exports.unref)(ariaId)}-hint`,
						"data-slot": "hint",
						class: ui.value.hint({ class: (0, vue_exports.unref)(props).ui?.hint })
					}, [(0, vue_exports.renderSlot)(_ctx.$slots, "hint", { hint: (0, vue_exports.unref)(props).hint }, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(props).hint), 1)])], 10, ["id"])) : (0, vue_exports.createCommentVNode)("", true)], 2)) : (0, vue_exports.createCommentVNode)("", true), (0, vue_exports.unref)(props).description || !!slots.description ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("p", {
						key: 1,
						id: `${(0, vue_exports.unref)(ariaId)}-description`,
						"data-slot": "description",
						class: ui.value.description({ class: (0, vue_exports.unref)(props).ui?.description })
					}, [(0, vue_exports.renderSlot)(_ctx.$slots, "description", { description: (0, vue_exports.unref)(props).description }, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(props).description), 1)])], 10, ["id"])) : (0, vue_exports.createCommentVNode)("", true)], 2), (0, vue_exports.createVNode)("div", { class: [((0, vue_exports.unref)(props).label || !!slots.label || (0, vue_exports.unref)(props).description || !!slots.description) && ui.value.container({ class: (0, vue_exports.unref)(props).ui?.container })] }, [(0, vue_exports.renderSlot)(_ctx.$slots, "default", { error: error.value }), (0, vue_exports.unref)(props).error !== false && (typeof error.value === "string" && error.value || !!slots.error) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", {
						key: 0,
						id: `${(0, vue_exports.unref)(ariaId)}-error`,
						"data-slot": "error",
						class: ui.value.error({ class: (0, vue_exports.unref)(props).ui?.error })
					}, [(0, vue_exports.renderSlot)(_ctx.$slots, "error", { error: error.value }, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(error.value), 1)])], 10, ["id"])) : (0, vue_exports.unref)(props).help || !!slots.help ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", {
						key: 1,
						id: `${(0, vue_exports.unref)(ariaId)}-help`,
						"data-slot": "help",
						class: ui.value.help({ class: (0, vue_exports.unref)(props).ui?.help })
					}, [(0, vue_exports.renderSlot)(_ctx.$slots, "help", { help: (0, vue_exports.unref)(props).help }, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(props).help), 1)])], 10, ["id"])) : (0, vue_exports.createCommentVNode)("", true)], 2)];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_34dffa26c25098eb8314796249c1dfc0/node_modules/@nuxt/ui/dist/runtime/components/FormField.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=FormField-ooD2R-NN.mjs.map
