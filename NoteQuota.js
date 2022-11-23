var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");


var exports = (function() {

	var NoteQuota = function(cb) {
		this.points = NoteQuota.MAX;
		this.history = new Array(NoteQuota.HISTLEN);
		this.cb = cb;
	};

	NoteQuota.ALLOWANCE = Math.floor(33);
	NoteQuota.MAX = Math.floor(99);
	NoteQuota.HISTLEN = Math.floor(NoteQuota.MAX / NoteQuota.ALLOWANCE);

	NoteQuota.prototype.tick = function() {
		// keep a brief history
		this.history.unshift(this.points);
		this.history.length = NoteQuota.HISTLEN;
		// hook a brother up with some more quota
		this.points += NoteQuota.ALLOWANCE;
		if(this.points > NoteQuota.MAX) this.points = NoteQuota.MAX;
		// fire callback
		if(this.cb) this.cb(this.points);
	};

	NoteQuota.prototype.spend = function(needed) {
		// check whether aggressive limitation is needed
		var sum = 0;
		for(var i in this.history) {
			sum += this.history[i];
		}
		if(sum <= 0) needed *= NoteQuota.ALLOWANCE;
		// fire callback
		if(this.cb) this.cb(this.points);
		// can they afford it?  spend
		if(this.points < needed) {
			return false;
		} else {
			this.points -= needed;
			return true;
		}
	};

	return NoteQuota;

})();

if(typeof module !== "undefined") {
	module.exports = exports;
} else {
	this.NoteQuota = exports;
}


}
/*
     FILE ARCHIVED ON 11:45:30 Apr 26, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:38:01 Nov 23, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 162.684
  exclusion.robots: 0.078
  exclusion.robots.policy: 0.068
  RedisCDXSource: 0.688
  esindex: 0.009
  LoadShardBlock: 142.512 (3)
  PetaboxLoader3.datanode: 203.664 (4)
  CDXLines.iter: 15.924 (3)
  load_resource: 168.527
  PetaboxLoader3.resolve: 68.422
*/