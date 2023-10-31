"use strict";
(self["webpackChunknhbLogin"] = self["webpackChunknhbLogin"] || []).push([[817],{

/***/ 16817:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "HomeModule": function() { return /* binding */ HomeModule; }
});

// EXTERNAL MODULE: ./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js
var common = __webpack_require__(61116);
// EXTERNAL MODULE: ./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js + 1 modules
var fesm2015_forms = __webpack_require__(11462);
// EXTERNAL MODULE: ./src/app/components/components.module.ts
var components_module = __webpack_require__(5530);
// EXTERNAL MODULE: ./src/app/display/display.module.ts
var display_module = __webpack_require__(39395);
// EXTERNAL MODULE: ./src/app/directives/directives.module.ts
var directives_module = __webpack_require__(21325);
// EXTERNAL MODULE: ./src/app/material.module.ts + 26 modules
var material_module = __webpack_require__(3519);
// EXTERNAL MODULE: ./src/app/pipes/pipes.module.ts
var pipes_module = __webpack_require__(10413);
// EXTERNAL MODULE: ./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js + 8 modules
var router = __webpack_require__(9883);
// EXTERNAL MODULE: ./node_modules/rxjs/_esm2015/internal/Subject.js
var Subject = __webpack_require__(55959);
// EXTERNAL MODULE: ./src/app/services/services.module.ts + 6 modules
var services_module = __webpack_require__(7167);
// EXTERNAL MODULE: ./src/app/layout/modals/iframe/iframe.component.ts
var iframe_component = __webpack_require__(39970);
// EXTERNAL MODULE: ./src/app/constants/constants.ts
var constants = __webpack_require__(6661);
// EXTERNAL MODULE: ./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js + 4 modules
var core = __webpack_require__(40678);
;// CONCATENATED MODULE: ./src/app/directives/valid-reg-directive.directive.ts




// expresiones regulares
var regExPatterns = {
    NUMBER: '^[0-9]+$',
    SPANISH_ALFANUMERIC: '^[\\A-Za-z0-9ñÑçÇ]+$',
    ALFANUMERIC: '^[\\w0-9]+$',
    LEASING_INVOICE: '^[\\w0-9ñÑçÇ\\/-]+$',
    RENTING_INVOICE: '^[\\w0-9ñÑçÇ]+$',
    LEASING_CONTRACT: '^[0-9\\/]+$',
    RENTING_CONTRACT: '^[0-9]+$',
    NAMES_WITH_SPACES: '^[\\A-Za-z0-9ñÑçÇ -]+$',
    LICENSE_PLATES: '^[a-zA-Z0-9,-]+$',
    LICENSE_PLATES_ONE: '^[a-zA-Z0-9-]+$',
    SPANISH_PHONE: '^(6|7|8|9){1}[0-9]{8}',
    CENTER_COST: '^[a-zA-Z0-9 ]*$'
};
// teclas especiales con diferente nombre del IE11 a tgener en cuenta
// por ejemplo si permitimos "/" la barra del teclado numérico se llama "Divide" en IE11
var IESpecialKeys = {
    DIVIDE: 'Divide',
    DECIMAL: 'Decimal',
    MULTIPLY: 'Multiply',
    ADD: 'Add',
    SUBTRACT: 'Subtract' // "-" del teclado numérico
};
var ValidRegDirectiveDirective = /** @class */ /*@__PURE__*/ (function () {
    function ValidRegDirectiveDirective(elRef, form) {
        this.elRef = elRef;
        this.form = form;
        this.regexInput = null;
        this.iEKeyHack = [];
        this.regex = null;
        /**
         * @description Colección de teclas especiales para controlar
         * @private
         * @type {Array<number>}
         * @memberof ValidRegDirectiveDirective
         */
        this.specialKeys = [
            8 // 'Backspace'
            ,
            46 // 'Delete'
            ,
            9 // 'Tab'
            ,
            35 // 'End'
            ,
            36 // 'Home'
            ,
            37 // 'ArrowLeft'
            ,
            39 // 'ArrowRight'
            ,
            17 // 'Control'
            ,
            86 // 'v'
            ,
            190 // '.'
            ,
            110 // '.'
        ];
        this.subscriptions = [];
        this.virtualPass = '';
    }
    /**
     * @description A lifecycle hook that is called after Angular has initialized all the data-bound properties of a directive.
     */
    ValidRegDirectiveDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.form.getForm().subscribe(function (val) {
            _this.hBform = val;
            if (typeof _this.hBform.password === 'string') {
                _this.virtualPass = _this.hBform.password;
            }
            else {
                return;
            }
        }));
        this.regex = new RegExp(this.regexInput);
    };
    ValidRegDirectiveDirective.prototype.onKeyDown = function (event) {
        this.manejarEvento(event);
    };
    ValidRegDirectiveDirective.prototype.onChange = function (event) {
        if (this.regex) {
            this.checkCad(event);
        }
        else {
            return;
        }
    };
    /**
     * @description método que gestiona el valor del campo en función de la longitud máxima permitida
     * params: event<KeyboardEvent>
     * event = recogido cuando el usuario presiona el campo input (keydown)
     */
    ValidRegDirectiveDirective.prototype.manejarEvento = function (event) {
        var kCd = event.keyCode || event.which;
        if (this.regex) {
            if (kCd === 0 || kCd === 229) {
                // Si es Android
                if (!this.isValid(event)) {
                    this.comprobarCadena(event);
                }
                else {
                    return;
                }
            }
            else {
                if (this.isSpecialKey(event.keyCode, event.ctrlKey)) {
                    return;
                }
                else {
                    this.notSpecialKey(event);
                }
            }
        }
        else {
            return;
        }
    };
    /**
     * @description método que gestionar cuando la tecla introducida no es una tecla especial
     * params: event<KeyboardEvent>
     * event = recogido cuando el usuario presiona el campo input (keydown)
     */
    ValidRegDirectiveDirective.prototype.notSpecialKey = function (event) {
        var current = this.elRef.nativeElement.value;
        var input = event.srcElement;
        var next = this.insertAt(current, input.selectionStart, input.selectionEnd, event.key);
        var validOK = this.regex.test(next);
        if (next && !validOK && !this.isIEKey(event.key)) {
            event.preventDefault();
        }
        else {
            return;
        }
    };
    /**
     * @description método que saber si se está usando iExplorer
     * params: key<string>
     * key = valor de la tecla
     */
    ValidRegDirectiveDirective.prototype.isIEKey = function (key) {
        if (this.iEKeyHack && this.iEKeyHack.length > 0) {
            return this.iEKeyHack.includes(key);
        }
        else {
            return false;
        }
    };
    /**
     * @description método que saber si la tecla introducida es una tecla especial
     * params: keyCode<number>, ctrlKey<boolean>
     * keyCode = valor de la tecla
     * ctrlKey = true/false si es la tecla Control
     */
    ValidRegDirectiveDirective.prototype.isSpecialKey = function (keyCode, ctrlKey) {
        if (ctrlKey) {
            return true;
        }
        else if (this.specialKeys.indexOf(keyCode) !== -1) {
            if (!(this.keyIsV(keyCode) && !ctrlKey) || !this.keyIsV(keyCode)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    ValidRegDirectiveDirective.prototype.insertAt = function (stringsrc, indexStart, indexEnd, stringT) {
        return stringsrc.substr(0, indexStart) + stringT + stringsrc.substr(indexEnd);
    };
    ValidRegDirectiveDirective.prototype.isInsertLast = function (event) {
        var input = event.srcElement;
        return input.selectionEnd < this.getCad().length;
    };
    ValidRegDirectiveDirective.prototype.checkCad = function (event) {
        while (this.getCad().length > 0 && !this.isValid(event)) {
            this.deleteLast();
        }
    };
    ValidRegDirectiveDirective.prototype.deleteLast = function () {
        var cad = this.elRef.nativeElement.value;
        this.elRef.nativeElement.value = cad.substring(0, cad.length - 1);
    };
    ValidRegDirectiveDirective.prototype.getCad = function () {
        return this.elRef.nativeElement.value;
    };
    ValidRegDirectiveDirective.prototype.keyIsV = function (key) {
        return key === 86;
    };
    /**
     * @description Método para saber si la tecla es válida, según la expresión regular definida
     */
    ValidRegDirectiveDirective.prototype.isValid = function (event) {
        return this.regex.test(event.target.value);
    };
    ValidRegDirectiveDirective.prototype.comprobarCadena = function (event) {
        if (!this.isValid(event) && this.elRef.nativeElement.value.length > 1) {
            this.elRef.nativeElement.value = this.elRef.nativeElement.value
                .toString()
                .slice(0, this.elRef.nativeElement.value.toString().length - 1);
            this.comprobarCadena(event);
        }
        else {
            return;
        }
    };
    ValidRegDirectiveDirective.ɵfac = function ValidRegDirectiveDirective_Factory(t) { return new (t || ValidRegDirectiveDirective)(core/* ɵɵdirectiveInject */.Y36(core/* ElementRef */.SBq), core/* ɵɵdirectiveInject */.Y36(services_module/* FormService */.oL)); };
    ValidRegDirectiveDirective.ɵdir = /*@__PURE__*/ core/* ɵɵdefineDirective */.lG2({ type: ValidRegDirectiveDirective, hostBindings: function ValidRegDirectiveDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                core/* ɵɵlistener */.NdJ("keydown", function ValidRegDirectiveDirective_keydown_HostBindingHandler($event) { return ctx.onKeyDown($event); })("input", function ValidRegDirectiveDirective_input_HostBindingHandler($event) { return ctx.onChange($event); });
            }
        }, inputs: { regexInput: "regexInput", iEKeyHack: "iEKeyHack" } });
    return ValidRegDirectiveDirective;
}());


// EXTERNAL MODULE: ./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js
var flex = __webpack_require__(35965);
// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(64762);
;// CONCATENATED MODULE: ./src/app/directives/pattern-only.directive.ts






/**
 * @description directiva para solo permitir cadenas de caracteres validados a través de una expresión regular
 */
var PatternOnlyDirective = /** @class */ /*@__PURE__*/ (function (_super) {
    (0,tslib_es6/* __extends */.ZT)(PatternOnlyDirective, _super);
    /**
     * @descriptionCreates an instance of PatternOnlyDirective.
     */
    function PatternOnlyDirective(el, form) {
        var _this = _super.call(this, el, form) || this;
        _this.el = el;
        _this.form = form;
        _this.regexInput = null;
        return _this;
    }
    PatternOnlyDirective.ɵfac = function PatternOnlyDirective_Factory(t) { return new (t || PatternOnlyDirective)(core/* ɵɵdirectiveInject */.Y36(core/* ElementRef */.SBq), core/* ɵɵdirectiveInject */.Y36(services_module/* FormService */.oL)); };
    PatternOnlyDirective.ɵdir = /*@__PURE__*/ core/* ɵɵdefineDirective */.lG2({ type: PatternOnlyDirective, selectors: [["", "appPatternOnly", ""]], inputs: { regexInput: "regexInput" }, features: [core/* ɵɵInheritDefinitionFeature */.qOj] });
    return PatternOnlyDirective;
}(ValidRegDirectiveDirective));


;// CONCATENATED MODULE: ./src/app/directives/next-focus.directive.ts


/**
 * Directiva para pasar al siguiente input al introducir un caracter y pasar al anterior al borrar un caracter
 */
var NextFocusDirective = /** @class */ /*@__PURE__*/ (function () {
    function NextFocusDirective(renderer, hostElement) {
        this.renderer = renderer;
        this.hostElement = hostElement;
        this.enableNext = true;
        this.enablePrev = true;
    }
    /**
     * @description A lifecycle hook that is called after Angular has initialized all the data-bound properties of a directive.
     */
    NextFocusDirective.prototype.ngOnInit = function () {
        if (this.idFocus) {
            this.renderer.setAttribute(this.hostElement.nativeElement, 'idfocus', this.idFocus);
        }
        else {
            return;
        }
    };
    /**
     * @description Devuelve el index del elemento indicado
     * params: input
     * input = Elemento HTML indicado
     */
    NextFocusDirective.prototype.getIndexForm = function (input) {
        var controls = this.getAllControls(input);
        if (controls) {
            for (var i = 0; i < controls.length; i++) {
                if (input === controls[i]) {
                    return i;
                }
                else {
                    continue;
                }
            }
        }
        else {
            return -1;
        }
    };
    /**
     * @description Devuelve todos los elementos del formulario, compañeros del indicado
     * params: input
     * input = Elemento HTML indicado
     */
    NextFocusDirective.prototype.getAllControls = function (input) {
        var allControls = [];
        return input.ownerDocument.querySelectorAll('[appnextfocus] input, input[appnextfocus]');
    };
    /**
     * @description Devuelve el elemento siguiente en el formulario, compañero del indicado
     * params: input
     * input = Elemento HTML indicado
     */
    NextFocusDirective.prototype.getNextInput = function (input) {
        var controls = this.getAllControls(input);
        if (controls && this.getIndexForm(input) > -1) {
            for (var i = this.getIndexForm(input) + 1; i < controls.length; i++) {
                var formElem = controls[i];
                if (formElem.tagName.toLowerCase() === 'input' && !formElem.disabled &&
                    (this.nextTarget == null || formElem.getAttribute('idfocus') === this.nextTarget)) {
                    return formElem;
                }
                else {
                    continue;
                }
            }
        }
        else {
            return null;
        }
    };
    /**
     * @description Devuelve el elemento anterior en el formulario, compañero del indicado
     * params: input
     * input = Elemento HTML indicado
     */
    NextFocusDirective.prototype.getPrevInput = function (input) {
        var controls = this.getAllControls(input);
        if (controls && this.getIndexForm(input) > -1) {
            for (var i = this.getIndexForm(input) - 1; i >= 0; i--) {
                var formElem = controls[i];
                if (formElem.tagName.toLowerCase() === 'input' && !formElem.disabled &&
                    (this.prevTarget == null || formElem.getAttribute('idfocus') === this.prevTarget)) {
                    return formElem;
                }
                else {
                    continue;
                }
            }
        }
        else {
            return null;
        }
    };
    /**
     * @description Método para gestionar cuando se ha introducido un caracter en un input
     * params: e<KeyboarEvent>
     * e = Evento de teclado para conocer la tecla introducida
     */
    NextFocusDirective.prototype.onkeyup = function (e) {
        var myTarget;
        if (e.target) {
            myTarget = e.target;
        }
        else if (e.srcElement) {
            myTarget = e.srcElement;
        }
        var kCd = e.keyCode || e.which;
        var maxLength = parseInt(myTarget.attributes.maxlength.value, 10);
        var inputLength = myTarget.value.length;
        if (inputLength >= maxLength) {
            if (!this.enableNext) {
                return;
            }
            else {
                this.checkNext('next', myTarget);
            }
        }
        else if (inputLength === 0 && kCd === 8) {
            if (!this.enablePrev) {
                return;
            }
            else {
                this.checkNext('prev', myTarget);
            }
        }
        else {
            return;
        }
    };
    /**
     * @description Método para posicionarse en el siguiente campo a introducir
     * params: type<'next'|'prev'>, myTarget
     * myTarget = Elemento HTML donde posicionarse
     */
    NextFocusDirective.prototype.checkNext = function (type, myTarget) {
        var next;
        switch (type) {
            case 'next':
                next = this.getNextInput(myTarget);
                break;
            case 'prev':
                next = this.getPrevInput(myTarget);
                break;
        }
        if (next) {
            next.focus();
        }
        else {
            return;
        }
    };
    NextFocusDirective.ɵfac = function NextFocusDirective_Factory(t) { return new (t || NextFocusDirective)(core/* ɵɵdirectiveInject */.Y36(core/* Renderer2 */.Qsj), core/* ɵɵdirectiveInject */.Y36(core/* ElementRef */.SBq)); };
    NextFocusDirective.ɵdir = /*@__PURE__*/ core/* ɵɵdefineDirective */.lG2({ type: NextFocusDirective, selectors: [["", "appNextFocus", ""]], hostBindings: function NextFocusDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                core/* ɵɵlistener */.NdJ("keyup", function NextFocusDirective_keyup_HostBindingHandler($event) { return ctx.onkeyup($event); });
            }
        }, inputs: { mode: "mode", enablePrev: "enablePrev", enableNext: "enableNext", idFocus: "idFocus", nextTarget: "nextTarget", prevTarget: "prevTarget" } });
    return NextFocusDirective;
}());


;// CONCATENATED MODULE: ./src/app/directives/max-length.directive.ts




/**
 * Directiva para el control de longitud máxima de caracteres
 */
var MaxLengthDirective = /** @class */ /*@__PURE__*/ (function () {
    function MaxLengthDirective(comm, el) {
        this.comm = comm;
        this.el = el;
    }
    /**
     * @description A lifecycle hook that is called after Angular has initialized all the data-bound properties of a directive.
     * Al cargarse la directiva, seteamos el autocomplete a off y añadimos el campo máximo permitido
     */
    MaxLengthDirective.prototype.ngOnInit = function () {
        this.el.nativeElement.autocomplete = 'off';
        this.el.nativeElement.maxLength = this.maxLengthValue;
    };
    MaxLengthDirective.prototype.onkeydown = function (e) {
        this.manejarEvento(e);
    };
    /**
     * @description método que gestiona el valor del campo en función de la longitud máxima permitida
     * params: event
     * event = recogido cuando el usuario presiona el campo input (keydown)
     */
    MaxLengthDirective.prototype.manejarEvento = function (event) {
        try {
            if (this.comm.isIE() && this.maxLengthValue > 1) {
                event.stopPropagation();
            }
            else if (this.el.nativeElement.value.length > this.maxLengthValue // fix bug 5920 - do slice only if input text length > maxLengthValue
            ) {
                this.el.nativeElement.value = this.el.nativeElement.value.toString().slice(0, this.maxLengthValue);
            }
            else {
                return;
            }
        }
        catch (e) {
        }
    };
    MaxLengthDirective.ɵfac = function MaxLengthDirective_Factory(t) { return new (t || MaxLengthDirective)(core/* ɵɵdirectiveInject */.Y36(services_module/* CommunicationService */.OX), core/* ɵɵdirectiveInject */.Y36(core/* ElementRef */.SBq)); };
    MaxLengthDirective.ɵdir = /*@__PURE__*/ core/* ɵɵdefineDirective */.lG2({ type: MaxLengthDirective, selectors: [["", "appMaxLength", ""]], hostBindings: function MaxLengthDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                core/* ɵɵlistener */.NdJ("input", function MaxLengthDirective_input_HostBindingHandler($event) { return ctx.onkeydown($event); });
            }
        }, inputs: { maxLengthValue: "maxLengthValue" } });
    return MaxLengthDirective;
}());


;// CONCATENATED MODULE: ./src/app/pages/home/home-main/components/password/password.component.ts














var _c0 = ["pass"];
function PasswordComponent_input_1_Template(rf, ctx) {
    if (rf & 1) {
        var _r5 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "input", 2, 3);
        core/* ɵɵlistener */.NdJ("keyup", function PasswordComponent_input_1_Template_input_keyup_0_listener($event) { core/* ɵɵrestoreView */.CHM(_r5); var ctx_r4 = core/* ɵɵnextContext */.oxw(); return ctx_r4.keyUpPass($event); })("textInput", function PasswordComponent_input_1_Template_input_textInput_0_listener($event) { core/* ɵɵrestoreView */.CHM(_r5); var ctx_r6 = core/* ɵɵnextContext */.oxw(); return ctx_r6.checkChange($event); });
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        var i_r2 = ctx.index;
        var ctx_r0 = core/* ɵɵnextContext */.oxw();
        core/* ɵɵpropertyInterpolate */.s9C("formControlName", "formControlPass" + i_r2);
        core/* ɵɵpropertyInterpolate */.s9C("name", "formControlPass" + i_r2);
        core/* ɵɵproperty */.Q6J("regexInput", ctx_r0.regexInput)("maxLengthValue", 1)("id", "inputPW" + i_r2);
        core/* ɵɵattribute */.uIk("type", ctx_r0.typeInput);
    }
}
/**
 * @description Componente para la introducción de la contraseña de acceso
 * La contraseña se introducirá con inputs independientes (uno a uno)
 * Por defecto la contraseña no será visible (fuente oculta que muestra asteriscos/círculos)
 * La contraseña podrá ser visible a petición del usuario (se cambia la fuente por defecto)
 */
