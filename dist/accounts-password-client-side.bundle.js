//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var SHA256;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/sha/sha256.js                                                                                     //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
/// METEOR WRAPPER                                                                                            // 1
//                                                                                                            // 2
SHA256 = (function () {                                                                                       // 3
                                                                                                              // 4
                                                                                                              // 5
/**                                                                                                           // 6
*                                                                                                             // 7
*  Secure Hash Algorithm (SHA256)                                                                             // 8
*  http://www.webtoolkit.info/javascript-sha256.html                                                          // 9
*  http://anmar.eu.org/projects/jssha2/                                                                       // 10
*                                                                                                             // 11
*  Original code by Angel Marin, Paul Johnston.                                                               // 12
*                                                                                                             // 13
**/                                                                                                           // 14
                                                                                                              // 15
function SHA256(s){                                                                                           // 16
                                                                                                              // 17
	var chrsz   = 8;                                                                                             // 18
	var hexcase = 0;                                                                                             // 19
                                                                                                              // 20
	function safe_add (x, y) {                                                                                   // 21
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);                                                                      // 22
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);                                                              // 23
		return (msw << 16) | (lsw & 0xFFFF);                                                                        // 24
	}                                                                                                            // 25
                                                                                                              // 26
	function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }                                                  // 27
	function R (X, n) { return ( X >>> n ); }                                                                    // 28
	function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }                                                      // 29
	function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }                                              // 30
	function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }                                            // 31
	function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }                                            // 32
	function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }                                             // 33
	function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }                                           // 34
                                                                                                              // 35
	function core_sha256 (m, l) {                                                                                // 36
		var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
		var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
		var W = new Array(64);                                                                                      // 39
		var a, b, c, d, e, f, g, h, i, j;                                                                           // 40
		var T1, T2;                                                                                                 // 41
                                                                                                              // 42
		m[l >> 5] |= 0x80 << (24 - l % 32);                                                                         // 43
		m[((l + 64 >> 9) << 4) + 15] = l;                                                                           // 44
                                                                                                              // 45
		for ( var i = 0; i<m.length; i+=16 ) {                                                                      // 46
			a = HASH[0];                                                                                               // 47
			b = HASH[1];                                                                                               // 48
			c = HASH[2];                                                                                               // 49
			d = HASH[3];                                                                                               // 50
			e = HASH[4];                                                                                               // 51
			f = HASH[5];                                                                                               // 52
			g = HASH[6];                                                                                               // 53
			h = HASH[7];                                                                                               // 54
                                                                                                              // 55
			for ( var j = 0; j<64; j++) {                                                                              // 56
				if (j < 16) W[j] = m[j + i];                                                                              // 57
				else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
                                                                                                              // 59
				T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);                    // 60
				T2 = safe_add(Sigma0256(a), Maj(a, b, c));                                                                // 61
                                                                                                              // 62
				h = g;                                                                                                    // 63
				g = f;                                                                                                    // 64
				f = e;                                                                                                    // 65
				e = safe_add(d, T1);                                                                                      // 66
				d = c;                                                                                                    // 67
				c = b;                                                                                                    // 68
				b = a;                                                                                                    // 69
				a = safe_add(T1, T2);                                                                                     // 70
			}                                                                                                          // 71
                                                                                                              // 72
			HASH[0] = safe_add(a, HASH[0]);                                                                            // 73
			HASH[1] = safe_add(b, HASH[1]);                                                                            // 74
			HASH[2] = safe_add(c, HASH[2]);                                                                            // 75
			HASH[3] = safe_add(d, HASH[3]);                                                                            // 76
			HASH[4] = safe_add(e, HASH[4]);                                                                            // 77
			HASH[5] = safe_add(f, HASH[5]);                                                                            // 78
			HASH[6] = safe_add(g, HASH[6]);                                                                            // 79
			HASH[7] = safe_add(h, HASH[7]);                                                                            // 80
		}                                                                                                           // 81
		return HASH;                                                                                                // 82
	}                                                                                                            // 83
                                                                                                              // 84
	function str2binb (str) {                                                                                    // 85
		var bin = Array();                                                                                          // 86
		var mask = (1 << chrsz) - 1;                                                                                // 87
		for(var i = 0; i < str.length * chrsz; i += chrsz) {                                                        // 88
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);                                            // 89
		}                                                                                                           // 90
		return bin;                                                                                                 // 91
	}                                                                                                            // 92
                                                                                                              // 93
	function Utf8Encode(string) {                                                                                // 94
		// METEOR change:                                                                                           // 95
		// The webtoolkit.info version of this code added this                                                      // 96
		// Utf8Encode function (which does seem necessary for dealing                                               // 97
		// with arbitrary Unicode), but the following line seems                                                    // 98
		// problematic:                                                                                             // 99
		//                                                                                                          // 100
		// string = string.replace(/\r\n/g,"\n");                                                                   // 101
		var utftext = "";                                                                                           // 102
                                                                                                              // 103
		for (var n = 0; n < string.length; n++) {                                                                   // 104
                                                                                                              // 105
			var c = string.charCodeAt(n);                                                                              // 106
                                                                                                              // 107
			if (c < 128) {                                                                                             // 108
				utftext += String.fromCharCode(c);                                                                        // 109
			}                                                                                                          // 110
			else if((c > 127) && (c < 2048)) {                                                                         // 111
				utftext += String.fromCharCode((c >> 6) | 192);                                                           // 112
				utftext += String.fromCharCode((c & 63) | 128);                                                           // 113
			}                                                                                                          // 114
			else {                                                                                                     // 115
				utftext += String.fromCharCode((c >> 12) | 224);                                                          // 116
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);                                                    // 117
				utftext += String.fromCharCode((c & 63) | 128);                                                           // 118
			}                                                                                                          // 119
                                                                                                              // 120
		}                                                                                                           // 121
                                                                                                              // 122
		return utftext;                                                                                             // 123
	}                                                                                                            // 124
                                                                                                              // 125
	function binb2hex (binarray) {                                                                               // 126
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";                                            // 127
		var str = "";                                                                                               // 128
		for(var i = 0; i < binarray.length * 4; i++) {                                                              // 129
			str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +                                         // 130
			hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);                                                 // 131
		}                                                                                                           // 132
		return str;                                                                                                 // 133
	}                                                                                                            // 134
                                                                                                              // 135
	s = Utf8Encode(s);                                                                                           // 136
	return binb2hex(core_sha256(str2binb(s), s.length * chrsz));                                                 // 137
                                                                                                              // 138
}                                                                                                             // 139
                                                                                                              // 140
/// METEOR WRAPPER                                                                                            // 141
return SHA256;                                                                                                // 142
})();                                                                                                         // 143
                                                                                                              // 144
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.sha = {}, {
  SHA256: SHA256
});

})();
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Random = Package.random.Random;
var check = Package.check.check;
var Match = Package.check.Match;
var SHA256 = Package.sha.SHA256;
var _ = Package.underscore._;

/* Package-scope variables */
var BigInteger, SRP;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/srp/biginteger.js                                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
/// METEOR WRAPPER                                                                                                  // 1
BigInteger = (function () {                                                                                         // 2
                                                                                                                    // 3
                                                                                                                    // 4
/// BEGIN jsbn.js                                                                                                   // 5
                                                                                                                    // 6
/*                                                                                                                  // 7
 * Copyright (c) 2003-2005  Tom Wu                                                                                  // 8
 * All Rights Reserved.                                                                                             // 9
 *                                                                                                                  // 10
 * Permission is hereby granted, free of charge, to any person obtaining                                            // 11
 * a copy of this software and associated documentation files (the                                                  // 12
 * "Software"), to deal in the Software without restriction, including                                              // 13
 * without limitation the rights to use, copy, modify, merge, publish,                                              // 14
 * distribute, sublicense, and/or sell copies of the Software, and to                                               // 15
 * permit persons to whom the Software is furnished to do so, subject to                                            // 16
 * the following conditions:                                                                                        // 17
 *                                                                                                                  // 18
 * The above copyright notice and this permission notice shall be                                                   // 19
 * included in all copies or substantial portions of the Software.                                                  // 20
 *                                                                                                                  // 21
 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND,                                               // 22
 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY                                                 // 23
 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.                                                 // 24
 *                                                                                                                  // 25
 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,                                                  // 26
 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER                                         // 27
 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF                                           // 28
 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT                                           // 29
 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.                                                // 30
 *                                                                                                                  // 31
 * In addition, the following condition applies:                                                                    // 32
 *                                                                                                                  // 33
 * All redistributions must retain an intact copy of this copyright notice                                          // 34
 * and disclaimer.                                                                                                  // 35
 */                                                                                                                 // 36
                                                                                                                    // 37
// Basic JavaScript BN library - subset useful for RSA encryption.                                                  // 38
                                                                                                                    // 39
// Bits per digit                                                                                                   // 40
var dbits;                                                                                                          // 41
                                                                                                                    // 42
// JavaScript engine analysis                                                                                       // 43
var canary = 0xdeadbeefcafe;                                                                                        // 44
var j_lm = ((canary&0xffffff)==0xefcafe);                                                                           // 45
                                                                                                                    // 46
// (public) Constructor                                                                                             // 47
function BigInteger(a,b,c) {                                                                                        // 48
  if(a != null)                                                                                                     // 49
    if("number" == typeof a) this.fromNumber(a,b,c);                                                                // 50
    else if(b == null && "string" != typeof a) this.fromString(a,256);                                              // 51
    else this.fromString(a,b);                                                                                      // 52
}                                                                                                                   // 53
                                                                                                                    // 54
// return new, unset BigInteger                                                                                     // 55
function nbi() { return new BigInteger(null); }                                                                     // 56
                                                                                                                    // 57
// am: Compute w_j += (x*this_i), propagate carries,                                                                // 58
// c is initial carry, returns final carry.                                                                         // 59
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue                                                                      // 60
// We need to select the fastest one that works in this environment.                                                // 61
                                                                                                                    // 62
// am1: use a single mult and divide to get the high bits,                                                          // 63
// max digit bits should be 26 because                                                                              // 64
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)                                                                // 65
function am1(i,x,w,j,c,n) {                                                                                         // 66
  while(--n >= 0) {                                                                                                 // 67
    var v = x*this[i++]+w[j]+c;                                                                                     // 68
    c = Math.floor(v/0x4000000);                                                                                    // 69
    w[j++] = v&0x3ffffff;                                                                                           // 70
  }                                                                                                                 // 71
  return c;                                                                                                         // 72
}                                                                                                                   // 73
// am2 avoids a big mult-and-extract completely.                                                                    // 74
// Max digit bits should be <= 30 because we do bitwise ops                                                         // 75
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)                                                                   // 76
function am2(i,x,w,j,c,n) {                                                                                         // 77
  var xl = x&0x7fff, xh = x>>15;                                                                                    // 78
  while(--n >= 0) {                                                                                                 // 79
    var l = this[i]&0x7fff;                                                                                         // 80
    var h = this[i++]>>15;                                                                                          // 81
    var m = xh*l+h*xl;                                                                                              // 82
    l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);                                                                  // 83
    c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);                                                                            // 84
    w[j++] = l&0x3fffffff;                                                                                          // 85
  }                                                                                                                 // 86
  return c;                                                                                                         // 87
}                                                                                                                   // 88
// Alternately, set max digit bits to 28 since some                                                                 // 89
// browsers slow down when dealing with 32-bit numbers.                                                             // 90
function am3(i,x,w,j,c,n) {                                                                                         // 91
  var xl = x&0x3fff, xh = x>>14;                                                                                    // 92
  while(--n >= 0) {                                                                                                 // 93
    var l = this[i]&0x3fff;                                                                                         // 94
    var h = this[i++]>>14;                                                                                          // 95
    var m = xh*l+h*xl;                                                                                              // 96
    l = xl*l+((m&0x3fff)<<14)+w[j]+c;                                                                               // 97
    c = (l>>28)+(m>>14)+xh*h;                                                                                       // 98
    w[j++] = l&0xfffffff;                                                                                           // 99
  }                                                                                                                 // 100
  return c;                                                                                                         // 101
}                                                                                                                   // 102
                                                                                                                    // 103
/* XXX METEOR XXX                                                                                                   // 104
if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {                                                  // 105
  BigInteger.prototype.am = am2;                                                                                    // 106
  dbits = 30;                                                                                                       // 107
}                                                                                                                   // 108
else if(j_lm && (navigator.appName != "Netscape")) {                                                                // 109
  BigInteger.prototype.am = am1;                                                                                    // 110
  dbits = 26;                                                                                                       // 111
}                                                                                                                   // 112
else                                                                                                                // 113
*/                                                                                                                  // 114
                                                                                                                    // 115
{ // Mozilla/Netscape seems to prefer am3                                                                           // 116
  BigInteger.prototype.am = am3;                                                                                    // 117
  dbits = 28;                                                                                                       // 118
}                                                                                                                   // 119
                                                                                                                    // 120
BigInteger.prototype.DB = dbits;                                                                                    // 121
BigInteger.prototype.DM = ((1<<dbits)-1);                                                                           // 122
BigInteger.prototype.DV = (1<<dbits);                                                                               // 123
                                                                                                                    // 124
var BI_FP = 52;                                                                                                     // 125
BigInteger.prototype.FV = Math.pow(2,BI_FP);                                                                        // 126
BigInteger.prototype.F1 = BI_FP-dbits;                                                                              // 127
BigInteger.prototype.F2 = 2*dbits-BI_FP;                                                                            // 128
                                                                                                                    // 129
// Digit conversions                                                                                                // 130
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";                                                                 // 131
var BI_RC = new Array();                                                                                            // 132
var rr,vv;                                                                                                          // 133
rr = "0".charCodeAt(0);                                                                                             // 134
for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;                                                                        // 135
rr = "a".charCodeAt(0);                                                                                             // 136
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;                                                                       // 137
rr = "A".charCodeAt(0);                                                                                             // 138
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;                                                                       // 139
                                                                                                                    // 140
function int2char(n) { return BI_RM.charAt(n); }                                                                    // 141
function intAt(s,i) {                                                                                               // 142
  var c = BI_RC[s.charCodeAt(i)];                                                                                   // 143
  return (c==null)?-1:c;                                                                                            // 144
}                                                                                                                   // 145
                                                                                                                    // 146
// (protected) copy this to r                                                                                       // 147
function bnpCopyTo(r) {                                                                                             // 148
  for(var i = this.t-1; i >= 0; --i) r[i] = this[i];                                                                // 149
  r.t = this.t;                                                                                                     // 150
  r.s = this.s;                                                                                                     // 151
}                                                                                                                   // 152
                                                                                                                    // 153
// (protected) set from integer value x, -DV <= x < DV                                                              // 154
function bnpFromInt(x) {                                                                                            // 155
  this.t = 1;                                                                                                       // 156
  this.s = (x<0)?-1:0;                                                                                              // 157
  if(x > 0) this[0] = x;                                                                                            // 158
  else if(x < -1) this[0] = x+DV;                                                                                   // 159
  else this.t = 0;                                                                                                  // 160
}                                                                                                                   // 161
                                                                                                                    // 162
// return bigint initialized to value                                                                               // 163
function nbv(i) { var r = nbi(); r.fromInt(i); return r; }                                                          // 164
                                                                                                                    // 165
