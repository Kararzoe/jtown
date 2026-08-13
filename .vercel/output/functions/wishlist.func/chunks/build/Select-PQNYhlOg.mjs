import { aj as vue_exports, a0 as useComponentProps, X as useAppConfig, a5 as useForwardProps, O as reactivePick, aa as usePortal, a3 as useFormField, a2 as useFieldGroup, Z as useComponentIcons, U as tv, D as isArrayOfArray, R as server_renderer_exports, j as _sfc_main$5, h as _sfc_main$3, F as FieldGroupReset, u as get, i as _sfc_main$4, ai as useVModel, G as isNullish, Y as useCollection, H as looseToNumber, a4 as useForwardExpose, b as Primitive, w as getDisplayValue, T as Teleport_default, P as Presence_default, W as unrefElement, k as createContext, V as VisuallyHidden_default, a6 as useForwardProps$1, z as injectConfigProviderContext, v as getActiveElement, ac as useResizeObserver } from '../virtual/entry.mjs';
import { o as useDirection, e as PopperRoot_default, s as useId, t as useTypeahead, P as PopperAnchor_default, q as useForwardPropsEmits, b as PopperArrow_default, p as useFocusGuards, u as useBodyScrollLock, r as useHideOthers, a as FocusScope_default, D as DismissableLayer_default, k as handleAndDispatchCustomEvent, h as focusFirst, d as PopperContent_default } from './PopperArrow-CQIWINqG.mjs';
import { f as defu, u as isEqual } from '../_/nitro.mjs';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/clamp.js
/**
* The `clamp` function restricts a number within a specified range by returning the value itself if it
* falls within the range, or the closest boundary value if it exceeds the range.
* @param {number} value - The `value` parameter represents the number that you want to clamp within
* the specified range defined by `min` and `max` values.
* @param {number} min - If the `value` parameter is less than the `min` value, the
* function will return the `min` value.
* @param {number} max - If the `value` parameter is greater than the `max` value,
* the function will return `max`.
* @returns The `clamp` function returns the value of `value` constrained within the range defined by
* `min` and `max`.
*/
function clamp(value, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
	return Math.min(max, Math.max(min, value));
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFormControl.js
function useFormControl(el) {
	return (0, vue_exports.computed)(() => (0, vue_exports.toValue)(el) ? Boolean(unrefElement(el)?.closest("form")) : true);
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useNonce.js
function useNonce(nonce) {
	const context = injectConfigProviderContext({ nonce: (0, vue_exports.ref)() });
	return (0, vue_exports.computed)(() => nonce?.value || context.nonce?.value);
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/utils.js
var OPEN_KEYS = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
];
var SELECTION_KEYS = [" ", "Enter"];
function valueComparator(value, currentValue, comparator) {
	if (value === void 0) return false;
	else if (Array.isArray(value)) return value.some((val) => compare(val, currentValue, comparator));
	else return compare(value, currentValue, comparator);
}
function compare(value, currentValue, comparator) {
	if (value === void 0 || currentValue === void 0) return false;
	if (typeof value === "string") return value === currentValue;
	if (typeof comparator === "function") return comparator(value, currentValue);
	if (typeof comparator === "string") return value?.[comparator] === currentValue?.[comparator];
	return isEqual(value, currentValue);
}
function shouldShowPlaceholder(value) {
	return value === void 0 || value === null || value === "" || Array.isArray(value) && value.length === 0;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectRoot.js
var _hoisted_1$1 = ["value"];
var [injectSelectRootContext, provideSelectRootContext] = /*#__PURE__*/ createContext("SelectRoot");
var SelectRoot_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	inheritAttrs: false,
	__name: "SelectRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		modelValue: {
			type: null,
			required: false,
			default: void 0
		},
		nullableValue: {
			type: String,
			required: false,
			default: ""
		},
		by: {
			type: [String, Function],
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		autocomplete: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["update:modelValue", "update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { required, disabled, multiple, dir: propDir } = (0, vue_exports.toRefs)(props);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
			passive: props.modelValue === void 0,
			deep: true
		});
		const open = useVModel(props, "open", emits, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const triggerElement = (0, vue_exports.ref)();
		const valueElement = (0, vue_exports.ref)();
		const triggerPointerDownPosRef = (0, vue_exports.ref)({
			x: 0,
			y: 0
		});
		const isEmptyModelValue = (0, vue_exports.computed)(() => {
			if (multiple.value && Array.isArray(modelValue.value)) return modelValue.value?.length === 0;
			else return isNullish(modelValue.value);
		});
		useCollection({ isProvider: true });
		const dir = useDirection(propDir);
		const isFormControl = useFormControl(triggerElement);
		const optionsSet = (0, vue_exports.ref)(/* @__PURE__ */ new Set());
		const nativeSelectKey = (0, vue_exports.computed)(() => {
			return Array.from(optionsSet.value).map((option) => option.value).join(";");
		});
		function handleValueChange(value) {
			if (multiple.value) {
				const array = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
				const index = array.findIndex((i) => compare(i, value, props.by));
				index === -1 ? array.push(value) : array.splice(index, 1);
				modelValue.value = [...array];
			} else modelValue.value = value;
		}
		function getOption(value) {
			return Array.from(optionsSet.value).find((option) => valueComparator(value, option.value, props.by));
		}
		provideSelectRootContext({
			triggerElement,
			onTriggerChange: (node) => {
				triggerElement.value = node;
			},
			valueElement,
			onValueElementChange: (node) => {
				valueElement.value = node;
			},
			contentId: "",
			modelValue,
			onValueChange: handleValueChange,
			by: props.by,
			open,
			multiple,
			required,
			onOpenChange: (value) => {
				open.value = value;
			},
			dir,
			triggerPointerDownPosRef,
			disabled,
			isEmptyModelValue,
			optionsSet,
			onOptionAdd: (option) => {
				const existingOption = getOption(option.value);
				if (existingOption) optionsSet.value.delete(existingOption);
				optionsSet.value.add(option);
			},
			onOptionRemove: (option) => {
				const existingOption = getOption(option.value);
				if (existingOption) optionsSet.value.delete(existingOption);
			}
		});
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(PopperRoot_default), null, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default", {
					modelValue: (0, vue_exports.unref)(modelValue),
					open: (0, vue_exports.unref)(open)
				}), (0, vue_exports.unref)(isFormControl) && _ctx.name ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(BubbleSelect_default, {
					key: nativeSelectKey.value,
					"aria-hidden": "true",
					tabindex: "-1",
					multiple: (0, vue_exports.unref)(multiple),
					required: (0, vue_exports.unref)(required),
					name: _ctx.name,
					autocomplete: _ctx.autocomplete,
					disabled: (0, vue_exports.unref)(disabled),
					value: (0, vue_exports.unref)(modelValue)
				}, {
					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.unref)(isNullish)((0, vue_exports.unref)(modelValue)) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createElementBlock)("option", {
						key: 0,
						value: _ctx.nullableValue
					}, null, 8, _hoisted_1$1)) : (0, vue_exports.createCommentVNode)("v-if", true), ((0, vue_exports.openBlock)(true), (0, vue_exports.createElementBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(Array.from(optionsSet.value), (option) => {
						return (0, vue_exports.openBlock)(), (0, vue_exports.createElementBlock)("option", (0, vue_exports.mergeProps)({ key: option.value ?? "" }, { ref_for: true }, option), null, 16);
					}), 128))]),
					_: 1
				}, 8, [
					"multiple",
					"required",
					"name",
					"autocomplete",
					"disabled",
					"value"
				])) : (0, vue_exports.createCommentVNode)("v-if", true)]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/BubbleSelect.js
var BubbleSelect_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "BubbleSelect",
	props: {
		autocomplete: {
			type: String,
			required: false
		},
		autofocus: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		form: {
			type: String,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		},
		size: {
			type: Number,
			required: false
		},
		value: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const selectElement = (0, vue_exports.ref)();
		const rootContext = injectSelectRootContext();
		(0, vue_exports.watch)(() => props.value, (cur, prev) => {
			const selectProto = (void 0).HTMLSelectElement.prototype;
			const setValue = Object.getOwnPropertyDescriptor(selectProto, "value").set;
			if (cur !== prev && setValue && selectElement.value) {
				const event = new Event("change", { bubbles: true });
				setValue.call(selectElement.value, cur);
				selectElement.value.dispatchEvent(event);
			}
		});
		/**
		* Form autofill will trigger an `input` event on the `select` element.
		* We listen to that event and update our internal state to support it.
		*/
		function handleInput(event) {
			rootContext.onValueChange(event.target.value);
		}
		/**
		* We purposefully use a `select` here to support form autofill as much
		* as possible.
		*
		* We purposefully do not add the `value` attribute here to allow the value
		* to be set programmatically and bubble to any parent form `onChange` event.
		*
		* We use `VisuallyHidden` rather than `display: "none"` because Safari autofill
		* won't work otherwise.
		*/
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(VisuallyHidden_default), { "as-child": "" }, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createElementVNode)("select", (0, vue_exports.mergeProps)({
					ref_key: "selectElement",
					ref: selectElement
				}, props, { onInput: handleInput }), [(0, vue_exports.renderSlot)(_ctx.$slots, "default")], 16)]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectPopperPosition.js
var SelectPopperPosition_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "SelectPopperPosition",
	props: {
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false,
			default: "start"
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false,
			default: 10
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const forwarded = useForwardProps$1(__props);
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(PopperContent_default), (0, vue_exports.mergeProps)((0, vue_exports.unref)(forwarded), { style: {
				"boxSizing": "border-box",
				"--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-select-content-available-width": "var(--reka-popper-available-width)",
				"--reka-select-content-available-height": "var(--reka-popper-available-height)",
				"--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectContentImpl.js
var SelectContentDefaultContextValue = {
	onViewportChange: () => {},
	itemTextRefCallback: () => {},
	itemRefCallback: () => {}
};
var [injectSelectContentContext, provideSelectContentContext] = /*#__PURE__*/ createContext("SelectContent");
var SelectContentImpl_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "SelectContentImpl",
	props: {
		position: {
			type: String,
			required: false,
			default: "item-aligned"
		},
		bodyLock: {
			type: Boolean,
			required: false,
			default: true
		},
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false,
			default: "start"
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: [
		"closeAutoFocus",
		"escapeKeyDown",
		"pointerDownOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectSelectRootContext();
		useFocusGuards();
		useBodyScrollLock(props.bodyLock);
		const { CollectionSlot, getItems } = useCollection();
		const content = (0, vue_exports.ref)();
		useHideOthers(content);
		const { search, handleTypeaheadSearch } = useTypeahead();
		const viewport = (0, vue_exports.ref)();
		const selectedItem = (0, vue_exports.ref)();
		const selectedItemText = (0, vue_exports.ref)();
		const isPositioned = (0, vue_exports.ref)(false);
		const firstValidItemFoundRef = (0, vue_exports.ref)(false);
		const firstSelectedItemInArrayFoundRef = (0, vue_exports.ref)(false);
		function focusSelectedItem() {
			if (selectedItem.value && content.value) focusFirst([selectedItem.value, content.value]);
		}
		(0, vue_exports.watch)(isPositioned, () => {
			focusSelectedItem();
		});
		const { onOpenChange, triggerPointerDownPosRef } = rootContext;
		(0, vue_exports.watchEffect)((cleanupFn) => {
			if (!content.value) return;
			let pointerMoveDelta = {
				x: 0,
				y: 0
			};
			const handlePointerMove = (event) => {
				pointerMoveDelta = {
					x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.value?.x ?? 0)),
					y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.value?.y ?? 0))
				};
			};
			const handlePointerUp = (event) => {
				if (event.pointerType === "touch") return;
				if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) event.preventDefault();
				else if (!content.value?.contains(event.target)) onOpenChange(false);
				(void 0).removeEventListener("pointermove", handlePointerMove);
				triggerPointerDownPosRef.value = null;
			};
			if (triggerPointerDownPosRef.value !== null) {
				(void 0).addEventListener("pointermove", handlePointerMove);
				(void 0).addEventListener("pointerup", handlePointerUp, {
					capture: true,
					once: true
				});
			}
			cleanupFn(() => {
				(void 0).removeEventListener("pointermove", handlePointerMove);
				(void 0).removeEventListener("pointerup", handlePointerUp, { capture: true });
			});
		});
		function handleKeyDown(event) {
			const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
			if (event.key === "Tab") event.preventDefault();
			if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key, getItems());
			if ([
				"ArrowUp",
				"ArrowDown",
				"Home",
				"End"
			].includes(event.key)) {
				let candidateNodes = [...getItems().map((i) => i.ref)];
				if (["ArrowUp", "End"].includes(event.key)) candidateNodes = candidateNodes.slice().reverse();
				if (["ArrowUp", "ArrowDown"].includes(event.key)) {
					const currentElement = event.target;
					const currentIndex = candidateNodes.indexOf(currentElement);
					candidateNodes = candidateNodes.slice(currentIndex + 1);
				}
				setTimeout(() => focusFirst(candidateNodes));
				event.preventDefault();
			}
		}
		const forwardedProps = useForwardProps$1((0, vue_exports.computed)(() => {
			if (props.position === "popper") return props;
			else return {};
		}).value);
		provideSelectContentContext({
			content,
			viewport,
			onViewportChange: (node) => {
				viewport.value = node;
			},
			itemRefCallback: (node, value, disabled) => {
				const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
				const isSelectedItem = valueComparator(rootContext.modelValue.value, value, rootContext.by);
				if (rootContext.multiple.value) {
					if (firstSelectedItemInArrayFoundRef.value) return;
					if (isSelectedItem || isFirstValidItem) {
						selectedItem.value = node;
						if (isSelectedItem) firstSelectedItemInArrayFoundRef.value = true;
					}
				} else if (isSelectedItem || isFirstValidItem) selectedItem.value = node;
				if (isFirstValidItem) firstValidItemFoundRef.value = true;
			},
			selectedItem,
			selectedItemText,
			onItemLeave: () => {
				content.value?.focus();
			},
			itemTextRefCallback: (node, value, disabled) => {
				const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
				if (valueComparator(rootContext.modelValue.value, value, rootContext.by) || isFirstValidItem) selectedItemText.value = node;
			},
			focusSelectedItem,
			position: props.position,
			isPositioned,
			searchRef: search
		});
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(CollectionSlot), null, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(FocusScope_default), {
					"as-child": "",
					onMountAutoFocus: _cache[6] || (_cache[6] = (0, vue_exports.withModifiers)(() => {}, ["prevent"])),
					onUnmountAutoFocus: _cache[7] || (_cache[7] = (event) => {
						emits("closeAutoFocus", event);
						if (event.defaultPrevented) return;
						(0, vue_exports.unref)(rootContext).triggerElement.value?.focus({ preventScroll: true });
						event.preventDefault();
					})
				}, {
					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(DismissableLayer_default), {
						"as-child": "",
						"disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
						onFocusOutside: _cache[2] || (_cache[2] = (0, vue_exports.withModifiers)(() => {}, ["prevent"])),
						onDismiss: _cache[3] || (_cache[3] = ($event) => (0, vue_exports.unref)(rootContext).onOpenChange(false)),
						onEscapeKeyDown: _cache[4] || (_cache[4] = ($event) => emits("escapeKeyDown", $event)),
						onPointerDownOutside: _cache[5] || (_cache[5] = ($event) => emits("pointerDownOutside", $event))
					}, {
						default: (0, vue_exports.withCtx)(() => [((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.resolveDynamicComponent)(_ctx.position === "popper" ? SelectPopperPosition_default : SelectItemAlignedPosition_default), (0, vue_exports.mergeProps)({
							..._ctx.$attrs,
							...(0, vue_exports.unref)(forwardedProps)
						}, {
							id: (0, vue_exports.unref)(rootContext).contentId,
							ref: (vnode) => {
								if (!vnode) return void 0;
								const el = (0, vue_exports.unref)(unrefElement)(vnode);
								if (el?.hasAttribute("data-reka-popper-content-wrapper")) content.value = el.firstElementChild;
								else content.value = el;
							},
							role: "listbox",
							"data-state": (0, vue_exports.unref)(rootContext).open.value ? "open" : "closed",
							dir: (0, vue_exports.unref)(rootContext).dir.value,
							style: {
								display: "flex",
								flexDirection: "column",
								outline: "none"
							},
							onContextmenu: _cache[0] || (_cache[0] = (0, vue_exports.withModifiers)(() => {}, ["prevent"])),
							onPlaced: _cache[1] || (_cache[1] = ($event) => isPositioned.value = true),
							onKeydown: handleKeyDown
						}), {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
							_: 3
						}, 16, [
							"id",
							"data-state",
							"dir",
							"onKeydown"
						]))]),
						_: 3
					}, 8, ["disable-outside-pointer-events"])]),
					_: 3
				})]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectItemAlignedPosition.js