var PasswordComponent = /** @class */ /*@__PURE__*/ (function () {
    function PasswordComponent(formBuilder, form, error, communication) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.form = form;
        this.error = error;
        this.communication = communication;
        /** Evento que obtiene la contraseña */
        this.hasError = false;
        this.submited = new core/* EventEmitter */.vpe();
        this.regexInput = regExPatterns.SPANISH_ALFANUMERIC;
        /** Tamaño de la Pass, deberia ser siempre 8 */
        this.passLength = constants/* Constants.formModel.maxlength.password */.gT.formModel.maxlength.password;
        this.arrPass = new Array(this.passLength);
        this.subscriptions = [];
        this.virtualPass = '';
        this.typeInput = 'password';
        if (this.communication && typeof this.communication.isFirefox === 'function') {
            this.checkTypeInput(false);
        }
        // Recogemos los valores del formulario
        this.subscriptions.push(this.form.getForm().subscribe(function (val) {
            _this.hBform = val;
            if (typeof _this.hBform.password === 'string') {
                _this.virtualPass = _this.hBform.password;
                var pos_1 = -1;
                if (_this.formGroupPass) {
                    Object.keys(_this.formGroupPass.controls).forEach(function (key) {
                        pos_1++;
                        _this.formGroupPass.get(key).setValue(_this.virtualPass[pos_1]);
                    });
                }
            }
        }));
    }
    /**
     * @description A lifecycle hook that is called after Angular has initialized all the data-bound properties of a directive.
     */
    PasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isMobile = this.communication.isMobile();
        this.isTablet = this.communication.isTablet();
        this.formGroupPass = this.formBuilder.group({});
        for (var i = 0; i < this.passLength; i++) {
            this.formGroupPass.addControl('formControlPass' + i, new fesm2015_forms/* FormControl */.NI(this.arrPass[i], [
                fesm2015_forms/* Validators.required */.kI.required,
                fesm2015_forms/* Validators.maxLength */.kI.maxLength(1),
                fesm2015_forms/* Validators.minLength */.kI.minLength(1)
            ]));
        }
        this.subscriptions.push(this.showPass.subscribe(function (val) {
            _this.checkTypeInput(val);
        }));
    };
    /**
     * @description Controla la posición donde se ha de poner foco
     */
    PasswordComponent.prototype.checkPosition = function () {
        if (this.virtualPass.length < this.passLength) {
            this.inputsPass['_results'][this.virtualPass.length].nativeElement.focus();
        }
        else {
            if (this.inputsPass['_results'][(this.passLength - 1)]) {
                this.inputsPass['_results'][(this.passLength - 1)].nativeElement.focus();
            }
            else {
                return;
            }
        }
    };
    /**
     * @description Obtiene los valores de los inputs en un string
     */
    PasswordComponent.prototype.getFormValues = function () {
        var _this = this;
        var strPass = '';
        if (this.formGroupPass) {
            Object.keys(this.formGroupPass.controls).forEach(function (key) {
                if (_this.formGroupPass.get(key).value !== null && _this.formGroupPass.get(key).value !== '') {
                    strPass = strPass + _this.formGroupPass.get(key).value;
                }
            });
        }
        return strPass.toUpperCase();
    };
    /**
     * @description Devuelve la contraseña introducida
     */
    PasswordComponent.prototype.getPassLength = function () {
        return this.passLength;
    };
    /**
     * @description Resetea el formulario
     */
    PasswordComponent.prototype.resetForm = function () {
        var _this = this;
        this.reset = false;
        this.hasError = true;
        if (this.formGroupPass) {
            this.formGroupPass.reset();
            Object.keys(this.formGroupPass.controls).forEach(function (key) {
                _this.formGroupPass.get(key).setValue('');
            });
            this.form.setValue('password', '');
            this.inputsPass['_results'][0].nativeElement.focus();
        }
    };
    /**
     * @description Método para conocer la tecla introducida cuando el dispositivo es un móvil con Android
     */
    PasswordComponent.prototype.checkChange = function (event) {
        if (this.communication.isAndroid()) {
            // Si es Android
            var keyCode = event.data.charCodeAt(0);
            if (keyCode >= 48 && keyCode <= 57) {
                var evento = { key: '' };
                switch (keyCode) {
                    case 48:
                        evento.key = '0';
                        break;
                    case 49:
                        evento.key = '1';
                        break;
                    case 50:
                        evento.key = '2';
                        break;
                    case 51:
                        evento.key = '3';
                        break;
                    case 52:
                        evento.key = '4';
                        break;
                    case 53:
                        evento.key = '5';
                        break;
                    case 54:
                        evento.key = '6';
                        break;
                    case 55:
                        evento.key = '7';
                        break;
                    case 56:
                        evento.key = '8';
                        break;
                    case 57:
                        evento.key = '9';
                        break;
                }
                this.manejarEvento(keyCode, evento);
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    };
    /**
     * @description Evento para enviar al padre los valores de los inputs
     */
    PasswordComponent.prototype.keyUpPass = function (event) {
        this.error.removeAllWarning();
        var kCd = event.keyCode || event.which;
        if (kCd === 229) {
            if (this.checkAndroidDesktopMode()) {
                this.manejarEvento(kCd, '' + event.target.value);
            }
            else {
                this.manejarEvento(kCd, event);
            }
            return;
        }
        if (kCd === 13) {
            this.submited.emit(true);
            return;
        }
        if (this.communication.isAndroid()) {
            var newPass = '';
            if (kCd === 8) {
                newPass = this.virtualPass.slice(0, -1);
                this.deleteCharacter(newPass);
            }
            else {
                if (kCd !== 0 && kCd !== 229) {
                    this.deleteCharacter(this.virtualPass);
                }
            }
        }
        else {
            this.manejarEvento(kCd, event);
        }
    };
    /**
     * @description Comprueba si Android tiene activado el modo escritorio
     */
    PasswordComponent.prototype.checkAndroidDesktopMode = function () {
        // also matches AppleWebKit
        var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.appVersion)[1], 10);
        // Also true for Opera Mobile and maybe others
        var isGoogle = webkitVer && navigator.vendor.indexOf('Google') === 0;
        // Careful - Firefox and Windows Mobile also have Android in user agent
        var isAndroid = isGoogle && navigator.userAgent.indexOf('Android') > -1;
        var androidDesktopMode = !isAndroid && isGoogle &&
            (navigator.platform.indexOf('Linux a') === 0) && 'ontouchstart' in document.documentElement;
        return androidDesktopMode;
    };
    /**
     * @description Método para gestionar la tecla pulsada
     */
    PasswordComponent.prototype.manejarEvento = function (kCd, event) {
        if (kCd === 13) {
            this.submited.emit(true);
            return;
        }
        if ((kCd === 8 || kCd === 9 || kCd === 16) || (kCd >= 48 && kCd <= 57) || (kCd >= 96 && kCd <= 105)) {
            // 0-9 only
            var newPass = '';
            if (kCd === 8) {
                newPass = this.virtualPass.slice(0, -1);
                this.deleteCharacter(newPass);
            }
            else {
                this.notKCD8(kCd, event, newPass);
            }
        }
        else {
            if (kCd !== 0 && kCd !== 229) {
                this.deleteCharacter(this.virtualPass);
            }
            else {
                return;
            }
        }
    };
    /**
     * @description Control para cuando el kCd no es 8 (borrar)
     */
    PasswordComponent.prototype.notKCD8 = function (kCd, event, newPass) {
        if (kCd === 9 || kCd === 16) {
            if (kCd === 9) {
                var pos = this.virtualPass.length;
                this.inputsPass['_results'][pos].nativeElement.focus();
            }
            return;
        }
        if (event.key) {
            newPass = this.virtualPass + '' + event.key.toString();
            if (newPass.toString().length <= this.passLength) {
                this.form.setValue('password', newPass);
            }
        }
    };
    /**
     * @description Método para borrar el último valor de la contraseña introducida
     */
    PasswordComponent.prototype.deleteCharacter = function (newPass) {
        var position = (this.virtualPass.length - 1);
        if (position >= 0) {
            this.formGroupPass.get('formControlPass' + position).setValue('');
        }
        if (this.inputsPass['_results'][position]) {
            this.inputsPass['_results'][position].nativeElement.focus();
        }
        else {
            if (this.inputsPass['_results'][this.virtualPass.length]) {
                this.inputsPass['_results'][this.virtualPass.length].nativeElement.focus();
            }
        }
        this.form.setValue('password', newPass);
    };
    /**
     * @description Método para definir el tipo de input a utilizar, según el sistema operativo
     */
    PasswordComponent.prototype.checkTypeInput = function (showPass) {
        this.typeInput = 'password';
        var os = sessionStorage.OS;
        var isFirefox = this.communication.isFirefox();
        var ua = navigator.userAgent.toLowerCase();
        var posBarra = ua.indexOf('/', ua.indexOf('firefox'));
        var version = ua.substr(posBarra + 1, 2);
        // Si el SO es Linux y el browser es firefox verion 71.0
        if (!showPass && /(Linux|X11|linux)/.test(os) && isFirefox && version <= '71') {
            this.typeInput = 'password';
        }
        else if (this.communication.isSmartphonePDF() || this.communication.isTabletDevicePDF()) {
            this.typeInput = 'number';
        }
        else {
            this.typeInput = showPass ? 'text' : 'password';
        }
    };
    /**
     * @description Control de cambios
     */
    PasswordComponent.prototype.ngOnChanges = function (changes) {
        var resetForm = changes.reset;
        if (resetForm) {
            this.resetForm();
        }
    };
    PasswordComponent.ɵfac = function PasswordComponent_Factory(t) { return new (t || PasswordComponent)(core/* ɵɵdirectiveInject */.Y36(fesm2015_forms/* FormBuilder */.qu), core/* ɵɵdirectiveInject */.Y36(services_module/* FormService */.oL), core/* ɵɵdirectiveInject */.Y36(services_module/* ErrorService */.T_), core/* ɵɵdirectiveInject */.Y36(services_module/* CommunicationService */.OX)); };
    PasswordComponent.ɵcmp = /*@__PURE__*/ core/* ɵɵdefineComponent */.Xpm({ type: PasswordComponent, selectors: [["app-password"]], viewQuery: function PasswordComponent_Query(rf, ctx) {
            if (rf & 1) {
                core/* ɵɵviewQuery */.Gf(_c0, 5);
            }
            if (rf & 2) {
                var _t = void 0;
                core/* ɵɵqueryRefresh */.iGM(_t = core/* ɵɵloadQuery */.CRH()) && (ctx.inputsPass = _t);
            }
        }, inputs: { hasError: "hasError", reset: "reset", showPass: "showPass" }, outputs: { submited: "submited" }, features: [core/* ɵɵNgOnChangesFeature */.TTD], decls: 2, vars: 2, consts: [["fxFlex", "100", "fxLayout", "row wrap", "fxLayoutAlign", "space-between center", 3, "formGroup", "click"], ["appPatternOnly", "", "appNextFocus", "", "appMaxLength", "", "class", "md-input pass-positions", "fxFlex", "8", "fxLayout", "row", 3, "regexInput", "maxLengthValue", "id", "formControlName", "name", "keyup", "textInput", 4, "ngFor", "ngForOf"], ["appPatternOnly", "", "appNextFocus", "", "appMaxLength", "", "fxFlex", "8", "fxLayout", "row", 1, "md-input", "pass-positions", 3, "regexInput", "maxLengthValue", "id", "formControlName", "name", "keyup", "textInput"], ["pass", ""]], template: function PasswordComponent_Template(rf, ctx) {
            if (rf & 1) {
                core/* ɵɵelementStart */.TgZ(0, "div", 0);
                core/* ɵɵlistener */.NdJ("click", function PasswordComponent_Template_div_click_0_listener() { return ctx.checkPosition(); });
                core/* ɵɵtemplate */.YNc(1, PasswordComponent_input_1_Template, 2, 6, "input", 1);
                core/* ɵɵelementEnd */.qZA();
            }
            if (rf & 2) {
                core/* ɵɵproperty */.Q6J("formGroup", ctx.formGroupPass);
                core/* ɵɵadvance */.xp6(1);
                core/* ɵɵproperty */.Q6J("ngForOf", ctx.arrPass);
            }
        }, directives: [flex/* DefaultFlexDirective */.yH, flex/* DefaultLayoutDirective */.xw, flex/* DefaultLayoutAlignDirective */.Wh, fesm2015_forms/* NgControlStatusGroup */.JL, fesm2015_forms/* FormGroupDirective */.sg, common/* NgForOf */.sg, fesm2015_forms/* DefaultValueAccessor */.Fj, PatternOnlyDirective, NextFocusDirective, MaxLengthDirective, fesm2015_forms/* NgControlStatus */.JJ, fesm2015_forms/* FormControlName */.u], encapsulation: 2 });
    return PasswordComponent;
}());


// EXTERNAL MODULE: ./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js
var http = __webpack_require__(42693);
// EXTERNAL MODULE: ./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js
var platform_browser = __webpack_require__(99624);
// EXTERNAL MODULE: ./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/extended.js
var extended = __webpack_require__(41293);
;// CONCATENATED MODULE: ./src/app/components/warning/warning.component.ts





function WarningComponent_div_0_ng_container_3_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelementContainer */.GkF(0);
    }
}
var warning_component_c0 = function (a0) { return { info_look_and_feel: a0 }; };
var _c1 = function (a0) { return { advise_look_and_feel: a0 }; };
function WarningComponent_div_0_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelementStart */.TgZ(0, "div", 3);
        core/* ɵɵelementStart */.TgZ(1, "div");
        core/* ɵɵelementStart */.TgZ(2, "div");
        core/* ɵɵtemplate */.YNc(3, WarningComponent_div_0_ng_container_3_Template, 1, 0, "ng-container", 4);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(4, "div");
        core/* ɵɵelementStart */.TgZ(5, "div", 5);
        core/* ɵɵtext */._uU(6);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        var data_r5 = ctx.ngIf;
        var ctx_r0 = core/* ɵɵnextContext */.oxw();
        var _r3 = core/* ɵɵreference */.MAs(5);
        var _r1 = core/* ɵɵreference */.MAs(3);
        core/* ɵɵclassMapInterpolate1 */.Gre("chip refWarningCall", ctx_r0.name, "");
        core/* ɵɵproperty */.Q6J("ngClass", ctx_r0.info === true ? core/* ɵɵpureFunction1 */.VKq(8, warning_component_c0, ctx_r0.info) : core/* ɵɵpureFunction1 */.VKq(10, _c1, ctx_r0.advise));
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r0.info)("ngIfThen", _r3)("ngIfElse", _r1);
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate1 */.hij(" ", data_r5.value, " ");
    }
}
function WarningComponent_ng_template_2_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelement */._UZ(0, "em", 6);
    }
}
function WarningComponent_ng_template_4_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelementStart */.TgZ(0, "em", 7);
        core/* ɵɵtext */._uU(1, "i");
        core/* ɵɵelementEnd */.qZA();
    }
}
/**
 * Este componente se encarga de pintar los errores en linea asociados auna llamada rest
 */
var WarningComponent = /** @class */ /*@__PURE__*/ (function () {
    function WarningComponent(err) {
        this.err = err;
        /**
         * Cambia el look and field a modo aviso
         */
        this.advise = false;
        /**
         * Cambia el look and field a modo info
         */
        this.info = false;
        this.hasWarning$ = null;
    }
    /**
     * @description A lifecycle hook that is called after Angular has initialized all the data-bound properties of a directive.
     */
    WarningComponent.prototype.ngOnInit = function () {
        if (this.name && !this.hasWarning$) {
            this.hasWarning$ = this.err.hasWarning$(this.name);
        }
    };
    WarningComponent.prototype.ngOnDestroy = function () { };
    WarningComponent.ɵfac = function WarningComponent_Factory(t) { return new (t || WarningComponent)(core/* ɵɵdirectiveInject */.Y36(services_module/* ErrorService */.T_)); };
    WarningComponent.ɵcmp = /*@__PURE__*/ core/* ɵɵdefineComponent */.Xpm({ type: WarningComponent, selectors: [["app-warning"]], inputs: { name: "name", jsonTraduccion: "jsonTraduccion", advise: "advise", info: "info" }, decls: 6, vars: 3, consts: [[3, "class", "ngClass", 4, "ngIf"], ["warnings", ""], ["infos", ""], [3, "ngClass"], [4, "ngIf", "ngIfThen", "ngIfElse"], [1, "break"], [1, "i-warning"], [1, "btn-info"]], template: function WarningComponent_Template(rf, ctx) {
            if (rf & 1) {
                core/* ɵɵtemplate */.YNc(0, WarningComponent_div_0_Template, 7, 12, "div", 0);
                core/* ɵɵpipe */.ALo(1, "async");
                core/* ɵɵtemplate */.YNc(2, WarningComponent_ng_template_2_Template, 1, 0, "ng-template", null, 1, core/* ɵɵtemplateRefExtractor */.W1O);
                core/* ɵɵtemplate */.YNc(4, WarningComponent_ng_template_4_Template, 2, 0, "ng-template", null, 2, core/* ɵɵtemplateRefExtractor */.W1O);
            }
            if (rf & 2) {
                core/* ɵɵproperty */.Q6J("ngIf", core/* ɵɵpipeBind1 */.lcZ(1, 1, ctx.hasWarning$));
            }
        }, directives: [common/* NgIf */.O5, common/* NgClass */.mk, extended/* DefaultClassDirective */.oO], pipes: [common/* AsyncPipe */.Ov], styles: [".chip[_ngcontent-%COMP%]{width:99%;background-color:#e9e9e9;border:1px solid #e9e9e9;font-size:13px;margin:0 auto 15px;padding:0;font-family:\"text\",Arial,sans-serif;font-weight:400}.chip[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin:0 16px;align-items:center;display:flex}.chip[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .break[_ngcontent-%COMP%]{padding-left:8px}.chip[_ngcontent-%COMP%]   .warning-icon[_ngcontent-%COMP%]{max-width:50px;min-width:50px}.chip[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-size:2rem;color:#ec0000}.chip[_ngcontent-%COMP%]   em.btn-info[_ngcontent-%COMP%]{position:relative;height:25px;width:25px;line-height:25px;font-size:20px;float:left;border:2px solid;color:#ec0000;padding:0 0 0 1px;margin-right:12px;margin-left:12px}.chip.advise_look_and_feel[_ngcontent-%COMP%]{background-color:#e9e9e9!important;border:2px solid #d0d0d0!important}.chip.advise_look_and_feel[_ngcontent-%COMP%]   .i-warning[_ngcontent-%COMP%]{color:#ec0000!important}.chip.info_look_and_feel[_ngcontent-%COMP%]{font-family:\"text\",Arial,sans-serif;background-color:#fff!important;border:1px solid #d9d9d9!important;border-radius:3px}.chip.info_look_and_feel[_ngcontent-%COMP%]   .i-star[_ngcontent-%COMP%]{color:#ec0000!important}.warning-block-card[_nghost-%COMP%]   .chip[_ngcontent-%COMP%]{background-color:#f3f3f3!important;border:1px solid #f7f7f7!important}"] });
    return WarningComponent;
}());