// (protected) set from string and radix                                                                            // 166
function bnpFromString(s,b) {                                                                                       // 167
  var k;                                                                                                            // 168
  if(b == 16) k = 4;                                                                                                // 169
  else if(b == 8) k = 3;                                                                                            // 170
  else if(b == 256) k = 8; // byte array                                                                            // 171
  else if(b == 2) k = 1;                                                                                            // 172
  else if(b == 32) k = 5;                                                                                           // 173
  else if(b == 4) k = 2;                                                                                            // 174
  else { this.fromRadix(s,b); return; }                                                                             // 175
  this.t = 0;                                                                                                       // 176
  this.s = 0;                                                                                                       // 177
  var i = s.length, mi = false, sh = 0;                                                                             // 178
  while(--i >= 0) {                                                                                                 // 179
    var x = (k==8)?s[i]&0xff:intAt(s,i);                                                                            // 180
    if(x < 0) {                                                                                                     // 181
      if(s.charAt(i) == "-") mi = true;                                                                             // 182
      continue;                                                                                                     // 183
    }                                                                                                               // 184
    mi = false;                                                                                                     // 185
    if(sh == 0)                                                                                                     // 186
      this[this.t++] = x;                                                                                           // 187
    else if(sh+k > this.DB) {                                                                                       // 188
      this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;                                                              // 189
      this[this.t++] = (x>>(this.DB-sh));                                                                           // 190
    }                                                                                                               // 191
    else                                                                                                            // 192
      this[this.t-1] |= x<<sh;                                                                                      // 193
    sh += k;                                                                                                        // 194
    if(sh >= this.DB) sh -= this.DB;                                                                                // 195
  }                                                                                                                 // 196
  if(k == 8 && (s[0]&0x80) != 0) {                                                                                  // 197
    this.s = -1;                                                                                                    // 198
    if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;                                                         // 199
  }                                                                                                                 // 200
  this.clamp();                                                                                                     // 201
  if(mi) BigInteger.ZERO.subTo(this,this);                                                                          // 202
}                                                                                                                   // 203
                                                                                                                    // 204
// (protected) clamp off excess high words                                                                          // 205
function bnpClamp() {                                                                                               // 206
  var c = this.s&this.DM;                                                                                           // 207
  while(this.t > 0 && this[this.t-1] == c) --this.t;                                                                // 208
}                                                                                                                   // 209
                                                                                                                    // 210
// (public) return string representation in given radix                                                             // 211
function bnToString(b) {                                                                                            // 212
  if(this.s < 0) return "-"+this.negate().toString(b);                                                              // 213
  var k;                                                                                                            // 214
  if(b == 16) k = 4;                                                                                                // 215
  else if(b == 8) k = 3;                                                                                            // 216
  else if(b == 2) k = 1;                                                                                            // 217
  else if(b == 32) k = 5;                                                                                           // 218
  else if(b == 4) k = 2;                                                                                            // 219
  else return this.toRadix(b);                                                                                      // 220
  var km = (1<<k)-1, d, m = false, r = "", i = this.t;                                                              // 221
  var p = this.DB-(i*this.DB)%k;                                                                                    // 222
  if(i-- > 0) {                                                                                                     // 223
    if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }                                          // 224
    while(i >= 0) {                                                                                                 // 225
      if(p < k) {                                                                                                   // 226
        d = (this[i]&((1<<p)-1))<<(k-p);                                                                            // 227
        d |= this[--i]>>(p+=this.DB-k);                                                                             // 228
      }                                                                                                             // 229
      else {                                                                                                        // 230
        d = (this[i]>>(p-=k))&km;                                                                                   // 231
        if(p <= 0) { p += this.DB; --i; }                                                                           // 232
      }                                                                                                             // 233
      if(d > 0) m = true;                                                                                           // 234
      if(m) r += int2char(d);                                                                                       // 235
    }                                                                                                               // 236
  }                                                                                                                 // 237
  return m?r:"0";                                                                                                   // 238
}                                                                                                                   // 239
                                                                                                                    // 240
// (public) -this                                                                                                   // 241
function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }                                     // 242
                                                                                                                    // 243
// (public) |this|                                                                                                  // 244
function bnAbs() { return (this.s<0)?this.negate():this; }                                                          // 245
                                                                                                                    // 246
// (public) return + if this > a, - if this < a, 0 if equal                                                         // 247
function bnCompareTo(a) {                                                                                           // 248
  var r = this.s-a.s;                                                                                               // 249
  if(r != 0) return r;                                                                                              // 250
  var i = this.t;                                                                                                   // 251
  r = i-a.t;                                                                                                        // 252
  if(r != 0) return r;                                                                                              // 253
  while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;                                                               // 254
  return 0;                                                                                                         // 255
}                                                                                                                   // 256
                                                                                                                    // 257
// returns bit length of the integer x                                                                              // 258
function nbits(x) {                                                                                                 // 259
  var r = 1, t;                                                                                                     // 260
  if((t=x>>>16) != 0) { x = t; r += 16; }                                                                           // 261
  if((t=x>>8) != 0) { x = t; r += 8; }                                                                              // 262
  if((t=x>>4) != 0) { x = t; r += 4; }                                                                              // 263
  if((t=x>>2) != 0) { x = t; r += 2; }                                                                              // 264
  if((t=x>>1) != 0) { x = t; r += 1; }                                                                              // 265
  return r;                                                                                                         // 266
}                                                                                                                   // 267
                                                                                                                    // 268
// (public) return the number of bits in "this"                                                                     // 269
function bnBitLength() {                                                                                            // 270
  if(this.t <= 0) return 0;                                                                                         // 271
  return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));                                                 // 272
}                                                                                                                   // 273
                                                                                                                    // 274
// (protected) r = this << n*DB                                                                                     // 275
function bnpDLShiftTo(n,r) {                                                                                        // 276
  var i;                                                                                                            // 277
  for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];                                                                  // 278
  for(i = n-1; i >= 0; --i) r[i] = 0;                                                                               // 279
  r.t = this.t+n;                                                                                                   // 280
  r.s = this.s;                                                                                                     // 281
}                                                                                                                   // 282
                                                                                                                    // 283
// (protected) r = this >> n*DB                                                                                     // 284
function bnpDRShiftTo(n,r) {                                                                                        // 285
  for(var i = n; i < this.t; ++i) r[i-n] = this[i];                                                                 // 286
  r.t = Math.max(this.t-n,0);                                                                                       // 287
  r.s = this.s;                                                                                                     // 288
}                                                                                                                   // 289
                                                                                                                    // 290
// (protected) r = this << n                                                                                        // 291
function bnpLShiftTo(n,r) {                                                                                         // 292
  var bs = n%this.DB;                                                                                               // 293
  var cbs = this.DB-bs;                                                                                             // 294
  var bm = (1<<cbs)-1;                                                                                              // 295
  var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;                                                      // 296
  for(i = this.t-1; i >= 0; --i) {                                                                                  // 297
    r[i+ds+1] = (this[i]>>cbs)|c;                                                                                   // 298
    c = (this[i]&bm)<<bs;                                                                                           // 299
  }                                                                                                                 // 300
  for(i = ds-1; i >= 0; --i) r[i] = 0;                                                                              // 301
  r[ds] = c;                                                                                                        // 302
  r.t = this.t+ds+1;                                                                                                // 303
  r.s = this.s;                                                                                                     // 304
  r.clamp();                                                                                                        // 305
}                                                                                                                   // 306
                                                                                                                    // 307
// (protected) r = this >> n                                                                                        // 308
function bnpRShiftTo(n,r) {                                                                                         // 309
  r.s = this.s;                                                                                                     // 310
  var ds = Math.floor(n/this.DB);                                                                                   // 311
  if(ds >= this.t) { r.t = 0; return; }                                                                             // 312
  var bs = n%this.DB;                                                                                               // 313
  var cbs = this.DB-bs;                                                                                             // 314
  var bm = (1<<bs)-1;                                                                                               // 315
  r[0] = this[ds]>>bs;                                                                                              // 316
  for(var i = ds+1; i < this.t; ++i) {                                                                              // 317
    r[i-ds-1] |= (this[i]&bm)<<cbs;                                                                                 // 318
    r[i-ds] = this[i]>>bs;                                                                                          // 319
  }                                                                                                                 // 320
  if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;                                                                    // 321
  r.t = this.t-ds;                                                                                                  // 322
  r.clamp();                                                                                                        // 323
}                                                                                                                   // 324
                                                                                                                    // 325
// (protected) r = this - a                                                                                         // 326
function bnpSubTo(a,r) {                                                                                            // 327
  var i = 0, c = 0, m = Math.min(a.t,this.t);                                                                       // 328
  while(i < m) {                                                                                                    // 329
    c += this[i]-a[i];                                                                                              // 330
    r[i++] = c&this.DM;                                                                                             // 331
    c >>= this.DB;                                                                                                  // 332
  }                                                                                                                 // 333
  if(a.t < this.t) {                                                                                                // 334
    c -= a.s;                                                                                                       // 335
    while(i < this.t) {                                                                                             // 336
      c += this[i];                                                                                                 // 337
      r[i++] = c&this.DM;                                                                                           // 338
      c >>= this.DB;                                                                                                // 339
    }                                                                                                               // 340
    c += this.s;                                                                                                    // 341
  }                                                                                                                 // 342
  else {                                                                                                            // 343
    c += this.s;                                                                                                    // 344
    while(i < a.t) {                                                                                                // 345
      c -= a[i];                                                                                                    // 346
      r[i++] = c&this.DM;                                                                                           // 347
      c >>= this.DB;                                                                                                // 348
    }                                                                                                               // 349
    c -= a.s;                                                                                                       // 350
  }                                                                                                                 // 351
  r.s = (c<0)?-1:0;                                                                                                 // 352
  if(c < -1) r[i++] = this.DV+c;                                                                                    // 353
  else if(c > 0) r[i++] = c;                                                                                        // 354
  r.t = i;                                                                                                          // 355
  r.clamp();                                                                                                        // 356
}                                                                                                                   // 357
                                                                                                                    // 358
// (protected) r = this * a, r != this,a (HAC 14.12)                                                                // 359
// "this" should be the larger one if appropriate.                                                                  // 360
function bnpMultiplyTo(a,r) {                                                                                       // 361
  var x = this.abs(), y = a.abs();                                                                                  // 362
  var i = x.t;                                                                                                      // 363
  r.t = i+y.t;                                                                                                      // 364
  while(--i >= 0) r[i] = 0;                                                                                         // 365
  for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);                                                       // 366
  r.s = 0;                                                                                                          // 367
  r.clamp();                                                                                                        // 368
  if(this.s != a.s) BigInteger.ZERO.subTo(r,r);                                                                     // 369
}                                                                                                                   // 370
                                                                                                                    // 371
// (protected) r = this^2, r != this (HAC 14.16)                                                                    // 372
function bnpSquareTo(r) {                                                                                           // 373
  var x = this.abs();                                                                                               // 374
  var i = r.t = 2*x.t;                                                                                              // 375
  while(--i >= 0) r[i] = 0;                                                                                         // 376
  for(i = 0; i < x.t-1; ++i) {                                                                                      // 377
    var c = x.am(i,x[i],r,2*i,0,1);                                                                                 // 378
    if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {                                                    // 379
      r[i+x.t] -= x.DV;                                                                                             // 380
      r[i+x.t+1] = 1;                                                                                               // 381
    }                                                                                                               // 382
  }                                                                                                                 // 383
  if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);                                                                   // 384
  r.s = 0;                                                                                                          // 385
  r.clamp();                                                                                                        // 386
}                                                                                                                   // 387
                                                                                                                    // 388
// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)                                         // 389
// r != q, this != m.  q or r may be null.                                                                          // 390
function bnpDivRemTo(m,q,r) {                                                                                       // 391
  var pm = m.abs();                                                                                                 // 392
  if(pm.t <= 0) return;                                                                                             // 393
  var pt = this.abs();                                                                                              // 394
  if(pt.t < pm.t) {                                                                                                 // 395
    if(q != null) q.fromInt(0);                                                                                     // 396
    if(r != null) this.copyTo(r);                                                                                   // 397
    return;                                                                                                         // 398
  }                                                                                                                 // 399
  if(r == null) r = nbi();                                                                                          // 400
  var y = nbi(), ts = this.s, ms = m.s;                                                                             // 401
  var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus                                                         // 402
  if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }                                                           // 403
  else { pm.copyTo(y); pt.copyTo(r); }                                                                              // 404
  var ys = y.t;                                                                                                     // 405
  var y0 = y[ys-1];                                                                                                 // 406
  if(y0 == 0) return;                                                                                               // 407
  var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);                                                             // 408
  var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;                                                        // 409
  var i = r.t, j = i-ys, t = (q==null)?nbi():q;                                                                     // 410
  y.dlShiftTo(j,t);                                                                                                 // 411
  if(r.compareTo(t) >= 0) {                                                                                         // 412
    r[r.t++] = 1;                                                                                                   // 413
    r.subTo(t,r);                                                                                                   // 414
  }                                                                                                                 // 415
  BigInteger.ONE.dlShiftTo(ys,t);                                                                                   // 416
  t.subTo(y,y);	// "negative" y so we can replace sub with am later                                                 // 417
  while(y.t < ys) y[y.t++] = 0;                                                                                     // 418
  while(--j >= 0) {                                                                                                 // 419
    // Estimate quotient digit                                                                                      // 420
    var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);                                                // 421
    if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out                                                            // 422
      y.dlShiftTo(j,t);                                                                                             // 423
      r.subTo(t,r);                                                                                                 // 424
      while(r[i] < --qd) r.subTo(t,r);                                                                              // 425
    }                                                                                                               // 426
  }                                                                                                                 // 427
  if(q != null) {                                                                                                   // 428
    r.drShiftTo(ys,q);                                                                                              // 429
    if(ts != ms) BigInteger.ZERO.subTo(q,q);                                                                        // 430
  }                                                                                                                 // 431
  r.t = ys;                                                                                                         // 432
  r.clamp();                                                                                                        // 433
  if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder                                                           // 434
  if(ts < 0) BigInteger.ZERO.subTo(r,r);                                                                            // 435
}                                                                                                                   // 436
                                                                                                                    // 437
// (public) this mod a                                                                                              // 438
function bnMod(a) {                                                                                                 // 439
  var r = nbi();                                                                                                    // 440
  this.abs().divRemTo(a,null,r);                                                                                    // 441
  if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);                                                  // 442
  return r;                                                                                                         // 443
}                                                                                                                   // 444
                                                                                                                    // 445
// Modular reduction using "classic" algorithm                                                                      // 446
function Classic(m) { this.m = m; }                                                                                 // 447
function cConvert(x) {                                                                                              // 448
  if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);                                                     // 449
  else return x;                                                                                                    // 450
}                                                                                                                   // 451
function cRevert(x) { return x; }                                                                                   // 452
function cReduce(x) { x.divRemTo(this.m,null,x); }                                                                  // 453
function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }                                                       // 454
function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }                                                             // 455
                                                                                                                    // 456
Classic.prototype.convert = cConvert;                                                                               // 457
Classic.prototype.revert = cRevert;                                                                                 // 458
Classic.prototype.reduce = cReduce;                                                                                 // 459
Classic.prototype.mulTo = cMulTo;                                                                                   // 460
Classic.prototype.sqrTo = cSqrTo;                                                                                   // 461
                                                                                                                    // 462
// (protected) return "-1/this % 2^DB"; useful for Mont. reduction                                                  // 463
// justification:                                                                                                   // 464
//         xy == 1 (mod m)                                                                                          // 465
//         xy =  1+km                                                                                               // 466
//   xy(2-xy) = (1+km)(1-km)                                                                                        // 467
// x[y(2-xy)] = 1-k^2m^2                                                                                            // 468
// x[y(2-xy)] == 1 (mod m^2)                                                                                        // 469
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2                                                                   // 470
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.                                            // 471
// JS multiply "overflows" differently from C/C++, so care is needed here.                                          // 472
function bnpInvDigit() {                                                                                            // 473
  if(this.t < 1) return 0;                                                                                          // 474
  var x = this[0];                                                                                                  // 475
  if((x&1) == 0) return 0;                                                                                          // 476
  var y = x&3;		// y == 1/x mod 2^2                                                                                 // 477
  y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4                                                                    // 478
  y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8                                                                  // 479
  y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16                                                  // 480
  // last step - calculate inverse mod DV directly;                                                                 // 481
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints                                                // 482
  y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits                                                         // 483
  // we really want the negative inverse, and -DV < y < DV                                                          // 484
  return (y>0)?this.DV-y:-y;                                                                                        // 485
}                                                                                                                   // 486
                                                                                                                    // 487
// Montgomery reduction                                                                                             // 488
function Montgomery(m) {                                                                                            // 489
  this.m = m;                                                                                                       // 490
  this.mp = m.invDigit();                                                                                           // 491
  this.mpl = this.mp&0x7fff;                                                                                        // 492
  this.mph = this.mp>>15;                                                                                           // 493
  this.um = (1<<(m.DB-15))-1;                                                                                       // 494
  this.mt2 = 2*m.t;                                                                                                 // 495
}                                                                                                                   // 496
                                                                                                                    // 497
