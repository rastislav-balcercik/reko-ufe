/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { UserType } from "./utils/enums";
export { UserType } from "./utils/enums";
export namespace Components {
    interface XbalcAmbulanceLanding {
        "apiBase": string;
        "basePath": string;
    }
    interface XbalcAmbulanceRekoEditor {
        "apiBase": string;
        "entryId": string;
        "logout": () => void;
        "userType": UserType;
        "username": string;
    }
    interface XbalcAmbulanceRekoList {
        "apiBase": string;
        "logout": () => void;
        "userType": UserType;
        "username": string;
    }
}
export interface XbalcAmbulanceRekoEditorCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXbalcAmbulanceRekoEditorElement;
}
export interface XbalcAmbulanceRekoListCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXbalcAmbulanceRekoListElement;
}
declare global {
    interface HTMLXbalcAmbulanceLandingElement extends Components.XbalcAmbulanceLanding, HTMLStencilElement {
    }
    var HTMLXbalcAmbulanceLandingElement: {
        prototype: HTMLXbalcAmbulanceLandingElement;
        new (): HTMLXbalcAmbulanceLandingElement;
    };
    interface HTMLXbalcAmbulanceRekoEditorElementEventMap {
        "editor-closed": string;
    }
    interface HTMLXbalcAmbulanceRekoEditorElement extends Components.XbalcAmbulanceRekoEditor, HTMLStencilElement {
        addEventListener<K extends keyof HTMLXbalcAmbulanceRekoEditorElementEventMap>(type: K, listener: (this: HTMLXbalcAmbulanceRekoEditorElement, ev: XbalcAmbulanceRekoEditorCustomEvent<HTMLXbalcAmbulanceRekoEditorElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLXbalcAmbulanceRekoEditorElementEventMap>(type: K, listener: (this: HTMLXbalcAmbulanceRekoEditorElement, ev: XbalcAmbulanceRekoEditorCustomEvent<HTMLXbalcAmbulanceRekoEditorElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLXbalcAmbulanceRekoEditorElement: {
        prototype: HTMLXbalcAmbulanceRekoEditorElement;
        new (): HTMLXbalcAmbulanceRekoEditorElement;
    };
    interface HTMLXbalcAmbulanceRekoListElementEventMap {
        "entry-clicked": string;
    }
    interface HTMLXbalcAmbulanceRekoListElement extends Components.XbalcAmbulanceRekoList, HTMLStencilElement {
        addEventListener<K extends keyof HTMLXbalcAmbulanceRekoListElementEventMap>(type: K, listener: (this: HTMLXbalcAmbulanceRekoListElement, ev: XbalcAmbulanceRekoListCustomEvent<HTMLXbalcAmbulanceRekoListElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLXbalcAmbulanceRekoListElementEventMap>(type: K, listener: (this: HTMLXbalcAmbulanceRekoListElement, ev: XbalcAmbulanceRekoListCustomEvent<HTMLXbalcAmbulanceRekoListElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLXbalcAmbulanceRekoListElement: {
        prototype: HTMLXbalcAmbulanceRekoListElement;
        new (): HTMLXbalcAmbulanceRekoListElement;
    };
    interface HTMLElementTagNameMap {
        "xbalc-ambulance-landing": HTMLXbalcAmbulanceLandingElement;
        "xbalc-ambulance-reko-editor": HTMLXbalcAmbulanceRekoEditorElement;
        "xbalc-ambulance-reko-list": HTMLXbalcAmbulanceRekoListElement;
    }
}
declare namespace LocalJSX {
    interface XbalcAmbulanceLanding {
        "apiBase"?: string;
        "basePath"?: string;
    }
    interface XbalcAmbulanceRekoEditor {
        "apiBase"?: string;
        "entryId"?: string;
        "logout"?: () => void;
        "onEditor-closed"?: (event: XbalcAmbulanceRekoEditorCustomEvent<string>) => void;
        "userType"?: UserType;
        "username"?: string;
    }
    interface XbalcAmbulanceRekoList {
        "apiBase"?: string;
        "logout"?: () => void;
        "onEntry-clicked"?: (event: XbalcAmbulanceRekoListCustomEvent<string>) => void;
        "userType"?: UserType;
        "username"?: string;
    }
    interface IntrinsicElements {
        "xbalc-ambulance-landing": XbalcAmbulanceLanding;
        "xbalc-ambulance-reko-editor": XbalcAmbulanceRekoEditor;
        "xbalc-ambulance-reko-list": XbalcAmbulanceRekoList;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "xbalc-ambulance-landing": LocalJSX.XbalcAmbulanceLanding & JSXBase.HTMLAttributes<HTMLXbalcAmbulanceLandingElement>;
            "xbalc-ambulance-reko-editor": LocalJSX.XbalcAmbulanceRekoEditor & JSXBase.HTMLAttributes<HTMLXbalcAmbulanceRekoEditorElement>;
            "xbalc-ambulance-reko-list": LocalJSX.XbalcAmbulanceRekoList & JSXBase.HTMLAttributes<HTMLXbalcAmbulanceRekoListElement>;
        }
    }
}