// EXTERNAL MODULE: ./node_modules/@angular/material/__ivy_ngcc__/fesm2015/form-field.js
var form_field = __webpack_require__(13070);
// EXTERNAL MODULE: ./node_modules/@angular/material/__ivy_ngcc__/fesm2015/input.js + 1 modules
var input = __webpack_require__(9550);
// EXTERNAL MODULE: ./node_modules/@angular/material/__ivy_ngcc__/fesm2015/checkbox.js
var fesm2015_checkbox = __webpack_require__(40994);
// EXTERNAL MODULE: ./src/app/modules/translate/translate.service.ts + 1 modules
var translate_service = __webpack_require__(34416);
;// CONCATENATED MODULE: ./src/app/pipes/translate/translate.pipe.ts



/**
 * @description Pipe para la traducción "en caliente"
 * los textos se definen directamente en la vista HTML
 */
var TranslatePipe = /** @class */ /*@__PURE__*/ (function () {
    function TranslatePipe(translateService) {
        this.translateService = translateService;
    }
    TranslatePipe.prototype.transform = function (value, type) {
        return this.translateService.translate(value);
    };
    TranslatePipe.ɵfac = function TranslatePipe_Factory(t) { return new (t || TranslatePipe)(core/* ɵɵdirectiveInject */.Y36(translate_service/* TranslateService */.sK, 16)); };
    TranslatePipe.ɵpipe = /*@__PURE__*/ core/* ɵɵdefinePipe */.Yjl({ name: "translate", type: TranslatePipe, pure: true });
    return TranslatePipe;
}());


;// CONCATENATED MODULE: ./src/app/pages/home/home-main/components/login-blocked/login-blocked.component.ts





var login_blocked_component_c0 = function () { return { advise_look_and_feel: false }; };
/**
 * @classdesc componente que pinta el warning de 'Clave de acceso bloqueada'.
 * @export
 * @class LoginBlockedComponent
 */
var LoginBlockedComponent = /** @class */ /*@__PURE__*/ (function () {
    /**
     * @constructor
     * @description Creates an instance of LoginBlockedComponent.
     * @memberof LoginBlockedComponent
     */
    function LoginBlockedComponent() {
        /**
        * @description propiedad output que emite el evento de que se ha hecho click en 'aquí'.
        * @output
        * @type {EventEmitter<any>}
        * @memberof LoginBlockedComponent
        */
        this.eventHere = new core/* EventEmitter */.vpe();
    }
    /**
     * @function selectHere
     * @description método que ejecuta el evento que se ha hecho click en 'aquí'.
     * @return {void}
     * @memberof LoginBlockedComponent
     */
    LoginBlockedComponent.prototype.selectHere = function () {
        this.eventHere.emit();
    };
    LoginBlockedComponent.ɵfac = function LoginBlockedComponent_Factory(t) { return new (t || LoginBlockedComponent)(); };
    LoginBlockedComponent.ɵcmp = /*@__PURE__*/ core/* ɵɵdefineComponent */.Xpm({ type: LoginBlockedComponent, selectors: [["app-login-blocked"]], outputs: { eventHere: "eventHere" }, decls: 12, vars: 8, consts: [[1, "chip", 3, "ngClass"], [1, "i-warning"], [1, "break"], ["id", "here", 1, "pointer", 3, "click"]], template: function LoginBlockedComponent_Template(rf, ctx) {
            if (rf & 1) {
                core/* ɵɵelementStart */.TgZ(0, "div", 0);
                core/* ɵɵelementStart */.TgZ(1, "div");
                core/* ɵɵelementStart */.TgZ(2, "div");
                core/* ɵɵelementContainerStart */.ynx(3);
                core/* ɵɵelement */._UZ(4, "em", 1);
                core/* ɵɵelementContainerEnd */.BQk();
                core/* ɵɵelementEnd */.qZA();
                core/* ɵɵelementStart */.TgZ(5, "div");
                core/* ɵɵelementStart */.TgZ(6, "div", 2);
                core/* ɵɵtext */._uU(7);
                core/* ɵɵpipe */.ALo(8, "translate");
                core/* ɵɵelementStart */.TgZ(9, "a", 3);
                core/* ɵɵlistener */.NdJ("click", function LoginBlockedComponent_Template_a_click_9_listener() { return ctx.selectHere(); });
                core/* ɵɵtext */._uU(10);
                core/* ɵɵpipe */.ALo(11, "translate");
                core/* ɵɵelementEnd */.qZA();
                core/* ɵɵelementEnd */.qZA();
                core/* ɵɵelementEnd */.qZA();
                core/* ɵɵelementEnd */.qZA();
                core/* ɵɵelementEnd */.qZA();
            }
            if (rf & 2) {
                core/* ɵɵproperty */.Q6J("ngClass", core/* ɵɵpureFunction0 */.DdM(7, login_blocked_component_c0));
                core/* ɵɵadvance */.xp6(7);
                core/* ɵɵtextInterpolate1 */.hij(" ", core/* ɵɵpipeBind1 */.lcZ(8, 3, "MAIN_CONTENT.LOGIN_BLOCKED.MESSAGE"), " ");
                core/* ɵɵadvance */.xp6(3);
                core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(11, 5, "MAIN_CONTENT.LOGIN_BLOCKED.HERE"));
            }
        }, directives: [common/* NgClass */.mk, extended/* DefaultClassDirective */.oO], pipes: [TranslatePipe], styles: [".chip[_ngcontent-%COMP%]{width:99%;background-color:#e9e9e9;border:1px solid #e9e9e9;font-size:13px;margin:0 auto 15px;padding:0;font-family:\"text\",Arial,sans-serif;font-weight:400}.chip[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin:0 16px;align-items:center;display:flex}.chip[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   .break[_ngcontent-%COMP%]{padding-left:8px}.chip[_ngcontent-%COMP%]   .warning-icon[_ngcontent-%COMP%]{max-width:50px;min-width:50px}.chip[_ngcontent-%COMP%]   em[_ngcontent-%COMP%]{font-size:2rem;color:#ec0000}.chip[_ngcontent-%COMP%]   em.btn-info[_ngcontent-%COMP%]{position:relative;height:25px;width:25px;line-height:25px;font-size:20px;float:left;border:2px solid;color:#ec0000;padding:0 0 0 1px;margin-right:12px;margin-left:12px}.chip.advise_look_and_feel[_ngcontent-%COMP%]{background-color:#e9e9e9!important;border:2px solid #d0d0d0!important}.chip.advise_look_and_feel[_ngcontent-%COMP%]   .i-warning[_ngcontent-%COMP%]{color:#ec0000!important}.pointer[_ngcontent-%COMP%]{cursor:pointer;color:#137e84;text-decoration:underline}.warning-block-card[_nghost-%COMP%]   .chip[_ngcontent-%COMP%]{background-color:#f3f3f3!important;border:1px solid #f7f7f7!important}"] });
    return LoginBlockedComponent;
}());


;// CONCATENATED MODULE: ./src/app/pages/home/home-main/components/keyboard/keyboard.component.ts




function KeyboardComponent_div_2_Template(rf, ctx) {
    if (rf & 1) {
        var _r5 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "div", 6);
        core/* ɵɵlistener */.NdJ("click", function KeyboardComponent_div_2_Template_div_click_0_listener() { var restoredCtx = core/* ɵɵrestoreView */.CHM(_r5); var key_r2 = restoredCtx.$implicit; var ctx_r4 = core/* ɵɵnextContext */.oxw(); return ctx_r4.clickKeyUp(key_r2.keyValue); });
        core/* ɵɵelementStart */.TgZ(1, "a", 7);
        core/* ɵɵtext */._uU(2);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        var key_r2 = ctx.$implicit;
        var i_r3 = ctx.index;
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("id", "keyValueUp" + i_r3);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵtextInterpolate */.Oqu(key_r2.keyValue);
    }
}
function KeyboardComponent_div_4_Template(rf, ctx) {
    if (rf & 1) {
        var _r9 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "div", 6);
        core/* ɵɵlistener */.NdJ("click", function KeyboardComponent_div_4_Template_div_click_0_listener() { var restoredCtx = core/* ɵɵrestoreView */.CHM(_r9); var key_r6 = restoredCtx.$implicit; var ctx_r8 = core/* ɵɵnextContext */.oxw(); return ctx_r8.clickKeyUp(key_r6.keyValue); });
        core/* ɵɵelementStart */.TgZ(1, "a", 7);
        core/* ɵɵtext */._uU(2);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        var key_r6 = ctx.$implicit;
        var i_r7 = ctx.index;
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("id", "keyValueDown" + i_r7);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵtextInterpolate */.Oqu(key_r6.keyValue);
    }
}
/**
 * @description Componente que muestra un teclado en pantalla
 * Teclado para la introducción de contraseña
 */
var KeyboardComponent = /** @class */ /*@__PURE__*/ (function () {
    function KeyboardComponent() {
        this.positions = {
            up: [],
            down: []
        };
        this.keyValues = [];
        this.clickKey = new core/* EventEmitter */.vpe();
    }
    /**
     * @description A lifecycle hook that is called after Angular has initialized all the data-bound properties of a directive.
     */
    KeyboardComponent.prototype.ngOnInit = function () {
        for (var p = 0; p <= 9; p++) {
            this.setPositions();
        }
    };
    /**
     * @description Setea la posición de la tecla (virtual) pulsada
     */
    KeyboardComponent.prototype.setPositions = function () {
        var key = this.randomDelay();
        var valid = true;
        if (this.keyValues.length > 0) {
            for (var v = 0; v <= this.keyValues.length; v++) {
                if (this.keyValues[v] === key) {
                    valid = false;
                }
            }
        }
        if (valid) {
            this.keyValues.push(key);
            if (this.positions.up.length < 6) {
                this.positions.up.push({ keyValue: key });
            }
            else if (this.positions.down.length < 4) {
                this.positions.down.push({ keyValue: key });
            }
        }
        else {
            this.setPositions();
        }
    };
    /**
     * @description Emite el evento de que se ha pulsado en una tecla (virtual)
     */
    KeyboardComponent.prototype.clickKeyUp = function (event) {
        this.clickKey.emit(event);
    };
    /**
     * @description Retorna entre 250 y 500 milisegundos
     */
    KeyboardComponent.prototype.randomDelay = function (min, max) {
        if (min === void 0) {
            min = 0;
        }
        if (max === void 0) {
            max = 9;
        }
        // Create byte array and fill with 1 random number
        var byteArray = new Uint8Array(1);
        var crypto = window.crypto || window['msCrypto']; // msCrypto para iE
        crypto.getRandomValues(byteArray);
        var range = max - min + 1;
        var maxRange = 256;
        if (byteArray[0] >= Math.floor(maxRange / range) * range) {
            return this.randomDelay(min, max);
        }
        var resNumber = min + (byteArray[0] % range);
        return resNumber;
    };
    KeyboardComponent.ɵfac = function KeyboardComponent_Factory(t) { return new (t || KeyboardComponent)(); };
    KeyboardComponent.ɵcmp = /*@__PURE__*/ core/* ɵɵdefineComponent */.Xpm({ type: KeyboardComponent, selectors: [["app-keyboard"]], outputs: { clickKey: "clickKey" }, decls: 8, vars: 2, consts: [["fxFlex", "100", "fxLayout", "row wrap", 1, "keyboard-container"], ["fxFlex", "100", "fxLayout", "row", "fxLayoutAlign", "center center", 1, "upper-row"], ["fxFlex", "16.66", "fxLayout", "row", "class", "tecla-container", 3, "click", 4, "ngFor", "ngForOf"], ["fxFlex", "100", "fxLayout", "row", "fxLayoutAlign", "center center", 1, "lower-row"], ["fxFlex", "33.33", "fxLayout", "row", "fxLayoutAlign", "center center", 1, "delete-container", 3, "click"], ["id", "deleteBtn", "fxFlex", "100", 1, "tecla-delete"], ["fxFlex", "16.66", "fxLayout", "row", 1, "tecla-container", 3, "click"], ["fxFlex", "100", 1, "tecla", 3, "id"]], template: function KeyboardComponent_Template(rf, ctx) {
            if (rf & 1) {
                core/* ɵɵelementStart */.TgZ(0, "div", 0);
                core/* ɵɵelementStart */.TgZ(1, "div", 1);
                core/* ɵɵtemplate */.YNc(2, KeyboardComponent_div_2_Template, 3, 2, "div", 2);
                core/* ɵɵelementEnd */.qZA();
                core/* ɵɵelementStart */.TgZ(3, "div", 3);
                core/* ɵɵtemplate */.YNc(4, KeyboardComponent_div_4_Template, 3, 2, "div", 2);
                core/* ɵɵelementStart */.TgZ(5, "div", 4);
                core/* ɵɵlistener */.NdJ("click", function KeyboardComponent_Template_div_click_5_listener() { return ctx.clickKeyUp("clean"); });
                core/* ɵɵelementStart */.TgZ(6, "a", 5);
                core/* ɵɵtext */._uU(7, "Borrar");
                core/* ɵɵelementEnd */.qZA();
                core/* ɵɵelementEnd */.qZA();
                core/* ɵɵelementEnd */.qZA();
                core/* ɵɵelementEnd */.qZA();
            }
            if (rf & 2) {
                core/* ɵɵadvance */.xp6(2);
                core/* ɵɵproperty */.Q6J("ngForOf", ctx.positions.up);
                core/* ɵɵadvance */.xp6(2);
                core/* ɵɵproperty */.Q6J("ngForOf", ctx.positions.down);
            }
        }, directives: [flex/* DefaultFlexDirective */.yH, flex/* DefaultLayoutDirective */.xw, flex/* DefaultLayoutAlignDirective */.Wh, common/* NgForOf */.sg], styles: [".keyboard-container[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], .keyboard-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{-ms-user-select:none;user-select:none}"] });
    return KeyboardComponent;
}());


;// CONCATENATED MODULE: ./src/app/components/loading/loading.component.ts






var loading_component_c0 = function (a0) { return { "loading-red": a0 }; };
function LoadingComponent_div_0_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelementStart */.TgZ(0, "div");
        core/* ɵɵelementStart */.TgZ(1, "strong", 1);
        core/* ɵɵelement */._UZ(2, "strong", 2);
        core/* ɵɵelement */._UZ(3, "strong", 3);
        core/* ɵɵelement */._UZ(4, "strong", 4);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        var ctx_r0 = core/* ɵɵnextContext */.oxw();
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngClass", core/* ɵɵpureFunction1 */.VKq(1, loading_component_c0, ctx_r0.name === "regClavesIframeLoading"));
    }
}
/**
 * Componente para los pintados de loadings, tanto parciales como globales
 */
var LoadingComponent = /** @class */ /*@__PURE__*/ (function () {
    function LoadingComponent(loading, warn) {
        this.loading = loading;
        this.warn = warn;
        this.independent = false;
        this.dev = false;
        this.hasFullLoading = null;
        this.hasPartialLoading = null;
        this.blockNavigation = null;
        this.subscriptions = [];
        this.isBlocked = false;
    }
    /**
     * @description A lifecycle hook that is called after Angular has initialized all the data-bound properties of a directive.
     */
    LoadingComponent.prototype.ngOnInit = function () {
        this.blockNavigation = !this.isBlocked;
        if (window.location.hostname === 'localhost') {
            this.dev = true;
        }
        this.checkLoading();
    };
    /**
     * @description Comprobación para inicio de carga
     */
    LoadingComponent.prototype.checkLoading = function () {
        var _this = this;
        if (this.name && !this.hasFullLoading) {
            this.hasFullLoading = this.loading.hasFullLoading(this.name);
        }
        if (this.name && !this.hasPartialLoading) {
            this.hasPartialLoading = this.loading.hasPartialLoading(this.name);
        }
        this.subscriptions.push(this.loading.clearFullPageObs.subscribe(function (val) {
            if (val === true) {
                _this.blockNavigation = true;
            }
        }));
    };
    /**
     * @description Comprueba si el warning ya se está mostrando
     */
    LoadingComponent.prototype.checkIn = function (name) {
        if (this.warn.hasWarning(name)) {
            return false;
        }
        else {
            return this.loading.partialLoadings.indexOf(name) !== -1;
        }
    };
    /**
     * @description Función que comprueba si el loading esta activo en ese momento
     */
    LoadingComponent.prototype.isIn = function () {
        var e_1, _a;
        if (this.name === 'fullPage') {
            if (window.location.hostname === 'localhost') {
                this.dev = true;
            }
            return this.loading.fullPageLoading.length > 0;
        }
        else {
            if (typeof this.name === 'string') {
                return this.checkIn(this.name);
            }
            else if (typeof this.name === 'object' && this.name !== null) {
                var toReturn = false;
                try {
                    for (var _b = (0,tslib_es6/* __values */.XA)(Object.keys(this.name)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var nameRef = _c.value;
                        toReturn = toReturn || this.checkIn(nameRef);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                return toReturn;
            }
            else {
                return false;
            }
        }
    };
    LoadingComponent.prototype.ngOnDestroy = function () {
        var e_2, _a;
        try {
            for (var _b = (0,tslib_es6/* __values */.XA)(this.subscriptions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var subs = _c.value;
                subs.unsubscribe();
            }
        }
        catch (e_2_1) {
            e_2 = { error: e_2_1 };
        }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return))
                    _a.call(_b);
            }
            finally {
                if (e_2)
                    throw e_2.error;
            }
        }
    };
    LoadingComponent.ɵfac = function LoadingComponent_Factory(t) { return new (t || LoadingComponent)(core/* ɵɵdirectiveInject */.Y36(services_module/* LoadingService */.bz), core/* ɵɵdirectiveInject */.Y36(services_module/* ErrorService */.T_)); };
    LoadingComponent.ɵcmp = /*@__PURE__*/ core/* ɵɵdefineComponent */.Xpm({ type: LoadingComponent, selectors: [["app-loading"]], inputs: { name: "name", independent: "independent", isBlocked: "isBlocked" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "loading", 3, "ngClass"], [1, "b1"], [1, "b2"], [1, "b3"]], template: function LoadingComponent_Template(rf, ctx) {
            if (rf & 1) {
                core/* ɵɵtemplate */.YNc(0, LoadingComponent_div_0_Template, 5, 3, "div", 0);
            }
            if (rf & 2) {
                core/* ɵɵproperty */.Q6J("ngIf", ctx.independent);
            }
        }, directives: [common/* NgIf */.O5, common/* NgClass */.mk, extended/* DefaultClassDirective */.oO], styles: [".loading[_ngcontent-%COMP%]{width:6rem;text-align:center;line-height:3.5rem;display:block;margin:0 auto}.loading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{width:18px;height:18px;background-color:#fff;border-radius:100%;display:inline-block;animation:sk-bouncedelay 1.4s infinite ease-in-out both}.loading[_ngcontent-%COMP%]   .b1[_ngcontent-%COMP%]{animation-delay:-.32s}.loading[_ngcontent-%COMP%]   .b2[_ngcontent-%COMP%]{animation-delay:-.16s}@keyframes sk-bouncedelay{0%,80%,to{transform:scale(0)}40%{transform:scale(1)}}.loading-red[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{background-color:#ec0000}"], changeDetection: 0 });
    return LoadingComponent;
}());


;// CONCATENATED MODULE: ./src/app/pages/home/home-main/home-main.component.ts





