// xR mod m                                                                                                         // 498
function montConvert(x) {                                                                                           // 499
  var r = nbi();                                                                                                    // 500
  x.abs().dlShiftTo(this.m.t,r);                                                                                    // 501
  r.divRemTo(this.m,null,r);                                                                                        // 502
  if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);                                                // 503
  return r;                                                                                                         // 504
}                                                                                                                   // 505
                                                                                                                    // 506
// x/R mod m                                                                                                        // 507
function montRevert(x) {                                                                                            // 508
  var r = nbi();                                                                                                    // 509
  x.copyTo(r);                                                                                                      // 510
  this.reduce(r);                                                                                                   // 511
  return r;                                                                                                         // 512
}                                                                                                                   // 513
                                                                                                                    // 514
// x = x/R mod m (HAC 14.32)                                                                                        // 515
function montReduce(x) {                                                                                            // 516
  while(x.t <= this.mt2)	// pad x so am has enough room later                                                       // 517
    x[x.t++] = 0;                                                                                                   // 518
  for(var i = 0; i < this.m.t; ++i) {                                                                               // 519
    // faster way of calculating u0 = x[i]*mp mod DV                                                                // 520
    var j = x[i]&0x7fff;                                                                                            // 521
    var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;                                    // 522
    // use am to combine the multiply-shift-add into one call                                                       // 523
    j = i+this.m.t;                                                                                                 // 524
    x[j] += this.m.am(0,u0,x,i,0,this.m.t);                                                                         // 525
    // propagate carry                                                                                              // 526
    while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }                                                                 // 527
  }                                                                                                                 // 528
  x.clamp();                                                                                                        // 529
  x.drShiftTo(this.m.t,x);                                                                                          // 530
  if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);                                                                   // 531
}                                                                                                                   // 532
                                                                                                                    // 533
// r = "x^2/R mod m"; x != r                                                                                        // 534
function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }                                                          // 535
                                                                                                                    // 536
// r = "xy/R mod m"; x,y != r                                                                                       // 537
function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }                                                    // 538
                                                                                                                    // 539
Montgomery.prototype.convert = montConvert;                                                                         // 540
Montgomery.prototype.revert = montRevert;                                                                           // 541
Montgomery.prototype.reduce = montReduce;                                                                           // 542
Montgomery.prototype.mulTo = montMulTo;                                                                             // 543
Montgomery.prototype.sqrTo = montSqrTo;                                                                             // 544
                                                                                                                    // 545
// (protected) true iff this is even                                                                                // 546
function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }                                               // 547
                                                                                                                    // 548
// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)                                             // 549
function bnpExp(e,z) {                                                                                              // 550
  if(e > 0xffffffff || e < 1) return BigInteger.ONE;                                                                // 551
  var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;                                                   // 552
  g.copyTo(r);                                                                                                      // 553
  while(--i >= 0) {                                                                                                 // 554
    z.sqrTo(r,r2);                                                                                                  // 555
    if((e&(1<<i)) > 0) z.mulTo(r2,g,r);                                                                             // 556
    else { var t = r; r = r2; r2 = t; }                                                                             // 557
  }                                                                                                                 // 558
  return z.revert(r);                                                                                               // 559
}                                                                                                                   // 560
                                                                                                                    // 561
// (public) this^e % m, 0 <= e < 2^32                                                                               // 562
function bnModPowInt(e,m) {                                                                                         // 563
  var z;                                                                                                            // 564
  if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);                                         // 565
  return this.exp(e,z);                                                                                             // 566
}                                                                                                                   // 567
                                                                                                                    // 568
// protected                                                                                                        // 569
BigInteger.prototype.copyTo = bnpCopyTo;                                                                            // 570
BigInteger.prototype.fromInt = bnpFromInt;                                                                          // 571
BigInteger.prototype.fromString = bnpFromString;                                                                    // 572
BigInteger.prototype.clamp = bnpClamp;                                                                              // 573
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;                                                                      // 574
BigInteger.prototype.drShiftTo = bnpDRShiftTo;                                                                      // 575
BigInteger.prototype.lShiftTo = bnpLShiftTo;                                                                        // 576
BigInteger.prototype.rShiftTo = bnpRShiftTo;                                                                        // 577
BigInteger.prototype.subTo = bnpSubTo;                                                                              // 578
BigInteger.prototype.multiplyTo = bnpMultiplyTo;                                                                    // 579
BigInteger.prototype.squareTo = bnpSquareTo;                                                                        // 580
BigInteger.prototype.divRemTo = bnpDivRemTo;                                                                        // 581
BigInteger.prototype.invDigit = bnpInvDigit;                                                                        // 582
BigInteger.prototype.isEven = bnpIsEven;                                                                            // 583
BigInteger.prototype.exp = bnpExp;                                                                                  // 584
                                                                                                                    // 585
// public                                                                                                           // 586
BigInteger.prototype.toString = bnToString;                                                                         // 587
BigInteger.prototype.negate = bnNegate;                                                                             // 588
BigInteger.prototype.abs = bnAbs;                                                                                   // 589
BigInteger.prototype.compareTo = bnCompareTo;                                                                       // 590
BigInteger.prototype.bitLength = bnBitLength;                                                                       // 591
BigInteger.prototype.mod = bnMod;                                                                                   // 592
BigInteger.prototype.modPowInt = bnModPowInt;                                                                       // 593
                                                                                                                    // 594
// "constants"                                                                                                      // 595
BigInteger.ZERO = nbv(0);                                                                                           // 596
BigInteger.ONE = nbv(1);                                                                                            // 597
                                                                                                                    // 598
                                                                                                                    // 599
/// BEGIN jsbn2.js                                                                                                  // 600
                                                                                                                    // 601
/*                                                                                                                  // 602
 * Copyright (c) 2003-2005  Tom Wu                                                                                  // 603
 * All Rights Reserved.                                                                                             // 604
 *                                                                                                                  // 605
 * Permission is hereby granted, free of charge, to any person obtaining                                            // 606
 * a copy of this software and associated documentation files (the                                                  // 607
 * "Software"), to deal in the Software without restriction, including                                              // 608
 * without limitation the rights to use, copy, modify, merge, publish,                                              // 609
 * distribute, sublicense, and/or sell copies of the Software, and to                                               // 610
 * permit persons to whom the Software is furnished to do so, subject to                                            // 611
 * the following conditions:                                                                                        // 612
 *                                                                                                                  // 613
 * The above copyright notice and this permission notice shall be                                                   // 614
 * included in all copies or substantial portions of the Software.                                                  // 615
 *                                                                                                                  // 616
 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND,                                               // 617
 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY                                                 // 618
 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.                                                 // 619
 *                                                                                                                  // 620
 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,                                                  // 621
 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER                                         // 622
 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF                                           // 623
 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT                                           // 624
 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.                                                // 625
 *                                                                                                                  // 626
 * In addition, the following condition applies:                                                                    // 627
 *                                                                                                                  // 628
 * All redistributions must retain an intact copy of this copyright notice                                          // 629
 * and disclaimer.                                                                                                  // 630
 */                                                                                                                 // 631
                                                                                                                    // 632
// Extended JavaScript BN functions, required for RSA private ops.                                                  // 633
                                                                                                                    // 634
// (public)                                                                                                         // 635
function bnClone() { var r = nbi(); this.copyTo(r); return r; }                                                     // 636
                                                                                                                    // 637
// (public) return value as integer                                                                                 // 638
function bnIntValue() {                                                                                             // 639
  if(this.s < 0) {                                                                                                  // 640
    if(this.t == 1) return this[0]-this.DV;                                                                         // 641
    else if(this.t == 0) return -1;                                                                                 // 642
  }                                                                                                                 // 643
  else if(this.t == 1) return this[0];                                                                              // 644
  else if(this.t == 0) return 0;                                                                                    // 645
  // assumes 16 < DB < 32                                                                                           // 646
  return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];                                                        // 647
}                                                                                                                   // 648
                                                                                                                    // 649
// (public) return value as byte                                                                                    // 650
function bnByteValue() { return (this.t==0)?this.s:(this[0]<<24)>>24; }                                             // 651
                                                                                                                    // 652
// (public) return value as short (assumes DB>=16)                                                                  // 653
function bnShortValue() { return (this.t==0)?this.s:(this[0]<<16)>>16; }                                            // 654
                                                                                                                    // 655
// (protected) return x s.t. r^x < DV                                                                               // 656
function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }                                       // 657
                                                                                                                    // 658
// (public) 0 if this == 0, 1 if this > 0                                                                           // 659
function bnSigNum() {                                                                                               // 660
  if(this.s < 0) return -1;                                                                                         // 661
  else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;                                                   // 662
  else return 1;                                                                                                    // 663
}                                                                                                                   // 664
                                                                                                                    // 665
// (protected) convert to radix string                                                                              // 666
function bnpToRadix(b) {                                                                                            // 667
  if(b == null) b = 10;                                                                                             // 668
  if(this.signum() == 0 || b < 2 || b > 36) return "0";                                                             // 669
  var cs = this.chunkSize(b);                                                                                       // 670
  var a = Math.pow(b,cs);                                                                                           // 671
  var d = nbv(a), y = nbi(), z = nbi(), r = "";                                                                     // 672
  this.divRemTo(d,y,z);                                                                                             // 673
  while(y.signum() > 0) {                                                                                           // 674
    r = (a+z.intValue()).toString(b).substr(1) + r;                                                                 // 675
    y.divRemTo(d,y,z);                                                                                              // 676
  }                                                                                                                 // 677
  return z.intValue().toString(b) + r;                                                                              // 678
}                                                                                                                   // 679
                                                                                                                    // 680
// (protected) convert from radix string                                                                            // 681
function bnpFromRadix(s,b) {                                                                                        // 682
  this.fromInt(0);                                                                                                  // 683
  if(b == null) b = 10;                                                                                             // 684
  var cs = this.chunkSize(b);                                                                                       // 685
  var d = Math.pow(b,cs), mi = false, j = 0, w = 0;                                                                 // 686
  for(var i = 0; i < s.length; ++i) {                                                                               // 687
    var x = intAt(s,i);                                                                                             // 688
    if(x < 0) {                                                                                                     // 689
      if(s.charAt(i) == "-" && this.signum() == 0) mi = true;                                                       // 690
      continue;                                                                                                     // 691
    }                                                                                                               // 692
    w = b*w+x;                                                                                                      // 693
    if(++j >= cs) {                                                                                                 // 694
      this.dMultiply(d);                                                                                            // 695
      this.dAddOffset(w,0);                                                                                         // 696
      j = 0;                                                                                                        // 697
      w = 0;                                                                                                        // 698
    }                                                                                                               // 699
  }                                                                                                                 // 700
  if(j > 0) {                                                                                                       // 701
    this.dMultiply(Math.pow(b,j));                                                                                  // 702
    this.dAddOffset(w,0);                                                                                           // 703
  }                                                                                                                 // 704
  if(mi) BigInteger.ZERO.subTo(this,this);                                                                          // 705
}                                                                                                                   // 706
                                                                                                                    // 707
// (protected) alternate constructor                                                                                // 708
function bnpFromNumber(a,b,c) {                                                                                     // 709
  if("number" == typeof b) {                                                                                        // 710
    // new BigInteger(int,int,RNG)                                                                                  // 711
    if(a < 2) this.fromInt(1);                                                                                      // 712
    else {                                                                                                          // 713
      this.fromNumber(a,c);                                                                                         // 714
      if(!this.testBit(a-1))	// force MSB set                                                                       // 715
        this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);                                                   // 716
      if(this.isEven()) this.dAddOffset(1,0); // force odd                                                          // 717
      while(!this.isProbablePrime(b)) {                                                                             // 718
        this.dAddOffset(2,0);                                                                                       // 719
        if(this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a-1),this);                                    // 720
      }                                                                                                             // 721
    }                                                                                                               // 722
  }                                                                                                                 // 723
  else {                                                                                                            // 724
    // new BigInteger(int,RNG)                                                                                      // 725
    var x = new Array(), t = a&7;                                                                                   // 726
    x.length = (a>>3)+1;                                                                                            // 727
    b.nextBytes(x);                                                                                                 // 728
    if(t > 0) x[0] &= ((1<<t)-1); else x[0] = 0;                                                                    // 729
    this.fromString(x,256);                                                                                         // 730
  }                                                                                                                 // 731
}                                                                                                                   // 732
                                                                                                                    // 733
// (public) convert to bigendian byte array                                                                         // 734
function bnToByteArray() {                                                                                          // 735
  var i = this.t, r = new Array();                                                                                  // 736
  r[0] = this.s;                                                                                                    // 737
  var p = this.DB-(i*this.DB)%8, d, k = 0;                                                                          // 738
  if(i-- > 0) {                                                                                                     // 739
    if(p < this.DB && (d = this[i]>>p) != (this.s&this.DM)>>p)                                                      // 740
      r[k++] = d|(this.s<<(this.DB-p));                                                                             // 741
    while(i >= 0) {                                                                                                 // 742
      if(p < 8) {                                                                                                   // 743
        d = (this[i]&((1<<p)-1))<<(8-p);                                                                            // 744
        d |= this[--i]>>(p+=this.DB-8);                                                                             // 745
      }                                                                                                             // 746
      else {                                                                                                        // 747
        d = (this[i]>>(p-=8))&0xff;                                                                                 // 748
        if(p <= 0) { p += this.DB; --i; }                                                                           // 749
      }                                                                                                             // 750
      if((d&0x80) != 0) d |= -256;                                                                                  // 751
      if(k == 0 && (this.s&0x80) != (d&0x80)) ++k;                                                                  // 752
      if(k > 0 || d != this.s) r[k++] = d;                                                                          // 753
    }                                                                                                               // 754
  }                                                                                                                 // 755
  return r;                                                                                                         // 756
}                                                                                                                   // 757
                                                                                                                    // 758
function bnEquals(a) { return(this.compareTo(a)==0); }                                                              // 759
function bnMin(a) { return(this.compareTo(a)<0)?this:a; }                                                           // 760
function bnMax(a) { return(this.compareTo(a)>0)?this:a; }                                                           // 761
                                                                                                                    // 762
// (protected) r = this op a (bitwise)                                                                              // 763
function bnpBitwiseTo(a,op,r) {                                                                                     // 764
  var i, f, m = Math.min(a.t,this.t);                                                                               // 765
  for(i = 0; i < m; ++i) r[i] = op(this[i],a[i]);                                                                   // 766
  if(a.t < this.t) {                                                                                                // 767
    f = a.s&this.DM;                                                                                                // 768
    for(i = m; i < this.t; ++i) r[i] = op(this[i],f);                                                               // 769
    r.t = this.t;                                                                                                   // 770
  }                                                                                                                 // 771
  else {                                                                                                            // 772
    f = this.s&this.DM;                                                                                             // 773
    for(i = m; i < a.t; ++i) r[i] = op(f,a[i]);                                                                     // 774
    r.t = a.t;                                                                                                      // 775
  }                                                                                                                 // 776
  r.s = op(this.s,a.s);                                                                                             // 777
  r.clamp();                                                                                                        // 778
}                                                                                                                   // 779
                                                                                                                    // 780
// (public) this & a                                                                                                // 781
function op_and(x,y) { return x&y; }                                                                                // 782
function bnAnd(a) { var r = nbi(); this.bitwiseTo(a,op_and,r); return r; }                                          // 783
                                                                                                                    // 784
// (public) this | a                                                                                                // 785
function op_or(x,y) { return x|y; }                                                                                 // 786
function bnOr(a) { var r = nbi(); this.bitwiseTo(a,op_or,r); return r; }                                            // 787
                                                                                                                    // 788
// (public) this ^ a                                                                                                // 789
function op_xor(x,y) { return x^y; }                                                                                // 790
function bnXor(a) { var r = nbi(); this.bitwiseTo(a,op_xor,r); return r; }                                          // 791
                                                                                                                    // 792
