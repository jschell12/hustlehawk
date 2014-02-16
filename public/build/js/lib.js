/* ========================================================================
 * Bootstrap: transition.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#modals
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    var $el = $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('dropdown')

      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Button.DEFAULTS, options)
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d);
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
        .prop('checked', !this.$element.hasClass('active'))
        .trigger('change')
      if ($input.prop('type') === 'radio') $parent.find('.active').removeClass('active')
    }

    this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(window.jQuery);

/*
* Kendo UI Complete v2013.2.716 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
("function"==typeof define&&define.amd?define:function(e,t){return t()})([],function(){!function(e,t,n){function r(){}function o(e,t){if(t)return"'"+e.split("'").join("\\'").split('\\"').join('\\\\\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\t/g,"\\t")+"'";var n=e.charAt(0),r=e.substring(1);return"="===n?"+("+r+")+":":"===n?"+e("+r+")+":";"+e+";o+="}function i(e,t,n){return e+="",t=t||2,n=t-e.length,n?F[t].substring(0,n)+e:e}function a(t){var n,r,o,i,a,s,u,l,c,d,f,p,m,h=mt.browser,g="rtl"==t.css("direction");return t.parent().hasClass("k-animation-container")?(p=t.parent(".k-animation-container"),m=p[0].style,p.is(":hidden")&&p.show(),n=ht.test(m.width)||ht.test(m.height),n||p.css({width:t.outerWidth(),height:t.outerHeight()})):(r=t.css(it.support.transitions.css+"box-shadow")||t.css("box-shadow"),o=r?r.match(yt)||[0,0,0,0,0]:[0,0,0,0,0],i=ft.max(+o[3],+(o[4]||0)),a=-o[1]+i,s=+o[1]+i,u=+o[2]+i,l=t[0].style.width,c=t[0].style.height,d=ht.test(l),f=ht.test(c),h.opera&&(a=s=u=5),n=d||f,d||(l=t.outerWidth()),f||(c=t.outerHeight()),t.wrap(e("<div/>").addClass("k-animation-container").css({width:l,height:c,marginLeft:a*(g?1:-1),paddingLeft:a,paddingRight:s,paddingBottom:u})),n&&t.css({width:"100%",height:"100%",boxSizing:"border-box",mozBoxSizing:"border-box",webkitBoxSizing:"border-box"})),h.msie&&ft.floor(h.version)<=7&&(t.css({zoom:1}),t.children(".k-menu").width(t.width())),t.parent()}function s(e){var t=1,n=arguments.length;for(t=1;n>t;t++)u(e,arguments[t]);return e}function u(e,t){var n,r,o,i,a=it.data.ObservableArray,s=it.data.DataSource;for(n in t)r=t[n],o=typeof r,o===St&&null!==r&&r.constructor!==Array&&r.constructor!==a&&r.constructor!==s?r instanceof Date?e[n]=new Date(r.getTime()):(i=e[n],e[n]=typeof i===St?i||{}:{},u(e[n],r)):o!==Ot&&(e[n]=r);return e}function l(e,t,r){for(var o in t)if(t.hasOwnProperty(o)&&t[o].test(e))return o;return r!==n?r:e}function c(t,n){var r,o={};return document.defaultView&&document.defaultView.getComputedStyle?(r=document.defaultView.getComputedStyle(t,""),n&&e.each(n,function(e,t){o[t]=r.getPropertyValue(t)})):(r=t.currentStyle,n&&e.each(n,function(e,t){o[t]=r[t.replace(/\-(\w)/g,function(e,t){return t.toUpperCase()})]})),it.size(o)||(o=r),o}function d(e){var t,n=0;for(t in e)e.hasOwnProperty(t)&&"toJSON"!=t&&n++;return n}function f(e,t,n){var r,o,i,a;return t||(t="offset"),r=e[t](),o=mt.mobileOS,mt.touch&&o.ios&&o.flatVersion<410&&(i="offset"==t?r:e.offset(),a=r.left==i.left&&r.top==i.top)?{top:r.top-window.scrollY,left:r.left-window.scrollX}:(it.support.pointers&&!n&&(r.top-=window.pageYOffset-document.documentElement.scrollTop,r.left-=window.pageXOffset-document.documentElement.scrollLeft),r)}function p(e){var t={};return st("string"==typeof e?e.split(" "):e,function(e){t[e]=this}),t}function m(e){return new it.effects.Element(e)}function h(e,t,n,r){return typeof e===bt&&(dt(t)&&(r=t,t=400,n=!1),dt(n)&&(r=n,n=!1),typeof t===xt&&(n=t,t=400),e={effects:e,duration:t,reverse:n,complete:r}),at({effects:{},duration:400,reverse:!1,init:ct,teardown:ct,hide:!1},e,{completeCallback:e.complete,complete:ct})}function g(t,n,r,o,i){for(var a,s=0,u=t.length;u>s;s++)a=e(t[s]),a.queue(function(){I.promise(a,h(n,r,o,i))});return t}function y(e,t,n,r,o,i){return I.transitionPromise(e,t,h(n,r,o,i))}function v(e,t,n,r){return t&&(t=t.split(" "),st(t,function(t,n){e.toggleClass(n,r)})),e}function w(e){return(""+e).replace(W,"&amp;").replace(L,"&lt;").replace(U,"&gt;")}function b(e,r){var o;return 0===r.indexOf("data")&&(r=r.substring(4),r=r.charAt(0).toLowerCase()+r.substring(1)),r=r.replace(G,"-$1"),o=e.getAttribute("data-"+it.ns+r),null===o?o=n:"null"===o?o=null:"true"===o?o=!0:"false"===o?o=!1:vt.test(o)?o=parseFloat(o):B.test(o)&&!V.test(o)&&(o=t("("+o+")")),o}function M(t,r){var o,i,a={};for(o in r)i=b(t,o),i!==n&&(Y.test(o)&&(i=it.template(e("#"+i).html())),a[o]=i);return a}function S(e,t){var n=e.nodeName.toLowerCase();return(/input|select|textarea|button|object/.test(n)?!e.disabled:"a"===n?e.href||t:t)&&T(e)}function T(t){return!e(t).parents().andSelf().filter(function(){return"hidden"===e.css(this,"visibility")||e.expr.filters.hidden(this)}).length}function x(e,t){return new x.fn.init(e,t)}var O,D,k,C,z,H,E,A,N,P,F,_,I,W,L,U,j,R,J,$,Y,B,V,G,K,Q,q,X,Z,et,tt,nt,rt,ot,it=window.kendo=window.kendo||{},at=e.extend,st=e.each,ut=e.proxy,lt=e.isArray,ct=e.noop,dt=e.isFunction,ft=Math,pt=window.JSON||{},mt={},ht=/%/,gt=/\{(\d+)(:[^\}]+)?\}/g,yt=/(\d+?)px\s*(\d+?)px\s*(\d+?)px\s*(\d+?)?/i,vt=/^(\+|-?)\d+(\.?)\d*$/,wt="function",bt="string",Mt="number",St="object",Tt="null",xt="boolean",Ot="undefined",Dt={},kt={},Ct=[].slice,zt=window.Globalize;it.version="2013.2.716",r.extend=function(e){var t,n,r=function(){},o=this,i=e&&e.init?e.init:function(){o.apply(this,arguments)};r.prototype=o.prototype,n=i.fn=i.prototype=new r;for(t in e)n[t]=typeof e[t]!==St||e[t]instanceof Array||null===e[t]?e[t]:at(!0,{},r.prototype[t],e[t]);return n.constructor=i,i.extend=o.extend,i},D=function(){this._defaultPrevented=!0},k=function(){return this._defaultPrevented===!0},C=r.extend({init:function(){this._events={}},bind:function(e,t,r){var o,i,a,s,u,l=this,c=typeof e===bt?[e]:e,d=typeof t===wt;if(t===n){for(o in e)l.bind(o,e[o]);return l}for(o=0,i=c.length;i>o;o++)e=c[o],s=d?t:t[e],s&&(r&&(a=s,s=function(){l.unbind(e,s),a.apply(l,arguments)}),u=l._events[e]=l._events[e]||[],u.push(s));return l},one:function(e,t){return this.bind(e,t,!0)},first:function(e,t){var n,r,o,i,a=this,s=typeof e===bt?[e]:e,u=typeof t===wt;for(n=0,r=s.length;r>n;n++)e=s[n],o=u?t:t[e],o&&(i=a._events[e]=a._events[e]||[],i.unshift(o));return a},trigger:function(e,t){var n,r,o=this,i=o._events[e];if(i){for(t=t||{},t.sender=o,t._defaultPrevented=!1,t.preventDefault=D,t.isDefaultPrevented=k,i=i.slice(),n=0,r=i.length;r>n;n++)i[n].call(o,t);return t._defaultPrevented===!0}return!1},unbind:function(e,t){var r,o=this,i=o._events[e];if(e===n)o._events={};else if(i)if(t)for(r=i.length-1;r>=0;r--)i[r]===t&&i.splice(r,1);else o._events[e]=[];return o}}),z=/^\w+/,H=/\$\{([^}]*)\}/g,E=/\\\}/g,A=/__CURLY__/g,N=/\\#/g,P=/__SHARP__/g,F=["","0","00","000","0000"],O={paramName:"data",useWithBlock:!0,render:function(e,t){var n,r,o="";for(n=0,r=t.length;r>n;n++)o+=e(t[n]);return o},compile:function(t,n){var r,i,a,s=at({},this,n),u=s.paramName,l=u.match(z)[0],c=s.useWithBlock,d="var o,e=kendo.htmlEncode;";if(dt(t))return 2===t.length?function(n){return t(e,{data:n}).join("")}:t;for(d+=c?"with("+u+"){":"",d+="o=",i=t.replace(E,"__CURLY__").replace(H,"#=e($1)#").replace(A,"}").replace(N,"__SHARP__").split("#"),a=0;a<i.length;a++)d+=o(i[a],0===a%2);d+=c?";}":";",d+="return o;",d=d.replace(P,"#");try{return r=Function(l,d),r._slotCount=Math.floor(i.length/2),r}catch(f){throw Error(it.format("Invalid template:'{0}' Generated code:'{1}'",t,d))}}},function(){function e(e){return a.lastIndex=0,a.test(e)?'"'+e.replace(a,function(e){var t=s[e];return typeof t===bt?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function t(i,a){var s,l,c,d,f,p,m=n,h=a[i];if(h&&typeof h===St&&typeof h.toJSON===wt&&(h=h.toJSON(i)),typeof o===wt&&(h=o.call(a,i,h)),p=typeof h,p===bt)return e(h);if(p===Mt)return isFinite(h)?h+"":Tt;if(p===xt||p===Tt)return h+"";if(p===St){if(!h)return Tt;if(n+=r,f=[],"[object Array]"===u.apply(h)){for(d=h.length,s=0;d>s;s++)f[s]=t(s,h)||Tt;return c=0===f.length?"[]":n?"[\n"+n+f.join(",\n"+n)+"\n"+m+"]":"["+f.join(",")+"]",n=m,c}if(o&&typeof o===St)for(d=o.length,s=0;d>s;s++)typeof o[s]===bt&&(l=o[s],c=t(l,h),c&&f.push(e(l)+(n?": ":":")+c));else for(l in h)Object.hasOwnProperty.call(h,l)&&(c=t(l,h),c&&f.push(e(l)+(n?": ":":")+c));return c=0===f.length?"{}":n?"{\n"+n+f.join(",\n"+n)+"\n"+m+"}":"{"+f.join(",")+"}",n=m,c}}var n,r,o,a=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,s={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},u={}.toString;typeof Date.prototype.toJSON!==wt&&(Date.prototype.toJSON=function(){var e=this;return isFinite(e.valueOf())?i(e.getUTCFullYear(),4)+"-"+i(e.getUTCMonth()+1)+"-"+i(e.getUTCDate())+"T"+i(e.getUTCHours())+":"+i(e.getUTCMinutes())+":"+i(e.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}),typeof pt.stringify!==wt&&(pt.stringify=function(e,i,a){var s;if(n="",r="",typeof a===Mt)for(s=0;a>s;s+=1)r+=" ";else typeof a===bt&&(r=a);if(o=i,i&&typeof i!==wt&&(typeof i!==St||typeof i.length!==Mt))throw Error("JSON.stringify");return t("",{"":e})})}(),function(){function e(e){if(e){if(e.numberFormat)return e;if(typeof e===bt){var t=it.cultures;return t[e]||t[e.split("-")[0]]||null}return null}return null}function t(t){return t&&(t=e(t)),t||it.cultures.current}function r(e){e.groupSizes=e.groupSize,e.percent.groupSizes=e.percent.groupSize,e.currency.groupSizes=e.currency.groupSize}function o(e,r,o){o=t(o);var a=o.calendars.standard,s=a.days,u=a.months;return r=a.patterns[r]||r,r.replace(l,function(t){var r;return"d"===t?r=e.getDate():"dd"===t?r=i(e.getDate()):"ddd"===t?r=s.namesAbbr[e.getDay()]:"dddd"===t?r=s.names[e.getDay()]:"M"===t?r=e.getMonth()+1:"MM"===t?r=i(e.getMonth()+1):"MMM"===t?r=u.namesAbbr[e.getMonth()]:"MMMM"===t?r=u.names[e.getMonth()]:"yy"===t?r=i(e.getFullYear()%100):"yyyy"===t?r=i(e.getFullYear(),4):"h"===t?r=e.getHours()%12||12:"hh"===t?r=i(e.getHours()%12||12):"H"===t?r=e.getHours():"HH"===t?r=i(e.getHours()):"m"===t?r=e.getMinutes():"mm"===t?r=i(e.getMinutes()):"s"===t?r=e.getSeconds():"ss"===t?r=i(e.getSeconds()):"f"===t?r=ft.floor(e.getMilliseconds()/100):"ff"===t?r=ft.floor(e.getMilliseconds()/10):"fff"===t?r=e.getMilliseconds():"tt"===t&&(r=e.getHours()<12?a.AM[0]:a.PM[0]),r!==n?r:t.slice(1,t.length-1)})}function a(e,r,o){o=t(o);var i,a,u,l,w,b,M,S,T,x,O,D,k,C,z,H,E,A,N,P,F,_,I,W=o.numberFormat,L=W.groupSize[0],U=W[h],j=W[m],R=W.decimals,J=W.pattern[0],$=[],Y=0>e,B=p,V=p,G=-1;if(e===n)return p;if(!isFinite(e))return e;if(!r)return o.name.length?e.toLocaleString():""+e;if(w=c.exec(r)){if(r=w[1].toLowerCase(),a="c"===r,u="p"===r,(a||u)&&(W=a?W.currency:W.percent,L=W.groupSize[0],U=W[h],j=W[m],R=W.decimals,i=W.symbol,J=W.pattern[Y?0:1]),l=w[2],l&&(R=+l),"e"===r)return l?e.toExponential(R):e.toExponential();if(u&&(e*=100),e=s(e,R),e=e.split(m),b=e[0],M=e[1],Y&&(b=b.substring(1)),V=b,S=b.length,S>=L)for(V=p,x=0;S>x;x++)x>0&&0===(S-x)%L&&(V+=U),V+=b.charAt(x);if(M&&(V+=j+M),"n"===r&&!Y)return V;for(e=p,x=0,O=J.length;O>x;x++)D=J.charAt(x),e+="n"===D?V:"$"===D||"%"===D?i:D;return e}if(Y&&(e=-e),(r.indexOf("'")>-1||r.indexOf('"')>-1||r.indexOf("\\")>-1)&&(r=r.replace(d,function(e){var t=e.charAt(0).replace("\\",""),n=e.slice(1).replace(t,"");return $.push(n),v})),r=r.split(";"),Y&&r[1])r=r[1],C=!0;else if(0===e){if(r=r[2]||r[0],-1==r.indexOf(g)&&-1==r.indexOf(y))return r}else r=r[0];if(P=r.indexOf("%"),F=r.indexOf("$"),u=-1!=P,a=-1!=F,u&&(e*=100),a&&"\\"===r[F-1]&&(r=r.split("\\").join(""),a=!1),(a||u)&&(W=a?W.currency:W.percent,L=W.groupSize[0],U=W[h],j=W[m],R=W.decimals,i=W.symbol),k=r.indexOf(h)>-1,k&&(r=r.replace(f,p)),z=r.indexOf(m),O=r.length,-1!=z?(M=(""+e).split("e"),M=M[1]?s(e,Math.abs(M[1])):M[0],M=M.split(m)[1]||p,E=r.lastIndexOf(y)-z,H=r.lastIndexOf(g)-z,A=E>-1,N=H>-1,x=M.length,A||N||(r=r.substring(0,z)+r.substring(z+1),O=r.length,z=-1,x=0),A&&E>H?x=E:H>E&&(N&&x>H?x=H:A&&E>x&&(x=E)),x>-1&&(e=s(e,x))):e=s(e),H=r.indexOf(g),_=E=r.indexOf(y),G=-1==H&&-1!=E?E:-1!=H&&-1==E?H:H>E?E:H,H=r.lastIndexOf(g),E=r.lastIndexOf(y),I=-1==H&&-1!=E?E:-1!=H&&-1==E?H:H>E?H:E,G==O&&(I=G),-1!=G){if(V=(""+e).split(m),b=V[0],M=V[1]||p,S=b.length,T=M.length,k)if(S===L&&z-_>S)b=U+b;else if(S>L){for(V=p,x=0;S>x;x++)x>0&&0===(S-x)%L&&(V+=U),V+=b.charAt(x);b=V}for(e=r.substring(0,G),Y&&!C&&(e+="-"),x=G;O>x;x++){if(D=r.charAt(x),-1==z){if(S>I-x){e+=b;break}}else if(-1!=E&&x>E&&(B=p),S>=z-x&&z-x>-1&&(e+=b,x=z),z===x){e+=(M?j:p)+M,x+=I-z+1;continue}D===y?(e+=D,B=D):D===g&&(e+=B)}if(I>=G&&(e+=r.substring(I+1)),a||u){for(V=p,x=0,O=e.length;O>x;x++)D=e.charAt(x),V+="$"===D||"%"===D?i:D;e=V}if(O=$.length)for(x=0;O>x;x++)e=e.replace(v,$[x])}return e}var s,u,l=/dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|"[^"]*"|'[^']*'/g,c=/^(n|c|p|e)(\d*)$/i,d=/(\\.)|(['][^']*[']?)|(["][^"]*["]?)/g,f=/\,/g,p="",m=".",h=",",g="#",y="0",v="??",w="en-US",b={}.toString;it.cultures={"en-US":{name:w,numberFormat:{pattern:["-n"],decimals:2,",":",",".":".",groupSize:[3],percent:{pattern:["-n %","n %"],decimals:2,",":",",".":".",groupSize:[3],symbol:"%"},currency:{pattern:["($n)","$n"],decimals:2,",":",",".":".",groupSize:[3],symbol:"$"}},calendars:{standard:{days:{names:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],namesAbbr:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],namesShort:["Su","Mo","Tu","We","Th","Fr","Sa"]},months:{names:["January","February","March","April","May","June","July","August","September","October","November","December"],namesAbbr:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},AM:["AM","am","AM"],PM:["PM","pm","PM"],patterns:{d:"M/d/yyyy",D:"dddd, MMMM dd, yyyy",F:"dddd, MMMM dd, yyyy h:mm:ss tt",g:"M/d/yyyy h:mm tt",G:"M/d/yyyy h:mm:ss tt",m:"MMMM dd",M:"MMMM dd",s:"yyyy'-'MM'-'ddTHH':'mm':'ss",t:"h:mm tt",T:"h:mm:ss tt",u:"yyyy'-'MM'-'dd HH':'mm':'ss'Z'",y:"MMMM, yyyy",Y:"MMMM, yyyy"},"/":"/",":":":",firstDay:0,twoDigitYearMax:2029}}}},it.culture=function(t){var o,i=it.cultures;return t===n?i.current:(o=e(t)||i[w],o.calendar=o.calendars.standard,i.current=o,zt&&r(o.numberFormat),n)},it.findCulture=e,it.getCulture=t,it.culture(w),s=function(e,t){var n=Math.pow(10,t||0);return(Math.round(e*n)/n).toFixed(t)},u=function(e,t,r){if(t){if("[object Date]"===b.call(e))return o(e,t,r);if(typeof e===Mt)return a(e,t,r)}return e!==n?e:""},zt&&(u=ut(zt.format,zt)),it.format=function(e){var t=arguments;return e.replace(gt,function(e,n,r){var o=t[parseInt(n,10)+1];return u(o,r?r.substring(1):"")})},it._extractFormat=function(e){return"{0:"===e.slice(0,3)&&(e=e.slice(3,e.length-1)),e},it._activeElement=function(){try{return document.activeElement}catch(e){return document.documentElement.activeElement}},it._round=s,it.toString=u}(),function(){function t(e,t,n){return!(e>=t&&n>=e)}function r(e){return e.charAt(0)}function o(t){return e.map(t,r)}function i(e,t){t||23!==e.getHours()||e.setHours(e.getHours()+2)}function a(e){for(var t=0,n=e.length,r=[];n>t;t++)r[t]=(e[t]+"").toLowerCase();return r}function s(e){var t,n={};for(t in e)n[t]=a(e[t]);return n}function u(e,r,a){if(!e)return null;var u,l,c,p,m,g,y,v,w,b,M,S,T=function(e){for(var t=0;r[F]===e;)t++,F++;return t>0&&(F-=1),t},x=function(t){var n=h[t]||RegExp("^\\d{1,"+t+"}"),r=e.substr(_,t).match(n);return r?(r=r[0],_+=r.length,parseInt(r,10)):null},O=function(t,n){for(var r,o,i,a=0,s=t.length;s>a;a++)if(r=t[a],o=r.length,i=e.substr(_,o),n&&(i=i.toLowerCase()),i==r)return _+=o,a+1;return null},D=function(){var t=!1;return e.charAt(_)===r[F]&&(_++,t=!0),t},k=a.calendars.standard,C=null,z=null,H=null,E=null,A=null,N=null,P=null,F=0,_=0,I=!1,W=new Date,L=k.twoDigitYearMax||2029,U=W.getFullYear();for(r||(r="d"),p=k.patterns[r],p&&(r=p),r=r.split(""),c=r.length;c>F;F++)if(u=r[F],I)"'"===u?I=!1:D();else if("d"===u){if(l=T("d"),k._lowerDays||(k._lowerDays=s(k.days)),H=3>l?x(2):O(k._lowerDays[3==l?"namesAbbr":"names"],!0),null===H||t(H,1,31))return null}else if("M"===u){if(l=T("M"),k._lowerMonths||(k._lowerMonths=s(k.months)),z=3>l?x(2):O(k._lowerMonths[3==l?"namesAbbr":"names"],!0),null===z||t(z,1,12))return null;z-=1}else if("y"===u){if(l=T("y"),C=x(l),null===C)return null;2==l&&("string"==typeof L&&(L=U+parseInt(L,10)),C=U-U%100+C,C>L&&(C-=100))}else if("h"===u){if(T("h"),E=x(2),12==E&&(E=0),null===E||t(E,0,11))return null}else if("H"===u){if(T("H"),E=x(2),null===E||t(E,0,23))return null}else if("m"===u){if(T("m"),A=x(2),null===A||t(A,0,59))return null}else if("s"===u){if(T("s"),N=x(2),null===N||t(N,0,59))return null}else if("f"===u){if(l=T("f"),P=x(l),null!==P&&l>3&&(P=parseInt((""+P).substring(0,3),10)),null===P||t(P,0,999))return null}else if("t"===u){if(l=T("t"),w=k.AM,b=k.PM,1===l&&(w=o(w),b=o(b)),m=O(b),!m&&!O(w))return null}else if("z"===u){if(g=!0,l=T("z"),"Z"===e.substr(_,1)){if(!y)return null;D();continue}if(v=e.substr(_,6).match(l>2?f:d),!v)return null;if(v=v[0],_=v.length,v=v.split(":"),M=parseInt(v[0],10),t(M,-12,13))return null;if(l>2&&(S=parseInt(v[1],10),isNaN(S)||t(S,0,59)))return null}else if("T"===u)y=D();else if("'"===u)I=!0,D();else if(!D())return null;return null===C&&(C=U),m&&12>E&&(E+=12),null===H&&(H=1),g?(M&&(E+=-M),S&&(A+=-S),e=new Date(Date.UTC(C,z,H,E,A,N,P))):(e=new Date(C,z,H,E,A,N,P),i(e,E)),100>C&&e.setFullYear(C),e.getDate()!==H&&g===n?null:e}var l=/\u00A0/g,c=/[eE][\-+]?[0-9]+/,d=/[+|\-]\d{1,2}/,f=/[+|\-]\d{1,2}:\d{2}/,p=/^\/Date\((.*?)\)\/$/,m=["G","g","d","F","D","y","m","T","t"],h={2:/^\d{1,2}/,4:/^\d{4}/},g={}.toString;it.parseDate=function(e,t,n){if("[object Date]"===g.call(e))return e;var r,o,i=0,a=null;if(e&&0===e.indexOf("/D")&&(a=p.exec(e)))return new Date(parseInt(a[1],10));if(n=it.getCulture(n),!t){for(t=[],o=n.calendar.patterns,r=m.length;r>i;i++)t[i]=o[m[i]];i=0,t.push("yyyy/MM/dd HH:mm:ss","yyyy/MM/dd HH:mm","yyyy/MM/dd","ddd MMM dd yyyy HH:mm:ss","yyyy-MM-ddTHH:mm:ss.fffffffzzz","yyyy-MM-ddTHH:mm:ss.fffzzz","yyyy-MM-ddTHH:mm:sszzz","yyyy-MM-ddTHH:mmzzz","yyyy-MM-ddTHH:mmzz","yyyy-MM-ddTHH:mm:ss","yyyy-MM-ddTHH:mm","yyyy-MM-dd HH:mm:ss","yyyy-MM-dd HH:mm","yyyy-MM-dd")}for(t=lt(t)?t:[t],r=t.length;r>i;i++)if(a=u(e,t[i],n))return a;return a},it.parseInt=function(e,t){var n=it.parseFloat(e,t);return n&&(n=0|n),n},it.parseFloat=function(e,t,n){if(!e&&0!==e)return null;if(typeof e===Mt)return e;e=""+e,t=it.getCulture(t);var r,o,i=t.numberFormat,a=i.percent,s=i.currency,u=s.symbol,d=a.symbol,f=e.indexOf("-");return c.test(e)?(e=parseFloat(e),isNaN(e)&&(e=null),e):f>0?null:(f=f>-1,e.indexOf(u)>-1||n&&n.toLowerCase().indexOf("c")>-1?(i=s,r=i.pattern[0].replace("$",u).split("n"),e.indexOf(r[0])>-1&&e.indexOf(r[1])>-1&&(e=e.replace(r[0],"").replace(r[1],""),f=!0)):e.indexOf(d)>-1&&(o=!0,i=a,u=d),e=e.replace("-","").replace(u,"").replace(l," ").split(i[","].replace(l," ")).join("").replace(i["."],"."),e=parseFloat(e),isNaN(e)?e=null:f&&(e*=-1),e&&o&&(e/=100),e)},zt&&(it.parseDate=function(e,t,n){return"[object Date]"===g.call(e)?e:zt.parseDate(e,t,n)},it.parseFloat=function(e,t){return typeof e===Mt?e:e===n||null===e?null:(e=zt.parseFloat(e,t),isNaN(e)?null:e)})}(),function(){function t(e){var t,n=!1,r=[],o={webkit:/(chrome)[ \/]([\w.]+)/i,safari:/(webkit)[ \/]([\w.]+)/i,opera:/(opera)(?:.*version|)[ \/]([\w.]+)/i,msie:/(msie) ([\w.]+)/i,mozilla:/(mozilla)(?:.*? rv:([\w.]+)|)/i};for(t in o)if(o.hasOwnProperty(t)&&(r=e.match(o[t]))){n={},n[t]=!0,n[r[1].toLowerCase()]=!0,n.version=parseInt(document.documentMode||r[2],10);break}return n}var r,o,i,a,s,u;mt.scrollbar=function(){var e,t=document.createElement("div");return t.style.cssText="overflow:scroll;overflow-x:hidden;zoom:1;clear:both",t.innerHTML="&nbsp;",document.body.appendChild(t),e=t.offsetWidth-t.scrollWidth,document.body.removeChild(t),e},mt.isRtl=function(t){return e(t).closest(".k-rtl").length>0},r=document.createElement("table");try{r.innerHTML="<tr><td></td></tr>",mt.tbodyInnerHtml=!0}catch(c){mt.tbodyInnerHtml=!1}mt.touch="ontouchstart"in window,mt.pointers=navigator.msPointerEnabled,o=mt.transitions=!1,i=mt.transforms=!1,a="HTMLElement"in window?HTMLElement.prototype:[],mt.hasHW3D="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix||"MozPerspective"in document.documentElement.style||"msPerspective"in document.documentElement.style,st(["Moz","webkit","O","ms"],function(){var e,t=""+this,a=typeof r.style[t+"Transition"]===bt;return a||typeof r.style[t+"Transform"]===bt?(e=t.toLowerCase(),i={css:"ms"!=e?"-"+e+"-":"",prefix:t,event:"o"===e||"webkit"===e?e:""},a&&(o=i,o.event=o.event?o.event+"TransitionEnd":"transitionend"),!1):n}),mt.transforms=i,mt.transitions=o,mt.devicePixelRatio=window.devicePixelRatio===n?1:window.devicePixelRatio;try{mt.screenWidth=window.outerWidth||window.screen?window.screen.availWidth:window.innerWidth,mt.screenHeight=window.outerHeight||window.screen?window.screen.availHeight:window.innerHeight,mt.zoomLevel=function(){return mt.touch?document.documentElement.clientWidth/window.innerWidth:mt.pointers?(top||window).outerWidth/(top||window).innerWidth:1}}catch(c){mt.screenWidth=window.screen.availWidth,mt.screenHeight=window.screen.availHeight,mt.zoomLevel=function(){return 1}}mt.detectOS=function(e){var t,n,r=!1,o=[],i=!/mobile safari/i.test(e),a={fire:/(Silk)\/(\d+)\.(\d+(\.\d+)?)/,android:/(Android|Android.*(?:Opera|Firefox).*?\/)\s*(\d+)\.(\d+(\.\d+)?)/,iphone:/(iPhone|iPod).*OS\s+(\d+)[\._]([\d\._]+)/,ipad:/(iPad).*OS\s+(\d+)[\._]([\d_]+)/,meego:/(MeeGo).+NokiaBrowser\/(\d+)\.([\d\._]+)/,webos:/(webOS)\/(\d+)\.(\d+(\.\d+)?)/,blackberry:/(BlackBerry|BB10).*?Version\/(\d+)\.(\d+(\.\d+)?)/,playbook:/(PlayBook).*?Tablet\s*OS\s*(\d+)\.(\d+(\.\d+)?)/,wp:/(Windows Phone(?: OS)?)\s(\d+)\.(\d+(\.\d+)?)/,windows:/(MSIE)\s+(\d+)\.(\d+(\.\d+)?)/,ffos:/(Mobile).*rv:(\d+)\.(\d+(\.\d+)?).*Firefox/},s={ios:/^i(phone|pad|pod)$/i,android:/^android|fire$/i,blackberry:/^blackberry|playbook/i,windows:/windows/,wp:/wp/,meego:/meego|ffos/},u={tablet:/playbook|ipad|fire/i},c={omini:/Opera\sMini/i,omobile:/Opera\sMobi/i,firefox:/Firefox|Fennec/i,mobilesafari:/version\/.*safari/i,chrome:/chrome/i,webkit:/webkit/i,ie:/MSIE|Windows\sPhone/i};for(n in a)if(a.hasOwnProperty(n)&&(o=e.match(a[n]))){if("windows"==n&&"plugins"in navigator)return!1;r={},r.device=n,r.tablet=l(n,u,!1),r.browser=l(e,c,"default"),r.name=l(n,s),r[r.name]=!0,r.majorVersion=o[2],r.minorVersion=o[3].replace("_","."),t=r.minorVersion.replace(".","").substr(0,2),r.flatVersion=r.majorVersion+t+Array(3-(t.length<3?t.length:2)).join("0"),r.appMode=window.navigator.standalone||/file|local|wmapp/.test(window.location.protocol)||typeof window.PhoneGap!==Ot||typeof window.cordova!==Ot,r.android&&(mt.devicePixelRatio<1.5&&r.flatVersion<400||i)&&(mt.screenWidth>800||mt.screenHeight>800)&&(r.tablet=n);break}return r},s=mt.mobileOS=mt.detectOS(navigator.userAgent),mt.wpDevicePixelRatio=s.wp?screen.width/320:0,mt.kineticScrollNeeded=s&&(mt.touch||mt.pointers),mt.hasNativeScrolling=!1,(s.ios&&s.majorVersion>4||s.android&&s.majorVersion>2||s.wp)&&(mt.hasNativeScrolling=s),mt.mouseAndTouchPresent=mt.touch&&!(mt.mobileOS.ios||mt.mobileOS.android),mt.browser=t(navigator.userAgent),mt.cssBorderSpacing=n!==document.documentElement.style.borderSpacing&&!(mt.browser.msie&&mt.browser.version<8),function(t){var n,r=parseInt(t.version,10);t.msie?n="ie":t.mozilla?n="ff":t.safari?n="safari":t.webkit?n="webkit":t.opera&&(n="opera"),n&&e(document.documentElement).addClass("k-"+n+" k-"+n+r)}(mt.browser),mt.eventCapture=document.documentElement.addEventListener,mt.placeholder="placeholder"in document.createElement("input"),mt.stableSort=function(){var e=[0,1,2,3,4,5,6,7,8,9,10,11,12].sort(function(){return 0});return 0===e[0]&&1===e[1]&&2===e[2]&&3===e[3]&&4===e[4]&&5===e[5]&&6===e[6]&&7===e[7]&&8===e[8]&&9===e[9]&&10===e[10]&&11===e[11]&&12===e[12]}(),mt.matchesSelector=a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector||a.matchesSelector||function(t){for(var n=document.querySelectorAll?(this.parentNode||document).querySelectorAll(t)||[]:e(t),r=n.length;r--;)if(n[r]==this)return!0;return!1},mt.pushState=window.history&&window.history.pushState,u=document.documentMode,mt.hashChange="onhashchange"in window&&!(mt.browser.msie&&(!u||8>=u))}(),_={left:{reverse:"right"},right:{reverse:"left"},down:{reverse:"up"},up:{reverse:"down"},top:{reverse:"bottom"},bottom:{reverse:"top"},"in":{reverse:"out"},out:{reverse:"in"}},I={},e.extend(I,{Element:function(t){this.element=e(t)},promise:function(e,t){e.is(":visible")||e.css({display:e.data("olddisplay")||"block"}).css("display"),t.hide&&e.data("olddisplay",e.css("display")).hide(),t.init&&t.init(),t.completeCallback&&t.completeCallback(e),e.dequeue()},transitionPromise:function(e,t,n){var r=it.wrap(e);return r.append(t),e.hide(),t.show(),n.completeCallback&&n.completeCallback(e),e}}),"kendoAnimate"in e.fn||at(e.fn,{kendoStop:function(e,t){return this.stop(e,t)},kendoAnimate:function(e,t,n,r){return g(this,e,t,n,r)},kendoAnimateTo:function(e,t,n,r,o){return y(this,e,t,n,r,o)},kendoAddClass:function(e,t){return it.toggleClass(this,e,t,!0)},kendoRemoveClass:function(e,t){return it.toggleClass(this,e,t,!1)},kendoToggleClass:function(e,t,n){return it.toggleClass(this,e,t,n)}}),W=/&/g,L=/</g,U=/>/g,j=function(e){return e.target},mt.touch&&(j=function(e){var t="originalEvent"in e?e.originalEvent.changedTouches:"changedTouches"in e?e.changedTouches:null;return t?document.elementFromPoint(t[0].clientX,t[0].clientY):e.target},st(["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap"],function(t,n){e.fn[n]=function(e){return this.bind(n,e)}})),mt.touch?mt.mobileOS?(mt.mousedown="touchstart",mt.mouseup="touchend",mt.mousemove="touchmove",mt.mousecancel="touchcancel",mt.click="touchend",mt.resize="orientationchange"):(mt.mousedown="mousedown touchstart",mt.mouseup="mouseup touchend",mt.mousemove="mousemove touchmove",mt.mousecancel="mouseleave touchcancel",mt.click="click",mt.resize="resize"):mt.pointers?(mt.mousemove="MSPointerMove",mt.mousedown="MSPointerDown",mt.mouseup="MSPointerUp",mt.mousecancel="MSPointerCancel",mt.click="MSPointerUp",mt.resize="orientationchange resize"):(mt.mousemove="mousemove",mt.mousedown="mousedown",mt.mouseup="mouseup",mt.mousecancel="mouseleave",mt.click="click",mt.resize="resize"),R=function(e,t){var n,r,o,i,a=t||"d",s=1;for(r=0,o=e.length;o>r;r++)i=e[r],""!==i&&(n=i.indexOf("["),0!==n&&(-1==n?i="."+i:(s++,i="."+i.substring(0,n)+" || {})"+i.substring(n))),s++,a+=i+(o-1>r?" || {})":")"));return Array(s).join("(")+a},J=/^([a-z]+:)?\/\//i,at(it,{ui:it.ui||{},fx:it.fx||m,effects:it.effects||I,mobile:it.mobile||{},data:it.data||{},dataviz:it.dataviz||{ui:{roles:{}}},keys:{INSERT:45,DELETE:46,BACKSPACE:8,TAB:9,ENTER:13,ESC:27,LEFT:37,UP:38,RIGHT:39,DOWN:40,END:35,HOME:36,SPACEBAR:32,PAGEUP:33,PAGEDOWN:34,F2:113,F10:121,F12:123},support:it.support||mt,animate:it.animate||g,ns:"",attr:function(e){return"data-"+it.ns+e},wrap:a,deepExtend:s,getComputedStyles:c,size:d,getOffset:it.getOffset||f,parseEffects:it.parseEffects||p,toggleClass:it.toggleClass||v,directions:it.directions||_,Observable:C,Class:r,Template:O,template:ut(O.compile,O),render:ut(O.render,O),stringify:ut(pt.stringify,pt),eventTarget:j,htmlEncode:w,isLocalUrl:function(e){return e&&!J.test(e)},expr:function(e,t,n){return e=e||"",typeof t==bt&&(n=t,t=!1),n=n||"d",e&&"["!==e.charAt(0)&&(e="."+e),e=t?R(e.split("."),n):n+e},getter:function(e,t){return Dt[e]=Dt[e]||Function("d","return "+it.expr(e,t))},setter:function(e){return kt[e]=kt[e]||Function("d,value",it.expr(e)+"=value")},accessor:function(e){return{get:it.getter(e),set:it.setter(e)}},guid:function(){var e,t,n="";for(e=0;32>e;e++)t=0|16*ft.random(),(8==e||12==e||16==e||20==e)&&(n+="-"),n+=(12==e?4:16==e?8|3&t:t).toString(16);return n},roleSelector:function(e){return e.replace(/(\S+)/g,"["+it.attr("role")+"=$1],").slice(0,-1)},triggeredByInput:function(e){return/^(label|input|textarea|select)$/i.test(e.target.tagName)},logToConsole:function(e){var t=window.console;n!==t&&t.log&&t.log(e)}}),$=C.extend({init:function(e,t){var n=this;n.element=it.jQuery(e).handler(n),C.fn.init.call(n),t=n.options=at(!0,{},n.options,t),n.element.attr(it.attr("role"))||n.element.attr(it.attr("role"),(t.name||"").toLowerCase()),n.element.data("kendo"+t.prefix+t.name,n),n.bind(n.events,t)},events:[],options:{prefix:""},_tabindex:function(e){e=e||this.wrapper;var t=this.element,n="tabindex",r=e.attr(n)||t.attr(n);t.removeAttr(n),e.attr(n,isNaN(r)?0:r)},setOptions:function(t){for(var n,r=this,o=0,i=r.events.length;i>o;o++)n=r.events[o],r.options[n]&&t[n]&&r.unbind(n,r.options[n]);e.extend(r.options,t),r.bind(r.events,t)},destroy:function(){var e=this;e.element.removeData("kendo"+e.options.prefix+e.options.name),e.element.removeData("handler"),e.unbind()}}),it.notify=ct,Y=/template$/i,B=/^\s*(?:\{(?:.|\r\n|\n)*\}|\[(?:.|\r\n|\n)*\])\s*$/,V=/^\{(\d+)(:[^\}]+)?\}/,G=/([A-Z])/g,it.initWidget=function(t,r,o){var i,a,s,u,l,c,d,f;if(o?o.roles&&(o=o.roles):o=it.ui.roles,t=t.nodeType?t:t[0],c=t.getAttribute("data-"+it.ns+"role"),c&&(s=-1===c.indexOf(".")?o[c]:it.getter(c)(window))){for(f=b(t,"dataSource"),r=e.extend({},M(t,s.fn.options),r),f&&(r.dataSource=typeof f===bt?it.getter(f)(window):f),u=0,l=s.fn.events.length;l>u;u++)a=s.fn.events[u],d=b(t,a),d!==n&&(r[a]=it.getter(d)(window));return i=e(t).data("kendo"+s.fn.options.prefix+s.fn.options.name),i?i.setOptions(r):i=new s(t,r),i}},it.rolesFromNamespaces=function(e){var t,n,r=[];for(e[0]||(e=[it.ui,it.dataviz.ui]),t=0,n=e.length;n>t;t++)r[t]=e[t].roles;return at.apply(null,[{}].concat(r.reverse()))},it.init=function(t){var n=it.rolesFromNamespaces(Ct.call(arguments,1));e(t).find("[data-"+it.ns+"role]").andSelf().each(function(){it.initWidget(this,{},n)})},it.destroy=function(t){e(t).find("[data-"+it.ns+"role]").andSelf().each(function(){var t=e(this),n=it.widgetInstance(t,it.ui)||it.widgetInstance(t,it.mobile.ui)||it.widgetInstance(t,it.dataviz.ui);n&&n.destroy()})},it.parseOptions=M,at(it.ui,{Widget:$,roles:{},progress:function(t,n){var r,o,i,a,s=t.find(".k-loading-mask"),u=it.support,l=u.browser;n?s.length||(r=u.isRtl(t),o=r?"right":"left",a=t.scrollLeft(),i=l.webkit?r?t[0].scrollWidth-t.width()-2*a:0:0,s=e("<div class='k-loading-mask'><span class='k-loading-text'>Loading...</span><div class='k-loading-image'/><div class='k-loading-color'/></div>").width("100%").height("100%").css("top",t.scrollTop()).css(o,Math.abs(a)+i).prependTo(t)):s&&s.remove()},plugin:function(t,r,o){var i,a=t.fn.options.name;r=r||it.ui,o=o||"",r[a]=t,r.roles[a.toLowerCase()]=t,i="getKendo"+o+a,a="kendo"+o+a,e.fn[a]=function(r){var o,i=this;return typeof r===bt?(o=Ct.call(arguments,1),this.each(function(){var t,s,u=e.data(this,a);if(!u)throw Error(it.format("Cannot call method '{0}' of {1} before it is initialized",r,a));if(t=u[r],typeof t!==wt)throw Error(it.format("Cannot find method '{0}' of {1}",r,a));return s=t.apply(u,o),s!==n?(i=s,!1):n})):this.each(function(){new t(this,r)}),i},e.fn[i]=function(){return this.data(a)}}}),K={bind:function(){return this}},Q=$.extend({init:function(e,t){$.fn.init.call(this,e,t),this.element.autoApplyNS(),this.wrapper=this.element},destroy:function(){$.fn.destroy.call(this),this.element.kendoDestroy()},options:{prefix:"Mobile"},events:[],view:function(){var e=this.element.closest(it.roleSelector("view splitview modalview drawer"));return it.widgetInstance(e,it.mobile.ui)},container:function(){var e=this.element.closest(it.roleSelector("view layout modalview drawer"));return it.widgetInstance(e,it.mobile.ui)||K}}),at(it.mobile,{init:function(e){it.init(e,it.mobile.ui,it.ui,it.dataviz.ui)},ui:{Widget:Q,roles:{},plugin:function(e){it.ui.plugin(e,it.mobile.ui,"Mobile")}}}),it.touchScroller=function(t,n){return e(t).map(function(t,r){return r=e(r),mt.kineticScrollNeeded&&it.mobile.ui.Scroller&&!r.data("kendoMobileScroller")?(r.kendoMobileScroller(n),r.data("kendoMobileScroller")):!1})[0]},it.preventDefault=function(e){e.preventDefault()},it.widgetInstance=function(e,t){var r=t.roles[e.data(it.ns+"role")];return r?e.data("kendo"+r.fn.options.prefix+r.fn.options.name):n},it.onResize=function(t){var n=t;return mt.mobileOS.android&&(n=function(){setTimeout(t,200)}),e(window).on(mt.resize,n),n},it.unbindResize=function(t){e(window).off(mt.resize,t)},it.attrValue=function(e,t){return e.data(it.ns+t)},it.days={Sunday:0,Monday:1,Tuesday:2,Wednesday:3,Thursday:4,Friday:5,Saturday:6},e.extend(e.expr[":"],{focusable:function(t){var n=e.attr(t,"tabindex");return S(t,!isNaN(n)&&n>-1)}}),q=["mousedown","mousemove","mouseenter","mouseleave","mouseover","mouseout","mouseup","click"],X="label, input, [data-rel=external]",Z={setupMouseMute:function(){var t,n=0,r=q.length,o=document.documentElement;
if(!Z.mouseTrap&&mt.eventCapture)for(Z.mouseTrap=!0,Z.bustClick=!1,Z.captureMouse=!1,t=function(t){Z.captureMouse&&("click"===t.type?Z.bustClick&&!e(t.target).is(X)&&(t.preventDefault(),t.stopPropagation()):t.stopPropagation())};r>n;n++)o.addEventListener(q[n],t,!0)},muteMouse:function(e){Z.captureMouse=!0,e.data.bustClick&&(Z.bustClick=!0),clearTimeout(Z.mouseTrapTimeoutID)},unMuteMouse:function(){clearTimeout(Z.mouseTrapTimeoutID),Z.mouseTrapTimeoutID=setTimeout(function(){Z.captureMouse=!1,Z.bustClick=!1},400)}},et={down:"touchstart mousedown",move:"mousemove touchmove",up:"mouseup touchend touchcancel",cancel:"mouseleave touchcancel"},mt.touch&&(mt.mobileOS.ios||mt.mobileOS.android)&&(et={down:"touchstart",move:"touchmove",up:"touchend touchcancel",cancel:"touchcancel"}),mt.pointers&&(et={down:"MSPointerDown",move:"MSPointerMove",up:"MSPointerUp",cancel:"MSPointerCancel MSPointerLeave"},e.each({MSPointerEnter:"MSPointerOver",MSPointerLeave:"MSPointerOut"},function(t,n){e.event.special[t]={delegateType:n,bindType:n,handle:function(t){var r,o=this,i=t.relatedTarget,a=t.handleObj;return(!i||i!==o&&!e.contains(o,i))&&(t.type=a.origType,r=a.handler.apply(this,arguments),t.type=n),r}}})),tt=function(e){return et[e]||e},nt=/([^ ]+)/g,it.applyEventMap=function(e,t){return e=e.replace(nt,tt),t&&(e=e.replace(nt,"$1."+t)),e},rt=e.fn.on,at(!0,x,e),x.fn=x.prototype=new e,x.fn.constructor=x,x.fn.init=function(t,n){return n&&n instanceof e&&!(n instanceof x)&&(n=x(n)),e.fn.init.call(this,t,n,ot)},x.fn.init.prototype=x.fn,ot=x(document),at(x.fn,{handler:function(e){return this.data("handler",e),this},autoApplyNS:function(e){return this.data("kendoNS",e||it.guid()),this},on:function(){var e,t,n,r,o,i,a=this,s=a.data("kendoNS");return 1===arguments.length?rt.call(a,arguments[0]):(e=a,t=Ct.call(arguments),typeof t[t.length-1]===Ot&&t.pop(),n=t[t.length-1],r=it.applyEventMap(t[0],s),mt.mouseAndTouchPresent&&r.search(/mouse|click/)>-1&&this[0]!==document.documentElement&&(Z.setupMouseMute(),o=2===t.length?null:t[1],i=r.indexOf("click")>-1&&r.indexOf("touchend")>-1,rt.call(this,{touchstart:Z.muteMouse,touchend:Z.unMuteMouse},o,{bustClick:i})),typeof n===bt&&(e=a.data("handler"),n=e[n],t[t.length-1]=function(t){n.call(e,t)}),t[0]=r,rt.apply(a,t),a)},kendoDestroy:function(e){return e=e||this.data("kendoNS"),e&&this.off("."+e),this}}),it.jQuery=x,it.eventMap=et,it.timezone=function(){function e(e,t){var n,r,o,i=t[3],a=t[4],s=t[5],u=t[8];return u||(t[8]=u={}),u[e]?u[e]:(isNaN(a)?0===a.indexOf("last")?(n=new Date(Date.UTC(e,l[i]+1,1,s[0]-24,s[1],s[2],0)),r=c[a.substr(4,3)],o=n.getUTCDay(),n.setUTCDate(n.getUTCDate()+r-o-(r>o?7:0))):a.indexOf(">=")>=0&&(n=new Date(Date.UTC(e,l[i],a.substr(5),s[0],s[1],s[2],0)),r=c[a.substr(0,3)],o=n.getUTCDay(),n.setUTCDate(n.getUTCDate()+r-o+(o>r?7:0))):n=new Date(Date.UTC(e,l[i],a,s[0],s[1],s[2],0)),u[e]=n)}function t(t,n,r){var o,i,a;return(n=n[r])?(a=new Date(t).getUTCFullYear(),n=jQuery.grep(n,function(e){var t=e[0],n=e[1];return a>=t&&(n>=a||t==a&&"only"==n||"max"==n)}),n.push(t),n.sort(function(t,n){return"number"!=typeof t&&(t=Number(e(a,t))),"number"!=typeof n&&(n=Number(e(a,n))),t-n}),n[jQuery.inArray(t,n)-1]):(o=r.split(":"),i=0,o.length>1&&(i=60*o[0]+Number(o[1])),[-1e6,"max","-","Jan",1,[0,0,0],i,"-"])}function n(e,t,n){var r,o,i;if(t=t[n],!t)throw Error('Timezone "'+n+'" is either incorrect, or kendo.timezones.min.js is not included.');for(r=t.length-1;r>=0&&(o=t[r][3],!(o&&e>o));r--);if(i=t[r+1],!i)throw Error('Timezone "'+n+'" not found on '+e+".");return i}function r(e,r,o,i){typeof e!=Mt&&(e=Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));var a=n(e,r,i);return{zone:a,rule:t(e,o,a[1])}}function o(e,t){var n,o,i;return"Etc/UTC"==t||"Etc/GMT"==t?0:(n=r(e,this.zones,this.rules,t),o=n.zone,i=n.rule,i?o[0]-i[6]:o[0])}function i(e,t){var n=r(e,this.zones,this.rules,t),o=n.zone,i=n.rule,a=o[2];return a.indexOf("/")>=0?a.split("/")[i&&i[6]?1:0]:a.indexOf("%s")>=0?a.replace("%s",i&&"-"!=i[7]?i[7]:""):a}function a(e,t,n){var r,o;return typeof t==bt&&(t=this.offset(e,t)),typeof n==bt&&(n=this.offset(e,n)),r=e.getTimezoneOffset(),e=new Date(e.getTime()+6e4*(t-n)),o=e.getTimezoneOffset(),new Date(e.getTime()+6e4*(o-r))}function s(e,t){return this.convert(e,e.getTimezoneOffset(),t)}function u(e,t){return this.convert(e,t,e.getTimezoneOffset())}var l={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11},c={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{zones:{},rules:{},offset:o,convert:a,apply:s,remove:u,abbr:i}}(),it.date=function(){function e(e,t){return 0===t&&23===e.getHours()?(e.setHours(e.getHours()+2),!0):!1}function t(t,n,r){var o=t.getHours();r=r||1,n=(n-t.getDay()+7*r)%7,t.setDate(t.getDate()+n),e(t,o)}function n(e,n,r){return e=new Date(e),t(e,n,r),e}function r(e){return new Date(e.getFullYear(),e.getMonth(),1)}function o(e){var t=new Date(e.getFullYear(),e.getMonth()+1,0),n=r(e),o=Math.abs(t.getTimezoneOffset()-n.getTimezoneOffset());return o&&t.setHours(n.getHours()+o/60),t}function i(t){return t=new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0),e(t,0),t}function a(e){return 60*e.getHours()*p+e.getMinutes()*p+1e3*e.getSeconds()+e.getMilliseconds()}function s(e,t,n){var r,o=a(t),i=a(n);return e&&o!=i?(t>=n&&(n+=m),r=a(e),o>r&&(r+=m),o>i&&(i+=m),r>=o&&i>=r):!0}function u(e,t,n){var r,o=t.getTime(),i=n.getTime();return o>=i&&(i+=m),r=e.getTime(),r>=o&&i>=r}function l(t,n){var r=t.getHours();return t=new Date(t),c(t,n*m),e(t,r),t}function c(e,t,n){var r,o=e.getTimezoneOffset();e.setTime(e.getTime()+t),n||(r=e.getTimezoneOffset()-o,e.setTime(e.getTime()+r*p))}function d(){return i(new Date)}function f(e){return i(e).getTime()==d().getTime()}var p=6e4,m=864e5;return{adjustDST:e,dayOfWeek:n,setDayOfWeek:t,getDate:i,isInDateRange:u,isInTimeRange:s,isToday:f,nextDay:function(e){return l(e,1)},previousDay:function(e){return l(e,-1)},MS_PER_DAY:m,MS_PER_MINUTE:p,setTime:c,addDays:l,today:d,firstDayOfMonth:r,lastDayOfMonth:o,getMilliseconds:a}}(),it.stripWhitespace=function(e){for(var t=document.createNodeIterator(e,NodeFilter.SHOW_TEXT,function(t){return t.parentNode==e?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},!1);t.nextNode();)t.referenceNode&&!t.referenceNode.textContent.trim()&&t.referenceNode.parentNode.removeChild(t.referenceNode)}}(jQuery,eval),"undefined"==typeof kendo_module&&(kendo_module=function(){})});
/*
* Kendo UI Complete v2013.2.716 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
("function"==typeof define&&define.amd?define:function(e,t){return t()})(["./kendo.core.min","./kendo.data.odata.min","./kendo.data.xml.min"],function(){!function(e,t){function r(e,t,r,n){return function(i){var a,s={};for(a in i)s[a]=i[a];s.field=n?r+"."+i.field:r,e.trigger(t,s),t==_t&&e._notifyChange&&e._notifyChange(s)}}function n(t,r){if(t===r)return!0;var i,a=e.type(t),s=e.type(r);if(a!==s)return!1;if("date"===a)return t.getTime()===r.getTime();if("object"!==a&&"array"!==a)return!1;for(i in t)if(!n(t[i],r[i]))return!1;return!0}function i(e,t){var r,n;for(n in e){if(r=e[n],et(r)&&r.field&&r.field===t)return r;if(r===t)return r}return null}function a(e){this.data=e||[]}function s(e,r){if(e){var n=typeof e===ft?{field:e,dir:r}:e,i=rt(n)?n:n!==t?[n]:[];return nt(i,function(e){return!!e.dir})}}function o(e){var t,r,n,i,a=e.filters;if(a)for(t=0,r=a.length;r>t;t++)n=a[t],i=n.operator,i&&typeof i===ft&&(n.operator=B[i.toLowerCase()]||i),o(n)}function u(e){return e&&!tt(e)?((rt(e)||!e.filters)&&(e={logic:"and",filters:rt(e)?e:[e]}),o(e),e):t}function l(e){return rt(e)?e:[e]}function f(e,r){var n=typeof e===ft?{field:e,dir:r}:e,i=rt(n)?n:n!==t?[n]:[];return D(i,function(e){return{field:e.field,dir:e.dir||"asc",aggregates:e.aggregates}})}function d(e,t){return e&&e.getTime&&t&&t.getTime?e.getTime()===t.getTime():e===t}function c(e,t,r,n,i){var a,s,o,u,l;for(t=t||[],u=t.length,a=0;u>a;a++)s=t[a],o=s.aggregate,l=s.field,e[l]=e[l]||{},e[l][o]=G[o.toLowerCase()](e[l][o],r,ot.accessor(l),n,i)}function h(e){var t,r=e.length,n=Array(r);for(t=0;r>t;t++)n[t]=e[t].toJSON();return n}function g(e,t){t=t||{};var r=new a(e),n=t.aggregate,i=t.filter;return i&&(r=r.filter(i)),r.aggregate(n)}function p(e,t,r,n,i){var a,s,o,u,l;for(u=0,l=e.length;l>u;u++){a=e[u];for(s in t)o=i[s],o&&o!==s&&(a[o]=t[s](a),delete a[s])}}function _(e,t,r,n,i){var a,s,o,u,l;for(u=0,l=e.length;l>u;u++){a=e[u];for(s in t)a[s]=r._parse(s,t[s](a)),o=i[s],o&&o!==s&&delete a[o]}}function v(e,t,r,n,i){var a,s,o,u;for(s=0,u=e.length;u>s;s++)a=e[s],o=n[a.field],o&&o!=a.field&&(a.field=o),a.value=r._parse(a.field,a.value),a.hasSubgroups?v(a.items,t,r,n,i):_(a.items,t,r,n,i)}function m(e,t,r,n,i,a){return function(s){return s=e(s),s&&!tt(n)&&("[object Array]"===Dt.call(s)||s instanceof Gt||(s=[s]),r(s,n,new t,i,a)),s||[]}}function y(e,t,r,n){for(var i,a,s=0;t.length&&n&&(i=t[s],a=i.items,e&&e.field===i.field&&e.value===i.value?(e.hasSubgroups&&e.items.length?y(e.items[e.items.length-1],i.items,r,n):(a=a.slice(r,n),n-=a.length,e.items=e.items.concat(a)),t.splice(s--,1)):(a=a.slice(r,n),n-=a.length,i.items=a,i.items.length||t.splice(s--,1)),r=0,!(++s>=t.length)););}function S(e){var t,r,n=[];for(t=0,r=e.length;r>t;t++)n=e[t].hasSubgroups?n.concat(S(e[t].items)):n.concat(e[t].items.slice());return n}function w(e,t){var r,n,i,a;if(t)for(r=0,n=e.length;n>r;r++)i=e[r],a=i.items,i.hasSubgroups?w(a,t):!a.length||a[0]instanceof t||(a.type=t,a.wrapAll(a,a))}function b(e,t){var r,n;for(r=0,n=e.length;n>r;r++)if(e[r].hasSubgroups){if(b(e[r].items,t))return!0}else if(t(e[r].items,e[r]))return!0}function k(e,t){var r,n;for(r=0,n=e.length;n>r;r++)if(e[r].uid==t.uid)return t=e[r],e.splice(r,1),t}function x(e,t){var r,n,i,a;for(i=e.length-1,a=0;i>=a;i--)n=e[i],r={value:t.get(n.field),field:n.field,items:r?[r]:[t],hasSubgroups:!!r,aggregates:{}};return r}function q(e,t){return t?z(e,function(e){return e[t.idField]===t.id}):-1}function C(e,t){return t?z(e,function(e){return e.uid==t.uid}):-1}function z(e,t){var r,n;for(r=0,n=e.length;n>r;r++)if(t(e[r]))return r;return-1}function O(e,t){if(e&&!tt(e)){var r=e[t];return et(r)?r.from||r.field||t:e[t]}return t}function F(e,t){var r,n,i,a={};for(i in e)"filters"!==i&&(a[i]=e[i]);if(e.filters&&e.filters.length)for(a.filters=[],r=0,n=e.filters.length;n>r;r++)a.filters[r]=F(e.filters[r],t);else a.field=O(t.fields,a.field);return a}function R(e,t){var r,n,i,a,s,o=[];for(r=0,n=e.length;n>r;r++){i={},a=e[r];for(s in a)i[s]=a[s];i.field=O(t.fields,i.field),i.aggregates&&rt(i.aggregates)&&(i.aggregates=R(i.aggregates,t)),o.push(i)}return o}function P(t,r){var n,i,a,s,o,u=e(t)[0].children,l=[],f=r[0],d=r[1];for(n=0,i=u.length;i>n;n++)a={},o=u[n],o.disabled||(a[f.field]=o.text,s=o.attributes.value,s=s&&s.specified?o.value:o.text,a[d.field]=s,l.push(a));return l}function T(t,r){var n,i,a,s,o,u,l,f=e(t)[0].tBodies[0],d=f?f.rows:[],c=r.length,h=[];for(n=0,i=d.length;i>n;n++){for(o={},l=!0,s=d[n].cells,a=0;c>a;a++)u=s[a],"th"!==u.nodeName.toLowerCase()&&(l=!1,o[r[a].field]=u.innerHTML);l||h.push(o)}return h}function M(e){return function(){var t=this._data,r=U.fn[e].apply(this,Mt.call(arguments));return this._data!=t&&this._attachBubbleHandlers(),r}}function A(t,r){var n,i,a,s,o,u,l,f,d=e(t).children(),c=[],h=r[0].field,g=r[1]&&r[1].field,p=r[2]&&r[2].field,_=r[3]&&r[3].field;for(n=0,i=d.length;i>n;n++)a={_loaded:!0},s=d.eq(n),u=s[0].firstChild,f=s.children(),t=f.filter("ul"),f=f.filter(":not(ul)"),o=s.attr("data-id"),o&&(a.id=o),u&&(a[h]=3==u.nodeType?u.nodeValue:f.text()),g&&(a[g]=f.find("a").attr("href")),_&&(a[_]=f.find("img").attr("src")),p&&(l=f.find(".k-sprite").prop("className"),a[p]=l&&e.trim(l.replace("k-sprite",""))),t.length&&(a.items=A(t.eq(0),r)),"true"==s.attr("data-hasChildren")&&(a.hasChildren=!0),c.push(a);return c}var D,N,j,I,B,G,L,E,H,J,U,V,W,Q,$,K,X=e.extend,Y=e.proxy,Z=e.isFunction,et=e.isPlainObject,tt=e.isEmptyObject,rt=e.isArray,nt=e.grep,it=e.ajax,at=e.each,st=e.noop,ot=window.kendo,ut=ot.Observable,lt=ot.Class,ft="string",dt="function",ct="create",ht="read",gt="update",pt="destroy",_t="change",vt="sync",mt="get",yt="error",St="requestStart",wt="progress",bt="requestEnd",kt=[ct,ht,gt,pt],xt=function(e){return e},qt=ot.getter,Ct=ot.stringify,zt=Math,Ot=[].push,Ft=[].join,Rt=[].pop,Pt=[].splice,Tt=[].shift,Mt=[].slice,At=[].unshift,Dt={}.toString,Nt=ot.support.stableSort,jt=/^\/Date\((.*?)\)\/$/,It=/(\r+|\n+)/g,Bt=/(?=['\\])/g,Gt=ut.extend({init:function(e,t){var r=this;r.type=t||Lt,ut.fn.init.call(r),r.length=e.length,r.wrapAll(e,r)},toJSON:function(){var e,t,r=this.length,n=Array(r);for(e=0;r>e;e++)t=this[e],t instanceof Lt&&(t=t.toJSON()),n[e]=t;return n},parent:st,wrapAll:function(e,t){var r,n,i=this,a=function(){return i};for(t=t||[],r=0,n=e.length;n>r;r++)t[r]=i.wrap(e[r],a);return t},wrap:function(e,t){var r,n=this;return null!==e&&"[object Object]"===Dt.call(e)&&(r=e instanceof n.type||e instanceof Jt,r||(e=e instanceof Lt?e.toJSON():e,e=new n.type(e)),e.parent=t,e.bind(_t,function(e){n.trigger(_t,{field:e.field,node:e.node,index:e.index,items:e.items||[this],action:e.node?e.action||"itemchange":"itemchange"})})),e},push:function(){var e,t=this.length,r=this.wrapAll(arguments);return e=Ot.apply(this,r),this.trigger(_t,{action:"add",index:t,items:r}),e},slice:Mt,join:Ft,pop:function(){var e=this.length,t=Rt.apply(this);return e&&this.trigger(_t,{action:"remove",index:e-1,items:[t]}),t},splice:function(e,t,r){var n,i,a,s=this.wrapAll(Mt.call(arguments,2));if(n=Pt.apply(this,[e,t].concat(s)),n.length)for(this.trigger(_t,{action:"remove",index:e,items:n}),i=0,a=n.length;a>i;i++)n[i].children&&n[i].unbind(_t);return r&&this.trigger(_t,{action:"add",index:e,items:s}),n},shift:function(){var e=this.length,t=Tt.apply(this);return e&&this.trigger(_t,{action:"remove",index:0,items:[t]}),t},unshift:function(){var e,t=this.wrapAll(arguments);return e=At.apply(this,t),this.trigger(_t,{action:"add",index:0,items:t}),e},indexOf:function(e){var t,r,n=this;for(t=0,r=n.length;r>t;t++)if(n[t]===e)return t;return-1},forEach:function(e){for(var t=0,r=this.length;r>t;t++)e(this[t],t,this)},map:function(e){for(var t=0,r=[],n=this.length;n>t;t++)r[t]=e(this[t],t,this);return r},filter:function(e){for(var t,r=0,n=[],i=this.length;i>r;r++)t=this[r],e(t,r,this)&&(n[n.length]=t);return n},find:function(e){for(var t,r=0,n=this.length;n>r;r++)if(t=this[r],e(t,r,this))return t},every:function(e){for(var t,r=0,n=this.length;n>r;r++)if(t=this[r],!e(t,r,this))return!1;return!0},some:function(e){for(var t,r=0,n=this.length;n>r;r++)if(t=this[r],e(t,r,this))return!0;return!1},remove:function(e){this.splice(this.indexOf(e),1)}}),Lt=ut.extend({init:function(e){var t,r,n=this,i=function(){return n};ut.fn.init.call(this);for(r in e)t=e[r],"_"!=r.charAt(0)&&(t=n.wrap(t,r,i)),n[r]=t;n.uid=ot.guid()},shouldSerialize:function(e){return this.hasOwnProperty(e)&&"_events"!==e&&typeof this[e]!==dt&&"uid"!==e},forEach:function(e){for(var t in this)this.shouldSerialize(t)&&e(this[t],t)},toJSON:function(){var e,t,r={};for(t in this)this.shouldSerialize(t)&&(e=this[t],(e instanceof Lt||e instanceof Gt)&&(e=e.toJSON()),r[t]=e);return r},get:function(e){var t,r=this;return r.trigger(mt,{field:e}),t="this"===e?r:ot.getter(e,!0)(r)},_set:function(e,t){var r,n,i,a=this,s=e.indexOf(".")>=0;if(s)for(r=e.split("."),n="";r.length>1;){if(n+=r.shift(),i=ot.getter(n,!0)(a),i instanceof Lt)return i.set(r.join("."),t),s;n+="."}return ot.setter(e)(a,t),s},set:function(e,t){var r=this,n=ot.getter(e,!0)(r);n!==t&&(r.trigger("set",{field:e,value:t})||(!r._set(e,r.wrap(t,e,function(){return r}))||e.indexOf("(")>=0||e.indexOf("[")>=0)&&r.trigger(_t,{field:e}))},parent:st,wrap:function(e,t,n){var i,a,s=this,o=Dt.call(e);return null==e||"[object Object]"!==o&&"[object Array]"!==o||(i=e instanceof Gt,a=e instanceof U,"[object Object]"!==o||a||i?("[object Array]"===o||i||a)&&(i||a||(e=new Gt(e)),e.parent()!=n()&&e.bind(_t,r(s,_t,t,!1))):(e instanceof Lt||(e=new Lt(e)),e.parent()!=n()&&(e.bind(mt,r(s,mt,t,!0)),e.bind(_t,r(s,_t,t,!0)))),e.parent=n),e}}),Et={number:function(e){return ot.parseFloat(e)},date:function(e){return ot.parseDate(e)},"boolean":function(e){return typeof e===ft?"true"===e.toLowerCase():null!=e?!!e:e},string:function(e){return null!=e?e+"":e},"default":function(e){return e}},Ht={string:"",number:0,date:new Date,"boolean":!1,"default":""},Jt=Lt.extend({init:function(r){var n=this;(!r||e.isEmptyObject(r))&&(r=e.extend({},n.defaults,r)),Lt.fn.init.call(n,r),n.dirty=!1,n.idField&&(n.id=n.get(n.idField),n.id===t&&(n.id=n._defaultId))},shouldSerialize:function(e){return Lt.fn.shouldSerialize.call(this,e)&&"uid"!==e&&!("id"!==this.idField&&"id"===e)&&"dirty"!==e&&"_accessors"!==e},_parse:function(e,t){var r,n=this,a=e,s=n.fields||{};return e=s[e],e||(e=i(s,a)),e&&(r=e.parse,!r&&e.type&&(r=Et[e.type.toLowerCase()])),r?r(t):t},_notifyChange:function(e){var t=e.action;("add"==t||"remove"==t)&&(this.dirty=!0)},editable:function(e){return e=(this.fields||{})[e],e?e.editable!==!1:!0},set:function(e,t,r){var i=this;i.editable(e)&&(t=i._parse(e,t),n(t,i.get(e))||(i.dirty=!0,Lt.fn.set.call(i,e,t,r)))},accept:function(e){var t,r=this,n=function(){return r};for(t in e)r._set(t,r.wrap(e[t],t,n));r.idField&&(r.id=r.get(r.idField)),r.dirty=!1},isNew:function(){return this.id===this._defaultId}});Jt.define=function(e,r){r===t&&(r=e,e=Jt);var n,i,a,s,o,u,l,f,d=X({defaults:{}},r),c={},h=d.id;if(h&&(d.idField=h),d.id&&delete d.id,h&&(d.defaults[h]=d._defaultId=""),"[object Array]"===Dt.call(d.fields)){for(u=0,l=d.fields.length;l>u;u++)a=d.fields[u],typeof a===ft?c[a]={}:a.field&&(c[a.field]=a);d.fields=c}for(i in d.fields)a=d.fields[i],s=a.type||"default",o=null,f=i,i=typeof a.field===ft?a.field:i,a.nullable||(o=d.defaults[f!==i?f:i]=a.defaultValue!==t?a.defaultValue:Ht[s.toLowerCase()]),r.id===i&&(d._defaultId=o),d.defaults[f!==i?f:i]=o,a.parse=a.parse||Et[s];return n=e.extend(d),n.define=function(e){return Jt.define(n,e)},d.fields&&(n.fields=d.fields,n.idField=d.idField),n},N={selector:function(e){return Z(e)?e:qt(e)},compare:function(e){var t=this.selector(e);return function(e,r){return e=t(e),r=t(r),null==e&&null==r?0:null==e?-1:null==r?1:e.localeCompare?e.localeCompare(r):e>r?1:r>e?-1:0}},create:function(e){var t=e.compare||this.compare(e.field);return"desc"==e.dir?function(e,r){return t(r,e,!0)}:t},combine:function(e){return function(t,r){var n,i,a=e[0](t,r);for(n=1,i=e.length;i>n;n++)a=a||e[n](t,r);return a}}},j=X({},N,{asc:function(e){var t=this.selector(e);return function(e,r){var n=t(e),i=t(r);return n&&n.getTime&&i&&i.getTime&&(n=n.getTime(),i=i.getTime()),n===i?e.__position-r.__position:null==n?-1:null==i?1:n.localeCompare?n.localeCompare(i):n>i?1:-1}},desc:function(e){var t=this.selector(e);return function(e,r){var n=t(e),i=t(r);return n&&n.getTime&&i&&i.getTime&&(n=n.getTime(),i=i.getTime()),n===i?e.__position-r.__position:null==n?1:null==i?-1:i.localeCompare?i.localeCompare(n):i>n?1:-1}},create:function(e){return this[e.dir](e.field)}}),D=function(e,t){var r,n=e.length,i=Array(n);for(r=0;n>r;r++)i[r]=t(e[r],r,e);return i},I=function(){function e(e){return e.replace(Bt,"\\").replace(It,"")}function t(t,r,n,i){var a;return null!=n&&(typeof n===ft&&(n=e(n),a=jt.exec(n),a?n=new Date(+a[1]):i?(n="'"+n.toLowerCase()+"'",r="("+r+" || '').toLowerCase()"):n="'"+n+"'"),n.getTime&&(r="("+r+"?"+r+".getTime():"+r+")",n=n.getTime())),r+" "+t+" "+n}return{eq:function(e,r,n){return t("==",e,r,n)},neq:function(e,r,n){return t("!=",e,r,n)},gt:function(e,r,n){return t(">",e,r,n)},gte:function(e,r,n){return t(">=",e,r,n)},lt:function(e,r,n){return t("<",e,r,n)},lte:function(e,r,n){return t("<=",e,r,n)},startswith:function(t,r,n){return n&&(t="("+t+" || '').toLowerCase()",r&&(r=r.toLowerCase())),r&&(r=e(r)),t+".lastIndexOf('"+r+"', 0) == 0"},endswith:function(t,r,n){return n&&(t="("+t+" || '').toLowerCase()",r&&(r=r.toLowerCase())),r&&(r=e(r)),t+".indexOf('"+r+"', "+t+".length - "+(r||"").length+") >= 0"},contains:function(t,r,n){return n&&(t="("+t+" || '').toLowerCase()",r&&(r=r.toLowerCase())),r&&(r=e(r)),t+".indexOf('"+r+"') >= 0"},doesnotcontain:function(t,r,n){return n&&(t="("+t+" || '').toLowerCase()",r&&(r=r.toLowerCase())),r&&(r=e(r)),t+".indexOf('"+r+"') == -1"}}}(),a.filterExpr=function(e){var r,n,i,s,o,u,l=[],f={and:" && ",or:" || "},d=[],c=[],h=e.filters;for(r=0,n=h.length;n>r;r++)i=h[r],o=i.field,u=i.operator,i.filters?(s=a.filterExpr(i),i=s.expression.replace(/__o\[(\d+)\]/g,function(e,t){return t=+t,"__o["+(c.length+t)+"]"}).replace(/__f\[(\d+)\]/g,function(e,t){return t=+t,"__f["+(d.length+t)+"]"}),c.push.apply(c,s.operators),d.push.apply(d,s.fields)):(typeof o===dt?(s="__f["+d.length+"](d)",d.push(o)):s=ot.expr(o),typeof u===dt?(i="__o["+c.length+"]("+s+", "+i.value+")",c.push(u)):i=I[(u||"eq").toLowerCase()](s,i.value,i.ignoreCase!==t?i.ignoreCase:!0)),l.push(i);return{expression:"("+l.join(f[e.logic])+")",fields:d,operators:c}},B={"==":"eq",equals:"eq",isequalto:"eq",equalto:"eq",equal:"eq","!=":"neq",ne:"neq",notequals:"neq",isnotequalto:"neq",notequalto:"neq",notequal:"neq","<":"lt",islessthan:"lt",lessthan:"lt",less:"lt","<=":"lte",le:"lte",islessthanorequalto:"lte",lessthanequal:"lte",">":"gt",isgreaterthan:"gt",greaterthan:"gt",greater:"gt",">=":"gte",isgreaterthanorequalto:"gte",greaterthanequal:"gte",ge:"gte",notsubstringof:"doesnotcontain"},a.normalizeFilter=u,a.prototype={toArray:function(){return this.data},range:function(e,t){return new a(this.data.slice(e,e+t))},skip:function(e){return new a(this.data.slice(e))},take:function(e){return new a(this.data.slice(0,e))},select:function(e){return new a(D(this.data,e))},order:function(e,t){var r={dir:t};return e&&(e.compare?r.compare=e.compare:r.field=e),new a(this.data.slice(0).sort(N.create(r)))},orderBy:function(e){return this.order(e,"asc")},orderByDescending:function(e){return this.order(e,"desc")},sort:function(e,t,r){var n,i,a=s(e,t),o=[];if(r=r||N,a.length){for(n=0,i=a.length;i>n;n++)o.push(r.create(a[n]));return this.orderBy({compare:r.combine(o)})}return this},filter:function(e){var t,r,n,i,s,o,l,f,d=this.data,c=[];if(e=u(e),!e||0===e.filters.length)return this;for(i=a.filterExpr(e),o=i.fields,l=i.operators,s=f=Function("d, __f, __o","return "+i.expression),(o.length||l.length)&&(f=function(e){return s(e,o,l)}),t=0,n=d.length;n>t;t++)r=d[t],f(r)&&c.push(r);return new a(c)},group:function(e,t){e=f(e||[]),t=t||this.data;var r,n=this,i=new a(n.data);return e.length>0&&(r=e[0],i=i.groupBy(r).select(function(n){var i=new a(t).filter([{field:n.field,operator:"eq",value:n.value}]);return{field:n.field,value:n.value,items:e.length>1?new a(n.items).group(e.slice(1),i.toArray()).toArray():n.items,hasSubgroups:e.length>1,aggregates:i.aggregate(r.aggregates)}})),i},groupBy:function(e){if(tt(e)||!this.data.length)return new a([]);var t,r,n,i,s=e.field,o=this._sortForGrouping(s,e.dir||"asc"),u=ot.accessor(s),l=u.get(o[0],s),f={field:s,value:l,items:[]},c=[f];for(n=0,i=o.length;i>n;n++)t=o[n],r=u.get(t,s),d(l,r)||(l=r,f={field:s,value:l,items:[]},c.push(f)),f.items.push(t);return new a(c)},_sortForGrouping:function(e,t){var r,n,i=this.data;if(!Nt){for(r=0,n=i.length;n>r;r++)i[r].__position=r;for(i=new a(i).sort(e,t,j).toArray(),r=0,n=i.length;n>r;r++)delete i[r].__position;return i}return this.sort(e,t).toArray()},aggregate:function(e){var t,r,n={};if(e&&e.length)for(t=0,r=this.data.length;r>t;t++)c(n,e,this.data[t],t,r);return n}},G={sum:function(e,t,r){return(e||0)+r.get(t)},count:function(e){return(e||0)+1},average:function(e,t,r,n,i){return e=(e||0)+r.get(t),n==i-1&&(e/=i),e},max:function(e,t,r){var n=r.get(t);return e=e||0,n>e&&(e=n),e},min:function(e,t,r){var n=r.get(t);return e=e||n,e>n&&(e=n),e}},a.process=function(e,r){r=r||{};var n,i=new a(e),o=r.group,u=f(o||[]).concat(s(r.sort||[])),l=r.filter,d=r.skip,c=r.take;return l&&(i=i.filter(l),n=i.toArray().length),u&&(i=i.sort(u),o&&(e=i.toArray())),d!==t&&c!==t&&(i=i.range(d,c)),o&&(i=i.group(o,e)),{total:n,data:i.toArray()}},L=lt.extend({init:function(e){this.data=e.data},read:function(e){e.success(this.data)},update:function(e){e.success(e.data)},create:function(e){e.success(e.data)},destroy:function(e){e.success(e.data)}}),E=lt.extend({init:function(e){var t,r=this;e=r.options=X({},r.options,e),at(kt,function(t,r){typeof e[r]===ft&&(e[r]={url:e[r]})}),r.cache=e.cache?H.create(e.cache):{find:st,add:st},t=e.parameterMap,r.parameterMap=Z(t)?t:function(e){var r={};return at(e,function(e,n){e in t&&(e=t[e],et(e)&&(n=e.value(n),e=e.key)),r[e]=n}),r}},options:{parameterMap:xt},create:function(e){return it(this.setup(e,ct))},read:function(r){var n,i,a,s=this,o=s.cache;r=s.setup(r,ht),n=r.success||st,i=r.error||st,a=o.find(r.data),a!==t?n(a):(r.success=function(e){o.add(r.data,e),n(e)},e.ajax(r))},update:function(e){return it(this.setup(e,gt))},destroy:function(e){return it(this.setup(e,pt))},setup:function(e,t){e=e||{};var r,n=this,i=n.options[t],a=Z(i.data)?i.data(e.data):i.data;return e=X(!0,{},i,e),r=X(!0,{},a,e.data),e.data=n.parameterMap(r,t),Z(e.url)&&(e.url=e.url(r)),e}}),H=lt.extend({init:function(){this._store={}},add:function(e,r){e!==t&&(this._store[Ct(e)]=r)},find:function(e){return this._store[Ct(e)]},clear:function(){this._store={}},remove:function(e){delete this._store[Ct(e)]}}),H.create=function(e){var t={inmemory:function(){return new H}};return et(e)&&Z(e.find)?e:e===!0?new H:t[e]()},J=lt.extend({init:function(e){var t,r,n,i,a,s,o,u,l,f,d,c,h,g=this;e=e||{};for(t in e)r=e[t],g[t]=typeof r===ft?qt(r):r;i=e.modelBase||Jt,et(g.model)&&(g.model=n=i.define(g.model)),g.model&&(s=Y(g.data,g),o=Y(g.groups,g),u=Y(g.serialize,g),l={},f={},d={},c={},h=!1,n=g.model,n.fields&&(at(n.fields,function(e,t){var r;a=e,et(t)&&t.field?a=t.field:typeof t===ft&&(a=t),et(t)&&t.from&&(r=t.from),h=h||r&&r!==e||a!==e,f[e]=qt(r||a),d[e]=qt(e),l[r||a]=e,c[e]=r||a}),!e.serialize&&h&&(g.serialize=m(u,n,p,d,l,c))),g.data=m(s,n,_,f,l,c),g.groups=m(o,n,v,f,l,c))},errors:function(e){return e?e.errors:null},parse:xt,data:xt,total:function(e){return e.length},groups:xt,aggregates:function(){return{}},serialize:function(e){return e}}),U=ut.extend({init:function(e){var r,n,i=this;e&&(n=e.data),e=i.options=X({},i.options,e),i._map={},i._prefetch={},i._data=[],i._pristineData=[],i._ranges=[],i._view=[],i._pristine=[],i._destroyed=[],i._pageSize=e.pageSize,i._page=e.page||(e.pageSize?1:t),i._sort=s(e.sort),i._filter=u(e.filter),i._group=f(e.group),i._aggregate=e.aggregate,i._total=e.total,ut.fn.init.call(i),i.transport=V.create(e,n),i.reader=new ot.data.readers[e.schema.type||"json"](e.schema),r=i.reader.model||{},i._data=i._observe(i._data),i.bind([yt,_t,St,vt,bt,wt],e)},options:{data:[],schema:{modelBase:Jt},serverSorting:!1,serverPaging:!1,serverFiltering:!1,serverGrouping:!1,serverAggregates:!1,batch:!1},_isServerGrouped:function(){var e=this.group()||[];return this.options.serverGrouping&&e.length},_flatData:function(e){return this._isServerGrouped()?S(e):e},parent:st,get:function(e){var t,r,n=this._flatData(this._data);for(t=0,r=n.length;r>t;t++)if(n[t].id==e)return n[t]},getByUid:function(e){var t,r,n=this._flatData(this._data);if(n)for(t=0,r=n.length;r>t;t++)if(n[t].uid==e)return n[t]},indexOf:function(e){return C(this._data,e)},at:function(e){return this._data[e]},data:function(e){var r=this;return e===t?r._data:(r._data=this._observe(e),r._ranges=[],r._addRange(r._data),r._total=r._data.length,r._process(r._data),t)},view:function(){return this._view},add:function(e){return this.insert(this._data.length,e)},_createNewModel:function(e){return this.reader.model?new this.reader.model(e):new Lt(e)},insert:function(e,t){return t||(t=e,e=0),t instanceof Jt||(t=this._createNewModel(t)),this._isServerGrouped()?this._data.splice(e,0,x(this.group(),t)):this._data.splice(e,0,t),t},remove:function(e){var r,n=this,i=n._isServerGrouped();return this._eachItem(n._data,function(a){return r=k(a,e),r&&i?(r.isNew&&r.isNew()||n._destroyed.push(r),!0):t}),e},sync:function(){var t,r,n,i=this,a=[],s=[],o=i._destroyed,u=i._flatData(i._data);if(i.reader.model){for(t=0,r=u.length;r>t;t++)u[t].isNew()?a.push(u[t]):u[t].dirty&&s.push(u[t]);n=i._send("create",a),n.push.apply(n,i._send("update",s)),n.push.apply(n,i._send("destroy",o)),e.when.apply(null,n).then(function(){var e,t;for(e=0,t=arguments.length;t>e;e++)i._accept(arguments[e]);i._change({action:"sync"}),i.trigger(vt)})}},cancelChanges:function(e){var t=this;e instanceof ot.data.Model?t._cancelModel(e):(t._destroyed=[],t._data=t._observe(t._pristineData),t.options.serverPaging&&(t._total=t.reader.total(t._pristine)),t._change())},hasChanges:function(){var e,t,r=this._data;if(this._destroyed.length)return!0;for(e=0,t=r.length;t>e;e++)if(r[e].isNew()||r[e].dirty)return!0;return!1},_accept:function(t){var r,n=this,i=t.models,a=t.response,s=0,o=n._isServerGrouped(),u=n._pristineData,l=t.type;if(n.trigger(bt,{response:a,type:l}),a&&!tt(a)){if(a=n.reader.parse(a),n._handleCustomErrors(a))return;a=n.reader.data(a),e.isArray(a)||(a=[a])}else a=e.map(i,function(e){return e.toJSON()});for("destroy"===l&&(n._destroyed=[]),s=0,r=i.length;r>s;s++)"destroy"!==l?(i[s].accept(a[s]),"create"===l?u.push(o?x(n.group(),i[s]):a[s]):"update"===l&&n._updatePristineForModel(i[s],a[s])):n._removePristineForModel(i[s])},_updatePristineForModel:function(e,t){this._executeOnPristineForModel(e,function(e,r){ot.deepExtend(r[e],t)})},_executeOnPristineForModel:function(e,r){this._eachPristineItem(function(n){var i=q(n,e);return i>-1?(r(i,n),!0):t})},_removePristineForModel:function(e){this._executeOnPristineForModel(e,function(e,t){t.splice(e,1)})},_readData:function(e){var t=this._isServerGrouped()?this.reader.groups:this.reader.data;return t(e)},_eachPristineItem:function(e){this._eachItem(this._pristineData,e)},_eachItem:function(e,t){e&&e.length&&(this._isServerGrouped()?b(e,t):t(e))},_pristineForModel:function(e){var r,n,i=function(i){return n=q(i,e),n>-1?(r=i[n],!0):t};return this._eachPristineItem(i),r},_cancelModel:function(e){var t,r=this._pristineForModel(e);this._eachItem(this._data,function(n){t=C(n,e),-1!=t&&(!e.isNew()&&r?n[t].accept(r):n.splice(t,1))})},_promise:function(t,r,n){var i=this,a=i.transport;return e.Deferred(function(e){i.trigger(St),a[n].call(a,X({success:function(t){e.resolve({response:t,models:r,type:n})},error:function(t,r,n){e.reject(t),i.error(t,r,n)}},t))}).promise()},_send:function(e,t){var r,n,i=this,a=[],s=i.reader.serialize(h(t));if(i.options.batch)t.length&&a.push(i._promise({data:{models:s}},t,e));else for(r=0,n=t.length;n>r;r++)a.push(i._promise({data:s[r]},[t[r]],e));return a},read:function(e){var t=this,r=t._params(e);t._queueRequest(r,function(){t.trigger(St)?t._dequeueRequest():(t.trigger(wt),t._ranges=[],t.transport.read({data:r,success:Y(t.success,t),error:Y(t.error,t)}))})},success:function(r){var n=this,i=n.options;return n.trigger(bt,{response:r,type:"read"}),r=n.reader.parse(r),n._handleCustomErrors(r)?(n._dequeueRequest(),t):(n._pristine=et(r)?e.extend(!0,{},r):r.slice?r.slice(0):r,n._total=n.reader.total(r),n._aggregate&&i.serverAggregates&&(n._aggregateResult=n.reader.aggregates(r)),r=n._readData(r),n._pristineData=r.slice(0),n._data=n._observe(r),n._addRange(n._data),n._process(n._data),n._dequeueRequest(),t)},_addRange:function(e){var t=this,r=t._skip||0,n=r+t._flatData(e).length;t._ranges.push({start:r,end:n,data:e}),t._ranges.sort(function(e,t){return e.start-t.start})},error:function(e,t,r){this._dequeueRequest(),this.trigger(bt,{}),this.trigger(yt,{xhr:e,status:t,errorThrown:r})},_params:function(e){var t=this,r=X({take:t.take(),skip:t.skip(),page:t.page(),pageSize:t.pageSize(),sort:t._sort,filter:t._filter,group:t._group,aggregate:t._aggregate},e);return t.options.serverPaging||(delete r.take,delete r.skip,delete r.page,delete r.pageSize),t.options.serverGrouping?t.reader.model&&r.group&&(r.group=R(r.group,t.reader.model)):delete r.group,t.options.serverFiltering?t.reader.model&&r.filter&&(r.filter=F(r.filter,t.reader.model)):delete r.filter,t.options.serverSorting?t.reader.model&&r.sort&&(r.sort=R(r.sort,t.reader.model)):delete r.sort,t.options.serverAggregates?t.reader.model&&r.aggregate&&(r.aggregate=R(r.aggregate,t.reader.model)):delete r.aggregate,r},_queueRequest:function(e,r){var n=this;n._requestInProgress?n._pending={callback:Y(r,n),options:e}:(n._requestInProgress=!0,n._pending=t,r())},_dequeueRequest:function(){var e=this;e._requestInProgress=!1,e._pending&&e._queueRequest(e._pending.options,e._pending.callback)},_handleCustomErrors:function(e){if(this.reader.errors){var t=this.reader.errors(e);if(t)return this.trigger(yt,{xhr:null,status:"customerror",errorThrown:"custom error",errors:t}),!0}return!1},_observe:function(e){var t=this,r=t.reader.model,n=!1;return r&&e.length&&(n=!(e[0]instanceof r)),e instanceof Gt?n&&(e.type=t.reader.model,e.wrapAll(e,e)):(e=new Gt(e,t.reader.model),e.parent=function(){return t.parent()}),t._isServerGrouped()&&w(e,r),t._changeHandler&&t._data&&t._data instanceof Gt?t._data.unbind(_t,t._changeHandler):t._changeHandler=Y(t._change,t),e.bind(_t,t._changeHandler)},_change:function(e){var t,r,n,i=this,a=e?e.action:"";if("remove"===a)for(t=0,r=e.items.length;r>t;t++)e.items[t].isNew&&e.items[t].isNew()||i._destroyed.push(e.items[t]);!i.options.autoSync||"add"!==a&&"remove"!==a&&"itemchange"!==a?(n=i._total||i.reader.total(i._pristine),"add"===a?n+=e.items.length:"remove"===a?n-=e.items.length:"itemchange"===a||"sync"===a||i.options.serverPaging||(n=i.reader.total(i._pristine)),i._total=n,i._process(i._data,e)):i.sync()},_process:function(e,r){var n,i=this,s={};i.options.serverPaging!==!0&&(s.skip=i._skip,s.take=i._take||i._pageSize,s.skip===t&&i._page!==t&&i._pageSize!==t&&(s.skip=(i._page-1)*i._pageSize)),i.options.serverSorting!==!0&&(s.sort=i._sort),i.options.serverFiltering!==!0&&(s.filter=i._filter),i.options.serverGrouping!==!0&&(s.group=i._group),i.options.serverAggregates!==!0&&(s.aggregate=i._aggregate,i._aggregateResult=g(e,s)),n=a.process(e,s),i._view=n.data,n.total===t||i.options.serverFiltering||(i._total=n.total),r=r||{},r.items=r.items||i._view,i.trigger(_t,r)},_mergeState:function(e){var r=this;return e!==t&&(r._pageSize=e.pageSize,r._page=e.page,r._sort=e.sort,r._filter=e.filter,r._group=e.group,r._aggregate=e.aggregate,r._skip=e.skip,r._take=e.take,r._skip===t&&(r._skip=r.skip(),e.skip=r.skip()),r._take===t&&r._pageSize!==t&&(r._take=r._pageSize,e.take=r._take),e.sort&&(r._sort=e.sort=s(e.sort)),e.filter&&(r._filter=e.filter=u(e.filter)),e.group&&(r._group=e.group=f(e.group)),e.aggregate&&(r._aggregate=e.aggregate=l(e.aggregate))),e},query:function(e){var r,n=this,i=n.options.serverSorting||n.options.serverPaging||n.options.serverFiltering||n.options.serverGrouping||n.options.serverAggregates;i||(n._data===t||0===n._data.length)&&!n._destroyed.length?n.read(n._mergeState(e)):n.trigger(St)||(n.trigger(wt),r=a.process(n._data,n._mergeState(e)),n.options.serverFiltering||(n._total=r.total!==t?r.total:n._data.length),n._view=r.data,n._aggregateResult=g(n._data,e),n.trigger(bt,{}),n.trigger(_t,{items:r.data}))},fetch:function(t){var r=this;return e.Deferred(function(e){var n=function(n){r.unbind(yt,i),e.resolve(),t&&t.call(r,n)},i=function(t){e.reject(t)};r.one(_t,n),r.one(yt,i),r._query()}).promise()},_query:function(e){var t=this;t.query(X({},{page:t.page(),pageSize:t.pageSize(),sort:t.sort(),filter:t.filter(),group:t.group(),aggregate:t.aggregate()},e))},next:function(e){var r=this,n=r.page(),i=r.total();return e=e||{},!n||i&&n+1>r.totalPages()?t:(r._skip=n*r.take(),n+=1,e.page=n,r._query(e),n)},prev:function(e){var r=this,n=r.page();return e=e||{},n&&1!==n?(r._skip=r._skip-r.take(),n-=1,e.page=n,r._query(e),n):t},page:function(e){var r,n=this;return e!==t?(e=zt.max(zt.min(zt.max(e,1),n.totalPages()),1),n._query({page:e}),t):(r=n.skip(),r!==t?zt.round((r||0)/(n.take()||1))+1:t)},pageSize:function(e){var r=this;return e!==t?(r._query({pageSize:e,page:1}),t):r.take()},sort:function(e){var r=this;return e!==t?(r._query({sort:e}),t):r._sort},filter:function(e){var r=this;return e===t?r._filter:(r._query({filter:e,page:1}),t)},group:function(e){var r=this;return e!==t?(r._query({group:e}),t):r._group},total:function(){return this._total||0},aggregate:function(e){var r=this;return e!==t?(r._query({aggregate:e}),t):r._aggregate},aggregates:function(){return this._aggregateResult},totalPages:function(){var e=this,t=e.pageSize()||e.total();return zt.ceil((e.total()||0)/t)},inRange:function(e,t){var r=this,n=zt.min(e+t,r.total());return!r.options.serverPaging&&r.data.length>0?!0:r._findRange(e,n).length>0},lastRange:function(){var e=this._ranges;return e[e.length-1]||{start:0,end:0,data:[]}},firstItemUid:function(){var e=this._ranges;return e.length&&e[0].data.length&&e[0].data[0].uid},range:function(e,r){var n,i,a,s,o,u,l;if(e=zt.min(e||0,this.total()),i=this,a=zt.max(zt.floor(e/r),0)*r,s=zt.min(a+r,i.total()),n=i._findRange(e,zt.min(e+r,i.total())),n.length){i._skip=e>i.skip()?zt.min(s,(i.totalPages()-1)*i.take()):a,i._take=r,o=i.options.serverPaging,u=i.options.serverSorting,l=i.options.serverFiltering;try{i.options.serverPaging=!0,i.options.serverSorting=!0,i.options.serverFiltering=!0,o&&(i._data=n=i._observe(n)),i._process(n)}finally{i.options.serverPaging=o,i.options.serverSorting=u,i.options.serverFiltering=l}}else r!==t&&(i._rangeExists(a,s)?e>a&&i.prefetch(s,r,function(){i.range(e,r)}):i.prefetch(a,r,function(){e>a&&s<i.total()&&!i._rangeExists(s,zt.min(s+r,i.total()))?i.prefetch(s,r,function(){i.range(e,r)}):i.range(e,r)}))},_findRange:function(e,r){var n,i,o,u,l,d,c,h,g,p,_,v,m=this,y=m._ranges,S=[],w=m.options,b=w.serverSorting||w.serverPaging||w.serverFiltering||w.serverGrouping||w.serverAggregates;for(i=0,_=y.length;_>i;i++)if(n=y[i],e>=n.start&&e<=n.end){for(p=0,o=i;_>o;o++)if(n=y[o],g=m._flatData(n.data),g.length&&e+p>=n.start&&(d=n.data,c=n.end,b||(v=f(m.group()||[]).concat(s(m.sort()||[])),h=a.process(n.data,{sort:v,filter:m.filter()}),g=d=h.data,h.total!==t&&(c=h.total)),u=0,e+p>n.start&&(u=e+p-n.start),l=g.length,c>r&&(l-=c-r),p+=l-u,S=m._mergeGroups(S,d,u,l),r<=n.end&&p==r-e))return S;break}return[]},_mergeGroups:function(e,t,r,n){if(this._isServerGrouped()){var i,a=t.toJSON();return e.length&&(i=e[e.length-1]),y(i,a,r,n),e.concat(a)}return e.concat(t.slice(r,n))},skip:function(){var e=this;return e._skip===t?e._page!==t?(e._page-1)*(e.take()||1):t:e._skip},take:function(){return this._take||this._pageSize},_prefetchSuccessHandler:function(e,t,r){var n=this;
return function(i){var a,s,o=!1,u={start:e,end:t,data:[]};for(n._dequeueRequest(),a=0,s=n._ranges.length;s>a;a++)if(n._ranges[a].start===e){o=!0,u=n._ranges[a];break}o||n._ranges.push(u),n.trigger(bt,{response:i,type:"read"}),i=n.reader.parse(i),u.data=n._observe(n._readData(i)),u.end=u.start+n._flatData(u.data).length,n._ranges.sort(function(e,t){return e.start-t.start}),n._total=n.reader.total(i),r&&r()}},prefetch:function(e,t,r){var n=this,i=zt.min(e+t,n.total()),a={take:t,skip:e,page:e/t+1,pageSize:t,sort:n._sort,filter:n._filter,group:n._group,aggregate:n._aggregate};n._rangeExists(e,i)?r&&r():(clearTimeout(n._timeout),n._timeout=setTimeout(function(){n._queueRequest(a,function(){n.trigger(St)?n._dequeueRequest():n.transport.read({data:a,success:n._prefetchSuccessHandler(e,i,r)})})},100))},_rangeExists:function(e,t){var r,n,i=this,a=i._ranges;for(r=0,n=a.length;n>r;r++)if(a[r].start<=e&&a[r].end>=t)return!0;return!1}}),V={},V.create=function(e,t){var r,n=e.transport;return n?(n.read=typeof n.read===ft?{url:n.read}:n.read,e.type&&(ot.data.transports[e.type]&&!et(ot.data.transports[e.type])?r=new ot.data.transports[e.type](X(n,{data:t})):n=X(!0,{},ot.data.transports[e.type],n),e.schema=X(!0,{},ot.data.schemas[e.type],e.schema)),r||(r=Z(n.read)?n:new E(n))):r=new L({data:e.data}),r},U.create=function(e){e=e&&e.push?{data:e}:e;var t,r,n,i=e||{},a=i.data,s=i.fields,o=i.table,u=i.select,l={};if(a||!s||i.transport||(o?a=T(o,s):u&&(a=P(u,s))),ot.data.Model&&s&&(!i.schema||!i.schema.model)){for(t=0,r=s.length;r>t;t++)n=s[t],n.type&&(l[n.field]=n);tt(l)||(i.schema=X(!0,i.schema,{model:{fields:l}}))}return i.data=a,i instanceof U?i:new U(i)},W=Jt.define({init:function(e){var t,r=this,n=r.hasChildren||e&&e.hasChildren,i="items",a={};ot.data.Model.fn.init.call(r,e),typeof r.children===ft&&(i=r.children),a={schema:{data:i,model:{hasChildren:n,id:r.idField}}},typeof r.children!==ft&&X(a,r.children),t=a.transport,t&&(t.parameterMap=function(e){return r.parentParameterMap&&(e=r.parentParameterMap.call(this,e)),e[r.idField||"id"]=r.id,e}),a.data=e,n||(n=a.schema.data),typeof n===ft&&(n=ot.getter(n)),Z(n)&&(r.hasChildren=!!n.call(r,r)),r._childrenOptions=a,r.hasChildren&&r._initChildren(),r._loaded=!(!e||!e[i]&&!e._loaded)},_initChildren:function(){var e=this;e.children instanceof Q||(e.children=new Q(e._childrenOptions),e.children.parent=function(){return e},e.children.bind(_t,function(t){t.node=t.node||e,e.trigger(_t,t)}),e.children.bind(yt,function(t){var r=e.parent();r&&(t.node=t.node||e,r.trigger(yt,t))}),e._updateChildrenField())},append:function(e){this._initChildren(),this.loaded(!0),this.children.add(e)},hasChildren:!1,level:function(){for(var e=this.parentNode(),t=0;e&&e.parentNode;)t++,e=e.parentNode?e.parentNode():null;return t},_updateChildrenField:function(){var e=this._childrenOptions.schema.data;this[e||"items"]=this.children.data()},load:function(){var e=this,r={};e.hasChildren&&(e._initChildren(),r[e.idField||"id"]=e.id,e._loaded||(e.children._data=t),e.children.one(_t,function(){e._loaded=!0,e._updateChildrenField()})._query(r))},parentNode:function(){var e=this.parent();return e.parent()},loaded:function(e){return e===t?this._loaded:(this._loaded=e,t)},shouldSerialize:function(e){return Jt.fn.shouldSerialize.call(this,e)&&"children"!==e&&"_loaded"!==e&&"hasChildren"!==e&&"_childrenOptions"!==e}}),Q=U.extend({init:function(e){var t=W.define({children:e});U.fn.init.call(this,X(!0,{},{schema:{modelBase:t,model:t}},e)),this.transport&&(t.fn.parentParameterMap=this.transport.parameterMap),this._attachBubbleHandlers()},_attachBubbleHandlers:function(){var e=this;e._data.bind(yt,function(t){e.trigger(yt,t)})},remove:function(e){var t,r=e.parentNode(),n=this;return r&&r._initChildren&&(n=r.children),t=U.fn.remove.call(n,e),r&&!n.data().length&&(r.hasChildren=!1),t},success:M("success"),data:M("data"),insert:function(e,t){var r=this.parent();return r&&r._initChildren&&(r.hasChildren=!0,r._initChildren()),U.fn.insert.call(this,e,t)},_find:function(e,t){var r,n,i,a,s;if(i=U.fn[e].call(this,t))return i;if(a=this._flatData(this.data()))for(r=0,n=a.length;n>r;r++)if(s=a[r].children,s instanceof Q&&(i=s[e](t)))return i},get:function(e){return this._find("get",e)},getByUid:function(e){return this._find("getByUid",e)}}),Q.create=function(e){e=e&&e.push?{data:e}:e;var t=e||{},r=t.data,n=t.fields,i=t.list;return r&&r._dataSource?r._dataSource:(r||!n||t.transport||i&&(r=A(i,n)),t.data=r,t instanceof Q?t:new Q(t))},$=ot.Observable.extend({init:function(e,t,r){ot.Observable.fn.init.call(this),this._prefetching=!1,this.dataSource=e,this.prefetch=!r;var n=this;e.bind("change",function(){n._change()}),this._syncWithDataSource(),this.setViewSize(t)},setViewSize:function(e){this.viewSize=e,this._recalculate()},at:function(e){var r,n,i=this.pageSize;return e>=this.total()?(this.trigger("endreached",{index:e}),t):((e<this.dataOffset||e>this.skip+i)&&(r=Math.floor(e/i)*i,this.range(r)),e===this.prefetchThreshold&&this._prefetch(),e===this.midPageThreshold?this.range(this.nextMidRange):e===this.nextPageThreshold?this.range(this.nextFullRange):e===this.pullBackThreshold&&(this.offset===this.skip?this.range(this.previousMidRange):this.range(this.previousFullRange)),n=this.dataSource.at(e-this.dataOffset),n===t&&this.trigger("endreached",{index:e}),n)},indexOf:function(e){return this.dataSource.data().indexOf(e)+this.dataOffset},_prefetch:function(){var e=this,t=this.pageSize,r=this.skip+t,n=this.dataSource;n.inRange(r,t)||this._prefetching||!this.prefetch||(this._prefetching=!0,this.trigger("prefetching",{skip:r,take:t}),n.prefetch(r,t,function(){e._prefetching=!1,e.trigger("prefetched",{skip:r,take:t})}))},total:function(){return parseInt(this.dataSource.total(),10)},next:function(){var e=this,t=e.pageSize,r=e.skip-e.viewSize,n=zt.max(zt.floor(r/t),0)*t+t;this.offset=r,this.dataSource.prefetch(n,t,function(){e._goToRange(r,!0)})},range:function(e){if(this.offset!==e){var t=this,r=this.pageSize,n=zt.max(zt.floor(e/r),0)*r+r,i=this.dataSource;this.offset=e,this._recalculate(),i.inRange(e,r)?this._goToRange(e):this.prefetch&&i.prefetch(n,r,function(){t._goToRange(e,!0)})}},syncDataSource:function(){var e=this.offset;this.offset=null,this.range(e)},_goToRange:function(e,t){this.offset===e&&(this.dataOffset=e,this._expanding=t,this.dataSource.range(e,this.pageSize))},_change:function(){var e=this.dataSource,t=e.firstItemUid();this.length=e.lastRange().end,this._firstItemUid!==t&&(this._syncWithDataSource(),this._recalculate(),this.trigger("reset",{offset:this.offset})),this.trigger("resize"),this._expanding&&this.trigger("expand"),delete this._expanding},_syncWithDataSource:function(){var e=this.dataSource;this._firstItemUid=e.firstItemUid(),this.dataOffset=this.offset=e.skip(),this.pageSize=e.pageSize()},_recalculate:function(){var e=this.pageSize,t=this.offset,r=this.viewSize,n=Math.ceil(t/e)*e;this.skip=n,this.midPageThreshold=n+e-1,this.nextPageThreshold=n+r-1,this.prefetchThreshold=n+Math.floor(2*(e/3)),this.pullBackThreshold=this.offset-1,this.nextMidRange=n+e-r,this.nextFullRange=n,this.previousMidRange=t-r,this.previousFullRange=n-e}}),K=ot.Observable.extend({init:function(e,t){var r=this;ot.Observable.fn.init.call(r),this.dataSource=e,this.batchSize=t,this._total=0,this.buffer=new $(e,3*t),this.buffer.bind({endreached:function(e){r.trigger("endreached",{index:e.index})},prefetching:function(e){r.trigger("prefetching",{skip:e.skip,take:e.take})},prefetched:function(e){r.trigger("prefetched",{skip:e.skip,take:e.take})},reset:function(){r._total=0,r.trigger("reset")},resize:function(){r._total=this.length/r.batchSize,r.trigger("resize",{total:r.total(),offset:this.offset})}})},syncDataSource:function(){this.buffer.syncDataSource()},at:function(e){var r,n,i=this.buffer,a=e*this.batchSize,s=this.batchSize,o=[];for(i.offset>a&&i.at(i.offset-1),n=0;s>n;n++){if(r=i.at(a+n),r===t)return;o.push(r)}return o},total:function(){return this._total}}),X(!0,ot.data,{readers:{json:J},Query:a,DataSource:U,HierarchicalDataSource:Q,Node:W,ObservableObject:Lt,ObservableArray:Gt,LocalTransport:L,RemoteTransport:E,Cache:H,DataReader:J,Model:Jt,Buffer:$,BatchBuffer:K})}(window.kendo.jQuery)});
/*
* Kendo UI Complete v2013.2.716 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
("function"==typeof define&&define.amd?define:function(e,t){return t()})(["./kendo.core.min","./kendo.data.min"],function(){!function(e,t){function n(e){var t,i,s=[];for(t=0,i=e.length;i>t;t++)s=e[t].hasSubgroups?s.concat(n(e[t].items)):s.concat(e[t].items);return s}function i(e,n,i){var s=i[e];return s?new y(x.initWidget(n,s.options,i)):t}function s(e){var t,n,i,a,r,o,h,d={};for(h=e.match(_),t=0,n=h.length;n>t;t++)i=h[t],a=i.indexOf(":"),r=i.substring(0,a),o=i.substring(a+1),"{"==o.charAt(0)&&(o=s(o)),d[r]=o;return d}function a(e,t,n){var i,s={};for(i in e)s[i]=new n(t,e[i]);return s}function r(e,t,n,o){var d,c,l,u=e.getAttribute("data-"+x.ns+"role"),g=e.getAttribute("data-"+x.ns+"bind"),p=e.children,y=[],_=!0,B={};if(o=o||[t],(u||g)&&h(e),u&&(l=i(u,e,n)),g&&(g=s(g.replace(w,"")),l||(B=x.parseOptions(e,{textField:"",valueField:"",template:"",valueUpdate:j,valuePrimitive:!1}),B.roles=n,l=new m(e,B)),l.source=t,c=a(g,o,f),B.template&&(c.template=new v(o,"",B.template)),c.click&&(g.events=g.events||{},g.events.click=g.click,delete c.click),c.source&&(_=!1),g.attr&&(c.attr=a(g.attr,o,f)),g.style&&(c.style=a(g.style,o,f)),g.events&&(c.events=a(g.events,o,b)),l.bind(c)),l&&(e.kendoBindingTarget=l),_&&p){for(d=0;d<p.length;d++)y[d]=p[d];for(d=0;d<y.length;d++)r(y[d],t,n,o)}}function o(t,n){var i,s,a,o=x.rolesFromNamespaces([].slice.call(arguments,2));for(n=x.observable(n),t=e(t),i=0,s=t.length;s>i;i++)a=t[i],1===a.nodeType&&r(a,n,o)}function h(t){var n=t.kendoBindingTarget;n&&(n.destroy(),e.support.deleteExpando?delete t.kendoBindingTarget:t.removeAttribute?t.removeAttribute("kendoBindingTarget"):t.kendoBindingTarget=null)}function d(e){h(e),c(e)}function c(e){var t,n,i=e.children;if(i)for(t=0,n=i.length;n>t;t++)d(i[t])}function l(t){var n,i;for(t=e(t),n=0,i=t.length;i>n;n++)d(t[n])}function u(e,t){var n=e.element,i=n[0].kendoBindingTarget;i&&o(n,i.source,t)}var g,f,b,v,p,m,y,_,w,x=window.kendo,B=x.Observable,C=x.data.ObservableObject,k=x.data.ObservableArray,A={}.toString,F={},S=x.Class,O=e.proxy,T="value",N="source",D="events",I="checked",j="change";!function(){var e=document.createElement("a");e.innerText!==t?g="innerText":e.textContent!==t&&(g="textContent")}(),f=B.extend({init:function(e,t){var n=this;B.fn.init.call(n),n.source=e[0],n.parents=e,n.path=t,n.dependencies={},n.dependencies[t]=!0,n.observable=n.source instanceof B,n._access=function(e){n.dependencies[e.field]=!0},n.observable&&(n._change=function(e){n.change(e)},n.source.bind(j,n._change))},_parents:function(){var t,n=this.parents,i=this.get();return i&&"function"==typeof i.parent&&(t=i.parent(),e.inArray(t,n)<0&&(n=[t].concat(n))),n},change:function(e){var t,n,i=e.field,s=this;if("this"===s.path)s.trigger(j,e);else for(t in s.dependencies)if(0===t.indexOf(i)&&(n=t.charAt(i.length),!n||"."===n||"["===n)){s.trigger(j,e);break}},start:function(e){e.bind("get",this._access)},stop:function(e){e.unbind("get",this._access)},get:function(){var e=this,n=e.source,i=0,s=e.path,a=n;if(!e.observable)return a;for(e.start(e.source),a=n.get(s);a===t&&n;)n=e.parents[++i],n instanceof C&&(a=n.get(s));if(a===t)for(n=e.source;a===t&&n;)n=n.parent(),n instanceof C&&(a=n.get(s));return"function"==typeof a&&(i=s.lastIndexOf("."),i>0&&(n=n.get(s.substring(0,i))),e.start(n),a=a.call(n,e.source),e.stop(n)),n&&n!==e.source&&(e.currentSource=n,n.unbind(j,e._change).bind(j,e._change)),e.stop(e.source),a},set:function(e){var t=this,n=t.currentSource||t.source;n.set(t.path,e)},destroy:function(){this.observable&&this.source.unbind(j,this._change)}}),b=f.extend({get:function(){var e,t=this.source,n=this.path,i=0;for(e=t.get(n);!e&&t;)t=this.parents[++i],t instanceof C&&(e=t.get(n));return O(e,t)}}),v=f.extend({init:function(e,t,n){var i=this;f.fn.init.call(i,e,t),i.template=n},render:function(e){var t;return this.start(this.source),t=x.render(this.template,e),this.stop(this.source),t}}),p=S.extend({init:function(e,t,n){this.element=e,this.bindings=t,this.options=n},bind:function(e,t){var n=this;e=t?e[t]:e,e.bind(j,function(e){n.refresh(t||e)}),n.refresh(t)},destroy:function(){}}),F.attr=p.extend({refresh:function(e){this.element.setAttribute(e,this.bindings.attr[e].get())}}),F.style=p.extend({refresh:function(e){this.element.style[e]=this.bindings.style[e].get()||""}}),F.enabled=p.extend({refresh:function(){this.bindings.enabled.get()?this.element.removeAttribute("disabled"):this.element.setAttribute("disabled","disabled")}}),F.readonly=p.extend({refresh:function(){this.bindings.readonly.get()?this.element.setAttribute("readonly","readonly"):this.element.removeAttribute("readonly")}}),F.disabled=p.extend({refresh:function(){this.bindings.disabled.get()?this.element.setAttribute("disabled","disabled"):this.element.removeAttribute("disabled")}}),F.events=p.extend({init:function(e,t,n){p.fn.init.call(this,e,t,n),this.handlers={}},refresh:function(t){var n=e(this.element),i=this.bindings.events[t],s=this.handlers[t];s&&n.off(t,s),s=this.handlers[t]=i.get(),n.on(t,i.source,s)},destroy:function(){var t,n=e(this.element);for(t in this.handlers)n.off(t,this.handlers[t])}}),F.text=p.extend({refresh:function(){var e=this.bindings.text.get();null==e&&(e=""),this.element[g]=e}}),F.visible=p.extend({refresh:function(){this.element.style.display=this.bindings.visible.get()?"":"none"}}),F.invisible=p.extend({refresh:function(){this.element.style.display=this.bindings.invisible.get()?"none":""}}),F.html=p.extend({refresh:function(){this.element.innerHTML=this.bindings.html.get()}}),F.value=p.extend({init:function(t,n,i){p.fn.init.call(this,t,n,i),this._change=O(this.change,this),this.eventName=i.valueUpdate||j,e(this.element).on(this.eventName,this._change),this._initChange=!1},change:function(){this._initChange=this.eventName!=j,this.bindings[T].set(this.element.value),this._initChange=!1},refresh:function(){if(!this._initChange){var e=this.bindings[T].get();null==e&&(e=""),this.element.value=e}this._initChange=!1},destroy:function(){e(this.element).off(this.eventName,this._change)}}),F.source=p.extend({init:function(e,t,n){p.fn.init.call(this,e,t,n)},refresh:function(e){var t=this,n=t.bindings.source.get();n instanceof k?(e=e||{},"add"==e.action?t.add(e.index,e.items):"remove"==e.action?t.remove(e.index,e.items):"itemchange"!=e.action&&t.render()):t.render()},container:function(){var e=this.element;return"table"==e.nodeName.toLowerCase()&&(e.tBodies[0]||e.appendChild(document.createElement("tbody")),e=e.tBodies[0]),e},template:function(){var e=this.options,t=e.template,n=this.container().nodeName.toLowerCase();return t||(t="select"==n?e.valueField||e.textField?x.format('<option value="#:{0}#">#:{1}#</option>',e.valueField||e.textField,e.textField||e.valueField):"<option>#:data#</option>":"tbody"==n?"<tr><td>#:data#</td></tr>":"ul"==n||"ol"==n?"<li>#:data#</li>":"#:data#",t=x.template(t)),t},destroy:function(){var e=this.bindings.source.get();e.unbind(j,this._change)},add:function(t,n){var i,s,a,o,h=this.container(),d=h.cloneNode(!1),c=h.children[t];if(e(d).html(x.render(this.template(),n)),d.children.length)for(i=this.bindings.source._parents(),s=0,a=n.length;a>s;s++)o=d.children[0],h.insertBefore(o,c||null),r(o,n[s],this.options.roles,[n[s]].concat(i))},remove:function(e,t){var n,i,s=this.container();for(n=0;n<t.length;n++)i=s.children[e],d(i),s.removeChild(i)},render:function(){var t,n,i,s,a=this.bindings.source.get(),o=this.container(),h=this.template();if(a instanceof k||"[object Array]"===A.call(a)||(a.parent&&(s=a.parent),a=new k([a]),a.parent&&(a.parent=s)),this.bindings.template){if(c(o),e(o).html(this.bindings.template.render(a)),o.children.length)for(t=this.bindings.source._parents(),n=0,i=a.length;i>n;n++)r(o.children[n],a[n],this.options.roles,[a[n]].concat(t))}else e(o).html(x.render(h,a))}}),F.input={checked:p.extend({init:function(t,n,i){p.fn.init.call(this,t,n,i),this._change=O(this.change,this),e(this.element).change(this._change)},change:function(){var e,t,n=this.element,i=this.value();"radio"==n.type?this.bindings[I].set(i):"checkbox"==n.type&&(e=this.bindings[I].get(),e instanceof k?(i=this.element.value,"on"!==i&&"off"!==i&&(t=e.indexOf(i),t>-1?e.splice(t,1):e.push(i))):this.bindings[I].set(i))},refresh:function(){var e=this.bindings[I].get(),t=e,n=this.element;"checkbox"==n.type?(t instanceof k&&(e=this.element.value,t.indexOf(e)>=0&&(e=!0)),n.checked=e===!0):"radio"==n.type&&null!=e&&n.value===""+e&&(n.checked=!0)},value:function(){var e=this.element,t=e.value;return"checkbox"==e.type&&(t=e.checked),t},destroy:function(){e(this.element).off(j,this._change)}})},F.select={value:p.extend({init:function(t,n,i){p.fn.init.call(this,t,n,i),this._change=O(this.change,this),e(this.element).change(this._change)},change:function(){var e,t,n,i,s,a,r=[],o=this.element,h=this.options.valueField||this.options.textField,d=this.options.valuePrimitive;for(s=0,a=o.options.length;a>s;s++)t=o.options[s],t.selected&&(i=t.attributes.value,i=i&&i.specified?t.value:t.text,r.push(i));if(h)for(e=this.bindings.source.get(),n=0;n<r.length;n++)for(s=0,a=e.length;a>s;s++)if(e[s].get(h)==r[n]){r[n]=e[s];break}i=this.bindings[T].get(),i instanceof k?i.splice.apply(i,[0,i.length].concat(r)):d||!(i instanceof C)&&h?this.bindings[T].set(r[0].get(h)):this.bindings[T].set(r[0])},refresh:function(){var e,t,n,i=this.element,s=i.options,a=this.bindings[T].get(),r=a,o=this.options.valueField||this.options.textField,h=!1;for(r instanceof k||(r=new k([a])),i.selectedIndex=-1,n=0;n<r.length;n++)for(a=r[n],o&&a instanceof C&&(a=a.get(o)),e=0;e<s.length;e++)t=s[e].value,""===t&&""!==a&&(t=s[e].text),t==a&&(s[e].selected=!0,h=!0)},destroy:function(){e(this.element).off(j,this._change)}})},F.widget={events:p.extend({init:function(e,t,n){p.fn.init.call(this,e.element[0],t,n),this.widget=e,this.handlers={}},refresh:function(e){var t=this.bindings.events[e],n=this.handlers[e];n&&this.widget.unbind(e,n),n=t.get(),this.handlers[e]=function(e){e.data=t.source,n(e),e.data===t.source&&delete e.data},this.widget.bind(e,this.handlers[e])},destroy:function(){var e;for(e in this.handlers)this.widget.unbind(e,this.handlers[e])}}),checked:p.extend({init:function(e,t,n){p.fn.init.call(this,e.element[0],t,n),this.widget=e,this._change=O(this.change,this),this.widget.bind(j,this._change)},change:function(){this.bindings[I].set(this.value())},refresh:function(){this.widget.check(this.bindings[I].get()===!0)},value:function(){var e=this.element,t=e.value;return("on"==t||"off"==t)&&(t=e.checked),t},destroy:function(){this.widget.unbind(j,this._change)}}),visible:p.extend({init:function(e,t,n){p.fn.init.call(this,e.element[0],t,n),this.widget=e},refresh:function(){var e=this.bindings.visible.get();this.widget.wrapper[0].style.display=e?"":"none"}}),invisible:p.extend({init:function(e,t,n){p.fn.init.call(this,e.element[0],t,n),this.widget=e},refresh:function(){var e=this.bindings.invisible.get();this.widget.wrapper[0].style.display=e?"none":""}}),enabled:p.extend({init:function(e,t,n){p.fn.init.call(this,e.element[0],t,n),this.widget=e},refresh:function(){this.widget.enable&&this.widget.enable(this.bindings.enabled.get())}}),disabled:p.extend({init:function(e,t,n){p.fn.init.call(this,e.element[0],t,n),this.widget=e},refresh:function(){this.widget.enable&&this.widget.enable(!this.bindings.disabled.get())}}),source:p.extend({init:function(e,t,n){var i=this;p.fn.init.call(i,e.element[0],t,n),i.widget=e,i._dataBinding=O(i.dataBinding,i),i._dataBound=O(i.dataBound,i),i._itemChange=O(i.itemChange,i)},itemChange:function(e){r(e.item[0],e.data,this._ns(e.ns),[e.data].concat(this.bindings.source._parents()))},dataBinding:function(){var e,t,n=this.widget,i=n.items();for(e=0,t=i.length;t>e;e++)d(i[e])},_ns:function(t){t=t||x.ui;var n=[x.ui,x.dataviz.ui,x.mobile.ui];return n.splice(e.inArray(t,n),1),n.unshift(t),x.rolesFromNamespaces(n)},dataBound:function(e){var t,i,s,a=this.widget,o=a.items(),h=a.dataSource,d=h.view(),c=h.group()||[];if(o.length)for(c.length&&(d=n(d)),s=this.bindings.source._parents(),t=0,i=d.length;i>t;t++)r(o[t],d[t],this._ns(e.ns),[d[t]].concat(s))},refresh:function(e){var t,n=this,i=n.widget;e=e||{},e.action||(n.destroy(),i.bind("dataBinding",n._dataBinding),i.bind("dataBound",n._dataBound),i.bind("itemChange",n._itemChange),t=n.bindings.source.get(),i.dataSource instanceof x.data.DataSource&&i.dataSource!=t&&(t instanceof x.data.DataSource?i.setDataSource(t):t&&t._dataSource?i.setDataSource(t._dataSource):i.dataSource.data(t)))},destroy:function(){var e=this.widget;e.unbind("dataBinding",this._dataBinding),e.unbind("dataBound",this._dataBound),e.unbind("itemChange",this._itemChange)}}),value:p.extend({init:function(t,n,i){p.fn.init.call(this,t.element[0],n,i),this.widget=t,this._change=e.proxy(this.change,this),this.widget.first(j,this._change);var s=this.bindings.value.get();this._valueIsObservableObject=!i.valuePrimitive&&(null==s||s instanceof C),this._valueIsObservableArray=s instanceof k,this._initChange=!1},change:function(){var e,t,n,i,s,a,r,o=this.widget.value(),h=this.options.dataValueField||this.options.dataTextField,d="[object Array]"===A.call(o),c=this._valueIsObservableObject,l=[];if(this._initChange=!0,h)if(this.bindings.source&&(r=this.bindings.source.get()),""===o&&(c||this.options.valuePrimitive))o=null;else{for((!r||r instanceof x.data.DataSource)&&(r=this.widget.dataSource.view()),d&&(t=o.length,l=o.slice(0)),s=0,a=r.length;a>s;s++)if(n=r[s],i=n.get(h),d){for(e=0;t>e;e++)if(i==l[e]){l[e]=n;break}}else if(i==o){o=c?n:i;break}l[0]&&(o=this._valueIsObservableArray?l:c||!h?l[0]:l[0].get(h))}this.bindings.value.set(o),this._initChange=!1},refresh:function(){if(!this._initChange){var e,t=this.options.dataValueField||this.options.dataTextField,n=this.bindings.value.get(),i=0,s=[];if(t)if(n instanceof k){for(e=n.length;e>i;i++)s[i]=n[i].get(t);n=s}else n instanceof C&&(n=n.get(t));this.widget.value(n)}this._initChange=!1},destroy:function(){this.widget.unbind(j,this._change)}}),multiselect:{value:p.extend({init:function(t,n,i){p.fn.init.call(this,t.element[0],n,i),this.widget=t,this._change=e.proxy(this.change,this),this.widget.first(j,this._change),this._initChange=!1},change:function(){var e=this,t=e.bindings[T].get(),n=e.options.valuePrimitive,i=n?e.widget.value():e.widget.dataItems();e._initChange=!0,t instanceof k?t.splice.apply(t,[0,t.length].concat(i)):e.bindings[T].set(i),e._initChange=!1},refresh:function(){if(!this._initChange){var e,t,n=this.options.dataValueField||this.options.dataTextField,i=this.bindings.value.get(),s=0,a=[];if(n)if(i instanceof k){for(e=i.length;e>s;s++)t=i[s],a[s]=t.get?t.get(n):t;i=a}else i instanceof C&&(i=i.get(n));this.widget.value(i)}},destroy:function(){this.widget.unbind(j,this._change)}})}},m=S.extend({init:function(e,t){this.target=e,this.options=t,this.toDestroy=[]},bind:function(e){var t,n,i,s,a=this.target.nodeName.toLowerCase(),r=F[a]||{};for(t in e)t==T?n=!0:t==N?i=!0:t==D?s=!0:this.applyBinding(t,e,r);i&&this.applyBinding(N,e,r),n&&this.applyBinding(T,e,r),s&&this.applyBinding(D,e,r)},applyBinding:function(e,t,n){var i,s=n[e]||F[e],a=this.toDestroy,r=t[e];if(s)if(s=new s(this.target,t,this.options),a.push(s),r instanceof f)s.bind(r),a.push(r);else for(i in r)s.bind(r,i),a.push(r[i]);else if("template"!==e)throw Error("The "+e+" binding is not supported by the "+this.target.nodeName.toLowerCase()+" element")},destroy:function(){var e,t,n=this.toDestroy;for(e=0,t=n.length;t>e;e++)n[e].destroy()}}),y=m.extend({bind:function(e){var t,n=this,i=!1,s=!1,a=F.widget[n.target.options.name.toLowerCase()]||{};for(t in e)t==T?i=!0:t==N?s=!0:n.applyBinding(t,e);s&&n.applyBinding(N,e),i&&n.applyBinding(T,e,a[T])},applyBinding:function(e,t,n){var i,s=n||F.widget[e],a=this.toDestroy,r=t[e];if(!s)throw Error("The "+e+" binding is not supported by the "+this.target.options.name+" widget");if(s=new s(this.target,t,this.target.options),a.push(s),r instanceof f)s.bind(r),a.push(r);else for(i in r)s.bind(r,i),a.push(r[i])}}),_=/[A-Za-z0-9_\-]+:(\{([^}]*)\}|[^,}]+)/g,w=/\s/g,x.unbind=l,x.bind=o,x.data.binders=F,x.data.Binder=p,x.notify=u,x.observable=function(e){return e instanceof C||(e=new C(e)),e},x.observableHierarchy=function(e){function t(e){var n,i;for(n=0;n<e.length;n++)e[n]._initChildren(),i=e[n].children,i.fetch(),e[n].items=i.data(),t(e[n].items)}var n=x.data.HierarchicalDataSource.create(e);return n.fetch(),t(n.data()),n._data._dataSource=n,n._data}}(window.kendo.jQuery)});
/*
* Kendo UI Complete v2013.2.716 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
("function"==typeof define&&define.amd?define:function(e,t){return t()})(["./kendo.core.min"],function(){!function(e){function t(t){var a,u=n.ui.validator.ruleResolvers||{},F={};for(a in u)e.extend(!0,F,u[a].resolve(t));return F}function a(e){return e.replace(/&amp/g,"&amp;").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">")}function u(e){return e=(e+"").split("."),e.length>1?e[1].length:0}function F(t){return e.parseHTML?e(e.parseHTML(t)):e(t)}var r,n=window.kendo,i=n.ui.Widget,l=".kendoValidator",o="k-invalid-msg",s="k-invalid",d=/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,f=/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,p=":input:not(:button,[type=submit],[type=reset],[disabled],[readonly])",D=":checkbox:not([disabled],[readonly])",c="[type=number],[type=range]",m="blur",v="name",g="form",h="novalidate",x=e.proxy,y=function(e,t){return"string"==typeof t&&(t=RegExp("^(?:"+t+")$")),t.test(e)},C=function(e,t,a){var u=e.val();return e.filter(t).length&&""!==u?y(u,a):!0},E=function(e,t){return e.length?null!=e[0].attributes[t]:!1};n.ui.validator||(n.ui.validator={rules:{},messages:{}}),r=i.extend({init:function(a,u){var F=this,r=t(a);u=u||{},u.rules=e.extend({},n.ui.validator.rules,r.rules,u.rules),u.messages=e.extend({},n.ui.validator.messages,r.messages,u.messages),i.fn.init.call(F,a,u),F._errorTemplate=n.template(F.options.errorTemplate),F.element.is(g)&&F.element.attr(h,h),F._errors={},F._attachEvents()},options:{name:"Validator",errorTemplate:'<span class="k-widget k-tooltip k-tooltip-validation"><span class="k-icon k-warning"> </span> #=message#</span>',messages:{required:"{0} is required",pattern:"{0} is not valid",min:"{0} should be greater than or equal to {1}",max:"{0} should be smaller than or equal to {1}",step:"{0} is not valid",email:"{0} is not valid email",url:"{0} is not valid URL",date:"{0} is not valid date"},rules:{required:function(e){var t=e.filter("[type=checkbox]").length&&!e.is(":checked"),a=e.val();return!(E(e,"required")&&(""===a||!a||t))},pattern:function(e){return e.filter("[type=text],[type=email],[type=url],[type=tel],[type=search],[type=password]").filter("[pattern]").length&&""!==e.val()?y(e.val(),e.attr("pattern")):!0},min:function(e){if(e.filter(c+",["+n.attr("type")+"=number]").filter("[min]").length&&""!==e.val()){var t=parseFloat(e.attr("min"))||0,a=n.parseFloat(e.val());return a>=t}return!0},max:function(e){if(e.filter(c+",["+n.attr("type")+"=number]").filter("[max]").length&&""!==e.val()){var t=parseFloat(e.attr("max"))||0,a=n.parseFloat(e.val());return t>=a}return!0},step:function(e){if(e.filter(c+",["+n.attr("type")+"=number]").filter("[step]").length&&""!==e.val()){var t,a=parseFloat(e.attr("min"))||0,F=parseFloat(e.attr("step"))||1,r=parseFloat(e.val()),i=u(F);return i?(t=Math.pow(10,i),0===(r-a)*t%(F*t)/Math.pow(100,i)):0===(r-a)%F}return!0},email:function(e){return C(e,"[type=email],["+n.attr("type")+"=email]",d)},url:function(e){return C(e,"[type=url],["+n.attr("type")+"=url]",f)},date:function(e){return e.filter("[type^=date],["+n.attr("type")+"=date]").length&&""!==e.val()?null!==n.parseDate(e.val(),e.attr(n.attr("format"))):!0}},validateOnBlur:!0},destroy:function(){i.fn.destroy.call(this),this.element.off(l)},_submit:function(e){return this.validate()?!0:(e.stopPropagation(),e.stopImmediatePropagation(),e.preventDefault(),!1)},_attachEvents:function(){var t=this;t.element.is(g)&&t.element.on("submit"+l,x(t._submit,t)),t.options.validateOnBlur&&(t.element.is(p)?(t.element.on(m+l,function(){t.validateInput(t.element)}),t.element.is(D)&&t.element.on("click"+l,function(){t.validateInput(t.element)})):(t.element.on(m+l,p,function(){t.validateInput(e(this))}),t.element.on("click"+l,D,function(){t.validateInput(e(this))})))},validate:function(){var e,t,a,u=this,F=!1;if(u._errors={},!u.element.is(p)){for(e=u.element.find(p),t=0,a=e.length;a>t;t++)u.validateInput(e.eq(t))||(F=!0);return!F}return u.validateInput(u.element)},validateInput:function(t){var u,r,n,i,l,d,f,p,D;return t=e(t),r=this,n=r._errorTemplate,i=r._checkValidity(t),l=i.valid,d="."+o,f=t.attr(v)||"",p=r._findMessageContainer(f).add(t.next(d)).hide(),t.removeAttr("aria-invalid"),l||(u=r._extractMessage(t,i.key),r._errors[f]=u,D=F(n({message:a(u)})),r._decorateMessageContainer(D,f),p.replaceWith(D).length||D.insertAfter(t),D.show(),t.attr("aria-invalid",!0)),t.toggleClass(s,!l),l},hideMessages:function(){var e=this,t="."+o,a=e.element;a.is(p)?a.next(t).hide():a.find(t).hide()},_findMessageContainer:function(t){var a,u,F,r,i,l=n.ui.validator.messageLocators,s=e(),d=this.element[0].getElementsByTagName("*");for(u=0,F=d.length;F>u;u++)r=d[u],r.className.indexOf(o)>-1&&(i=r.getAttribute(n.attr("for")),i===t&&(s=s.add(r)));for(a in l)s=s.add(l[a].locate(this.element,t));return s},_decorateMessageContainer:function(e,t){var a,u=n.ui.validator.messageLocators;e.addClass(o).attr(n.attr("for"),t||"");for(a in u)u[a].decorate(e,t);e.attr("role","alert")},_extractMessage:function(t,a){var u=this,F=u.options.messages[a],r=t.attr(v);return F=e.isFunction(F)?F(t):F,n.format(t.attr(n.attr(a+"-msg"))||t.attr("validationMessage")||t.attr("title")||F||"",r,t.attr(a))},_checkValidity:function(e){var t,a=this.options.rules;for(t in a)if(!a[t](e))return{valid:!1,key:t};return{valid:!0}},errors:function(){var e,t=[],a=this._errors;for(e in a)t.push(a[e]);return t}}),n.ui.plugin(r)}(window.kendo.jQuery)});
/*
* Kendo UI Complete v2013.2.716 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
("function"==typeof define&&define.amd?define:function(t,e){return e()})(["./kendo.core.min"],function(){!function(t){var e=window.kendo,n=e.support,r=window.location,o=window.history,i=50,a=/^#*/,u=window.document,s=e.Observable.extend({start:function(t){var e=this;if(t=t||{},e.bind(["change"],t),!e._started){if(e._started=!0,e._pushStateRequested=!!t.pushState,e._pushState=n.pushState&&e._pushStateRequested,e.root=t.root||"/",e._interval=0,e._normalizeUrl())return!0;e.current=e._currentLocation(),e.locations=[e.current],e._listenToLocationChange()}},stop:function(){t(window).unbind(".kendo"),this.unbind("change"),clearInterval(this._interval),this._started=!1},change:function(t){this.bind("change",t)},navigate:function(t,e){var n=this;return"#:back"===t?(o.back(),undefined):(t=t.replace(a,""),n.current!==t&&n.current!==decodeURIComponent(t)&&(e||!n.trigger("change",{url:t}))&&(n._pushState?(o.pushState({},u.title,n._makePushStateUrl(t)),n.current=t):r.hash=n.current=t,n.locations.push(n.current)),undefined)},_normalizeUrl:function(){var t,e=this,i=e.root==r.pathname,s=e._pushStateRequested&&!n.pushState&&!i,c=e._pushState&&i&&r.hash;return s?(r.replace(e.root+"#"+e._stripRoot(r.pathname)),!0):c?(t=e._makePushStateUrl(r.hash.replace(a,"")),o.replaceState({},u.title,t),!1):!1},_listenToLocationChange:function(){var e=this,r=t.proxy(e._checkUrl,e);this._pushState?t(window).bind("popstate.kendo",r):n.hashChange?t(window).bind("hashchange.kendo",r):e._interval=setInterval(r,i)},_checkUrl:function(){var t=this,e=t._currentLocation().replace(a,""),n=e===t.locations[t.locations.length-2];if(t.current!==e&&t.current!==decodeURIComponent(e)){if(t.trigger("change",{url:e}))return n?o.forward():o.back(),undefined;t.current=e,n?t.locations.pop():t.locations.push(e)}},_stripRoot:function(t){var e=this;return 0===t.indexOf(e.root)?t.substr(e.root.length).replace(/\/\//g,"/"):t},_makePushStateUrl:function(t){var e=this,n=RegExp("^"+e.root,"i");return n.test(t)||(t=(e.root+t).replace(/\/\//g,"/")),r.protocol+"//"+r.host+t},_currentLocation:function(){var t,e=this;return e._pushState?(t=r.pathname,r.search&&(t+=r.search),e._stripRoot(t)):r.hash.replace(a,"")}});e.history=new s}(window.kendo.jQuery),function(){function t(t,e){return e?t:"([^/]+)"}function e(e){return RegExp("^"+e.replace(l,"\\$&").replace(s,"(?:$1)?").replace(c,t).replace(h,"(.*?)")+"$")}var n=window.kendo,r=n.history,o=n.Observable,i="init",a="routeMissing",u="change",s=/\((.*?)\)/g,c=/(\(\?)?:\w+/g,h=/\*\w+/g,l=/[\-{}\[\]+?.,\\\^$|#\s]/g,d=n.Class.extend({init:function(t,n){t instanceof RegExp||(t=e(t)),this.route=t,this._callback=n},callback:function(t){for(var e=this.route.exec(t).slice(1),n=0,r=e.length;r>n;n++)void 0!==e[n]&&(e[n]=decodeURIComponent(e[n]));this._callback.apply(null,e)},worksWith:function(t){return this.route.test(t)?(this.callback(t),!0):!1}}),p=o.extend({init:function(t){o.fn.init.call(this),this.routes=[],this.pushState=t?t.pushState:!1,t&&t.root&&(this.root=t.root),this.bind([i,a,u],t)},destroy:function(){r.unbind("change",this._urlChangedProxy),this.unbind()},start:function(){var t,e=this,n=function(t){e._urlChanged(t)};r.start({change:n,pushState:e.pushState,root:e.root}),t={url:r.current||"/"},e.trigger(i,t)||e._urlChanged(t),this._urlChangedProxy=n},route:function(t,e){this.routes.push(new d(t,e))},navigate:function(t,e){n.history.navigate(t,e)},_urlChanged:function(t){var e,n,r,o,i=t.url;if(i||(i="/"),this.trigger(u,{url:t.url}))return t.preventDefault(),void 0;for(n=0,r=this.routes,o=r.length;o>n;n++)if(e=r[n],e.worksWith(i))return;this.trigger(a,{url:i})&&t.preventDefault()}});n.Router=p}()});
/*
* Kendo UI Complete v2013.2.716 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
("function"==typeof define&&define.amd?define:function(e,n){return n()})(["./kendo.core.min","./kendo.binder.min"],function(){!function(e){var n=window.kendo,t=n.Observable,i="SCRIPT",r="init",o="show",d="hide",a=t.extend({init:function(e,n){var i=this;n=n||{},t.fn.init.call(i),i.content=e,i.tagName=n.tagName||"div",i.model=n.model,i._wrap=n.wrap!==!1,i.bind([r,o,d],n)},render:function(t){var i=this,d=!i.element;return d&&(i.element=i._createElement()),t&&e(t).append(i.element),d&&(n.bind(i.element,i.model),i.trigger(r)),t&&i.trigger(o),i.element},hide:function(){this.element.detach(),this.trigger(d)},destroy:function(){var e=this.element;e&&(n.unbind(e),n.destroy(e),e.remove())},_createElement:function(){var n,t,r=this;return t=e(document.getElementById(r.content)||r.content),n=e("<"+r.tagName+" />").append(t[0].tagName===i?t.html():t),r._wrap||(n=n.contents()),n}}),m=a.extend({init:function(e,n){a.fn.init.call(this,e,n),this.regions={}},showIn:function(e,n){var t=this.regions[e];t&&t.hide(),n.render(this.render().find(e),t),this.regions[e]=n}});n.Layout=m,n.View=a}(window.kendo.jQuery)});
/*
* Kendo UI Complete v2013.2.716 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
("function"==typeof define&&define.amd?define:function(e,t){return t()})(["./kendo.core.min","./kendo.userevents.min"],function(){!function(e){function t(e,t){var n=s.getOffset(e),i=t.left+t.width,l=t.top+t.height;return n.right=n.left+e.outerWidth(),n.bottom=n.top+e.outerHeight(),!(n.left>i||n.right<t.left||n.top>l||n.bottom<t.top)}function n(e,n,i,s){var l,a,o;for(l=0,a=e.length;a>l;l++)o=e.eq(l),t(o,i)?o.hasClass(c)?s&&n!==o[0]&&o.removeClass(c).addClass(h):o.hasClass(f)||o.hasClass(h)||o.addClass(f):o.hasClass(f)?o.removeClass(f):s&&o.hasClass(h)&&o.removeClass(h).addClass(c)}var i,s=window.kendo,l=s.ui.Widget,a=e.proxy,o=Math.abs,r="aria-selected",c="k-state-selected",f="k-state-selecting",u="k-selectable",d="change",v=".kendoSelectable",h="k-state-unselecting",m=!1;!function(e){!function(){e('<div class="parent"><span /></div>').on("click",">*",function(){m=!0}).find("span").click().end().off()}()}(e),i=l.extend({init:function(t,n){var i,o=this;l.fn.init.call(o,t,n),o._marquee=e("<div class='k-marquee'><div class='k-marquee-color'></div></div>"),o._lastActive=null,o.element.addClass(u),i=o.options.multiple,o.userEvents=new s.UserEvents(o.element,{global:!0,allowSelection:!0,filter:(m?"":"."+u+" ")+o.options.filter,tap:a(o._tap,o)}),i&&o.userEvents.bind("start",a(o._start,o)).bind("move",a(o._move,o)).bind("end",a(o._end,o)).bind("select",a(o._select,o))},events:[d],options:{name:"Selectable",filter:">*",multiple:!1},_tap:function(t){var n,i=e(t.target),s=this,l=t.event.ctrlKey||t.event.metaKey,a=s.options.multiple,o=a&&t.event.shiftKey,r=t.event.which,f=t.event.button;i.closest("."+u)[0]!==s.element[0]||r&&3==r||f&&2==f||(n=i.hasClass(c),a&&l||s.clear(),o?s.selectRange(s._firstSelectee(),i):(n&&l?(s._unselect(i),s._notify(d)):s.value(i),s._lastActive=s._downTarget=i))},_start:function(t){var n=this,i=e(t.target),s=i.hasClass(c),l=t.event.ctrlKey||t.event.metaKey;return n._downTarget=i,i.closest("."+u)[0]!==n.element[0]?(n.userEvents.cancel(),n._downTarget=null,undefined):(n._marquee.appendTo(document.body).css({left:t.x.client+1,top:t.y.client+1,width:0,height:0}),l||n.clear(),s&&(n._selectElement(i,!0),l&&i.addClass(h)),undefined)},_move:function(e){var t=this,i={left:e.x.startLocation>e.x.location?e.x.location:e.x.startLocation,top:e.y.startLocation>e.y.location?e.y.location:e.y.startLocation,width:o(e.x.initialDelta),height:o(e.y.initialDelta)},s=t.element.find(t.options.filter);t._marquee.css(i),n(s,t._downTarget[0],i,e.event.ctrlKey||e.event.metaKey),e.preventDefault()},_end:function(){var e=this;e._marquee.remove(),e._unselect(e.element.find(e.options.filter+"."+h)).removeClass(h),e.value(e.element.find(e.options.filter+"."+f)),e._lastActive=e._downTarget},value:function(e){var t=this,n=a(t._selectElement,t);return e?(e.each(function(){n(this)}),t._notify(d),undefined):t.element.find(t.options.filter+"."+c)},_firstSelectee:function(){var e,t=this;return null!==t._lastActive?t._lastActive:(e=t.value(),e.length>0?e[0]:t.element.find(t.options.filter))},_selectElement:function(t,n){var i=e(t),s=!n&&this._notify("select",{element:t});i.removeClass(f),s||(i.addClass(c),this.options.aria&&i.attr(r,!0))},_notify:function(e,t){return t=t||{},this.trigger(e,t)},_unselect:function(e){return e.removeClass(c),this.options.aria&&e.attr(r,!1),e},_select:function(t){e(t.event.target).is("input,a,textarea")?(this.userEvents.cancel(),this._downTarget=null):t.preventDefault()},clear:function(){var e=this.element.find(this.options.filter+"."+c);this._unselect(e)},selectRange:function(t,n){var i,s,l,o,r=this,f=!1,u=r.element.find(r.options.filter),v=a(r._selectElement,r);for(t=e(t)[0],n=e(n)[0],i=0,s=u.length;s>i;i++)o=u[i],f?(v(o),f=o!==n):o===t?(f=t!==n,v(o)):o===n?(l=t,t=n,n=l,f=!0,v(o)):e(o).removeClass(c);r._notify(d)},destroy:function(){var e=this;l.fn.destroy.call(e),e.element.off(v),e.userEvents.destroy()}}),s.ui.plugin(i)}(window.kendo.jQuery)});
/*
* Kendo UI Complete v2013.2.716 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
("function"==typeof define&&define.amd?define:function(e,t){return t()})(["./kendo.core.min"],function(){!function(e){function t(e,t){var n=e.x.location,i=e.y.location,o=t.x.location,r=t.y.location,a=n-o,s=i-r;return{center:{x:(n+o)/2,y:(i+r)/2},distance:Math.sqrt(a*a+s*s)}}function n(e){var t,n,i,o=[],r=e.originalEvent,s=e.currentTarget,c=0;if(e.api)o.push({id:2,event:e,target:e.target,currentTarget:e.target,location:e});else if(e.type.match(/touch/))for(n=r?r.changedTouches:[],t=n.length;t>c;c++)i=n[c],o.push({location:i,event:e,target:i.target,currentTarget:s,id:i.identifier});else a.pointers?o.push({location:r,event:e,target:e.target,currentTarget:s,id:r.pointerId}):o.push({id:1,event:e,target:e.target,currentTarget:s,location:e});return o}function i(t){var n,i,o;t.preventDefault(),n=e(t.data.root),i=n.closest(".k-widget").parent(),i[0]||(i=n.parent()),o=e.extend(!0,{},t,{target:n[0]}),i.trigger(e.Event(t.type,o))}function o(e){for(var t=r.eventMap.up.split(" "),n=0,i=t.length;i>n;n++)e(t[n])}var r=window.kendo,a=r.support,s=window.document,c=r.Class,u=r.Observable,l=e.now,h=e.extend,d=a.mobileOS,p=d&&d.android,f=a.browser.ie?5:0,v="press",g="select",_="start",m="move",y="end",T="cancel",x="tap",M="release",w="gesturestart",D="gesturechange",E="gestureend",I="gesturetap",b=c.extend({init:function(e,t){var n=this;n.axis=e,n._updateLocationData(t),n.startLocation=n.location,n.velocity=n.delta=0,n.timeStamp=l()},move:function(e){var t=this,n=e["page"+t.axis],i=l(),o=i-t.timeStamp||1;(n||!p)&&(t.delta=n-t.location,t._updateLocationData(e),t.initialDelta=n-t.startLocation,t.velocity=t.delta/o,t.timeStamp=i)},_updateLocationData:function(e){var t=this,n=t.axis;t.location=e["page"+n],t.client=e["client"+n],t.screen=e["screen"+n]}}),S=c.extend({init:function(e,t,n){var i=this;h(i,{x:new b("X",n.location),y:new b("Y",n.location),userEvents:e,target:t,currentTarget:n.currentTarget,initialTouch:n.target,id:n.id,_moved:!1,_finished:!1}),i.notifyInit=function(){i._trigger(v,n)}},move:function(e){var t=this;if(!t._finished){if(t.x.move(e.location),t.y.move(e.location),!t._moved){if(t._withinIgnoreThreshold())return;if(k.current&&k.current!==t.userEvents)return t.dispose();t._start(e)}t._finished||t._trigger(m,e)}},end:function(e){var t=this;t.endTime=l(),t._finished||(t._moved?t._trigger(y,e):t._trigger(x,e),t._trigger(M,e),t.dispose())},dispose:function(){var t=this,n=t.userEvents,i=n.touches;t._finished=!0,i.splice(e.inArray(t,i),1)},skip:function(){this.dispose()},cancel:function(){this.dispose()},isMoved:function(){return this._moved},_start:function(e){this.startTime=l(),this._moved=!0,this._trigger(_,e)},_trigger:function(e,t){var n=this,i=t.event,o={touch:n,x:n.x,y:n.y,target:n.target,event:i};n.userEvents.notify(e,o)&&i.preventDefault()},_withinIgnoreThreshold:function(){var e=this.x.initialDelta,t=this.y.initialDelta;return Math.sqrt(e*e+t*t)<=this.userEvents.threshold}}),k=u.extend({init:function(t,n){var i,c,l,d=this,p=r.guid();n=n||{},i=d.filter=n.filter,d.threshold=n.threshold||f,d.touches=[],d._maxTouches=n.multiTouch?2:1,d.allowSelection=n.allowSelection,d.captureUpIfMoved=n.captureUpIfMoved,d.eventNS=p,t=e(t).handler(d),u.fn.init.call(d),h(d,{element:t,surface:n.global?e(s.documentElement):e(n.surface||t),stopPropagation:n.stopPropagation,pressed:!1}),d.surface.handler(d).on(r.applyEventMap("move",p),"_move").on(r.applyEventMap("up cancel",p),"_end"),t.on(r.applyEventMap("down",p),i,"_start"),a.pointers&&t.css("-ms-touch-action","pinch-zoom double-tap-zoom"),n.preventDragEvent&&t.on(r.applyEventMap("dragstart",p),r.preventDefault),t.on(r.applyEventMap("mousedown selectstart",p),i,{root:t},"_select"),d.captureUpIfMoved&&a.eventCapture&&(c=d.surface[0],l=e.proxy(d.preventIfMoving,d),o(function(e){c.addEventListener(e,l,!0)})),d.bind([v,x,_,m,y,M,T,w,D,E,I,g],n)},preventIfMoving:function(e){this._isMoved()&&e.preventDefault()},destroy:function(){var e,t=this;t._destroyed||(t._destroyed=!0,t.captureUpIfMoved&&a.eventCapture&&(e=t.surface[0],o(function(n){e.removeEventListener(n,t.preventIfMoving)})),t.element.kendoDestroy(t.eventNS),t.surface.kendoDestroy(t.eventNS),t.element.removeData("handler"),t.surface.removeData("handler"),t._disposeAll(),t.unbind(),delete t.surface,delete t.element)},capture:function(){k.current=this},cancel:function(){this._disposeAll(),this.trigger(T)},notify:function(e,n){var i=this,o=i.touches;if(this._isMultiTouch()){switch(e){case m:e=D;break;case y:e=E;break;case x:e=I}h(n,{touches:o},t(o[0],o[1]))}return this.trigger(e,n)},press:function(e,t,n){this._apiCall("_start",e,t,n)},move:function(e,t){this._apiCall("_move",e,t)},end:function(e,t){this._apiCall("_end",e,t)},_isMultiTouch:function(){return this.touches.length>1},_maxTouchesReached:function(){return this.touches.length>=this._maxTouches},_disposeAll:function(){e.each(this.touches,function(){this.dispose()})},_isMoved:function(){return e.grep(this.touches,function(e){return e.isMoved()}).length},_select:function(e){(!this.allowSelection||this.trigger(g,{event:e}))&&i(e)},_start:function(t){var i,o,r=this,a=0,s=r.filter,c=n(t),u=c.length;if(!r._maxTouchesReached())for(k.current=null,r.currentTarget=t.currentTarget,r.stopPropagation&&t.stopPropagation();u>a&&!r._maxTouchesReached();a++)o=c[a],i=s?e(o.currentTarget):r.element,i.length&&(o=new S(r,i,o),r.touches.push(o),o.notifyInit(),r._isMultiTouch()&&r.notify("gesturestart",{}))},_move:function(e){this._eachTouch("move",e)},_end:function(e){this._eachTouch("end",e)},_eachTouch:function(e,t){var i,o,r,a,s=this,c={},u=n(t),l=s.touches;for(i=0;i<l.length;i++)o=l[i],c[o.id]=o;for(i=0;i<u.length;i++)r=u[i],a=c[r.id],a&&a[e](r)},_apiCall:function(t,n,i,o){this[t]({api:!0,pageX:n,pageY:i,target:o||this.element,stopPropagation:e.noop,preventDefault:e.noop})}});r.getTouches=n,r.touchDelta=t,r.UserEvents=k}(window.kendo.jQuery)});
/*
* Kendo UI Complete v2013.2.716 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement.aspx
* If you do not own a commercial license, this file shall be governed by the trial license terms.
*/
("function"==typeof define&&define.amd?define:function(e,t){return t()})(["./kendo.data.min","./kendo.editable.min","./kendo.selectable.min"],function(){!function(e,t){var a=window.kendo,n="change",r="cancel",i="dataBound",l="dataBinding",o=a.ui.Widget,d=a.keys,s=">*",c="progress",u="error",m="k-state-focused",f="k-state-selected",p="k-edit-item",g="string",v="edit",b="remove",_="save",h="click",S=".kendoListView",E=e.proxy,w=a._activeElement,y=a.ui.progress,k=a.data.DataSource,T=o.extend({init:function(t,n){var r=this;n=e.isArray(n)?{dataSource:n}:n,o.fn.init.call(r,t,n),n=r.options,r.wrapper=t=r.element,t[0].id&&(r._itemId=t[0].id+"_lv_active"),r._element(),r._dataSource(),r.template=a.template(n.template||""),r.altTemplate=a.template(n.altTemplate||n.template),r.editTemplate=a.template(n.editTemplate||""),r._navigatable(),r._selectable(),r._pageable(),r._crudHandlers(),r.options.autoBind&&r.dataSource.fetch(),a.notify(r)},events:[n,r,l,i,v,b,_],options:{name:"ListView",autoBind:!0,selectable:!1,navigatable:!1,template:"",altTemplate:"",editTemplate:""},_item:function(e){return this.element.children()[e]()},items:function(){return this.element.children()},setDataSource:function(e){this.options.dataSource=e,this._dataSource(),this.options.autoBind&&e.fetch()},_unbindDataSource:function(){var e=this;e.dataSource.unbind(n,e._refreshHandler).unbind(c,e._progressHandler).unbind(u,e._errorHandler)},_dataSource:function(){var e=this;e.dataSource&&e._refreshHandler?e._unbindDataSource():(e._refreshHandler=E(e.refresh,e),e._progressHandler=E(e._progress,e),e._errorHandler=E(e._error,e)),e.dataSource=k.create(e.options.dataSource).bind(n,e._refreshHandler).bind(c,e._progressHandler).bind(u,e._errorHandler)},_progress:function(){y(this.element,!0)},_error:function(){y(this.element,!1)},_element:function(){this.element.addClass("k-widget k-listview").attr("role","listbox")},refresh:function(n){var r,o,d,s,c,u=this,m=u.dataSource.view(),f="",p=u.template,g=u.altTemplate,v=w();if(n&&"itemchange"===n.action)return u.editable||(r=n.items[0],s=e.inArray(r,m),s>=0&&(u.items().eq(s).replaceWith(p(r)),d=u.items().eq(s),d.attr(a.attr("uid"),r.uid),u.trigger("itemChange",{item:d,data:r}))),t;if(n=n||{},!u.trigger(l,{action:n.action||"rebind",items:n.items,index:n.index})){for(u._destroyEditable(),s=0,c=m.length;c>s;s++)f+=s%2?g(m[s]):p(m[s]);for(u.element.html(f),o=u.items(),s=0,c=m.length;c>s;s++)o.eq(s).attr(a.attr("uid"),m[s].uid).attr("role","option").attr("aria-selected","false");u.element[0]===v&&u.options.navigatable&&u.current(o.eq(0)),u.trigger(i)}},_pageable:function(){var t,n,r=this,i=r.options.pageable;e.isPlainObject(i)&&(n=i.pagerId,t=e.extend({},i,{dataSource:r.dataSource,pagerId:null}),r.pager=new a.ui.Pager(e("#"+n),t))},_selectable:function(){var e,r,i=this,l=i.options.selectable,o=i.options.navigatable;l&&(e=typeof l===g&&l.toLowerCase().indexOf("multiple")>-1,e&&i.element.attr("aria-multiselectable",!0),i.selectable=new a.ui.Selectable(i.element,{aria:!0,multiple:e,filter:s,change:function(){i.trigger(n)}}),o&&i.element.on("keydown"+S,function(a){if(a.keyCode===d.SPACEBAR){if(r=i.current(),a.target==a.currentTarget&&a.preventDefault(),e)if(a.ctrlKey){if(r&&r.hasClass(f))return r.removeClass(f),t}else i.selectable.clear();else i.selectable.clear();i.selectable.value(r)}}))},current:function(e){var a=this,n=a.element,r=a._current,i=a._itemId;return e===t?r:(r&&r[0]&&(r[0].id===i&&r.removeAttr("id"),r.removeClass(m),n.removeAttr("aria-activedescendant")),e&&e[0]&&(i=e[0].id||i,a._scrollTo(e[0]),n.attr("aria-activedescendant",i),e.addClass(m).attr("id",i)),a._current=e,t)},_scrollTo:function(t){var a,n,r=this,i=!1,l="scroll";"auto"==r.wrapper.css("overflow")||r.wrapper.css("overflow")==l?a=r.wrapper[0]:(a=window,i=!0),n=function(n,r){var o=i?e(t).offset()[n.toLowerCase()]:t["offset"+n],d=t["client"+r],s=e(a)[l+n](),c=e(a)[r.toLowerCase()]();o+d>s+c?e(a)[l+n](o+d-c):s>o&&e(a)[l+n](o)},n("Top","Height"),n("Left","Width")},_navigatable:function(){var t=this,n=t.options.navigatable,r=t.element,i=function(a){t.current(e(a.currentTarget)),e(a.target).is(":button,a,:input,a>.k-icon,textarea")||r.focus()};n&&(t._tabindex(),r.on("focus"+S,function(){var e=t._current;e&&e.is(":visible")||(e=t._item("first")),t.current(e)}).on("focusout"+S,function(){t._current&&t._current.removeClass(m)}).on("keydown"+S,function(n){var i,l,o=n.keyCode,s=t.current(),c=e(n.target),u=!c.is(":button,textarea,a,a>.t-icon,input"),m=c.is(":text"),f=a.preventDefault,g=r.find("."+p),v=w();if(!(!u&&!m&&d.ESC!=o||m&&d.ESC!=o&&d.ENTER!=o))if(d.UP===o||d.LEFT===o)s&&(s=s.prev()),t.current(s&&s[0]?s:t._item("last")),f(n);else if(d.DOWN===o||d.RIGHT===o)s&&(s=s.next()),t.current(s&&s[0]?s:t._item("first")),f(n);else if(d.PAGEUP===o)t.current(null),t.dataSource.page(t.dataSource.page()-1),f(n);else if(d.PAGEDOWN===o)t.current(null),t.dataSource.page(t.dataSource.page()+1),f(n);else if(d.HOME===o)t.current(t._item("first")),f(n);else if(d.END===o)t.current(t._item("last")),f(n);else if(d.ENTER===o)0!==g.length&&(u||m)?(i=t.items().index(g),v&&v.blur(),t.save(),l=function(){t.element.trigger("focus"),t.current(t.items().eq(i))},t.one("dataBound",l)):""!==t.options.editTemplate&&t.edit(s);else if(d.ESC===o){if(g=r.find("."+p),0===g.length)return;i=t.items().index(g),t.cancel(),t.element.trigger("focus"),t.current(t.items().eq(i))}}),r.on("mousedown"+S+" touchstart"+S,s,E(i,t)))},clearSelection:function(){var e=this;e.selectable.clear(),e.trigger(n)},select:function(a){var n=this,r=n.selectable;return a=e(a),a.length?(r.options.multiple||(r.clear(),a=a.first()),r.value(a),t):r.value()},_destroyEditable:function(){var e=this;e.editable&&(e.editable.destroy(),delete e.editable)},_modelFromElement:function(e){var t=e.attr(a.attr("uid"));return this.dataSource.getByUid(t)},_closeEditable:function(e){var t,n,r=this,i=r.editable,l=r.template,o=!0;return i&&(e&&(o=i.end()),o&&(i.element.index()%2&&(l=r.altTemplate),t=r._modelFromElement(i.element),r._destroyEditable(),n=i.element.index(),i.element.replaceWith(l(t)),r.items().eq(n).attr(a.attr("uid"),t.uid))),o},edit:function(e){var t,n,r=this,i=r._modelFromElement(e),l=i.uid;r.cancel(),e=r.items().filter("["+a.attr("uid")+"="+l+"]"),n=e.index(),e.replaceWith(r.editTemplate(i)),t=r.items().eq(n).addClass(p).attr(a.attr("uid"),i.uid),r.editable=t.kendoEditable({model:i,clearContainer:!1,errorTemplate:!1}).data("kendoEditable"),r.trigger(v,{model:i,item:t})},save:function(){var e,t=this,a=t.editable;a&&(a=a.element,e=t._modelFromElement(a),!t.trigger(_,{model:e,item:a})&&t._closeEditable(!0)&&t.dataSource.sync())},remove:function(e){var t=this,a=t.dataSource,n=t._modelFromElement(e);t.trigger(b,{model:n,item:e})||(e.hide(),a.remove(n),a.sync())},add:function(){var e=this,t=e.dataSource,a=t.indexOf((t.view()||[])[0]);0>a&&(a=0),e.cancel(),t.insert(a,{}),e.edit(e.element.children().first())},cancel:function(){var e,t,a=this,n=a.dataSource;a.editable&&(e=a.editable.element,t=a._modelFromElement(e),a.trigger(r,{model:t,container:e})||(n.cancelChanges(t),a._closeEditable(!1)))},_crudHandlers:function(){var t=this,n=h+S;t.element.on(n,".k-edit-button",function(n){var r=e(this).closest("["+a.attr("uid")+"]");t.edit(r),n.preventDefault()}),t.element.on(n,".k-delete-button",function(n){var r=e(this).closest("["+a.attr("uid")+"]");t.remove(r),n.preventDefault()}),t.element.on(n,".k-update-button",function(e){t.save(),e.preventDefault()}),t.element.on(n,".k-cancel-button",function(e){t.cancel(),e.preventDefault()})},destroy:function(){var e=this;o.fn.destroy.call(e),e._unbindDataSource(),e._destroyEditable(),e.element.off(S),e.pager&&e.pager.destroy(),e.selectable&&e.selectable.destroy(),a.destroy(e.element)}});a.ui.plugin(T)}(window.kendo.jQuery)});
// Avoid `console` errors in browsers that lack a console.
(function(){for(var a,e=function(){},b="assert clear count debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd table time timeEnd timeStamp trace warn".split(" "),c=b.length,d=window.console=window.console||{};c--;)a=b[c],d[a]||(d[a]=e)})();