var home_main_component_c0 = ["keygenFrame"];
var home_main_component_c1 = ["validationNumber"];
function HomeMainComponent_div_0_div_1_Template(rf, ctx) {
    if (rf & 1) {
        var _r11 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "div", 13);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_div_1_Template_div_click_0_listener() { core/* ɵɵrestoreView */.CHM(_r11); var ctx_r10 = core/* ɵɵnextContext */.oxw(2); return ctx_r10.gotoApp(); });
        core/* ɵɵelementStart */.TgZ(1, "div", 14);
        core/* ɵɵelement */._UZ(2, "img", 15);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(3, "div", 16);
        core/* ɵɵelementStart */.TgZ(4, "strong");
        core/* ɵɵtext */._uU(5);
        core/* ɵɵpipe */.ALo(6, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵtext */._uU(7);
        core/* ɵɵpipe */.ALo(8, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(9, "div", 17);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_div_1_Template_div_click_9_listener() { core/* ɵɵrestoreView */.CHM(_r11); var ctx_r12 = core/* ɵɵnextContext */.oxw(2); return !(ctx_r12.isMobile = false); });
        core/* ɵɵelementStart */.TgZ(10, "a", 18);
        core/* ɵɵtext */._uU(11, "X");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        core/* ɵɵadvance */.xp6(5);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(6, 2, "SMART_BANNER.TEXT1"));
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵtextInterpolate1 */.hij(" ", core/* ɵɵpipeBind1 */.lcZ(8, 4, "SMART_BANNER.TEXT2"), " ");
    }
}
function HomeMainComponent_div_0_em_4_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelement */._UZ(0, "em", 19);
        core/* ɵɵpipe */.ALo(1, "translate");
    }
    if (rf & 2) {
        core/* ɵɵproperty */.Q6J("ngClass", core/* ɵɵpipeBind1 */.lcZ(1, 1, "LOGO"));
    }
}
function HomeMainComponent_div_0_img_6_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelement */._UZ(0, "img", 20);
    }
}
function HomeMainComponent_div_0_em_10_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelement */._UZ(0, "em", 19);
        core/* ɵɵpipe */.ALo(1, "translate");
    }
    if (rf & 2) {
        core/* ɵɵproperty */.Q6J("ngClass", core/* ɵɵpipeBind1 */.lcZ(1, 1, "LOGO"));
    }
}
function HomeMainComponent_div_0_img_12_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelement */._UZ(0, "img", 20);
    }
}
function HomeMainComponent_div_0_ng_container_15_a_10_Template(rf, ctx) {
    if (rf & 1) {
        var _r27 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "a", 80);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_a_10_Template_a_click_0_listener() { core/* ɵɵrestoreView */.CHM(_r27); var ctx_r26 = core/* ɵɵnextContext */.oxw(3); return ctx_r26.gotoPage("back"); });
        core/* ɵɵtext */._uU(1);
        core/* ɵɵpipe */.ALo(2, "translate");
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵtextInterpolate1 */.hij(" \u2190 ", core/* ɵɵpipeBind1 */.lcZ(2, 1, "MAIN_CONTENT.COMMON.RETURN"), " ");
    }
}
function HomeMainComponent_div_0_ng_container_15_app_login_blocked_27_Template(rf, ctx) {
    if (rf & 1) {
        var _r29 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "app-login-blocked", 81);
        core/* ɵɵlistener */.NdJ("eventHere", function HomeMainComponent_div_0_ng_container_15_app_login_blocked_27_Template_app_login_blocked_eventHere_0_listener() { core/* ɵɵrestoreView */.CHM(_r29); var ctx_r28 = core/* ɵɵnextContext */.oxw(3); return ctx_r28.goToKeyGeneration(); });
        core/* ɵɵelementEnd */.qZA();
    }
}
function HomeMainComponent_div_0_ng_container_15_em_78_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelement */._UZ(0, "em", 82);
    }
}
function HomeMainComponent_div_0_ng_container_15_em_79_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelement */._UZ(0, "em", 83);
    }
}
function HomeMainComponent_div_0_ng_container_15_div_80_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelement */._UZ(0, "div", 84);
    }
}
function HomeMainComponent_div_0_ng_container_15_div_81_em_1_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelement */._UZ(0, "em", 88);
    }
}
function HomeMainComponent_div_0_ng_container_15_div_81_em_2_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelement */._UZ(0, "em", 89);
    }
}
function HomeMainComponent_div_0_ng_container_15_div_81_Template(rf, ctx) {
    if (rf & 1) {
        var _r33 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "div", 85);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_div_81_Template_div_click_0_listener() { core/* ɵɵrestoreView */.CHM(_r33); var ctx_r32 = core/* ɵɵnextContext */.oxw(3); return ctx_r32.showKeyBoard(); });
        core/* ɵɵtemplate */.YNc(1, HomeMainComponent_div_0_ng_container_15_div_81_em_1_Template, 1, 0, "em", 86);
        core/* ɵɵtemplate */.YNc(2, HomeMainComponent_div_0_ng_container_15_div_81_em_2_Template, 1, 0, "em", 87);
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        var ctx_r19 = core/* ɵɵnextContext */.oxw(3);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", !ctx_r19.showingKeyboard);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r19.showingKeyboard);
    }
}
function HomeMainComponent_div_0_ng_container_15_div_82_Template(rf, ctx) {
    if (rf & 1) {
        var _r35 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "div", 90);
        core/* ɵɵelementStart */.TgZ(1, "app-keyboard", 91);
        core/* ɵɵlistener */.NdJ("clickKey", function HomeMainComponent_div_0_ng_container_15_div_82_Template_app_keyboard_clickKey_1_listener($event) { core/* ɵɵrestoreView */.CHM(_r35); var ctx_r34 = core/* ɵɵnextContext */.oxw(3); return ctx_r34.clickKey($event); });
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
}
function HomeMainComponent_div_0_ng_container_15_button_90_Template(rf, ctx) {
    if (rf & 1) {
        var _r37 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "button", 92);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_button_90_Template_button_click_0_listener($event) { core/* ɵɵrestoreView */.CHM(_r37); var ctx_r36 = core/* ɵɵnextContext */.oxw(3); $event.preventDefault(); return ctx_r36.submitForm(); });
        core/* ɵɵtext */._uU(1, "Entrar");
        core/* ɵɵelementEnd */.qZA();
    }
}
function HomeMainComponent_div_0_ng_container_15_button_91_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelementStart */.TgZ(0, "button", 93);
        core/* ɵɵelement */._UZ(1, "app-loading", 94);
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("independent", true);
    }
}
function HomeMainComponent_div_0_ng_container_15_div_92_Template(rf, ctx) {
    if (rf & 1) {
        var _r39 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "div", 95);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_div_92_Template_div_click_0_listener() { core/* ɵɵrestoreView */.CHM(_r39); var ctx_r38 = core/* ɵɵnextContext */.oxw(3); return ctx_r38.setProblemPass(); });
        core/* ɵɵelementStart */.TgZ(1, "a", 96);
        core/* ɵɵtext */._uU(2);
        core/* ɵɵpipe */.ALo(3, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(3, 1, "MAIN_CONTENT.BOX_LOGIN.LINK_PROBLEM"));
    }
}
function HomeMainComponent_div_0_ng_container_15_div_94_div_1_Template(rf, ctx) {
    if (rf & 1) {
        var _r43 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "div", 100);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_div_94_div_1_Template_div_click_0_listener() { core/* ɵɵrestoreView */.CHM(_r43); var ctx_r42 = core/* ɵɵnextContext */.oxw(4); return ctx_r42.gotoPage("support"); });
        core/* ɵɵelement */._UZ(1, "em", 101);
        core/* ɵɵelementStart */.TgZ(2, "a");
        core/* ɵɵtext */._uU(3);
        core/* ɵɵpipe */.ALo(4, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(4, 1, "MAIN_CONTENT.COMMON.CUSTOMER_SUPPORT"));
    }
}
function HomeMainComponent_div_0_ng_container_15_div_94_div_2_Template(rf, ctx) {
    if (rf & 1) {
        var _r45 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "div", 102);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_div_94_div_2_Template_div_click_0_listener() { core/* ɵɵrestoreView */.CHM(_r45); var ctx_r44 = core/* ɵɵnextContext */.oxw(4); return ctx_r44.gotoPage("map"); });
        core/* ɵɵelement */._UZ(1, "em", 103);
        core/* ɵɵelementStart */.TgZ(2, "a");
        core/* ɵɵtext */._uU(3);
        core/* ɵɵpipe */.ALo(4, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(4, 1, "MAIN_CONTENT.COMMON.OFFICES_ATMS"));
    }
}
function HomeMainComponent_div_0_ng_container_15_div_94_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelementStart */.TgZ(0, "div", 97);
        core/* ɵɵtemplate */.YNc(1, HomeMainComponent_div_0_ng_container_15_div_94_div_1_Template, 5, 3, "div", 98);
        core/* ɵɵtemplate */.YNc(2, HomeMainComponent_div_0_ng_container_15_div_94_div_2_Template, 5, 3, "div", 99);
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        var ctx_r24 = core/* ɵɵnextContext */.oxw(3);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r24.externalLinks.support.enable);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r24.externalLinks.map.enable);
    }
}
function HomeMainComponent_div_0_ng_container_15_div_96_div_3_Template(rf, ctx) {
    if (rf & 1) {
        var _r50 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "div", 108);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_div_96_div_3_Template_div_click_0_listener() { core/* ɵɵrestoreView */.CHM(_r50); var ctx_r49 = core/* ɵɵnextContext */.oxw(4); return ctx_r49.gotoPage("register"); });
        core/* ɵɵelement */._UZ(1, "div", 109);
        core/* ɵɵelementStart */.TgZ(2, "span");
        core/* ɵɵtext */._uU(3);
        core/* ɵɵpipe */.ALo(4, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(4, 1, "MAIN_CONTENT.BOX_INFO.ONLINE_BANK_REGISTER"));
    }
}
function HomeMainComponent_div_0_ng_container_15_div_96_div_4_Template(rf, ctx) {
    if (rf & 1) {
        var _r52 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "div", 108);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_div_96_div_4_Template_div_click_0_listener() { core/* ɵɵrestoreView */.CHM(_r52); var ctx_r51 = core/* ɵɵnextContext */.oxw(4); return ctx_r51.gotoPage("demo"); });
        core/* ɵɵelement */._UZ(1, "div", 110);
        core/* ɵɵelementStart */.TgZ(2, "span");
        core/* ɵɵtext */._uU(3);
        core/* ɵɵpipe */.ALo(4, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(4, 1, "MAIN_CONTENT.BOX_INFO.DEMO"));
    }
}
function HomeMainComponent_div_0_ng_container_15_div_96_div_5_Template(rf, ctx) {
    if (rf & 1) {
        var _r54 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "div", 108);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_div_96_div_5_Template_div_click_0_listener() { core/* ɵɵrestoreView */.CHM(_r54); var ctx_r53 = core/* ɵɵnextContext */.oxw(4); return ctx_r53.gotoPage("info"); });
        core/* ɵɵelement */._UZ(1, "div", 110);
        core/* ɵɵelementStart */.TgZ(2, "span");
        core/* ɵɵtext */._uU(3);
        core/* ɵɵpipe */.ALo(4, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(4, 1, "MAIN_CONTENT.BOX_INFO.SECURITY"));
    }
}
function HomeMainComponent_div_0_ng_container_15_div_96_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelementStart */.TgZ(0, "div", 104);
        core/* ɵɵelementStart */.TgZ(1, "div", 105);
        core/* ɵɵelementStart */.TgZ(2, "div", 106);
        core/* ɵɵtemplate */.YNc(3, HomeMainComponent_div_0_ng_container_15_div_96_div_3_Template, 5, 3, "div", 107);
        core/* ɵɵtemplate */.YNc(4, HomeMainComponent_div_0_ng_container_15_div_96_div_4_Template, 5, 3, "div", 107);
        core/* ɵɵtemplate */.YNc(5, HomeMainComponent_div_0_ng_container_15_div_96_div_5_Template, 5, 3, "div", 107);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        var ctx_r25 = core/* ɵɵnextContext */.oxw(3);
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r25.externalLinks.register.enable);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r25.externalLinks.demo.enable);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r25.externalLinks.info.enable);
    }
}
var _c2 = function (a0) { return { "invisible": a0 }; };
var _c3 = function (a0) { return { "login_user": a0 }; };
function HomeMainComponent_div_0_ng_container_15_Template(rf, ctx) {
    if (rf & 1) {
        var _r56 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementContainerStart */.ynx(0);
        core/* ɵɵelementStart */.TgZ(1, "div", 21);
        core/* ɵɵelementStart */.TgZ(2, "div", 22);
        core/* ɵɵelementStart */.TgZ(3, "div", 23);
        core/* ɵɵelementStart */.TgZ(4, "a", 24);
        core/* ɵɵtext */._uU(5);
        core/* ɵɵpipe */.ALo(6, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(7, "a", 25);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_Template_a_click_7_listener() { core/* ɵɵrestoreView */.CHM(_r56); var ctx_r55 = core/* ɵɵnextContext */.oxw(2); return ctx_r55.gotoPage("bussiness"); });
        core/* ɵɵtext */._uU(8);
        core/* ɵɵpipe */.ALo(9, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵtemplate */.YNc(10, HomeMainComponent_div_0_ng_container_15_a_10_Template, 3, 3, "a", 26);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(11, "div", 27);
        core/* ɵɵelementStart */.TgZ(12, "h1");
        core/* ɵɵtext */._uU(13);
        core/* ɵɵpipe */.ALo(14, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(15, "div", 28);
        core/* ɵɵelementStart */.TgZ(16, "p");
        core/* ɵɵtext */._uU(17);
        core/* ɵɵpipe */.ALo(18, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(19, "div", 29);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_Template_div_click_19_listener() { core/* ɵɵrestoreView */.CHM(_r56); var ctx_r57 = core/* ɵɵnextContext */.oxw(2); return ctx_r57.cleanForm(); });
        core/* ɵɵelement */._UZ(20, "em", 30);
        core/* ɵɵelementStart */.TgZ(21, "span");
        core/* ɵɵtext */._uU(22);
        core/* ɵɵpipe */.ALo(23, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(24, "div", 31);
        core/* ɵɵelementStart */.TgZ(25, "div", 32);
        core/* ɵɵelement */._UZ(26, "app-warning", 33);
        core/* ɵɵtemplate */.YNc(27, HomeMainComponent_div_0_ng_container_15_app_login_blocked_27_Template, 1, 0, "app-login-blocked", 34);
        core/* ɵɵelementStart */.TgZ(28, "div", 35);
        core/* ɵɵelementStart */.TgZ(29, "form-field", 36);
        core/* ɵɵelementStart */.TgZ(30, "label", 37);
        core/* ɵɵtext */._uU(31);
        core/* ɵɵpipe */.ALo(32, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(33, "div", 38);
        core/* ɵɵelement */._UZ(34, "label", 39);
        core/* ɵɵelementStart */.TgZ(35, "select", 40);
        core/* ɵɵelementStart */.TgZ(36, "option", 41);
        core/* ɵɵtext */._uU(37, "NIF");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(38, "option", 42);
        core/* ɵɵtext */._uU(39, "CIF");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(40, "option", 43);
        core/* ɵɵtext */._uU(41, "NIE");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(42, "option", 44);
        core/* ɵɵtext */._uU(43);
        core/* ɵɵpipe */.ALo(44, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(45, "option", 45);
        core/* ɵɵtext */._uU(46);
        core/* ɵɵpipe */.ALo(47, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(48, "div", 46);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_Template_div_click_48_listener($event) { core/* ɵɵrestoreView */.CHM(_r56); var ctx_r58 = core/* ɵɵnextContext */.oxw(2); return ctx_r58.clickCustomSelect($event); });
        core/* ɵɵtext */._uU(49, "NIF");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(50, "div", 47);
        core/* ɵɵelementStart */.TgZ(51, "div", 48);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_Template_div_click_51_listener($event) { core/* ɵɵrestoreView */.CHM(_r56); var ctx_r59 = core/* ɵɵnextContext */.oxw(2); return ctx_r59.clickCustomSelectOption($event, "N"); });
        core/* ɵɵtext */._uU(52, "NIF");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(53, "div", 49);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_Template_div_click_53_listener($event) { core/* ɵɵrestoreView */.CHM(_r56); var ctx_r60 = core/* ɵɵnextContext */.oxw(2); return ctx_r60.clickCustomSelectOption($event, "S"); });
        core/* ɵɵtext */._uU(54, "CIF");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(55, "div", 49);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_Template_div_click_55_listener($event) { core/* ɵɵrestoreView */.CHM(_r56); var ctx_r61 = core/* ɵɵnextContext */.oxw(2); return ctx_r61.clickCustomSelectOption($event, "C"); });
        core/* ɵɵtext */._uU(56, "NIE");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(57, "div", 49);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_Template_div_click_57_listener($event) { core/* ɵɵrestoreView */.CHM(_r56); var ctx_r62 = core/* ɵɵnextContext */.oxw(2); return ctx_r62.clickCustomSelectOption($event, "I"); });
        core/* ɵɵtext */._uU(58);
        core/* ɵɵpipe */.ALo(59, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(60, "div", 49);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_Template_div_click_60_listener($event) { core/* ɵɵrestoreView */.CHM(_r56); var ctx_r63 = core/* ɵɵnextContext */.oxw(2); return ctx_r63.clickCustomSelectOption($event, "U"); });
        core/* ɵɵtext */._uU(61);
        core/* ɵɵpipe */.ALo(62, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelement */._UZ(63, "div", 50);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(64, "div", 51);
        core/* ɵɵelementStart */.TgZ(65, "mat-form-field", 52, 53);
        core/* ɵɵelementStart */.TgZ(67, "input", 54);
        core/* ɵɵlistener */.NdJ("keypress", function HomeMainComponent_div_0_ng_container_15_Template_input_keypress_67_listener($event) { core/* ɵɵrestoreView */.CHM(_r56); var ctx_r64 = core/* ɵɵnextContext */.oxw(2); return ctx_r64.checkDocuKeyPress($event); });
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(68, "div", 55);
        core/* ɵɵelementStart */.TgZ(69, "div", 56);
        core/* ɵɵelementStart */.TgZ(70, "mat-label", 57);
        core/* ɵɵtext */._uU(71);
        core/* ɵɵpipe */.ALo(72, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(73, "div", 58);
        core/* ɵɵelementStart */.TgZ(74, "app-password", 59);
        core/* ɵɵlistener */.NdJ("submited", function HomeMainComponent_div_0_ng_container_15_Template_app_password_submited_74_listener() { core/* ɵɵrestoreView */.CHM(_r56); var ctx_r65 = core/* ɵɵnextContext */.oxw(2); return ctx_r65.submitForm(); });
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(75, "div", 60);
        core/* ɵɵelementStart */.TgZ(76, "div", 61);
        core/* ɵɵelementStart */.TgZ(77, "div", 62);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_15_Template_div_click_77_listener() { core/* ɵɵrestoreView */.CHM(_r56); var ctx_r66 = core/* ɵɵnextContext */.oxw(2); return ctx_r66.showPass(); });
        core/* ɵɵtemplate */.YNc(78, HomeMainComponent_div_0_ng_container_15_em_78_Template, 1, 0, "em", 63);
        core/* ɵɵtemplate */.YNc(79, HomeMainComponent_div_0_ng_container_15_em_79_Template, 1, 0, "em", 64);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵtemplate */.YNc(80, HomeMainComponent_div_0_ng_container_15_div_80_Template, 1, 0, "div", 65);
        core/* ɵɵtemplate */.YNc(81, HomeMainComponent_div_0_ng_container_15_div_81_Template, 3, 2, "div", 66);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵtemplate */.YNc(82, HomeMainComponent_div_0_ng_container_15_div_82_Template, 2, 0, "div", 67);
        core/* ɵɵelementStart */.TgZ(83, "div", 68);
        core/* ɵɵelementStart */.TgZ(84, "p", 69);
        core/* ɵɵelementStart */.TgZ(85, "mat-checkbox", 70);
        core/* ɵɵlistener */.NdJ("change", function HomeMainComponent_div_0_ng_container_15_Template_mat_checkbox_change_85_listener($event) { core/* ɵɵrestoreView */.CHM(_r56); var ctx_r67 = core/* ɵɵnextContext */.oxw(2); return ctx_r67.rememberMe($event); });
        core/* ɵɵelementStart */.TgZ(86, "span", 71);
        core/* ɵɵtext */._uU(87);
        core/* ɵɵpipe */.ALo(88, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(89, "div", 72);
        core/* ɵɵtemplate */.YNc(90, HomeMainComponent_div_0_ng_container_15_button_90_Template, 2, 0, "button", 73);
        core/* ɵɵtemplate */.YNc(91, HomeMainComponent_div_0_ng_container_15_button_91_Template, 2, 1, "button", 74);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵtemplate */.YNc(92, HomeMainComponent_div_0_ng_container_15_div_92_Template, 4, 3, "div", 75);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(93, "div", 76);
        core/* ɵɵtemplate */.YNc(94, HomeMainComponent_div_0_ng_container_15_div_94_Template, 3, 2, "div", 77);
        core/* ɵɵelement */._UZ(95, "div", 78);
        core/* ɵɵtemplate */.YNc(96, HomeMainComponent_div_0_ng_container_15_div_96_Template, 6, 3, "div", 79);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementContainerEnd */.BQk();
    }
    if (rf & 2) {
        var ctx_r7 = core/* ɵɵnextContext */.oxw(2);
        core/* ɵɵadvance */.xp6(4);
        core/* ɵɵproperty */.Q6J("ngClass", core/* ɵɵpureFunction1 */.VKq(69, _c2, ctx_r7.userName));
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵtextInterpolate1 */.hij(" ", core/* ɵɵpipeBind1 */.lcZ(6, 45, "MAIN_CONTENT.BOX_LOGIN.LINKS.PRIVATE"), " ");
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("ngClass", core/* ɵɵpureFunction1 */.VKq(71, _c2, ctx_r7.userName || !ctx_r7.externalLinks.bussiness.enable));
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵtextInterpolate1 */.hij(" ", core/* ɵɵpipeBind1 */.lcZ(9, 47, "MAIN_CONTENT.BOX_LOGIN.LINKS.BUSINESS"), " ");
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r7.externalLinks.back.enable);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("hidden", !ctx_r7.userName);
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵtextInterpolate2 */.AsE("", core/* ɵɵpipeBind1 */.lcZ(14, 49, "MAIN_CONTENT.BOX_LOGIN.WELLCOME"), " ", ctx_r7.userName, "");
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("hidden", ctx_r7.userName);
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(18, 51, "MAIN_CONTENT.BOX_LOGIN.WELLCOME_TEXT"));
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("hidden", !ctx_r7.userName);
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate1 */.hij(" ", core/* ɵɵpipeBind1 */.lcZ(23, 53, "MAIN_CONTENT.BOX_LOGIN.USER_CHANGE"), " ");
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵproperty */.Q6J("formGroup", ctx_r7.loginForm);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("name", "login");
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r7.showLoginBlocked);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngClass", core/* ɵɵpureFunction1 */.VKq(73, _c3, ctx_r7.loginType))("hidden", ctx_r7.userName);
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate1 */.hij(" ", core/* ɵɵpipeBind1 */.lcZ(32, 55, "MAIN_CONTENT.BOX_LOGIN.SELECT_DOCUMENT.DOCUMENT"), " ");
        core/* ɵɵadvance */.xp6(12);
        core/* ɵɵtextInterpolate1 */.hij(" ", core/* ɵɵpipeBind1 */.lcZ(44, 57, "MAIN_CONTENT.BOX_LOGIN.SELECT_DOCUMENT.PASSPORT"), "");
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate1 */.hij(" ", core/* ɵɵpipeBind1 */.lcZ(47, 59, "MAIN_CONTENT.BOX_LOGIN.SELECT_DOCUMENT.USER"), "");
        core/* ɵɵadvance */.xp6(12);
        core/* ɵɵtextInterpolate1 */.hij(" ", core/* ɵɵpipeBind1 */.lcZ(59, 61, "MAIN_CONTENT.BOX_LOGIN.SELECT_DOCUMENT.PASSPORT"), "");
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate1 */.hij(" ", core/* ɵɵpipeBind1 */.lcZ(62, 63, "MAIN_CONTENT.BOX_LOGIN.SELECT_DOCUMENT.USER"), "");
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵproperty */.Q6J("ngClass", core/* ɵɵpureFunction1 */.VKq(75, _c3, ctx_r7.loginType))("hidden", ctx_r7.userName);
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵpropertyInterpolate */.s9C("placeholder", ctx_r7.inputDocumentSettings.inputPlaceholder);
        core/* ɵɵproperty */.Q6J("minLength", ctx_r7.inputDocumentSettings.minlength)("maxLength", ctx_r7.inputDocumentSettings.maxlength);
        core/* ɵɵadvance */.xp6(4);
        core/* ɵɵtextInterpolate1 */.hij(" ", core/* ɵɵpipeBind1 */.lcZ(72, 65, "MAIN_CONTENT.BOX_LOGIN.PASSWORD"), "");
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵproperty */.Q6J("hasError", ctx_r7.hasError)("reset", ctx_r7.resetForm)("showPass", ctx_r7.showingPassObs);
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("fxLayoutAlign", ctx_r7.isMobile ? "end center" : "space-between center");
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r7.showingPass);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", !ctx_r7.showingPass);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", !ctx_r7.isMobile);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", !ctx_r7.isMobile);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r7.showingKeyboard);
        core/* ɵɵadvance */.xp6(4);
        core/* ɵɵclassMap */.Tol(ctx_r7.mdCheckboxClass);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵtextInterpolate1 */.hij(" ", core/* ɵɵpipeBind1 */.lcZ(88, 67, "MAIN_CONTENT.BOX_LOGIN.REMEMBER_USER"), " ");
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵproperty */.Q6J("ngIf", !ctx_r7.submiting);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r7.submiting);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r7.externalLinks.password.enable);
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r7.externalLinks.support.enable || ctx_r7.externalLinks.map.enable);
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r7.externalLinks.register.enable || ctx_r7.externalLinks.info.enable || ctx_r7.externalLinks.demo.enable);
    }
}
function HomeMainComponent_div_0_ng_container_16_a_8_Template(rf, ctx) {
    if (rf & 1) {
        var _r71 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "a", 134);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_16_a_8_Template_a_click_0_listener() { core/* ɵɵrestoreView */.CHM(_r71); var ctx_r70 = core/* ɵɵnextContext */.oxw(3); return ctx_r70.passwordProblem = false; });
        core/* ɵɵtext */._uU(1);
        core/* ɵɵpipe */.ALo(2, "translate");
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵtextInterpolate1 */.hij(" \u2190 ", core/* ɵɵpipeBind1 */.lcZ(2, 1, "MAIN_CONTENT.COMMON.RETURN"), " ");
    }
}
function HomeMainComponent_div_0_ng_container_16_div_43_div_1_Template(rf, ctx) {
    if (rf & 1) {
        var _r75 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "div", 100);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_16_div_43_div_1_Template_div_click_0_listener() { core/* ɵɵrestoreView */.CHM(_r75); var ctx_r74 = core/* ɵɵnextContext */.oxw(4); return ctx_r74.gotoPage("support"); });
        core/* ɵɵelement */._UZ(1, "em", 101);
        core/* ɵɵelementStart */.TgZ(2, "a");
        core/* ɵɵtext */._uU(3);
        core/* ɵɵpipe */.ALo(4, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(4, 1, "MAIN_CONTENT.COMMON.CUSTOMER_SUPPORT"));
    }
}
function HomeMainComponent_div_0_ng_container_16_div_43_div_2_Template(rf, ctx) {
    if (rf & 1) {
        var _r77 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementStart */.TgZ(0, "div", 102);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_16_div_43_div_2_Template_div_click_0_listener() { core/* ɵɵrestoreView */.CHM(_r77); var ctx_r76 = core/* ɵɵnextContext */.oxw(4); return ctx_r76.gotoPage("map"); });
        core/* ɵɵelement */._UZ(1, "em", 103);
        core/* ɵɵelementStart */.TgZ(2, "a");
        core/* ɵɵtext */._uU(3);
        core/* ɵɵpipe */.ALo(4, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(4, 1, "MAIN_CONTENT.COMMON.OFFICES_ATMS"));
    }
}
function HomeMainComponent_div_0_ng_container_16_div_43_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelementStart */.TgZ(0, "div", 135);
        core/* ɵɵtemplate */.YNc(1, HomeMainComponent_div_0_ng_container_16_div_43_div_1_Template, 5, 3, "div", 98);
        core/* ɵɵtemplate */.YNc(2, HomeMainComponent_div_0_ng_container_16_div_43_div_2_Template, 5, 3, "div", 99);
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        var ctx_r69 = core/* ɵɵnextContext */.oxw(3);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r69.externalLinks.support.enable);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r69.externalLinks.map.enable);
    }
}
function HomeMainComponent_div_0_ng_container_16_Template(rf, ctx) {
    if (rf & 1) {
        var _r79 = core/* ɵɵgetCurrentView */.EpF();
        core/* ɵɵelementContainerStart */.ynx(0);
        core/* ɵɵelementStart */.TgZ(1, "div", 111);
        core/* ɵɵelementStart */.TgZ(2, "div", 112);
        core/* ɵɵelementStart */.TgZ(3, "div", 113);
        core/* ɵɵelementStart */.TgZ(4, "div", 114);
        core/* ɵɵelementStart */.TgZ(5, "h1", 115);
        core/* ɵɵtext */._uU(6);
        core/* ɵɵpipe */.ALo(7, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵtemplate */.YNc(8, HomeMainComponent_div_0_ng_container_16_a_8_Template, 3, 3, "a", 116);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(9, "div", 117);
        core/* ɵɵelementStart */.TgZ(10, "div", 118);
        core/* ɵɵelementStart */.TgZ(11, "div", 119);
        core/* ɵɵelementStart */.TgZ(12, "div", 120);
        core/* ɵɵelement */._UZ(13, "em", 121);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(14, "div", 122);
        core/* ɵɵelementStart */.TgZ(15, "h2", 123);
        core/* ɵɵtext */._uU(16);
        core/* ɵɵpipe */.ALo(17, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(18, "p", 123);
        core/* ɵɵtext */._uU(19);
        core/* ɵɵpipe */.ALo(20, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(21, "div", 124);
        core/* ɵɵelementStart */.TgZ(22, "div", 125);
        core/* ɵɵelementStart */.TgZ(23, "button", 126);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_16_Template_button_click_23_listener() { core/* ɵɵrestoreView */.CHM(_r79); var ctx_r78 = core/* ɵɵnextContext */.oxw(2); return ctx_r78.problemPassword(); });
        core/* ɵɵtext */._uU(24);
        core/* ɵɵpipe */.ALo(25, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(26, "div", 127);
        core/* ɵɵelementStart */.TgZ(27, "div", 128);
        core/* ɵɵelementStart */.TgZ(28, "div", 129);
        core/* ɵɵelement */._UZ(29, "em", 130);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(30, "div");
        core/* ɵɵelementStart */.TgZ(31, "h2", 123);
        core/* ɵɵtext */._uU(32);
        core/* ɵɵpipe */.ALo(33, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(34, "p", 123);
        core/* ɵɵtext */._uU(35);
        core/* ɵɵpipe */.ALo(36, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(37, "div", 131);
        core/* ɵɵelementStart */.TgZ(38, "div", 132);
        core/* ɵɵelementStart */.TgZ(39, "button", 126);
        core/* ɵɵlistener */.NdJ("click", function HomeMainComponent_div_0_ng_container_16_Template_button_click_39_listener() { core/* ɵɵrestoreView */.CHM(_r79); var ctx_r80 = core/* ɵɵnextContext */.oxw(2); return ctx_r80.gotoPage("register"); });
        core/* ɵɵtext */._uU(40);
        core/* ɵɵpipe */.ALo(41, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(42, "div", 76);
        core/* ɵɵtemplate */.YNc(43, HomeMainComponent_div_0_ng_container_16_div_43_Template, 3, 2, "div", 133);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementContainerEnd */.BQk();
    }
    if (rf & 2) {
        var ctx_r8 = core/* ɵɵnextContext */.oxw(2);
        core/* ɵɵadvance */.xp6(6);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(7, 9, "MAIN_CONTENT.PASSWORD_PROBLEM.TITLE"));
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r8.externalLinks.back.enable);
        core/* ɵɵadvance */.xp6(8);
        core/* ɵɵtextInterpolate1 */.hij(" ", core/* ɵɵpipeBind1 */.lcZ(17, 11, "MAIN_CONTENT.PASSWORD_PROBLEM.PROBLEM_CONTAINER.FORGOTTEN_PASS_TITLE"), " ");
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate1 */.hij("", core/* ɵɵpipeBind1 */.lcZ(20, 13, "MAIN_CONTENT.PASSWORD_PROBLEM.PROBLEM_CONTAINER.FORGOTTEN_PASS_TEXT"), " ");
        core/* ɵɵadvance */.xp6(5);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(25, 15, "MAIN_CONTENT.PASSWORD_PROBLEM.PROBLEM_CONTAINER.FORGOTTEN_PASS_LINK"));
        core/* ɵɵadvance */.xp6(8);
        core/* ɵɵtextInterpolate1 */.hij("", core/* ɵɵpipeBind1 */.lcZ(33, 17, "MAIN_CONTENT.PASSWORD_PROBLEM.PROBLEM_CONTAINER.RECOVER_PASS_TITLE"), " ");
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate1 */.hij("", core/* ɵɵpipeBind1 */.lcZ(36, 19, "MAIN_CONTENT.PASSWORD_PROBLEM.PROBLEM_CONTAINER.RECOVER_PASS_TEXT"), " ");
        core/* ɵɵadvance */.xp6(5);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(41, 21, "MAIN_CONTENT.PASSWORD_PROBLEM.PROBLEM_CONTAINER.RECOVER_PASS_LINK"));
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r8.externalLinks.support.enable || ctx_r8.externalLinks.map.enable);
    }
}
function HomeMainComponent_div_0_div_17_div_1_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelementStart */.TgZ(0, "div", 141);
        core/* ɵɵelement */._UZ(1, "app-loading", 142);
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("independent", true);
    }
}
function HomeMainComponent_div_0_div_17_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelementStart */.TgZ(0, "div", 136);
        core/* ɵɵtemplate */.YNc(1, HomeMainComponent_div_0_div_17_div_1_Template, 2, 1, "div", 137);
        core/* ɵɵelementStart */.TgZ(2, "div", 138);
        core/* ɵɵelement */._UZ(3, "iframe", 139, 140);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        var ctx_r9 = core/* ɵɵnextContext */.oxw(2);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r9.iframeLoading);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("hidden", ctx_r9.iframeLoading);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("src", ctx_r9.iframeUrl, core/* ɵɵsanitizeResourceUrl */.uOi);
    }
}
var _c4 = function (a0) { return { "responsiveSpace": a0 }; };
function HomeMainComponent_div_0_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelementStart */.TgZ(0, "div", 2);
        core/* ɵɵtemplate */.YNc(1, HomeMainComponent_div_0_div_1_Template, 12, 6, "div", 3);
        core/* ɵɵelementStart */.TgZ(2, "div", 4);
        core/* ɵɵelementStart */.TgZ(3, "div", 5);
        core/* ɵɵtemplate */.YNc(4, HomeMainComponent_div_0_em_4_Template, 2, 3, "em", 6);
        core/* ɵɵpipe */.ALo(5, "translate");
        core/* ɵɵtemplate */.YNc(6, HomeMainComponent_div_0_img_6_Template, 1, 0, "img", 7);
        core/* ɵɵpipe */.ALo(7, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(8, "div", 8);
        core/* ɵɵelementStart */.TgZ(9, "div", 9);
        core/* ɵɵtemplate */.YNc(10, HomeMainComponent_div_0_em_10_Template, 2, 3, "em", 6);
        core/* ɵɵpipe */.ALo(11, "translate");
        core/* ɵɵtemplate */.YNc(12, HomeMainComponent_div_0_img_12_Template, 1, 0, "img", 7);
        core/* ɵɵpipe */.ALo(13, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(14, "div", 10);
        core/* ɵɵtemplate */.YNc(15, HomeMainComponent_div_0_ng_container_15_Template, 97, 77, "ng-container", 11);
        core/* ɵɵtemplate */.YNc(16, HomeMainComponent_div_0_ng_container_16_Template, 44, 23, "ng-container", 11);
        core/* ɵɵtemplate */.YNc(17, HomeMainComponent_div_0_div_17_Template, 5, 3, "div", 12);
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        var ctx_r0 = core/* ɵɵnextContext */.oxw();
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r0.isMobile);
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵproperty */.Q6J("ngIf", core/* ɵɵpipeBind1 */.lcZ(5, 9, "LOGO") != "i-logo-spb");
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("ngIf", core/* ɵɵpipeBind1 */.lcZ(7, 11, "LOGO") == "i-logo-spb");
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("ngClass", core/* ɵɵpureFunction1 */.VKq(17, _c4, ctx_r0.isMobile));
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("ngIf", core/* ɵɵpipeBind1 */.lcZ(11, 13, "LOGO") != "i-logo-spb");
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("ngIf", core/* ɵɵpipeBind1 */.lcZ(13, 15, "LOGO") == "i-logo-spb");
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵproperty */.Q6J("ngIf", !ctx_r0.passwordProblem && !ctx_r0.keyGenerationComponent);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r0.passwordProblem && !ctx_r0.keyGenerationComponent);
        core/* ɵɵadvance */.xp6(1);
        core/* ɵɵproperty */.Q6J("ngIf", ctx_r0.keyGenerationComponent);
    }
}
function HomeMainComponent_div_1_em_4_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelement */._UZ(0, "em", 19);
        core/* ɵɵpipe */.ALo(1, "translate");
    }
    if (rf & 2) {
        core/* ɵɵproperty */.Q6J("ngClass", core/* ɵɵpipeBind1 */.lcZ(1, 1, "LOGO"));
    }
}
function HomeMainComponent_div_1_img_6_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelement */._UZ(0, "img", 20);
    }
}
function HomeMainComponent_div_1_em_10_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelement */._UZ(0, "em", 19);
        core/* ɵɵpipe */.ALo(1, "translate");
    }
    if (rf & 2) {
        core/* ɵɵproperty */.Q6J("ngClass", core/* ɵɵpipeBind1 */.lcZ(1, 1, "LOGO"));
    }
}
function HomeMainComponent_div_1_img_12_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelement */._UZ(0, "img", 20);
    }
}
function HomeMainComponent_div_1_Template(rf, ctx) {
    if (rf & 1) {
        core/* ɵɵelementStart */.TgZ(0, "div", 143);
        core/* ɵɵelementStart */.TgZ(1, "div", 144);
        core/* ɵɵelementStart */.TgZ(2, "div", 4);
        core/* ɵɵelementStart */.TgZ(3, "div", 5);
        core/* ɵɵtemplate */.YNc(4, HomeMainComponent_div_1_em_4_Template, 2, 3, "em", 6);
        core/* ɵɵpipe */.ALo(5, "translate");
        core/* ɵɵtemplate */.YNc(6, HomeMainComponent_div_1_img_6_Template, 1, 0, "img", 7);
        core/* ɵɵpipe */.ALo(7, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(8, "div", 8);
        core/* ɵɵelementStart */.TgZ(9, "div", 9);
        core/* ɵɵtemplate */.YNc(10, HomeMainComponent_div_1_em_10_Template, 2, 3, "em", 6);
        core/* ɵɵpipe */.ALo(11, "translate");
        core/* ɵɵtemplate */.YNc(12, HomeMainComponent_div_1_img_12_Template, 1, 0, "img", 7);
        core/* ɵɵpipe */.ALo(13, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(14, "div", 145);
        core/* ɵɵelementStart */.TgZ(15, "h1", 146);
        core/* ɵɵtext */._uU(16);
        core/* ɵɵpipe */.ALo(17, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(18, "h1", 147);
        core/* ɵɵtext */._uU(19);
        core/* ɵɵpipe */.ALo(20, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(21, "h3", 148);
        core/* ɵɵtext */._uU(22);
        core/* ɵɵpipe */.ALo(23, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(24, "h3", 149);
        core/* ɵɵtext */._uU(25);
        core/* ɵɵpipe */.ALo(26, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(27, "h2", 150);
        core/* ɵɵtext */._uU(28);
        core/* ɵɵpipe */.ALo(29, "translate");
        core/* ɵɵelementStart */.TgZ(30, "b");
        core/* ɵɵtext */._uU(31);
        core/* ɵɵpipe */.ALo(32, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵtext */._uU(33);
        core/* ɵɵpipe */.ALo(34, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(35, "div", 151);
        core/* ɵɵelementStart */.TgZ(36, "div", 152);
        core/* ɵɵelement */._UZ(37, "img", 153);
        core/* ɵɵelementStart */.TgZ(38, "h2", 154);
        core/* ɵɵtext */._uU(39);
        core/* ɵɵpipe */.ALo(40, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(41, "div", 152);
        core/* ɵɵelement */._UZ(42, "img", 155);
        core/* ɵɵelementStart */.TgZ(43, "h2", 154);
        core/* ɵɵtext */._uU(44);
        core/* ɵɵpipe */.ALo(45, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementStart */.TgZ(46, "div", 152);
        core/* ɵɵelement */._UZ(47, "img", 156);
        core/* ɵɵelementStart */.TgZ(48, "h2", 154);
        core/* ɵɵtext */._uU(49);
        core/* ɵɵpipe */.ALo(50, "translate");
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
        core/* ɵɵelementEnd */.qZA();
    }
    if (rf & 2) {
        var ctx_r1 = core/* ɵɵnextContext */.oxw();
        core/* ɵɵadvance */.xp6(4);
        core/* ɵɵproperty */.Q6J("ngIf", core/* ɵɵpipeBind1 */.lcZ(5, 15, "LOGO") != "i-logo-spb");
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("ngIf", core/* ɵɵpipeBind1 */.lcZ(7, 17, "LOGO") == "i-logo-spb");
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("ngClass", core/* ɵɵpureFunction1 */.VKq(43, _c4, ctx_r1.isMobile));
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("ngIf", core/* ɵɵpipeBind1 */.lcZ(11, 19, "LOGO") != "i-logo-spb");
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵproperty */.Q6J("ngIf", core/* ɵɵpipeBind1 */.lcZ(13, 21, "LOGO") == "i-logo-spb");
        core/* ɵɵadvance */.xp6(4);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(17, 23, "OBS_2.TITLE"));
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(20, 25, "OBS_2.TITLE2"));
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(23, 27, "OBS_2.TEXT1"));
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(26, 29, "OBS_2.TEXT2"));
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(29, 31, "OBS_2.TEXT3"));
        core/* ɵɵadvance */.xp6(3);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(32, 33, "OBS_2.TEXT4"));
        core/* ɵɵadvance */.xp6(2);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(34, 35, "OBS_2.TEXT5"));
        core/* ɵɵadvance */.xp6(6);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(40, 37, "OBS_2.NAVTEXT1"));
        core/* ɵɵadvance */.xp6(5);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(45, 39, "OBS_2.NAVTEXT2"));
        core/* ɵɵadvance */.xp6(5);
        core/* ɵɵtextInterpolate */.Oqu(core/* ɵɵpipeBind1 */.lcZ(50, 41, "OBS_2.NAVTEXT3"));
    }
}
function initCustomIframe(iframeID, height, iframeTag) {
    if (iframeID === void 0) {
        iframeID = '#keygenIframe';
    }
    if (height === void 0) {
        height = 300;
    }
    if (iframeTag === void 0) {
        iframeTag = 'bodyOffset';
    }
    return Promise.resolve(setTimeout(function () {
        window.iFrameResize({
            log: false,
            checkOrigin: false,
            iframeResizerEnable: true,
            autoResize: true,
            minHeight: height,
            heightCalculationMethod: iframeTag,
            resizedCallback: function (info) {
                // US-11194   window.scrollTo(0, 0);
            },
        }, iframeID);
    }, 500));
}
var HomeMainComponent = /** @class */ /*@__PURE__*/ (function () {
    function HomeMainComponent(error, formB, form, login, cookies, communication, dsConfig, renderer, material, tealiumService, http, sanitizer) {
        this.error = error;
        this.formB = formB;
        this.form = form;
        this.login = login;
        this.cookies = cookies;
        this.communication = communication;
        this.dsConfig = dsConfig;
        this.renderer = renderer;
        this.material = material;
        this.tealiumService = tealiumService;
        this.http = http;
        this.sanitizer = sanitizer;
        // tslint:disable:no-string-literal
        this.hasError = false;
        this.resetForm = false;
        this.numDoc = 'Nº de documento'; // Definimos placeholder por defecto
        this.regexInput = regExPatterns.SPANISH_ALFANUMERIC; // Expresión regular alfanumérico en español
        this.submiting = false;
        this.showingPass = false;
        this.showingPassObs = new Subject/* Subject */.xQ();
        this.showingKeyboard = false;
        this.subscriptions = [];
        this.documentType = 'N'; // Tipo de documento. Por defecto: NIF
        this.isIe11 = false; // ie11 default false
        this.initRememberMe = false; // Por defecto, no se recuerda al usuario
        this.virtualPass = ''; // Valor campo contraseña. Por defecto: vacía
        this.maxPassLength = constants/* Constants.formModel.maxlength.password */.gT.formModel.maxlength.password; // Valor de la longitud máxima permitida para el password
        this.minPassLength = constants/* Constants.formModel.minLength.password */.gT.formModel.minLength.password; // Valor de la longitud mínima permitida para el password
        // Definición de la longitud máxima del campo del documento, en función del tipo seleccionado
        this.maxlengths = {
            N: constants/* Constants.formModel.maxlength.N */.gT.formModel.maxlength.N,
            S: constants/* Constants.formModel.maxlength.S */.gT.formModel.maxlength.S,
            C: constants/* Constants.formModel.maxlength.C */.gT.formModel.maxlength.C,
            I: constants/* Constants.formModel.maxlength.I */.gT.formModel.maxlength.I,
            U: constants/* Constants.formModel.maxlength.U */.gT.formModel.maxlength.U
        };
        // Definición de la longitud máxima y mínima del campo del documento, en función del tipo seleccionado
        this.inputDocumentSettings = {
            minlength: constants/* Constants.formModel.minLength.input */.gT.formModel.minLength.input,
            maxlength: this.maxlengths.N,
            inputPlaceholder: this.numDoc
        };
        this.passwordProblem = false;
        this.keyGenerationComponent = false;
        /**
         * @description propiedad que contiene true para mostrar el warning de que la clave está bloqueada.
         * @default false
         * @type {boolean}
         * @memberof HomeMainComponent
         */
        this.showLoginBlocked = false;
        this.mdCheckboxClass = '';
        this.segment = 'ret';
        this.iframeLoading = false;
        this.retries = 0;
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dsConfig.get().service.cmc + '/nhb-keygeneration/');
        // ie11 detector
        this.init();
    }
    Object.defineProperty(HomeMainComponent.prototype, "iframe", {
        set: function (iframe) {
            if (iframe) {
                this.listenRender(iframe);
            }
        },
        enumerable: false,
        configurable: true
    });
    ;
    HomeMainComponent.prototype.init = function () {
        var _this = this;
        this.totalRetries = this.dsConfig.get().auth.retries ? this.dsConfig.get().auth.retries : 0;
        this.subscriptions.push(this.form.getForm().subscribe(function (val) {
            _this.hBform = val;
            if (_this.hBform.already) {
                _this.already = _this.hBform.already;
                _this.userName = _this.hBform.name;
                _this.documentType = _this.hBform.doc_type;
                _this.loginType = _this.hBform.login_type ? _this.hBform.login_type : null;
            }
            else {
                if (typeof _this.hBform.password === 'string') {
                    _this.virtualPass = _this.hBform.password;
                }
                else {
                    return;
                }
            }
        }));
    };
    /**
     * @description A lifecycle hook that is called after Angular has initialized all the data-bound properties of a directive.
     */
    HomeMainComponent.prototype.ngOnInit = function () {
        this.isWrongBrowser = window['mustRedirect'];
        this.isMobile = this.communication.isMobile();
        this.isTablet = this.communication.isTablet();
        this.externalLinks = this.dsConfig.get().external_links;
        this.initForm();
        if (this.isIe11) {
            var tealiumPage = {
                page_name: '/warning/IE',
                page_title: 'Warning IE',
                page_type: 'aviso'
            };
            this.tealiumService.trackEvent('evShowView', tealiumPage);
        }
    };
    HomeMainComponent.prototype.ngAfterViewInit = function () {
        this.initViewChild();
    };
    /**
     * @description Método para iniciar la vista
     */
    HomeMainComponent.prototype.initViewChild = function () {
        var _this = this;
        if (!this.userName) {
            this.matInputNumber = this.validationNumber['_results'][0]._elementRef;
            this.renderer.listen(this.matInputNumber.nativeElement, 'keyup', function (event) {
                var kCd = event.keyCode || event.which;
                if (kCd === 13) {
                    return;
                }
                else {
                    _this.clearWarnings();
                }
            });
        }
        if (this.already) {
            this.passInputs.first.inputsPass['_results'][0].nativeElement.focus();
        }
        this.initCustomSelect();
    };
    /**
     * @description Método para iniciar el formulario
     */
    HomeMainComponent.prototype.initForm = function () {
        this.loginForm = this.formB.group({
            document: [this.documentType, [fesm2015_forms/* Validators.required */.kI.required]],
            number: ['', [fesm2015_forms/* Validators.required */.kI.required]],
            rememberMe: [this.initRememberMe, []]
        });
        if (this.hBform.already) {
            this.initRememberMe = true;
        }
        this.loginForm.get('rememberMe').setValue(this.initRememberMe);
        this.form.setValue('rememberMe', this.initRememberMe);
        this.loginForm.updateValueAndValidity();
    };
    /**
     * @description Método para redirigir a la página de descarga de la app móvil, según dispositivo
     */
    HomeMainComponent.prototype.gotoApp = function () {
        var isIOS = constants/* Constants.isIOS */.gT.isIOS();
        if (isIOS) {
            window.open(this.dsConfig.get().service.iosredirect, 'new');
        }
        else {
            window.open(this.dsConfig.get().service.androidredirect, 'new');
        }
    };
    /**
     * @description Método para mostrar mensaje al usuario si pulsa "Problemas con la clave"
     */
    HomeMainComponent.prototype.setProblemPass = function () {
        this.passwordProblem = true;
        this.form.setValue('password', '');
        this.showingPass = false;
        this.showingPassObs.next(false);
        this.showingKeyboard = false;
        this.tealiumService.trackEvent('evSendAction', { category: 'login', action: 'click', label: 'Pulsa problemas clave de acceso' });
        var tealiumPage = {
            page_name: '/bol-particulares/recordar_clave/problemas_clave_inicio',
            page_title: 'Banca Online recordar clave problemas clave inicio',
            page_type: 'detalle',
            product_category: 'recordar_clave'
        };
        tealiumPage['product_scope'] = 'operativa_no_financiera';
        this.tealiumService.trackEvent('evShowView', tealiumPage);
    };
    /**
     * @description Método para controlar cuando el usuario cambia el tipo de documento a introducir
     */
    HomeMainComponent.prototype.changeDocumentType = function (event) {
        var _this = this;
        this.clearWarnings();
        this.resetForm = true;
        this.loginForm.get('number').setValue('');
        this.loginForm.updateValueAndValidity();
        this.hBform.doc_type = event;
        this.inputDocumentSettings.maxlength = this.maxlengths[event];
        if (event === 'U') {
            this.loginType = event;
            this.inputDocumentSettings.inputPlaceholder = 'Usuario';
            this.form.setValue('login_type', 'user');
        }
        else {
            this.loginType = null;
            this.inputDocumentSettings.inputPlaceholder = this.numDoc;
            this.form.setValue('login_type', null);
            if (event === 'N') {
                this.tealiumService.trackEvent('evSendAction', { category: 'login', action: 'click', label: 'Pulsa acceso con DNI electrónico' });
            }
            else {
                return;
            }
        }
        setTimeout(function () {
            _this.resetForm = false;
        }, 500);
    };
    /**
     * @description Método para mostrar mensaje de error en el login
     */
    HomeMainComponent.prototype.setLoginError = function (msg) {
        var _this = this;
        this.resetForm = true;
        this.error.addToastWarning('login', msg);
        this.submiting = false;
        setTimeout(function () {
            _this.resetForm = false;
        }, 500);
    };
    /**
     * @description Método para indicar si el usuario quiere o no quiere que se recuerde los datos
     */
    HomeMainComponent.prototype.rememberMe = function (event) {
        this.initRememberMe = event.checked;
        if (event.checked) {
            this.mdCheckboxClass = 'md-checked';
            var obj = { page_name: 'login', event_type: 'login', event_target: 'click', event_label: 'recordar_usuario' };
            this.tealiumService.trackEvent('click', obj);
        }
        else {
            this.mdCheckboxClass = '';
        }
        this.form.setValue('rememberMe', event.checked);
    };
    /**
     * @description Método para quitar los avisos en pantalla
     */
    HomeMainComponent.prototype.clearWarnings = function () {
        this.showLoginBlocked = false;
        this.error.removeAllWarning();
        if (this.matInputNumber) {
            this.matInputNumber.nativeElement.classList.remove('invalid');
        }
        else {
            return;
        }
    };
    /**
     * @description Método para controlar el documento introducido por el usuario
     */
    HomeMainComponent.prototype.checkDocuKeyPress = function (e) {
        var kCd = e.keyCode || e.which;
        if (kCd !== 13) {
            if (this.checkKCDisNumber(kCd)) {
                if (this.hBform.login_type !== 'user') { // GUIÓN BAJO
                    e.preventDefault();
                }
                else {
                    return;
                }
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    };
    /**
     * @description Método para comprobar si el kCd es tecla numética
     */
    HomeMainComponent.prototype.checkKCDisNumber = function (kCd) {
        if ((kCd > 8 && kCd < 48)
            || (kCd > 0 && kCd < 8)
            || (kCd > 57 && kCd < 65)
            || (kCd > 90 && kCd < 97)
            || kCd > 122) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @description Método para gestionar el envío de datos
     */
    HomeMainComponent.prototype.submitForm = function () {
        if (!this.submiting) {
            this.submiting = true;
            if (!this.already) {
                this.checkNoAlready();
            }
            if (!this.hBform.rememberMe) {
                this.cookies.set('ALREADY', '', -1);
            }
            var hasPass = (this.hBform.password && this.hBform.password !== '');
            var hasIdNo = (this.hBform.id_no && this.hBform.id_no !== '');
            var validateDocument = this.loginType ? true : this.checkValidateDocument();
            if (hasPass && hasIdNo) {
                this.checkHasPassHasIdNo(validateDocument);
            }
            else {
                this.setInputsError();
            }
        }
        else {
            return;
        }
    };
    HomeMainComponent.prototype.checkNoAlready = function () {
        if (!this.hBform.doc_type) {
            this.form.setValue('doc_type', 'N');
            this.form.setValue('id_no', this.loginForm.controls.number.value);
        }
        else {
            this.form.setValue('doc_type', this.hBform.doc_type);
            this.form.setValue('id_no', this.loginForm.controls.number.value);
        }
    };
    /**
     * @description Método para controlar si los datos introducidos son válidos antes de hacer la llamada al login
     */
    HomeMainComponent.prototype.checkHasPassHasIdNo = function (validateDocument) {
        var validatePass = (this.hBform.password.length >= this.minPassLength && this.hBform.password.length <= this.maxPassLength);
        if (!validateDocument || !validatePass) {
            this.setInputsError();
        }
        else {
            this.clearWarnings();
            this.callLogin();
        }
    };
    /**
     * @description Método para controlar si el documento introducido es válido
     */
    HomeMainComponent.prototype.checkValidateDocument = function () {
        var validateDocument = this.form.validateDocument(this.hBform.doc_type, this.hBform.id_no);
        if (this.matInputNumber) {
            if (!validateDocument) {
                this.matInputNumber.nativeElement.classList.add('invalid');
            }
            else {
                this.matInputNumber.nativeElement.classList.remove('invalid');
            }
        }
        return validateDocument;
    };
    /**
     * @description Método para lanzar y controlar la llamada al login
     */
    HomeMainComponent.prototype.callLogin = function (_retries) {
        var _this = this;
        if (_retries === void 0) {
            _retries = 0;
        }
        this.login.submit(_retries).subscribe(function (res) {
            if (res && !res.error) {
                _this.submiting = false;
                window.top.location.href = res;
            }
            else {
                // En caso de que el error sea el de 'Clave de acceso bloqueada' mostramos el warning de clave de acceso bloqueada.
                if (res.code === 'ERROR_LOGIN_BLOCKED') {
                    _this.setTealiumWarning();
                    _this.submiting = false; // Quitamos el loader del submit
                    _this.resetForm = true; // Reseteamos el formulario
                    _this.showLoginBlocked = true; // Mostramos el componente de warning clave bloqueada.
                }
                else {
                    _this.setLoginError(res.error ? res.error : 'En estos momentos no es posible acceder a su Banca Online.');
                }
            }
        }, function (error) {
            if (error.errorAuth && (_this.retries < _this.totalRetries)) {
                _this.retries++;
                _this.callLogin(_this.retries);
            }
            else {
                _this.http.get('assets/error.png?value='
                    + (error.errorAuth ? error.errorAuth.message : (error.errorLogin ? error.errorLogin.message : error.message))
                    + ' - ' + (error.errorAuth ? error.errorAuth.url : (error.errorLogin ? error.errorLogin.url : error.url))).subscribe(function (x) { return console.log(error); });
                _this.setLoginError('En estos momentos no es posible acceder a su Banca Online.');
                _this.retries = 0;
            }
        });
    };
    HomeMainComponent.prototype.setTealiumWarning = function () {
        var tealiumEvent = {
            category: 'login',
            action: 'warning',
            data: {
                cod_error: 'warning',
                desc_error: '/bol-particulares/login'
            }
        };
        this.tealiumService.trackEvent('evSendAction', tealiumEvent);
    };
    /**
     * @description Método para mostrar aviso de datos no válidos
     */
    HomeMainComponent.prototype.setInputsError = function () {
        this.setLoginError('Ha de introducir un identificador y/o clave válidos.');
    };
    /**
     * @description Método para mostrar la contraseña introducida en pantalla
     */
    HomeMainComponent.prototype.showPass = function () {
        var _this = this;
        this.showingPass = !this.showingPass;
        this.showingPassObs.next(this.showingPass);
        this.passInputs.first.inputsPass.forEach(function (input) {
            if (_this.showingPass) {
                input.nativeElement.classList.add('showing');
            }
            else {
                input.nativeElement.classList.remove('showing');
            }
        });
    };
    /**
     * @description Método para mostrar el teclado virtual en pantalla
     */
    HomeMainComponent.prototype.showKeyBoard = function () {
        this.showingKeyboard = !this.showingKeyboard;
    };
    /**
     * @description Método para gestionar cuando se pulsa tecla en teclado virtual
     */
    HomeMainComponent.prototype.clickKey = function (event) {
        event = event + '';
        var newPass = this.virtualPass;
        var position = 0;
        if (this.virtualPass) {
            position = this.virtualPass.toString().length;
        }
        if (position <= this.maxPassLength) {
            if (event === 'clean') {
                position = this.virtualPass.toString().length - 1;
                if (position < 0) {
                    position = 0;
                }
                this.passInputs.first.inputsPass['_results'][position].nativeElement.value = '';
                newPass = this.virtualPass.slice(0, -1);
            }
            else {
                if (position < this.maxPassLength) {
                    this.passInputs.first.inputsPass['_results'][position].nativeElement.value = event;
                    newPass = this.virtualPass + event;
                }
            }
        }
        if (position === this.maxPassLength) {
            position = this.maxPassLength - 1;
        }
        if (position < this.maxPassLength && position >= 0) {
            this.passInputs.first.inputsPass['_results'][position].nativeElement.focus();
        }
        this.virtualPass = newPass;
        this.form.setValue('password', newPass);
    };
    /**
     * @description Método para gestionar los enlaces a páginas externas
     */
    HomeMainComponent.prototype.gotoPage = function (code, event) {
        if (event === void 0) {
            event = false;
        }
        var url = '';
        var target = '_blank';
        if (this.communication.isIE()) {
            target = 'blank';
        }
        var top = this.externalLinks[code] ? (this.externalLinks[code].top ? this.externalLinks[code].top : false) : false;
        var modal = this.externalLinks[code] ? (this.externalLinks[code].modal ? this.externalLinks[code].modal : false) : false;
        switch (code) {
            case 'bussiness':
                url = this.dsConfig.get().external_links.bussiness.url;
                break;
            case 'back':
                url = this.dsConfig.get().external_links.back.url;
                break;
            case 'password':
                url = this.dsConfig.get().external_links.password.url;
                break;
            case 'support':
                url = this.dsConfig.get().external_links.support.url;
                this.tealiumService.trackEvent('evSendAction', { category: 'login', action: 'click', label: 'Pulsa atención al cliente' });
                break;
            case 'map':
                url = this.dsConfig.get().external_links.map.url;
                this.tealiumService.trackEvent('evSendAction', { category: 'login', action: 'click', label: 'Pulsa localizador de oficina' });
                break;
            case 'demo':
                url = this.dsConfig.get().external_links.demo.url;
                this.tealiumService.trackEvent('evSendAction', { category: 'login', action: 'click', label: 'Pulsa Demo' });
                break;
            case 'register':
                url = this.dsConfig.get().external_links.register.url;
                this.tealiumService.trackEvent('evSendAction', { category: 'login', action: 'click', label: 'Pulsa enlace alta banca online' });
                break;
            case 'info':
                url = this.dsConfig.get().external_links.info.url;
                this.tealiumService.trackEvent('evSendAction', { category: 'login', action: 'click', label: 'Pulsa enlace información seguridad' });
                break;
            default:
                break;
        }
        if (top) {
            window.top.location.href = url;
        }
        else {
            this.checkModal(modal, url, target);
        }
    };
    /**
     * @function goToKeyGeneration
     * @description método que redirige a la pantalla de regeneración de clave.
     * @return {void}
     * @memberof HomeMainComponent
     */
    HomeMainComponent.prototype.goToKeyGeneration = function () {
        this.showLoginBlocked = false;
        this.setProblemPass();
        this.problemPassword();
    };
    /**
     * @description Método para abrir modal o ventana nueva
     */
    HomeMainComponent.prototype.checkModal = function (modal, url, target) {
        if (modal) {
            this.material.openModal({ iframe: url }, iframe_component/* IframeComponent */._);
        }
        else {
            if (this.communication.isOriginWebview()) {
                url = this.communication.prepareWebView(url);
            }
            window.open(url, target);
        }
    };
    /**
     * @description Método para limpiar datos de formuarlio
     */
    HomeMainComponent.prototype.cleanForm = function () {
        this.form.cleanForm();
        this.initRememberMe = false;
        this.cookies.set('ALREADY', '', -1);
        this.already = null;
        this.userName = null;
        this.documentType = 'N';
        this.loginType = null;
        this.inputDocumentSettings.inputPlaceholder = this.numDoc;
        this.resetForm = true;
        this.initForm();
        this.initViewChild();
    };
    HomeMainComponent.prototype.initCustomSelect = function () {
    };
    HomeMainComponent.prototype.clickCustomSelectOption = function (event, value) {
        var element = event.target;
        this.changeDocumentType(value);
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y;
        var i;
        var k;
        var yl;
        var s = element.parentNode.parentNode.getElementsByTagName('select')[0];
        var sl = s.length;
        var h = element.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML.trim() === element.innerHTML.trim()) {
                s.selectedIndex = i;
                h.innerHTML = element.innerHTML;
                y = element.parentNode.getElementsByClassName('same-as-selected');
                yl = y.length;
                for (k = 0; k < yl; k++) {
                    y[k].setAttribute('class', 'item');
                    ;
                }
                element.setAttribute('class', 'same-as-selected');
                break;
            }
        }
        h.click();
    };
    HomeMainComponent.prototype.clickCustomSelect = function (e) {
        var element = e.target;
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        this.closeAllSelect(element);
        element.nextSibling.classList.toggle('select-hide');
    };
    HomeMainComponent.prototype.closeAllSelect = function (elmnt) {
        /* A function that will close all select boxes in the document,
      except the current select box: */
        var i;
        var arrNo = [];
        var x = document.getElementsByClassName('select-items');
        var y = document.getElementsByClassName('select-selected');
        var xl = x.length;
        var yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt === y[i]) {
                arrNo.push(i);
            }
            else {
                y[i].classList.remove('select-arrow-active');
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add('select-hide');
            }
        }
        document.addEventListener('click', this.closeAllSelect);
    };
    /**
     * @description Comprobamos si está activo el flag para mostrar el nuevo
     * componente de recuperación de clave o el viejo
     */
    HomeMainComponent.prototype.problemPassword = function () {
        this.iframeLoading = true;
        if (this.dsConfig.get().keygeneration.newPath) {
            this.keyGenerationComponent = true;
        }
        else {
            this.gotoPage('password');
        }
    };
    /**
     * @description Cargamos la vista del iframe
     */
    HomeMainComponent.prototype.listenRender = function (iframe) {
        var _this = this;
        this.setWindowListener();
        this.renderer.listen(iframe.nativeElement, 'load', function () {
            iframe.nativeElement.style.height = '500px';
            initCustomIframe().then(function () {
                _this.setScrolling(iframe);
            });
        });
    };
    /**
     * @description Inicializamos el listener para los eventos postMessage
     */
    HomeMainComponent.prototype.setWindowListener = function () {
        var _this = this;
        window.onmessage = function (e) {
            switch (e.data) {
                case 'toLogin':
                    _this.passwordProblem = false;
                    _this.keyGenerationComponent = false;
                    break;
                case 'toLoginProblems':
                    _this.passwordProblem = true;
                    _this.keyGenerationComponent = false;
                    var tealiumPage = {
                        page_name: '/bol-particulares/recordar_clave/problemas_clave_inicio',
                        page_title: 'Banca Online recordar clave problemas clave inicio',
                        page_type: 'detalle',
                        product_category: 'recordar_clave'
                    };
                    tealiumPage['product_scope'] = 'operativa_no_financiera';
                    _this.tealiumService.trackEvent('evShowView', tealiumPage);
                    break;
                case 'toLocator':
                    _this.gotoPage('map');
            }
        };
    };
    /**
     * @description Eliminamos scrolling para el iframe
     */
    HomeMainComponent.prototype.setScrolling = function (iframe) {
        var _this = this;
        setTimeout(function () {
            _this.renderer.setProperty(iframe.nativeElement, 'scrolling', 'no');
            _this.iframeLoading = false;
        }, 1000);
    };
    /**
     * @description cierre aviso IE obsoleto
     */
    HomeMainComponent.prototype.toggleIe = function () {
        this.isIe11 = false;
    };
    HomeMainComponent.ɵfac = function HomeMainComponent_Factory(t) { return new (t || HomeMainComponent)(core/* ɵɵdirectiveInject */.Y36(services_module/* ErrorService */.T_), core/* ɵɵdirectiveInject */.Y36(fesm2015_forms/* FormBuilder */.qu), core/* ɵɵdirectiveInject */.Y36(services_module/* FormService */.oL), core/* ɵɵdirectiveInject */.Y36(services_module/* LoginService */.r6), core/* ɵɵdirectiveInject */.Y36(services_module/* CookieService */.N_), core/* ɵɵdirectiveInject */.Y36(services_module/* CommunicationService */.OX), core/* ɵɵdirectiveInject */.Y36(services_module/* DsconfigService */.jB), core/* ɵɵdirectiveInject */.Y36(core/* Renderer2 */.Qsj), core/* ɵɵdirectiveInject */.Y36(material_module/* MaterialModule */.q), core/* ɵɵdirectiveInject */.Y36(services_module/* TealiumService */.u9), core/* ɵɵdirectiveInject */.Y36(http/* HttpClient */.eN), core/* ɵɵdirectiveInject */.Y36(platform_browser/* DomSanitizer */.H7)); };
    HomeMainComponent.ɵcmp = /*@__PURE__*/ core/* ɵɵdefineComponent */.Xpm({ type: HomeMainComponent, selectors: [["app-home-main"]], viewQuery: function HomeMainComponent_Query(rf, ctx) {
            if (rf & 1) {
                core/* ɵɵviewQuery */.Gf(home_main_component_c0, 5);
                core/* ɵɵviewQuery */.Gf(home_main_component_c1, 5);
                core/* ɵɵviewQuery */.Gf(PasswordComponent, 5);
            }
            if (rf & 2) {
                var _t = void 0;
                core/* ɵɵqueryRefresh */.iGM(_t = core/* ɵɵloadQuery */.CRH()) && (ctx.iframe = _t.first);
                core/* ɵɵqueryRefresh */.iGM(_t = core/* ɵɵloadQuery */.CRH()) && (ctx.validationNumber = _t);
                core/* ɵɵqueryRefresh */.iGM(_t = core/* ɵɵloadQuery */.CRH()) && (ctx.passInputs = _t);
            }
        }, inputs: { hasError: "hasError" }, decls: 2, vars: 2, consts: [["class", "bodyContainer", "fxFlex", "100", "fxLayout", "row wrap", "fxLayoutAlign.xs", "center center", "fxLayoutAlign", "end center", "ngClass.md", "responsiveMd", "ngClass.sm", "responsiveSm", "ngClass.xs", "responsiveXs", 4, "ngIf"], ["class", "outdated-ie-container", "ngClass.lt-md", "sm-outdated-ie", "ngClass.lt-sm", "xs-outdated-ie", "fxFlex", "100", "fxLayoutAlign", "center center", 4, "ngIf"], ["fxFlex", "100", "fxLayout", "row wrap", "fxLayoutAlign.xs", "center center", "fxLayoutAlign", "end center", "ngClass.md", "responsiveMd", "ngClass.sm", "responsiveSm", "ngClass.xs", "responsiveXs", 1, "bodyContainer"], ["id", "smartBanner", "fxFlex", "0", "fxFlex.ldmd", "100", "fxLayout", "row wrap", "fxLayoutGap", "10px", "fxLayoutGap.xs", "0px", "fxLayoutAlign", "space-between center", 3, "click", 4, "ngIf"], ["fxFlex", "100", "fxLayout", "row", "fxLayoutAlign", "start start", 1, "contenedorLogo"], ["ngClass.xs", "hiddenpart", "fxLayout", "row", "fxFlex", "288px", "fxLayoutAlign", "center start", "ngClass.md", "responsiveMd", "ngClass.sm", "responsiveSm", 1, "logo"], [3, "ngClass", 4, "ngIf"], ["src", "assets/image/img-logo-spb.png", "alt", "", 4, "ngIf"], ["ngClass.gt-xs", "hiddenpart", "fxFlex", "100", "fxLayoutAlign", "center center", 1, "logo-responsive", 3, "ngClass"], ["fxFlex", "auto", "fxFlex.xs", "auto", "fxLayoutAlign", "center center", 1, "home-item-icon"], ["fxLayout", "row", "fxFlex", "100", "fxLayoutAlign", "end start", "fxLayoutAlign.sm", "end start", "ngClass.md", "responsiveMd", "ngClass.sm", "responsiveSm", "ngClass.xs", "responsiveXs", 1, "contentRight", "ie-solution"], [4, "ngIf"], ["class", "box-content key-generation", "ngClass.sm", "responsiveSm", "fxFlex", "408px", "fxFlex.xs", "calc(100% - 30px)", 4, "ngIf"], ["id", "smartBanner", "fxFlex", "0", "fxFlex.ldmd", "100", "fxLayout", "row wrap", "fxLayoutGap", "10px", "fxLayoutGap.xs", "0px", "fxLayoutAlign", "space-between center", 3, "click"], ["fxFlex", "10", "fxFlex.xs", "15", "fxLayout", "row", 1, "imgBanner"], ["alt", "Santander App", "src", "assets/image/smarbannerimg.png", 1, "imgref"], ["fxFlex", "80", "fxFlex.xs", "74", "fxLayout", "column", "fxLayoutAlign", "center start", 1, "textContainer"], ["fxFlex", "5", "fxFlex.xs", "1", "fxLayout", "row", "fxLayoutAlign", "center end", 1, "xContainer", 3, "click"], ["id", "closeX"], [3, "ngClass"], ["src", "assets/image/img-logo-spb.png", "alt", ""], ["ngClass.sm", "responsiveSm", "fxFlex", "408px", "fxFlex.xs", "calc(100% - 30px)", 1, "box-content"], ["fxFlex", "100", 1, "boxLogin"], ["fxFlex", "100", "fxlayoutAlign", "start start", 1, "links"], ["id", "linkPrivate", "fxFlex", "0 0 auto", 1, "link", "active", 3, "ngClass"], ["id", "linkBussines", "fxFlex", "0 0 auto", 1, "link", 3, "ngClass", "click"], ["id", "returnLink", "class", "link-back pointer", "fxFlex", "100", 3, "click", 4, "ngIf"], ["fxFlex", "100", 1, "hello-user", "align-left", 3, "hidden"], ["fxFlex", "100", 1, "bienvenida-usuario", "align-left", 3, "hidden"], ["fxFlex", "100", 1, "not-you", 3, "hidden", "click"], [1, "i-arrow"], ["fxFlex", "100", "fxLayout", "row", "fxLayoutAlign.xs", "center center", 1, "data"], ["fxFlex", "100", "fxLayout", "row wrap", "fxLayoutAlign", "space-between center", "fxLayoutAlign.ldsm", "center center", 3, "formGroup"], ["fxLayout", "row", "fxFlex", "100", "fxFlex.xs", "100", 3, "name"], [3, "eventHere", 4, "ngIf"], ["ngClass.xs", "mobile-divider", "fxLayout", "row", "fxFlex", "44", "fxFlex.ldmd", "55", "fxFlex.xs", "100", 1, "selectDocument", "divider", 3, "ngClass", "hidden"], ["fxFlex", "100", "placeholder", "Documento", 1, "mat-form-field", "has-placeholder", "mat-form-field-document"], ["fxFlex", "100", 1, "placeholder"], [1, "select-container", "custom-select"], ["for", "selDocument", "hidden", ""], ["id", "selDocument", "name", "document"], ["id", "optN", "fxFlex", "100", "value", "N", 1, "item"], ["id", "optS", "fxFlex", "100", "value", "S", 1, "item"], ["id", "optC", "fxFlex", "100", "value", "C", 1, "item"], ["id", "optI", "fxFlex", "100", "value", "I", 1, "item"], ["id", "optNU", "fxFlex", "100", "value", "U", 1, "item"], [1, "select-selected", 3, "click"], ["ngClass.xs", "select-mobile-items", 1, "select-items", "select-hide"], ["fxFlex", "100", 1, "same-as-selected", 3, "click"], ["fxFlex", "100", 1, "item", 3, "click"], ["fxFlex", "100", 1, "arrow-container"], ["fxLayout", "row", "fxFlex", "54", "fxFlex.ldmd", "100", "fxFlex.xs", "100", 1, "document", "validation", 3, "ngClass", "hidden"], [1, "has_placeholder"], ["validationNumber", ""], ["id", "inputDocuNumber", "matInput", "", "name", "number", "formControlName", "number", 1, "docu-number", 3, "placeholder", "minLength", "maxLength", "keypress"], ["fxLayout", "row", "fxFlex", "100", 1, "clave"], ["fxFlex", "100", "fxLayout", "row wrap", "fxLayoutAlign", "space-between center", "fxLayoutGap", "5px", "placeholder", "Clave de acceso", 1, "clave-container", "md-block", "has_placeholder"], ["fxFlex", "60", "fxLayout", "row", 1, "placeholder"], ["fxFlex", "73", "fxLayout", "row", 1, "pass-container"], ["fxFlex", "100", "fxLayout", "row", 3, "hasError", "reset", "showPass", "submited"], ["fxFlex", "20", "fxLayout", "row wrap", "fxLayoutAlign", "end center", 1, "pass-icons"], ["fxFlex", "100", "fxLayout", "row", 3, "fxLayoutAlign"], ["fxFlex", "32px", 1, "eyeWrapper", 3, "click"], ["class", "o-san-cross-eye", 4, "ngIf"], ["class", "o-san-eye", 4, "ngIf"], ["fxFlex", "1px", "class", "iconsSeparator", 4, "ngIf"], ["fxFlex", "32px", "class", "keyboardWrapper", 3, "click", 4, "ngIf"], ["class", "virtualKeyboard ", 4, "ngIf"], ["fxFlex", "100", "fxLayout", "row wrap", "fxLayoutAlign", "space-between start", 1, "loginBlock"], ["fxLayout", "row", "fxFlex", "40", "fxLayoutAlign", "start center", 1, "middle", "check-user"], ["formControlName", "rememberMe", "name", "rememberMe", 1, "mat-checkbox", 3, "change"], ["data-tagisban", "{\"idc\":\"login\",\"type\":md-checkbox\", \"title\":\"recordar_usuario\"}"], ["fxLayout", "row", "fxFlex", "55", "fxLayoutAlign", "end center", 1, "middle", "bot-ent"], ["name", "Entrar", "class", "mat-button hbs-button", 3, "click", 4, "ngIf"], ["class", "mat-button hbs-button not-hovered", 4, "ngIf"], ["class", "link-claves", 3, "click", 4, "ngIf"], ["fxFlex", "100", "fxLayout", "row wrap", "fxLayoutWrap", "", "ngClass.md", "responsiveMd", 1, "boxInfo"], ["class", "helpBox text-shadow align-center", "fxFlex", "100", "fxLayout", "row", "sfxLayoutAlign", "start center", 4, "ngIf"], ["fxFlex", "100", "fxLayout", "row", 1, "separatorBar"], ["class", "helpList", "fxFlex", "100", "fxLayout", "row", 4, "ngIf"], ["id", "returnLink", "fxFlex", "100", 1, "link-back", "pointer", 3, "click"], [3, "eventHere"], [1, "o-san-cross-eye"], [1, "o-san-eye"], ["fxFlex", "1px", 1, "iconsSeparator"], ["fxFlex", "32px", 1, "keyboardWrapper", 3, "click"], ["class", "o-san-keyboard", 4, "ngIf"], ["class", "o-san-keyboardhide", 4, "ngIf"], [1, "o-san-keyboard"], [1, "o-san-keyboardhide"], [1, "virtualKeyboard"], [3, "clickKey"], ["name", "Entrar", 1, "mat-button", "hbs-button", 3, "click"], [1, "mat-button", "hbs-button", "not-hovered"], [3, "independent"], [1, "link-claves", 3, "click"], [1, "link-problem"], ["fxFlex", "100", "fxLayout", "row", "sfxLayoutAlign", "start center", 1, "helpBox", "text-shadow", "align-center"], ["class", "help-box pointer", "fxFlex", "50", "fxLayout", "row", "fxLayoutAlign", "start center", 3, "click", 4, "ngIf"], ["class", "help-localiza pointer", "fxFlex", "50", "fxLayout", "row", "fxLayoutAlign", "start center", 3, "click", 4, "ngIf"], ["fxFlex", "50", "fxLayout", "row", "fxLayoutAlign", "start center", 1, "help-box", "pointer", 3, "click"], [1, "o-san-headset"], ["fxFlex", "50", "fxLayout", "row", "fxLayoutAlign", "start center", 1, "help-localiza", "pointer", 3, "click"], [1, "o-san-localizador"], ["fxFlex", "100", "fxLayout", "row", 1, "helpList"], ["fxFlex", "100", "fxLayout", "row", 1, "lista"], ["fxFlex", "0 0 100%", "fxLayout", "row wrap", "fxLayoutAlign", "start start"], ["fxLayout", "row", "fxLayoutAlign", "start start", "fxFlex", "0 0 50%", "class", "listado", 3, "click", 4, "ngIf"], ["fxLayout", "row", "fxLayoutAlign", "start start", "fxFlex", "0 0 50%", 1, "listado", 3, "click"], ["fxFlex", "4px", "fxLayoutAlign", "start start", 1, "ball"], ["fxFlex", "4px", 1, "ball"], ["ngClass.sm", "responsiveSm", "fxFlex", "406px", "fxFlex.xs", "calc(100% - 30px)", 1, "box-content"], ["fxFlex", "100", 1, "boxLogin", "problemasClaves"], ["fxFlex", "100", 1, "links"], ["fxFlex", "80", "fxFlex.xs", "70", 1, "problemas", "align-left"], [1, "problem"], ["class", "link-back pointer", "fxFlex", "20", "fxFlex.xs", "30", 3, "click", 4, "ngIf"], ["ngClass.xs", "responsiveXs", "fxFlex", "100", "fxLayout", "row wrap", "fxLayoutGap", "30px", "fxLayoutGap.xs", "0px", 1, "problemContainer"], ["fxLayout", "row wrap", "fxFlex", "45", "fxFlex.xs", "100", "fxLayoutAlign", "space-between stretch", 1, "problemClaves"], ["ngClass.xs", "responsiveXs", "fxLayout", "row wrap", "fxFlex", "100", 1, "no-remember"], ["fxFlex", "100", "ngClass.sm", "responsiveSm", "ngClass.xs", "responsiveXs", 1, "question"], ["fxFlex", "100", 1, "o-san-question"], ["fxLayout", "row wrap", "fxFlex", "100", "fxLayoutAlign", "flex-end stretch"], ["fxFlex", "100"], ["fxLayout", "row wrap", "fxFlex", "100", "fxLayoutAlign", "space-between stretch", 1, "access-buttons"], ["ngClass.sm", "responsiveSm", "ngClass.xs", "responsiveXs", "fxLayout", "row", "fxFlex", "100", 1, "recuperar", "bot-ent"], [1, "mat-button", "hbs-button", 3, "click"], ["fxLayout", "row wrap", "ngClass.xs", "responsiveXs", "fxFlex", "46", "fxFlex.sm", "45", "fxFlex.xs", "100", "fxLayoutAlign", "space-between stretch", 1, "problemClaves"], ["ngClass.xs", "responsiveXs", "fxLayout", "row wrap", "fxFlex", "100", 1, "no-have"], ["fxFlex", "100", "ngClass.sm", "responsiveSm", "ngClass.xs", "responsiveXs", 1, "asteriscos"], [1, "o-san-asterisk"], ["fxLayout", "row", "fxFlex", "100", 1, "access-buttons"], ["fxLayout", "row", "fxFlex", "100", 1, "alta-servicio", "bot-ent"], ["class", "helpBox text-shadow align-center", "fxFlex", "100", "fxLayout", "row", "fxLayoutAlign", "start center", 4, "ngIf"], ["fxFlex", "20", "fxFlex.xs", "30", 1, "link-back", "pointer", 3, "click"], ["fxFlex", "100", "fxLayout", "row", "fxLayoutAlign", "start center", 1, "helpBox", "text-shadow", "align-center"], ["ngClass.sm", "responsiveSm", "fxFlex", "408px", "fxFlex.xs", "calc(100% - 30px)", 1, "box-content", "key-generation"], ["class", "key-generation-loading", 4, "ngIf"], ["fxFlex", "100", 1, "boxLogin", 3, "hidden"], ["title", "Content", "name", "keygenIframe", "id", "keygenIframe", "webkitallowfullscreen", "", "mozallowfullscreen", "", "allowfullscreen", "", 3, "src"], ["keygenFrame", ""], [1, "key-generation-loading"], ["name", "regClavesIframeLoading", 3, "independent"], ["ngClass.lt-md", "sm-outdated-ie", "ngClass.lt-sm", "xs-outdated-ie", "fxFlex", "100", "fxLayoutAlign", "center center", 1, "outdated-ie-container"], ["fxLayout", "row wrap", "fxFlex", "1000px", "fxFlex.lt-md", "100%", "fxLayoutAlign", "center center", 1, "outdated-ie"], ["fxFlex", "100", "fxLayout", "row wrap", "fxLayoutAlign", "start start", 1, "out-body"], ["fxFlex", "100", 1, "out-h1"], ["fxFlex", "100", 1, "out-h1", "spaced"], ["fxFlex", "100", 1, "out-h3"], ["fxFlex", "100", 1, "out-h3", "spaced"], ["fxFlex", "100", 1, "out-h2", "spaced"], ["fxFlex", "100", "fxLayout", "row", "fxLayout.xs", "column", "fxLayoutAlign", "space-around center", "fxLayoutAlign.xs", "start start", "fxLayoutGap", "0px", "fxLayoutGap.xs", "30px", 1, "out-navigators-alt", "mt-5"], ["fxFlex", "25%", "fxFlex.xs", "100%", "fxLayout", "column", "fxLayoutGap", "10px", 1, "navigator"], ["fxFlex", "80px", "src", "assets/image/browsers/google-chrome.svg", "alt", "google chrome"], ["fxFlex", "100", "fxLayoutAlign", "center center", 1, "navigatortext"], ["fxFlex", "80px", "src", "assets/image/browsers/firefox-browser.svg", "alt", "mozilla firefox"], ["fxFlex", "80px", "src", "assets/image/browsers/edge-browser.svg", "alt", "microsoft edge"]], template: function HomeMainComponent_Template(rf, ctx) {
            if (rf & 1) {
                core/* ɵɵtemplate */.YNc(0, HomeMainComponent_div_0_Template, 18, 19, "div", 0);
                core/* ɵɵtemplate */.YNc(1, HomeMainComponent_div_1_Template, 51, 45, "div", 1);
            }
            if (rf & 2) {
                core/* ɵɵproperty */.Q6J("ngIf", !ctx.isWrongBrowser);
                core/* ɵɵadvance */.xp6(1);
                core/* ɵɵproperty */.Q6J("ngIf", ctx.isWrongBrowser);
            }
        }, directives: [common/* NgIf */.O5, flex/* DefaultFlexDirective */.yH, flex/* DefaultLayoutDirective */.xw, flex/* DefaultLayoutAlignDirective */.Wh, extended/* DefaultClassDirective */.oO, common/* NgClass */.mk, flex/* DefaultLayoutGapDirective */.SQ, fesm2015_forms/* NgControlStatusGroup */.JL, fesm2015_forms/* FormGroupDirective */.sg, WarningComponent, fesm2015_forms/* NgSelectOption */.YN, fesm2015_forms/* ɵNgSelectMultipleOption */.Kr, form_field/* MatFormField */.KE, input/* MatInput */.Nt, fesm2015_forms/* DefaultValueAccessor */.Fj, fesm2015_forms/* NgControlStatus */.JJ, fesm2015_forms/* FormControlName */.u, form_field/* MatLabel */.hX, PasswordComponent, fesm2015_checkbox/* MatCheckbox */.oG, LoginBlockedComponent, KeyboardComponent, LoadingComponent], pipes: [TranslatePipe], styles: ["[_nghost-%COMP%]   .invisible[_ngcontent-%COMP%]{visibility:hidden}[_nghost-%COMP%]:after{visibility:hidden;font-size:0;content:\" \";clear:both;height:0}[_nghost-%COMP%]   .login_user[_ngcontent-%COMP%]:first-of-type{margin-bottom:10px}[_nghost-%COMP%]   .form-field-invalid[_ngcontent-%COMP%]   .input-element[_ngcontent-%COMP%], [_nghost-%COMP%]   .warn[_ngcontent-%COMP%]   .input-element[_ngcontent-%COMP%]{caret-color:initial}[_nghost-%COMP%]   .document.validation[_ngcontent-%COMP%]   .has_placeholder.invalid[_ngcontent-%COMP%]:after{content:\"!\";color:red;position:absolute;top:.5rem;right:1rem;font-size:1.5rem}[_nghost-%COMP%]   .xxx[_ngcontent-%COMP%]{color:red}select[_ngcontent-%COMP%]{cursor:pointer}.divider[_ngcontent-%COMP%]{background-image:linear-gradient(to right,#ccc,#ccc);background-image:-webkit-linear-gradient(right,#ccc,#ccc);background-position:calc(100% - 2.5em) .5em;background-size:.5px 1.6em;background-repeat:no-repeat}.mobile-divider[_ngcontent-%COMP%]{background-image:linear-gradient(to right,#ccc,#ccc);background-image:-webkit-linear-gradient(right,#ccc,#ccc);background-position:calc(100% - 2.5em) .4em;background-size:.1px 1.6em;background-repeat:no-repeat}.arrow-container[_ngcontent-%COMP%]{width:0;height:0;border-right:.9px solid #137e84;border-top:9px solid #137e84;transform:rotate(45deg);margin-top:-43px;margin-right:16px;cursor:pointer}.arrow-container[_ngcontent-%COMP%]:after{content:\"\";position:absolute;width:0;height:0;border-right:.9px solid #137e84;border-top:9px solid #137e84;transform:rotate(90deg);margin-top:-4px;margin-left:-5px;cursor:pointer}select[_ngcontent-%COMP%]:-moz-focusring{color:transparent;text-shadow:0 0 0 #000}.has-placeholder[_ngcontent-%COMP%]{padding-left:5px;margin-top:-5px}.has-placeholder[_ngcontent-%COMP%]   .placeholder[_ngcontent-%COMP%]{font-size:12px;width:100%;color:#767676;font-weight:normal}.custom-select[_ngcontent-%COMP%]{position:relative;font-family:\"Arial\",sans-serif}.mat-form-field-document[_ngcontent-%COMP%]{overflow:visible;overflow:initial}.custom-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]{display:none}.custom-select[_ngcontent-%COMP%]   .arrow-container[_ngcontent-%COMP%]{position:absolute;top:40px;right:0px}.select-items[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], .select-selected[_ngcontent-%COMP%]{font-family:\"text\",Arial,sans-serif!important;font-weight:400;font-size:16px;color:#444;cursor:pointer;z-index:9;position:relative}.select-selected[_ngcontent-%COMP%]{margin-top:3.5px}.select-items[_ngcontent-%COMP%]{box-shadow:0 2px 4px -1px transparent,0 4px 5px gray,0 1px 10px 0 transparent;position:absolute;top:-25px;left:-14px;z-index:99;width:120%;overflow:auto;-webkit-overflow-scrolling:touch;padding-top:0;padding-bottom:0;height:255px;border-radius:8px;background-color:#fff;overflow-y:auto;overflow-x:hidden}.select-items[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{font-size:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;position:relative;cursor:pointer;outline:none;flex-direction:row;max-width:100%;box-sizing:border-box;align-items:center;-webkit-tap-highlight-color:transparent}.select-items[_ngcontent-%COMP%]   .same-as-selected[_ngcontent-%COMP%]{color:red;font-size:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;position:relative;cursor:pointer;outline:none;display:flex;flex-direction:row;max-width:100%;box-sizing:border-box;align-items:center;-webkit-tap-highlight-color:transparent}.select-hide[_ngcontent-%COMP%]{display:none}.select-items[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:hover, .same-as-selected[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.1)}.select-mobile-items[_ngcontent-%COMP%]{width:110%;overflow-y:hidden;overflow-x:hidden}.key-generation[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%]{-webkit-overflow-scrolling:touch;width:100%;height:100%;min-height:472px!important;background-color:transparent;border:none;overflow:auto}.key-generation[_ngcontent-%COMP%]   .key-generation-loading[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;-webkit-overflow-scrolling:touch;width:100%;height:100%;min-height:472px!important;background-color:rgba(255,255,255,.8)}.outdated-ie-container[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]{z-index:10;padding:0}.outdated-ie-container[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{background-color:#fff;margin:0}.outdated-ie-container[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   .i-logo-ret[_ngcontent-%COMP%]{content:\"\\e920\";line-height:3.2rem;font-size:35px;color:#ec0000!important}.outdated-ie-container[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   .i-logo-spb[_ngcontent-%COMP%]{content:\"\\e986\";line-height:3.2rem;font-size:55px!important;color:#ec0000!important}.outdated-ie-container[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]   .out-body[_ngcontent-%COMP%]{z-index:1;background-color:rgba(255,255,255,.9);padding:40px 32px 32px;margin-top:135px}.outdated-ie-container[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]   .out-body[_ngcontent-%COMP%]   .out-h1[_ngcontent-%COMP%]{text-align:center;margin-bottom:10px;font-size:36px;line-height:40px;font-family:\"headline\",\"Arial\",\"Helvetica\",sans-serif;font-weight:400}.outdated-ie-container[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]   .out-body[_ngcontent-%COMP%]   .out-h1.spaced[_ngcontent-%COMP%]{margin-bottom:35px}.outdated-ie-container[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]   .out-body[_ngcontent-%COMP%]   .out-h2[_ngcontent-%COMP%]{text-align:center;margin-bottom:10px;font-size:22px;line-height:24px;font-family:\"text\",\"Arial\",\"Helvetica\",sans-serif;font-weight:400}.outdated-ie-container[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]   .out-body[_ngcontent-%COMP%]   .out-h2.spaced[_ngcontent-%COMP%]{margin-bottom:30px}.outdated-ie-container[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]   .out-body[_ngcontent-%COMP%]   .out-h3[_ngcontent-%COMP%]{text-align:center;margin-bottom:10px;font-size:20px;line-height:24px;font-family:\"text\",\"Arial\",\"Helvetica\",sans-serif;font-weight:400}.outdated-ie-container[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]   .out-body[_ngcontent-%COMP%]   .out-h3.spaced[_ngcontent-%COMP%]{margin-bottom:30px}.outdated-ie-container[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]   .out-body[_ngcontent-%COMP%]   .navigatortext[_ngcontent-%COMP%]{font-family:\"headline\",\"Arial\",\"Helvetica\",sans-serif;font-weight:400;font-size:18px;color:#000;letter-spacing:-.2px}.outdated-ie-container.sm-outdated-ie[_ngcontent-%COMP%]{padding:0 16px}.outdated-ie-container.xs-outdated-ie[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]{padding:10px 16px}.outdated-ie-container.xs-outdated-ie[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]   .out-body[_ngcontent-%COMP%]{margin-top:10px;padding:40px 16px 16px}.outdated-ie-container.xs-outdated-ie[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]   .out-body[_ngcontent-%COMP%]   .out-h1[_ngcontent-%COMP%]{text-align:center;margin-bottom:30px;font-size:30px;line-height:33px}.outdated-ie-container.xs-outdated-ie[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]   .out-body[_ngcontent-%COMP%]   .out-h2[_ngcontent-%COMP%]{text-align:center;margin-bottom:30px;font-size:18px;line-height:24px}.outdated-ie-container.xs-outdated-ie[_ngcontent-%COMP%]   .outdated-ie[_ngcontent-%COMP%]   .out-body[_ngcontent-%COMP%]   .navigator[_ngcontent-%COMP%]{width:100%}.button-nhb[_ngcontent-%COMP%]{font-family:\"headline\",\"Arial\",\"Helvetica\",sans-serif;font-weight:400;font-size:18px;color:#c00;text-decoration:underline;cursor:pointer}.button-nhb[_ngcontent-%COMP%]:hover{color:#9b0000}.out-navigators-alt[_ngcontent-%COMP%]{margin-bottom:26px}.navigator[_ngcontent-%COMP%]{cursor:default}"] });
    return HomeMainComponent;
}());