// (public) this & ~a                                                                                               // 793
function op_andnot(x,y) { return x&~y; }                                                                            // 794
function bnAndNot(a) { var r = nbi(); this.bitwiseTo(a,op_andnot,r); return r; }                                    // 795
                                                                                                                    // 796
// (public) ~this                                                                                                   // 797
function bnNot() {                                                                                                  // 798
  var r = nbi();                                                                                                    // 799
  for(var i = 0; i < this.t; ++i) r[i] = this.DM&~this[i];                                                          // 800
  r.t = this.t;                                                                                                     // 801
  r.s = ~this.s;                                                                                                    // 802
  return r;                                                                                                         // 803
}                                                                                                                   // 804
                                                                                                                    // 805
// (public) this << n                                                                                               // 806
function bnShiftLeft(n) {                                                                                           // 807
  var r = nbi();                                                                                                    // 808
  if(n < 0) this.rShiftTo(-n,r); else this.lShiftTo(n,r);                                                           // 809
  return r;                                                                                                         // 810
}                                                                                                                   // 811
                                                                                                                    // 812
// (public) this >> n                                                                                               // 813
function bnShiftRight(n) {                                                                                          // 814
  var r = nbi();                                                                                                    // 815
  if(n < 0) this.lShiftTo(-n,r); else this.rShiftTo(n,r);                                                           // 816
  return r;                                                                                                         // 817
}                                                                                                                   // 818
                                                                                                                    // 819
// return index of lowest 1-bit in x, x < 2^31                                                                      // 820
function lbit(x) {                                                                                                  // 821
  if(x == 0) return -1;                                                                                             // 822
  var r = 0;                                                                                                        // 823
  if((x&0xffff) == 0) { x >>= 16; r += 16; }                                                                        // 824
  if((x&0xff) == 0) { x >>= 8; r += 8; }                                                                            // 825
  if((x&0xf) == 0) { x >>= 4; r += 4; }                                                                             // 826
  if((x&3) == 0) { x >>= 2; r += 2; }                                                                               // 827
  if((x&1) == 0) ++r;                                                                                               // 828
  return r;                                                                                                         // 829
}                                                                                                                   // 830
                                                                                                                    // 831
// (public) returns index of lowest 1-bit (or -1 if none)                                                           // 832
function bnGetLowestSetBit() {                                                                                      // 833
  for(var i = 0; i < this.t; ++i)                                                                                   // 834
    if(this[i] != 0) return i*this.DB+lbit(this[i]);                                                                // 835
  if(this.s < 0) return this.t*this.DB;                                                                             // 836
  return -1;                                                                                                        // 837
}                                                                                                                   // 838
                                                                                                                    // 839
// return number of 1 bits in x                                                                                     // 840
function cbit(x) {                                                                                                  // 841
  var r = 0;                                                                                                        // 842
  while(x != 0) { x &= x-1; ++r; }                                                                                  // 843
  return r;                                                                                                         // 844
}                                                                                                                   // 845
                                                                                                                    // 846
// (public) return number of set bits                                                                               // 847
function bnBitCount() {                                                                                             // 848
  var r = 0, x = this.s&this.DM;                                                                                    // 849
  for(var i = 0; i < this.t; ++i) r += cbit(this[i]^x);                                                             // 850
  return r;                                                                                                         // 851
}                                                                                                                   // 852
                                                                                                                    // 853
// (public) true iff nth bit is set                                                                                 // 854
function bnTestBit(n) {                                                                                             // 855
  var j = Math.floor(n/this.DB);                                                                                    // 856
  if(j >= this.t) return(this.s!=0);                                                                                // 857
  return((this[j]&(1<<(n%this.DB)))!=0);                                                                            // 858
}                                                                                                                   // 859
                                                                                                                    // 860
// (protected) this op (1<<n)                                                                                       // 861
function bnpChangeBit(n,op) {                                                                                       // 862
  var r = BigInteger.ONE.shiftLeft(n);                                                                              // 863
  this.bitwiseTo(r,op,r);                                                                                           // 864
  return r;                                                                                                         // 865
}                                                                                                                   // 866
                                                                                                                    // 867
// (public) this | (1<<n)                                                                                           // 868
function bnSetBit(n) { return this.changeBit(n,op_or); }                                                            // 869
                                                                                                                    // 870
// (public) this & ~(1<<n)                                                                                          // 871
function bnClearBit(n) { return this.changeBit(n,op_andnot); }                                                      // 872
                                                                                                                    // 873
// (public) this ^ (1<<n)                                                                                           // 874
function bnFlipBit(n) { return this.changeBit(n,op_xor); }                                                          // 875
                                                                                                                    // 876
// (protected) r = this + a                                                                                         // 877
function bnpAddTo(a,r) {                                                                                            // 878
  var i = 0, c = 0, m = Math.min(a.t,this.t);                                                                       // 879
  while(i < m) {                                                                                                    // 880
    c += this[i]+a[i];                                                                                              // 881
    r[i++] = c&this.DM;                                                                                             // 882
    c >>= this.DB;                                                                                                  // 883
  }                                                                                                                 // 884
  if(a.t < this.t) {                                                                                                // 885
    c += a.s;                                                                                                       // 886
    while(i < this.t) {                                                                                             // 887
      c += this[i];                                                                                                 // 888
      r[i++] = c&this.DM;                                                                                           // 889
      c >>= this.DB;                                                                                                // 890
    }                                                                                                               // 891
    c += this.s;                                                                                                    // 892
  }                                                                                                                 // 893
  else {                                                                                                            // 894
    c += this.s;                                                                                                    // 895
    while(i < a.t) {                                                                                                // 896
      c += a[i];                                                                                                    // 897
      r[i++] = c&this.DM;                                                                                           // 898
      c >>= this.DB;                                                                                                // 899
    }                                                                                                               // 900
    c += a.s;                                                                                                       // 901
  }                                                                                                                 // 902
  r.s = (c<0)?-1:0;                                                                                                 // 903
  if(c > 0) r[i++] = c;                                                                                             // 904
  else if(c < -1) r[i++] = this.DV+c;                                                                               // 905
  r.t = i;                                                                                                          // 906
  r.clamp();                                                                                                        // 907
}                                                                                                                   // 908
                                                                                                                    // 909
// (public) this + a                                                                                                // 910
function bnAdd(a) { var r = nbi(); this.addTo(a,r); return r; }                                                     // 911
                                                                                                                    // 912
// (public) this - a                                                                                                // 913
function bnSubtract(a) { var r = nbi(); this.subTo(a,r); return r; }                                                // 914
                                                                                                                    // 915
// (public) this * a                                                                                                // 916
function bnMultiply(a) { var r = nbi(); this.multiplyTo(a,r); return r; }                                           // 917
                                                                                                                    // 918
// (public) this / a                                                                                                // 919
function bnDivide(a) { var r = nbi(); this.divRemTo(a,r,null); return r; }                                          // 920
                                                                                                                    // 921
// (public) this % a                                                                                                // 922
function bnRemainder(a) { var r = nbi(); this.divRemTo(a,null,r); return r; }                                       // 923
                                                                                                                    // 924
// (public) [this/a,this%a]                                                                                         // 925
function bnDivideAndRemainder(a) {                                                                                  // 926
  var q = nbi(), r = nbi();                                                                                         // 927
  this.divRemTo(a,q,r);                                                                                             // 928
  return new Array(q,r);                                                                                            // 929
}                                                                                                                   // 930
                                                                                                                    // 931
// (protected) this *= n, this >= 0, 1 < n < DV                                                                     // 932
function bnpDMultiply(n) {                                                                                          // 933
  this[this.t] = this.am(0,n-1,this,0,0,this.t);                                                                    // 934
  ++this.t;                                                                                                         // 935
  this.clamp();                                                                                                     // 936
}                                                                                                                   // 937
                                                                                                                    // 938
// (protected) this += n << w words, this >= 0                                                                      // 939
function bnpDAddOffset(n,w) {                                                                                       // 940
  while(this.t <= w) this[this.t++] = 0;                                                                            // 941
  this[w] += n;                                                                                                     // 942
  while(this[w] >= this.DV) {                                                                                       // 943
    this[w] -= this.DV;                                                                                             // 944
    if(++w >= this.t) this[this.t++] = 0;                                                                           // 945
    ++this[w];                                                                                                      // 946
  }                                                                                                                 // 947
}                                                                                                                   // 948
                                                                                                                    // 949
// A "null" reducer                                                                                                 // 950
function NullExp() {}                                                                                               // 951
function nNop(x) { return x; }                                                                                      // 952
function nMulTo(x,y,r) { x.multiplyTo(y,r); }                                                                       // 953
function nSqrTo(x,r) { x.squareTo(r); }                                                                             // 954
                                                                                                                    // 955
NullExp.prototype.convert = nNop;                                                                                   // 956
NullExp.prototype.revert = nNop;                                                                                    // 957
NullExp.prototype.mulTo = nMulTo;                                                                                   // 958
NullExp.prototype.sqrTo = nSqrTo;                                                                                   // 959
                                                                                                                    // 960
// (public) this^e                                                                                                  // 961
function bnPow(e) { return this.exp(e,new NullExp()); }                                                             // 962
                                                                                                                    // 963
// (protected) r = lower n words of "this * a", a.t <= n                                                            // 964
// "this" should be the larger one if appropriate.                                                                  // 965
function bnpMultiplyLowerTo(a,n,r) {                                                                                // 966
  var i = Math.min(this.t+a.t,n);                                                                                   // 967
  r.s = 0; // assumes a,this >= 0                                                                                   // 968
  r.t = i;                                                                                                          // 969
  while(i > 0) r[--i] = 0;                                                                                          // 970
  var j;                                                                                                            // 971
  for(j = r.t-this.t; i < j; ++i) r[i+this.t] = this.am(0,a[i],r,i,0,this.t);                                       // 972
  for(j = Math.min(a.t,n); i < j; ++i) this.am(0,a[i],r,i,0,n-i);                                                   // 973
  r.clamp();                                                                                                        // 974
}                                                                                                                   // 975
                                                                                                                    // 976
// (protected) r = "this * a" without lower n words, n > 0                                                          // 977
// "this" should be the larger one if appropriate.                                                                  // 978
function bnpMultiplyUpperTo(a,n,r) {                                                                                // 979
  --n;                                                                                                              // 980
  var i = r.t = this.t+a.t-n;                                                                                       // 981
  r.s = 0; // assumes a,this >= 0                                                                                   // 982
  while(--i >= 0) r[i] = 0;                                                                                         // 983
  for(i = Math.max(n-this.t,0); i < a.t; ++i)                                                                       // 984
    r[this.t+i-n] = this.am(n-i,a[i],r,0,0,this.t+i-n);                                                             // 985
  r.clamp();                                                                                                        // 986
  r.drShiftTo(1,r);                                                                                                 // 987
}                                                                                                                   // 988
                                                                                                                    // 989
// Barrett modular reduction                                                                                        // 990
function Barrett(m) {                                                                                               // 991
  // setup Barrett                                                                                                  // 992
  this.r2 = nbi();                                                                                                  // 993
  this.q3 = nbi();                                                                                                  // 994
  BigInteger.ONE.dlShiftTo(2*m.t,this.r2);                                                                          // 995
  this.mu = this.r2.divide(m);                                                                                      // 996
  this.m = m;                                                                                                       // 997
}                                                                                                                   // 998
                                                                                                                    // 999
function barrettConvert(x) {                                                                                        // 1000
  if(x.s < 0 || x.t > 2*this.m.t) return x.mod(this.m);                                                             // 1001
  else if(x.compareTo(this.m) < 0) return x;                                                                        // 1002
  else { var r = nbi(); x.copyTo(r); this.reduce(r); return r; }                                                    // 1003
}                                                                                                                   // 1004
                                                                                                                    // 1005
function barrettRevert(x) { return x; }                                                                             // 1006
                                                                                                                    // 1007
// x = x mod m (HAC 14.42)                                                                                          // 1008
function barrettReduce(x) {                                                                                         // 1009
  x.drShiftTo(this.m.t-1,this.r2);                                                                                  // 1010
  if(x.t > this.m.t+1) { x.t = this.m.t+1; x.clamp(); }                                                             // 1011
  this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);                                                              // 1012
  this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);                                                               // 1013
  while(x.compareTo(this.r2) < 0) x.dAddOffset(1,this.m.t+1);                                                       // 1014
  x.subTo(this.r2,x);                                                                                               // 1015
  while(x.compareTo(this.m) >= 0) x.subTo(this.m,x);                                                                // 1016
}                                                                                                                   // 1017
                                                                                                                    // 1018
// r = x^2 mod m; x != r                                                                                            // 1019
function barrettSqrTo(x,r) { x.squareTo(r); this.reduce(r); }                                                       // 1020
                                                                                                                    // 1021
// r = x*y mod m; x,y != r                                                                                          // 1022
function barrettMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }                                                 // 1023
                                                                                                                    // 1024
Barrett.prototype.convert = barrettConvert;                                                                         // 1025
Barrett.prototype.revert = barrettRevert;                                                                           // 1026
Barrett.prototype.reduce = barrettReduce;                                                                           // 1027
Barrett.prototype.mulTo = barrettMulTo;                                                                             // 1028
Barrett.prototype.sqrTo = barrettSqrTo;                                                                             // 1029
                                                                                                                    // 1030
// (public) this^e % m (HAC 14.85)                                                                                  // 1031
function bnModPow(e,m) {                                                                                            // 1032
  var i = e.bitLength(), k, r = nbv(1), z;                                                                          // 1033
  if(i <= 0) return r;                                                                                              // 1034
  else if(i < 18) k = 1;                                                                                            // 1035
  else if(i < 48) k = 3;                                                                                            // 1036
  else if(i < 144) k = 4;                                                                                           // 1037
  else if(i < 768) k = 5;                                                                                           // 1038
  else k = 6;                                                                                                       // 1039
  if(i < 8)                                                                                                         // 1040
    z = new Classic(m);                                                                                             // 1041
  else if(m.isEven())                                                                                               // 1042
    z = new Barrett(m);                                                                                             // 1043
  else                                                                                                              // 1044
    z = new Montgomery(m);                                                                                          // 1045
                                                                                                                    // 1046
  // precomputation                                                                                                 // 1047
  var g = new Array(), n = 3, k1 = k-1, km = (1<<k)-1;                                                              // 1048
  g[1] = z.convert(this);                                                                                           // 1049
  if(k > 1) {                                                                                                       // 1050
    var g2 = nbi();                                                                                                 // 1051
    z.sqrTo(g[1],g2);                                                                                               // 1052
    while(n <= km) {                                                                                                // 1053
      g[n] = nbi();                                                                                                 // 1054
      z.mulTo(g2,g[n-2],g[n]);                                                                                      // 1055
      n += 2;                                                                                                       // 1056
    }                                                                                                               // 1057
  }                                                                                                                 // 1058
                                                                                                                    // 1059
  var j = e.t-1, w, is1 = true, r2 = nbi(), t;                                                                      // 1060
  i = nbits(e[j])-1;                                                                                                // 1061
  while(j >= 0) {                                                                                                   // 1062
    if(i >= k1) w = (e[j]>>(i-k1))&km;                                                                              // 1063
    else {                                                                                                          // 1064
      w = (e[j]&((1<<(i+1))-1))<<(k1-i);                                                                            // 1065
      if(j > 0) w |= e[j-1]>>(this.DB+i-k1);                                                                        // 1066
    }                                                                                                               // 1067
                                                                                                                    // 1068
    n = k;                                                                                                          // 1069
    while((w&1) == 0) { w >>= 1; --n; }                                                                             // 1070
    if((i -= n) < 0) { i += this.DB; --j; }                                                                         // 1071
    if(is1) {	// ret == 1, don't bother squaring or multiplying it                                                  // 1072
      g[w].copyTo(r);                                                                                               // 1073
      is1 = false;                                                                                                  // 1074
    }                                                                                                               // 1075
    else {                                                                                                          // 1076
      while(n > 1) { z.sqrTo(r,r2); z.sqrTo(r2,r); n -= 2; }                                                        // 1077
      if(n > 0) z.sqrTo(r,r2); else { t = r; r = r2; r2 = t; }                                                      // 1078
      z.mulTo(r2,g[w],r);                                                                                           // 1079
    }                                                                                                               // 1080
                                                                                                                    // 1081
    while(j >= 0 && (e[j]&(1<<i)) == 0) {                                                                           // 1082
      z.sqrTo(r,r2); t = r; r = r2; r2 = t;                                                                         // 1083
      if(--i < 0) { i = this.DB-1; --j; }                                                                           // 1084
    }                                                                                                               // 1085
  }                                                                                                                 // 1086
  return z.revert(r);                                                                                               // 1087
}                                                                                                                   // 1088
                                                                                                                    // 1089