var [injectSelectItemAlignedPositionContext, provideSelectItemAlignedPositionContext] = /*#__PURE__*/ createContext("SelectItemAlignedPosition");
var SelectItemAlignedPosition_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	inheritAttrs: false,
	__name: "SelectItemAlignedPosition",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["placed"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { getItems } = useCollection();
		const rootContext = injectSelectRootContext();
		const contentContext = injectSelectContentContext();
		const shouldExpandOnScrollRef = (0, vue_exports.ref)(false);
		const shouldRepositionRef = (0, vue_exports.ref)(true);
		const contentWrapperElement = (0, vue_exports.ref)();
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
		function position() {
			if (rootContext.triggerElement.value && rootContext.valueElement.value && contentWrapperElement.value && contentElement.value && viewport?.value && selectedItem?.value && selectedItemText?.value) {
				const triggerRect = rootContext.triggerElement.value.getBoundingClientRect();
				const contentRect = contentElement.value.getBoundingClientRect();
				const valueNodeRect = rootContext.valueElement.value.getBoundingClientRect();
				const itemTextRect = selectedItemText.value.getBoundingClientRect();
				if (rootContext.dir.value !== "rtl") {
					const itemTextOffset = itemTextRect.left - contentRect.left;
					const left = valueNodeRect.left - itemTextOffset;
					const leftDelta = triggerRect.left - left;
					const minContentWidth = triggerRect.width + leftDelta;
					const contentWidth = Math.max(minContentWidth, contentRect.width);
					const rightEdge = (void 0).innerWidth - 10;
					const clampedLeft = clamp(left, 10, Math.max(10, rightEdge - contentWidth));
					contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
					contentWrapperElement.value.style.left = `${clampedLeft}px`;
				} else {
					const itemTextOffset = contentRect.right - itemTextRect.right;
					const right = (void 0).innerWidth - valueNodeRect.right - itemTextOffset;
					const rightDelta = (void 0).innerWidth - triggerRect.right - right;
					const minContentWidth = triggerRect.width + rightDelta;
					const contentWidth = Math.max(minContentWidth, contentRect.width);
					const leftEdge = (void 0).innerWidth - 10;
					const clampedRight = clamp(right, 10, Math.max(10, leftEdge - contentWidth));
					contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
					contentWrapperElement.value.style.right = `${clampedRight}px`;
				}
				const items = getItems().map((i) => i.ref);
				const availableHeight = (void 0).innerHeight - 20;
				const itemsHeight = viewport.value.scrollHeight;
				const contentStyles = (void 0).getComputedStyle(contentElement.value);
				const contentBorderTopWidth = Number.parseInt(contentStyles.borderTopWidth, 10);
				const contentPaddingTop = Number.parseInt(contentStyles.paddingTop, 10);
				const contentBorderBottomWidth = Number.parseInt(contentStyles.borderBottomWidth, 10);
				const contentPaddingBottom = Number.parseInt(contentStyles.paddingBottom, 10);
				const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
				const minContentHeight = Math.min(selectedItem.value.offsetHeight * 5, fullContentHeight);
				const viewportStyles = (void 0).getComputedStyle(viewport.value);
				const viewportPaddingTop = Number.parseInt(viewportStyles.paddingTop, 10);
				const viewportPaddingBottom = Number.parseInt(viewportStyles.paddingBottom, 10);
				const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - 10;
				const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
				const selectedItemHalfHeight = selectedItem.value.offsetHeight / 2;
				const itemOffsetMiddle = selectedItem.value.offsetTop + selectedItemHalfHeight;
				const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
				const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
				if (contentTopToItemMiddle <= topEdgeToTriggerMiddle) {
					const isLastItem = selectedItem.value === items.at(-1);
					contentWrapperElement.value.style.bottom = `0px`;
					const viewportOffsetBottom = contentElement.value.clientHeight - viewport.value.offsetTop - viewport.value.offsetHeight;
					const height = contentTopToItemMiddle + Math.max(triggerMiddleToBottomEdge, selectedItemHalfHeight + (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth);
					contentWrapperElement.value.style.height = `${height}px`;
				} else {
					const isFirstItem = selectedItem.value === items[0];
					contentWrapperElement.value.style.top = `0px`;
					const height = Math.max(topEdgeToTriggerMiddle, contentBorderTopWidth + viewport.value.offsetTop + (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight) + itemMiddleToContentBottom;
					contentWrapperElement.value.style.height = `${height}px`;
					viewport.value.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.value.offsetTop;
				}
				contentWrapperElement.value.style.margin = `10px 0`;
				contentWrapperElement.value.style.minHeight = `${minContentHeight}px`;
				contentWrapperElement.value.style.maxHeight = `${availableHeight}px`;
				emits("placed");
				requestAnimationFrame(() => shouldExpandOnScrollRef.value = true);
			}
		}
		const contentZIndex = (0, vue_exports.ref)("");
		function handleScrollButtonChange(node) {
			if (node && shouldRepositionRef.value === true) {
				position();
				focusSelectedItem?.();
				shouldRepositionRef.value = false;
			}
		}
		useResizeObserver(rootContext.triggerElement, () => {
			position();
		});
		provideSelectItemAlignedPositionContext({
			contentWrapper: contentWrapperElement,
			shouldExpandOnScrollRef,
			onScrollButtonChange: handleScrollButtonChange
		});
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createElementBlock)("div", {
				ref_key: "contentWrapperElement",
				ref: contentWrapperElement,
				style: (0, vue_exports.normalizeStyle)({
					display: "flex",
					flexDirection: "column",
					position: "fixed",
					zIndex: contentZIndex.value
				})
			}, [(0, vue_exports.createVNode)((0, vue_exports.unref)(Primitive), (0, vue_exports.mergeProps)({
				ref: (0, vue_exports.unref)(forwardRef),
				style: {
					boxSizing: "border-box",
					maxHeight: "100%"
				}
			}, {
				..._ctx.$attrs,
				...props
			}), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16)], 4);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectArrow.js
var SelectArrow_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "SelectArrow",
	props: {
		width: {
			type: Number,
			required: false,
			default: 10
		},
		height: {
			type: Number,
			required: false,
			default: 5
		},
		rounded: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "svg"
		}
	},
	setup(__props) {
		const props = __props;
		const contentContext = injectSelectContentContext(SelectContentDefaultContextValue);
		return (_ctx, _cache) => {
			return (0, vue_exports.unref)(contentContext).position === "popper" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(PopperArrow_default), (0, vue_exports.normalizeProps)((0, vue_exports.mergeProps)({ key: 0 }, props)), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16)) : (0, vue_exports.createCommentVNode)("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectProvider.js
var SelectProvider_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	inheritAttrs: false,
	__name: "SelectProvider",
	props: { context: {
		type: Object,
		required: true
	} },
	setup(__props) {
		provideSelectRootContext(__props.context);
		provideSelectContentContext(SelectContentDefaultContextValue);
		return (_ctx, _cache) => {
			return (0, vue_exports.renderSlot)(_ctx.$slots, "default");
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectContent.js
var _hoisted_1 = { key: 1 };
var SelectContent_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	inheritAttrs: false,
	__name: "SelectContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		position: {
			type: String,
			required: false
		},
		bodyLock: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"closeAutoFocus",
		"escapeKeyDown",
		"pointerDownOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const forwarded = useForwardPropsEmits(props, __emit);
		const rootContext = injectSelectRootContext();
		const fragment = (0, vue_exports.ref)();
		const presenceRef = (0, vue_exports.ref)();
		const present = (0, vue_exports.computed)(() => props.forceMount || rootContext.open.value);
		const renderPresence = (0, vue_exports.ref)(present.value);
		let renderPresenceTimeout;
		function clearRenderPresenceTimeout() {
			if (renderPresenceTimeout) {
				clearTimeout(renderPresenceTimeout);
				renderPresenceTimeout = void 0;
			}
		}
		(0, vue_exports.watch)(present, (_value, _oldValue, onCleanup) => {
			clearRenderPresenceTimeout();
			renderPresenceTimeout = setTimeout(() => {
				renderPresence.value = present.value;
				renderPresenceTimeout = void 0;
			});
			onCleanup(clearRenderPresenceTimeout);
		});
		return (_ctx, _cache) => {
			return present.value || renderPresence.value || presenceRef.value?.present ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Presence_default), {
				key: 0,
				ref_key: "presenceRef",
				ref: presenceRef,
				present: present.value
			}, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(SelectContentImpl_default, (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)({
					...(0, vue_exports.unref)(forwarded),
					..._ctx.$attrs
				})), {
					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
					_: 3
				}, 16)]),
				_: 3
			}, 8, ["present"])) : fragment.value ? ((0, vue_exports.openBlock)(), (0, vue_exports.createElementBlock)("div", _hoisted_1, [((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(vue_exports.Teleport, { to: fragment.value }, [(0, vue_exports.createVNode)(SelectProvider_default, { context: (0, vue_exports.unref)(rootContext) }, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["context"])], 8, ["to"]))])) : (0, vue_exports.createCommentVNode)("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectGroup.js
var [injectSelectGroupContext, provideSelectGroupContext] = /*#__PURE__*/ createContext("SelectGroup");
var SelectGroup_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "SelectGroup",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const id = useId(void 0, "reka-select-group");
		provideSelectGroupContext({ id });
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Primitive), (0, vue_exports.mergeProps)({ role: "group" }, props, { "aria-labelledby": (0, vue_exports.unref)(id) }), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["aria-labelledby"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectItem.js
var [injectSelectItemContext, provideSelectItemContext] = /*#__PURE__*/ createContext("SelectItem");
var SelectItem_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "SelectItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { disabled } = (0, vue_exports.toRefs)(props);
		const rootContext = injectSelectRootContext();
		const contentContext = injectSelectContentContext();
		const { forwardRef} = useForwardExpose();
		const { CollectionItem } = useCollection();
		const isSelected = (0, vue_exports.computed)(() => valueComparator(rootContext.modelValue?.value, props.value, rootContext.by));
		const isFocused = (0, vue_exports.ref)(false);
		const textValue = (0, vue_exports.ref)(props.textValue ?? "");
		const textId = useId(void 0, "reka-select-item-text");
		const SELECT_SELECT = "select.select";
		async function handleSelectCustomEvent(ev) {
			if (ev.defaultPrevented) return;
			const eventDetail = {
				originalEvent: ev,
				value: props.value
			};
			handleAndDispatchCustomEvent(SELECT_SELECT, handleSelect, eventDetail);
		}
		async function handleSelect(ev) {
			await (0, vue_exports.nextTick)();
			emits("select", ev);
			if (ev.defaultPrevented) return;
			if (!disabled.value) {
				rootContext.onValueChange(props.value);
				if (!rootContext.multiple.value) rootContext.onOpenChange(false);
			}
		}
		async function handlePointerMove(event) {
			await (0, vue_exports.nextTick)();
			if (event.defaultPrevented) return;
			if (disabled.value) contentContext.onItemLeave?.();
			else event.currentTarget?.focus({ preventScroll: true });
		}
		async function handlePointerLeave(event) {
			await (0, vue_exports.nextTick)();
			if (event.defaultPrevented) return;
			if (event.currentTarget === getActiveElement()) contentContext.onItemLeave?.();
		}
		async function handleKeyDown(event) {
			await (0, vue_exports.nextTick)();
			if (event.defaultPrevented) return;
			if (contentContext.searchRef?.value !== "" && event.key === " ") return;
			if (SELECTION_KEYS.includes(event.key)) handleSelectCustomEvent(event);
			if (event.key === " ") event.preventDefault();
		}
		if (props.value === "") throw new Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
		provideSelectItemContext({
			value: props.value,
			disabled,
			textId,
			isSelected,
			onItemTextChange: (node) => {
				textValue.value = ((textValue.value || node?.textContent) ?? "").trim();
			}
		});
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(CollectionItem), { value: { textValue: textValue.value } }, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(Primitive), {
					ref: (0, vue_exports.unref)(forwardRef),
					role: "option",
					"aria-labelledby": (0, vue_exports.unref)(textId),
					"data-highlighted": isFocused.value ? "" : void 0,
					"aria-selected": isSelected.value,
					"data-state": isSelected.value ? "checked" : "unchecked",
					"aria-disabled": (0, vue_exports.unref)(disabled) || void 0,
					"data-disabled": (0, vue_exports.unref)(disabled) ? "" : void 0,
					tabindex: (0, vue_exports.unref)(disabled) ? void 0 : -1,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					onFocus: _cache[0] || (_cache[0] = ($event) => isFocused.value = true),
					onBlur: _cache[1] || (_cache[1] = ($event) => isFocused.value = false),
					onPointerup: handleSelectCustomEvent,
					onPointerdown: _cache[2] || (_cache[2] = (event) => {
						event.currentTarget.focus({ preventScroll: true });
					}),
					onTouchend: _cache[3] || (_cache[3] = (0, vue_exports.withModifiers)(() => {}, ["prevent", "stop"])),
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onKeydown: handleKeyDown
				}, {
					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"aria-labelledby",
					"data-highlighted",
					"aria-selected",
					"data-state",
					"aria-disabled",
					"data-disabled",
					"tabindex",
					"as",
					"as-child"
				])]),
				_: 3
			}, 8, ["value"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectItemIndicator.js
var SelectItemIndicator_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "SelectItemIndicator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const itemContext = injectSelectItemContext();
		return (_ctx, _cache) => {
			return (0, vue_exports.unref)(itemContext).isSelected.value ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Primitive), (0, vue_exports.mergeProps)({
				key: 0,
				"aria-hidden": "true"
			}, props), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16)) : (0, vue_exports.createCommentVNode)("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectItemText.js
var SelectItemText_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	inheritAttrs: false,
	__name: "SelectItemText",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		injectSelectRootContext();
		injectSelectContentContext();
		const itemContext = injectSelectItemContext();
		const { forwardRef, currentElement: itemTextElement } = useForwardExpose();
		(0, vue_exports.computed)(() => {
			return {
				value: itemContext.value,
				disabled: itemContext.disabled.value,
				textContent: itemTextElement.value?.textContent ?? itemContext.value?.toString() ?? ""
			};
		});
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Primitive), (0, vue_exports.mergeProps)({
				id: (0, vue_exports.unref)(itemContext).textId,
				ref: (0, vue_exports.unref)(forwardRef)
			}, {
				...props,
				..._ctx.$attrs
			}), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectLabel.js
