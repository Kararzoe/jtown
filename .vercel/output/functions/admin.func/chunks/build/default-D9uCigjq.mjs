import { d as _plugin_vue_export_helper_default, R as server_renderer_exports, aj as vue_exports, ag as useSupabaseUser, ae as useRouter, N as NuxtLink, e as _sfc_main$5, C as ClientOnly, j as _sfc_main$5$1, a0 as useComponentProps, X as useAppConfig, a5 as useForwardProps, O as reactivePick, U as tv, a4 as useForwardExpose, ai as useVModel, b as Primitive, a8 as useLocale, aa as usePortal, M as reactiveOmit, m as createReusableTemplate, D as isArrayOfArray, h as _sfc_main$3$1, u as get, F as FieldGroupReset, f as _sfc_main$1$1, L as pickLinkProps, g as _sfc_main$2$1, J as omit, k as createContext, ab as usePrimitiveElement, a1 as useEmitAsProps, n as createSharedComposable, P as Presence_default, a6 as useForwardProps$1, T as Teleport_default, Y as useCollection, v as getActiveElement } from '../virtual/entry.mjs';
import { o as useDirection, s as useId, q as useForwardPropsEmits, e as PopperRoot_default, P as PopperAnchor_default, b as PopperArrow_default, j as getOpenState, f as SUB_CLOSE_KEYS, i as getCheckedState, l as isIndeterminate, S as SELECTION_KEYS, g as SUB_OPEN_KEYS, m as isMouseEvent, p as useFocusGuards, u as useBodyScrollLock, t as useTypeahead, a as FocusScope_default, D as DismissableLayer_default, d as PopperContent_default, c as PopperContentPropsDefaultValue, r as useHideOthers, n as isPointerInGraceArea, F as FIRST_LAST_KEYS, L as LAST_KEYS, h as focusFirst$1, I as ITEM_SELECT } from './PopperArrow-CQIWINqG.mjs';
import { _ as _sfc_main$6 } from './Input-COSn-l8y.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-CEFOh9bN.mjs';
import { f as defu } from '../_/nitro.mjs';
import 'unhead/utils';
import 'vue';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'nostics';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'devalue';
import '@supabase/supabase-js';
import 'tailwindcss/colors';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';

