/*!
 * jQuery.PositionCalculator
 * https://github.com/tlindig/position-calculator
 *
 * v1.1.2 - 2014-07-01
 *
 * Copyright (c) 2014 Tobias Lindig
 * http://tlindig.de
 *
 * License: MIT
 *
 * Author: Tobias Lindig <dev@tlindig.de>
 */

!function (a) {
    "function" == typeof define && define.amd ? define("position-calculator", ["jquery"], a) : jQuery.PositionCalculator = a(jQuery)
}(function (a) {
    "use strict";
    function b(a) {
        return"string" == typeof a && ("window" === a ? a = q : "document" === a && (a = r)), a
    }
    function c(a) {
        var b = a.split(" ");
        return{y: t.test(b[0]) ? b[0] : "top", x: u.test(b[1]) ? b[1] : "left"}
    }
    function d(a, b) {
        return a === b ? !0 : a && b ? a.top === b.top && a.left === b.left && a.height === b.height && a.width === b.width : !1
    }
    function e(b) {
        var c = b[0];
        if (9 === c.nodeType)
            return{width: b.outerWidth(), height: b.outerHeight(), top: 0, left: 0};
        if (a.isWindow(c))
            return{width: b.outerWidth(), height: b.outerHeight(), top: b.scrollTop(), left: b.scrollLeft()};
        if (c.preventDefault)
            return{width: 0, height: 0, top: c.pageY, left: c.pageX};
        var d = b.offset();
        return{width: b.outerWidth(), height: b.outerHeight(), top: d.top, left: d.left}
    }
    function f(b, c) {
        var d = b[0];
        if (9 !== d.nodeType) {
            if (a.isWindow(d) && (c.top = b.scrollTop(), c.left = b.scrollLeft()), d.preventDefault)
                return c.top = d.pageY, void(c.left = d.pageX);
            var e = b.offset();
            c.top = e.top, c.left = e.left
        }
    }
    function g(b) {
        var c, d = b[0];
        return 9 === d.nodeType ? (d = s, c = {top: 0, left: 0}) : a.isWindow(d) ? (d = s, c = {top: b.scrollTop(), left: b.scrollLeft()}) : c = b.offset(), {width: d.clientWidth, height: d.clientHeight, top: c.top + d.clientTop, left: c.left + d.clientLeft}
    }
    function h(b, c) {
        var d, e = b[0];
        9 === e.nodeType ? (e = s, d = {top: 0, left: 0}) : a.isWindow(e) ? (e = s, d = {top: b.scrollTop(), left: b.scrollLeft()}) : d = b.offset(), c.top = d.top + e.clientTop, c.left = d.left + e.clientLeft
    }
    function i(a, b) {
        return{y: parseFloat(a.y) * (v.test(a.y) ? b.height / 100 : 1), x: parseFloat(a.x) * (v.test(a.x) ? b.width / 100 : 1), mirror: a.mirror}
    }
    function j(a, b, c) {
        var d = {top: 0, left: 0, middle: .5 * a.height, center: .5 * a.width, bottom: a.height, right: a.width};
        return 0 !== b.y && (d.middle += b.y, b.mirror ? (d.top += "top" !== c.y ? -1 * b.y : b.y, d.bottom += "bottom" !== c.y ? -1 * b.y : b.y) : (d.top += b.y, d.bottom += b.y)), 0 !== b.x && (d.center += b.x, b.mirror ? (d.left += "left" !== c.x ? -1 * b.x : b.x, d.right += "right" !== c.x ? -1 * b.x : b.x) : (d.left += b.x, d.right += b.x)), d
    }
    function k(a) {
        var b = [];
        return a.top > 0 && b.push("top"), a.left > 0 && b.push("left"), a.bottom < 0 && b.push("bottom"), a.right < 0 && b.push("right"), a.overflow = b.length ? b : null, a
    }
    function l(a, b) {
        var c = {top: a.top - b.top, left: a.left - b.left, bottom: a.top + a.height - (b.top + b.height), right: a.left + a.width - (b.left + b.width), overflow: []};
        return k(c)
    }
    function m(a, b, c, d) {
        var e, f, g, h = {y: b.y, x: b.x}, i = {y: c.y, x: c.x};
        if (-1 !== d.overflow.indexOf("top") && (e = "top"), -1 !== d.overflow.indexOf("bottom") && (e = e ? null : "bottom"), -1 !== d.overflow.indexOf("left") && (f = "left"), -1 !== d.overflow.indexOf("right") && (f = f ? null : "right"), !e && !f)
            return null;
        switch (a = a === !0 ? "both" : a, g = 0, a) {
            case"item":
                g = 1;
                break;
            case"target":
                g = 2;
                break;
            case"both":
                g = 3
        }
        return 1 & g && (e && (h.y = w[h.y]), f && (h.x = w[h.x])), 2 & g && (e && (i.y = w[i.y]), f && (i.x = w[i.x])), {item_at: h, tar_at: i}
    }
    function n(a, b, c) {
        var d, e, f, g, h;
        return h = c ? ["top", "bottom"] : ["left", "right"], d = a[h[0]], f = b[h[0]], e = -1 * a[h[1]], g = -1 * b[h[1]], 0 > d && (d = 0), 0 > e && (e = 0), 0 > f && (f = 0), 0 > g && (g = 0), 0 > d && 0 > e ? !0 : 0 > f && 0 > g ? !1 : f + g > d + e
    }
    function o(a, b) {
        "all" === b && (b = !0);
        var c = a.distance.overflow;
        if (!c.length)
            return a;
        for (var d, e, f = !1, g = !1, h = c.length - 1; h >= 0; h--)
            switch (d = c[h]) {
                case"top":
                case"bottom":
                    (!g && b === !0 || -1 !== b.indexOf(d)) && (e = a.distance[d], a.moveBy.y += e, a.distance.top -= e, a.distance.bottom -= e, g = !0);
                    break;
                case"left":
                case"right":
                    (!f && b === !0 || -1 !== b.indexOf(d)) && (e = a.distance[d], a.moveBy.x += e, a.distance.left -= e, a.distance.right -= e, f = !0)
            }
        return k(a.distance), a
    }
    function p(a) {
        return this instanceof p ? (this.options = this.$itm = this.$trg = this.$bnd = this.itmAt = this.trgAt = this.itmPos = this.trgPos = this.bndPos = this.itmOffset = this.trgOffset = null, void this._init(a)) : new p(a)
    }
    var q = window, r = document, s = r.documentElement, t = /top|middle|bottom/, u = /left|center|right/, v = /%$/, w = {left: "right", center: "center", right: "left", top: "bottom", middle: "middle", bottom: "top"};
    return p.prototype._init = function (d) {
        var e = this.options = a.extend({}, p.defaults, d);
        return e.item ? (this.$itm = e.item.jquery ? e.item : a(e.item), 0 === this.$itm.length ? null : (this.$trg = e.target && e.target.jquery ? e.target : a(b(e.target)), this.$bnd = e.boundary && e.boundary.jquery ? e.boundary : a(b(e.boundary)), this.itmAt = c(e.itemAt), this.trgAt = c(e.targetAt), this.resize(), this)) : null
    }, p.prototype.resize = function () {
        var a = this.options, b = e(this.$itm), c = this.$trg.length ? e(this.$trg) : null;
        if (this.bndPos = this.$bnd.length ? g(this.$bnd) : null, !this.itmPos || !d(b, this.itmPos)) {
            this.itmPos = b;
            var f = i(a.itemOffset, b);
            f.x = -1 * f.x, f.y = -1 * f.y, this.itmOffset = j(b, f, this.itmAt)
        }
        return this.trgPos && d(c, this.trgPos) || (this.trgPos = c, c && (this.trgOffset = j(c, i(a.targetOffset, c), this.trgAt))), this
    }, p.prototype.calcVariant = function (a, b) {
        var c = {moveBy: null, distance: null, itemAt: null, targetAt: null};
        if (this.trgPos && a && b) {
            var d = {top: this.trgPos.top + this.trgOffset[b.y], left: this.trgPos.left + this.trgOffset[b.x]}, e = {top: d.top - this.itmOffset[a.y], left: d.left - this.itmOffset[a.x], height: this.itmPos.height, width: this.itmPos.width};
            c.moveBy = {y: e.top - this.itmPos.top, x: e.left - this.itmPos.left}, c.distance = this.bndPos ? l(this.bndPos, e) : null, c.itemAt = a.y + " " + a.x, c.targetAt = b.y + " " + b.x
        } else
            c.moveBy = {y: 0, x: 0}, c.distance = this.bndPos ? l(this.bndPos, this.itmPos) : null;
        return c
    }, p.prototype.calculate = function () {
        if (null === this.itmPos)
            return null;
        var a = this.options;
        f(this.$itm, this.itmPos), this.trgPos && f(this.$trg, this.trgPos), this.bndPos && h(this.$bnd, this.bndPos);
        var b = this.calcVariant(this.itmAt, this.trgAt);
        if (!b.distance || !b.distance.overflow)
            return b;
        if (a.flip && "none" !== a.flip && this.trgPos) {
            var c, d = m(a.flip, this.itmAt, this.trgAt, b.distance);
            if (d) {
                if (c = this.calcVariant(d.item_at, d.tar_at), !c.distance.overflow)
                    return c;
                var e = {y: !1, x: !1};
                if (e.y = n(c.distance, b.distance, !0), e.x = n(c.distance, b.distance, !1), e.y !== e.x) {
                    if (b = this.calcVariant({y: e.y ? d.item_at.y : this.itmAt.y, x: e.x ? d.item_at.x : this.itmAt.x}, {y: e.y ? d.tar_at.y : this.trgAt.y, x: e.x ? d.tar_at.x : this.trgAt.x}), !b.distance.overflow)
                        return b
                } else
                    e.y && e.x && (b = c)
            }
        }
        return a.stick && "none" !== a.stick ? o(b, a.stick) : b
    }, p.defaults = {item: null, target: null, boundary: window, itemAt: "top left", targetAt: "top left", itemOffset: {y: 0, x: 0, mirror: !0}, targetOffset: {y: 0, x: 0, mirror: !0}, flip: "none", stick: "none"}, p
});
//# sourceMappingURL=position-calculator.min.map