var SelectLabel_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "SelectLabel",
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
			default: "div"
		}
	},
	setup(__props) {
		const props = __props;
		const groupContext = injectSelectGroupContext({ id: "" });
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Primitive), (0, vue_exports.mergeProps)(props, { id: (0, vue_exports.unref)(groupContext).id }), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectPortal.js
var SelectPortal_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "SelectPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Teleport_default), (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)(props)), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectSeparator.js
var SelectSeparator_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "SelectSeparator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Primitive), (0, vue_exports.mergeProps)({ "aria-hidden": "true" }, props), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectTrigger.js
var SelectTrigger_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "SelectTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectSelectRootContext();
		const { forwardRef} = useForwardExpose();
		const isDisabled = (0, vue_exports.computed)(() => rootContext.disabled?.value || props.disabled);
		rootContext.contentId ||= useId(void 0, "reka-select-content");
		const { getItems } = useCollection();
		const { search, handleTypeaheadSearch, resetTypeahead } = useTypeahead();
		function handleOpen() {
			if (!isDisabled.value) {
				rootContext.onOpenChange(true);
				resetTypeahead();
			}
		}
		function handlePointerOpen(event) {
			handleOpen();
			rootContext.triggerPointerDownPosRef.value = {
				x: Math.round(event.pageX),
				y: Math.round(event.pageY)
			};
		}
		function isPlainLeftClick(event) {
			return event.button === 0 && event.ctrlKey === false;
		}
		let openedFromPointerDown = false;
		function onTriggerPointerDown(event) {
			if (event.pointerType === "touch") return event.preventDefault();
			const target = event.target;
			if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
			if (isPlainLeftClick(event)) {
				handlePointerOpen(event);
				openedFromPointerDown = true;
			}
		}
		function onTriggerMouseDown(event) {
			if (isPlainLeftClick(event)) event.preventDefault();
		}
		function onTriggerClick(event) {
			if (!openedFromPointerDown) event.currentTarget?.focus();
			openedFromPointerDown = false;
		}
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(PopperAnchor_default), {
				"as-child": "",
				reference: _ctx.reference
			}, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(Primitive), {
					ref: (0, vue_exports.unref)(forwardRef),
					role: "combobox",
					type: _ctx.as === "button" ? "button" : void 0,
					"aria-controls": (0, vue_exports.unref)(rootContext).contentId,
					"aria-expanded": (0, vue_exports.unref)(rootContext).open.value || false,
					"aria-required": (0, vue_exports.unref)(rootContext).required?.value,
					"aria-autocomplete": "none",
					disabled: isDisabled.value,
					dir: (0, vue_exports.unref)(rootContext)?.dir.value,
					"data-state": (0, vue_exports.unref)(rootContext)?.open.value ? "open" : "closed",
					"data-disabled": isDisabled.value ? "" : void 0,
					"data-placeholder": (0, vue_exports.unref)(shouldShowPlaceholder)((0, vue_exports.unref)(rootContext).modelValue?.value) ? "" : void 0,
					"as-child": _ctx.asChild,
					as: _ctx.as,
					onClick: onTriggerClick,
					onPointerdown: onTriggerPointerDown,
					onMousedown: onTriggerMouseDown,
					onPointerup: _cache[0] || (_cache[0] = (0, vue_exports.withModifiers)((event) => {
						if (event.pointerType === "touch") handlePointerOpen(event);
					}, ["prevent"])),
					onKeydown: _cache[1] || (_cache[1] = (event) => {
						const isTypingAhead = (0, vue_exports.unref)(search) !== "";
						if (!(event.ctrlKey || event.altKey || event.metaKey) && event.key.length === 1) {
							if (isTypingAhead && event.key === " ") return;
						}
						(0, vue_exports.unref)(handleTypeaheadSearch)(event.key, (0, vue_exports.unref)(getItems)());
						if ((0, vue_exports.unref)(OPEN_KEYS).includes(event.key)) {
							handleOpen();
							event.preventDefault();
						}
					})
				}, {
					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"type",
					"aria-controls",
					"aria-expanded",
					"aria-required",
					"disabled",
					"dir",
					"data-state",
					"data-disabled",
					"data-placeholder",
					"as-child",
					"as"
				])]),
				_: 3
			}, 8, ["reference"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectValue.js
var SelectValue_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "SelectValue",
	props: {
		placeholder: {
			type: String,
			required: false,
			default: ""
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef} = useForwardExpose();
		const rootContext = injectSelectRootContext();
		const selectedLabel = (0, vue_exports.computed)(() => {
			let list = [];
			const options = Array.from(rootContext.optionsSet.value);
			const getOption = (value) => options.find((option) => valueComparator(value, option.value, rootContext.by));
			if (Array.isArray(rootContext.modelValue.value)) list = rootContext.modelValue.value.map((value) => getOption(value)?.textContent ?? "");
			else list = [getOption(rootContext.modelValue.value)?.textContent ?? ""];
			return list.filter(Boolean);
		});
		const slotText = (0, vue_exports.computed)(() => {
			return selectedLabel.value.length ? selectedLabel.value.join(", ") : props.placeholder;
		});
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Primitive), {
				ref: (0, vue_exports.unref)(forwardRef),
				as: _ctx.as,
				"as-child": _ctx.asChild,
				style: { pointerEvents: "none" },
				"data-placeholder": selectedLabel.value.length ? void 0 : props.placeholder
			}, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default", {
					selectedLabel: selectedLabel.value,
					modelValue: (0, vue_exports.unref)(rootContext).modelValue.value
				}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(slotText.value), 1)])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"data-placeholder"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectViewport.js