//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useArrowNavigation.js
var ignoredElement = ["INPUT", "TEXTAREA"];
/**
* Allow arrow navigation for every html element with data-reka-collection-item tag
*
* @param e               Keyboard event
* @param currentElement  Event initiator element or any element that wants to handle the navigation
* @param parentElement   Parent element where contains all the collection items, this will collect every item to be used when nav
* @param options         further options
* @returns               the navigated html element or null if none
*/
function useArrowNavigation(e, currentElement, parentElement, options = {}) {
	if (!currentElement || options.enableIgnoredElement && ignoredElement.includes(currentElement.nodeName)) return null;
	const { arrowKeyOptions = "both", attributeName = "[data-reka-collection-item]", itemsArray = [], loop = true, dir = "ltr", preventScroll = true, focus = false } = options;
	const [right, left, up, down, home, end] = [
		e.key === "ArrowRight",
		e.key === "ArrowLeft",
		e.key === "ArrowUp",
		e.key === "ArrowDown",
		e.key === "Home",
		e.key === "End"
	];
	const goingVertical = up || down;
	const goingHorizontal = right || left;
	if (!home && !end && (!goingVertical && !goingHorizontal || arrowKeyOptions === "vertical" && goingHorizontal || arrowKeyOptions === "horizontal" && goingVertical)) return null;
	const allCollectionItems = parentElement ? Array.from(parentElement.querySelectorAll(attributeName)) : itemsArray;
	if (!allCollectionItems.length) return null;
	if (preventScroll) e.preventDefault();
	let item = null;
	if (goingHorizontal || goingVertical) item = findNextFocusableElement(allCollectionItems, currentElement, {
		goForward: goingVertical ? down : dir === "ltr" ? right : left,
		loop
	});
	else if (home) item = allCollectionItems.at(0) || null;
	else if (end) item = allCollectionItems.at(-1) || null;
	if (focus) item?.focus();
	return item;
}
/**
* Recursive function to find the next focusable element to avoid disabled elements
*
* @param elements Elements to navigate
* @param currentElement Current active element
* @param options
* @returns next focusable element
*/
function findNextFocusableElement(elements, currentElement, options, iterations = !elements.includes(currentElement) ? elements.length + 1 : elements.length) {
	if (--iterations === 0) return null;
	const index = elements.indexOf(currentElement);
	let newIndex;
	if (index === -1) newIndex = options.goForward ? 0 : elements.length - 1;
	else newIndex = options.goForward ? index + 1 : index - 1;
	if (!options.loop && (newIndex < 0 || newIndex >= elements.length)) return null;
	const candidate = elements[(newIndex + elements.length) % elements.length];
	if (!candidate) return null;
	if (candidate.hasAttribute("disabled") && candidate.getAttribute("disabled") !== "false") return findNextFocusableElement(elements, candidate, options, iterations);
	return candidate;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useComposing.js
function useComposing(onEnd) {
	const isComposing = (0, vue_exports.ref)(false);
	function handleCompositionStart() {
		isComposing.value = true;
	}
	function handleCompositionEnd(event) {
		(0, vue_exports.nextTick)(() => {
			isComposing.value = false;
			onEnd?.(event);
		});
	}
	return {
		isComposing,
		handleCompositionStart,
		handleCompositionEnd
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFilter.js
/**
* Provides locale-aware string filtering functions.
* Uses `Intl.Collator` for comparison to ensure proper Unicode handling.
*
* @param options - Optional collator options to customize comparison behavior.
*   See [Intl.CollatorOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#options) for details.
* @returns An object with methods to check if a string starts with, ends with, or contains a substring.
*
* @example
* const { startsWith, endsWith, contains } = useFilter();
*
* startsWith('hello', 'he'); // true
* endsWith('hello', 'lo'); // true
* contains('hello', 'ell'); // true
*/
function useFilter$1(options) {
	const computedOptions = (0, vue_exports.computed)(() => (0, vue_exports.unref)(options));
	const collator = (0, vue_exports.computed)(() => new Intl.Collator("en", {
		usage: "search",
		...computedOptions.value
	}));
	const startsWith = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		return collator.value.compare(string.slice(0, substring.length), substring) === 0;
	};
	const endsWith = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		return collator.value.compare(string.slice(-substring.length), substring) === 0;
	};
	const contains = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		let scan = 0;
		const sliceLen = substring.length;
		for (; scan + sliceLen <= string.length; scan++) {
			const slice = string.slice(scan, scan + sliceLen);
			if (collator.value.compare(substring, slice) === 0) return true;
		}
		return false;
	};
	return {
		startsWith,
		endsWith,
		contains
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/utils.js
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
function focusFirst(candidates, preventScroll = false) {
	const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus({ preventScroll });
		if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/RovingFocusGroup.js
var [injectRovingFocusGroupContext, provideRovingFocusGroupContext] = /*#__PURE__*/ createContext("RovingFocusGroup");
var RovingFocusGroup_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "RovingFocusGroup",
	props: {
		orientation: {
			type: String,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
			required: false
		},
		loop: {
			type: Boolean,
			required: false,
			default: false
		},
		currentTabStopId: {
			type: [String, null],
			required: false
		},
		defaultCurrentTabStopId: {
			type: String,
			required: false
		},
		preventScrollOnEntryFocus: {
			type: Boolean,
			required: false,
			default: false
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
	emits: ["entryFocus", "update:currentTabStopId"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { loop, orientation, dir: propDir } = (0, vue_exports.toRefs)(props);
		const dir = useDirection(propDir);
		const currentTabStopId = useVModel(props, "currentTabStopId", emits, {
			defaultValue: props.defaultCurrentTabStopId,
			passive: props.currentTabStopId === void 0
		});
		const isTabbingBackOut = (0, vue_exports.ref)(false);
		const isClickFocus = (0, vue_exports.ref)(false);
		const focusableItemsCount = (0, vue_exports.ref)(0);
		const { getItems, CollectionSlot } = useCollection({ isProvider: true });
		function handleFocus(event) {
			const isKeyboardFocus = !isClickFocus.value;
			if (event.currentTarget && event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut.value) {
				const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
				event.currentTarget.dispatchEvent(entryFocusEvent);
				emits("entryFocus", entryFocusEvent);
				if (!entryFocusEvent.defaultPrevented) {
					const items = getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "");
					focusFirst([
						items.find((item) => item.getAttribute("data-active") === ""),
						items.find((item) => item.getAttribute("data-highlighted") === ""),
						items.find((item) => item.id === currentTabStopId.value),
						...items
					].filter(Boolean), props.preventScrollOnEntryFocus);
				}
			}
			isClickFocus.value = false;
		}
		function handleMouseUp() {
			setTimeout(() => {
				isClickFocus.value = false;
			}, 1);
		}
		__expose({ getItems });
		provideRovingFocusGroupContext({
			loop,
			dir,
			orientation,
			currentTabStopId,
			onItemFocus: (tabStopId) => {
				currentTabStopId.value = tabStopId;
			},
			onItemShiftTab: () => {
				isTabbingBackOut.value = true;
			},
			onFocusableItemAdd: () => {
				focusableItemsCount.value++;
			},
			onFocusableItemRemove: () => {
				focusableItemsCount.value--;
			}
		});
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(CollectionSlot), null, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(Primitive), {
					tabindex: isTabbingBackOut.value || focusableItemsCount.value === 0 ? -1 : 0,
					"data-orientation": (0, vue_exports.unref)(orientation),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					dir: (0, vue_exports.unref)(dir),
					style: { "outline": "none" },
					onMousedown: _cache[0] || (_cache[0] = ($event) => isClickFocus.value = true),
					onMouseup: handleMouseUp,
					onFocus: handleFocus,
					onBlur: _cache[1] || (_cache[1] = ($event) => isTabbingBackOut.value = false)
				}, {
					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"tabindex",
					"data-orientation",
					"as",
					"as-child",
					"dir"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuAnchor.js
var MenuAnchor_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuAnchor",
	props: {
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
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(PopperAnchor_default), (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)(props)), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuArrow.js
var MenuArrow_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuArrow",
	props: {
		width: {
			type: Number,
			required: false
		},
		height: {
			type: Number,
			required: false
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
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(PopperArrow_default), (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)(props)), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useIsUsingKeyboard.js
function useIsUsingKeyboardImpl() {
	return (0, vue_exports.ref)(false);
}
var useIsUsingKeyboard = createSharedComposable(useIsUsingKeyboardImpl);
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRoot.js
var [injectMenuContext, provideMenuContext] = /*#__PURE__*/ createContext(["MenuRoot", "MenuSub"], "MenuContext");
var [injectMenuRootContext, provideMenuRootContext] = /*#__PURE__*/ createContext("MenuRoot");
var MenuRoot_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: false
		},
		dir: {
			type: String,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { modal, dir: propDir } = (0, vue_exports.toRefs)(props);
		const dir = useDirection(propDir);
		const open = useVModel(props, "open", emits);
		const content = (0, vue_exports.ref)();
		const isUsingKeyboardRef = useIsUsingKeyboard();
		provideMenuContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			content,
			onContentChange: (element) => {
				content.value = element;
			}
		});
		provideMenuRootContext({
			onClose: () => {
				open.value = false;
			},
			isUsingKeyboardRef,
			dir,
			modal
		});
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(PopperRoot_default), null, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuContentImpl.js
var [injectMenuContentContext, provideMenuContentContext] = /*#__PURE__*/ createContext("MenuContent");
var MenuContentImpl_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuContentImpl",
	props: /* @__PURE__ */ (0, vue_exports.mergeDefaults)({
		loop: {
			type: Boolean,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		},
		disableOutsideScroll: {
			type: Boolean,
			required: false
		},
		trapFocus: {
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
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	}, { ...PopperContentPropsDefaultValue }),
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus",
		"dismiss"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const { trapFocus, disableOutsidePointerEvents, loop } = (0, vue_exports.toRefs)(props);
		useFocusGuards();
		useBodyScrollLock(disableOutsidePointerEvents.value);
		const searchRef = (0, vue_exports.ref)("");
		const timerRef = (0, vue_exports.ref)(0);
		const pointerGraceTimerRef = (0, vue_exports.ref)(0);
		const pointerGraceIntentRef = (0, vue_exports.ref)(null);
		const pointerDirRef = (0, vue_exports.ref)("right");
		const lastPointerXRef = (0, vue_exports.ref)(0);
		const currentItemId = (0, vue_exports.ref)(null);
		const rovingFocusGroupRef = (0, vue_exports.ref)();
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const { handleTypeaheadSearch } = useTypeahead();
		const highlightedElement = (0, vue_exports.ref)();
		function onKeydownNavigation(event) {
			const el = useArrowNavigation(event, highlightedElement.value || getActiveElement(), contentElement.value, {
				loop: loop.value,
				arrowKeyOptions: "vertical",
				dir: rootContext?.dir.value,
				focus: false,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			if (el) {
				highlightedElement.value = el;
				el.scrollIntoView({ block: "nearest" });
			}
		}
		function onKeydownEnter() {
			if (highlightedElement.value) highlightedElement.value.click();
		}
		const filterElement = (0, vue_exports.ref)();
		const activeSubmenuContext = (0, vue_exports.ref)();
		(0, vue_exports.watch)(highlightedElement, (el) => {
			if (activeSubmenuContext.value && (el === void 0 || el !== activeSubmenuContext.value.trigger.value)) {
				if (el === void 0) return;
				activeSubmenuContext.value.onOpenChange(false);
				activeSubmenuContext.value = void 0;
			}
		});
		(0, vue_exports.watch)(contentElement, (el) => {
			menuContext.onContentChange(el);
		});
		function isPointerMovingToSubmenu(event) {
			return pointerDirRef.value === pointerGraceIntentRef.value?.side && isPointerInGraceArea(event, pointerGraceIntentRef.value?.area);
		}
		async function handleMountAutoFocus(event) {
			emits("openAutoFocus", event);
			if (event.defaultPrevented) return;
			event.preventDefault();
			contentElement.value?.focus({ preventScroll: true });
		}
		function handleKeyDown(event) {
			if (event.defaultPrevented) return;
			const target = event.target;
			const isKeyDownInside = target.closest("[data-reka-menu-content]") === event.currentTarget;
			const isKeyDownInTextField = ["input", "textarea"].includes(target.tagName.toLowerCase());
			const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
			const isCharacterKey = event.key.length === 1;
			const el = useArrowNavigation(event, getActiveElement(), contentElement.value, {
				loop: loop.value,
				arrowKeyOptions: "vertical",
				dir: rootContext?.dir.value,
				focus: true,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			if (el) return el?.focus();
			if (event.code === "Space") return;
			const collectionItems = rovingFocusGroupRef.value?.getItems() ?? [];
			if (isKeyDownInside) {
				if (event.key === "Tab" && rootContext.modal.value) event.preventDefault();
				if (!isModifierKey && isCharacterKey && !isKeyDownInTextField) handleTypeaheadSearch(event.key, collectionItems);
			}
			if (event.target !== contentElement.value) return;
			if (!FIRST_LAST_KEYS.includes(event.key)) return;
			event.preventDefault();
			const candidateNodes = [...collectionItems.map((item) => item.ref)];
			if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
			focusFirst$1(candidateNodes);
		}
		function handleBlur(event) {
			if (!event?.currentTarget?.contains?.(event.target)) {
				(void 0).clearTimeout(timerRef.value);
				searchRef.value = "";
			}
		}
		function handlePointerMove(event) {
			if (!isMouseEvent(event)) return;
			const target = event.target;
			const pointerXHasChanged = lastPointerXRef.value !== event.clientX;
			if ((event?.currentTarget)?.contains(target) && pointerXHasChanged) {
				const newDir = event.clientX > lastPointerXRef.value ? "right" : "left";
				pointerDirRef.value = newDir;
				lastPointerXRef.value = event.clientX;
			}
		}
		function handlePointerEnter(event) {
			if (!isMouseEvent(event)) return;
			if (filterElement.value) filterElement.value.focus();
		}
		provideMenuContentContext({
			onItemEnter: (event) => {
				if (isPointerMovingToSubmenu(event)) return true;
				else return false;
			},
			onItemLeave: (event) => {
				if (isPointerMovingToSubmenu(event)) return true;
				if (!["INPUT", "TEXTAREA"].includes(getActiveElement()?.tagName || "")) contentElement.value?.focus();
				currentItemId.value = null;
				return false;
			},
			onTriggerLeave: (event) => {
				if (isPointerMovingToSubmenu(event)) return true;
				else return false;
			},
			searchRef,
			highlightedElement,
			onKeydownNavigation,
			onKeydownEnter,
			filterElement,
			onFilterElementChange: (el) => {
				filterElement.value = el;
			},
			activeSubmenuContext,
			pointerGraceTimerRef,
			onPointerGraceIntentChange: (intent) => {
				pointerGraceIntentRef.value = intent;
			}
		});
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(FocusScope_default), {
				"as-child": "",
				trapped: (0, vue_exports.unref)(trapFocus),
				onMountAutoFocus: handleMountAutoFocus,
				onUnmountAutoFocus: _cache[7] || (_cache[7] = ($event) => emits("closeAutoFocus", $event))
			}, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(DismissableLayer_default), {
					"as-child": "",
					"disable-outside-pointer-events": (0, vue_exports.unref)(disableOutsidePointerEvents),
					onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
					onPointerDownOutside: _cache[3] || (_cache[3] = ($event) => emits("pointerDownOutside", $event)),
					onFocusOutside: _cache[4] || (_cache[4] = ($event) => emits("focusOutside", $event)),
					onInteractOutside: _cache[5] || (_cache[5] = ($event) => emits("interactOutside", $event)),
					onDismiss: _cache[6] || (_cache[6] = ($event) => emits("dismiss"))
				}, {
					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(RovingFocusGroup_default), {
						ref_key: "rovingFocusGroupRef",
						ref: rovingFocusGroupRef,
						"current-tab-stop-id": currentItemId.value,
						"onUpdate:currentTabStopId": _cache[0] || (_cache[0] = ($event) => currentItemId.value = $event),
						"as-child": "",
						orientation: "vertical",
						dir: (0, vue_exports.unref)(rootContext).dir.value,
						loop: (0, vue_exports.unref)(loop),
						onEntryFocus: _cache[1] || (_cache[1] = (event) => {
							emits("entryFocus", event);
							if (!(0, vue_exports.unref)(rootContext).isUsingKeyboardRef.value) event.preventDefault();
						})
					}, {
						default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(PopperContent_default), {
							ref: (0, vue_exports.unref)(forwardRef),
							role: "menu",
							as: _ctx.as,
							"as-child": _ctx.asChild,
							"aria-orientation": "vertical",
							"data-reka-menu-content": "",
							"data-state": (0, vue_exports.unref)(getOpenState)((0, vue_exports.unref)(menuContext).open.value),
							dir: (0, vue_exports.unref)(rootContext).dir.value,
							side: _ctx.side,
							"side-offset": _ctx.sideOffset,
							align: _ctx.align,
							"align-offset": _ctx.alignOffset,
							"avoid-collisions": _ctx.avoidCollisions,
							"collision-boundary": _ctx.collisionBoundary,
							"collision-padding": _ctx.collisionPadding,
							"arrow-padding": _ctx.arrowPadding,
							"prioritize-position": _ctx.prioritizePosition,
							"position-strategy": _ctx.positionStrategy,
							"update-position-strategy": _ctx.updatePositionStrategy,
							sticky: _ctx.sticky,
							"hide-when-detached": _ctx.hideWhenDetached,
							reference: _ctx.reference,
							onKeydown: handleKeyDown,
							onBlur: handleBlur,
							onPointermove: handlePointerMove,
							onPointerenter: handlePointerEnter
						}, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
							_: 3
						}, 8, [
							"as",
							"as-child",
							"data-state",
							"dir",
							"side",
							"side-offset",
							"align",
							"align-offset",
							"avoid-collisions",
							"collision-boundary",
							"collision-padding",
							"arrow-padding",
							"prioritize-position",
							"position-strategy",
							"update-position-strategy",
							"sticky",
							"hide-when-detached",
							"reference"
						])]),
						_: 3
					}, 8, [
						"current-tab-stop-id",
						"dir",
						"loop"
					])]),
					_: 3
				}, 8, ["disable-outside-pointer-events"])]),
				_: 3
			}, 8, ["trapped"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuItemImpl.js
var MenuItemImpl_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	inheritAttrs: false,
	__name: "MenuItemImpl",
	props: {
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
	setup(__props) {
		const props = __props;
		const contentContext = injectMenuContentContext();
		const { forwardRef, currentElement } = useForwardExpose();
		const { CollectionItem } = useCollection();
		const isFocused = (0, vue_exports.ref)(false);
		const isHighlighted = (0, vue_exports.computed)(() => isFocused.value || currentElement.value != null && contentContext.highlightedElement.value === currentElement.value);
		async function handlePointerMove(event) {
			if (event.defaultPrevented || !isMouseEvent(event)) return;
			if (props.disabled) contentContext.onItemLeave(event);
			else if (!contentContext.onItemEnter(event)) {
				const item = event.currentTarget;
				contentContext.highlightedElement.value = item;
				if (!["INPUT", "TEXTAREA"].includes(getActiveElement()?.tagName || "")) item.focus({ preventScroll: true });
			}
		}
		async function handlePointerLeave(event) {
			await (0, vue_exports.nextTick)();
			if (event.defaultPrevented) return;
			if (!isMouseEvent(event)) return;
			if (contentContext.highlightedElement.value !== currentElement.value) return;
			if (!contentContext.onItemLeave(event) && contentContext.highlightedElement.value === currentElement.value) contentContext.highlightedElement.value = void 0;
		}
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(CollectionItem), { value: { textValue: _ctx.textValue } }, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(Primitive), (0, vue_exports.mergeProps)({
					ref: (0, vue_exports.unref)(forwardRef),
					role: "menuitem",
					tabindex: "-1"
				}, _ctx.$attrs, {
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-disabled": _ctx.disabled || void 0,
					"data-disabled": _ctx.disabled ? "" : void 0,
					"data-highlighted": isHighlighted.value ? "" : void 0,
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onFocus: _cache[0] || (_cache[0] = async (event) => {
						await (0, vue_exports.nextTick)();
						if (event.defaultPrevented || _ctx.disabled) return;
						isFocused.value = true;
						(0, vue_exports.unref)(contentContext).highlightedElement.value = event.currentTarget;
					}),
					onBlur: _cache[1] || (_cache[1] = async (event) => {
						await (0, vue_exports.nextTick)();
						if (event.defaultPrevented) return;
						isFocused.value = false;
					})
				}), {
					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"as",
					"as-child",
					"aria-disabled",
					"data-disabled",
					"data-highlighted"
				])]),
				_: 3
			}, 8, ["value"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuItem.js
var MenuItem_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuItem",
	props: {
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
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectMenuRootContext();
		const contentContext = injectMenuContentContext();
		const isPointerDownRef = (0, vue_exports.ref)(false);
		async function handleSelect() {
			const menuItem = currentElement.value;
			if (!props.disabled && menuItem) {
				const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
					bubbles: true,
					cancelable: true
				});
				emits("select", itemSelectEvent);
				await (0, vue_exports.nextTick)();
				if (itemSelectEvent.defaultPrevented) isPointerDownRef.value = false;
				else rootContext.onClose();
			}
		}
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(MenuItemImpl_default, (0, vue_exports.mergeProps)(props, {
				ref: (0, vue_exports.unref)(forwardRef),
				onClick: handleSelect,
				onPointerdown: _cache[0] || (_cache[0] = () => {
					isPointerDownRef.value = true;
				}),
				onPointerup: _cache[1] || (_cache[1] = async (event) => {
					await (0, vue_exports.nextTick)();
					if (event.defaultPrevented) return;
					if (!isPointerDownRef.value) event.currentTarget?.click();
				}),
				onKeydown: _cache[2] || (_cache[2] = async (event) => {
					const isTypingAhead = (0, vue_exports.unref)(contentContext).searchRef.value !== "";
					if (_ctx.disabled || isTypingAhead && event.key === " ") return;
					if ((0, vue_exports.unref)(SELECTION_KEYS).includes(event.key)) {
						event.currentTarget?.click();
						/**
						* We prevent default browser behaviour for selection keys as they should trigger
						* a selection only:
						* - prevents space from scrolling the page.
						* - if keydown causes focus to move, prevents keydown from firing on the new target.
						*/
						event.preventDefault();
					}
				})
			}), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuItemIndicator.js
var [injectMenuItemIndicatorContext, provideMenuItemIndicatorContext] = /*#__PURE__*/ createContext(["MenuCheckboxItem", "MenuRadioItem"], "MenuItemIndicatorContext");
var MenuItemIndicator_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuItemIndicator",
	props: {
		forceMount: {
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
			default: "span"
		}
	},
	setup(__props) {
		const indicatorContext = injectMenuItemIndicatorContext({ modelValue: (0, vue_exports.ref)(false) });
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Presence_default), { present: _ctx.forceMount || (0, vue_exports.unref)(isIndeterminate)((0, vue_exports.unref)(indicatorContext).modelValue.value) || (0, vue_exports.unref)(indicatorContext).modelValue.value === true }, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(Primitive), {
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"data-state": (0, vue_exports.unref)(getCheckedState)((0, vue_exports.unref)(indicatorContext).modelValue.value)
				}, {
					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"data-state"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuCheckboxItem.js
var MenuCheckboxItem_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuCheckboxItem",
	props: {
		modelValue: {
			type: [Boolean, String],
			required: false,
			default: false
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
	emits: ["select", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardProps$1(reactiveOmit(props, ["modelValue"]));
		const modelValue = useVModel(props, "modelValue", emits);
		provideMenuItemIndicatorContext({ modelValue });
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(MenuItem_default, (0, vue_exports.mergeProps)({ role: "menuitemcheckbox" }, (0, vue_exports.unref)(forwarded), {
				"aria-checked": (0, vue_exports.unref)(isIndeterminate)((0, vue_exports.unref)(modelValue)) ? "mixed" : (0, vue_exports.unref)(modelValue),
				"data-state": (0, vue_exports.unref)(getCheckedState)((0, vue_exports.unref)(modelValue)),
				onSelect: _cache[0] || (_cache[0] = async (event) => {
					emits("select", event);
					if ((0, vue_exports.unref)(isIndeterminate)((0, vue_exports.unref)(modelValue))) modelValue.value = true;
					else modelValue.value = !(0, vue_exports.unref)(modelValue);
				})
			}), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default", { modelValue: (0, vue_exports.unref)(modelValue) })]),
				_: 3
			}, 16, ["aria-checked", "data-state"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRootContentModal.js
var MenuRootContentModal_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuRootContentModal",
	props: {
		loop: {
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
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(props, emits);
		const menuContext = injectMenuContext();
		const { forwardRef, currentElement } = useForwardExpose();
		useHideOthers(currentElement);
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(MenuContentImpl_default, (0, vue_exports.mergeProps)((0, vue_exports.unref)(forwarded), {
				ref: (0, vue_exports.unref)(forwardRef),
				"trap-focus": (0, vue_exports.unref)(menuContext).open.value,
				"disable-outside-pointer-events": (0, vue_exports.unref)(menuContext).open.value,
				"disable-outside-scroll": true,
				onDismiss: _cache[0] || (_cache[0] = ($event) => (0, vue_exports.unref)(menuContext).onOpenChange(false)),
				onFocusOutside: _cache[1] || (_cache[1] = (0, vue_exports.withModifiers)(($event) => emits("focusOutside", $event), ["prevent"]))
			}), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus", "disable-outside-pointer-events"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRootContentNonModal.js
var MenuRootContentNonModal_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuRootContentNonModal",
	props: {
		loop: {
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
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const menuContext = injectMenuContext();
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(MenuContentImpl_default, (0, vue_exports.mergeProps)((0, vue_exports.unref)(forwarded), {
				"trap-focus": false,
				"disable-outside-pointer-events": false,
				"disable-outside-scroll": false,
				onDismiss: _cache[0] || (_cache[0] = ($event) => (0, vue_exports.unref)(menuContext).onOpenChange(false))
			}), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuContent.js
var MenuContent_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
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
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Presence_default), { present: _ctx.forceMount || (0, vue_exports.unref)(menuContext).open.value }, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.unref)(rootContext).modal.value ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(MenuRootContentModal_default, (0, vue_exports.normalizeProps)((0, vue_exports.mergeProps)({ key: 0 }, {
					..._ctx.$attrs,
					...(0, vue_exports.unref)(forwarded)
				})), {
					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
					_: 3
				}, 16)) : ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(MenuRootContentNonModal_default, (0, vue_exports.normalizeProps)((0, vue_exports.mergeProps)({ key: 1 }, {
					..._ctx.$attrs,
					...(0, vue_exports.unref)(forwarded)
				})), {
					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuGroup.js
var [injectMenuGroupContext, provideMenuGroupContext] = /*#__PURE__*/ createContext("MenuGroup");
var MenuGroup_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuGroup",
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
		const id = useId(void 0, "reka-menu-group");
		provideMenuGroupContext({ id });
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Primitive), (0, vue_exports.mergeProps)({ role: "group" }, props, { "aria-labelledby": (0, vue_exports.unref)(id) }), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["aria-labelledby"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuLabel.js
var MenuLabel_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuLabel",
	props: {
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
		const groupContext = injectMenuGroupContext({ id: "" });
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Primitive), (0, vue_exports.mergeProps)(props, { id: (0, vue_exports.unref)(groupContext).id || void 0 }), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuPortal.js
var MenuPortal_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuPortal",
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
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRadioGroup.js
var [injectMenuRadioGroupContext, provideMenuRadioGroupContext] = /*#__PURE__*/ createContext("MenuRadioGroup");
var MenuRadioGroup_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuRadioGroup",
	props: {
		modelValue: {
			type: null,
			required: false,
			default: ""
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
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardProps$1(reactiveOmit(props, ["modelValue"]));
		const modelValue = useVModel(props, "modelValue", emits);
		provideMenuRadioGroupContext({
			modelValue,
			onValueChange: (payload) => {
				modelValue.value = payload;
			}
		});
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(MenuGroup_default, (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)((0, vue_exports.unref)(forwarded))), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default", { modelValue: (0, vue_exports.unref)(modelValue) })]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRadioItem.js
var MenuRadioItem_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuRadioItem",
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
		const forwarded = useForwardProps$1(reactiveOmit(props, ["value"]));
		const { value } = (0, vue_exports.toRefs)(props);
		const radioGroupContext = injectMenuRadioGroupContext();
		const modelValue = (0, vue_exports.computed)(() => radioGroupContext.modelValue.value === value?.value);
		provideMenuItemIndicatorContext({ modelValue });
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(MenuItem_default, (0, vue_exports.mergeProps)({ role: "menuitemradio" }, (0, vue_exports.unref)(forwarded), {
				"aria-checked": modelValue.value,
				"data-state": (0, vue_exports.unref)(getCheckedState)(modelValue.value),
				onSelect: _cache[0] || (_cache[0] = async (event) => {
					emits("select", event);
					(0, vue_exports.unref)(radioGroupContext).onValueChange((0, vue_exports.unref)(value));
				})
			}), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["aria-checked", "data-state"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSeparator.js
var MenuSeparator_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuSeparator",
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
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Primitive), (0, vue_exports.mergeProps)(props, {
				role: "separator",
				"aria-orientation": "horizontal"
			}), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSub.js
var [injectMenuSubContext, provideMenuSubContext] = /*#__PURE__*/ createContext("MenuSub");
var MenuSub_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuSub",
	props: { open: {
		type: Boolean,
		required: false,
		default: void 0
	} },
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useVModel(props, "open", __emit, {
			defaultValue: false,
			passive: props.open === void 0
		});
		const parentMenuContext = injectMenuContext();
		const trigger = (0, vue_exports.ref)();
		const content = (0, vue_exports.ref)();
		(0, vue_exports.watchEffect)((cleanupFn) => {
			if (parentMenuContext?.open.value === false) open.value = false;
			cleanupFn(() => open.value = false);
		});
		provideMenuContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			content,
			onContentChange: (element) => {
				content.value = element;
			}
		});
		provideMenuSubContext({
			triggerId: "",
			contentId: "",
			trigger,
			onTriggerChange: (element) => {
				trigger.value = element;
			}
		});
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(PopperRoot_default), null, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSubContent.js
var MenuSubContent_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuSubContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
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
			required: false,
			default: true
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
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const menuSubContext = injectMenuSubContext();
		const parentContentContext = injectMenuContentContext();
		const { forwardRef, currentElement: subContentElement } = useForwardExpose();
		menuSubContext.contentId ||= useId(void 0, "reka-menu-sub-content");
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Presence_default), { present: _ctx.forceMount || (0, vue_exports.unref)(menuContext).open.value }, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(MenuContentImpl_default, (0, vue_exports.mergeProps)((0, vue_exports.unref)(forwarded), {
					id: (0, vue_exports.unref)(menuSubContext).contentId,
					ref: (0, vue_exports.unref)(forwardRef),
					"aria-labelledby": (0, vue_exports.unref)(menuSubContext).triggerId,
					align: "start",
					side: (0, vue_exports.unref)(rootContext).dir.value === "rtl" ? "left" : "right",
					"disable-outside-pointer-events": false,
					"disable-outside-scroll": false,
					"trap-focus": false,
					onOpenAutoFocus: _cache[0] || (_cache[0] = (0, vue_exports.withModifiers)((event) => {
						if ((0, vue_exports.unref)(rootContext).isUsingKeyboardRef.value) (0, vue_exports.unref)(subContentElement)?.focus();
					}, ["prevent"])),
					onCloseAutoFocus: _cache[1] || (_cache[1] = (0, vue_exports.withModifiers)(() => {}, ["prevent"])),
					onFocusOutside: _cache[2] || (_cache[2] = (event) => {
						if (event.defaultPrevented) return;
						const isMovingToParentContent = (0, vue_exports.unref)(parentContentContext).filterElement.value?.contains(event.target);
						if (event.target !== (0, vue_exports.unref)(menuSubContext).trigger.value && !isMovingToParentContent) (0, vue_exports.unref)(menuContext).onOpenChange(false);
					}),
					onEscapeKeyDown: _cache[3] || (_cache[3] = (event) => {
						(0, vue_exports.unref)(rootContext).onClose();
						event.preventDefault();
					}),
					onKeydown: _cache[4] || (_cache[4] = (event) => {
						const isKeyDownInside = event.currentTarget?.contains(event.target);
						const isCloseKey = (0, vue_exports.unref)(SUB_CLOSE_KEYS)[(0, vue_exports.unref)(rootContext).dir.value].includes(event.key);
						if (isKeyDownInside && isCloseKey) {
							(0, vue_exports.unref)(menuContext).onOpenChange(false);
							if ((0, vue_exports.unref)(parentContentContext).filterElement.value) {
								(0, vue_exports.unref)(parentContentContext).filterElement.value.focus();
								(0, vue_exports.unref)(parentContentContext).highlightedElement.value = (0, vue_exports.unref)(menuSubContext).trigger.value;
								(0, vue_exports.unref)(menuSubContext).trigger.value?.scrollIntoView({ block: "nearest" });
							} else (0, vue_exports.unref)(menuSubContext).trigger.value?.focus();
							event.preventDefault();
						}
					})
				}), {
					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"aria-labelledby",
					"side"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSubTrigger.js
var MenuSubTrigger_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "MenuSubTrigger",
	props: {
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
	setup(__props) {
		const props = __props;
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const subContext = injectMenuSubContext();
		const contentContext = injectMenuContentContext();
		(0, vue_exports.watch)(menuContext.open, (open) => {
			if (open) contentContext.activeSubmenuContext.value = {
				onOpenChange: menuContext.onOpenChange,
				trigger: subContext.trigger
			};
			else if (contentContext.activeSubmenuContext.value?.trigger.value === subContext.trigger.value) contentContext.activeSubmenuContext.value = void 0;
		});
		const openTimerRef = (0, vue_exports.ref)(null);
		subContext.triggerId ||= useId(void 0, "reka-menu-sub-trigger");
		function clearOpenTimer() {
			if (openTimerRef.value) (void 0).clearTimeout(openTimerRef.value);
			openTimerRef.value = null;
		}
		function handlePointerMove(event) {
			if (!isMouseEvent(event)) return;
			if (contentContext.onItemEnter(event)) return;
			if (!props.disabled && !menuContext.open.value && !openTimerRef.value) {
				contentContext.onPointerGraceIntentChange(null);
				openTimerRef.value = (void 0).setTimeout(() => {
					menuContext.onOpenChange(true);
					clearOpenTimer();
				}, 100);
			}
		}
		async function handlePointerLeave(event) {
			if (!isMouseEvent(event)) return;
			clearOpenTimer();
			const contentRect = menuContext.content.value?.getBoundingClientRect();
			if (contentRect?.width) {
				const side = menuContext.content.value?.dataset.side;
				const rightSide = side === "right";
				const bleed = rightSide ? -5 : 5;
				const contentNearEdge = contentRect[rightSide ? "left" : "right"];
				const contentFarEdge = contentRect[rightSide ? "right" : "left"];
				contentContext.onPointerGraceIntentChange({
					area: [
						{
							x: event.clientX + bleed,
							y: event.clientY
						},
						{
							x: contentNearEdge,
							y: contentRect.top
						},
						{
							x: contentFarEdge,
							y: contentRect.top
						},
						{
							x: contentFarEdge,
							y: contentRect.bottom
						},
						{
							x: contentNearEdge,
							y: contentRect.bottom
						}
					],
					side
				});
				(void 0).clearTimeout(contentContext.pointerGraceTimerRef.value);
				contentContext.pointerGraceTimerRef.value = (void 0).setTimeout(() => contentContext.onPointerGraceIntentChange(null), 300);
			} else {
				if (contentContext.onTriggerLeave(event)) return;
				contentContext.onPointerGraceIntentChange(null);
			}
		}
		async function handleKeyDown(event) {
			const isTypingAhead = contentContext.searchRef.value !== "";
			if (props.disabled || isTypingAhead && event.key === " ") return;
			if (SUB_OPEN_KEYS[rootContext.dir.value].includes(event.key)) {
				menuContext.onOpenChange(true);
				await (0, vue_exports.nextTick)();
				menuContext.content.value?.focus();
				event.preventDefault();
			}
		}
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(MenuAnchor_default, { "as-child": "" }, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(MenuItemImpl_default, (0, vue_exports.mergeProps)(props, {
					id: (0, vue_exports.unref)(subContext).triggerId,
					ref: (vnode) => {
						if (!vnode) return void 0;
						(0, vue_exports.unref)(subContext)?.onTriggerChange(vnode?.$el);
					},
					"aria-haspopup": "menu",
					"aria-expanded": (0, vue_exports.unref)(menuContext).open.value,
					"aria-controls": (0, vue_exports.unref)(subContext).contentId,
					"data-state": (0, vue_exports.unref)(getOpenState)((0, vue_exports.unref)(menuContext).open.value),
					onClick: _cache[0] || (_cache[0] = async (event) => {
						if (props.disabled || event.defaultPrevented) return;
						/**
						* We manually focus because iOS Safari doesn't always focus on click (e.g. buttons)
						* and we rely heavily on `onFocusOutside` for submenus to close when switching
						* between separate submenus.
						*/
						event.currentTarget?.focus();
						if (!(0, vue_exports.unref)(menuContext).open.value) (0, vue_exports.unref)(menuContext).onOpenChange(true);
					}),
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onKeydown: handleKeyDown
				}), {
					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"aria-expanded",
					"aria-controls",
					"data-state"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuArrow.js
var DropdownMenuArrow_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuArrow",
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
		useForwardExpose();
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuArrow_default), (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)(props)), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuCheckboxItem.js
var DropdownMenuCheckboxItem_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuCheckboxItem",
	props: {
		modelValue: {
			type: [Boolean, String],
			required: false
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
	emits: ["select", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuCheckboxItem_default), (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)({
				...props,
				...(0, vue_exports.unref)(emitsAsProps)
			})), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuRoot.js
var [injectDropdownMenuRootContext, provideDropdownMenuRootContext] = /*#__PURE__*/ createContext("DropdownMenuRoot");
var DropdownMenuRoot_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		useForwardExpose();
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const triggerElement = (0, vue_exports.ref)();
		const { modal, dir: propDir } = (0, vue_exports.toRefs)(props);
		const dir = useDirection(propDir);
		provideDropdownMenuRootContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			onOpenToggle: () => {
				open.value = !open.value;
			},
			triggerId: "",
			triggerElement,
			contentId: "",
			modal,
			dir
		});
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuRoot_default), {
				open: (0, vue_exports.unref)(open),
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => (0, vue_exports.isRef)(open) ? open.value = $event : null),
				dir: (0, vue_exports.unref)(dir),
				modal: (0, vue_exports.unref)(modal)
			}, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default", { open: (0, vue_exports.unref)(open) })]),
				_: 3
			}, 8, [
				"open",
				"dir",
				"modal"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuContent.js
var DropdownMenuContent_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
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
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		const rootContext = injectDropdownMenuRootContext();
		const hasInteractedOutsideRef = (0, vue_exports.ref)(false);
		function handleCloseAutoFocus(event) {
			if (event.defaultPrevented) return;
			if (!hasInteractedOutsideRef.value) setTimeout(() => {
				rootContext.triggerElement.value?.focus();
			}, 0);
			hasInteractedOutsideRef.value = false;
			event.preventDefault();
		}
		rootContext.contentId ||= useId(void 0, "reka-dropdown-menu-content");
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuContent_default), (0, vue_exports.mergeProps)((0, vue_exports.unref)(forwarded), {
				id: (0, vue_exports.unref)(rootContext).contentId,
				"aria-labelledby": (0, vue_exports.unref)(rootContext)?.triggerId,
				style: {
					"--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
					"--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
					"--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
					"--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
					"--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
				},
				onCloseAutoFocus: handleCloseAutoFocus,
				onInteractOutside: _cache[0] || (_cache[0] = (event) => {
					if (event.defaultPrevented) return;
					const originalEvent = event.detail.originalEvent;
					const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
					const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
					if (!(0, vue_exports.unref)(rootContext).modal.value || isRightClick) hasInteractedOutsideRef.value = true;
					if ((0, vue_exports.unref)(rootContext).triggerElement.value?.contains(event.target)) event.preventDefault();
				})
			}), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id", "aria-labelledby"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuFilter.js
var DropdownMenuFilter_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuFilter",
	props: {
		modelValue: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false
		},
		disabled: {
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
			default: "input"
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const modelValue = useVModel(props, "modelValue", __emit, {
			defaultValue: "",
			passive: props.modelValue === void 0
		});
		injectMenuRootContext();
		const contentContext = injectMenuContentContext();
		injectMenuSubContext(null);
		(0, vue_exports.watch)(modelValue, (v) => {
			contentContext.searchRef.value = v ?? "";
		}, { immediate: true });
		const { primitiveElement} = usePrimitiveElement();
		const disabled = (0, vue_exports.computed)(() => props.disabled || false);
		const activedescendant = (0, vue_exports.ref)();
		(0, vue_exports.watchSyncEffect)(() => activedescendant.value = contentContext.highlightedElement.value?.id);
		const { isComposing, handleCompositionStart, handleCompositionEnd } = useComposing((event) => {
			const el = event.target;
			if (el) {
				modelValue.value = el.value;
				contentContext.searchRef.value = el.value;
			}
		});
		function handleInput(event) {
			if (disabled.value) return;
			if (isComposing.value) return;
			const target = event.target;
			modelValue.value = target.value;
			contentContext.searchRef.value = target.value;
		}
		function handleKeyDown(event) {
			if (disabled.value) return;
			if (isComposing.value) {
				event.stopPropagation();
				return;
			}
			if ([
				"ArrowDown",
				"ArrowUp",
				"Home",
				"End"
			].includes(event.key)) {
				event.preventDefault();
				contentContext.onKeydownNavigation(event);
			} else if (event.key === "Enter") {
				event.preventDefault();
				contentContext.onKeydownEnter(event);
			} else if (event.key === "Escape" && modelValue.value) {
				event.stopPropagation();
				modelValue.value = "";
				contentContext.searchRef.value = "";
			}
		}
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				value: (0, vue_exports.unref)(modelValue),
				disabled: disabled.value ? "" : void 0,
				"data-disabled": disabled.value ? "" : void 0,
				"aria-disabled": disabled.value ? true : void 0,
				"aria-activedescendant": activedescendant.value,
				type: "text",
				role: "searchbox",
				onInput: handleInput,
				onKeydown: handleKeyDown,
				onCompositionstart: (0, vue_exports.unref)(handleCompositionStart),
				onCompositionend: (0, vue_exports.unref)(handleCompositionEnd)
			}, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default", { modelValue: (0, vue_exports.unref)(modelValue) })]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"value",
				"disabled",
				"data-disabled",
				"aria-disabled",
				"aria-activedescendant",
				"onCompositionstart",
				"onCompositionend"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuGroup.js
var DropdownMenuGroup_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuGroup",
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
		useForwardExpose();
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuGroup_default), (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)(props)), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuItem.js
var DropdownMenuItem_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuItem",
	props: {
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
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuItem_default), (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)({
				...props,
				...(0, vue_exports.unref)(emitsAsProps)
			})), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuItemIndicator.js
var DropdownMenuItemIndicator_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuItemIndicator",
	props: {
		forceMount: {
			type: Boolean,
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
		useForwardExpose();
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuItemIndicator_default), (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)(props)), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuLabel.js
var DropdownMenuLabel_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuLabel",
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
		useForwardExpose();
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuLabel_default), (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)(props)), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuPortal.js
var DropdownMenuPortal_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuPortal",
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
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuPortal_default), (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)(props)), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuRadioGroup.js
var DropdownMenuRadioGroup_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuRadioGroup",
	props: {
		modelValue: {
			type: null,
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
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuRadioGroup_default), (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)({
				...props,
				...(0, vue_exports.unref)(emitsAsProps)
			})), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuRadioItem.js
var DropdownMenuRadioItem_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuRadioItem",
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
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuRadioItem_default), (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)((0, vue_exports.unref)(forwarded))), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSeparator.js
var DropdownMenuSeparator_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuSeparator",
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
		useForwardExpose();
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuSeparator_default), (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)(props)), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSub.js
var DropdownMenuSub_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuSub",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useVModel(props, "open", __emit, {
			passive: props.open === void 0,
			defaultValue: props.defaultOpen ?? false
		});
		useForwardExpose();
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuSub_default), {
				open: (0, vue_exports.unref)(open),
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => (0, vue_exports.isRef)(open) ? open.value = $event : null)
			}, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default", { open: (0, vue_exports.unref)(open) })]),
				_: 3
			}, 8, ["open"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSubContent.js
var DropdownMenuSubContent_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuSubContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		memoDependencies: {
			type: Array,
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
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuSubContent_default), (0, vue_exports.mergeProps)((0, vue_exports.unref)(forwarded), { style: {
				"--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
				"--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
				"--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSubTrigger.js
var DropdownMenuSubTrigger_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuSubTrigger",
	props: {
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
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuSubTrigger_default), (0, vue_exports.normalizeProps)((0, vue_exports.guardReactiveProps)(props)), {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuTrigger.js
var DropdownMenuTrigger_default = /* @__PURE__ */ (0, vue_exports.defineComponent)({
	__name: "DropdownMenuTrigger",
	props: {
		disabled: {
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
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectDropdownMenuRootContext();
		const { forwardRef} = useForwardExpose();
		rootContext.triggerId ||= useId(void 0, "reka-dropdown-menu-trigger");
		return (_ctx, _cache) => {
			return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(MenuAnchor_default), { "as-child": "" }, {
				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(Primitive), {
					id: (0, vue_exports.unref)(rootContext).triggerId,
					ref: (0, vue_exports.unref)(forwardRef),
					type: _ctx.as === "button" ? "button" : void 0,
					"as-child": props.asChild,
					as: _ctx.as,
					"aria-haspopup": "menu",
					"aria-expanded": (0, vue_exports.unref)(rootContext).open.value,
					"aria-controls": (0, vue_exports.unref)(rootContext).open.value ? (0, vue_exports.unref)(rootContext).contentId : void 0,
					"data-disabled": _ctx.disabled ? "" : void 0,
					disabled: _ctx.disabled,
					"data-state": (0, vue_exports.unref)(rootContext).open.value ? "open" : "closed",
					onClick: _cache[0] || (_cache[0] = async (event) => {
						if (!_ctx.disabled && event.button === 0 && event.ctrlKey === false) {
							(0, vue_exports.unref)(rootContext)?.onOpenToggle();
							await (0, vue_exports.nextTick)();
							if ((0, vue_exports.unref)(rootContext).open.value) event.preventDefault();
						}
					}),
					onKeydown: _cache[1] || (_cache[1] = (0, vue_exports.withKeys)((event) => {
						if (_ctx.disabled) return;
						if (["Enter", " "].includes(event.key)) (0, vue_exports.unref)(rootContext).onOpenToggle();
						if (event.key === "ArrowDown") (0, vue_exports.unref)(rootContext).onOpenChange(true);
						if ([
							"Enter",
							" ",
							"ArrowDown"
						].includes(event.key)) event.preventDefault();
					}, [
						"enter",
						"space",
						"arrow-down"
					]))
				}, {
					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"id",
					"type",
					"as-child",
					"as",
					"aria-expanded",
					"aria-controls",
					"data-disabled",
					"disabled",
					"data-state"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.10.1_vue@3.5.40_typescript@6.0.3_/node_modules/reka-ui/dist/namespaced/index.mjs
var DropdownMenu = {
	Root: DropdownMenuRoot_default,
	Trigger: DropdownMenuTrigger_default,
	Portal: DropdownMenuPortal_default,
	Content: DropdownMenuContent_default,
	Arrow: DropdownMenuArrow_default,
	Item: DropdownMenuItem_default,
	Group: DropdownMenuGroup_default,
	Separator: DropdownMenuSeparator_default,
	CheckboxItem: DropdownMenuCheckboxItem_default,
	ItemIndicator: DropdownMenuItemIndicator_default,
	Label: DropdownMenuLabel_default,
	RadioGroup: DropdownMenuRadioGroup_default,
	RadioItem: DropdownMenuRadioItem_default,
	Sub: DropdownMenuSub_default,
	SubContent: DropdownMenuSubContent_default,
	SubTrigger: DropdownMenuSubTrigger_default,
	Filter: DropdownMenuFilter_default
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_34dffa26c25098eb8314796249c1dfc0/node_modules/@nuxt/ui/dist/runtime/composables/useFilter.js
function useFilter() {
	const { contains, startsWith } = useFilter$1({ sensitivity: "base" });
	function score(value, searchTerm) {
		if (!contains(value, searchTerm)) return null;
		if (contains(searchTerm, value)) return 0;
		if (startsWith(value, searchTerm)) return 1;
		return 2;
	}
	function scoreItem(item, searchTerm, fields) {
		if (typeof item !== "object" || item === null) return score(String(item), searchTerm);
		let bestScore = null;
		for (const field of fields) {
			const value = get(item, field);
			if (value == null) continue;
			const values = Array.isArray(value) ? value.map(String) : [String(value)];
			for (const v of values) {
				const s = score(v, searchTerm);
				if (s !== null && (bestScore === null || s < bestScore)) bestScore = s;
				if (bestScore === 0) return 0;
			}
		}
		return bestScore;
	}
	function filter(items, searchTerm, fields) {
		if (!searchTerm) return items;
		const scored = [];
		for (const item of items) {
			const s = scoreItem(item, searchTerm, fields);
			if (s !== null) scored.push({
				item,
				score: s
			});
		}
		scored.sort((a, b) => a.score - b.score);
		return scored.map(({ item }) => item);
	}
	function filterGroups(groups, searchTerm, options) {
		if (!searchTerm) return groups;
		return groups.map((group) => {
			const result = [];
			for (const item of group) {
				if (item === void 0 || item === null) continue;
				if (options.isStructural?.(item)) {
					result.push({
						item,
						score: -1
					});
					continue;
				}
				const s = scoreItem(item, searchTerm, options.fields);
				if (s !== null) result.push({
					item,
					score: s
				});
			}
			result.sort((a, b) => a.score - b.score);
			return result.map(({ item }) => item);
		}).filter((group) => group.some((item) => !options.isStructural?.(item)));
	}
	return {
		score,
		scoreItem,
		filter,
		filterGroups
	};
}
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_34dffa26c25098eb8314796249c1dfc0/node_modules/@nuxt/ui/dist/runtime/composables/useKbd.js
var kbdKeysMap = {
	meta: "",
	ctrl: "",
	alt: "",
	win: "⊞",
	command: "⌘",
	shift: "⇧",
	control: "⌃",
	option: "⌥",
	enter: "↵",
	delete: "⌦",
	backspace: "⌫",
	escape: "Esc",
	tab: "⇥",
	capslock: "⇪",
	arrowup: "↑",
	arrowright: "→",
	arrowdown: "↓",
	arrowleft: "←",
	pageup: "⇞",
	pagedown: "⇟",
	home: "↖",
	end: "↘"
};
var _useKbd = () => {
	const macOS = (0, vue_exports.computed)(() => false);
	const kbdKeysSpecificMap = (0, vue_exports.reactive)({
		meta: " ",
		alt: " ",
		ctrl: " "
	});
	function getKbdKey(value) {
		if (!value) return;
		if ([
			"meta",
			"alt",
			"ctrl"
		].includes(value)) return kbdKeysSpecificMap[value];
		return kbdKeysMap[value] || value;
	}
	return {
		macOS,
		getKbdKey
	};
};
var useKbd = /* @__PURE__ */ createSharedComposable(_useKbd);
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fkbd.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fkbd_default = {
	"base": "inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans uppercase",
	"variants": {
		"color": {
			"primary": "",
			"secondary": "",
			"success": "",
			"info": "",
			"warning": "",
			"error": "",
			"neutral": ""
		},
		"variant": {
			"solid": "",
			"outline": "",
			"soft": "",
			"subtle": ""
		},
		"size": {
			"sm": "h-4 min-w-[16px] text-[10px]",
			"md": "h-5 min-w-[20px] text-[11px]",
			"lg": "h-6 min-w-[24px] text-[12px]"
		}
	},
	"compoundVariants": [
		{
			"color": "primary",
			"variant": "solid",
			"class": "text-inverted bg-primary"
		},
		{
			"color": "secondary",
			"variant": "solid",
			"class": "text-inverted bg-secondary"
		},
		{
			"color": "success",
			"variant": "solid",
			"class": "text-inverted bg-success"
		},
		{
			"color": "info",
			"variant": "solid",
			"class": "text-inverted bg-info"
		},
		{
			"color": "warning",
			"variant": "solid",
			"class": "text-inverted bg-warning"
		},
		{
			"color": "error",
			"variant": "solid",
			"class": "text-inverted bg-error"
		},
		{
			"color": "primary",
			"variant": "outline",
			"class": "ring ring-inset ring-primary/50 text-primary"
		},
		{
			"color": "secondary",
			"variant": "outline",
			"class": "ring ring-inset ring-secondary/50 text-secondary"
		},
		{
			"color": "success",
			"variant": "outline",
			"class": "ring ring-inset ring-success/50 text-success"
		},
		{
			"color": "info",
			"variant": "outline",
			"class": "ring ring-inset ring-info/50 text-info"
		},
		{
			"color": "warning",
			"variant": "outline",
			"class": "ring ring-inset ring-warning/50 text-warning"
		},
		{
			"color": "error",
			"variant": "outline",
			"class": "ring ring-inset ring-error/50 text-error"
		},
		{
			"color": "primary",
			"variant": "soft",
			"class": "text-primary bg-primary/10"
		},
		{
			"color": "secondary",
			"variant": "soft",
			"class": "text-secondary bg-secondary/10"
		},
		{
			"color": "success",
			"variant": "soft",
			"class": "text-success bg-success/10"
		},
		{
			"color": "info",
			"variant": "soft",
			"class": "text-info bg-info/10"
		},
		{
			"color": "warning",
			"variant": "soft",
			"class": "text-warning bg-warning/10"
		},
		{
			"color": "error",
			"variant": "soft",
			"class": "text-error bg-error/10"
		},
		{
			"color": "primary",
			"variant": "subtle",
			"class": "text-primary ring ring-inset ring-primary/25 bg-primary/10"
		},
		{
			"color": "secondary",
			"variant": "subtle",
			"class": "text-secondary ring ring-inset ring-secondary/25 bg-secondary/10"
		},
		{
			"color": "success",
			"variant": "subtle",
			"class": "text-success ring ring-inset ring-success/25 bg-success/10"
		},
		{
			"color": "info",
			"variant": "subtle",
			"class": "text-info ring ring-inset ring-info/25 bg-info/10"
		},
		{
			"color": "warning",
			"variant": "subtle",
			"class": "text-warning ring ring-inset ring-warning/25 bg-warning/10"
		},
		{
			"color": "error",
			"variant": "subtle",
			"class": "text-error ring ring-inset ring-error/25 bg-error/10"
		},
		{
			"color": "neutral",
			"variant": "solid",
			"class": "text-inverted bg-inverted"
		},
		{
			"color": "neutral",
			"variant": "outline",
			"class": "ring ring-inset ring-accented text-default bg-default"
		},
		{
			"color": "neutral",
			"variant": "soft",
			"class": "text-default bg-elevated"
		},
		{
			"color": "neutral",
			"variant": "subtle",
			"class": "ring ring-inset ring-accented text-default bg-elevated"
		}
	],
	"defaultVariants": {
		"variant": "outline",
		"color": "neutral",
		"size": "md"
	}
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_34dffa26c25098eb8314796249c1dfc0/node_modules/@nuxt/ui/dist/runtime/components/Kbd.vue
var _sfc_main$4 = {
	__name: "UKbd",
	__ssrInlineRender: true,
	props: {
		as: {
			type: null,
			required: false,
			default: "kbd"
		},
		value: {
			type: null,
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
		const props = useComponentProps("kbd", __props);
		const { getKbdKey } = useKbd();
		const appConfig = useAppConfig();
		const ui = (0, vue_exports.computed)(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fkbd_default,
			...appConfig.ui?.kbd || {}
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(Primitive), (0, vue_exports.mergeProps)({
				as: (0, vue_exports.unref)(props).as,
				class: ui.value({
					class: [(0, vue_exports.unref)(props).ui?.base, (0, vue_exports.unref)(props).class],
					color: (0, vue_exports.unref)(props).color,
					variant: (0, vue_exports.unref)(props).variant,
					size: (0, vue_exports.unref)(props).size
				})
			}, _attrs), {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) (0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "default", {}, () => {
						_push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(getKbdKey)((0, vue_exports.unref)(props).value))}`);
					}, _push, _parent, _scopeId);
					else return [(0, vue_exports.renderSlot)(_ctx.$slots, "default", {}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(getKbdKey)((0, vue_exports.unref)(props).value)), 1)])];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$6 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_34dffa26c25098eb8314796249c1dfc0/node_modules/@nuxt/ui/dist/runtime/components/Kbd.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_34dffa26c25098eb8314796249c1dfc0/node_modules/@nuxt/ui/dist/runtime/components/DropdownMenuContent.vue
var _sfc_main$3 = {
	__name: "UDropdownMenuContent",
	__ssrInlineRender: true,
	props: {
		items: {
			type: null,
			required: false
		},
		portal: {
			type: [Boolean, String],
			required: false,
			skipCheck: true
		},
		sub: {
			type: Boolean,
			required: false
		},
		labelKey: {
			type: null,
			required: true
		},
		descriptionKey: {
			type: null,
			required: true
		},
		checkedIcon: {
			type: null,
			required: false
		},
		loadingIcon: {
			type: null,
			required: false
		},
		externalIcon: {
			type: [Boolean, String],
			required: false,
			skipCheck: true
		},
		size: {
			type: null,
			required: false
		},
		filter: {
			type: [Boolean, Object],
			required: false
		},
		filterFields: {
			type: Array,
			required: false
		},
		ignoreFilter: {
			type: Boolean,
			required: false
		},
		searchTerm: {
			type: String,
			required: false
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: null,
			required: true
		},
		uiOverride: {
			type: null,
			required: false
		},
		loop: {
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
		}
	},
	emits: [
		"update:searchTerm",
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const slots = (0, vue_exports.useSlots)();
		const { t, dir } = useLocale();
		const appConfig = useAppConfig();
		const { filterGroups } = useFilter();
		const _searchTerm = (0, vue_exports.ref)("");
		const searchTerm = (0, vue_exports.computed)({
			get: () => props.searchTerm ?? _searchTerm.value,
			set: (value) => {
				_searchTerm.value = value;
				emits("update:searchTerm", value);
			}
		});
		const inputProps = (0, vue_exports.toRef)(() => defu(props.filter, {
			placeholder: t("dropdownMenu.search"),
			variant: "none"
		}));
		const portalProps = usePortal((0, vue_exports.toRef)(() => props.portal));
		const contentProps = useForwardPropsEmits(reactiveOmit(props, "sub", "items", "portal", "labelKey", "descriptionKey", "checkedIcon", "loadingIcon", "externalIcon", "size", "filter", "filterFields", "ignoreFilter", "searchTerm", "class", "ui", "uiOverride"), emits);
		const getProxySlots = () => omit(slots, ["default"]);
		const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate();
		const childrenIcon = (0, vue_exports.computed)(() => dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight);
		const groups = (0, vue_exports.computed)(() => {
			if (!props.items?.length) return [];
			return isArrayOfArray(props.items) ? props.items : [props.items];
		});
		const isStructuralItem = (item) => !!item.type && ["label", "separator"].includes(item.type);
		const filteredGroups = (0, vue_exports.computed)(() => {
			if (!props.filter || props.ignoreFilter || !searchTerm.value) return groups.value;
			const fields = Array.isArray(props.filterFields) && props.filterFields.length ? props.filterFields : [props.labelKey];
			return filterGroups(groups.value, searchTerm.value, {
				fields,
				isStructural: isStructuralItem
			});
		});
		const hasFilteredItems = (0, vue_exports.computed)(() => filteredGroups.value.some((group) => group.some((item) => !isStructuralItem(item))));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(DefineItemTemplate), null, {
				default: (0, vue_exports.withCtx)(({ item, active, index }, _push, _parent, _scopeId) => {
					if (_push) (0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, item.slot || "item", {
						item,
						index,
						ui: __props.ui
					}, () => {
						(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
							item,
							active,
							index,
							ui: __props.ui
						}, () => {
							if (item.loading) _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$5$1, {
								name: __props.loadingIcon || (0, vue_exports.unref)(appConfig).ui.icons.loading,
								"data-slot": "itemLeadingIcon",
								class: __props.ui.itemLeadingIcon({
									class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon],
									color: item?.color,
									loading: true
								})
							}, null, _parent, _scopeId));
							else if (item.icon) _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$5$1, {
								name: item.icon,
								"data-slot": "itemLeadingIcon",
								class: __props.ui.itemLeadingIcon({
									class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon],
									color: item?.color,
									active
								})
							}, null, _parent, _scopeId));
							else if (item.avatar) _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$3$1, (0, vue_exports.mergeProps)({ size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize() }, item.avatar, {
								"data-slot": "itemLeadingAvatar",
								class: __props.ui.itemLeadingAvatar({
									class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar],
									active
								})
							}), null, _parent, _scopeId));
							else _push(`<!---->`);
						}, _push, _parent, _scopeId);
						if ((0, vue_exports.unref)(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] || (0, vue_exports.unref)(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"]) {
							_push(`<span data-slot="itemWrapper" class="${(0, server_renderer_exports.ssrRenderClass)(__props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] }))}"${_scopeId}><span data-slot="itemLabel" class="${(0, server_renderer_exports.ssrRenderClass)(__props.ui.itemLabel({
								class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel],
								active
							}))}"${_scopeId}>`);
							(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
								item,
								active,
								index
							}, () => {
								_push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(get)(item, props.labelKey))}`);
							}, _push, _parent, _scopeId);
							if (item.target === "_blank" && __props.externalIcon !== false) _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$5$1, {
								name: typeof __props.externalIcon === "string" ? __props.externalIcon : (0, vue_exports.unref)(appConfig).ui.icons.external,
								"data-slot": "itemLabelExternalIcon",
								class: __props.ui.itemLabelExternalIcon({
									class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon],
									color: item?.color,
									active
								})
							}, null, _parent, _scopeId));
							else _push(`<!---->`);
							_push(`</span>`);
							if ((0, vue_exports.unref)(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"]) {
								_push(`<span data-slot="itemDescription" class="${(0, server_renderer_exports.ssrRenderClass)(__props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] }))}"${_scopeId}>`);
								(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, item.slot ? `${item.slot}-description` : "item-description", {
									item,
									active,
									index
								}, () => {
									_push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(get)(item, props.descriptionKey))}`);
								}, _push, _parent, _scopeId);
								_push(`</span>`);
							} else _push(`<!---->`);
							_push(`</span>`);
						} else _push(`<!---->`);
						_push(`<span data-slot="itemTrailing" class="${(0, server_renderer_exports.ssrRenderClass)(__props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] }))}"${_scopeId}>`);
						(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
							item,
							active,
							index,
							ui: __props.ui
						}, () => {
							if (item.children?.length) _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$5$1, {
								name: childrenIcon.value,
								"data-slot": "itemTrailingIcon",
								class: __props.ui.itemTrailingIcon({
									class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon],
									color: item?.color,
									active
								})
							}, null, _parent, _scopeId));
							else if (item.kbds?.length) {
								_push(`<span data-slot="itemTrailingKbds" class="${(0, server_renderer_exports.ssrRenderClass)(__props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] }))}"${_scopeId}><!--[-->`);
								(0, server_renderer_exports.ssrRenderList)(item.kbds, (kbd, kbdIndex) => {
									_push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$4, (0, vue_exports.mergeProps)({
										key: kbdIndex,
										size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
									}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent, _scopeId));
								});
								_push(`<!--]--></span>`);
							} else _push(`<!---->`);
						}, _push, _parent, _scopeId);
						_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(DropdownMenu).ItemIndicator, { "as-child": "" }, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$5$1, {
									name: __props.checkedIcon || (0, vue_exports.unref)(appConfig).ui.icons.check,
									"data-slot": "itemTrailingIcon",
									class: __props.ui.itemTrailingIcon({
										class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon],
										color: item?.color
									})
								}, null, _parent, _scopeId));
								else return [(0, vue_exports.createVNode)(_sfc_main$5$1, {
									name: __props.checkedIcon || (0, vue_exports.unref)(appConfig).ui.icons.check,
									"data-slot": "itemTrailingIcon",
									class: __props.ui.itemTrailingIcon({
										class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon],
										color: item?.color
									})
								}, null, 8, ["name", "class"])];
							}),
							_: 2
						}, _parent, _scopeId));
						_push(`</span>`);
					}, _push, _parent, _scopeId);
					else return [(0, vue_exports.renderSlot)(_ctx.$slots, item.slot || "item", {
						item,
						index,
						ui: __props.ui
					}, () => [
						(0, vue_exports.renderSlot)(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
							item,
							active,
							index,
							ui: __props.ui
						}, () => [item.loading ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$5$1, {
							key: 0,
							name: __props.loadingIcon || (0, vue_exports.unref)(appConfig).ui.icons.loading,
							"data-slot": "itemLeadingIcon",
							class: __props.ui.itemLeadingIcon({
								class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon],
								color: item?.color,
								loading: true
							})
						}, null, 8, ["name", "class"])) : item.icon ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$5$1, {
							key: 1,
							name: item.icon,
							"data-slot": "itemLeadingIcon",
							class: __props.ui.itemLeadingIcon({
								class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon],
								color: item?.color,
								active
							})
						}, null, 8, ["name", "class"])) : item.avatar ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$3$1, (0, vue_exports.mergeProps)({
							key: 2,
							size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize()
						}, item.avatar, {
							"data-slot": "itemLeadingAvatar",
							class: __props.ui.itemLeadingAvatar({
								class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar],
								active
							})
						}), null, 16, ["size", "class"])) : (0, vue_exports.createCommentVNode)("", true)]),
						(0, vue_exports.unref)(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] || (0, vue_exports.unref)(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"] ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("span", {
							key: 0,
							"data-slot": "itemWrapper",
							class: __props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] })
						}, [(0, vue_exports.createVNode)("span", {
							"data-slot": "itemLabel",
							class: __props.ui.itemLabel({
								class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel],
								active
							})
						}, [(0, vue_exports.renderSlot)(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
							item,
							active,
							index
						}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, props.labelKey)), 1)]), item.target === "_blank" && __props.externalIcon !== false ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$5$1, {
							key: 0,
							name: typeof __props.externalIcon === "string" ? __props.externalIcon : (0, vue_exports.unref)(appConfig).ui.icons.external,
							"data-slot": "itemLabelExternalIcon",
							class: __props.ui.itemLabelExternalIcon({
								class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon],
								color: item?.color,
								active
							})
						}, null, 8, ["name", "class"])) : (0, vue_exports.createCommentVNode)("", true)], 2), (0, vue_exports.unref)(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"] ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("span", {
							key: 0,
							"data-slot": "itemDescription",
							class: __props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] })
						}, [(0, vue_exports.renderSlot)(_ctx.$slots, item.slot ? `${item.slot}-description` : "item-description", {
							item,
							active,
							index
						}, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(get)(item, props.descriptionKey)), 1)])], 2)) : (0, vue_exports.createCommentVNode)("", true)], 2)) : (0, vue_exports.createCommentVNode)("", true),
						(0, vue_exports.createVNode)("span", {
							"data-slot": "itemTrailing",
							class: __props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] })
						}, [(0, vue_exports.renderSlot)(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
							item,
							active,
							index,
							ui: __props.ui
						}, () => [item.children?.length ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$5$1, {
							key: 0,
							name: childrenIcon.value,
							"data-slot": "itemTrailingIcon",
							class: __props.ui.itemTrailingIcon({
								class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon],
								color: item?.color,
								active
							})
						}, null, 8, ["name", "class"])) : item.kbds?.length ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("span", {
							key: 1,
							"data-slot": "itemTrailingKbds",
							class: __props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
						}, [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(item.kbds, (kbd, kbdIndex) => {
							return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$4, (0, vue_exports.mergeProps)({
								key: kbdIndex,
								size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
							}, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
						}), 128))], 2)) : (0, vue_exports.createCommentVNode)("", true)]), (0, vue_exports.createVNode)((0, vue_exports.unref)(DropdownMenu).ItemIndicator, { "as-child": "" }, {
							default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$5$1, {
								name: __props.checkedIcon || (0, vue_exports.unref)(appConfig).ui.icons.check,
								"data-slot": "itemTrailingIcon",
								class: __props.ui.itemTrailingIcon({
									class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon],
									color: item?.color
								})
							}, null, 8, ["name", "class"])]),
							_: 2
						}, 1024)], 2)
					])];
				}),
				_: 3
			}, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(DropdownMenu).Portal, (0, vue_exports.unref)(portalProps), {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(FieldGroupReset), null, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) (0, server_renderer_exports.ssrRenderVNode)(_push, (0, vue_exports.createVNode)((0, vue_exports.resolveDynamicComponent)(__props.sub ? (0, vue_exports.unref)(DropdownMenu).SubContent : (0, vue_exports.unref)(DropdownMenu).Content), (0, vue_exports.mergeProps)({
								"data-slot": "content",
								class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
							}, (0, vue_exports.unref)(contentProps)), {
								default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
									if (_push) {
										if (!!__props.filter) _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(DropdownMenu).Filter, {
											modelValue: searchTerm.value,
											"onUpdate:modelValue": ($event) => searchTerm.value = $event,
											"as-child": ""
										}, {
											default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
												if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$6, (0, vue_exports.mergeProps)({
													autofocus: "",
													autocomplete: "off",
													size: __props.size
												}, inputProps.value, {
													"data-slot": "input",
													class: __props.ui.input({ class: __props.uiOverride?.input }),
													onChange: () => {}
												}), null, _parent, _scopeId));
												else return [(0, vue_exports.createVNode)(_sfc_main$6, (0, vue_exports.mergeProps)({
													autofocus: "",
													autocomplete: "off",
													size: __props.size
												}, inputProps.value, {
													"data-slot": "input",
													class: __props.ui.input({ class: __props.uiOverride?.input }),
													onChange: (0, vue_exports.withModifiers)(() => {}, ["stop"])
												}), null, 16, [
													"size",
													"class",
													"onChange"
												])];
											}),
											_: 1
										}, _parent, _scopeId));
										else _push(`<!---->`);
										(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "content-top", { sub: __props.sub ?? false }, null, _push, _parent, _scopeId);
										if (!searchTerm.value || hasFilteredItems.value) {
											_push(`<div role="presentation" data-slot="viewport" class="${(0, server_renderer_exports.ssrRenderClass)(__props.ui.viewport({ class: __props.uiOverride?.viewport }))}"${_scopeId}><!--[-->`);
											(0, server_renderer_exports.ssrRenderList)(filteredGroups.value, (group, groupIndex) => {
												_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(DropdownMenu).Group, {
													key: `group-${groupIndex}`,
													"data-slot": "group",
													class: __props.ui.group({ class: __props.uiOverride?.group })
												}, {
													default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
														if (_push) {
															_push(`<!--[-->`);
															(0, server_renderer_exports.ssrRenderList)(group, (item, index) => {
																_push(`<!--[-->`);
																if (item.type === "label") _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(DropdownMenu).Label, {
																	"data-slot": "label",
																	class: __props.ui.label({ class: [
																		__props.uiOverride?.label,
																		item.ui?.label,
																		item.class
																	] })
																}, {
																	default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
																		if (_push) _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(ReuseItemTemplate), {
																			item,
																			index
																		}, null, _parent, _scopeId));
																		else return [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
																			item,
																			index
																		}, null, 8, ["item", "index"])];
																	}),
																	_: 2
																}, _parent, _scopeId));
																else if (item.type === "separator") _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(DropdownMenu).Separator, {
																	"data-slot": "separator",
																	class: __props.ui.separator({ class: [
																		__props.uiOverride?.separator,
																		item.ui?.separator,
																		item.class
																	] })
																}, null, _parent, _scopeId));
																else if (item?.children?.length) _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(DropdownMenu).Sub, {
																	open: item.open,
																	"default-open": item.defaultOpen
																}, {
																	default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
																		if (_push) {
																			_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(DropdownMenu).SubTrigger, {
																				as: "button",
																				type: "button",
																				disabled: item.disabled,
																				"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
																				"data-slot": "item",
																				class: __props.ui.item({
																					class: [
																						__props.uiOverride?.item,
																						item.ui?.item,
																						item.class
																					],
																					color: item?.color
																				})
																			}, {
																				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
																					if (_push) _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(ReuseItemTemplate), {
																						item,
																						index
																					}, null, _parent, _scopeId));
																					else return [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
																						item,
																						index
																					}, null, 8, ["item", "index"])];
																				}),
																				_: 2
																			}, _parent, _scopeId));
																			_push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$3, (0, vue_exports.mergeProps)({
																				sub: "",
																				class: item.ui?.content,
																				ui: __props.ui,
																				"ui-override": __props.uiOverride,
																				portal: __props.portal,
																				items: item.children,
																				align: "start",
																				"align-offset": -4,
																				"side-offset": 3,
																				"label-key": __props.labelKey,
																				"description-key": __props.descriptionKey,
																				"checked-icon": __props.checkedIcon,
																				"loading-icon": __props.loadingIcon,
																				"external-icon": __props.externalIcon,
																				size: __props.size,
																				filter: item.filter,
																				"filter-fields": item.filterFields || __props.filterFields,
																				"ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
																			}, { ref_for: true }, item.content), (0, vue_exports.createSlots)({ _: 2 }, [(0, vue_exports.renderList)(getProxySlots(), (_, name) => {
																				return {
																					name,
																					fn: (0, vue_exports.withCtx)((slotData, _push, _parent, _scopeId) => {
																						if (_push) (0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, name, (0, vue_exports.mergeProps)({ ref_for: true }, slotData), null, _push, _parent, _scopeId);
																						else return [(0, vue_exports.renderSlot)(_ctx.$slots, name, (0, vue_exports.mergeProps)({ ref_for: true }, slotData))];
																					})
																				};
																			})]), _parent, _scopeId));
																		} else return [(0, vue_exports.createVNode)((0, vue_exports.unref)(DropdownMenu).SubTrigger, {
																			as: "button",
																			type: "button",
																			disabled: item.disabled,
																			"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
																			"data-slot": "item",
																			class: __props.ui.item({
																				class: [
																					__props.uiOverride?.item,
																					item.ui?.item,
																					item.class
																				],
																				color: item?.color
																			})
																		}, {
																			default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
																				item,
																				index
																			}, null, 8, ["item", "index"])]),
																			_: 2
																		}, 1032, [
																			"disabled",
																			"text-value",
																			"class"
																		]), (0, vue_exports.createVNode)(_sfc_main$3, (0, vue_exports.mergeProps)({
																			sub: "",
																			class: item.ui?.content,
																			ui: __props.ui,
																			"ui-override": __props.uiOverride,
																			portal: __props.portal,
																			items: item.children,
																			align: "start",
																			"align-offset": -4,
																			"side-offset": 3,
																			"label-key": __props.labelKey,
																			"description-key": __props.descriptionKey,
																			"checked-icon": __props.checkedIcon,
																			"loading-icon": __props.loadingIcon,
																			"external-icon": __props.externalIcon,
																			size: __props.size,
																			filter: item.filter,
																			"filter-fields": item.filterFields || __props.filterFields,
																			"ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
																		}, { ref_for: true }, item.content), (0, vue_exports.createSlots)({ _: 2 }, [(0, vue_exports.renderList)(getProxySlots(), (_, name) => {
																			return {
																				name,
																				fn: (0, vue_exports.withCtx)((slotData) => [(0, vue_exports.renderSlot)(_ctx.$slots, name, (0, vue_exports.mergeProps)({ ref_for: true }, slotData))])
																			};
																		})]), 1040, [
																			"class",
																			"ui",
																			"ui-override",
																			"portal",
																			"items",
																			"label-key",
																			"description-key",
																			"checked-icon",
																			"loading-icon",
																			"external-icon",
																			"size",
																			"filter",
																			"filter-fields",
																			"ignore-filter"
																		])];
																	}),
																	_: 2
																}, _parent, _scopeId));
																else if (item.type === "checkbox") _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(DropdownMenu).CheckboxItem, {
																	"model-value": item.checked,
																	disabled: item.disabled,
																	"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
																	"data-slot": "item",
																	class: __props.ui.item({
																		class: [
																			__props.uiOverride?.item,
																			item.ui?.item,
																			item.class
																		],
																		color: item?.color
																	}),
																	"onUpdate:modelValue": item.onUpdateChecked,
																	onSelect: item.onSelect
																}, {
																	default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
																		if (_push) _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(ReuseItemTemplate), {
																			item,
																			index
																		}, null, _parent, _scopeId));
																		else return [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
																			item,
																			index
																		}, null, 8, ["item", "index"])];
																	}),
																	_: 2
																}, _parent, _scopeId));
																else _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$1$1, (0, vue_exports.mergeProps)({ ref_for: true }, (0, vue_exports.unref)(pickLinkProps)(item), { custom: "" }), {
																	default: (0, vue_exports.withCtx)(({ active, ...slotProps }, _push, _parent, _scopeId) => {
																		if (_push) _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(DropdownMenu).Item, {
																			"as-child": "",
																			disabled: item.disabled,
																			"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
																			onSelect: item.onSelect
																		}, {
																			default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
																				if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$2$1, (0, vue_exports.mergeProps)({ ref_for: true }, slotProps, {
																					"data-slot": "item",
																					class: __props.ui.item({
																						class: [
																							__props.uiOverride?.item,
																							item.ui?.item,
																							item.class
																						],
																						color: item?.color,
																						active
																					})
																				}), {
																					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
																						if (_push) _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(ReuseItemTemplate), {
																							item,
																							active,
																							index
																						}, null, _parent, _scopeId));
																						else return [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
																							item,
																							active,
																							index
																						}, null, 8, [
																							"item",
																							"active",
																							"index"
																						])];
																					}),
																					_: 2
																				}, _parent, _scopeId));
																				else return [(0, vue_exports.createVNode)(_sfc_main$2$1, (0, vue_exports.mergeProps)({ ref_for: true }, slotProps, {
																					"data-slot": "item",
																					class: __props.ui.item({
																						class: [
																							__props.uiOverride?.item,
																							item.ui?.item,
																							item.class
																						],
																						color: item?.color,
																						active
																					})
																				}), {
																					default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
																						item,
																						active,
																						index
																					}, null, 8, [
																						"item",
																						"active",
																						"index"
																					])]),
																					_: 2
																				}, 1040, ["class"])];
																			}),
																			_: 2
																		}, _parent, _scopeId));
																		else return [(0, vue_exports.createVNode)((0, vue_exports.unref)(DropdownMenu).Item, {
																			"as-child": "",
																			disabled: item.disabled,
																			"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
																			onSelect: item.onSelect
																		}, {
																			default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$2$1, (0, vue_exports.mergeProps)({ ref_for: true }, slotProps, {
																				"data-slot": "item",
																				class: __props.ui.item({
																					class: [
																						__props.uiOverride?.item,
																						item.ui?.item,
																						item.class
																					],
																					color: item?.color,
																					active
																				})
																			}), {
																				default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
																					item,
																					active,
																					index
																				}, null, 8, [
																					"item",
																					"active",
																					"index"
																				])]),
																				_: 2
																			}, 1040, ["class"])]),
																			_: 2
																		}, 1032, [
																			"disabled",
																			"text-value",
																			"onSelect"
																		])];
																	}),
																	_: 2
																}, _parent, _scopeId));
																_push(`<!--]-->`);
															});
															_push(`<!--]-->`);
														} else return [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(group, (item, index) => {
															return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(vue_exports.Fragment, { key: `group-${groupIndex}-${index}` }, [item.type === "label" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Label, {
																key: 0,
																"data-slot": "label",
																class: __props.ui.label({ class: [
																	__props.uiOverride?.label,
																	item.ui?.label,
																	item.class
																] })
															}, {
																default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
																	item,
																	index
																}, null, 8, ["item", "index"])]),
																_: 2
															}, 1032, ["class"])) : item.type === "separator" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Separator, {
																key: 1,
																"data-slot": "separator",
																class: __props.ui.separator({ class: [
																	__props.uiOverride?.separator,
																	item.ui?.separator,
																	item.class
																] })
															}, null, 8, ["class"])) : item?.children?.length ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Sub, {
																key: 2,
																open: item.open,
																"default-open": item.defaultOpen
															}, {
																default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(DropdownMenu).SubTrigger, {
																	as: "button",
																	type: "button",
																	disabled: item.disabled,
																	"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
																	"data-slot": "item",
																	class: __props.ui.item({
																		class: [
																			__props.uiOverride?.item,
																			item.ui?.item,
																			item.class
																		],
																		color: item?.color
																	})
																}, {
																	default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
																		item,
																		index
																	}, null, 8, ["item", "index"])]),
																	_: 2
																}, 1032, [
																	"disabled",
																	"text-value",
																	"class"
																]), (0, vue_exports.createVNode)(_sfc_main$3, (0, vue_exports.mergeProps)({
																	sub: "",
																	class: item.ui?.content,
																	ui: __props.ui,
																	"ui-override": __props.uiOverride,
																	portal: __props.portal,
																	items: item.children,
																	align: "start",
																	"align-offset": -4,
																	"side-offset": 3,
																	"label-key": __props.labelKey,
																	"description-key": __props.descriptionKey,
																	"checked-icon": __props.checkedIcon,
																	"loading-icon": __props.loadingIcon,
																	"external-icon": __props.externalIcon,
																	size: __props.size,
																	filter: item.filter,
																	"filter-fields": item.filterFields || __props.filterFields,
																	"ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
																}, { ref_for: true }, item.content), (0, vue_exports.createSlots)({ _: 2 }, [(0, vue_exports.renderList)(getProxySlots(), (_, name) => {
																	return {
																		name,
																		fn: (0, vue_exports.withCtx)((slotData) => [(0, vue_exports.renderSlot)(_ctx.$slots, name, (0, vue_exports.mergeProps)({ ref_for: true }, slotData))])
																	};
																})]), 1040, [
																	"class",
																	"ui",
																	"ui-override",
																	"portal",
																	"items",
																	"label-key",
																	"description-key",
																	"checked-icon",
																	"loading-icon",
																	"external-icon",
																	"size",
																	"filter",
																	"filter-fields",
																	"ignore-filter"
																])]),
																_: 2
															}, 1032, ["open", "default-open"])) : item.type === "checkbox" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).CheckboxItem, {
																key: 3,
																"model-value": item.checked,
																disabled: item.disabled,
																"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
																"data-slot": "item",
																class: __props.ui.item({
																	class: [
																		__props.uiOverride?.item,
																		item.ui?.item,
																		item.class
																	],
																	color: item?.color
																}),
																"onUpdate:modelValue": item.onUpdateChecked,
																onSelect: item.onSelect
															}, {
																default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
																	item,
																	index
																}, null, 8, ["item", "index"])]),
																_: 2
															}, 1032, [
																"model-value",
																"disabled",
																"text-value",
																"class",
																"onUpdate:modelValue",
																"onSelect"
															])) : ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$1$1, (0, vue_exports.mergeProps)({
																key: 4,
																ref_for: true
															}, (0, vue_exports.unref)(pickLinkProps)(item), { custom: "" }), {
																default: (0, vue_exports.withCtx)(({ active, ...slotProps }) => [(0, vue_exports.createVNode)((0, vue_exports.unref)(DropdownMenu).Item, {
																	"as-child": "",
																	disabled: item.disabled,
																	"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
																	onSelect: item.onSelect
																}, {
																	default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$2$1, (0, vue_exports.mergeProps)({ ref_for: true }, slotProps, {
																		"data-slot": "item",
																		class: __props.ui.item({
																			class: [
																				__props.uiOverride?.item,
																				item.ui?.item,
																				item.class
																			],
																			color: item?.color,
																			active
																		})
																	}), {
																		default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
																			item,
																			active,
																			index
																		}, null, 8, [
																			"item",
																			"active",
																			"index"
																		])]),
																		_: 2
																	}, 1040, ["class"])]),
																	_: 2
																}, 1032, [
																	"disabled",
																	"text-value",
																	"onSelect"
																])]),
																_: 2
															}, 1040))], 64);
														}), 128))];
													}),
													_: 2
												}, _parent, _scopeId));
											});
											_push(`<!--]--></div>`);
										} else _push(`<!---->`);
										if (searchTerm.value && !hasFilteredItems.value) {
											_push(`<div data-slot="empty" class="${(0, server_renderer_exports.ssrRenderClass)(__props.ui.empty({ class: __props.uiOverride?.empty }))}"${_scopeId}>`);
											(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => {
												_push(`${(0, server_renderer_exports.ssrInterpolate)((0, vue_exports.unref)(t)("dropdownMenu.noMatch", { searchTerm: searchTerm.value }))}`);
											}, _push, _parent, _scopeId);
											_push(`</div>`);
										} else _push(`<!---->`);
										(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
										(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "content-bottom", { sub: __props.sub ?? false }, null, _push, _parent, _scopeId);
									} else return [
										!!__props.filter ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Filter, {
											key: 0,
											modelValue: searchTerm.value,
											"onUpdate:modelValue": ($event) => searchTerm.value = $event,
											"as-child": ""
										}, {
											default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$6, (0, vue_exports.mergeProps)({
												autofocus: "",
												autocomplete: "off",
												size: __props.size
											}, inputProps.value, {
												"data-slot": "input",
												class: __props.ui.input({ class: __props.uiOverride?.input }),
												onChange: (0, vue_exports.withModifiers)(() => {}, ["stop"])
											}), null, 16, [
												"size",
												"class",
												"onChange"
											])]),
											_: 1
										}, 8, ["modelValue", "onUpdate:modelValue"])) : (0, vue_exports.createCommentVNode)("", true),
										(0, vue_exports.renderSlot)(_ctx.$slots, "content-top", { sub: __props.sub ?? false }),
										!searchTerm.value || hasFilteredItems.value ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", {
											key: 1,
											role: "presentation",
											"data-slot": "viewport",
											class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
										}, [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(filteredGroups.value, (group, groupIndex) => {
											return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Group, {
												key: `group-${groupIndex}`,
												"data-slot": "group",
												class: __props.ui.group({ class: __props.uiOverride?.group })
											}, {
												default: (0, vue_exports.withCtx)(() => [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(group, (item, index) => {
													return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(vue_exports.Fragment, { key: `group-${groupIndex}-${index}` }, [item.type === "label" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Label, {
														key: 0,
														"data-slot": "label",
														class: __props.ui.label({ class: [
															__props.uiOverride?.label,
															item.ui?.label,
															item.class
														] })
													}, {
														default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
															item,
															index
														}, null, 8, ["item", "index"])]),
														_: 2
													}, 1032, ["class"])) : item.type === "separator" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Separator, {
														key: 1,
														"data-slot": "separator",
														class: __props.ui.separator({ class: [
															__props.uiOverride?.separator,
															item.ui?.separator,
															item.class
														] })
													}, null, 8, ["class"])) : item?.children?.length ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Sub, {
														key: 2,
														open: item.open,
														"default-open": item.defaultOpen
													}, {
														default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(DropdownMenu).SubTrigger, {
															as: "button",
															type: "button",
															disabled: item.disabled,
															"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
															"data-slot": "item",
															class: __props.ui.item({
																class: [
																	__props.uiOverride?.item,
																	item.ui?.item,
																	item.class
																],
																color: item?.color
															})
														}, {
															default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
																item,
																index
															}, null, 8, ["item", "index"])]),
															_: 2
														}, 1032, [
															"disabled",
															"text-value",
															"class"
														]), (0, vue_exports.createVNode)(_sfc_main$3, (0, vue_exports.mergeProps)({
															sub: "",
															class: item.ui?.content,
															ui: __props.ui,
															"ui-override": __props.uiOverride,
															portal: __props.portal,
															items: item.children,
															align: "start",
															"align-offset": -4,
															"side-offset": 3,
															"label-key": __props.labelKey,
															"description-key": __props.descriptionKey,
															"checked-icon": __props.checkedIcon,
															"loading-icon": __props.loadingIcon,
															"external-icon": __props.externalIcon,
															size: __props.size,
															filter: item.filter,
															"filter-fields": item.filterFields || __props.filterFields,
															"ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
														}, { ref_for: true }, item.content), (0, vue_exports.createSlots)({ _: 2 }, [(0, vue_exports.renderList)(getProxySlots(), (_, name) => {
															return {
																name,
																fn: (0, vue_exports.withCtx)((slotData) => [(0, vue_exports.renderSlot)(_ctx.$slots, name, (0, vue_exports.mergeProps)({ ref_for: true }, slotData))])
															};
														})]), 1040, [
															"class",
															"ui",
															"ui-override",
															"portal",
															"items",
															"label-key",
															"description-key",
															"checked-icon",
															"loading-icon",
															"external-icon",
															"size",
															"filter",
															"filter-fields",
															"ignore-filter"
														])]),
														_: 2
													}, 1032, ["open", "default-open"])) : item.type === "checkbox" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).CheckboxItem, {
														key: 3,
														"model-value": item.checked,
														disabled: item.disabled,
														"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
														"data-slot": "item",
														class: __props.ui.item({
															class: [
																__props.uiOverride?.item,
																item.ui?.item,
																item.class
															],
															color: item?.color
														}),
														"onUpdate:modelValue": item.onUpdateChecked,
														onSelect: item.onSelect
													}, {
														default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
															item,
															index
														}, null, 8, ["item", "index"])]),
														_: 2
													}, 1032, [
														"model-value",
														"disabled",
														"text-value",
														"class",
														"onUpdate:modelValue",
														"onSelect"
													])) : ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$1$1, (0, vue_exports.mergeProps)({
														key: 4,
														ref_for: true
													}, (0, vue_exports.unref)(pickLinkProps)(item), { custom: "" }), {
														default: (0, vue_exports.withCtx)(({ active, ...slotProps }) => [(0, vue_exports.createVNode)((0, vue_exports.unref)(DropdownMenu).Item, {
															"as-child": "",
															disabled: item.disabled,
															"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
															onSelect: item.onSelect
														}, {
															default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$2$1, (0, vue_exports.mergeProps)({ ref_for: true }, slotProps, {
																"data-slot": "item",
																class: __props.ui.item({
																	class: [
																		__props.uiOverride?.item,
																		item.ui?.item,
																		item.class
																	],
																	color: item?.color,
																	active
																})
															}), {
																default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
																	item,
																	active,
																	index
																}, null, 8, [
																	"item",
																	"active",
																	"index"
																])]),
																_: 2
															}, 1040, ["class"])]),
															_: 2
														}, 1032, [
															"disabled",
															"text-value",
															"onSelect"
														])]),
														_: 2
													}, 1040))], 64);
												}), 128))]),
												_: 2
											}, 1032, ["class"]);
										}), 128))], 2)) : (0, vue_exports.createCommentVNode)("", true),
										searchTerm.value && !hasFilteredItems.value ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", {
											key: 2,
											"data-slot": "empty",
											class: __props.ui.empty({ class: __props.uiOverride?.empty })
										}, [(0, vue_exports.renderSlot)(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(t)("dropdownMenu.noMatch", { searchTerm: searchTerm.value })), 1)])], 2)) : (0, vue_exports.createCommentVNode)("", true),
										(0, vue_exports.renderSlot)(_ctx.$slots, "default"),
										(0, vue_exports.renderSlot)(_ctx.$slots, "content-bottom", { sub: __props.sub ?? false })
									];
								}),
								_: 3
							}), _parent, _scopeId);
							else return [((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.resolveDynamicComponent)(__props.sub ? (0, vue_exports.unref)(DropdownMenu).SubContent : (0, vue_exports.unref)(DropdownMenu).Content), (0, vue_exports.mergeProps)({
								"data-slot": "content",
								class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
							}, (0, vue_exports.unref)(contentProps)), {
								default: (0, vue_exports.withCtx)(() => [
									!!__props.filter ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Filter, {
										key: 0,
										modelValue: searchTerm.value,
										"onUpdate:modelValue": ($event) => searchTerm.value = $event,
										"as-child": ""
									}, {
										default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$6, (0, vue_exports.mergeProps)({
											autofocus: "",
											autocomplete: "off",
											size: __props.size
										}, inputProps.value, {
											"data-slot": "input",
											class: __props.ui.input({ class: __props.uiOverride?.input }),
											onChange: (0, vue_exports.withModifiers)(() => {}, ["stop"])
										}), null, 16, [
											"size",
											"class",
											"onChange"
										])]),
										_: 1
									}, 8, ["modelValue", "onUpdate:modelValue"])) : (0, vue_exports.createCommentVNode)("", true),
									(0, vue_exports.renderSlot)(_ctx.$slots, "content-top", { sub: __props.sub ?? false }),
									!searchTerm.value || hasFilteredItems.value ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", {
										key: 1,
										role: "presentation",
										"data-slot": "viewport",
										class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
									}, [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(filteredGroups.value, (group, groupIndex) => {
										return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Group, {
											key: `group-${groupIndex}`,
											"data-slot": "group",
											class: __props.ui.group({ class: __props.uiOverride?.group })
										}, {
											default: (0, vue_exports.withCtx)(() => [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(group, (item, index) => {
												return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(vue_exports.Fragment, { key: `group-${groupIndex}-${index}` }, [item.type === "label" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Label, {
													key: 0,
													"data-slot": "label",
													class: __props.ui.label({ class: [
														__props.uiOverride?.label,
														item.ui?.label,
														item.class
													] })
												}, {
													default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
														item,
														index
													}, null, 8, ["item", "index"])]),
													_: 2
												}, 1032, ["class"])) : item.type === "separator" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Separator, {
													key: 1,
													"data-slot": "separator",
													class: __props.ui.separator({ class: [
														__props.uiOverride?.separator,
														item.ui?.separator,
														item.class
													] })
												}, null, 8, ["class"])) : item?.children?.length ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Sub, {
													key: 2,
													open: item.open,
													"default-open": item.defaultOpen
												}, {
													default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(DropdownMenu).SubTrigger, {
														as: "button",
														type: "button",
														disabled: item.disabled,
														"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
														"data-slot": "item",
														class: __props.ui.item({
															class: [
																__props.uiOverride?.item,
																item.ui?.item,
																item.class
															],
															color: item?.color
														})
													}, {
														default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
															item,
															index
														}, null, 8, ["item", "index"])]),
														_: 2
													}, 1032, [
														"disabled",
														"text-value",
														"class"
													]), (0, vue_exports.createVNode)(_sfc_main$3, (0, vue_exports.mergeProps)({
														sub: "",
														class: item.ui?.content,
														ui: __props.ui,
														"ui-override": __props.uiOverride,
														portal: __props.portal,
														items: item.children,
														align: "start",
														"align-offset": -4,
														"side-offset": 3,
														"label-key": __props.labelKey,
														"description-key": __props.descriptionKey,
														"checked-icon": __props.checkedIcon,
														"loading-icon": __props.loadingIcon,
														"external-icon": __props.externalIcon,
														size: __props.size,
														filter: item.filter,
														"filter-fields": item.filterFields || __props.filterFields,
														"ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
													}, { ref_for: true }, item.content), (0, vue_exports.createSlots)({ _: 2 }, [(0, vue_exports.renderList)(getProxySlots(), (_, name) => {
														return {
															name,
															fn: (0, vue_exports.withCtx)((slotData) => [(0, vue_exports.renderSlot)(_ctx.$slots, name, (0, vue_exports.mergeProps)({ ref_for: true }, slotData))])
														};
													})]), 1040, [
														"class",
														"ui",
														"ui-override",
														"portal",
														"items",
														"label-key",
														"description-key",
														"checked-icon",
														"loading-icon",
														"external-icon",
														"size",
														"filter",
														"filter-fields",
														"ignore-filter"
													])]),
													_: 2
												}, 1032, ["open", "default-open"])) : item.type === "checkbox" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).CheckboxItem, {
													key: 3,
													"model-value": item.checked,
													disabled: item.disabled,
													"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
													"data-slot": "item",
													class: __props.ui.item({
														class: [
															__props.uiOverride?.item,
															item.ui?.item,
															item.class
														],
														color: item?.color
													}),
													"onUpdate:modelValue": item.onUpdateChecked,
													onSelect: item.onSelect
												}, {
													default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
														item,
														index
													}, null, 8, ["item", "index"])]),
													_: 2
												}, 1032, [
													"model-value",
													"disabled",
													"text-value",
													"class",
													"onUpdate:modelValue",
													"onSelect"
												])) : ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$1$1, (0, vue_exports.mergeProps)({
													key: 4,
													ref_for: true
												}, (0, vue_exports.unref)(pickLinkProps)(item), { custom: "" }), {
													default: (0, vue_exports.withCtx)(({ active, ...slotProps }) => [(0, vue_exports.createVNode)((0, vue_exports.unref)(DropdownMenu).Item, {
														"as-child": "",
														disabled: item.disabled,
														"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
														onSelect: item.onSelect
													}, {
														default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$2$1, (0, vue_exports.mergeProps)({ ref_for: true }, slotProps, {
															"data-slot": "item",
															class: __props.ui.item({
																class: [
																	__props.uiOverride?.item,
																	item.ui?.item,
																	item.class
																],
																color: item?.color,
																active
															})
														}), {
															default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
																item,
																active,
																index
															}, null, 8, [
																"item",
																"active",
																"index"
															])]),
															_: 2
														}, 1040, ["class"])]),
														_: 2
													}, 1032, [
														"disabled",
														"text-value",
														"onSelect"
													])]),
													_: 2
												}, 1040))], 64);
											}), 128))]),
											_: 2
										}, 1032, ["class"]);
									}), 128))], 2)) : (0, vue_exports.createCommentVNode)("", true),
									searchTerm.value && !hasFilteredItems.value ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", {
										key: 2,
										"data-slot": "empty",
										class: __props.ui.empty({ class: __props.uiOverride?.empty })
									}, [(0, vue_exports.renderSlot)(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(t)("dropdownMenu.noMatch", { searchTerm: searchTerm.value })), 1)])], 2)) : (0, vue_exports.createCommentVNode)("", true),
									(0, vue_exports.renderSlot)(_ctx.$slots, "default"),
									(0, vue_exports.renderSlot)(_ctx.$slots, "content-bottom", { sub: __props.sub ?? false })
								]),
								_: 3
							}, 16, ["class"]))];
						}),
						_: 3
					}, _parent, _scopeId));
					else return [(0, vue_exports.createVNode)((0, vue_exports.unref)(FieldGroupReset), null, {
						default: (0, vue_exports.withCtx)(() => [((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.resolveDynamicComponent)(__props.sub ? (0, vue_exports.unref)(DropdownMenu).SubContent : (0, vue_exports.unref)(DropdownMenu).Content), (0, vue_exports.mergeProps)({
							"data-slot": "content",
							class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
						}, (0, vue_exports.unref)(contentProps)), {
							default: (0, vue_exports.withCtx)(() => [
								!!__props.filter ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Filter, {
									key: 0,
									modelValue: searchTerm.value,
									"onUpdate:modelValue": ($event) => searchTerm.value = $event,
									"as-child": ""
								}, {
									default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$6, (0, vue_exports.mergeProps)({
										autofocus: "",
										autocomplete: "off",
										size: __props.size
									}, inputProps.value, {
										"data-slot": "input",
										class: __props.ui.input({ class: __props.uiOverride?.input }),
										onChange: (0, vue_exports.withModifiers)(() => {}, ["stop"])
									}), null, 16, [
										"size",
										"class",
										"onChange"
									])]),
									_: 1
								}, 8, ["modelValue", "onUpdate:modelValue"])) : (0, vue_exports.createCommentVNode)("", true),
								(0, vue_exports.renderSlot)(_ctx.$slots, "content-top", { sub: __props.sub ?? false }),
								!searchTerm.value || hasFilteredItems.value ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", {
									key: 1,
									role: "presentation",
									"data-slot": "viewport",
									class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
								}, [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(filteredGroups.value, (group, groupIndex) => {
									return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Group, {
										key: `group-${groupIndex}`,
										"data-slot": "group",
										class: __props.ui.group({ class: __props.uiOverride?.group })
									}, {
										default: (0, vue_exports.withCtx)(() => [((0, vue_exports.openBlock)(true), (0, vue_exports.createBlock)(vue_exports.Fragment, null, (0, vue_exports.renderList)(group, (item, index) => {
											return (0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(vue_exports.Fragment, { key: `group-${groupIndex}-${index}` }, [item.type === "label" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Label, {
												key: 0,
												"data-slot": "label",
												class: __props.ui.label({ class: [
													__props.uiOverride?.label,
													item.ui?.label,
													item.class
												] })
											}, {
												default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
													item,
													index
												}, null, 8, ["item", "index"])]),
												_: 2
											}, 1032, ["class"])) : item.type === "separator" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Separator, {
												key: 1,
												"data-slot": "separator",
												class: __props.ui.separator({ class: [
													__props.uiOverride?.separator,
													item.ui?.separator,
													item.class
												] })
											}, null, 8, ["class"])) : item?.children?.length ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).Sub, {
												key: 2,
												open: item.open,
												"default-open": item.defaultOpen
											}, {
												default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(DropdownMenu).SubTrigger, {
													as: "button",
													type: "button",
													disabled: item.disabled,
													"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
													"data-slot": "item",
													class: __props.ui.item({
														class: [
															__props.uiOverride?.item,
															item.ui?.item,
															item.class
														],
														color: item?.color
													})
												}, {
													default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
														item,
														index
													}, null, 8, ["item", "index"])]),
													_: 2
												}, 1032, [
													"disabled",
													"text-value",
													"class"
												]), (0, vue_exports.createVNode)(_sfc_main$3, (0, vue_exports.mergeProps)({
													sub: "",
													class: item.ui?.content,
													ui: __props.ui,
													"ui-override": __props.uiOverride,
													portal: __props.portal,
													items: item.children,
													align: "start",
													"align-offset": -4,
													"side-offset": 3,
													"label-key": __props.labelKey,
													"description-key": __props.descriptionKey,
													"checked-icon": __props.checkedIcon,
													"loading-icon": __props.loadingIcon,
													"external-icon": __props.externalIcon,
													size: __props.size,
													filter: item.filter,
													"filter-fields": item.filterFields || __props.filterFields,
													"ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
												}, { ref_for: true }, item.content), (0, vue_exports.createSlots)({ _: 2 }, [(0, vue_exports.renderList)(getProxySlots(), (_, name) => {
													return {
														name,
														fn: (0, vue_exports.withCtx)((slotData) => [(0, vue_exports.renderSlot)(_ctx.$slots, name, (0, vue_exports.mergeProps)({ ref_for: true }, slotData))])
													};
												})]), 1040, [
													"class",
													"ui",
													"ui-override",
													"portal",
													"items",
													"label-key",
													"description-key",
													"checked-icon",
													"loading-icon",
													"external-icon",
													"size",
													"filter",
													"filter-fields",
													"ignore-filter"
												])]),
												_: 2
											}, 1032, ["open", "default-open"])) : item.type === "checkbox" ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenu).CheckboxItem, {
												key: 3,
												"model-value": item.checked,
												disabled: item.disabled,
												"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
												"data-slot": "item",
												class: __props.ui.item({
													class: [
														__props.uiOverride?.item,
														item.ui?.item,
														item.class
													],
													color: item?.color
												}),
												"onUpdate:modelValue": item.onUpdateChecked,
												onSelect: item.onSelect
											}, {
												default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
													item,
													index
												}, null, 8, ["item", "index"])]),
												_: 2
											}, 1032, [
												"model-value",
												"disabled",
												"text-value",
												"class",
												"onUpdate:modelValue",
												"onSelect"
											])) : ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)(_sfc_main$1$1, (0, vue_exports.mergeProps)({
												key: 4,
												ref_for: true
											}, (0, vue_exports.unref)(pickLinkProps)(item), { custom: "" }), {
												default: (0, vue_exports.withCtx)(({ active, ...slotProps }) => [(0, vue_exports.createVNode)((0, vue_exports.unref)(DropdownMenu).Item, {
													"as-child": "",
													disabled: item.disabled,
													"text-value": (0, vue_exports.unref)(get)(item, props.labelKey),
													onSelect: item.onSelect
												}, {
													default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)(_sfc_main$2$1, (0, vue_exports.mergeProps)({ ref_for: true }, slotProps, {
														"data-slot": "item",
														class: __props.ui.item({
															class: [
																__props.uiOverride?.item,
																item.ui?.item,
																item.class
															],
															color: item?.color,
															active
														})
													}), {
														default: (0, vue_exports.withCtx)(() => [(0, vue_exports.createVNode)((0, vue_exports.unref)(ReuseItemTemplate), {
															item,
															active,
															index
														}, null, 8, [
															"item",
															"active",
															"index"
														])]),
														_: 2
													}, 1040, ["class"])]),
													_: 2
												}, 1032, [
													"disabled",
													"text-value",
													"onSelect"
												])]),
												_: 2
											}, 1040))], 64);
										}), 128))]),
										_: 2
									}, 1032, ["class"]);
								}), 128))], 2)) : (0, vue_exports.createCommentVNode)("", true),
								searchTerm.value && !hasFilteredItems.value ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)("div", {
									key: 2,
									"data-slot": "empty",
									class: __props.ui.empty({ class: __props.uiOverride?.empty })
								}, [(0, vue_exports.renderSlot)(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)((0, vue_exports.unref)(t)("dropdownMenu.noMatch", { searchTerm: searchTerm.value })), 1)])], 2)) : (0, vue_exports.createCommentVNode)("", true),
								(0, vue_exports.renderSlot)(_ctx.$slots, "default"),
								(0, vue_exports.renderSlot)(_ctx.$slots, "content-bottom", { sub: __props.sub ?? false })
							]),
							_: 3
						}, 16, ["class"]))]),
						_: 3
					})];
				}),
				_: 3
			}, _parent));
			_push(`<!--]-->`);
		};
	}
};
var _sfc_setup$5 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_34dffa26c25098eb8314796249c1dfc0/node_modules/@nuxt/ui/dist/runtime/components/DropdownMenuContent.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fui%2Fdropdown-menu.ts
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdropdown_menu_default = {
	"slots": {
		"content": "min-w-32 max-h-(--reka-dropdown-menu-content-available-height) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-dropdown-menu-content-transform-origin) flex flex-col",
		"input": "border-b border-default",
		"empty": "text-center text-muted",
		"viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
		"arrow": "fill-bg stroke-default",
		"group": "p-1 isolate",
		"label": "w-full flex items-center font-semibold text-highlighted",
		"separator": "-mx-1 my-1 h-px bg-border",
		"item": "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75",
		"itemLeadingIcon": "shrink-0",
		"itemLeadingAvatar": "shrink-0",
		"itemLeadingAvatarSize": "",
		"itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
		"itemTrailingIcon": "shrink-0",
		"itemTrailingKbds": "hidden lg:inline-flex items-center shrink-0",
		"itemTrailingKbdsSize": "",
		"itemWrapper": "flex-1 flex flex-col text-start min-w-0",
		"itemLabel": "truncate",
		"itemDescription": "truncate text-muted",
		"itemLabelExternalIcon": "inline-block size-3 align-top text-dimmed"
	},
	"variants": {
		"color": {
			"primary": "",
			"secondary": "",
			"success": "",
			"info": "",
			"warning": "",
			"error": "",
			"neutral": ""
		},
		"active": {
			"true": {
				"item": "text-highlighted before:bg-elevated",
				"itemLeadingIcon": "text-default"
			},
			"false": {
				"item": ["text-default data-highlighted:text-highlighted data-[state=open]:text-highlighted data-highlighted:before:bg-elevated/50 data-[state=open]:before:bg-elevated/50", "transition-colors before:transition-colors"],
				"itemLeadingIcon": ["text-dimmed group-data-highlighted:text-default group-data-[state=open]:text-default", "transition-colors"]
			}
		},
		"loading": { "true": { "itemLeadingIcon": "animate-spin" } },
		"size": {
			"xs": {
				"label": "p-1 text-xs gap-1",
				"item": "p-1 text-xs gap-1",
				"empty": "p-2 text-xs",
				"itemLeadingIcon": "size-4",
				"itemLeadingAvatarSize": "3xs",
				"itemTrailingIcon": "size-4",
				"itemTrailingKbds": "gap-0.5",
				"itemTrailingKbdsSize": "sm"
			},
			"sm": {
				"label": "p-1.5 text-xs gap-1.5",
				"item": "p-1.5 text-xs gap-1.5",
				"empty": "p-2.5 text-xs",
				"itemLeadingIcon": "size-4",
				"itemLeadingAvatarSize": "3xs",
				"itemTrailingIcon": "size-4",
				"itemTrailingKbds": "gap-0.5",
				"itemTrailingKbdsSize": "sm"
			},
			"md": {
				"label": "p-1.5 text-sm gap-1.5",
				"item": "p-1.5 text-sm gap-1.5",
				"empty": "p-2.5 text-sm",
				"itemLeadingIcon": "size-5",
				"itemLeadingAvatarSize": "2xs",
				"itemTrailingIcon": "size-5",
				"itemTrailingKbds": "gap-0.5",
				"itemTrailingKbdsSize": "md"
			},
			"lg": {
				"label": "p-2 text-sm gap-2",
				"item": "p-2 text-sm gap-2",
				"empty": "p-3 text-sm",
				"itemLeadingIcon": "size-5",
				"itemLeadingAvatarSize": "2xs",
				"itemTrailingIcon": "size-5",
				"itemTrailingKbds": "gap-1",
				"itemTrailingKbdsSize": "md"
			},
			"xl": {
				"label": "p-2 text-base gap-2",
				"item": "p-2 text-base gap-2",
				"empty": "p-3 text-base",
				"itemLeadingIcon": "size-6",
				"itemLeadingAvatarSize": "xs",
				"itemTrailingIcon": "size-6",
				"itemTrailingKbds": "gap-1",
				"itemTrailingKbdsSize": "lg"
			}
		}
	},
	"compoundVariants": [
		{
			"color": "primary",
			"active": false,
			"class": {
				"item": "text-primary data-highlighted:text-primary data-highlighted:before:bg-primary/10 data-[state=open]:before:bg-primary/10",
				"itemLeadingIcon": "text-primary/75 group-data-highlighted:text-primary group-data-[state=open]:text-primary"
			}
		},
		{
			"color": "secondary",
			"active": false,
			"class": {
				"item": "text-secondary data-highlighted:text-secondary data-highlighted:before:bg-secondary/10 data-[state=open]:before:bg-secondary/10",
				"itemLeadingIcon": "text-secondary/75 group-data-highlighted:text-secondary group-data-[state=open]:text-secondary"
			}
		},
		{
			"color": "success",
			"active": false,
			"class": {
				"item": "text-success data-highlighted:text-success data-highlighted:before:bg-success/10 data-[state=open]:before:bg-success/10",
				"itemLeadingIcon": "text-success/75 group-data-highlighted:text-success group-data-[state=open]:text-success"
			}
		},
		{
			"color": "info",
			"active": false,
			"class": {
				"item": "text-info data-highlighted:text-info data-highlighted:before:bg-info/10 data-[state=open]:before:bg-info/10",
				"itemLeadingIcon": "text-info/75 group-data-highlighted:text-info group-data-[state=open]:text-info"
			}
		},
		{
			"color": "warning",
			"active": false,
			"class": {
				"item": "text-warning data-highlighted:text-warning data-highlighted:before:bg-warning/10 data-[state=open]:before:bg-warning/10",
				"itemLeadingIcon": "text-warning/75 group-data-highlighted:text-warning group-data-[state=open]:text-warning"
			}
		},
		{
			"color": "error",
			"active": false,
			"class": {
				"item": "text-error data-highlighted:text-error data-highlighted:before:bg-error/10 data-[state=open]:before:bg-error/10",
				"itemLeadingIcon": "text-error/75 group-data-highlighted:text-error group-data-[state=open]:text-error"
			}
		},
		{
			"color": "primary",
			"active": true,
			"class": {
				"item": "text-primary before:bg-primary/10",
				"itemLeadingIcon": "text-primary"
			}
		},
		{
			"color": "secondary",
			"active": true,
			"class": {
				"item": "text-secondary before:bg-secondary/10",
				"itemLeadingIcon": "text-secondary"
			}
		},
		{
			"color": "success",
			"active": true,
			"class": {
				"item": "text-success before:bg-success/10",
				"itemLeadingIcon": "text-success"
			}
		},
		{
			"color": "info",
			"active": true,
			"class": {
				"item": "text-info before:bg-info/10",
				"itemLeadingIcon": "text-info"
			}
		},
		{
			"color": "warning",
			"active": true,
			"class": {
				"item": "text-warning before:bg-warning/10",
				"itemLeadingIcon": "text-warning"
			}
		},
		{
			"color": "error",
			"active": true,
			"class": {
				"item": "text-error before:bg-error/10",
				"itemLeadingIcon": "text-error"
			}
		}
	],
	"defaultVariants": { "size": "md" }
};
//#endregion
//#region node_modules/.pnpm/@nuxt+ui@4.10.0_34dffa26c25098eb8314796249c1dfc0/node_modules/@nuxt/ui/dist/runtime/components/DropdownMenu.vue
var _sfc_main$2 = {
	__name: "UDropdownMenu",
	__ssrInlineRender: true,
	props: /*@__PURE__*/ (0, vue_exports.mergeModels)({
		size: {
			type: null,
			required: false
		},
		items: {
			type: null,
			required: false
		},
		checkedIcon: {
			type: null,
			required: false
		},
		loadingIcon: {
			type: null,
			required: false
		},
		externalIcon: {
			type: [Boolean, String],
			required: false,
			skipCheck: true,
			default: true
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
		filter: {
			type: [Boolean, Object],
			required: false,
			default: false
		},
		filterFields: {
			type: Array,
			required: false
		},
		ignoreFilter: {
			type: Boolean,
			required: false,
			default: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		class: {
			type: null,
			required: false
		},
		ui: {
			type: Object,
			required: false
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	}, {
		"searchTerm": {
			type: String,
			default: ""
		},
		"searchTermModifiers": {}
	}),
	emits: /*@__PURE__*/ (0, vue_exports.mergeModels)(["update:open"], ["update:searchTerm"]),
	setup(__props, { emit: __emit }) {
		const _props = __props;
		const emits = __emit;
		const slots = (0, vue_exports.useSlots)();
		const searchTerm = (0, vue_exports.useModel)(__props, "searchTerm", {
			type: String,
			default: ""
		});
		const props = useComponentProps("dropdownMenu", _props);
		const appConfig = useAppConfig();
		const rootProps = useForwardProps(reactivePick(props, "defaultOpen", "open", "modal"), emits);
		const contentProps = (0, vue_exports.toRef)(() => defu(props.content, {
			side: "bottom",
			sideOffset: 8,
			collisionPadding: 8
		}));
		const arrowProps = (0, vue_exports.toRef)(() => defu(props.arrow, { rounded: true }));
		const getProxySlots = () => omit(slots, ["default"]);
		const ui = (0, vue_exports.computed)(() => tv({
			extend: virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fui_2Fdropdown_menu_default,
			...appConfig.ui?.dropdownMenu || {}
		})({ size: props.size }));
		return (_ctx, _push, _parent, _attrs) => {
			_push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(DropdownMenuRoot_default), (0, vue_exports.mergeProps)((0, vue_exports.unref)(rootProps), _attrs), {
				default: (0, vue_exports.withCtx)(({ open }, _push, _parent, _scopeId) => {
					if (_push) {
						if (!!slots.default) _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(DropdownMenuTrigger_default), {
							"as-child": "",
							class: (0, vue_exports.unref)(props).class,
							disabled: (0, vue_exports.unref)(props).disabled
						}, {
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) (0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "default", { open }, null, _push, _parent, _scopeId);
								else return [(0, vue_exports.renderSlot)(_ctx.$slots, "default", { open })];
							}),
							_: 2
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push((0, server_renderer_exports.ssrRenderComponent)(_sfc_main$3, (0, vue_exports.mergeProps)({
							"search-term": searchTerm.value,
							"onUpdate:searchTerm": ($event) => searchTerm.value = $event,
							class: ui.value.content({ class: [!slots.default && (0, vue_exports.unref)(props).class, (0, vue_exports.unref)(props).ui?.content] }),
							ui: ui.value,
							"ui-override": (0, vue_exports.unref)(props).ui
						}, contentProps.value, {
							items: (0, vue_exports.unref)(props).items,
							portal: (0, vue_exports.unref)(props).portal,
							"label-key": (0, vue_exports.unref)(props).labelKey,
							"description-key": (0, vue_exports.unref)(props).descriptionKey,
							"checked-icon": (0, vue_exports.unref)(props).checkedIcon,
							"loading-icon": (0, vue_exports.unref)(props).loadingIcon,
							"external-icon": (0, vue_exports.unref)(props).externalIcon,
							size: (0, vue_exports.unref)(props).size,
							filter: (0, vue_exports.unref)(props).filter,
							"filter-fields": (0, vue_exports.unref)(props).filterFields,
							"ignore-filter": (0, vue_exports.unref)(props).ignoreFilter
						}), (0, vue_exports.createSlots)({
							default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
								if (_push) if (!!(0, vue_exports.unref)(props).arrow) _push((0, server_renderer_exports.ssrRenderComponent)((0, vue_exports.unref)(DropdownMenuArrow_default), (0, vue_exports.mergeProps)(arrowProps.value, {
									"data-slot": "arrow",
									class: ui.value.arrow({ class: (0, vue_exports.unref)(props).ui?.arrow })
								}), null, _parent, _scopeId));
								else _push(`<!---->`);
								else return [!!(0, vue_exports.unref)(props).arrow ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenuArrow_default), (0, vue_exports.mergeProps)({ key: 0 }, arrowProps.value, {
									"data-slot": "arrow",
									class: ui.value.arrow({ class: (0, vue_exports.unref)(props).ui?.arrow })
								}), null, 16, ["class"])) : (0, vue_exports.createCommentVNode)("", true)];
							}),
							_: 2
						}, [(0, vue_exports.renderList)(getProxySlots(), (_, name) => {
							return {
								name,
								fn: (0, vue_exports.withCtx)((slotData, _push, _parent, _scopeId) => {
									if (_push) (0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, name, slotData, null, _push, _parent, _scopeId);
									else return [(0, vue_exports.renderSlot)(_ctx.$slots, name, slotData)];
								})
							};
						})]), _parent, _scopeId));
					} else return [!!slots.default ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenuTrigger_default), {
						key: 0,
						"as-child": "",
						class: (0, vue_exports.unref)(props).class,
						disabled: (0, vue_exports.unref)(props).disabled
					}, {
						default: (0, vue_exports.withCtx)(() => [(0, vue_exports.renderSlot)(_ctx.$slots, "default", { open })]),
						_: 2
					}, 1032, ["class", "disabled"])) : (0, vue_exports.createCommentVNode)("", true), (0, vue_exports.createVNode)(_sfc_main$3, (0, vue_exports.mergeProps)({
						"search-term": searchTerm.value,
						"onUpdate:searchTerm": ($event) => searchTerm.value = $event,
						class: ui.value.content({ class: [!slots.default && (0, vue_exports.unref)(props).class, (0, vue_exports.unref)(props).ui?.content] }),
						ui: ui.value,
						"ui-override": (0, vue_exports.unref)(props).ui
					}, contentProps.value, {
						items: (0, vue_exports.unref)(props).items,
						portal: (0, vue_exports.unref)(props).portal,
						"label-key": (0, vue_exports.unref)(props).labelKey,
						"description-key": (0, vue_exports.unref)(props).descriptionKey,
						"checked-icon": (0, vue_exports.unref)(props).checkedIcon,
						"loading-icon": (0, vue_exports.unref)(props).loadingIcon,
						"external-icon": (0, vue_exports.unref)(props).externalIcon,
						size: (0, vue_exports.unref)(props).size,
						filter: (0, vue_exports.unref)(props).filter,
						"filter-fields": (0, vue_exports.unref)(props).filterFields,
						"ignore-filter": (0, vue_exports.unref)(props).ignoreFilter
					}), (0, vue_exports.createSlots)({
						default: (0, vue_exports.withCtx)(() => [!!(0, vue_exports.unref)(props).arrow ? ((0, vue_exports.openBlock)(), (0, vue_exports.createBlock)((0, vue_exports.unref)(DropdownMenuArrow_default), (0, vue_exports.mergeProps)({ key: 0 }, arrowProps.value, {
							"data-slot": "arrow",
							class: ui.value.arrow({ class: (0, vue_exports.unref)(props).ui?.arrow })
						}), null, 16, ["class"])) : (0, vue_exports.createCommentVNode)("", true)]),
						_: 2
					}, [(0, vue_exports.renderList)(getProxySlots(), (_, name) => {
						return {
							name,
							fn: (0, vue_exports.withCtx)((slotData) => [(0, vue_exports.renderSlot)(_ctx.$slots, name, slotData)])
						};
					})]), 1040, [
						"search-term",
						"onUpdate:searchTerm",
						"class",
						"ui",
						"ui-override",
						"items",
						"portal",
						"label-key",
						"description-key",
						"checked-icon",
						"loading-icon",
						"external-icon",
						"size",
						"filter",
						"filter-fields",
						"ignore-filter"
					])];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup$4 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.10.0_34dffa26c25098eb8314796249c1dfc0/node_modules/@nuxt/ui/dist/runtime/components/DropdownMenu.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region app/components/AppNavbar.vue?vue&type=script&setup=true&lang.ts