// (public) gcd(this,a) (HAC 14.54)                                                                                 // 1090
function bnGCD(a) {                                                                                                 // 1091
  var x = (this.s<0)?this.negate():this.clone();                                                                    // 1092
  var y = (a.s<0)?a.negate():a.clone();                                                                             // 1093
  if(x.compareTo(y) < 0) { var t = x; x = y; y = t; }                                                               // 1094
  var i = x.getLowestSetBit(), g = y.getLowestSetBit();                                                             // 1095
  if(g < 0) return x;                                                                                               // 1096
  if(i < g) g = i;                                                                                                  // 1097
  if(g > 0) {                                                                                                       // 1098
    x.rShiftTo(g,x);                                                                                                // 1099
    y.rShiftTo(g,y);                                                                                                // 1100
  }                                                                                                                 // 1101
  while(x.signum() > 0) {                                                                                           // 1102
    if((i = x.getLowestSetBit()) > 0) x.rShiftTo(i,x);                                                              // 1103
    if((i = y.getLowestSetBit()) > 0) y.rShiftTo(i,y);                                                              // 1104
    if(x.compareTo(y) >= 0) {                                                                                       // 1105
      x.subTo(y,x);                                                                                                 // 1106
      x.rShiftTo(1,x);                                                                                              // 1107
    }                                                                                                               // 1108
    else {                                                                                                          // 1109
      y.subTo(x,y);                                                                                                 // 1110
      y.rShiftTo(1,y);                                                                                              // 1111
    }                                                                                                               // 1112
  }                                                                                                                 // 1113
  if(g > 0) y.lShiftTo(g,y);                                                                                        // 1114
  return y;                                                                                                         // 1115
}                                                                                                                   // 1116
                                                                                                                    // 1117
// (protected) this % n, n < 2^26                                                                                   // 1118
function bnpModInt(n) {                                                                                             // 1119
  if(n <= 0) return 0;                                                                                              // 1120
  var d = this.DV%n, r = (this.s<0)?n-1:0;                                                                          // 1121
  if(this.t > 0)                                                                                                    // 1122
    if(d == 0) r = this[0]%n;                                                                                       // 1123
    else for(var i = this.t-1; i >= 0; --i) r = (d*r+this[i])%n;                                                    // 1124
  return r;                                                                                                         // 1125
}                                                                                                                   // 1126
                                                                                                                    // 1127
// (public) 1/this % m (HAC 14.61)                                                                                  // 1128
function bnModInverse(m) {                                                                                          // 1129
  var ac = m.isEven();                                                                                              // 1130
  if((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;                                              // 1131
  var u = m.clone(), v = this.clone();                                                                              // 1132
  var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);                                                               // 1133
  while(u.signum() != 0) {                                                                                          // 1134
    while(u.isEven()) {                                                                                             // 1135
      u.rShiftTo(1,u);                                                                                              // 1136
      if(ac) {                                                                                                      // 1137
        if(!a.isEven() || !b.isEven()) { a.addTo(this,a); b.subTo(m,b); }                                           // 1138
        a.rShiftTo(1,a);                                                                                            // 1139
      }                                                                                                             // 1140
      else if(!b.isEven()) b.subTo(m,b);                                                                            // 1141
      b.rShiftTo(1,b);                                                                                              // 1142
    }                                                                                                               // 1143
    while(v.isEven()) {                                                                                             // 1144
      v.rShiftTo(1,v);                                                                                              // 1145
      if(ac) {                                                                                                      // 1146
        if(!c.isEven() || !d.isEven()) { c.addTo(this,c); d.subTo(m,d); }                                           // 1147
        c.rShiftTo(1,c);                                                                                            // 1148
      }                                                                                                             // 1149
      else if(!d.isEven()) d.subTo(m,d);                                                                            // 1150
      d.rShiftTo(1,d);                                                                                              // 1151
    }                                                                                                               // 1152
    if(u.compareTo(v) >= 0) {                                                                                       // 1153
      u.subTo(v,u);                                                                                                 // 1154
      if(ac) a.subTo(c,a);                                                                                          // 1155
      b.subTo(d,b);                                                                                                 // 1156
    }                                                                                                               // 1157
    else {                                                                                                          // 1158
      v.subTo(u,v);                                                                                                 // 1159
      if(ac) c.subTo(a,c);                                                                                          // 1160
      d.subTo(b,d);                                                                                                 // 1161
    }                                                                                                               // 1162
  }                                                                                                                 // 1163
  if(v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;                                                      // 1164
  if(d.compareTo(m) >= 0) return d.subtract(m);                                                                     // 1165
  if(d.signum() < 0) d.addTo(m,d); else return d;                                                                   // 1166
  if(d.signum() < 0) return d.add(m); else return d;                                                                // 1167
}                                                                                                                   // 1168
                                                                                                                    // 1169
var lowprimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509];
var lplim = (1<<26)/lowprimes[lowprimes.length-1];                                                                  // 1171
                                                                                                                    // 1172
// (public) test primality with certainty >= 1-.5^t                                                                 // 1173
function bnIsProbablePrime(t) {                                                                                     // 1174
  var i, x = this.abs();                                                                                            // 1175
  if(x.t == 1 && x[0] <= lowprimes[lowprimes.length-1]) {                                                           // 1176
    for(i = 0; i < lowprimes.length; ++i)                                                                           // 1177
      if(x[0] == lowprimes[i]) return true;                                                                         // 1178
    return false;                                                                                                   // 1179
  }                                                                                                                 // 1180
  if(x.isEven()) return false;                                                                                      // 1181
  i = 1;                                                                                                            // 1182
  while(i < lowprimes.length) {                                                                                     // 1183
    var m = lowprimes[i], j = i+1;                                                                                  // 1184
    while(j < lowprimes.length && m < lplim) m *= lowprimes[j++];                                                   // 1185
    m = x.modInt(m);                                                                                                // 1186
    while(i < j) if(m%lowprimes[i++] == 0) return false;                                                            // 1187
  }                                                                                                                 // 1188
  return x.millerRabin(t);                                                                                          // 1189
}                                                                                                                   // 1190
                                                                                                                    // 1191
// (protected) true if probably prime (HAC 4.24, Miller-Rabin)                                                      // 1192
function bnpMillerRabin(t) {                                                                                        // 1193
  var n1 = this.subtract(BigInteger.ONE);                                                                           // 1194
  var k = n1.getLowestSetBit();                                                                                     // 1195
  if(k <= 0) return false;                                                                                          // 1196
  var r = n1.shiftRight(k);                                                                                         // 1197
  t = (t+1)>>1;                                                                                                     // 1198
  if(t > lowprimes.length) t = lowprimes.length;                                                                    // 1199
  var a = nbi();                                                                                                    // 1200
  for(var i = 0; i < t; ++i) {                                                                                      // 1201
    a.fromInt(lowprimes[i]);                                                                                        // 1202
    var y = a.modPow(r,this);                                                                                       // 1203
    if(y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {                                                  // 1204
      var j = 1;                                                                                                    // 1205
      while(j++ < k && y.compareTo(n1) != 0) {                                                                      // 1206
        y = y.modPowInt(2,this);                                                                                    // 1207
        if(y.compareTo(BigInteger.ONE) == 0) return false;                                                          // 1208
      }                                                                                                             // 1209
      if(y.compareTo(n1) != 0) return false;                                                                        // 1210
    }                                                                                                               // 1211
  }                                                                                                                 // 1212
  return true;                                                                                                      // 1213
}                                                                                                                   // 1214
                                                                                                                    // 1215
// protected                                                                                                        // 1216
BigInteger.prototype.chunkSize = bnpChunkSize;                                                                      // 1217
BigInteger.prototype.toRadix = bnpToRadix;                                                                          // 1218
BigInteger.prototype.fromRadix = bnpFromRadix;                                                                      // 1219
BigInteger.prototype.fromNumber = bnpFromNumber;                                                                    // 1220
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;                                                                      // 1221
BigInteger.prototype.changeBit = bnpChangeBit;                                                                      // 1222
BigInteger.prototype.addTo = bnpAddTo;                                                                              // 1223
BigInteger.prototype.dMultiply = bnpDMultiply;                                                                      // 1224
BigInteger.prototype.dAddOffset = bnpDAddOffset;                                                                    // 1225
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;                                                          // 1226
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;                                                          // 1227
BigInteger.prototype.modInt = bnpModInt;                                                                            // 1228
BigInteger.prototype.millerRabin = bnpMillerRabin;                                                                  // 1229
                                                                                                                    // 1230
// public                                                                                                           // 1231
BigInteger.prototype.clone = bnClone;                                                                               // 1232
BigInteger.prototype.intValue = bnIntValue;                                                                         // 1233
BigInteger.prototype.byteValue = bnByteValue;                                                                       // 1234
BigInteger.prototype.shortValue = bnShortValue;                                                                     // 1235
BigInteger.prototype.signum = bnSigNum;                                                                             // 1236
BigInteger.prototype.toByteArray = bnToByteArray;                                                                   // 1237
BigInteger.prototype.equals = bnEquals;                                                                             // 1238
BigInteger.prototype.min = bnMin;                                                                                   // 1239
BigInteger.prototype.max = bnMax;                                                                                   // 1240
BigInteger.prototype.and = bnAnd;                                                                                   // 1241
BigInteger.prototype.or = bnOr;                                                                                     // 1242
BigInteger.prototype.xor = bnXor;                                                                                   // 1243
BigInteger.prototype.andNot = bnAndNot;                                                                             // 1244
BigInteger.prototype.not = bnNot;                                                                                   // 1245
BigInteger.prototype.shiftLeft = bnShiftLeft;                                                                       // 1246
BigInteger.prototype.shiftRight = bnShiftRight;                                                                     // 1247
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;                                                           // 1248
BigInteger.prototype.bitCount = bnBitCount;                                                                         // 1249
BigInteger.prototype.testBit = bnTestBit;                                                                           // 1250
BigInteger.prototype.setBit = bnSetBit;                                                                             // 1251
BigInteger.prototype.clearBit = bnClearBit;                                                                         // 1252
BigInteger.prototype.flipBit = bnFlipBit;                                                                           // 1253
BigInteger.prototype.add = bnAdd;                                                                                   // 1254
BigInteger.prototype.subtract = bnSubtract;                                                                         // 1255
BigInteger.prototype.multiply = bnMultiply;                                                                         // 1256
BigInteger.prototype.divide = bnDivide;                                                                             // 1257
BigInteger.prototype.remainder = bnRemainder;                                                                       // 1258
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;                                                     // 1259
BigInteger.prototype.modPow = bnModPow;                                                                             // 1260
BigInteger.prototype.modInverse = bnModInverse;                                                                     // 1261
BigInteger.prototype.pow = bnPow;                                                                                   // 1262
BigInteger.prototype.gcd = bnGCD;                                                                                   // 1263
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;                                                           // 1264
                                                                                                                    // 1265
// BigInteger interfaces not implemented in jsbn:                                                                   // 1266
                                                                                                                    // 1267
// BigInteger(int signum, byte[] magnitude)                                                                         // 1268
// double doubleValue()                                                                                             // 1269
// float floatValue()                                                                                               // 1270
// int hashCode()                                                                                                   // 1271
// long longValue()                                                                                                 // 1272
// static BigInteger valueOf(long val)                                                                              // 1273
                                                                                                                    // 1274
/// METEOR WRAPPER                                                                                                  // 1275
return BigInteger;                                                                                                  // 1276
})();                                                                                                               // 1277
                                                                                                                    // 1278
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/srp/srp.js                                                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// This package contains just enough of the original SRP code to                                                    // 1
// support the backwards-compatibility upgrade path.                                                                // 2
//                                                                                                                  // 3
// An SRP (and possibly also accounts-srp) package should eventually be                                             // 4
// available in Atmosphere so that users can continue to use SRP if they                                            // 5
// want to.                                                                                                         // 6
                                                                                                                    // 7
SRP = {};                                                                                                           // 8
                                                                                                                    // 9
/**                                                                                                                 // 10
 * Generate a new SRP verifier. Password is the plaintext password.                                                 // 11
 *                                                                                                                  // 12
 * options is optional and can include:                                                                             // 13
 * - identity: String. The SRP username to user. Mostly this is passed                                              // 14
 *   in for testing.  Random UUID if not provided.                                                                  // 15
 * - hashedIdentityAndPassword: combined identity and password, already hashed, for the SRP to bcrypt upgrade path.
 * - salt: String. A salt to use.  Mostly this is passed in for                                                     // 17
 *   testing.  Random UUID if not provided.                                                                         // 18
 * - SRP parameters (see _defaults and paramsFromOptions below)                                                     // 19
 */                                                                                                                 // 20
SRP.generateVerifier = function (password, options) {                                                               // 21
  var params = paramsFromOptions(options);                                                                          // 22
                                                                                                                    // 23
  var salt = (options && options.salt) || Random.secret();                                                          // 24
                                                                                                                    // 25
  var identity;                                                                                                     // 26
  var hashedIdentityAndPassword = options && options.hashedIdentityAndPassword;                                     // 27
  if (!hashedIdentityAndPassword) {                                                                                 // 28
    identity = (options && options.identity) || Random.secret();                                                    // 29
    hashedIdentityAndPassword = params.hash(identity + ":" + password);                                             // 30
  }                                                                                                                 // 31
                                                                                                                    // 32
  var x = params.hash(salt + hashedIdentityAndPassword);                                                            // 33
  var xi = new BigInteger(x, 16);                                                                                   // 34
  var v = params.g.modPow(xi, params.N);                                                                            // 35
                                                                                                                    // 36
  return {                                                                                                          // 37
    identity: identity,                                                                                             // 38
    salt: salt,                                                                                                     // 39
    verifier: v.toString(16)                                                                                        // 40
  };                                                                                                                // 41
};                                                                                                                  // 42
                                                                                                                    // 43
// For use with check().                                                                                            // 44
SRP.matchVerifier = {                                                                                               // 45
  identity: String,                                                                                                 // 46
  salt: String,                                                                                                     // 47
  verifier: String                                                                                                  // 48
};                                                                                                                  // 49
                                                                                                                    // 50
                                                                                                                    // 51
/**                                                                                                                 // 52
 * Default parameter values for SRP.                                                                                // 53
 *                                                                                                                  // 54
 */                                                                                                                 // 55
var _defaults = {                                                                                                   // 56
  hash: function (x) { return SHA256(x).toLowerCase(); },                                                           // 57
  N: new BigInteger("EEAF0AB9ADB38DD69C33F80AFA8FC5E86072618775FF3C0B9EA2314C9C256576D674DF7496EA81D3383B4813D692C6E0E0D5D8E250B98BE48E495C1D6089DAD15DC7D7B46154D6B6CE8EF4AD69B15D4982559B297BCF1885C529F566660E57EC68EDBC3C05726CC02FD4CBF4976EAA9AFD5138FE8376435B9FC61D2FC0EB06E3", 16),
  g: new BigInteger("2")                                                                                            // 59
};                                                                                                                  // 60
_defaults.k = new BigInteger(                                                                                       // 61
  _defaults.hash(                                                                                                   // 62
    _defaults.N.toString(16) +                                                                                      // 63
      _defaults.g.toString(16)),                                                                                    // 64
  16);                                                                                                              // 65
                                                                                                                    // 66
/**                                                                                                                 // 67
 * Process an options hash to create SRP parameters.                                                                // 68
 *                                                                                                                  // 69
 * Options can include:                                                                                             // 70
 * - hash: Function. Defaults to SHA256.                                                                            // 71
 * - N: String or BigInteger. Defaults to 1024 bit value from RFC 5054                                              // 72
 * - g: String or BigInteger. Defaults to 2.                                                                        // 73
 * - k: String or BigInteger. Defaults to hash(N, g)                                                                // 74
 */                                                                                                                 // 75
