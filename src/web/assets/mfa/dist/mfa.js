!function(){"use strict";function t(t){const e=new Uint8Array(t);let n="";for(const t of e)n+=String.fromCharCode(t);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function e(t){const e=t.replace(/-/g,"+").replace(/_/g,"/"),n=(4-e.length%4)%4,r=e.padEnd(e.length+n,"="),i=atob(r),a=new ArrayBuffer(i.length),o=new Uint8Array(a);for(let t=0;t<i.length;t++)o[t]=i.charCodeAt(t);return a}function n(){return void 0!==(null===window||void 0===window?void 0:window.PublicKeyCredential)&&"function"==typeof window.PublicKeyCredential}function r(t){const{id:n}=t;return{...t,id:e(n),transports:t.transports}}class i extends Error{constructor(t,e="WebAuthnError"){super(t),this.name=e}}const a=new class{createNewAbortSignal(){this.controller&&this.controller.abort("Cancelling existing WebAuthn API call for new one");const t=new AbortController;return this.controller=t,t.signal}},o=["cross-platform","platform"];function s(t){if(t&&!(o.indexOf(t)<0))return t}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var u;u=jQuery,Craft.Mfa=Garnish.Base.extend({$mfaLoginFormContainer:null,$mfaSetupFormContainer:null,$alternativeMfaLink:null,$alternativeMfaTypesContainer:null,$viewSetupBtns:null,$errors:null,$slideout:null,$removeSetupButton:null,$closeButton:null,$verifyButton:null,init:function(t){this.$mfaLoginFormContainer=u("#mfa-form"),this.$mfaSetupFormContainer=u("#mfa-setup"),this.$alternativeMfaLink=u("#alternative-mfa"),this.$alternativeMfaTypesContainer=u("#alternative-mfa-types"),this.$viewSetupBtns=this.$mfaSetupFormContainer.find("button.mfa-view-setup"),this.setSettings(t,Craft.Mfa.defaults),this.addListener(this.$alternativeMfaLink,"click","onAlternativeMfaTypeClick"),this.addListener(this.$viewSetupBtns,"click","onViewSetupBtnClick")},showMfaForm:function(t,e){this.$mfaLoginFormContainer.html("").append(t),e.addClass("mfa"),u("#login-form-buttons").hide();var n=this.$mfaLoginFormContainer.find(".submit");this.$errors=u("#login-errors"),this.onSubmitResponse(n)},getCurrentMfaType:function(t){var e=t.attr("data-mfa-type");return void 0===e&&(e=null),e},submitLoginMfa:function(){var t=this,e=this.$mfaLoginFormContainer.find(".submit");e.addClass("loading");var n={mfaFields:{},currentMethod:null};n.mfaFields=this._getMfaFields(this.$mfaLoginFormContainer),n.currentMethod=this._getCurrentMethodInput(this.$mfaLoginFormContainer),Craft.sendActionRequest("POST","users/verify-mfa",{data:n}).then((function(t){window.location.href=t.data.returnUrl})).catch((function(n){var r=n.response;t.onSubmitResponse(e),t.showError(r.data.message)}))},onViewSetupBtnClick:function(t){var e=this;t.preventDefault();var r={selectedMethod:this.getCurrentMfaType(u(t.currentTarget))};Craft.sendActionRequest("POST",this.settings.setupSlideoutHtml,{data:r}).then((function(t){e.slideout=new Craft.Slideout(t.data.html),e.$errors=e.slideout.$container.find(".so-notice"),e.$closeButton=e.slideout.$container.find("button.close"),"craft\\mfa\\type\\WebAuthn"===r.selectedMethod&&n()&&new Craft.WebAuthn(e.slideout),e.$verifyButton=e.slideout.$container.find("#mfa-verify"),e.$removeSetupButton=e.slideout.$container.find("#mfa-remove-setup"),e.addListener(e.$removeSetupButton,"click","onRemoveSetup"),e.addListener(e.$closeButton,"click","onClickClose"),e.addListener(e.$verifyButton,"click","onVerify"),e.slideout.on("close",(function(t){e.$removeSetupButton=null,e.slideout=null}))})).catch((function(t){var e=t.response;Craft.cp.displayError(e.data.message)}))},onClickClose:function(t){this.slideout.close()},onRemoveSetup:function(t){var e=this;t.preventDefault();var n=this.getCurrentMfaType(this.slideout.$container.find("#mfa-setup-form"));void 0===n&&(n=null);var r={currentMethod:n};Craft.sendActionRequest("POST",this.settings.removeSetup,{data:r}).then((function(e){u(t.currentTarget).remove(),Craft.cp.displayNotice(Craft.t("app","MFA setup removed."))})).catch((function(t){Craft.cp.displayError(t.response.data.message)})).finally((function(){e.slideout.close()}))},onVerify:function(t){var e=this;t.preventDefault();var n=this.slideout.$container.find("#mfa-verify");n.addClass("loading");var r={mfaFields:{},currentMethod:null};r.mfaFields=this._getMfaFields(this.slideout.$container),r.currentMethod=this._getCurrentMethodInput(this.slideout.$container),Craft.sendActionRequest("POST",this.settings.saveSetup,{data:r}).then((function(t){e.onSubmitResponse(n),Craft.cp.displayNotice(Craft.t("app","MFA settings saved.")),e.slideout.close()})).catch((function(t){var r=t.response;e.onSubmitResponse(n),e.showError(r.data.message),Craft.cp.displayError(r.data.message)}))},onSubmitResponse:function(t){t.removeClass("loading")},showError:function(t){this.clearErrors(),u('<p class="error" style="display: none;">'+t+"</p>").appendTo(this.$errors).velocity("fadeIn")},clearErrors:function(){this.$errors.empty()},onAlternativeMfaTypeClick:function(t){var e=this.getCurrentMfaType(this.$mfaLoginFormContainer.find("#verifyContainer"));null===e&&(this.$alternativeMfaLink.hide(),this.showError(Craft.t("app","No alternative MFA methods available.")));var n={currentMethod:e};this.getAlternativeMfaTypes(n)},getAlternativeMfaTypes:function(t){var e=this;Craft.sendActionRequest("POST",this.settings.fetchAlternativeMfaTypes,{data:t}).then((function(t){void 0!==t.data.alternativeTypes&&e.showAlternativeMfaTypes(t.data.alternativeTypes)})).catch((function(t){var n=t.response;e.showError(n.data.message)}))},showAlternativeMfaTypes:function(t){var e=this,n=Object.entries(t).map((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,i,a=[],o=!0,s=!1;try{for(n=n.call(t);!(o=(r=n.next()).done)&&(a.push(r.value),!e||a.length!==e);o=!0);}catch(t){s=!0,i=t}finally{try{o||null==n.return||n.return()}finally{if(s)throw i}}return a}}(e,n)||function(t,e){if(t){if("string"==typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}());return{key:r[0],value:r[1]}}));n.length>0&&n.forEach((function(t){e.$alternativeMfaTypesContainer.append('<li><button class="alternative-mfa-type" type="button" value="'+t.key+'">'+t.value.name+"</button></li>")})),this.$alternativeMfaLink.hide().after(this.$alternativeMfaTypesContainer),this.addListener(u(".alternative-mfa-type"),"click","onSelectAlternativeMfaType")},onSelectAlternativeMfaType:function(t){var e=this,n={selectedMethod:u(t.currentTarget).attr("value")};Craft.sendActionRequest("POST",this.settings.loadAlternativeMfaType,{data:n}).then((function(t){void 0!==t.data.mfaForm&&(e.$mfaLoginFormContainer.html("").append(t.data.mfaForm),e.$alternativeMfaTypesContainer.html(""),e.$alternativeMfaLink.show(),e.onSubmitResponse())})).catch((function(t){t.response}))},_getMfaFields:function(t){var e={};return t.find('input[name^="mfaFields[').each((function(t,n){var r=u(n).attr("id");e[r]=u(n).val()})),e},_getCurrentMethodInput:function(t){return t.find('input[name="currentMethod"').val()}},{defaults:{fetchAlternativeMfaTypes:"mfa/fetch-alternative-mfa-types",loadAlternativeMfaType:"mfa/load-alternative-mfa-type",setupSlideoutHtml:"mfa/setup-slideout-html",saveSetup:"mfa/save-setup",removeSetup:"mfa/remove-setup"}}),function(o){Craft.WebAuthn=Garnish.Base.extend({$addSecurityKeyBtn:null,$errors:null,slideout:null,init:function(t,e){this.slideout=t,this.setSettings(e,Craft.WebAuthn.defaults),this.$addSecurityKeyBtn=o("#add-security-key"),this.$errors=this.slideout.$container.find(".so-notice"),n()||(Craft.cp.displayError("This browser does not support WebAuth."),this.$addSecurityKeyBtn.disable()),this.addListener(this.$addSecurityKeyBtn,"click","onAddSecurityKeyBtn")},onAddSecurityKeyBtn:function(t){o(t.currentTarget).hasClass("disabled")||Craft.elevatedSessionManager.requireElevatedSession(this.startWebAuthRegistration.bind(this),this.failedElevation.bind(this))},failedElevation:function(){console.log("not elevated from funct")},startWebAuthRegistration:function(){var o=this;console.log("elevated funct - start reg"),Craft.sendActionRequest("POST",this.settings.generateRegistrationOptions).then((function(l){var u,c=l.data.registrationOptions;try{u=async function(o){var l,u;if(!n())throw new Error("WebAuthn is not supported in this browser");const c={publicKey:{...o,challenge:e(o.challenge),user:{...o.user,id:(u=o.user.id,(new TextEncoder).encode(u))},excludeCredentials:null===(l=o.excludeCredentials)||void 0===l?void 0:l.map(r)}};let f;c.signal=a.createNewAbortSignal();try{f=await navigator.credentials.create(c)}catch(t){throw function({error:t,options:e}){var n,r;const{publicKey:a}=e;if(!a)throw Error("options was missing required publicKey property");if("AbortError"===t.name){if(e.signal===(new AbortController).signal)return new i("Registration ceremony was sent an abort signal","AbortError")}else if("ConstraintError"===t.name){if(!0===(null===(n=a.authenticatorSelection)||void 0===n?void 0:n.requireResidentKey))return new i("Discoverable credentials were required but no available authenticator supported it","ConstraintError");if("required"===(null===(r=a.authenticatorSelection)||void 0===r?void 0:r.userVerification))return new i("User verification was required but no available authenticator supported it","ConstraintError")}else{if("InvalidStateError"===t.name)return new i("The authenticator was previously registered","InvalidStateError");if("NotAllowedError"===t.name);else{if("NotSupportedError"===t.name)return 0===a.pubKeyCredParams.filter((t=>"public-key"===t.type)).length?new i('No entry in pubKeyCredParams was of type "public-key"',"NotSupportedError"):new i("No available authenticator supported any of the specified pubKeyCredParams algorithms","NotSupportedError");if("SecurityError"===t.name){const t=window.location.hostname;if("localhost"!==(o=t)&&!/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(o))return new i(`${window.location.hostname} is an invalid domain`,"SecurityError");if(a.rp.id!==t)return new i(`The RP ID "${a.rp.id}" is invalid for this domain`,"SecurityError")}else if("TypeError"===t.name){if(a.user.id.byteLength<1||a.user.id.byteLength>64)return new i("User ID was not between 1 and 64 characters","TypeError")}else if("UnknownError"===t.name)return new i("The authenticator was unable to process the specified options, or could not create a new credential","UnknownError")}}var o;return t}({error:t,options:c})}if(!f)throw new Error("Registration was not completed");const{id:d,rawId:p,response:h,type:v}=f;let m;return"function"==typeof h.getTransports&&(m=h.getTransports()),{id:d,rawId:t(p),response:{attestationObject:t(h.attestationObject),clientDataJSON:t(h.clientDataJSON),transports:m},type:v,clientExtensionResults:f.getClientExtensionResults(),authenticatorAttachment:s(f.authenticatorAttachment)}}(c)}catch(t){throw"InvalidStateError"===t.name?Craft.cp.displayError("Error: Authenticator was probably already registered by user"):Craft.cp.displayError(t),t}o.verifyWebAuthnRegistration(u)})).catch((function(t){var e=t.response;console.log(e)}))},verifyWebAuthnRegistration:function(t){console.log("verifyWebAuthnRegistration");var e={credentials:JSON.stringify(t)};Craft.sendActionRequest("POST",this.settings.verifyRegistration,{data:e}).then((function(t){t.data.verified?Craft.cp.displaySuccess("Success!"):(Craft.cp.displayError("Something went wrong!"),console.log(t))})).catch((function(t){var e=t.response;console.log(e)}))}},{defaults:{generateRegistrationOptions:"mfa/generate-registration-options",verifyRegistration:"mfa/verify-registration"}})}(jQuery)}();
//# sourceMappingURL=mfa.js.map