;// CONCATENATED MODULE: ./src/app/pages/home/home.routing.ts

// CUSTOM IMPORTS




/**
 * @description Definición de las rutas de la página principal
 * Al ser una SPA con una única página
 * a mostrar, no se definen "hijos"
 */
var routes = [
    {
        path: '',
        component: HomeMainComponent,
        resolve: { translateData: translate_service/* TranslateServiceResolver */.mv }
    }
];
var HomeRoutingModule = /** @class */ /*@__PURE__*/ (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule.ɵfac = function HomeRoutingModule_Factory(t) { return new (t || HomeRoutingModule)(); };
    HomeRoutingModule.ɵmod = /*@__PURE__*/ core/* ɵɵdefineNgModule */.oAB({ type: HomeRoutingModule });
    HomeRoutingModule.ɵinj = /*@__PURE__*/ core/* ɵɵdefineInjector */.cJS({ imports: [[router/* RouterModule.forChild */.Bz.forChild(routes)], router/* RouterModule */.Bz] });
    return HomeRoutingModule;
}());


// EXTERNAL MODULE: ./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex-layout.js + 1 modules
var flex_layout = __webpack_require__(77154);
// EXTERNAL MODULE: ./src/app/modules/translate/translate.module.ts
var translate_module = __webpack_require__(92618);
// EXTERNAL MODULE: ./node_modules/@angular/material/__ivy_ngcc__/fesm2015/core.js + 1 modules
var fesm2015_core = __webpack_require__(87064);
;// CONCATENATED MODULE: ./src/app/pages/home/home.module.ts