var paramsFromOptions = function (options) {                                                                        // 76
  if (!options) // fast path                                                                                        // 77
    return _defaults;                                                                                               // 78
                                                                                                                    // 79
  var ret = _.extend({}, _defaults);                                                                                // 80
                                                                                                                    // 81
  _.each(['N', 'g', 'k'], function (p) {                                                                            // 82
    if (options[p]) {                                                                                               // 83
      if (typeof options[p] === "string")                                                                           // 84
        ret[p] = new BigInteger(options[p], 16);                                                                    // 85
      else if (options[p] instanceof BigInteger)                                                                    // 86
        ret[p] = options[p];                                                                                        // 87
      else                                                                                                          // 88
        throw new Error("Invalid parameter: " + p);                                                                 // 89
    }                                                                                                               // 90
  });                                                                                                               // 91
                                                                                                                    // 92
  if (options.hash)                                                                                                 // 93
    ret.hash = function (x) { return options.hash(x).toLowerCase(); };                                              // 94
                                                                                                                    // 95
  if (!options.k && (options.N || options.g || options.hash)) {                                                     // 96
    ret.k = ret.hash(ret.N.toString(16) + ret.g.toString(16));                                                      // 97
  }                                                                                                                 // 98
                                                                                                                    // 99
  return ret;                                                                                                       // 100
};                                                                                                                  // 101
                                                                                                                    // 102
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.srp = {}, {
  SRP: SRP
});

})();
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var Base64 = Package.base64.Base64;

/* Package-scope variables */
var EJSON, EJSONTest;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/ejson/ejson.js                                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
/**                                                                                                                  // 1
 * @namespace                                                                                                        // 2
 * @summary Namespace for EJSON functions                                                                            // 3
 */                                                                                                                  // 4
EJSON = {};                                                                                                          // 5
EJSONTest = {};                                                                                                      // 6
                                                                                                                     // 7
                                                                                                                     // 8
                                                                                                                     // 9
// Custom type interface definition                                                                                  // 10
/**                                                                                                                  // 11
 * @class CustomType                                                                                                 // 12
 * @instanceName customType                                                                                          // 13
 * @memberOf EJSON                                                                                                   // 14
 * @summary The interface that a class must satisfy to be able to become an                                          // 15
 * EJSON custom type via EJSON.addType.                                                                              // 16
 */                                                                                                                  // 17
                                                                                                                     // 18
/**                                                                                                                  // 19
 * @function typeName                                                                                                // 20
 * @memberOf EJSON.CustomType                                                                                        // 21
 * @summary Return the tag used to identify this type.  This must match the tag used to register this type with [`EJSON.addType`](#ejson_add_type).
 * @locus Anywhere                                                                                                   // 23
 * @instance                                                                                                         // 24
 */                                                                                                                  // 25
                                                                                                                     // 26
/**                                                                                                                  // 27
 * @function toJSONValue                                                                                             // 28
 * @memberOf EJSON.CustomType                                                                                        // 29
 * @summary Serialize this instance into a JSON-compatible value.                                                    // 30
 * @locus Anywhere                                                                                                   // 31
 * @instance                                                                                                         // 32
 */                                                                                                                  // 33
                                                                                                                     // 34
/**                                                                                                                  // 35
 * @function clone                                                                                                   // 36
 * @memberOf EJSON.CustomType                                                                                        // 37
 * @summary Return a value `r` such that `this.equals(r)` is true, and modifications to `r` do not affect `this` and vice versa.
 * @locus Anywhere                                                                                                   // 39
 * @instance                                                                                                         // 40
 */                                                                                                                  // 41
                                                                                                                     // 42
/**                                                                                                                  // 43
 * @function equals                                                                                                  // 44
 * @memberOf EJSON.CustomType                                                                                        // 45
 * @summary Return `true` if `other` has a value equal to `this`; `false` otherwise.                                 // 46
 * @locus Anywhere                                                                                                   // 47
 * @param {Object} other Another object to compare this to.                                                          // 48
 * @instance                                                                                                         // 49
 */                                                                                                                  // 50
                                                                                                                     // 51
                                                                                                                     // 52
var customTypes = {};                                                                                                // 53
// Add a custom type, using a method of your choice to get to and                                                    // 54
// from a basic JSON-able representation.  The factory argument                                                      // 55
// is a function of JSON-able --> your object                                                                        // 56
// The type you add must have:                                                                                       // 57
// - A toJSONValue() method, so that Meteor can serialize it                                                         // 58
// - a typeName() method, to show how to look it up in our type table.                                               // 59
// It is okay if these methods are monkey-patched on.                                                                // 60
// EJSON.clone will use toJSONValue and the given factory to produce                                                 // 61
// a clone, but you may specify a method clone() that will be                                                        // 62
// used instead.                                                                                                     // 63
// Similarly, EJSON.equals will use toJSONValue to make comparisons,                                                 // 64
// but you may provide a method equals() instead.                                                                    // 65
/**                                                                                                                  // 66
 * @summary Add a custom datatype to EJSON.                                                                          // 67
 * @locus Anywhere                                                                                                   // 68
 * @param {String} name A tag for your custom type; must be unique among custom data types defined in your project, and must match the result of your type's `typeName` method.
 * @param {Function} factory A function that deserializes a JSON-compatible value into an instance of your type.  This should match the serialization performed by your type's `toJSONValue` method.
 */                                                                                                                  // 71
EJSON.addType = function (name, factory) {                                                                           // 72
  if (_.has(customTypes, name))                                                                                      // 73
    throw new Error("Type " + name + " already present");                                                            // 74
  customTypes[name] = factory;                                                                                       // 75
};                                                                                                                   // 76
                                                                                                                     // 77
var isInfOrNan = function (obj) {                                                                                    // 78
  return _.isNaN(obj) || obj === Infinity || obj === -Infinity;                                                      // 79
};                                                                                                                   // 80
                                                                                                                     // 81
var builtinConverters = [                                                                                            // 82
  { // Date                                                                                                          // 83
    matchJSONValue: function (obj) {                                                                                 // 84
      return _.has(obj, '$date') && _.size(obj) === 1;                                                               // 85
    },                                                                                                               // 86
    matchObject: function (obj) {                                                                                    // 87
      return obj instanceof Date;                                                                                    // 88
    },                                                                                                               // 89
    toJSONValue: function (obj) {                                                                                    // 90
      return {$date: obj.getTime()};                                                                                 // 91
    },                                                                                                               // 92
    fromJSONValue: function (obj) {                                                                                  // 93
      return new Date(obj.$date);                                                                                    // 94
    }                                                                                                                // 95
  },                                                                                                                 // 96
  { // NaN, Inf, -Inf. (These are the only objects with typeof !== 'object'                                          // 97
    // which we match.)                                                                                              // 98
    matchJSONValue: function (obj) {                                                                                 // 99
      return _.has(obj, '$InfNaN') && _.size(obj) === 1;                                                             // 100
    },                                                                                                               // 101
    matchObject: isInfOrNan,                                                                                         // 102
    toJSONValue: function (obj) {                                                                                    // 103
      var sign;                                                                                                      // 104
      if (_.isNaN(obj))                                                                                              // 105
        sign = 0;                                                                                                    // 106
      else if (obj === Infinity)                                                                                     // 107
        sign = 1;                                                                                                    // 108
      else                                                                                                           // 109
        sign = -1;                                                                                                   // 110
      return {$InfNaN: sign};                                                                                        // 111
    },                                                                                                               // 112
    fromJSONValue: function (obj) {                                                                                  // 113
      return obj.$InfNaN/0;                                                                                          // 114
    }                                                                                                                // 115
  },                                                                                                                 // 116
  { // Binary                                                                                                        // 117
    matchJSONValue: function (obj) {                                                                                 // 118
      return _.has(obj, '$binary') && _.size(obj) === 1;                                                             // 119
    },                                                                                                               // 120
    matchObject: function (obj) {                                                                                    // 121
      return typeof Uint8Array !== 'undefined' && obj instanceof Uint8Array                                          // 122
        || (obj && _.has(obj, '$Uint8ArrayPolyfill'));                                                               // 123
    },                                                                                                               // 124
    toJSONValue: function (obj) {                                                                                    // 125
      return {$binary: Base64.encode(obj)};                                                                          // 126
    },                                                                                                               // 127
    fromJSONValue: function (obj) {                                                                                  // 128
      return Base64.decode(obj.$binary);                                                                             // 129
    }                                                                                                                // 130
  },                                                                                                                 // 131
  { // Escaping one level                                                                                            // 132
    matchJSONValue: function (obj) {                                                                                 // 133
      return _.has(obj, '$escape') && _.size(obj) === 1;                                                             // 134
    },                                                                                                               // 135
    matchObject: function (obj) {                                                                                    // 136
      if (_.isEmpty(obj) || _.size(obj) > 2) {                                                                       // 137
        return false;                                                                                                // 138
      }                                                                                                              // 139
      return _.any(builtinConverters, function (converter) {                                                         // 140
        return converter.matchJSONValue(obj);                                                                        // 141
      });                                                                                                            // 142
    },                                                                                                               // 143
    toJSONValue: function (obj) {                                                                                    // 144
      var newObj = {};                                                                                               // 145
      _.each(obj, function (value, key) {                                                                            // 146
        newObj[key] = EJSON.toJSONValue(value);                                                                      // 147
      });                                                                                                            // 148
      return {$escape: newObj};                                                                                      // 149
    },                                                                                                               // 150
    fromJSONValue: function (obj) {                                                                                  // 151
      var newObj = {};                                                                                               // 152
      _.each(obj.$escape, function (value, key) {                                                                    // 153
        newObj[key] = EJSON.fromJSONValue(value);                                                                    // 154
      });                                                                                                            // 155
      return newObj;                                                                                                 // 156
    }                                                                                                                // 157
  },                                                                                                                 // 158
  { // Custom                                                                                                        // 159
    matchJSONValue: function (obj) {                                                                                 // 160
      return _.has(obj, '$type') && _.has(obj, '$value') && _.size(obj) === 2;                                       // 161
    },                                                                                                               // 162
    matchObject: function (obj) {                                                                                    // 163
      return EJSON._isCustomType(obj);                                                                               // 164
    },                                                                                                               // 165
    toJSONValue: function (obj) {                                                                                    // 166
      var jsonValue = Meteor._noYieldsAllowed(function () {                                                          // 167
        return obj.toJSONValue();                                                                                    // 168
      });                                                                                                            // 169
      return {$type: obj.typeName(), $value: jsonValue};                                                             // 170
    },                                                                                                               // 171
    fromJSONValue: function (obj) {                                                                                  // 172
      var typeName = obj.$type;                                                                                      // 173
      if (!_.has(customTypes, typeName))                                                                             // 174
        throw new Error("Custom EJSON type " + typeName + " is not defined");                                        // 175
      var converter = customTypes[typeName];                                                                         // 176
      return Meteor._noYieldsAllowed(function () {                                                                   // 177
        return converter(obj.$value);                                                                                // 178
      });                                                                                                            // 179
    }                                                                                                                // 180
  }                                                                                                                  // 181
];                                                                                                                   // 182
                                                                                                                     // 183
EJSON._isCustomType = function (obj) {                                                                               // 184
  return obj &&                                                                                                      // 185
    typeof obj.toJSONValue === 'function' &&                                                                         // 186
    typeof obj.typeName === 'function' &&                                                                            // 187
    _.has(customTypes, obj.typeName());                                                                              // 188
};                                                                                                                   // 189
                                                                                                                     // 190
EJSON._getTypes = function () {                                                                                      // 191
  return customTypes;                                                                                                // 192
};                                                                                                                   // 193
                                                                                                                     // 194
EJSON._getConverters = function () {                                                                                 // 195
  return builtinConverters;                                                                                          // 196
};                                                                                                                   // 197
                                                                                                                     // 198
// for both arrays and objects, in-place modification.                                                               // 199
var adjustTypesToJSONValue =                                                                                         // 200
EJSON._adjustTypesToJSONValue = function (obj) {                                                                     // 201
  // Is it an atom that we need to adjust?                                                                           // 202
  if (obj === null)                                                                                                  // 203
    return null;                                                                                                     // 204
  var maybeChanged = toJSONValueHelper(obj);                                                                         // 205
  if (maybeChanged !== undefined)                                                                                    // 206
    return maybeChanged;                                                                                             // 207
                                                                                                                     // 208
  // Other atoms are unchanged.                                                                                      // 209
  if (typeof obj !== 'object')                                                                                       // 210
    return obj;                                                                                                      // 211
                                                                                                                     // 212
  // Iterate over array or object structure.                                                                         // 213
  _.each(obj, function (value, key) {                                                                                // 214
    if (typeof value !== 'object' && value !== undefined &&                                                          // 215
        !isInfOrNan(value))                                                                                          // 216
      return; // continue                                                                                            // 217
                                                                                                                     // 218
    var changed = toJSONValueHelper(value);                                                                          // 219
    if (changed) {                                                                                                   // 220
      obj[key] = changed;                                                                                            // 221
      return; // on to the next key                                                                                  // 222
    }                                                                                                                // 223
    // if we get here, value is an object but not adjustable                                                         // 224
    // at this level.  recurse.                                                                                      // 225
    adjustTypesToJSONValue(value);                                                                                   // 226
  });                                                                                                                // 227
  return obj;                                                                                                        // 228
};                                                                                                                   // 229
                                                                                                                     // 230
// Either return the JSON-compatible version of the argument, or undefined (if                                       // 231
// the item isn't itself replaceable, but maybe some fields in it are)                                               // 232
var toJSONValueHelper = function (item) {                                                                            // 233
  for (var i = 0; i < builtinConverters.length; i++) {                                                               // 234
    var converter = builtinConverters[i];                                                                            // 235
    if (converter.matchObject(item)) {                                                                               // 236
      return converter.toJSONValue(item);                                                                            // 237
    }                                                                                                                // 238
  }                                                                                                                  // 239
  return undefined;                                                                                                  // 240
};                                                                                                                   // 241
                                                                                                                     // 242
/**                                                                                                                  // 243
 * @summary Serialize an EJSON-compatible value into its plain JSON representation.                                  // 244
 * @locus Anywhere                                                                                                   // 245
 * @param {EJSON} val A value to serialize to plain JSON.                                                            // 246
 */                                                                                                                  // 247
EJSON.toJSONValue = function (item) {                                                                                // 248
  var changed = toJSONValueHelper(item);                                                                             // 249
  if (changed !== undefined)                                                                                         // 250
    return changed;                                                                                                  // 251
  if (typeof item === 'object') {                                                                                    // 252
    item = EJSON.clone(item);                                                                                        // 253
    adjustTypesToJSONValue(item);                                                                                    // 254
  }                                                                                                                  // 255
  return item;                                                                                                       // 256
};                                                                                                                   // 257
                                                                                                                     // 258
// for both arrays and objects. Tries its best to just                                                               // 259
// use the object you hand it, but may return something                                                              // 260
// different if the object you hand it itself needs changing.                                                        // 261
//                                                                                                                   // 262
var adjustTypesFromJSONValue =                                                                                       // 263
EJSON._adjustTypesFromJSONValue = function (obj) {                                                                   // 264
  if (obj === null)                                                                                                  // 265
    return null;                                                                                                     // 266
  var maybeChanged = fromJSONValueHelper(obj);                                                                       // 267
  if (maybeChanged !== obj)                                                                                          // 268
    return maybeChanged;                                                                                             // 269
                                                                                                                     // 270
  // Other atoms are unchanged.                                                                                      // 271
  if (typeof obj !== 'object')                                                                                       // 272
    return obj;                                                                                                      // 273
                                                                                                                     // 274
  _.each(obj, function (value, key) {                                                                                // 275
    if (typeof value === 'object') {                                                                                 // 276
      var changed = fromJSONValueHelper(value);                                                                      // 277
      if (value !== changed) {                                                                                       // 278
        obj[key] = changed;                                                                                          // 279
        return;                                                                                                      // 280
      }                                                                                                              // 281
      // if we get here, value is an object but not adjustable                                                       // 282
      // at this level.  recurse.                                                                                    // 283
      adjustTypesFromJSONValue(value);                                                                               // 284
    }                                                                                                                // 285
  });                                                                                                                // 286
  return obj;                                                                                                        // 287
};                                                                                                                   // 288
                                                                                                                     // 289