var AppNavbar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "AppNavbar",
	__ssrInlineRender: true,
	setup(__props) {
		const { auth } = useSupabaseClient();
		const user = useSupabaseUser();
		const router = useRouter();
		const isOpen = (0, vue_exports.ref)(false);
		const searchOpen = (0, vue_exports.ref)(false);
		const searchQuery = (0, vue_exports.ref)("");
		const handleSearch = () => {
			if (searchQuery.value.trim()) {
				router.push(`/products?search=${encodeURIComponent(searchQuery.value)}`);
				searchOpen.value = false;
			}
		};
		const logout = async () => {
			await auth.signOut();
			router.push("/");
		};
		const navLinks = [
			{
				label: "Home",
				to: "/"
			},
			{
				label: "Products",
				to: "/products"
			},
			{
				label: "Services",
				to: "/services"
			},
			{
				label: "Trending",
				to: "/trending"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_UButton = _sfc_main$5;
			const _component_ClientOnly = ClientOnly;
			const _component_UDropdownMenu = _sfc_main$2;
			const _component_UInput = _sfc_main$6;
			_push(`<nav${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "sticky top-0 z-50 glass border-b border-gray-200/50 dark:border-gray-800/50" }, _attrs))} data-v-75396e5a><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-75396e5a><div class="flex items-center justify-between h-14 md:h-16" data-v-75396e5a>`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
				to: "/",
				class: "flex flex-col"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="text-xl md:text-2xl font-black gradient-text leading-none" data-v-75396e5a${_scopeId}>Jos Marketplace</span><span class="text-xs text-gray-400 hidden md:block" data-v-75396e5a${_scopeId}>Powered by Plero Digitals</span>`);
					else return [(0, vue_exports.createVNode)("span", { class: "text-xl md:text-2xl font-black gradient-text leading-none" }, "Jos Marketplace"), (0, vue_exports.createVNode)("span", { class: "text-xs text-gray-400 hidden md:block" }, "Powered by Plero Digitals")];
				}),
				_: 1
			}, _parent));
			_push(`<div class="hidden md:flex items-center gap-8" data-v-75396e5a><!--[-->`);
			(0, server_renderer_exports.ssrRenderList)(navLinks, (link) => {
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
					key: link.to,
					to: link.to,
					class: "text-gray-600 hover:text-primary-600 font-medium transition-colors relative group"
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)(link.label)} <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" data-v-75396e5a${_scopeId}></span>`);
						else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(link.label) + " ", 1), (0, vue_exports.createVNode)("span", { class: "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" })];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]-->`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
				to: "/become-seller",
				class: "px-4 py-2 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all hover:scale-105"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Get Started `);
					else return [(0, vue_exports.createTextVNode)(" Get Started ")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="flex items-center gap-1 md:gap-2" data-v-75396e5a>`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				icon: "i-lucide-search",
				variant: "ghost",
				color: "neutral",
				onClick: ($event) => searchOpen.value = !(0, vue_exports.unref)(searchOpen)
			}, null, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_ClientOnly, null, {}, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_ClientOnly, null, {}, _parent));
			if ((0, vue_exports.unref)(user)) {
				_push(`<div class="hidden md:block" data-v-75396e5a>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UDropdownMenu, { items: [[
					{
						label: "Dashboard",
						icon: "i-lucide-layout-dashboard",
						to: "/dashboard"
					},
					{
						label: "Profile",
						icon: "i-lucide-user-circle",
						to: "/profile"
					},
					{
						label: "Messages",
						icon: "i-lucide-message-square",
						to: "/chat"
					},
					{
						label: "Seller Dashboard",
						icon: "i-lucide-store",
						to: "/seller-dashboard"
					},
					{
						label: "Orders",
						icon: "i-lucide-package",
						to: "/orders"
					},
					{
						label: "Wishlist",
						icon: "i-lucide-heart",
						to: "/wishlist"
					},
					{
						label: "Compare",
						icon: "i-lucide-scale",
						to: "/compare"
					},
					{
						label: "Saved Searches",
						icon: "i-lucide-bookmark",
						to: "/saved-searches"
					},
					{
						label: "Admin Dashboard",
						icon: "i-lucide-shield",
						to: "/admin"
					},
					{
						label: "Logout",
						icon: "i-lucide-log-out",
						onSelect: logout
					}
				]] }, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
							variant: "ghost",
							color: "neutral",
							icon: "i-lucide-user-circle"
						}, null, _parent, _scopeId));
						else return [(0, vue_exports.createVNode)(_component_UButton, {
							variant: "ghost",
							color: "neutral",
							icon: "i-lucide-user-circle"
						})];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else _push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				class: "hidden md:flex",
				to: "/login",
				variant: "outline",
				color: "primary",
				size: "sm"
			}, {
				default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Login`);
					else return [(0, vue_exports.createTextVNode)("Login")];
				}),
				_: 1
			}, _parent));
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				class: "md:hidden",
				icon: "i-lucide-menu",
				variant: "ghost",
				color: "neutral",
				onClick: ($event) => isOpen.value = !(0, vue_exports.unref)(isOpen)
			}, null, _parent));
			_push(`</div></div>`);
			if ((0, vue_exports.unref)(searchOpen)) {
				_push(`<div class="pb-3" data-v-75396e5a><div class="relative" data-v-75396e5a>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UInput, {
					modelValue: (0, vue_exports.unref)(searchQuery),
					"onUpdate:modelValue": ($event) => (0, vue_exports.isRef)(searchQuery) ? searchQuery.value = $event : null,
					placeholder: "Search products, categories...",
					icon: "i-lucide-search",
					size: "lg",
					class: "w-full",
					onKeyup: handleSearch
				}, null, _parent));
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
					class: "absolute right-2 top-1/2 -translate-y-1/2",
					size: "sm",
					color: "primary",
					onClick: handleSearch
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Search `);
						else return [(0, vue_exports.createTextVNode)(" Search ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div>`);
			} else _push(`<!---->`);
			if ((0, vue_exports.unref)(isOpen)) {
				_push(`<div class="md:hidden pb-4 border-t border-gray-100 dark:border-gray-800 pt-3" data-v-75396e5a><div class="flex flex-col gap-3" data-v-75396e5a><!--[-->`);
				(0, server_renderer_exports.ssrRenderList)(navLinks, (link) => {
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
						key: link.to,
						to: link.to,
						class: "text-gray-700 dark:text-gray-300 font-medium px-2 py-1",
						onClick: ($event) => isOpen.value = false
					}, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${(0, server_renderer_exports.ssrInterpolate)(link.label)}`);
							else return [(0, vue_exports.createTextVNode)((0, vue_exports.toDisplayString)(link.label), 1)];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]-->`);
				if ((0, vue_exports.unref)(user)) {
					_push(`<!--[-->`);
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
						to: "/dashboard",
						class: "text-gray-700 dark:text-gray-300 font-medium px-2 py-1",
						onClick: ($event) => isOpen.value = false
					}, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Dashboard`);
							else return [(0, vue_exports.createTextVNode)("Dashboard")];
						}),
						_: 1
					}, _parent));
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
						to: "/profile",
						class: "text-gray-700 dark:text-gray-300 font-medium px-2 py-1",
						onClick: ($event) => isOpen.value = false
					}, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Profile`);
							else return [(0, vue_exports.createTextVNode)("Profile")];
						}),
						_: 1
					}, _parent));
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
						to: "/seller-dashboard",
						class: "text-gray-700 dark:text-gray-300 font-medium px-2 py-1",
						onClick: ($event) => isOpen.value = false
					}, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Seller Dashboard`);
							else return [(0, vue_exports.createTextVNode)("Seller Dashboard")];
						}),
						_: 1
					}, _parent));
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
						to: "/orders",
						class: "text-gray-700 dark:text-gray-300 font-medium px-2 py-1",
						onClick: ($event) => isOpen.value = false
					}, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Orders`);
							else return [(0, vue_exports.createTextVNode)("Orders")];
						}),
						_: 1
					}, _parent));
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
						to: "/wishlist",
						class: "text-gray-700 dark:text-gray-300 font-medium px-2 py-1",
						onClick: ($event) => isOpen.value = false
					}, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Wishlist`);
							else return [(0, vue_exports.createTextVNode)("Wishlist")];
						}),
						_: 1
					}, _parent));
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
						to: "/compare",
						class: "text-gray-700 dark:text-gray-300 font-medium px-2 py-1",
						onClick: ($event) => isOpen.value = false
					}, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Compare`);
							else return [(0, vue_exports.createTextVNode)("Compare")];
						}),
						_: 1
					}, _parent));
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
						to: "/saved-searches",
						class: "text-gray-700 dark:text-gray-300 font-medium px-2 py-1",
						onClick: ($event) => isOpen.value = false
					}, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Saved Searches`);
							else return [(0, vue_exports.createTextVNode)("Saved Searches")];
						}),
						_: 1
					}, _parent));
					_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
						to: "/admin",
						class: "text-gray-700 dark:text-gray-300 font-medium px-2 py-1",
						onClick: ($event) => isOpen.value = false
					}, {
						default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Admin Dashboard`);
							else return [(0, vue_exports.createTextVNode)("Admin Dashboard")];
						}),
						_: 1
					}, _parent));
					_push(`<button class="text-left text-red-500 font-medium px-2 py-1" data-v-75396e5a>Logout</button><!--]-->`);
				} else _push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
					to: "/login",
					class: "text-gray-700 dark:text-gray-300 font-medium px-2 py-1",
					onClick: ($event) => isOpen.value = false
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Login`);
						else return [(0, vue_exports.createTextVNode)("Login")];
					}),
					_: 1
				}, _parent));
				_push(`<div class="flex items-center gap-3 px-2 pt-2 border-t border-gray-100 dark:border-gray-800" data-v-75396e5a>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_ClientOnly, null, {}, _parent));
				_push(`</div>`);
				_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
					to: "/become-seller",
					class: "mx-2 px-4 py-2 bg-primary-600 text-white rounded-xl font-semibold text-center",
					onClick: ($event) => isOpen.value = false
				}, {
					default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Get Started `);
						else return [(0, vue_exports.createTextVNode)(" Get Started ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div>`);
			} else _push(`<!---->`);
			_push(`</div></nav>`);
		};
	}
});
//#endregion
//#region app/components/AppNavbar.vue
var _sfc_setup$3 = AppNavbar_vue_vue_type_script_setup_true_lang_default.setup;
AppNavbar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppNavbar.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var AppNavbar_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(AppNavbar_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-75396e5a"]]), { __name: "AppNavbar" });
//#endregion
//#region app/components/AppFooter.vue
var _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
	const _component_UIcon = _sfc_main$5$1;
	const _component_NuxtLink = NuxtLink;
	_push(`<footer${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "bg-gray-950 text-gray-400 py-16 px-4" }, _attrs))}><div class="max-w-7xl mx-auto"><div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12"><div><div class="flex items-center gap-2 mb-4"><span class="text-2xl font-black text-white">JosMKT</span></div><p class="text-sm mb-5 leading-relaxed">Showcase your business to thousands of buyers in Jos — get discovered, get promoted, get results</p><div class="flex space-x-3"><a href="https://facebook.com/josmarketplace" target="_blank" class="p-2.5 bg-gray-800/80 rounded-xl hover:bg-emerald-600 transition-all">`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
		name: "i-lucide-facebook",
		class: "w-4 h-4"
	}, null, _parent));
	_push(`</a><a href="https://twitter.com/josMKTPlace" target="_blank" class="p-2.5 bg-gray-800/80 rounded-xl hover:bg-emerald-600 transition-all">`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
		name: "i-lucide-twitter",
		class: "w-4 h-4"
	}, null, _parent));
	_push(`</a><a href="https://instagram.com/josmarketplace_" target="_blank" class="p-2.5 bg-gray-800/80 rounded-xl hover:bg-emerald-600 transition-all">`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
		name: "i-lucide-instagram",
		class: "w-4 h-4"
	}, null, _parent));
	_push(`</a><a href="https://whatsapp.com/channel/0029Vb8A5EOHAdNUqjm3mC33" target="_blank" class="p-2.5 bg-gray-800/80 rounded-xl hover:bg-green-600 transition-all">`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
		name: "i-lucide-message-circle",
		class: "w-4 h-4"
	}, null, _parent));
	_push(`</a></div></div><div><h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h4><ul class="space-y-2.5 text-sm"><li>`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
		to: "/products?category=electronics",
		class: "hover:text-emerald-400 transition"
	}, {
		default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
			if (_push) _push(`Electronics`);
			else return [(0, vue_exports.createTextVNode)("Electronics")];
		}),
		_: 1
	}, _parent));
	_push(`</li><li>`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
		to: "/products?category=fashion",
		class: "hover:text-emerald-400 transition"
	}, {
		default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
			if (_push) _push(`Fashion`);
			else return [(0, vue_exports.createTextVNode)("Fashion")];
		}),
		_: 1
	}, _parent));
	_push(`</li><li>`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
		to: "/products?category=food",
		class: "hover:text-emerald-400 transition"
	}, {
		default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
			if (_push) _push(`Food &amp; Catering`);
			else return [(0, vue_exports.createTextVNode)("Food & Catering")];
		}),
		_: 1
	}, _parent));
	_push(`</li><li>`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
		to: "/products?category=tech",
		class: "hover:text-emerald-400 transition"
	}, {
		default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
			if (_push) _push(`Tech &amp; Repairs`);
			else return [(0, vue_exports.createTextVNode)("Tech & Repairs")];
		}),
		_: 1
	}, _parent));
	_push(`</li><li>`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
		to: "/products?category=plumbing",
		class: "hover:text-emerald-400 transition"
	}, {
		default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
			if (_push) _push(`Plumbing`);
			else return [(0, vue_exports.createTextVNode)("Plumbing")];
		}),
		_: 1
	}, _parent));
	_push(`</li></ul></div><div><h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4><ul class="space-y-2.5 text-sm"><li>`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
		to: "/about",
		class: "hover:text-emerald-400 transition"
	}, {
		default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
			if (_push) _push(`About Us`);
			else return [(0, vue_exports.createTextVNode)("About Us")];
		}),
		_: 1
	}, _parent));
	_push(`</li><li>`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
		to: "/contact",
		class: "hover:text-emerald-400 transition"
	}, {
		default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
			if (_push) _push(`Contact Us`);
			else return [(0, vue_exports.createTextVNode)("Contact Us")];
		}),
		_: 1
	}, _parent));
	_push(`</li><li>`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
		to: "/privacy",
		class: "hover:text-emerald-400 transition"
	}, {
		default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
			if (_push) _push(`Privacy Policy`);
			else return [(0, vue_exports.createTextVNode)("Privacy Policy")];
		}),
		_: 1
	}, _parent));
	_push(`</li><li>`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
		to: "/terms",
		class: "hover:text-emerald-400 transition"
	}, {
		default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
			if (_push) _push(`Terms of Service`);
			else return [(0, vue_exports.createTextVNode)("Terms of Service")];
		}),
		_: 1
	}, _parent));
	_push(`</li><li>`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
		to: "/trending",
		class: "hover:text-emerald-400 transition"
	}, {
		default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
			if (_push) _push(`Trending`);
			else return [(0, vue_exports.createTextVNode)("Trending")];
		}),
		_: 1
	}, _parent));
	_push(`</li><li>`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_NuxtLink, {
		to: "/become-seller",
		class: "hover:text-emerald-400 transition"
	}, {
		default: (0, vue_exports.withCtx)((_, _push, _parent, _scopeId) => {
			if (_push) _push(`Become a Seller`);
			else return [(0, vue_exports.createTextVNode)("Become a Seller")];
		}),
		_: 1
	}, _parent));
	_push(`</li></ul></div><div><h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4><ul class="space-y-3 text-sm"><li class="flex items-center gap-2">`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
		name: "i-lucide-mail",
		class: "w-4 h-4 text-emerald-500"
	}, null, _parent));
	_push(`<a href="mailto:support@josmkt.com.ng" class="hover:text-emerald-400 transition">support@josmkt.com.ng</a></li><li class="flex items-center gap-2">`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
		name: "i-lucide-phone",
		class: "w-4 h-4 text-emerald-500"
	}, null, _parent));
	_push(`<span>+234 904 383 2380</span></li><li class="flex items-center gap-2">`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_UIcon, {
		name: "i-lucide-map-pin",
		class: "w-4 h-4 text-emerald-500"
	}, null, _parent));
	_push(`<span>Jos, Plateau State, Nigeria</span></li></ul></div></div><div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm"><p>© 2024 JosMKT. All rights reserved.</p><p class="text-gray-600">Powered by <span class="text-emerald-500 font-medium">Plero Digitals</span></p></div></div></footer>`);
}
var _sfc_setup$2 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var AppFooter_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]), { __name: "AppFooter" });
//#endregion
//#region app/components/AppFloatingButtons.vue?vue&type=script&setup=true&lang.ts
var AppFloatingButtons_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "AppFloatingButtons",
	__ssrInlineRender: true,
	setup(__props) {
		const showTop = (0, vue_exports.ref)(false);
		const scrollTop = () => (void 0).scrollTo({
			top: 0,
			behavior: "smooth"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UButton = _sfc_main$5;
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "fixed bottom-6 right-6 flex flex-col gap-3 z-50" }, _attrs))} data-v-c200bea8>`);
			if ((0, vue_exports.unref)(showTop)) _push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				icon: "i-lucide-arrow-up",
				color: "primary",
				class: "rounded-full shadow-lg animate-pulse-glow",
				onClick: scrollTop
			}, null, _parent));
			else _push(`<!---->`);
			_push((0, server_renderer_exports.ssrRenderComponent)(_component_UButton, {
				icon: "i-lucide-message-circle",
				color: "success",
				class: "rounded-full shadow-lg",
				onClick: () => _ctx.window.open("https://wa.me/2349043832380", "_blank")
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region app/components/AppFloatingButtons.vue
var _sfc_setup$1 = AppFloatingButtons_vue_vue_type_script_setup_true_lang_default.setup;
AppFloatingButtons_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFloatingButtons.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var AppFloatingButtons_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(AppFloatingButtons_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-c200bea8"]]), { __name: "AppFloatingButtons" });
//#endregion
//#region app/layouts/default.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	const _component_AppNavbar = AppNavbar_default;
	const _component_AppFooter = AppFooter_default;
	const _component_AppFloatingButtons = AppFloatingButtons_default;
	_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "min-h-screen flex flex-col bg-white dark:bg-gray-950" }, _attrs))}>`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_AppNavbar, null, null, _parent));
	_push(`<main class="flex-1">`);
	(0, server_renderer_exports.ssrRenderSlot)(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</main>`);
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_AppFooter, null, null, _parent));
	_push((0, server_renderer_exports.ssrRenderComponent)(_component_AppFloatingButtons, null, null, _parent));
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var default_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { default_default as default };
//# sourceMappingURL=default-D9uCigjq.mjs.map
