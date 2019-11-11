/**
 * XDate v0.8.2
 * Docs & Licensing: http://arshaw.com/xdate/
 */
/*
 * Internal Architecture
 * ---------------------
 * An XDate wraps a native Date. The native Date is stored in the '0' property of the object.
 * UTC-mode is determined by whether the internal native Date's toString method is set to
 * Date.prototype.toUTCString (see getUTCMode).
 * NOTE: This xdate.js is modified by the developer of Google Calendar Desklet to support Cinnamon locales.
 */
function _(t) {
    return Gettext.dgettext(UUID, t)
}
const Gettext = imports.gettext,
    GLib = imports.gi.GLib,
    UUID = "googleCalendar@javahelps.com";
Gettext.bindtextdomain(UUID, GLib.get_home_dir() + "/.local/share/locale");
var XDate = function(t, e, n, r) {
    function u() {
        return i(this instanceof u ? this : new u, arguments)
    }

    function i(e, n) {
        var r, i = n.length;
        if (i > 0 && J(n[i - 1]) && (r = n[--i], n = O(n, 0, i)), i)
            if (1 == i) {
                var o = n[0];
                o instanceof t ? e[0] = new t(o.getTime()) : G(o) ? e[0] = new t(o) : o instanceof u ? e[0] = D(o) : A(o) && (e[0] = new t(0), e = T(o, r || !1, e))
            } else e[0] = new t(rt.apply(t, n)), r || (e[0] = x(e[0]));
        else e[0] = new t;
        return J(r) && s(e, r), e
    }

    function o(t) {
        return t[0].toString === ut
    }

    function s(e, n, r) {
        return n ? o(e) || (r && (e[0] = N(e[0])), e[0].toString = ut) : o(e) && (r ? e[0] = x(e[0]) : e[0] = new t(e[0].getTime())), e
    }

    function a(t, e, n, r, u) {
        var i, o = F(b, t[0], u),
            s = F(z, t[0], u),
            a = !1;
        2 == r.length && J(r[1]) && (a = r[1], r = [n]), i = e == Z ? (n % 12 + 12) % 12 : o(Z), s(e, r), a && o(Z) != i && (s(Z, [o(Z) - 1]), s(j, [H(o(I), o(Z))]))
    }

    function c(t, n, r, u) {
        r = Number(r);
        var i = e.floor(r);
        t["set" + V[n]](t["get" + V[n]]() + i, u || !1), i != r && n < X && c(t, n + 1, (r - i) * et[n], u)
    }

    function f(t, n, r) {
        t = t.clone().setUTCMode(!0, !0), n = u(n).setUTCMode(!0, !0);
        var i = 0;
        if (r == I || r == Z) {
            for (var o = X; o >= r; o--) i /= et[o], i += b(n, !1, o) - b(t, !1, o);
            r == Z && (i += 12 * (n.getFullYear() - t.getFullYear()))
        } else if (r == j) {
            var s = t.toDate().setUTCHours(0, 0, 0, 0),
                a = n.toDate().setUTCHours(0, 0, 0, 0);
            i = e.round((a - s) / B) + (n - a - (t - s)) / B
        } else i = (n - t) / [36e5, 6e4, 1e3, 1][r - 3];
        return i
    }

    function g(t) {
        return h(t(I), t(Z), t(j))
    }

    function h(n, r, u) {
        var i = new t(rt(n, r, u)),
            o = l(d(n, r, u));
        return e.floor(e.round((i - o) / B) / 7) + 1
    }

    function d(e, n, r) {
        var u = new t(rt(e, n, r));
        return u < l(e) ? e - 1 : u >= l(e + 1) ? e + 1 : e
    }

    function l(e) {
        var n = new t(rt(e, 0, 4));
        return n.setUTCDate(n.getUTCDate() - (n.getUTCDay() + 6) % 7), n
    }

    function m(t, e, n, u) {
        var i = F(b, t, u),
            o = F(z, t, u);
        n === r && (n = d(i(I), i(Z), i(j)));
        var s = l(n);
        u || (s = x(s)), t.setTime(s.getTime()), o(j, [i(j) + 7 * (e - 1)])
    }

    function T(e, n, r) {
        for (var i, o = u.parsers, s = 0; s < o.length; s++) {
            i = o[s](e, n, r);
            if (i) return i;
        }
        return r[0] = new t(e), r
    }

    function y(e, n, r) {
        var u = e.match(/^(\d{4})(-(\d{2})(-(\d{2})([T ](\d{2}):(\d{2})(:(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/);
        if (u) {
            var i = new t(rt(u[1], u[3] ? u[3] - 1 : 0, u[5] || 1, u[7] || 0, u[8] || 0, u[10] || 0, u[12] ? 1e3 * Number("0." + u[12]) : 0));
            return u[13] ? u[14] && i.setUTCMinutes(i.getUTCMinutes() + ("-" == u[15] ? 1 : -1) * (60 * Number(u[16]) + (u[18] ? Number(u[18]) : 0))) : n || (i = x(i)), r.setTime(i.getTime())
        }
    }

    function p(t, e, n, r, i) {
        function o(t) {
            return n[t] || c[t]
        }

        function s(t) {
            if (r)
                for (var e = (t == $ ? j : t) - 1; e >= 0; e--) r.push(f(e));
            return f(t)
        }
        var a = u.locales,
            c = a[u.defaultLocale] || {},
            f = F(b, t, i);
        return n = (A(n) ? a[n] : n) || {}, M(t, e, s, o, i)
    }

    function M(t, e, n, r, u) {
        for (var i, o, s = ""; i = e.match(nt);) s += e.substr(0, i.index), i[1] ? s += U(t, i[1], n, r, u) : i[3] ? (o = M(t, i[4], n, r, u), parseInt(o.replace(/\D/g, ""), 10) && (s += o)) : s += i[7] || "'", e = e.substr(i.index + i[0].length);
        return s + e
    }

    function U(t, e, n, u, i) {
        for (var o, s = e.length, a = ""; s > 0;) o = C(t, e.substr(0, s), n, u, i), o !== r ? (a += o, e = e.substr(s), s = e.length) : s--;
        return a + e
    }

    function C(t, e, n, r, i) {
        var o = u.formatters[e];
        if (A(o)) return M(t, o, n, r, i);
        if (Y(o)) return o(t, i || !1, r);
        switch (e) {
            case "fff":
                return k(n(X), 3);
            case "s":
                return n(R);
            case "ss":
                return k(n(R));
            case "m":
                return n(P);
            case "mm":
                return k(n(P));
            case "h":
                return n(E) % 12 || 12;
            case "hh":
                return k(n(E) % 12 || 12);
            case "H":
                return n(E);
            case "HH":
                return k(n(E));
            case "d":
                return n(j);
            case "dd":
                return k(n(j));
            case "ddd":
                return r("dayNamesShort")[n($)] || "";
            case "dddd":
                return r("dayNames")[n($)] || "";
            case "M":
                return n(Z) + 1;
            case "MM":
                return k(n(Z) + 1);
            case "MMM":
                return r("monthNamesShort")[n(Z)] || "";
            case "MMMM":
                return r("monthNames")[n(Z)] || "";
            case "yy":
                return (n(I) + "").substring(2);
            case "yyyy":
                return n(I);
            case "t":
                return S(n, r).substr(0, 1).toLowerCase();
            case "tt":
                return S(n, r).toLowerCase();
            case "T":
                return S(n, r).substr(0, 1);
            case "TT":
                return S(n, r);
            case "z":
            case "zz":
            case "zzz":
                return i ? "Z" : v(t, e);
            case "w":
                return g(n);
            case "ww":
                return k(g(n));
            case "S":
                var s = n(j);
                return s > 10 && s < 20 ? "th" : ["st", "nd", "rd"][s % 10 - 1] || "th"
        }
    }

    function v(t, n) {
        var r = t.getTimezoneOffset(),
            u = r < 0 ? "+" : "-",
            i = e.floor(e.abs(r) / 60),
            o = e.abs(r) % 60,
            s = i;
        return "zz" == n ? s = k(i) : "zzz" == n && (s = k(i) + ":" + k(o)), u + s
    }

    function S(t, e) {
        return e(t(E) < 12 ? "amDesignator" : "pmDesignator")
    }

    function w(t) {
        return !isNaN(t[0].getTime())
    }

    function D(e) {
        var n = new t(e[0].getTime());
        return o(e) && (n.toString = ut), n
    }

    function b(t, e, n) {
        return t["get" + (e ? "UTC" : "") + V[n]]()
    }

    function z(t, e, n, r) {
        t["set" + (e ? "UTC" : "") + V[n]].apply(t, r)
    }

    function N(e) {
        return new t(rt(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()))
    }

    function x(e) {
        return new t(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds())
    }

    function H(e, n) {
        return 32 - new t(rt(e, n, 32)).getUTCDate()
    }

    function L(t) {
        return function() {
            return t.apply(r, [this].concat(O(arguments)))
        }
    }

    function F(t) {
        var e = O(arguments, 1);
        return function() {
            return t.apply(r, e.concat(O(arguments)))
        }
    }

    function O(t, e, u) {
        return n.prototype.slice.call(t, e || 0, u === r ? t.length : u)
    }

    function W(t, e) {
        for (var n = 0; n < t.length; n++) e(t[n], n)
    }

    function A(t) {
        return "string" == typeof t
    }

    function G(t) {
        return "number" == typeof t
    }

    function J(t) {
        return "boolean" == typeof t
    }

    function Y(t) {
        return "function" == typeof t
    }

    function k(t, e) {
        for (e = e || 2, t += ""; t.length < e;) t = "0" + t;
        return t
    }
    var I = 0,
        Z = 1,
        j = 2,
        E = 3,
        P = 4,
        R = 5,
        X = 6,
        $ = 7,
        q = 8,
        B = 864e5,
        K = "yyyy-MM-dd'T'HH:mm:ss(.fff)",
        Q = K + "zzz",
        V = ["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds", "Milliseconds", "Day", "Year"],
        tt = ["Years", "Months", "Days"],
        et = [12, 31, 24, 60, 60, 1e3, 1],
        nt = new RegExp("(([a-zA-Z])\\2*)|(\\((('.*?'|\\(.*?\\)|.)*?)\\))|('(.*?)')"),
        rt = t.UTC,
        ut = t.prototype.toUTCString,
        it = u.prototype;
    return it.length = 1, it.splice = n.prototype.splice, it.getUTCMode = L(o), it.setUTCMode = L(s), it.getTimezoneOffset = function() {
        return o(this) ? 0 : this[0].getTimezoneOffset()
    }, W(V, function(t, e) {
        it["get" + t] = function() {
            return b(this[0], o(this), e)
        }, e != q && (it["getUTC" + t] = function() {
            return b(this[0], !0, e)
        }), e != $ && (it["set" + t] = function(t) {
            return a(this, e, t, arguments, o(this)), this
        }, e != q && (it["setUTC" + t] = function(t) {
            return a(this, e, t, arguments, !0), this
        }, it["add" + (tt[e] || t)] = function(t, n) {
            return c(this, e, t, n), this
        }, it["diff" + (tt[e] || t)] = function(t) {
            return f(this, t, e)
        }))
    }), it.getWeek = function() {
        return g(F(b, this, !1))
    }, it.getUTCWeek = function() {
        return g(F(b, this, !0))
    }, it.setWeek = function(t, e) {
        return m(this, t, e, !1), this
    }, it.setUTCWeek = function(t, e) {
        return m(this, t, e, !0), this
    }, it.addWeeks = function(t) {
        return this.addDays(7 * Number(t))
    }, it.diffWeeks = function(t) {
        return f(this, t, j) / 7
    }, u.parsers = [y], u.parse = function(t) {
        return +u("" + t)
    }, it.toString = function(t, e, n) {
        return t !== r && w(this) ? p(this, t, e, n, o(this)) : this[0].toString()
    }, it.toUTCString = it.toGMTString = function(t, e, n) {
        return t !== r && w(this) ? p(this, t, e, n, !0) : this[0].toUTCString()
    }, it.toISOString = function() {
        return this.toUTCString(Q)
    }, u.defaultLocale = "", u.locales = {
        "": {
            monthNames: [_("January"), _("February"), _("March"), _("April"), Gettext.dpgettext(UUID, "long", "May"), _("June"), _("July"), _("August"), _("September"), _("October"), _("November"), _("December")],
            monthNamesShort: [_("Jan"), _("Feb"), _("Mar"), _("Apr"), Gettext.dpgettext(UUID, "short", "May"), _("Jun"), _("Jul"), _("Aug"), _("Sep"), _("Oct"), _("Nov"), _("Dec")],
            dayNames: [_("Sunday"), _("Monday"), _("Tuesday"), _("Wednesday"), _("Thursday"), _("Friday"), _("Saturday")],
            dayNamesShort: [_("Sun"), _("Mon"), _("Tue"), _("Wed"), _("Thu"), _("Fri"), _("Sat")],
            amDesignator: _("AM"),
            pmDesignator: _("PM")
        }
    }, u.formatters = {
        i: K,
        u: Q
    }, W(["getTime", "valueOf", "toDateString", "toTimeString", "toLocaleString", "toLocaleDateString", "toLocaleTimeString", "toJSON"], function(t) {
        it[t] = function() {
            return this[0][t]()
        }
    }), it.setTime = function(t) {
        return this[0].setTime(t), this
    }, it.valid = L(w), it.clone = function() {
        return new u(this)
    }, it.clearTime = function() {
        return this.setHours(0, 0, 0, 0)
    }, it.toDate = function() {
        return new t(this[0].getTime())
    }, u.now = function() {
        return (new t).getTime()
    }, u.today = function() {
        return (new u).clearTime()
    }, u.UTC = rt, u.getDaysInMonth = H, "undefined" != typeof module && module.exports && (module.exports = u), "function" == typeof define && define.amd && define([], function() {
        return u
    }), u
}(Date, Math, Array);