// Either return the argument changed to have the non-json                                                           // 290
// rep of itself (the Object version) or the argument itself.                                                        // 291
                                                                                                                     // 292
// DOES NOT RECURSE.  For actually getting the fully-changed value, use                                              // 293
// EJSON.fromJSONValue                                                                                               // 294
var fromJSONValueHelper = function (value) {                                                                         // 295
  if (typeof value === 'object' && value !== null) {                                                                 // 296
    if (_.size(value) <= 2                                                                                           // 297
        && _.all(value, function (v, k) {                                                                            // 298
          return typeof k === 'string' && k.substr(0, 1) === '$';                                                    // 299
        })) {                                                                                                        // 300
      for (var i = 0; i < builtinConverters.length; i++) {                                                           // 301
        var converter = builtinConverters[i];                                                                        // 302
        if (converter.matchJSONValue(value)) {                                                                       // 303
          return converter.fromJSONValue(value);                                                                     // 304
        }                                                                                                            // 305
      }                                                                                                              // 306
    }                                                                                                                // 307
  }                                                                                                                  // 308
  return value;                                                                                                      // 309
};                                                                                                                   // 310
                                                                                                                     // 311
/**                                                                                                                  // 312
 * @summary Deserialize an EJSON value from its plain JSON representation.                                           // 313
 * @locus Anywhere                                                                                                   // 314
 * @param {JSONCompatible} val A value to deserialize into EJSON.                                                    // 315
 */                                                                                                                  // 316
EJSON.fromJSONValue = function (item) {                                                                              // 317
  var changed = fromJSONValueHelper(item);                                                                           // 318
  if (changed === item && typeof item === 'object') {                                                                // 319
    item = EJSON.clone(item);                                                                                        // 320
    adjustTypesFromJSONValue(item);                                                                                  // 321
    return item;                                                                                                     // 322
  } else {                                                                                                           // 323
    return changed;                                                                                                  // 324
  }                                                                                                                  // 325
};                                                                                                                   // 326
                                                                                                                     // 327
/**                                                                                                                  // 328
 * @summary Serialize a value to a string.                                                                           // 329
                                                                                                                     // 330
For EJSON values, the serialization fully represents the value. For non-EJSON values, serializes the same way as `JSON.stringify`.
 * @locus Anywhere                                                                                                   // 332
 * @param {EJSON} val A value to stringify.                                                                          // 333
 * @param {Object} [options]                                                                                         // 334
 * @param {Boolean | Integer | String} options.indent Indents objects and arrays for easy readability.  When `true`, indents by 2 spaces; when an integer, indents by that number of spaces; and when a string, uses the string as the indentation pattern.
 * @param {Boolean} options.canonical When `true`, stringifies keys in an object in sorted order.                    // 336
 */                                                                                                                  // 337
EJSON.stringify = function (item, options) {                                                                         // 338
  var json = EJSON.toJSONValue(item);                                                                                // 339
  if (options && (options.canonical || options.indent)) {                                                            // 340
    return EJSON._canonicalStringify(json, options);                                                                 // 341
  } else {                                                                                                           // 342
    return JSON.stringify(json);                                                                                     // 343
  }                                                                                                                  // 344
};                                                                                                                   // 345
                                                                                                                     // 346
/**                                                                                                                  // 347
 * @summary Parse a string into an EJSON value. Throws an error if the string is not valid EJSON.                    // 348
 * @locus Anywhere                                                                                                   // 349
 * @param {String} str A string to parse into an EJSON value.                                                        // 350
 */                                                                                                                  // 351
EJSON.parse = function (item) {                                                                                      // 352
  if (typeof item !== 'string')                                                                                      // 353
    throw new Error("EJSON.parse argument should be a string");                                                      // 354
  return EJSON.fromJSONValue(JSON.parse(item));                                                                      // 355
};                                                                                                                   // 356
                                                                                                                     // 357
/**                                                                                                                  // 358
 * @summary Returns true if `x` is a buffer of binary data, as returned from [`EJSON.newBinary`](#ejson_new_binary).
 * @param {Object} x The variable to check.                                                                          // 360
 * @locus Anywhere                                                                                                   // 361
 */                                                                                                                  // 362
EJSON.isBinary = function (obj) {                                                                                    // 363
  return !!((typeof Uint8Array !== 'undefined' && obj instanceof Uint8Array) ||                                      // 364
    (obj && obj.$Uint8ArrayPolyfill));                                                                               // 365
};                                                                                                                   // 366
                                                                                                                     // 367
/**                                                                                                                  // 368
 * @summary Return true if `a` and `b` are equal to each other.  Return false otherwise.  Uses the `equals` method on `a` if present, otherwise performs a deep comparison.
 * @locus Anywhere                                                                                                   // 370
 * @param {EJSON} a                                                                                                  // 371
 * @param {EJSON} b                                                                                                  // 372
 * @param {Object} [options]                                                                                         // 373
 * @param {Boolean} options.keyOrderSensitive Compare in key sensitive order, if supported by the JavaScript implementation.  For example, `{a: 1, b: 2}` is equal to `{b: 2, a: 1}` only when `keyOrderSensitive` is `false`.  The default is `false`.
 */                                                                                                                  // 375
EJSON.equals = function (a, b, options) {                                                                            // 376
  var i;                                                                                                             // 377
  var keyOrderSensitive = !!(options && options.keyOrderSensitive);                                                  // 378
  if (a === b)                                                                                                       // 379
    return true;                                                                                                     // 380
  if (_.isNaN(a) && _.isNaN(b))                                                                                      // 381
    return true; // This differs from the IEEE spec for NaN equality, b/c we don't want                              // 382
                 // anything ever with a NaN to be poisoned from becoming equal to anything.                         // 383
  if (!a || !b) // if either one is falsy, they'd have to be === to be equal                                         // 384
    return false;                                                                                                    // 385
  if (!(typeof a === 'object' && typeof b === 'object'))                                                             // 386
    return false;                                                                                                    // 387
  if (a instanceof Date && b instanceof Date)                                                                        // 388
    return a.valueOf() === b.valueOf();                                                                              // 389
  if (EJSON.isBinary(a) && EJSON.isBinary(b)) {                                                                      // 390
    if (a.length !== b.length)                                                                                       // 391
      return false;                                                                                                  // 392
    for (i = 0; i < a.length; i++) {                                                                                 // 393
      if (a[i] !== b[i])                                                                                             // 394
        return false;                                                                                                // 395
    }                                                                                                                // 396
    return true;                                                                                                     // 397
  }                                                                                                                  // 398
  if (typeof (a.equals) === 'function')                                                                              // 399
    return a.equals(b, options);                                                                                     // 400
  if (typeof (b.equals) === 'function')                                                                              // 401
    return b.equals(a, options);                                                                                     // 402
  if (a instanceof Array) {                                                                                          // 403
    if (!(b instanceof Array))                                                                                       // 404
      return false;                                                                                                  // 405
    if (a.length !== b.length)                                                                                       // 406
      return false;                                                                                                  // 407
    for (i = 0; i < a.length; i++) {                                                                                 // 408
      if (!EJSON.equals(a[i], b[i], options))                                                                        // 409
        return false;                                                                                                // 410
    }                                                                                                                // 411
    return true;                                                                                                     // 412
  }                                                                                                                  // 413
  // fallback for custom types that don't implement their own equals                                                 // 414
  switch (EJSON._isCustomType(a) + EJSON._isCustomType(b)) {                                                         // 415
    case 1: return false;                                                                                            // 416
    case 2: return EJSON.equals(EJSON.toJSONValue(a), EJSON.toJSONValue(b));                                         // 417
  }                                                                                                                  // 418
  // fall back to structural equality of objects                                                                     // 419
  var ret;                                                                                                           // 420
  if (keyOrderSensitive) {                                                                                           // 421
    var bKeys = [];                                                                                                  // 422
    _.each(b, function (val, x) {                                                                                    // 423
        bKeys.push(x);                                                                                               // 424
    });                                                                                                              // 425
    i = 0;                                                                                                           // 426
    ret = _.all(a, function (val, x) {                                                                               // 427
      if (i >= bKeys.length) {                                                                                       // 428
        return false;                                                                                                // 429
      }                                                                                                              // 430
      if (x !== bKeys[i]) {                                                                                          // 431
        return false;                                                                                                // 432
      }                                                                                                              // 433
      if (!EJSON.equals(val, b[bKeys[i]], options)) {                                                                // 434
        return false;                                                                                                // 435
      }                                                                                                              // 436
      i++;                                                                                                           // 437
      return true;                                                                                                   // 438
    });                                                                                                              // 439
    return ret && i === bKeys.length;                                                                                // 440
  } else {                                                                                                           // 441
    i = 0;                                                                                                           // 442
    ret = _.all(a, function (val, key) {                                                                             // 443
      if (!_.has(b, key)) {                                                                                          // 444
        return false;                                                                                                // 445
      }                                                                                                              // 446
      if (!EJSON.equals(val, b[key], options)) {                                                                     // 447
        return false;                                                                                                // 448
      }                                                                                                              // 449
      i++;                                                                                                           // 450
      return true;                                                                                                   // 451
    });                                                                                                              // 452
    return ret && _.size(b) === i;                                                                                   // 453
  }                                                                                                                  // 454
};                                                                                                                   // 455
                                                                                                                     // 456
/**                                                                                                                  // 457
 * @summary Return a deep copy of `val`.                                                                             // 458
 * @locus Anywhere                                                                                                   // 459
 * @param {EJSON} val A value to copy.                                                                               // 460
 */                                                                                                                  // 461
EJSON.clone = function (v) {                                                                                         // 462
  var ret;                                                                                                           // 463
  if (typeof v !== "object")                                                                                         // 464
    return v;                                                                                                        // 465
  if (v === null)                                                                                                    // 466
    return null; // null has typeof "object"                                                                         // 467
  if (v instanceof Date)                                                                                             // 468
    return new Date(v.getTime());                                                                                    // 469
  // RegExps are not really EJSON elements (eg we don't define a serialization                                       // 470
  // for them), but they're immutable anyway, so we can support them in clone.                                       // 471
  if (v instanceof RegExp)                                                                                           // 472
    return v;                                                                                                        // 473
  if (EJSON.isBinary(v)) {                                                                                           // 474
    ret = EJSON.newBinary(v.length);                                                                                 // 475
    for (var i = 0; i < v.length; i++) {                                                                             // 476
      ret[i] = v[i];                                                                                                 // 477
    }                                                                                                                // 478
    return ret;                                                                                                      // 479
  }                                                                                                                  // 480
  // XXX: Use something better than underscore's isArray                                                             // 481
  if (_.isArray(v) || _.isArguments(v)) {                                                                            // 482
    // For some reason, _.map doesn't work in this context on Opera (weird test                                      // 483
    // failures).                                                                                                    // 484
    ret = [];                                                                                                        // 485
    for (i = 0; i < v.length; i++)                                                                                   // 486
      ret[i] = EJSON.clone(v[i]);                                                                                    // 487
    return ret;                                                                                                      // 488
  }                                                                                                                  // 489
  // handle general user-defined typed Objects if they have a clone method                                           // 490
  if (typeof v.clone === 'function') {                                                                               // 491
    return v.clone();                                                                                                // 492
  }                                                                                                                  // 493
  // handle other custom types                                                                                       // 494
  if (EJSON._isCustomType(v)) {                                                                                      // 495
    return EJSON.fromJSONValue(EJSON.clone(EJSON.toJSONValue(v)), true);                                             // 496
  }                                                                                                                  // 497
  // handle other objects                                                                                            // 498
  ret = {};                                                                                                          // 499
  _.each(v, function (value, key) {                                                                                  // 500
    ret[key] = EJSON.clone(value);                                                                                   // 501
  });                                                                                                                // 502
  return ret;                                                                                                        // 503
};                                                                                                                   // 504
                                                                                                                     // 505
/**                                                                                                                  // 506
 * @summary Allocate a new buffer of binary data that EJSON can serialize.                                           // 507
 * @locus Anywhere                                                                                                   // 508
 * @param {Number} size The number of bytes of binary data to allocate.                                              // 509
 */                                                                                                                  // 510
// EJSON.newBinary is the public documented API for this functionality,                                              // 511
// but the implementation is in the 'base64' package to avoid                                                        // 512
// introducing a circular dependency. (If the implementation were here,                                              // 513
// then 'base64' would have to use EJSON.newBinary, and 'ejson' would                                                // 514
// also have to use 'base64'.)                                                                                       // 515
EJSON.newBinary = Base64.newBinary;                                                                                  // 516
                                                                                                                     // 517
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/ejson/stringify.js                                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Based on json2.js from https://github.com/douglascrockford/JSON-js                                                // 1
//                                                                                                                   // 2
//    json2.js                                                                                                       // 3
//    2012-10-08                                                                                                     // 4
//                                                                                                                   // 5
//    Public Domain.                                                                                                 // 6
//                                                                                                                   // 7
//    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.                                                        // 8
                                                                                                                     // 9
function quote(string) {                                                                                             // 10
  return JSON.stringify(string);                                                                                     // 11
}                                                                                                                    // 12
                                                                                                                     // 13
var str = function (key, holder, singleIndent, outerIndent, canonical) {                                             // 14
                                                                                                                     // 15
  // Produce a string from holder[key].                                                                              // 16
                                                                                                                     // 17
  var i;          // The loop counter.                                                                               // 18
  var k;          // The member key.                                                                                 // 19
  var v;          // The member value.                                                                               // 20
  var length;                                                                                                        // 21
  var innerIndent = outerIndent;                                                                                     // 22
  var partial;                                                                                                       // 23
  var value = holder[key];                                                                                           // 24
                                                                                                                     // 25
  // What happens next depends on the value's type.                                                                  // 26
                                                                                                                     // 27
  switch (typeof value) {                                                                                            // 28
  case 'string':                                                                                                     // 29
    return quote(value);                                                                                             // 30
  case 'number':                                                                                                     // 31
    // JSON numbers must be finite. Encode non-finite numbers as null.                                               // 32
    return isFinite(value) ? String(value) : 'null';                                                                 // 33
  case 'boolean':                                                                                                    // 34
    return String(value);                                                                                            // 35
  // If the type is 'object', we might be dealing with an object or an array or                                      // 36
  // null.                                                                                                           // 37
  case 'object':                                                                                                     // 38
    // Due to a specification blunder in ECMAScript, typeof null is 'object',                                        // 39
    // so watch out for that case.                                                                                   // 40
    if (!value) {                                                                                                    // 41
      return 'null';                                                                                                 // 42
    }                                                                                                                // 43
    // Make an array to hold the partial results of stringifying this object value.                                  // 44
    innerIndent = outerIndent + singleIndent;                                                                        // 45
    partial = [];                                                                                                    // 46
                                                                                                                     // 47
    // Is the value an array?                                                                                        // 48
    if (_.isArray(value) || _.isArguments(value)) {                                                                  // 49
                                                                                                                     // 50
      // The value is an array. Stringify every element. Use null as a placeholder                                   // 51
      // for non-JSON values.                                                                                        // 52
                                                                                                                     // 53
      length = value.length;                                                                                         // 54
      for (i = 0; i < length; i += 1) {                                                                              // 55
        partial[i] = str(i, value, singleIndent, innerIndent, canonical) || 'null';                                  // 56
      }                                                                                                              // 57
                                                                                                                     // 58
      // Join all of the elements together, separated with commas, and wrap them in                                  // 59
      // brackets.                                                                                                   // 60
                                                                                                                     // 61
      if (partial.length === 0) {                                                                                    // 62
        v = '[]';                                                                                                    // 63
      } else if (innerIndent) {                                                                                      // 64
        v = '[\n' + innerIndent + partial.join(',\n' + innerIndent) + '\n' + outerIndent + ']';                      // 65
      } else {                                                                                                       // 66
        v = '[' + partial.join(',') + ']';                                                                           // 67
      }                                                                                                              // 68
      return v;                                                                                                      // 69
    }                                                                                                                // 70
                                                                                                                     // 71
                                                                                                                     // 72
    // Iterate through all of the keys in the object.                                                                // 73
    var keys = _.keys(value);                                                                                        // 74
    if (canonical)                                                                                                   // 75
      keys = keys.sort();                                                                                            // 76
    _.each(keys, function (k) {                                                                                      // 77
      v = str(k, value, singleIndent, innerIndent, canonical);                                                       // 78
      if (v) {                                                                                                       // 79
        partial.push(quote(k) + (innerIndent ? ': ' : ':') + v);                                                     // 80
      }                                                                                                              // 81
    });                                                                                                              // 82
                                                                                                                     // 83
                                                                                                                     // 84
    // Join all of the member texts together, separated with commas,                                                 // 85
    // and wrap them in braces.                                                                                      // 86
                                                                                                                     // 87
    if (partial.length === 0) {                                                                                      // 88
      v = '{}';                                                                                                      // 89
    } else if (innerIndent) {                                                                                        // 90
      v = '{\n' + innerIndent + partial.join(',\n' + innerIndent) + '\n' + outerIndent + '}';                        // 91
    } else {                                                                                                         // 92
      v = '{' + partial.join(',') + '}';                                                                             // 93
    }                                                                                                                // 94
    return v;                                                                                                        // 95
  }                                                                                                                  // 96
}                                                                                                                    // 97
                                                                                                                     // 98