var SelectViewport_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "SelectViewport",
	props: {
		nonce: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const { nonce: propNonce } = (0, vue_exports.toRefs)(props);
		const nonce = useNonce(propNonce);
		const alignedPositionContext = injectSelectContentContext().position === "item-aligned" ? injectSelectItemAlignedPositionContext() : void 0;
		const { forwardRef} = useForwardExpose();
		const prevScrollTopRef = (0, vue_exports.ref)(0);
		function handleScroll(event) {
			const viewport = event.currentTarget;
			const { shouldExpandOnScrollRef, contentWrapper } = alignedPositionContext ?? {};
			if (shouldExpandOnScrollRef?.value && contentWrapper?.value) {
				const scrolledBy = Math.abs(prevScrollTopRef.value - viewport.scrollTop);
				if (scrolledBy > 0) {
					const availableHeight = (void 0).innerHeight - 20;
					const cssMinHeight = Number.parseFloat(contentWrapper.value.style.minHeight);
					const cssHeight = Number.parseFloat(contentWrapper.value.style.height);
					const prevHeight = Math.max(cssMinHeight, cssHeight);
					if (prevHeight < availableHeight) {
						const nextHeight = prevHeight + scrolledBy;
						const clampedNextHeight = Math.min(availableHeight, nextHeight);
						const heightDiff = nextHeight - clampedNextHeight;
						contentWrapper.value.style.height = `${clampedNextHeight}px`;
						if (contentWrapper.value.style.bottom === "0px") {
							viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
							contentWrapper.value.style.justifyContent = "flex-end";
						}
					}
				}
			}
			prevScrollTopRef.value = viewport.scrollTop;
		}
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createElementBlock)(vue_exports.Fragment, null, [(0, vue_exports.createVNode)((0, vue_exports.unref)(Primitive), (0, vue_exports.mergeProps)({
				ref: (0, vue_exports.unref)(forwardRef),
				"data-reka-select-viewport": "",
				role: "presentation"
			}, {
				..._ctx.$attrs,
				...props
			}, {
				style: {
					position: "relative",
					flex: 1,
					overflow: "hidden auto"
				},
				onScroll: handleScroll
			}), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16), (0, vue_exports.createVNode)((0, vue_exports.unref)(Primitive), {
				as: "style",
				nonce: (0, vue_exports.unref)(nonce)
			}, {
				default: (0, vue_exports.withCtx)(() => _cache[0] || (_cache[0] = [(0, vue_exports.createTextVNode)(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")])),
				_: 1,
				__: [0]
			}, 8, ["nonce"])], 64);
		};
	}
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fselect.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fselect_default = {
	"slots": {
		"base": ["relative group rounded-md inline-flex items-center disabled:cursor-not-allowed disabled:opacity-75", "transition-colors"],
		"leading": "absolute inset-y-0 start-0 flex items-center",
		"leadingIcon": "shrink-0 text-dimmed",
		"leadingAvatar": "shrink-0",
		"leadingAvatarSize": "",
		"trailing": "absolute inset-y-0 end-0 flex items-center",
		"trailingIcon": "shrink-0 text-dimmed",
		"value": "truncate pointer-events-none",
		"placeholder": "truncate text-dimmed",
		"arrow": "fill-bg stroke-default",
		"content": "max-h-[min(15rem,var(--reka-select-content-available-height,15rem))] w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
		"viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
		"group": "p-1 isolate",
		"empty": "text-center text-muted",
		"label": "font-semibold text-highlighted",
		"separator": "-mx-1 my-1 h-px bg-border",
		"item": ["group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50", "transition-colors before:transition-colors"],
		"itemLeadingIcon": ["shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default", "transition-colors"],
		"itemLeadingAvatar": "shrink-0",
		"itemLeadingAvatarSize": "",
		"itemLeadingChip": "shrink-0",
		"itemLeadingChipSize": "",
		"itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
		"itemTrailingIcon": "shrink-0",
		"itemWrapper": "flex-1 flex flex-col min-w-0",
		"itemLabel": "truncate",
		"itemDescription": "truncate text-muted"
	},
	"variants": {
		"fieldGroup": {
			"horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
			"vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
		},
		"size": {
			"xs": {
				"base": "px-2 py-1 text-xs gap-1",
				"leading": "ps-2",
				"trailing": "pe-2",
				"leadingIcon": "size-4",
				"leadingAvatarSize": "3xs",
				"trailingIcon": "size-4",
				"label": "p-1 text-[10px]/3 gap-1",
				"item": "p-1 text-xs gap-1",
				"itemLeadingIcon": "size-4",
				"itemLeadingAvatarSize": "3xs",
				"itemLeadingChip": "size-4",
				"itemLeadingChipSize": "sm",
				"itemTrailingIcon": "size-4",
				"empty": "p-2 text-xs"
			},
			"sm": {
				"base": "px-2.5 py-1.5 text-xs gap-1.5",
				"leading": "ps-2.5",
				"trailing": "pe-2.5",
				"leadingIcon": "size-4",
				"leadingAvatarSize": "3xs",
				"trailingIcon": "size-4",
				"label": "p-1.5 text-[10px]/3 gap-1.5",
				"item": "p-1.5 text-xs gap-1.5",
				"itemLeadingIcon": "size-4",
				"itemLeadingAvatarSize": "3xs",
				"itemLeadingChip": "size-4",
				"itemLeadingChipSize": "sm",
				"itemTrailingIcon": "size-4",
				"empty": "p-2.5 text-xs"
			},
			"md": {
				"base": "px-2.5 py-1.5 text-sm gap-1.5",
				"leading": "ps-2.5",
				"trailing": "pe-2.5",
				"leadingIcon": "size-5",
				"leadingAvatarSize": "2xs",
				"trailingIcon": "size-5",
				"label": "p-1.5 text-xs gap-1.5",
				"item": "p-1.5 text-sm gap-1.5",
				"itemLeadingIcon": "size-5",
				"itemLeadingAvatarSize": "2xs",
				"itemLeadingChip": "size-5",
				"itemLeadingChipSize": "md",
				"itemTrailingIcon": "size-5",
				"empty": "p-2.5 text-sm"
			},
			"lg": {
				"base": "px-3 py-2 text-sm gap-2",
				"leading": "ps-3",
				"trailing": "pe-3",
				"leadingIcon": "size-5",
				"leadingAvatarSize": "2xs",
				"trailingIcon": "size-5",
				"label": "p-2 text-xs gap-2",
				"item": "p-2 text-sm gap-2",
				"itemLeadingIcon": "size-5",
				"itemLeadingAvatarSize": "2xs",
				"itemLeadingChip": "size-5",
				"itemLeadingChipSize": "md",
				"itemTrailingIcon": "size-5",
				"empty": "p-3 text-sm"
			},
			"xl": {
				"base": "px-3 py-2 text-base gap-2",
				"leading": "ps-3",
				"trailing": "pe-3",
				"leadingIcon": "size-6",
				"leadingAvatarSize": "xs",
				"trailingIcon": "size-6",
				"label": "p-2 text-sm gap-2",
				"item": "p-2 text-base gap-2",
				"itemLeadingIcon": "size-6",
				"itemLeadingAvatarSize": "xs",
				"itemLeadingChip": "size-6",
				"itemLeadingChipSize": "lg",
				"itemTrailingIcon": "size-6",
				"empty": "p-3 text-base"
			}
		},
		"variant": {
			"outline": "text-highlighted bg-default ring ring-inset ring-accented hover:bg-elevated disabled:bg-default",
			"soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
			"subtle": "text-highlighted bg-elevated ring ring-inset ring-accented hover:bg-accented/75 disabled:bg-elevated",
			"ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
			"none": "text-highlighted bg-transparent focus:outline-none"
		},
		"color": {
			"primary": "",
			"secondary": "",
			"success": "",
			"info": "",
			"warning": "",
			"error": "",
			"neutral": ""
		},
		"leading": { "true": "" },
		"trailing": { "true": "" },
		"loading": { "true": "" },
		"highlight": { "true": "" },
		"fixed": { "false": "" },
		"type": { "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none" },
		"position": {
			"popper": { "content": "data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]" },
			"item-aligned": { "content": "" }
		},
		"multiple": { "true": "" }
	},
	"compoundVariants": [
		{
			"color": "primary",
			"variant": ["outline", "subtle"],
			"class": "outline-primary/25 focus-visible:outline-3 focus-visible:ring-primary"
		},
		{
			"color": "secondary",
			"variant": ["outline", "subtle"],
			"class": "outline-secondary/25 focus-visible:outline-3 focus-visible:ring-secondary"
		},
		{
			"color": "success",
			"variant": ["outline", "subtle"],
			"class": "outline-success/25 focus-visible:outline-3 focus-visible:ring-success"
		},
		{
			"color": "info",
			"variant": ["outline", "subtle"],
			"class": "outline-info/25 focus-visible:outline-3 focus-visible:ring-info"
		},
		{
			"color": "warning",
			"variant": ["outline", "subtle"],
			"class": "outline-warning/25 focus-visible:outline-3 focus-visible:ring-warning"
		},
		{
			"color": "error",
			"variant": ["outline", "subtle"],
			"class": "outline-error/25 focus-visible:outline-3 focus-visible:ring-error"
		},
		{
			"color": "primary",
			"variant": ["soft", "ghost"],
			"class": "outline-primary/25 focus-visible:outline-3"
		},
		{
			"color": "secondary",
			"variant": ["soft", "ghost"],
			"class": "outline-secondary/25 focus-visible:outline-3"
		},
		{
			"color": "success",
			"variant": ["soft", "ghost"],
			"class": "outline-success/25 focus-visible:outline-3"
		},
		{
			"color": "info",
			"variant": ["soft", "ghost"],
			"class": "outline-info/25 focus-visible:outline-3"
		},
		{
			"color": "warning",
			"variant": ["soft", "ghost"],
			"class": "outline-warning/25 focus-visible:outline-3"
		},
		{
			"color": "error",
			"variant": ["soft", "ghost"],
			"class": "outline-error/25 focus-visible:outline-3"
		},
		{
			"color": "primary",
			"highlight": true,
			"class": "ring ring-inset ring-primary"
		},
		{
			"color": "secondary",
			"highlight": true,
			"class": "ring ring-inset ring-secondary"
		},
		{
			"color": "success",
			"highlight": true,
			"class": "ring ring-inset ring-success"
		},
		{
			"color": "info",
			"highlight": true,
			"class": "ring ring-inset ring-info"
		},
		{
			"color": "warning",
			"highlight": true,
			"class": "ring ring-inset ring-warning"
		},
		{
			"color": "error",
			"highlight": true,
			"class": "ring ring-inset ring-error"
		},
		{
			"color": "neutral",
			"variant": ["outline", "subtle"],
			"class": "outline-inverted/25 focus-visible:outline-3 focus-visible:ring-inverted"
		},
		{
			"color": "neutral",
			"variant": ["soft", "ghost"],
			"class": "outline-inverted/25 focus-visible:outline-3"
		},
		{
			"color": "neutral",
			"highlight": true,
			"class": "ring ring-inset ring-inverted"
		},
		{
			"leading": true,
			"size": "xs",
			"class": "ps-7"
		},
		{
			"leading": true,
			"size": "sm",
			"class": "ps-8"
		},
		{
			"leading": true,
			"size": "md",
			"class": "ps-9"
		},
		{
			"leading": true,
			"size": "lg",
			"class": "ps-10"
		},
		{
			"leading": true,
			"size": "xl",
			"class": "ps-11"
		},
		{
			"trailing": true,
			"size": "xs",
			"class": "pe-7"
		},
		{
			"trailing": true,
			"size": "sm",
			"class": "pe-8"
		},
		{
			"trailing": true,
			"size": "md",
			"class": "pe-9"
		},
		{
			"trailing": true,
			"size": "lg",
			"class": "pe-10"
		},
		{
			"trailing": true,
			"size": "xl",
			"class": "pe-11"
		},
		{
			"loading": true,
			"leading": true,
			"class": { "leadingIcon": "animate-spin" }
		},
		{
			"loading": true,
			"leading": false,
			"trailing": true,
			"class": { "trailingIcon": "animate-spin" }
		},
		{
			"fixed": false,
			"size": "xs",
			"class": "md:text-xs"
		},
		{
			"fixed": false,
			"size": "sm",
			"class": "md:text-xs"
		},
		{
			"fixed": false,
			"size": "md",
			"class": "md:text-sm"
		},
		{
			"fixed": false,
			"size": "lg",
			"class": "md:text-sm"
		}
	],
	"defaultVariants": {
		"size": "md",
		"color": "primary",
		"variant": "outline",
		"position": "popper"
	}
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_34dffa26c25098eb8314796249c1dfc0/node_modules/@nuxt/ui/dist/runtime/components/Select.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "USelect",
	__ssrInlineRender: true,
	props: {
		id: {
			type: String,
			required: false
		},
		placeholder: {
			type: String,
			required: false
		},
		color: {
			type: null,
			required: false
		},
		variant: {
			type: null,
			required: false
		},
		size: {
			type: null,
			required: false
		},
		trailingIcon: {
			type: null,
			required: false
		},
		selectedIcon: {
			type: null,
			required: false
		},
		content: {
			type: Object,
			required: false
		},
		arrow: {
			type: [Boolean, Object],
			required: false
		},
		portal: {
			type: [Boolean, String],
			required: false,
			skipCheck: true,
			default: true
		},
		valueKey: {
			type: null,
			required: false,
			default: "value"
		},
		labelKey: {
			type: null,
			required: false,
			default: "label"
		},
		descriptionKey: {
			type: null,
			required: false,
			default: "description"
		},
		items: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		modelValue: {
			type: null,
			required: false
		},
		modelModifiers: {
			type: null,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		highlight: {
			type: Boolean,
			required: false
		},
		autofocus: {
			type: Boolean,
			required: false
		},
		autofocusDelay: {
			type: Number,
			required: false,
			default: 0
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		open: {
			type: Boolean,
			required: false
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		nullableValue: {
			type: String,
			required: false
		},
		autocomplete: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		},
		icon: {
			type: null,
			required: false
		},
		avatar: {
			type: Object,
			required: false
		},
		leading: {
			type: Boolean,
			required: false
		},
		leadingIcon: {
			type: null,
			required: false
		},
		trailing: {
			type: Boolean,
			required: false
		},
		loading: {
			type: Boolean,
			required: false
		},
		loadingIcon: {
			type: null,
			required: false
		}
	},
	emits: [
		"change",
		"blur",
		"focus",
		"update:modelValue",
		"update:open"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = (0, vue_exports.useSlots)();
		const props = useComponentProps("select", _props);
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "open", "defaultOpen", "disabled", "autocomplete", "required", "multiple", "nullableValue"), emits);
		const portalProps = usePortal((0, vue_exports.toRef)(() => props.portal));
		const position = (0, vue_exports.computed)(() => props.content?.position ?? appConfig.ui?.select?.defaultVariants?.position ?? virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fselect_default.defaultVariants?.position);
		const contentProps = (0, vue_exports.toRef)(() => defu(props.content, {
			side: "bottom",
			sideOffset: 8,
			collisionPadding: 8,
			position: position.value
		}));
		const arrowProps = (0, vue_exports.toRef)(() => defu(props.arrow, { rounded: true }));
		const { emitFormChange, emitFormInput, emitFormBlur, emitFormFocus, size: formFieldSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField(_props);
		const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
		const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons((0, vue_exports.toRef)(() => defu(props, { trailingIcon: appConfig.ui.icons.chevronDown })));
		const selectSize = (0, vue_exports.computed)(() => fieldGroupSize.value || formFieldSize.value);
		const isItemAligned = (0, vue_exports.computed)(() => position.value === "item-aligned");
		const ui = (0, vue_exports.computed)(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fselect_default,
			...appConfig.ui?.select || {}
		})({
			color: color.value ?? props.color,
			variant: props.variant,
			size: selectSize.value ?? props.size,
			loading: props.loading,
			highlight: highlight.value ?? props.highlight,
			leading: isLeading.value || !!props.avatar || !!slots.leading,
			trailing: isTrailing.value || !!slots.trailing,
			fieldGroup: orientation.value,
			position: position.value,
			multiple: props.multiple
		}));
		const groups = (0, vue_exports.computed)(() => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []);
		const items = (0, vue_exports.computed)(() => groups.value.flatMap((group) => group));
		function displayValue(value) {
			if (props.multiple && Array.isArray(value)) {
				const displayedValues = value.map((item) => getDisplayValue(items.value, item, {
					labelKey: props.labelKey,
					valueKey: props.valueKey
				})).filter((v) => v != null && v !== "");
				return displayedValues.length > 0 ? displayedValues.join(", ") : void 0;
			}
			return getDisplayValue(items.value, value, {
				labelKey: props.labelKey,
				valueKey: props.valueKey
			});
		}
		const triggerRef = (0, vue_exports.useTemplateRef)("triggerRef");
		function onUpdate(value) {
			if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) value = value?.trim() ?? null;
			if (props.modelModifiers?.number) value = looseToNumber(value);
			if (props.modelModifiers?.nullable) value ??= null;
			if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) value ??= void 0;
			const event = new Event("change", { target: { value } });
			emits("change", event);
			emitFormChange();
			emitFormInput();
		}
		function onUpdateOpen(value) {
			if (!value) {
				const event = new FocusEvent("blur");
				emits("blur", event);
				emitFormBlur();
			} else {
				const event = new FocusEvent("focus");
				emits("focus", event);
				emitFormFocus();
			}
		}
		function isSelectItem(item) {
			return typeof item === "object" && item !== null;
		}
		function onTriggerClick(open) {
			if (!open) triggerRef.value?.$el?.dispatchEvent(new PointerEvent("pointerdown", {
				bubbles: true,
				button: 0
			}));
		}
		const viewportRef = (0, vue_exports.useTemplateRef)("viewportRef");
		__expose({
			triggerRef: (0, vue_exports.toRef)(() => triggerRef.value?.$el),
			viewportRef: (0, vue_exports.toRef)(() => {
				const instance = viewportRef.value;
				return instance && typeof instance === "object" && "$el" in instance ? instance.$el : instance;
			})
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(SelectRoot_default), (0, vue_exports.mergeProps)({ name: (0, vue_exports.unref)(name) }, (0, vue_exports.unref)(rootProps), {
				autocomplete: (0, vue_exports.unref)(props).autocomplete,
				disabled: (0, vue_exports.unref)(disabled),
				"default-value": (0, vue_exports.unref)(props).defaultValue,
				"model-value": __props.modelValue,
				"onUpdate:modelValue": onUpdate,
				"onUpdate:open": onUpdateOpen
			}, _attrs), {
				default: (0, vue_exports.withCtx)(({ modelValue, open }, _push, _parent, _scopeId) => {
					if (_push) {
						_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(SelectTrigger_default), (0, vue_exports.mergeProps)({
							id: (0, vue_exports.unref)(id),
							ref_key: "triggerRef",
							ref: triggerRef,
							"data-slot": "base",
							class: ui.value.base({ class: [(0, vue_exports.unref)(props).ui?.base, (0, vue_exports.unref)(props).class] })
						}, {
							..._ctx.$attrs,
							...(0, vue_exports.unref)(ariaAttrs)
						}, { onClick: ($event) => onTriggerClick(open) }), {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) {
									if ((0, vue_exports.unref)(isLeading) || !!(0, vue_exports.unref)(props).avatar || !!slots.leading) {
										_push(`<span data-slot="leading" class="${(0, server_renderer_exports.ssrRenderClass)(ui.value.leading({ class: (0, vue_exports.unref)(props).ui?.leading }))}"${_scopeId}>`);
										(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "leading", {
											modelValue,
											open,
											ui: ui.value
										}, () => {
											if ((0, vue_exports.unref)(isLeading) && (0, vue_exports.unref)(leadingIconName)) _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$5, {
												name: (0, vue_exports.unref)(leadingIconName),
												"data-slot": "leadingIcon",
												class: ui.value.leadingIcon({ class: (0, vue_exports.unref)(props).ui?.leadingIcon })
											}, null, _parent, _scopeId));
											else if (!!(0, vue_exports.unref)(props).avatar) _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$3, (0, vue_exports.mergeProps)({ size: (0, vue_exports.unref)(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize() }, (0, vue_exports.unref)(props).avatar, {
												"data-slot": "itemLeadingAvatar",
												class: ui.value.itemLeadingAvatar({ class: (0, vue_exports.unref)(props).ui?.itemLeadingAvatar })
											}), null, _parent, _scopeId));
											else _push(`<!---->`);
										}, _push, _parent, _scopeId);
										_push(`</span>`);
									} else _push(`<!---->`);
									_push(`<!--[-->`);
									(0, server_renderer_exports.ssrRenderList)([displayValue(modelValue)], (displayedModelValue) => {
										_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(SelectValue_default), {
											"data-slot": displayedModelValue != null ? "value" : "placeholder",
											class: displayedModelValue != null ? ui.value.value({ class: (0, vue_exports.unref)(props).ui?.value }) : ui.value.placeholder({ class: (0, vue_exports.unref)(props).ui?.placeholder })
										}, {
											default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
												if (_push) (0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "default", {
													modelValue,
													open,
													ui: ui.value
												}, () => {
													_push(`${(0, server_renderer_exports.ssrInterpolate)(displayedModelValue ?? (0, vue_exports.unref)(props).placeholder ?? "\xA0")}`);
												}, _push, _parent, _scopeId);
												else return [(0, vue_exports.renderSlot)(_ctx.$slots, "default", {
													modelValue,
													open,
													ui: ui.value
												}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(displayedModelValue ?? (0, vue_exports.unref)(props).placeholder ?? "\xA0"), 1)])];
											}),
											_: 2
										}, _parent, _scopeId));
									});
									_push(`<!--]-->`);
									if ((0, vue_exports.unref)(isTrailing) || !!slots.trailing) {
										_push(`<span data-slot="trailing" class="${(0, server_renderer_exports.ssrRenderClass)(ui.value.trailing({ class: (0, vue_exports.unref)(props).ui?.trailing }))}"${_scopeId}>`);
										(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "trailing", {
											modelValue,
											open,
											ui: ui.value
										}, () => {
											if ((0, vue_exports.unref)(trailingIconName)) _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$5, {
												name: (0, vue_exports.unref)(trailingIconName),
												"data-slot": "trailingIcon",
												class: ui.value.trailingIcon({ class: (0, vue_exports.unref)(props).ui?.trailingIcon })
											}, null, _parent, _scopeId));
											else _push(`<!---->`);
										}, _push, _parent, _scopeId);
										_push(`</span>`);
									} else _push(`<!---->`);
								} else return [
									(0, vue_exports.unref)(isLeading) || !!(0, vue_exports.unref)(props).avatar || !!slots.leading ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("span", {
										key: 0,
										"data-slot": "leading",
										class: ui.value.leading({ class: (0, vue_exports.unref)(props).ui?.leading })
									}, [(0, vue_exports.renderSlot)(_ctx.$slots, "leading", {
										modelValue,
										open,
										ui: ui.value
									}, () => [(0, vue_exports.unref)(isLeading) && (0, vue_exports.unref)(leadingIconName) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$5, {
										key: 0,
										name: (0, vue_exports.unref)(leadingIconName),
										"data-slot": "leadingIcon",
										class: ui.value.leadingIcon({ class: (0, vue_exports.unref)(props).ui?.leadingIcon })
									}, null, 8, ["name", "class"])) : !!(0, vue_exports.unref)(props).avatar ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$3, (0, vue_exports.mergeProps)({
										key: 1,
										size: (0, vue_exports.unref)(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
									}, (0, vue_exports.unref)(props).avatar, {
										"data-slot": "itemLeadingAvatar",
										class: ui.value.itemLeadingAvatar({ class: (0, vue_exports.unref)(props).ui?.itemLeadingAvatar })
									}), null, 16, ["size", "class"])) : (0, vue_exports.createCommentVNode)("", true)])], 2)) : (0, vue_exports.createCommentVNode)("", true),
									((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)([displayValue(modelValue)], (displayedModelValue) => {
										return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectValue_default), {
											key: displayedModelValue,
											"data-slot": displayedModelValue != null ? "value" : "placeholder",
											class: displayedModelValue != null ? ui.value.value({ class: (0, vue_exports.unref)(props).ui?.value }) : ui.value.placeholder({ class: (0, vue_exports.unref)(props).ui?.placeholder })
										}, {
											default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default", {
												modelValue,
												open,
												ui: ui.value
											}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(displayedModelValue ?? (0, vue_exports.unref)(props).placeholder ?? "\xA0"), 1)])]),
											_: 2
										}, 1032, ["data-slot", "class"]);
									}), 128)),
									(0, vue_exports.unref)(isTrailing) || !!slots.trailing ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("span", {
										key: 1,
										"data-slot": "trailing",
										class: ui.value.trailing({ class: (0, vue_exports.unref)(props).ui?.trailing })
									}, [(0, vue_exports.renderSlot)(_ctx.$slots, "trailing", {
										modelValue,
										open,
										ui: ui.value
									}, () => [(0, vue_exports.unref)(trailingIconName) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$5, {
										key: 0,
										name: (0, vue_exports.unref)(trailingIconName),
										"data-slot": "trailingIcon",
										class: ui.value.trailingIcon({ class: (0, vue_exports.unref)(props).ui?.trailingIcon })
									}, null, 8, ["name", "class"])) : (0, vue_exports.createCommentVNode)("", true)])], 2)) : (0, vue_exports.createCommentVNode)("", true)
								];
							}),
							_: 2
						}, _parent, _scopeId));
						_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(SelectPortal_default), (0, vue_exports.unref)(portalProps), {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(FieldGroupReset), null, {
									default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
										if (_push) _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(SelectContent_default), (0, vue_exports.mergeProps)({
											"data-slot": "content",
											class: ui.value.content({ class: (0, vue_exports.unref)(props).ui?.content })
										}, contentProps.value), {
											default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
												if (_push) {
													(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "content-top", {}, null, _push, _parent, _scopeId);
													(0, server_renderer_exports.ssrRenderVNode)(_push, (0, vue_exports.createVNode)((0, vue_exports.resolveDynamicComponent)(isItemAligned.value ? (0, vue_exports.unref)(SelectViewport_default) : "div"), {
														ref_key: "viewportRef",
														ref: viewportRef,
														role: "presentation",
														"data-slot": "viewport",
														class: ui.value.viewport({ class: (0, vue_exports.unref)(props).ui?.viewport })
													}, {
														default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
															if (_push) {
																_push(`<!--[-->`);
																(0, server_renderer_exports.ssrRenderList)(groups.value, (group, groupIndex) => {
																	_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(SelectGroup_default), {
																		key: `group-${groupIndex}`,
																		"data-slot": "group",
																		class: ui.value.group({ class: (0, vue_exports.unref)(props).ui?.group })
																	}, {
																		default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
																			if (_push) {
																				_push(`<!--[-->`);
																				(0, server_renderer_exports.ssrRenderList)(group, (item, index) => {
																					_push(`<!--[-->`);
																					if (isSelectItem(item) && item.type === "label") _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(SelectLabel_default), {
																						"data-slot": "label",
																						class: ui.value.label({ class: [
																							(0, vue_exports.unref)(props).ui?.label,
																							item.ui?.label,
																							item.class
																						] })
																					}, {
																						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
																							if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey))}`);
																							else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey)), 1)];
																						}),
																						_: 2
																					}, _parent, _scopeId));
																					else if (isSelectItem(item) && item.type === "separator") _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(SelectSeparator_default), {
																						"data-slot": "separator",
																						class: ui.value.separator({ class: [
																							(0, vue_exports.unref)(props).ui?.separator,
																							item.ui?.separator,
																							item.class
																						] })
																					}, null, _parent, _scopeId));
																					else _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(SelectItem_default), {
																						"data-slot": "item",
																						class: ui.value.item({ class: [
																							(0, vue_exports.unref)(props).ui?.item,
																							isSelectItem(item) && item.ui?.item,
																							isSelectItem(item) && item.class
																						] }),
																						disabled: isSelectItem(item) && item.disabled,
																						value: isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).valueKey) : item,
																						onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
																					}, {
																						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
																							if (_push) (0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "item", {
																								item,
																								index,
																								ui: ui.value
																							}, () => {
																								(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "item-leading", {
																									item,
																									index,
																									ui: ui.value
																								}, () => {
																									if (isSelectItem(item) && item.icon) _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$5, {
																										name: item.icon,
																										"data-slot": "itemLeadingIcon",
																										class: ui.value.itemLeadingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
																									}, null, _parent, _scopeId));
																									else if (isSelectItem(item) && item.avatar) _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$3, (0, vue_exports.mergeProps)({ size: item.ui?.itemLeadingAvatarSize || (0, vue_exports.unref)(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize() }, { ref_for: true }, item.avatar, {
																										"data-slot": "itemLeadingAvatar",
																										class: ui.value.itemLeadingAvatar({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
																									}), null, _parent, _scopeId));
																									else if (isSelectItem(item) && item.chip) _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$4, (0, vue_exports.mergeProps)({
																										size: item.ui?.itemLeadingChipSize || (0, vue_exports.unref)(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																										inset: "",
																										standalone: ""
																									}, { ref_for: true }, item.chip, {
																										"data-slot": "itemLeadingChip",
																										class: ui.value.itemLeadingChip({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
																									}), null, _parent, _scopeId));
																									else _push(`<!---->`);
																								}, _push, _parent, _scopeId);
																								_push(`<span data-slot="itemWrapper" class="${(0, server_renderer_exports.ssrRenderClass)(ui.value.itemWrapper({ class: [(0, vue_exports.unref)(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] }))}"${_scopeId}>`);
																								_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(SelectItemText_default), {
																									"data-slot": "itemLabel",
																									class: ui.value.itemLabel({ class: [(0, vue_exports.unref)(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
																								}, {
																									default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
																										if (_push) (0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "item-label", {
																											item,
																											index
																										}, () => {
																											_push(`${(0, server_renderer_exports.ssrInterpolate)(isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey) : item)}`);
																										}, _push, _parent, _scopeId);
																										else return [(0, vue_exports.renderSlot)(_ctx.$slots, "item-label", {
																											item,
																											index
																										}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey) : item), 1)])];
																									}),
																									_: 2
																								}, _parent, _scopeId));
																								if (isSelectItem(item) && ((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey) || !!slots["item-description"])) {
																									_push(`<span data-slot="itemDescription" class="${(0, server_renderer_exports.ssrRenderClass)(ui.value.itemDescription({ class: [(0, vue_exports.unref)(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] }))}"${_scopeId}>`);
																									(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "item-description", {
																										item,
																										index
																									}, () => {
																										_push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey))}`);
																									}, _push, _parent, _scopeId);
																									_push(`</span>`);
																								} else _push(`<!---->`);
																								_push(`</span><span data-slot="itemTrailing" class="${(0, server_renderer_exports.ssrRenderClass)(ui.value.itemTrailing({ class: [(0, vue_exports.unref)(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] }))}"${_scopeId}>`);
																								(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "item-trailing", {
																									item,
																									index,
																									ui: ui.value
																								}, null, _push, _parent, _scopeId);
																								_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(SelectItemIndicator_default), { "as-child": "" }, {
																									default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
																										if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$5, {
																											name: (0, vue_exports.unref)(props).selectedIcon || (0, vue_exports.unref)(appConfig).ui.icons.check,
																											"data-slot": "itemTrailingIcon",
																											class: ui.value.itemTrailingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																										}, null, _parent, _scopeId));
																										else return [(0, vue_exports.createVNode)(_sfc_main$5, {
																											name: (0, vue_exports.unref)(props).selectedIcon || (0, vue_exports.unref)(appConfig).ui.icons.check,
																											"data-slot": "itemTrailingIcon",
																											class: ui.value.itemTrailingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																										}, null, 8, ["name", "class"])];
																									}),
																									_: 2
																								}, _parent, _scopeId));
																								_push(`</span>`);
																							}, _push, _parent, _scopeId);
																							else return [(0, vue_exports.renderSlot)(_ctx.$slots, "item", {
																								item,
																								index,
																								ui: ui.value
																							}, () => [
																								(0, vue_exports.renderSlot)(_ctx.$slots, "item-leading", {
																									item,
																									index,
																									ui: ui.value
																								}, () => [isSelectItem(item) && item.icon ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$5, {
																									key: 0,
																									name: item.icon,
																									"data-slot": "itemLeadingIcon",
																									class: ui.value.itemLeadingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
																								}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$3, (0, vue_exports.mergeProps)({
																									key: 1,
																									size: item.ui?.itemLeadingAvatarSize || (0, vue_exports.unref)(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
																								}, { ref_for: true }, item.avatar, {
																									"data-slot": "itemLeadingAvatar",
																									class: ui.value.itemLeadingAvatar({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
																								}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$4, (0, vue_exports.mergeProps)({
																									key: 2,
																									size: item.ui?.itemLeadingChipSize || (0, vue_exports.unref)(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																									inset: "",
																									standalone: ""
																								}, { ref_for: true }, item.chip, {
																									"data-slot": "itemLeadingChip",
																									class: ui.value.itemLeadingChip({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
																								}), null, 16, ["size", "class"])) : (0, vue_exports.createCommentVNode)("", true)]),
																								(0, vue_exports.createVNode)("span", {
																									"data-slot": "itemWrapper",
																									class: ui.value.itemWrapper({ class: [(0, vue_exports.unref)(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
																								}, [(0, vue_exports.createVNode)((0, vue_exports.unref)(SelectItemText_default), {
																									"data-slot": "itemLabel",
																									class: ui.value.itemLabel({ class: [(0, vue_exports.unref)(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
																								}, {
																									default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "item-label", {
																										item,
																										index
																									}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey) : item), 1)])]),
																									_: 2
																								}, 1032, ["class"]), isSelectItem(item) && ((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey) || !!slots["item-description"]) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("span", {
																									key: 0,
																									"data-slot": "itemDescription",
																									class: ui.value.itemDescription({ class: [(0, vue_exports.unref)(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
																								}, [(0, vue_exports.renderSlot)(_ctx.$slots, "item-description", {
																									item,
																									index
																								}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey)), 1)])], 2)) : (0, vue_exports.createCommentVNode)("", true)], 2),
																								(0, vue_exports.createVNode)("span", {
																									"data-slot": "itemTrailing",
																									class: ui.value.itemTrailing({ class: [(0, vue_exports.unref)(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
																								}, [(0, vue_exports.renderSlot)(_ctx.$slots, "item-trailing", {
																									item,
																									index,
																									ui: ui.value
																								}), (0, vue_exports.createVNode)((0, vue_exports.unref)(SelectItemIndicator_default), { "as-child": "" }, {
																									default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$5, {
																										name: (0, vue_exports.unref)(props).selectedIcon || (0, vue_exports.unref)(appConfig).ui.icons.check,
																										"data-slot": "itemTrailingIcon",
																										class: ui.value.itemTrailingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																									}, null, 8, ["name", "class"])]),
																									_: 2
																								}, 1024)], 2)
																							])];
																						}),
																						_: 2
																					}, _parent, _scopeId));
																					_push(`<!--]-->`);
																				});
																				_push(`<!--]-->`);
																			} else return [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(group, (item, index) => {
																				return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(vue_exports.Fragment, { key: `group-${groupIndex}-${index}` }, [isSelectItem(item) && item.type === "label" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectLabel_default), {
																					key: 0,
																					"data-slot": "label",
																					class: ui.value.label({ class: [
																						(0, vue_exports.unref)(props).ui?.label,
																						item.ui?.label,
																						item.class
																					] })
																				}, {
																					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey)), 1)]),
																					_: 2
																				}, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectSeparator_default), {
																					key: 1,
																					"data-slot": "separator",
																					class: ui.value.separator({ class: [
																						(0, vue_exports.unref)(props).ui?.separator,
																						item.ui?.separator,
																						item.class
																					] })
																				}, null, 8, ["class"])) : ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectItem_default), {
																					key: 2,
																					"data-slot": "item",
																					class: ui.value.item({ class: [
																						(0, vue_exports.unref)(props).ui?.item,
																						isSelectItem(item) && item.ui?.item,
																						isSelectItem(item) && item.class
																					] }),
																					disabled: isSelectItem(item) && item.disabled,
																					value: isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).valueKey) : item,
																					onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
																				}, {
																					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "item", {
																						item,
																						index,
																						ui: ui.value
																					}, () => [
																						(0, vue_exports.renderSlot)(_ctx.$slots, "item-leading", {
																							item,
																							index,
																							ui: ui.value
																						}, () => [isSelectItem(item) && item.icon ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$5, {
																							key: 0,
																							name: item.icon,
																							"data-slot": "itemLeadingIcon",
																							class: ui.value.itemLeadingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
																						}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$3, (0, vue_exports.mergeProps)({
																							key: 1,
																							size: item.ui?.itemLeadingAvatarSize || (0, vue_exports.unref)(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
																						}, { ref_for: true }, item.avatar, {
																							"data-slot": "itemLeadingAvatar",
																							class: ui.value.itemLeadingAvatar({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
																						}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$4, (0, vue_exports.mergeProps)({
																							key: 2,
																							size: item.ui?.itemLeadingChipSize || (0, vue_exports.unref)(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																							inset: "",
																							standalone: ""
																						}, { ref_for: true }, item.chip, {
																							"data-slot": "itemLeadingChip",
																							class: ui.value.itemLeadingChip({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
																						}), null, 16, ["size", "class"])) : (0, vue_exports.createCommentVNode)("", true)]),
																						(0, vue_exports.createVNode)("span", {
																							"data-slot": "itemWrapper",
																							class: ui.value.itemWrapper({ class: [(0, vue_exports.unref)(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
																						}, [(0, vue_exports.createVNode)((0, vue_exports.unref)(SelectItemText_default), {
																							"data-slot": "itemLabel",
																							class: ui.value.itemLabel({ class: [(0, vue_exports.unref)(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
																						}, {
																							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "item-label", {
																								item,
																								index
																							}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey) : item), 1)])]),
																							_: 2
																						}, 1032, ["class"]), isSelectItem(item) && ((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey) || !!slots["item-description"]) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("span", {
																							key: 0,
																							"data-slot": "itemDescription",
																							class: ui.value.itemDescription({ class: [(0, vue_exports.unref)(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
																						}, [(0, vue_exports.renderSlot)(_ctx.$slots, "item-description", {
																							item,
																							index
																						}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey)), 1)])], 2)) : (0, vue_exports.createCommentVNode)("", true)], 2),
																						(0, vue_exports.createVNode)("span", {
																							"data-slot": "itemTrailing",
																							class: ui.value.itemTrailing({ class: [(0, vue_exports.unref)(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
																						}, [(0, vue_exports.renderSlot)(_ctx.$slots, "item-trailing", {
																							item,
																							index,
																							ui: ui.value
																						}), (0, vue_exports.createVNode)((0, vue_exports.unref)(SelectItemIndicator_default), { "as-child": "" }, {
																							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$5, {
																								name: (0, vue_exports.unref)(props).selectedIcon || (0, vue_exports.unref)(appConfig).ui.icons.check,
																								"data-slot": "itemTrailingIcon",
																								class: ui.value.itemTrailingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																							}, null, 8, ["name", "class"])]),
																							_: 2
																						}, 1024)], 2)
																					])]),
																					_: 2
																				}, 1032, [
																					"class",
																					"disabled",
																					"value",
																					"onSelect"
																				]))], 64);
																			}), 128))];
																		}),
																		_: 2
																	}, _parent, _scopeId));
																});
																_push(`<!--]-->`);
															} else return [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(groups.value, (group, groupIndex) => {
																return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectGroup_default), {
																	key: `group-${groupIndex}`,
																	"data-slot": "group",
																	class: ui.value.group({ class: (0, vue_exports.unref)(props).ui?.group })
																}, {
																	default: (0, vue_exports.withCtx)(() => [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(group, (item, index) => {
																		return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(vue_exports.Fragment, { key: `group-${groupIndex}-${index}` }, [isSelectItem(item) && item.type === "label" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectLabel_default), {
																			key: 0,
																			"data-slot": "label",
																			class: ui.value.label({ class: [
																				(0, vue_exports.unref)(props).ui?.label,
																				item.ui?.label,
																				item.class
																			] })
																		}, {
																			default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey)), 1)]),
																			_: 2
																		}, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectSeparator_default), {
																			key: 1,
																			"data-slot": "separator",
																			class: ui.value.separator({ class: [
																				(0, vue_exports.unref)(props).ui?.separator,
																				item.ui?.separator,
																				item.class
																			] })
																		}, null, 8, ["class"])) : ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectItem_default), {
																			key: 2,
																			"data-slot": "item",
																			class: ui.value.item({ class: [
																				(0, vue_exports.unref)(props).ui?.item,
																				isSelectItem(item) && item.ui?.item,
																				isSelectItem(item) && item.class
																			] }),
																			disabled: isSelectItem(item) && item.disabled,
																			value: isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).valueKey) : item,
																			onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
																		}, {
																			default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "item", {
																				item,
																				index,
																				ui: ui.value
																			}, () => [
																				(0, vue_exports.renderSlot)(_ctx.$slots, "item-leading", {
																					item,
																					index,
																					ui: ui.value
																				}, () => [isSelectItem(item) && item.icon ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$5, {
																					key: 0,
																					name: item.icon,
																					"data-slot": "itemLeadingIcon",
																					class: ui.value.itemLeadingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
																				}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$3, (0, vue_exports.mergeProps)({
																					key: 1,
																					size: item.ui?.itemLeadingAvatarSize || (0, vue_exports.unref)(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
																				}, { ref_for: true }, item.avatar, {
																					"data-slot": "itemLeadingAvatar",
																					class: ui.value.itemLeadingAvatar({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
																				}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$4, (0, vue_exports.mergeProps)({
																					key: 2,
																					size: item.ui?.itemLeadingChipSize || (0, vue_exports.unref)(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																					inset: "",
																					standalone: ""
																				}, { ref_for: true }, item.chip, {
																					"data-slot": "itemLeadingChip",
																					class: ui.value.itemLeadingChip({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
																				}), null, 16, ["size", "class"])) : (0, vue_exports.createCommentVNode)("", true)]),
																				(0, vue_exports.createVNode)("span", {
																					"data-slot": "itemWrapper",
																					class: ui.value.itemWrapper({ class: [(0, vue_exports.unref)(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
																				}, [(0, vue_exports.createVNode)((0, vue_exports.unref)(SelectItemText_default), {
																					"data-slot": "itemLabel",
																					class: ui.value.itemLabel({ class: [(0, vue_exports.unref)(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
																				}, {
																					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "item-label", {
																						item,
																						index
																					}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey) : item), 1)])]),
																					_: 2
																				}, 1032, ["class"]), isSelectItem(item) && ((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey) || !!slots["item-description"]) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("span", {
																					key: 0,
																					"data-slot": "itemDescription",
																					class: ui.value.itemDescription({ class: [(0, vue_exports.unref)(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
																				}, [(0, vue_exports.renderSlot)(_ctx.$slots, "item-description", {
																					item,
																					index
																				}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey)), 1)])], 2)) : (0, vue_exports.createCommentVNode)("", true)], 2),
																				(0, vue_exports.createVNode)("span", {
																					"data-slot": "itemTrailing",
																					class: ui.value.itemTrailing({ class: [(0, vue_exports.unref)(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
																				}, [(0, vue_exports.renderSlot)(_ctx.$slots, "item-trailing", {
																					item,
																					index,
																					ui: ui.value
																				}), (0, vue_exports.createVNode)((0, vue_exports.unref)(SelectItemIndicator_default), { "as-child": "" }, {
																					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$5, {
																						name: (0, vue_exports.unref)(props).selectedIcon || (0, vue_exports.unref)(appConfig).ui.icons.check,
																						"data-slot": "itemTrailingIcon",
																						class: ui.value.itemTrailingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																					}, null, 8, ["name", "class"])]),
																					_: 2
																				}, 1024)], 2)
																			])]),
																			_: 2
																		}, 1032, [
																			"class",
																			"disabled",
																			"value",
																			"onSelect"
																		]))], 64);
																	}), 128))]),
																	_: 2
																}, 1032, ["class"]);
															}), 128))];
														}),
														_: 2
													}), _parent, _scopeId);
													(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "content-bottom", {}, null, _push, _parent, _scopeId);
													if (!!(0, vue_exports.unref)(props).arrow) _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(SelectArrow_default), (0, vue_exports.mergeProps)(arrowProps.value, {
														"data-slot": "arrow",
														class: ui.value.arrow({ class: (0, vue_exports.unref)(props).ui?.arrow })
													}), null, _parent, _scopeId));
													else _push(`<!---->`);
												} else return [
													(0, vue_exports.renderSlot)(_ctx.$slots, "content-top"),
													((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.resolveDynamicComponent)(isItemAligned.value ? (0, vue_exports.unref)(SelectViewport_default) : "div"), {
														ref_key: "viewportRef",
														ref: viewportRef,
														role: "presentation",
														"data-slot": "viewport",
														class: ui.value.viewport({ class: (0, vue_exports.unref)(props).ui?.viewport })
													}, {
														default: (0, vue_exports.withCtx)(() => [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(groups.value, (group, groupIndex) => {
															return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectGroup_default), {
																key: `group-${groupIndex}`,
																"data-slot": "group",
																class: ui.value.group({ class: (0, vue_exports.unref)(props).ui?.group })
															}, {
																default: (0, vue_exports.withCtx)(() => [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(group, (item, index) => {
																	return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(vue_exports.Fragment, { key: `group-${groupIndex}-${index}` }, [isSelectItem(item) && item.type === "label" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectLabel_default), {
																		key: 0,
																		"data-slot": "label",
																		class: ui.value.label({ class: [
																			(0, vue_exports.unref)(props).ui?.label,
																			item.ui?.label,
																			item.class
																		] })
																	}, {
																		default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey)), 1)]),
																		_: 2
																	}, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectSeparator_default), {
																		key: 1,
																		"data-slot": "separator",
																		class: ui.value.separator({ class: [
																			(0, vue_exports.unref)(props).ui?.separator,
																			item.ui?.separator,
																			item.class
																		] })
																	}, null, 8, ["class"])) : ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectItem_default), {
																		key: 2,
																		"data-slot": "item",
																		class: ui.value.item({ class: [
																			(0, vue_exports.unref)(props).ui?.item,
																			isSelectItem(item) && item.ui?.item,
																			isSelectItem(item) && item.class
																		] }),
																		disabled: isSelectItem(item) && item.disabled,
																		value: isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).valueKey) : item,
																		onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
																	}, {
																		default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "item", {
																			item,
																			index,
																			ui: ui.value
																		}, () => [
																			(0, vue_exports.renderSlot)(_ctx.$slots, "item-leading", {
																				item,
																				index,
																				ui: ui.value
																			}, () => [isSelectItem(item) && item.icon ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$5, {
																				key: 0,
																				name: item.icon,
																				"data-slot": "itemLeadingIcon",
																				class: ui.value.itemLeadingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
																			}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$3, (0, vue_exports.mergeProps)({
																				key: 1,
																				size: item.ui?.itemLeadingAvatarSize || (0, vue_exports.unref)(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
																			}, { ref_for: true }, item.avatar, {
																				"data-slot": "itemLeadingAvatar",
																				class: ui.value.itemLeadingAvatar({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
																			}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$4, (0, vue_exports.mergeProps)({
																				key: 2,
																				size: item.ui?.itemLeadingChipSize || (0, vue_exports.unref)(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																				inset: "",
																				standalone: ""
																			}, { ref_for: true }, item.chip, {
																				"data-slot": "itemLeadingChip",
																				class: ui.value.itemLeadingChip({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
																			}), null, 16, ["size", "class"])) : (0, vue_exports.createCommentVNode)("", true)]),
																			(0, vue_exports.createVNode)("span", {
																				"data-slot": "itemWrapper",
																				class: ui.value.itemWrapper({ class: [(0, vue_exports.unref)(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
																			}, [(0, vue_exports.createVNode)((0, vue_exports.unref)(SelectItemText_default), {
																				"data-slot": "itemLabel",
																				class: ui.value.itemLabel({ class: [(0, vue_exports.unref)(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
																			}, {
																				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "item-label", {
																					item,
																					index
																				}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey) : item), 1)])]),
																				_: 2
																			}, 1032, ["class"]), isSelectItem(item) && ((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey) || !!slots["item-description"]) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("span", {
																				key: 0,
																				"data-slot": "itemDescription",
																				class: ui.value.itemDescription({ class: [(0, vue_exports.unref)(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
																			}, [(0, vue_exports.renderSlot)(_ctx.$slots, "item-description", {
																				item,
																				index
																			}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey)), 1)])], 2)) : (0, vue_exports.createCommentVNode)("", true)], 2),
																			(0, vue_exports.createVNode)("span", {
																				"data-slot": "itemTrailing",
																				class: ui.value.itemTrailing({ class: [(0, vue_exports.unref)(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
																			}, [(0, vue_exports.renderSlot)(_ctx.$slots, "item-trailing", {
																				item,
																				index,
																				ui: ui.value
																			}), (0, vue_exports.createVNode)((0, vue_exports.unref)(SelectItemIndicator_default), { "as-child": "" }, {
																				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$5, {
																					name: (0, vue_exports.unref)(props).selectedIcon || (0, vue_exports.unref)(appConfig).ui.icons.check,
																					"data-slot": "itemTrailingIcon",
																					class: ui.value.itemTrailingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																				}, null, 8, ["name", "class"])]),
																				_: 2
																			}, 1024)], 2)
																		])]),
																		_: 2
																	}, 1032, [
																		"class",
																		"disabled",
																		"value",
																		"onSelect"
																	]))], 64);
																}), 128))]),
																_: 2
															}, 1032, ["class"]);
														}), 128))]),
														_: 3
													}, 8, ["class"])),
													(0, vue_exports.renderSlot)(_ctx.$slots, "content-bottom"),
													!!(0, vue_exports.unref)(props).arrow ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectArrow_default), (0, vue_exports.mergeProps)({ key: 0 }, arrowProps.value, {
														"data-slot": "arrow",
														class: ui.value.arrow({ class: (0, vue_exports.unref)(props).ui?.arrow })
													}), null, 16, ["class"])) : (0, vue_exports.createCommentVNode)("", true)
												];
											}),
											_: 2
										}, _parent, _scopeId));
										else return [(0, vue_exports.createVNode)((0, vue_exports.unref)(SelectContent_default), (0, vue_exports.mergeProps)({
											"data-slot": "content",
											class: ui.value.content({ class: (0, vue_exports.unref)(props).ui?.content })
										}, contentProps.value), {
											default: (0, vue_exports.withCtx)(() => [
												(0, vue_exports.renderSlot)(_ctx.$slots, "content-top"),
												((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.resolveDynamicComponent)(isItemAligned.value ? (0, vue_exports.unref)(SelectViewport_default) : "div"), {
													ref_key: "viewportRef",
													ref: viewportRef,
													role: "presentation",
													"data-slot": "viewport",
													class: ui.value.viewport({ class: (0, vue_exports.unref)(props).ui?.viewport })
												}, {
													default: (0, vue_exports.withCtx)(() => [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(groups.value, (group, groupIndex) => {
														return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectGroup_default), {
															key: `group-${groupIndex}`,
															"data-slot": "group",
															class: ui.value.group({ class: (0, vue_exports.unref)(props).ui?.group })
														}, {
															default: (0, vue_exports.withCtx)(() => [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(group, (item, index) => {
																return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(vue_exports.Fragment, { key: `group-${groupIndex}-${index}` }, [isSelectItem(item) && item.type === "label" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectLabel_default), {
																	key: 0,
																	"data-slot": "label",
																	class: ui.value.label({ class: [
																		(0, vue_exports.unref)(props).ui?.label,
																		item.ui?.label,
																		item.class
																	] })
																}, {
																	default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey)), 1)]),
																	_: 2
																}, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectSeparator_default), {
																	key: 1,
																	"data-slot": "separator",
																	class: ui.value.separator({ class: [
																		(0, vue_exports.unref)(props).ui?.separator,
																		item.ui?.separator,
																		item.class
																	] })
																}, null, 8, ["class"])) : ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectItem_default), {
																	key: 2,
																	"data-slot": "item",
																	class: ui.value.item({ class: [
																		(0, vue_exports.unref)(props).ui?.item,
																		isSelectItem(item) && item.ui?.item,
																		isSelectItem(item) && item.class
																	] }),
																	disabled: isSelectItem(item) && item.disabled,
																	value: isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).valueKey) : item,
																	onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
																}, {
																	default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "item", {
																		item,
																		index,
																		ui: ui.value
																	}, () => [
																		(0, vue_exports.renderSlot)(_ctx.$slots, "item-leading", {
																			item,
																			index,
																			ui: ui.value
																		}, () => [isSelectItem(item) && item.icon ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$5, {
																			key: 0,
																			name: item.icon,
																			"data-slot": "itemLeadingIcon",
																			class: ui.value.itemLeadingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
																		}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$3, (0, vue_exports.mergeProps)({
																			key: 1,
																			size: item.ui?.itemLeadingAvatarSize || (0, vue_exports.unref)(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
																		}, { ref_for: true }, item.avatar, {
																			"data-slot": "itemLeadingAvatar",
																			class: ui.value.itemLeadingAvatar({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
																		}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$4, (0, vue_exports.mergeProps)({
																			key: 2,
																			size: item.ui?.itemLeadingChipSize || (0, vue_exports.unref)(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																			inset: "",
																			standalone: ""
																		}, { ref_for: true }, item.chip, {
																			"data-slot": "itemLeadingChip",
																			class: ui.value.itemLeadingChip({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
																		}), null, 16, ["size", "class"])) : (0, vue_exports.createCommentVNode)("", true)]),
																		(0, vue_exports.createVNode)("span", {
																			"data-slot": "itemWrapper",
																			class: ui.value.itemWrapper({ class: [(0, vue_exports.unref)(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
																		}, [(0, vue_exports.createVNode)((0, vue_exports.unref)(SelectItemText_default), {
																			"data-slot": "itemLabel",
																			class: ui.value.itemLabel({ class: [(0, vue_exports.unref)(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
																		}, {
																			default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "item-label", {
																				item,
																				index
																			}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey) : item), 1)])]),
																			_: 2
																		}, 1032, ["class"]), isSelectItem(item) && ((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey) || !!slots["item-description"]) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("span", {
																			key: 0,
																			"data-slot": "itemDescription",
																			class: ui.value.itemDescription({ class: [(0, vue_exports.unref)(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
																		}, [(0, vue_exports.renderSlot)(_ctx.$slots, "item-description", {
																			item,
																			index
																		}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey)), 1)])], 2)) : (0, vue_exports.createCommentVNode)("", true)], 2),
																		(0, vue_exports.createVNode)("span", {
																			"data-slot": "itemTrailing",
																			class: ui.value.itemTrailing({ class: [(0, vue_exports.unref)(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
																		}, [(0, vue_exports.renderSlot)(_ctx.$slots, "item-trailing", {
																			item,
																			index,
																			ui: ui.value
																		}), (0, vue_exports.createVNode)((0, vue_exports.unref)(SelectItemIndicator_default), { "as-child": "" }, {
																			default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$5, {
																				name: (0, vue_exports.unref)(props).selectedIcon || (0, vue_exports.unref)(appConfig).ui.icons.check,
																				"data-slot": "itemTrailingIcon",
																				class: ui.value.itemTrailingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																			}, null, 8, ["name", "class"])]),
																			_: 2
																		}, 1024)], 2)
																	])]),
																	_: 2
																}, 1032, [
																	"class",
																	"disabled",
																	"value",
																	"onSelect"
																]))], 64);
															}), 128))]),
															_: 2
														}, 1032, ["class"]);
													}), 128))]),
													_: 3
												}, 8, ["class"])),
												(0, vue_exports.renderSlot)(_ctx.$slots, "content-bottom"),
												!!(0, vue_exports.unref)(props).arrow ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectArrow_default), (0, vue_exports.mergeProps)({ key: 0 }, arrowProps.value, {
													"data-slot": "arrow",
													class: ui.value.arrow({ class: (0, vue_exports.unref)(props).ui?.arrow })
												}), null, 16, ["class"])) : (0, vue_exports.createCommentVNode)("", true)
											]),
											_: 3
										}, 16, ["class"])];
									}),
									_: 2
								}, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)((0, vue_exports.unref)(FieldGroupReset), null, {
									default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(SelectContent_default), (0, vue_exports.mergeProps)({
										"data-slot": "content",
										class: ui.value.content({ class: (0, vue_exports.unref)(props).ui?.content })
									}, contentProps.value), {
										default: (0, vue_exports.withCtx)(() => [
											(0, vue_exports.renderSlot)(_ctx.$slots, "content-top"),
											((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.resolveDynamicComponent)(isItemAligned.value ? (0, vue_exports.unref)(SelectViewport_default) : "div"), {
												ref_key: "viewportRef",
												ref: viewportRef,
												role: "presentation",
												"data-slot": "viewport",
												class: ui.value.viewport({ class: (0, vue_exports.unref)(props).ui?.viewport })
											}, {
												default: (0, vue_exports.withCtx)(() => [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(groups.value, (group, groupIndex) => {
													return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectGroup_default), {
														key: `group-${groupIndex}`,
														"data-slot": "group",
														class: ui.value.group({ class: (0, vue_exports.unref)(props).ui?.group })
													}, {
														default: (0, vue_exports.withCtx)(() => [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(group, (item, index) => {
															return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(vue_exports.Fragment, { key: `group-${groupIndex}-${index}` }, [isSelectItem(item) && item.type === "label" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectLabel_default), {
																key: 0,
																"data-slot": "label",
																class: ui.value.label({ class: [
																	(0, vue_exports.unref)(props).ui?.label,
																	item.ui?.label,
																	item.class
																] })
															}, {
																default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey)), 1)]),
																_: 2
															}, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectSeparator_default), {
																key: 1,
																"data-slot": "separator",
																class: ui.value.separator({ class: [
																	(0, vue_exports.unref)(props).ui?.separator,
																	item.ui?.separator,
																	item.class
																] })
															}, null, 8, ["class"])) : ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectItem_default), {
																key: 2,
																"data-slot": "item",
																class: ui.value.item({ class: [
																	(0, vue_exports.unref)(props).ui?.item,
																	isSelectItem(item) && item.ui?.item,
																	isSelectItem(item) && item.class
																] }),
																disabled: isSelectItem(item) && item.disabled,
																value: isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).valueKey) : item,
																onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
															}, {
																default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "item", {
																	item,
																	index,
																	ui: ui.value
																}, () => [
																	(0, vue_exports.renderSlot)(_ctx.$slots, "item-leading", {
																		item,
																		index,
																		ui: ui.value
																	}, () => [isSelectItem(item) && item.icon ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$5, {
																		key: 0,
																		name: item.icon,
																		"data-slot": "itemLeadingIcon",
																		class: ui.value.itemLeadingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
																	}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$3, (0, vue_exports.mergeProps)({
																		key: 1,
																		size: item.ui?.itemLeadingAvatarSize || (0, vue_exports.unref)(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
																	}, { ref_for: true }, item.avatar, {
																		"data-slot": "itemLeadingAvatar",
																		class: ui.value.itemLeadingAvatar({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
																	}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$4, (0, vue_exports.mergeProps)({
																		key: 2,
																		size: item.ui?.itemLeadingChipSize || (0, vue_exports.unref)(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																		inset: "",
																		standalone: ""
																	}, { ref_for: true }, item.chip, {
																		"data-slot": "itemLeadingChip",
																		class: ui.value.itemLeadingChip({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
																	}), null, 16, ["size", "class"])) : (0, vue_exports.createCommentVNode)("", true)]),
																	(0, vue_exports.createVNode)("span", {
																		"data-slot": "itemWrapper",
																		class: ui.value.itemWrapper({ class: [(0, vue_exports.unref)(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
																	}, [(0, vue_exports.createVNode)((0, vue_exports.unref)(SelectItemText_default), {
																		"data-slot": "itemLabel",
																		class: ui.value.itemLabel({ class: [(0, vue_exports.unref)(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
																	}, {
																		default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "item-label", {
																			item,
																			index
																		}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey) : item), 1)])]),
																		_: 2
																	}, 1032, ["class"]), isSelectItem(item) && ((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey) || !!slots["item-description"]) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("span", {
																		key: 0,
																		"data-slot": "itemDescription",
																		class: ui.value.itemDescription({ class: [(0, vue_exports.unref)(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
																	}, [(0, vue_exports.renderSlot)(_ctx.$slots, "item-description", {
																		item,
																		index
																	}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey)), 1)])], 2)) : (0, vue_exports.createCommentVNode)("", true)], 2),
																	(0, vue_exports.createVNode)("span", {
																		"data-slot": "itemTrailing",
																		class: ui.value.itemTrailing({ class: [(0, vue_exports.unref)(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
																	}, [(0, vue_exports.renderSlot)(_ctx.$slots, "item-trailing", {
																		item,
																		index,
																		ui: ui.value
																	}), (0, vue_exports.createVNode)((0, vue_exports.unref)(SelectItemIndicator_default), { "as-child": "" }, {
																		default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$5, {
																			name: (0, vue_exports.unref)(props).selectedIcon || (0, vue_exports.unref)(appConfig).ui.icons.check,
																			"data-slot": "itemTrailingIcon",
																			class: ui.value.itemTrailingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																		}, null, 8, ["name", "class"])]),
																		_: 2
																	}, 1024)], 2)
																])]),
																_: 2
															}, 1032, [
																"class",
																"disabled",
																"value",
																"onSelect"
															]))], 64);
														}), 128))]),
														_: 2
													}, 1032, ["class"]);
												}), 128))]),
												_: 3
											}, 8, ["class"])),
											(0, vue_exports.renderSlot)(_ctx.$slots, "content-bottom"),
											!!(0, vue_exports.unref)(props).arrow ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectArrow_default), (0, vue_exports.mergeProps)({ key: 0 }, arrowProps.value, {
												"data-slot": "arrow",
												class: ui.value.arrow({ class: (0, vue_exports.unref)(props).ui?.arrow })
											}), null, 16, ["class"])) : (0, vue_exports.createCommentVNode)("", true)
										]),
										_: 3
									}, 16, ["class"])]),
									_: 3
								})];
							}),
							_: 2
						}, _parent, _scopeId));
					} else return [(0, vue_exports.createVNode)((0, vue_exports.unref)(SelectTrigger_default), (0, vue_exports.mergeProps)({
						id: (0, vue_exports.unref)(id),
						ref_key: "triggerRef",
						ref: triggerRef,
						"data-slot": "base",
						class: ui.value.base({ class: [(0, vue_exports.unref)(props).ui?.base, (0, vue_exports.unref)(props).class] })
					}, {
						..._ctx.$attrs,
						...(0, vue_exports.unref)(ariaAttrs)
					}, { onClick: ($event) => onTriggerClick(open) }), {
						default: (0, vue_exports.withCtx)(() => [
							(0, vue_exports.unref)(isLeading) || !!(0, vue_exports.unref)(props).avatar || !!slots.leading ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("span", {
								key: 0,
								"data-slot": "leading",
								class: ui.value.leading({ class: (0, vue_exports.unref)(props).ui?.leading })
							}, [(0, vue_exports.renderSlot)(_ctx.$slots, "leading", {
								modelValue,
								open,
								ui: ui.value
							}, () => [(0, vue_exports.unref)(isLeading) && (0, vue_exports.unref)(leadingIconName) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$5, {
								key: 0,
								name: (0, vue_exports.unref)(leadingIconName),
								"data-slot": "leadingIcon",
								class: ui.value.leadingIcon({ class: (0, vue_exports.unref)(props).ui?.leadingIcon })
							}, null, 8, ["name", "class"])) : !!(0, vue_exports.unref)(props).avatar ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$3, (0, vue_exports.mergeProps)({
								key: 1,
								size: (0, vue_exports.unref)(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
							}, (0, vue_exports.unref)(props).avatar, {
								"data-slot": "itemLeadingAvatar",
								class: ui.value.itemLeadingAvatar({ class: (0, vue_exports.unref)(props).ui?.itemLeadingAvatar })
							}), null, 16, ["size", "class"])) : (0, vue_exports.createCommentVNode)("", true)])], 2)) : (0, vue_exports.createCommentVNode)("", true),
							((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)([displayValue(modelValue)], (displayedModelValue) => {
								return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectValue_default), {
									key: displayedModelValue,
									"data-slot": displayedModelValue != null ? "value" : "placeholder",
									class: displayedModelValue != null ? ui.value.value({ class: (0, vue_exports.unref)(props).ui?.value }) : ui.value.placeholder({ class: (0, vue_exports.unref)(props).ui?.placeholder })
								}, {
									default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default", {
										modelValue,
										open,
										ui: ui.value
									}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(displayedModelValue ?? (0, vue_exports.unref)(props).placeholder ?? "\xA0"), 1)])]),
									_: 2
								}, 1032, ["data-slot", "class"]);
							}), 128)),
							(0, vue_exports.unref)(isTrailing) || !!slots.trailing ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("span", {
								key: 1,
								"data-slot": "trailing",
								class: ui.value.trailing({ class: (0, vue_exports.unref)(props).ui?.trailing })
							}, [(0, vue_exports.renderSlot)(_ctx.$slots, "trailing", {
								modelValue,
								open,
								ui: ui.value
							}, () => [(0, vue_exports.unref)(trailingIconName) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$5, {
								key: 0,
								name: (0, vue_exports.unref)(trailingIconName),
								"data-slot": "trailingIcon",
								class: ui.value.trailingIcon({ class: (0, vue_exports.unref)(props).ui?.trailingIcon })
							}, null, 8, ["name", "class"])) : (0, vue_exports.createCommentVNode)("", true)])], 2)) : (0, vue_exports.createCommentVNode)("", true)
						]),
						_: 2
					}, 1040, [
						"id",
						"class",
						"onClick"
					]), (0, vue_exports.createVNode)((0, vue_exports.unref)(SelectPortal_default), (0, vue_exports.unref)(portalProps), {
						default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(FieldGroupReset), null, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(SelectContent_default), (0, vue_exports.mergeProps)({
								"data-slot": "content",
								class: ui.value.content({ class: (0, vue_exports.unref)(props).ui?.content })
							}, contentProps.value), {
								default: (0, vue_exports.withCtx)(() => [
									(0, vue_exports.renderSlot)(_ctx.$slots, "content-top"),
									((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.resolveDynamicComponent)(isItemAligned.value ? (0, vue_exports.unref)(SelectViewport_default) : "div"), {
										ref_key: "viewportRef",
										ref: viewportRef,
										role: "presentation",
										"data-slot": "viewport",
										class: ui.value.viewport({ class: (0, vue_exports.unref)(props).ui?.viewport })
									}, {
										default: (0, vue_exports.withCtx)(() => [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(groups.value, (group, groupIndex) => {
											return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectGroup_default), {
												key: `group-${groupIndex}`,
												"data-slot": "group",
												class: ui.value.group({ class: (0, vue_exports.unref)(props).ui?.group })
											}, {
												default: (0, vue_exports.withCtx)(() => [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(group, (item, index) => {
													return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(vue_exports.Fragment, { key: `group-${groupIndex}-${index}` }, [isSelectItem(item) && item.type === "label" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectLabel_default), {
														key: 0,
														"data-slot": "label",
														class: ui.value.label({ class: [
															(0, vue_exports.unref)(props).ui?.label,
															item.ui?.label,
															item.class
														] })
													}, {
														default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey)), 1)]),
														_: 2
													}, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectSeparator_default), {
														key: 1,
														"data-slot": "separator",
														class: ui.value.separator({ class: [
															(0, vue_exports.unref)(props).ui?.separator,
															item.ui?.separator,
															item.class
														] })
													}, null, 8, ["class"])) : ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectItem_default), {
														key: 2,
														"data-slot": "item",
														class: ui.value.item({ class: [
															(0, vue_exports.unref)(props).ui?.item,
															isSelectItem(item) && item.ui?.item,
															isSelectItem(item) && item.class
														] }),
														disabled: isSelectItem(item) && item.disabled,
														value: isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).valueKey) : item,
														onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
													}, {
														default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "item", {
															item,
															index,
															ui: ui.value
														}, () => [
															(0, vue_exports.renderSlot)(_ctx.$slots, "item-leading", {
																item,
																index,
																ui: ui.value
															}, () => [isSelectItem(item) && item.icon ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$5, {
																key: 0,
																name: item.icon,
																"data-slot": "itemLeadingIcon",
																class: ui.value.itemLeadingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
															}, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$3, (0, vue_exports.mergeProps)({
																key: 1,
																size: item.ui?.itemLeadingAvatarSize || (0, vue_exports.unref)(props).ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
															}, { ref_for: true }, item.avatar, {
																"data-slot": "itemLeadingAvatar",
																class: ui.value.itemLeadingAvatar({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
															}), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$4, (0, vue_exports.mergeProps)({
																key: 2,
																size: item.ui?.itemLeadingChipSize || (0, vue_exports.unref)(props).ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
																inset: "",
																standalone: ""
															}, { ref_for: true }, item.chip, {
																"data-slot": "itemLeadingChip",
																class: ui.value.itemLeadingChip({ class: [(0, vue_exports.unref)(props).ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
															}), null, 16, ["size", "class"])) : (0, vue_exports.createCommentVNode)("", true)]),
															(0, vue_exports.createVNode)("span", {
																"data-slot": "itemWrapper",
																class: ui.value.itemWrapper({ class: [(0, vue_exports.unref)(props).ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
															}, [(0, vue_exports.createVNode)((0, vue_exports.unref)(SelectItemText_default), {
																"data-slot": "itemLabel",
																class: ui.value.itemLabel({ class: [(0, vue_exports.unref)(props).ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
															}, {
																default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "item-label", {
																	item,
																	index
																}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(isSelectItem(item) ? (0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).labelKey) : item), 1)])]),
																_: 2
															}, 1032, ["class"]), isSelectItem(item) && ((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey) || !!slots["item-description"]) ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("span", {
																key: 0,
																"data-slot": "itemDescription",
																class: ui.value.itemDescription({ class: [(0, vue_exports.unref)(props).ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
															}, [(0, vue_exports.renderSlot)(_ctx.$slots, "item-description", {
																item,
																index
															}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, (0, vue_exports.unref)(props).descriptionKey)), 1)])], 2)) : (0, vue_exports.createCommentVNode)("", true)], 2),
															(0, vue_exports.createVNode)("span", {
																"data-slot": "itemTrailing",
																class: ui.value.itemTrailing({ class: [(0, vue_exports.unref)(props).ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
															}, [(0, vue_exports.renderSlot)(_ctx.$slots, "item-trailing", {
																item,
																index,
																ui: ui.value
															}), (0, vue_exports.createVNode)((0, vue_exports.unref)(SelectItemIndicator_default), { "as-child": "" }, {
																default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$5, {
																	name: (0, vue_exports.unref)(props).selectedIcon || (0, vue_exports.unref)(appConfig).ui.icons.check,
																	"data-slot": "itemTrailingIcon",
																	class: ui.value.itemTrailingIcon({ class: [(0, vue_exports.unref)(props).ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
																}, null, 8, ["name", "class"])]),
																_: 2
															}, 1024)], 2)
														])]),
														_: 2
													}, 1032, [
														"class",
														"disabled",
														"value",
														"onSelect"
													]))], 64);
												}), 128))]),
												_: 2
											}, 1032, ["class"]);
										}), 128))]),
										_: 3
									}, 8, ["class"])),
									(0, vue_exports.renderSlot)(_ctx.$slots, "content-bottom"),
									!!(0, vue_exports.unref)(props).arrow ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(SelectArrow_default), (0, vue_exports.mergeProps)({ key: 0 }, arrowProps.value, {
										"data-slot": "arrow",
										class: ui.value.arrow({ class: (0, vue_exports.unref)(props).ui?.arrow })
									}), null, 16, ["class"])) : (0, vue_exports.createCommentVNode)("", true)
								]),
								_: 3
							}, 16, ["class"])]),
							_: 3
						})]),
						_: 3
					}, 16)];
				}),
				_: 3
			}, _parent));
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_34dffa26c25098eb8314796249c1dfc0/node_modules/@nuxt/ui/dist/runtime/components/Select.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Select-PQNYhlOg.mjs.map