// CUSTOM IMPORTS









/**
 * @description Módulo para la página principal
 */
var HomeModule = /** @class */ /*@__PURE__*/ (function () {
    function HomeModule(adapter) {
        this.adapter = adapter;
        this.adapter.setLocale(constants/* Constants.languages.codes.0 */.gT.languages.codes[0]); // Seteo de idioma
        // Control para definir el primer día de la semana
        // cuando pintamos un calendario (Material)
        // según el idioma por defecto
        if (constants/* Constants.languages.codes.0.indexOf */.gT.languages.codes[0].indexOf(constants/* Constants.languages.codes.0 */.gT.languages.codes[0]) !== -1) {
            this.adapter.getFirstDayOfWeek = function () {
                return 1; // Primer día de la semana = LUNES
            };
        }
        else {
            this.adapter.getFirstDayOfWeek = function () {
                return 0; // Primer día de la semana = DOMINGO
            };
        }
    }
    HomeModule.ɵfac = function HomeModule_Factory(t) { return new (t || HomeModule)(core/* ɵɵinject */.LFG(fesm2015_core/* DateAdapter */._A)); };
    HomeModule.ɵmod = /*@__PURE__*/ core/* ɵɵdefineNgModule */.oAB({ type: HomeModule });
    HomeModule.ɵinj = /*@__PURE__*/ core/* ɵɵdefineInjector */.cJS({ providers: [], imports: [[
                common/* CommonModule */.ez,
                flex_layout/* FlexLayoutModule */.o9,
                material_module/* MaterialModule */.q,
                pipes_module/* PipesModule */.D,
                directives_module/* DirectivesModule */.o,
                HomeRoutingModule,
                fesm2015_forms/* FormsModule */.u5,
                fesm2015_forms/* ReactiveFormsModule */.UX,
                display_module/* DisplayModule */.C,
                components_module/* ComponentsModule */.K,
                translate_module/* TranslateModule.forRoot */.a.forRoot()
            ]] });
    return HomeModule;
}());



/***/ })

}]);