// If the JSON object does not yet have a stringify method, give it one.                                             // 99
                                                                                                                     // 100
EJSON._canonicalStringify = function (value, options) {                                                              // 101
  // Make a fake root object containing our value under the key of ''.                                               // 102
  // Return the result of stringifying the value.                                                                    // 103
  options = _.extend({                                                                                               // 104
    indent: "",                                                                                                      // 105
    canonical: false                                                                                                 // 106
  }, options);                                                                                                       // 107
  if (options.indent === true) {                                                                                     // 108
    options.indent = "  ";                                                                                           // 109
  } else if (typeof options.indent === 'number') {                                                                   // 110
    var newIndent = "";                                                                                              // 111
    for (var i = 0; i < options.indent; i++) {                                                                       // 112
      newIndent += ' ';                                                                                              // 113
    }                                                                                                                // 114
    options.indent = newIndent;                                                                                      // 115
  }                                                                                                                  // 116
  return str('', {'': value}, options.indent, "", options.canonical);                                                // 117
};                                                                                                                   // 118
                                                                                                                     // 119
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.ejson = {}, {
  EJSON: EJSON,
  EJSONTest: EJSONTest
});

})();
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Accounts = Package['accounts-base'].Accounts;
var SRP = Package.srp.SRP;
var SHA256 = Package.sha.SHA256;
var EJSON = Package.ejson.EJSON;
var DDP = Package['ddp-client'].DDP;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"accounts-password":{"password_client.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/accounts-password/password_client.js                                                              //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
// Used in the various functions below to handle errors consistently                                          // 1
function reportError(error, callback) {                                                                       // 2
  if (callback) {                                                                                             // 3
    callback(error);                                                                                          // 4
  } else {                                                                                                    // 5
    throw error;                                                                                              // 6
  }                                                                                                           // 7
};                                                                                                            // 8
                                                                                                              //
// Attempt to log in with a password.                                                                         // 10
//                                                                                                            // 11
// @param selector {String|Object} One of the following:                                                      // 12
//   - {username: (username)}                                                                                 // 13
//   - {email: (email)}                                                                                       // 14
//   - a string which may be a username or email, depending on whether                                        // 15
//     it contains "@".                                                                                       // 16
// @param password {String}                                                                                   // 17
// @param callback {Function(error|undefined)}                                                                // 18
                                                                                                              //
/**                                                                                                           // 20
 * @summary Log the user in with a password.                                                                  //
 * @locus Client                                                                                              //
 * @param {Object | String} user                                                                              //
 *   Either a string interpreted as a username or an email; or an object with a                               //
 *   single key: `email`, `username` or `id`. Username or email match in a case                               //
 *   insensitive manner.                                                                                      //
 * @param {String} password The user's password.                                                              //
 * @param {Function} [callback] Optional callback.                                                            //
 *   Called with no arguments on success, or with a single `Error` argument                                   //
 *   on failure.                                                                                              //
 * @importFromPackage meteor                                                                                  //
 */                                                                                                           //
Meteor.loginWithPassword = function (selector, password, callback) {                                          // 33
  if (typeof selector === 'string') if (selector.indexOf('@') === -1) selector = { username: selector };else selector = { email: selector };
                                                                                                              //
  Accounts.callLoginMethod({                                                                                  // 40
    methodArguments: [{                                                                                       // 41
      user: selector,                                                                                         // 42
      password: Accounts._hashPassword(password)                                                              // 43
    }],                                                                                                       // 41
    userCallback: function () {                                                                               // 45
      function userCallback(error, result) {                                                                  // 45
        if (error && error.error === 400 && error.reason === 'old password format') {                         // 46
          // The "reason" string should match the error thrown in the                                         // 48
          // password login handler in password_server.js.                                                    // 49
                                                                                                              //
          // XXX COMPAT WITH 0.8.1.3                                                                          // 51
          // If this user's last login was with a previous version of                                         // 52
          // Meteor that used SRP, then the server throws this error to                                       // 53
          // indicate that we should try again. The error includes the                                        // 54
          // user's SRP identity. We provide a value derived from the                                         // 55
          // identity and the password to prove to the server that we know                                    // 56
          // the password without requiring a full SRP flow, as well as                                       // 57
          // SHA256(password), which the server bcrypts and stores in                                         // 58
          // place of the old SRP information for this user.                                                  // 59
          srpUpgradePath({                                                                                    // 60
            upgradeError: error,                                                                              // 61
            userSelector: selector,                                                                           // 62
            plaintextPassword: password                                                                       // 63
          }, callback);                                                                                       // 60
        } else if (error) {                                                                                   // 65
          reportError(error, callback);                                                                       // 67
        } else {                                                                                              // 68
          callback && callback();                                                                             // 69
        }                                                                                                     // 70
      }                                                                                                       // 71
                                                                                                              //
      return userCallback;                                                                                    // 45
    }()                                                                                                       // 45
  });                                                                                                         // 40
};                                                                                                            // 73
                                                                                                              //
Accounts._hashPassword = function (password) {                                                                // 75
  return {                                                                                                    // 76
    digest: SHA256(password),                                                                                 // 77
    algorithm: "sha-256"                                                                                      // 78
  };                                                                                                          // 76
};                                                                                                            // 80
                                                                                                              //
// XXX COMPAT WITH 0.8.1.3                                                                                    // 82
// The server requested an upgrade from the old SRP password format,                                          // 83
// so supply the needed SRP identity to login. Options:                                                       // 84
//   - upgradeError: the error object that the server returned to tell                                        // 85
//     us to upgrade from SRP to bcrypt.                                                                      // 86
//   - userSelector: selector to retrieve the user object                                                     // 87
//   - plaintextPassword: the password as a string                                                            // 88
var srpUpgradePath = function srpUpgradePath(options, callback) {                                             // 89
  var details;                                                                                                // 90
  try {                                                                                                       // 91
    details = EJSON.parse(options.upgradeError.details);                                                      // 92
  } catch (e) {}                                                                                              // 93
  if (!(details && details.format === 'srp')) {                                                               // 94
    reportError(new Meteor.Error(400, "Password is old. Please reset your " + "password."), callback);        // 95
  } else {                                                                                                    // 98
    Accounts.callLoginMethod({                                                                                // 99
      methodArguments: [{                                                                                     // 100
        user: options.userSelector,                                                                           // 101
        srp: SHA256(details.identity + ":" + options.plaintextPassword),                                      // 102
        password: Accounts._hashPassword(options.plaintextPassword)                                           // 103
      }],                                                                                                     // 100
      userCallback: callback                                                                                  // 105
    });                                                                                                       // 99
  }                                                                                                           // 107
};                                                                                                            // 108
                                                                                                              //
// Attempt to log in as a new user.                                                                           // 110
                                                                                                              //
/**                                                                                                           // 112
 * @summary Create a new user.                                                                                //
 * @locus Anywhere                                                                                            //
 * @param {Object} options                                                                                    //
 * @param {String} options.username A unique name for this user.                                              //
 * @param {String} options.email The user's email address.                                                    //
 * @param {String} options.password The user's password. This is __not__ sent in plain text over the wire.    //
 * @param {Object} options.profile The user's profile, typically including the `name` field.                  //
 * @param {Function} [callback] Client only, optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
 * @importFromPackage accounts-base                                                                           //
 */                                                                                                           //
Accounts.createUser = function (options, callback) {                                                          // 123
  options = _.clone(options); // we'll be modifying options                                                   // 124
                                                                                                              //
  if (typeof options.password !== 'string') throw new Error("options.password must be a string");             // 126
  if (!options.password) {                                                                                    // 128
    return reportError(new Meteor.Error(400, "Password may not be empty"), callback);                         // 129
  }                                                                                                           // 130
                                                                                                              //
  // Replace password with the hashed password.                                                               // 132
  options.password = Accounts._hashPassword(options.password);                                                // 133
                                                                                                              //
  Accounts.callLoginMethod({                                                                                  // 135
    methodName: 'createUser',                                                                                 // 136
    methodArguments: [options],                                                                               // 137
    userCallback: callback                                                                                    // 138
  });                                                                                                         // 135
};                                                                                                            // 140
                                                                                                              //
// Change password. Must be logged in.                                                                        // 142
//                                                                                                            // 143
// @param oldPassword {String|null} By default servers no longer allow                                        // 144
//   changing password without the old password, but they could so we                                         // 145
//   support passing no password to the server and letting it decide.                                         // 146
// @param newPassword {String}                                                                                // 147
// @param callback {Function(error|undefined)}                                                                // 148
                                                                                                              //
/**                                                                                                           // 150
 * @summary Change the current user's password. Must be logged in.                                            //
 * @locus Client                                                                                              //
 * @param {String} oldPassword The user's current password. This is __not__ sent in plain text over the wire.
 * @param {String} newPassword A new password for the user. This is __not__ sent in plain text over the wire.
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
 * @importFromPackage accounts-base                                                                           //
 */                                                                                                           //
Accounts.changePassword = function (oldPassword, newPassword, callback) {                                     // 158
  if (!Meteor.user()) {                                                                                       // 159
    return reportError(new Error("Must be logged in to change password."), callback);                         // 160
  }                                                                                                           // 161
                                                                                                              //
  check(newPassword, String);                                                                                 // 163
  if (!newPassword) {                                                                                         // 164
    return reportError(new Meteor.Error(400, "Password may not be empty"), callback);                         // 165
  }                                                                                                           // 166
                                                                                                              //
  Accounts.connection.apply('changePassword', [oldPassword ? Accounts._hashPassword(oldPassword) : null, Accounts._hashPassword(newPassword)], function (error, result) {
    if (error || !result) {                                                                                   // 173
      if (error && error.error === 400 && error.reason === 'old password format') {                           // 174
        // XXX COMPAT WITH 0.8.1.3                                                                            // 176
        // The server is telling us to upgrade from SRP to bcrypt, as                                         // 177
        // in Meteor.loginWithPassword.                                                                       // 178
        srpUpgradePath({                                                                                      // 179
          upgradeError: error,                                                                                // 180
          userSelector: { id: Meteor.userId() },                                                              // 181
          plaintextPassword: oldPassword                                                                      // 182
        }, function (err) {                                                                                   // 179
          if (err) {                                                                                          // 184
            reportError(err, callback);                                                                       // 185
          } else {                                                                                            // 186
            // Now that we've successfully migrated from srp to                                               // 187
            // bcrypt, try changing the password again.                                                       // 188
            Accounts.changePassword(oldPassword, newPassword, callback);                                      // 189
          }                                                                                                   // 190
        });                                                                                                   // 191
      } else {                                                                                                // 192
        // A normal error, not an error telling us to upgrade to bcrypt                                       // 193
        reportError(error || new Error("No result from changePassword."), callback);                          // 194
      }                                                                                                       // 196
    } else {                                                                                                  // 197
      callback && callback();                                                                                 // 198
    }                                                                                                         // 199
  });                                                                                                         // 200
};                                                                                                            // 202
                                                                                                              //
// Sends an email to a user with a link that can be used to reset                                             // 204
// their password                                                                                             // 205
//                                                                                                            // 206
// @param options {Object}                                                                                    // 207
//   - email: (email)                                                                                         // 208
// @param callback (optional) {Function(error|undefined)}                                                     // 209
                                                                                                              //
/**                                                                                                           // 211
 * @summary Request a forgot password email.                                                                  //
 * @locus Client                                                                                              //
 * @param {Object} options                                                                                    //
 * @param {String} options.email The email address to send a password reset link.                             //
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
 * @importFromPackage accounts-base                                                                           //
 */                                                                                                           //
Accounts.forgotPassword = function (options, callback) {                                                      // 219
  if (!options.email) {                                                                                       // 220
    return reportError(new Meteor.Error(400, "Must pass options.email"), callback);                           // 221
  }                                                                                                           // 222
                                                                                                              //
  if (callback) {                                                                                             // 224
    Accounts.connection.call("forgotPassword", options, callback);                                            // 225
  } else {                                                                                                    // 226
    Accounts.connection.call("forgotPassword", options);                                                      // 227
  }                                                                                                           // 228
};                                                                                                            // 229
                                                                                                              //
// Resets a password based on a token originally created by                                                   // 231
// Accounts.forgotPassword, and then logs in the matching user.                                               // 232
//                                                                                                            // 233
// @param token {String}                                                                                      // 234
// @param newPassword {String}                                                                                // 235
// @param callback (optional) {Function(error|undefined)}                                                     // 236
                                                                                                              //
/**                                                                                                           // 238
 * @summary Reset the password for a user using a token received in email. Logs the user in afterwards.       //
 * @locus Client                                                                                              //
 * @param {String} token The token retrieved from the reset password URL.                                     //
 * @param {String} newPassword A new password for the user. This is __not__ sent in plain text over the wire.
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
 * @importFromPackage accounts-base                                                                           //
 */                                                                                                           //
Accounts.resetPassword = function (token, newPassword, callback) {                                            // 246
  check(token, String);                                                                                       // 247
  check(newPassword, String);                                                                                 // 248
                                                                                                              //
  if (!newPassword) {                                                                                         // 250
    return reportError(new Meteor.Error(400, "Password may not be empty"), callback);                         // 251
  }                                                                                                           // 252
                                                                                                              //
  Accounts.callLoginMethod({                                                                                  // 254
    methodName: 'resetPassword',                                                                              // 255
    methodArguments: [token, Accounts._hashPassword(newPassword)],                                            // 256
    userCallback: callback });                                                                                // 257
};                                                                                                            // 258
                                                                                                              //
// Verifies a user's email address based on a token originally                                                // 260
// created by Accounts.sendVerificationEmail                                                                  // 261
//                                                                                                            // 262
// @param token {String}                                                                                      // 263
// @param callback (optional) {Function(error|undefined)}                                                     // 264
                                                                                                              //
/**                                                                                                           // 266
 * @summary Marks the user's email address as verified. Logs the user in afterwards.                          //
 * @locus Client                                                                                              //
 * @param {String} token The token retrieved from the verification URL.                                       //
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure.
 * @importFromPackage accounts-base                                                                           //
 */                                                                                                           //
Accounts.verifyEmail = function (token, callback) {                                                           // 273
  if (!token) {                                                                                               // 274
    return reportError(new Meteor.Error(400, "Need to pass token"), callback);                                // 275
  }                                                                                                           // 276
                                                                                                              //
  Accounts.callLoginMethod({                                                                                  // 278
    methodName: 'verifyEmail',                                                                                // 279
    methodArguments: [token],                                                                                 // 280
    userCallback: callback });                                                                                // 281
};                                                                                                            // 282
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/accounts-password/password_client.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-password'] = {};

})();
/* Imports for global scope */

Accounts = Package['accounts-base'].Accounts;

