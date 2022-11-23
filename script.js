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

$(function() {

	var test_mode = (window.location.hash && window.location.hash == "#test");

	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(elt /*, from*/) {
			var len = this.length >>> 0;
			var from = Number(arguments[1]) || 0;
			from = (from < 0) ? Math.ceil(from) : Math.floor(from);
			if (from < 0) from += len;
			for (; from < len; from++) {
				if (from in this && this[from] === elt) return from;
			}
			return -1;
		};
	}















// performing translation

////////////////////////////////////////////////////////////////

	var Translation = (function() {
		var strings = {
			"people are playing": {
				"pt": "pessoas estão jogando",
				"es": "personas están jugando",
				"ru": "человек играет",
				"fr": "personnes jouent",
				"ja": "人が遊んでいる",
				"de": "Leute spielen",
				"zh": "人被打",
				"nl": "mensen spelen",
				"pl": "osób grają",
				"hu": "ember játszik"
			},
			"New Room...": {
				"pt": "Nova Sala ...",
				"es": "Nueva sala de...",
				"ru": "Новый номер...",
				"ja": "新しい部屋",
				"zh": "新房间",
				"nl": "nieuwe Kamer",
				"hu": "új szoba"
			},
			"room name": {
				"pt": "nome da sala",
				"es": "sala de nombre",
				"ru": "название комнаты",
				"fr": "nom de la chambre",
				"ja": "ルーム名",
				"de": "Raumnamen",
				"zh": "房间名称",
				"nl": "kamernaam",
				"pl": "nazwa pokój",
				"hu": "szoba neve"
			},
			"Visible (open to everyone)": {
				"pt": "Visível (aberto a todos)",
				"es": "Visible (abierto a todo el mundo)",
				"ru": "Visible (открытый для всех)",
				"fr": "Visible (ouvert à tous)",
				"ja": "目に見える（誰にでも開いている）",
				"de": "Sichtbar (offen für alle)",
				"zh": "可见（向所有人开放）",
				"nl": "Zichtbaar (open voor iedereen)",
				"pl": "Widoczne (otwarte dla wszystkich)",
				"hu": "Látható (nyitott mindenki számára)"
			},
			"Enable chat": {
				"pt": "Ativar bate-papo",
				"es": "Habilitar chat",
				"ru": "Включить чат",
				"fr": "Activer discuter",
				"ja": "チャットを有効にする",
				"de": "aktivieren Sie chatten",
				"zh": "启用聊天",
				"nl": "Chat inschakelen",
				"pl": "Włącz czat",
				"hu": "a csevegést"
			}
			// todo: it, tr, th, sv, ar, fi, nb, da, sv, he, cs, ko, ro, vi, id, nb, el, sk, bg, lt, sl, hr
			// todo: Connecting, Offline mode, input placeholder, Notifications
		};

		var setLanguage = function(lang) {
			language = lang
		};

		var getLanguage = function() {
			if(window.navigator && navigator.language && navigator.language.length >= 2) {
				return navigator.language.substr(0, 2).toLowerCase();
			} else {
				return "en";
			}
		};

		var get = function(text, lang) {
			if(typeof lang === "undefined") lang = language;
			var row = strings[text];
			if(row == undefined) return text;
			var string = row[lang];
			if(string == undefined) return text;
			return string;
		};

		var perform = function(lang) {
			if(typeof lang === "undefined") lang = language;
			$(".translate").each(function(i, ele) {
				var th = $(this);
				if(ele.tagName && ele.tagName.toLowerCase() == "input") {
					if(typeof ele.placeholder != "undefined") {
						th.attr("placeholder", get(th.attr("placeholder"), lang))
					}
				} else {
					th.text(get(th.text(), lang));
				}
			});
		};

		var language = getLanguage();

		return {
			setLanguage: setLanguage,
			getLanguage: getLanguage,
			get: get,
			perform: perform
		};
	})();

	Translation.perform();















// AudioEngine classes

////////////////////////////////////////////////////////////////

	var AudioEngine = function() {
	};

	AudioEngine.prototype.init = function(cb) {
		this.volume = 0.6;
		this.sounds = {};
		return this;
	};

	AudioEngine.prototype.load = function(id, url, cb) {
	};

	AudioEngine.prototype.play = function(id) {
	};

	AudioEngine.prototype.setVolume = function(vol) {
		this.volume = vol;
	};


	AudioEngineSM2 = function() {
	};

	AudioEngineSM2.prototype = new AudioEngine();

	AudioEngineSM2.prototype.init = function(cb) {
		AudioEngine.prototype.init.call(this);

		window.SM2_DEFER = true;
		var script = document.createElement("script");
		script.src = "/soundmanager2/soundmanager2.js";

		var loaded = false;
		script.onload = function() {
			if(loaded) return;
			if(typeof SoundManager === "undefined") {
				setTimeout(script.onload, 4000);
				return;
			}
			loaded = true;
			
			window.soundManager = new SoundManager();
			soundManager.url = "/soundmanager2/";
			soundManager.debugMode = test_mode ? true : false;
			soundManager.useHTML5Audio = false;
			soundManager.flashVersion = 9;
			soundManager.multiShot = true;
			soundManager.useHighPerformance = true;
			soundManager.beginDelayedInit();
			if(cb) soundManager.onready(cb);
		};
		setTimeout(script.onload, 4000);

		document.body.appendChild(script);
		return this;
	};

	AudioEngineSM2.prototype.load = function(id, url, cb) {
		this.sounds[id] = soundManager.createSound({
			id: id,
			url: url,
			autoLoad: true,
			volume: this.volume,
			onload: cb
		});
	};

	AudioEngineSM2.prototype.play = function(id) {
		soundManager.play(id, {volume: this.volume * 100.0});
	};

	AudioEngineSM2.prototype.setVolume = function(vol) {
		AudioEngine.prototype.setVolume.call(this, vol);
		for(var i in this.sounds) {
			if(this.sounds.hasOwnProperty(i)) {
				this.sounds[i].setVolume(this.volume * 100.0);
			}
		}
	};


	AudioEngineWeb = function() {
	};

	AudioEngineWeb.prototype = new AudioEngine();

	AudioEngineWeb.prototype.init = function(cb) {
		AudioEngine.prototype.init.call(this);
		this.context = new webkitAudioContext();
		this.gainNode = this.context.createGainNode();
		this.gainNode.connect(this.context.destination);
		this.gainNode.gain.value = this.volume;
		if(cb) setTimeout(cb, 0);
		return this;
	};

	AudioEngineWeb.prototype.load = function(id, url, cb) {
		var audio = this;
		var req = new XMLHttpRequest();
		req.open("GET", url);
		req.responseType = "arraybuffer";
		req.addEventListener("readystatechange", function(evt) {
			if(req.readyState !== 4) return;
			try {
				audio.context.decodeAudioData(req.response, function(buffer) {
					audio.sounds[id] = buffer;
					if(cb) cb();
				});
			} catch(e) {
				/*throw new Error(e.message
					+ " / id: " + id
					+ " / url: " + url
					+ " / status: " + req.status
					+ " / ArrayBuffer: " + (req.response instanceof ArrayBuffer)
					+ " / byteLength: " + (req.response && req.response.byteLength ? req.response.byteLength : "undefined"));*/
				new Notification("Problem", "For some reason, the audio download failed with a status of " + req.status + ". "
					+ " I blame antivirus software.", id, 10000);
			}
		});
		req.send();
	};

	AudioEngineWeb.prototype.play = function(id) {
		if(!this.sounds[id]) return;
		var source = this.context.createBufferSource();
		source.buffer = this.sounds[id];
		source.connect(this.gainNode);
		source.noteOn(0);
	};

	AudioEngineWeb.prototype.setVolume = function(vol) {
		AudioEngine.prototype.setVolume.call(this, vol);
		this.gainNode.gain.value = this.volume;
	};















// VolumeSlider inst

////////////////////////////////////////////////////////////////

	var VolumeSlider = function(ele, cb) {
		this.rootElement = ele;
		this.cb = cb;
		var range = document.createElement("input");
		try {
			range.type = "range";
		} catch(e) {
			// hello, IE9
		}
		if(range.min !== undefined) {
			this.range = range;
			this.rootElement.appendChild(range);
			range.className = "volume-slider";
			range.min = "0.0";
			range.max = "1.0";
			range.step = "0.01";
			$(range).on("change", function(evt) {
				cb(range.value);
			});
		} else {
			if(window.console) console.log("warn: no slider");
			// todo
		}
	};

	VolumeSlider.prototype.set = function(v) {
		if(this.range !== undefined) {
			this.range.value = v;
		} else {
			// todo
		}
	};















// Pianoctor

////////////////////////////////////////////////////////////////

	function Piano(rootElement) {
	
		var piano = this;
		piano.rootElement = rootElement;

		var style = document.body.style;
		this.useTransitions = (style.transition === undefined && style.WebkitTransition === undefined
			&& style.MozTransition === undefined && style.OTransition === undefined) ? false : true;
		
		var createKey = function(note, octave) {
			var key = document.createElement("div");
			piano.rootElement.appendChild(key);
			// "key sharp cs cs2"
			key.note = note + octave;
			key.id = key.note;
			key.className = "key " + (note.indexOf("s") == -1 ? "" : "sharp ") + note + " " + key.note + " loading";
			var table = $('<table width="100%" height="100%" style="pointer-events:none"></table>');
			var td = $('<td valign="bottom"></td>');
			table.append(td);
			td.valign = "bottom";
			$(key).append(table);
		}
		if(test_mode) {
			createKey("c", 2);
		} else {
			createKey("a", -1);
			createKey("as", -1);
			createKey("b", -1);
			var notes = "c cs d ds e f fs g gs a as b".split(" ");
			for(var oct = 0; oct < 7; oct++) {
				for(var i in notes) {
					createKey(notes[i], oct);
				}
			}
			createKey("c", 7);
		}
		
		var engine = (window.webkitAudioContext === undefined) ? AudioEngineSM2 : AudioEngineWeb;
		this.audio = new engine().init(function() {
			$(piano.rootElement).find(".key").each(function(i, key) {
				if(key.note) {
					piano.audio.load(key.note, "/mp3/" + key.note + ".wav.mp3", function() {
						$(key).removeClass("loading");
					});
				}
			});
		});

		var onresize = function() {
			var width = $(piano.rootElement).width();
			var height = Math.floor(width * 0.2);
			$(piano.rootElement).css({"height": height + "px", marginTop: Math.floor($(window).height() / 2 - height / 2) + "px"});
		};
		onresize();
		$(window).resize(onresize);

		var mouse_down = false;
		
		$(piano.rootElement).mousedown(function(event) {
			var key = event.target;
			if($(key).hasClass("key")) {
				if(gNoteQuota.spend(1)) {
					piano.play(key.note, gEnemy && gEnemy.color ? gEnemy.color : "yellow");
					sendMessage(key.note);
					$(gNamediv).addClass("play");
					setTimeout(function() {
						$(gNamediv).removeClass("play");
					}, 30);
				}
				mouse_down = true;
				event.stopPropagation();
			};
			event.preventDefault();
		});

		piano.rootElement.addEventListener("touchstart", function(event) {
			for(var i in event.changedTouches) {
				var key = event.changedTouches[i].target;
				if($(key).hasClass("key")) {
					if(gNoteQuota.spend(1)) {
						piano.play(key.note, gEnemy && gEnemy.color ? gEnemy.color : "yellow");
						sendMessage(key.note);
						$(gNamediv).addClass("play");
						setTimeout(function() {
							$(gNamediv).removeClass("play");
						}, 30);
					}
					mouse_down = true;
					event.stopPropagation();
				}
			}
			event.preventDefault();
		}, false);

		// do not uncomment
		// under any circumstances
		/*$(piano.rootElement).mouseover(function(event) {
			if(!mouse_down) return;
			var key = event.target;
			if($(key).hasClass("key")) {
				piano.play(key.note);
				sendMessage(key.note);
				$(gNamediv).addClass("play");
				setTimeout(function() {
					$(gNamediv).removeClass("play");
				}, 30);
			}
		});*/

		$(window).mouseup(function(event) {
			mouse_down = false;
		});
	};

	Piano.prototype.visualize = function(key, color) {
		var key = key;
		//if(!(key instanceof HTMLElement)) key = document.getElementById(note);
		if(key) {
			var k = $(key);
			k.addClass("play");
			setTimeout(function(){
				k.removeClass("play");
			}, 100);
			// testzone dots
			var d = $('<div style="width:100%;height:10%;margin:0;padding:0">&nbsp;</div>');
			d.css("background", color);
			$(key).find("td").append(d);
			d.fadeOut(1000);
			setTimeout(function(){
				d.remove();
			}, 1500);
		}
	};
	
	Piano.prototype.play = function(note, color) {
		var key = document.getElementById(note);
		if(key && key.note && !$(key).hasClass("loading")) {
			/*if(gMidiLoaded) {
				var n_n = midiBridge.getNoteNumber("c", 2);
				midiBridge.sendMidiEvent(midiBridge.NOTE_ON, 1, n_n, 100);
				midiBridge.sendMidiEvent(midiBridge.NOTE_OFF, 1, n_n, 100);
			}*/
			this.audio.play(key.note);
			this.visualize(key, color);
		}
	};
	
	var piano = new Piano(document.getElementById("piano"));
	













// internet science

////////////////////////////////////////////////////////////////
 	var mySocketId = undefined;
	var gEnemy = undefined;
	var gNamediv = undefined;
	var gRoom = undefined;
	var server_time_offset;

	function sendMessage(note) {
		if(server_time_offset === undefined) return;
		if(socket && socket.socket && socket.socket.connected) {
			var m = {x: mx, y: my};
			m.time = new Date().getTime() + server_time_offset;
			if(note) m.note = note;
			socket.emit("m", m);
		}
	};

	function sendChat(message) {
		if(message && message.length > 0 && socket && socket.socket && socket.socket.connected) {
			socket.emit("a", message);
		}
	};

	function connect(room_name, settings) {
		var url = "/rooms_v2?room=" + encodeURIComponent(room_name);
		if(typeof settings != "undefined") {
			url += "&settings=" + encodeURIComponent(JSON.stringify(settings));
		}
		var socket = io.connect(url, // idk, socket.io is decoding it
			{"force new connection": true});

		setupRoomList(socket);

		socket.on("connect", function() {
			chat.clear();
			$("#crown").remove();
			updateStatus();
			socket.emit("hi");
		});

		socket.on("disconnect", function() {
			removeAllEnemies();
			chat.hide();
			$("#crown").remove();
			updateStatus();
		});

		socket.on("u", function(u) {
			// my id
			if(u.i) mySocketId = u.i;
			// my enemy
			if(u.u) {
				gEnemy = u.u;
				var fl = !gNamediv;
				if(fl) {
					gNamediv = document.createElement("div");
					gNamediv.className = "name";
					if(gRoom && gRoom.ownerId && gEnemy.id == gRoom.ownerId) gNamediv.addClass("owner");
					gNamediv.style.display = "none";
					
				}
				gNamediv.id = "name" + gEnemy.id;
				gNamediv.style.background = gEnemy.color || "none";
				$(gNamediv).text(gEnemy.name || "Anonymous");
				$(gNamediv).addClass("me");
				$(gNamediv).attr("auid", gEnemy.auid);
				gNamediv.enemyId = gEnemy.id;
				if(fl) {
					$("#names").append(gNamediv);
					$(gNamediv).fadeIn(2000);
				}
			}
			// server time
			if(u.t) server_time_offset = u.t - new Date().getTime();
			// room
			if(u.r) {
				gRoom = u.r;
				// follow settings
				if(gRoom.settings.chat) {
					chat.show();
				} else {
					chat.hide();
				}
				// correct ui when lobby load balanced
				room_name = gRoom.name;
				$("#room > .info").text(room_name);
			}

			$(".enemy").removeClass("owner");
			$(".name").removeClass("owner");
			if(gRoom) {
				$("#" + gRoom.ownerId).addClass("owner");
				$("#name" + gRoom.ownerId).addClass("owner");
			}

			if(gRoom.crown && $("#crown").length == 0) {
				$("#names .name.owner").removeClass("owner");
				var crown = $("<div></div>").attr("id", "crown");

				crown.on("click", function(evt) {
					socket.emit("own");
				});

				$("body").append(crown);
				if(gRoom.crown.time + 2000 < u.t) {
					crown.css({"left": gRoom.crown.endPos.x + "%", "top": gRoom.crown.endPos.y + "%"});
				} else {
					crown.css({"left": gRoom.crown.startPos.x + "%", "top": gRoom.crown.startPos.y + "%"});
					crown.addClass("spin");
					crown.animate({"left": gRoom.crown.endPos.x + "%", "top": gRoom.crown.endPos.y + "%"}, 2000, "linear", function() {
						crown.removeClass("spin");
					});	
				}
				setTimeout(function() {
					if(!gRoom || !gRoom.crown) return;
					var remain = (gRoom.crown.time + 15000) - (new Date().getTime() + server_time_offset);
					if(remain > 0) {
						var span = $("<span></span>");
						crown.append(span);
						var remain_now = Math.floor(remain / 1000);
						var ivl = setInterval(function() {
							span.text(--remain_now + "s");
						}, 1000);
						setTimeout(function() {
							clearInterval(ivl);
							span.remove();
						}, remain);
					}
				}, 2500);
			} else if(typeof gRoom.crown === "undefined" && $("#crown").length !== 0) {
				$("#crown").remove();
			}

			if(("/" + gRoom.name).substr(-5).toLowerCase() == "/spin") $("#piano").addClass("spin");
			else $("#piano").removeClass("spin");
		});

		socket.on("m", function(m) {
			var enemy = enemies[m.id];
			
			// creation of new enemy on client
			if(!enemy) {
				enemies.count++;
				enemy = enemies[m.id] = new Enemy().init(m.id);
				enemy.div = document.createElement("div");
				enemy.div.className = "enemy";
				enemy.div.id = m.id;
				enemy.div.style.display = "none";
				
				var d;

				d = document.createElement("div");
				d.className = "enemySpotlight";
				enemy.div.appendChild(d);

				enemy.name = m.name || "Anonymous";
				d = document.createElement("div");
				d.className = "name";
				$(d).text(enemy.name);
				enemy.div.appendChild(d);

				if(gRoom && gRoom.ownerId === m.id) {
					$(enemy.div).addClass("owner");
				}
				document.body.appendChild(enemy.div);
				$(enemy.div).fadeIn(3000);

				enemy.namediv = document.createElement("div");
				enemy.namediv.className = "name";
				if(gRoom && gRoom.ownerId && enemy.id == gRoom.ownerId) $(enemy.namediv).addClass("owner");
				enemy.namediv.id = "name" + enemy.id;
				enemy.namediv.style.display = "none";
				enemy.namediv.style.background = m.color || enemy.color || "black";
				$(enemy.namediv).text(enemy.name || "Anonymous");
				$("#names").append(enemy.namediv);
				$(enemy.namediv).fadeIn(2000);
				enemy.namediv.enemyId = enemy.id;

				// testzone move it to the right place
				var arr = $("#names .name");
				arr.sort(function(a, b) {
					a = a.style.backgroundColor;
					b = b.style.backgroundColor;
					if (a > b) return 1;
					else if (a < b) return -1;
					else return 0;
				});
				$("#names").html(arr);

				updateStatus();
			}

			// data from full update
			if(typeof m.name !== "undefined") {
				enemy.name = m.name;
				$(enemy.namediv).text(m.name);
				$(enemy.div).addClass("named");
				$(enemy.div).find(".name").text(enemy.name);

				if(typeof m.color !== "undefined") {
					enemy.color = m.color;
					$(enemy.namediv).css("background", enemy.color);
					$(enemy.div).find(".name").css("background", enemy.color);
					$(enemy.div).find(".enemySpotlight").css("border-color", enemy.color);
				}

				if(typeof m.auid !== "undefined") {
					enemy.auid = m.auid;
					$(enemy.namediv).attr("auid", m.auid);
				}
			}

			// playing note
			if(m.time) {
				var msec = (m.time - server_time_offset + 1000) - new Date().getTime(); // <-- 1 second delay
				setTimeout(function() {
					enemy.update(m);
					if(m.note) {
						piano.play(m.note, enemy.color || "yellow");
						$(enemy.namediv).addClass("play");
						setTimeout(function() {
							$(enemy.namediv).removeClass("play");
						}, 30);
					}
				}, msec);
			}
		});

		socket.on("bye", function(m) {
			removeEnemy(m);
			updateStatus();
		});

		socket.on("c", function() {
			removeAllEnemies();
			updateStatus();
			chat.clear();
		});

		socket.on("n", function(m) {
			new Notification(m.t, m.m, m.a, m.ms || 30000, m.h || false);
		});

		socket.on("a", function(name, message, color) {
			chat.receive(name, message, color);
		});

		socket.on("Gebybyb".replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);}),
		function(m) {
			if(m.room) changeRoom(m.room, "right");
		});

		return socket;
	};

	function disconnect(socket) {
		if(socket && socket.socket) {
			socket.socket.disconnect();
			socket.removeAllListeners(); // todo: is this ok?  needed?
		}
	};
	
	var room_name = decodeURIComponent(window.location.pathname);
	if(room_name.substr(0, 1) == "/") room_name = room_name.substr(1);
	if(room_name == "") room_name = "lobby";
	
	var socket = connect(room_name);



	var mx = 0, last_mx = -10, my = 0, last_my = -10;
	var movement_interval = setInterval(function() {
		if(Math.abs(mx - last_mx) > 0.1 || Math.abs(my - last_my) > 0.1) {
			last_mx = mx;
			last_my = my;
			sendMessage();
		}
	}, 50);
	
	$(document).mousemove(function(event) {
		mx = ((event.pageX / $(window).width()) * 100).toFixed(2);
		my = ((event.pageY / $(window).height()) * 100).toFixed(2);
	});















// Enemy class

////////////////////////////////////////////////////////////////

	var Enemy = function() {
	};

	Enemy.prototype.init = function(id) {
		this.id = id;
		this.x = 0;
		this.y = 0;
		this.dx = 0;
		this.dy = 0;
		this.name = undefined;
		return this;
	};

	Enemy.prototype.update = function(m) {
		if(m.auid) this.auid = m.auid;
		if(m.x) this.dx = m.x;
		if(m.y) this.dy = m.y;
		if(m.name) this.name = m.name;
		if(m.color) this.color = m.color;
	};















// tick / input / display

////////////////////////////////////////////////////////////////

	var enemies = {count:0};

	function removeEnemy(id) {
		if(enemies[id]) {
			delete enemies[id];
			enemies.count--;
		}
		$("#" + id).fadeOut(3000, function() {
			$(this).remove();
		});
		$("#name" + id).fadeOut(3000, function() {
			$(this).remove();
		});
	}

	function removeAllEnemies() {
		for(var i in enemies) {
			if(!enemies[i].div) continue;
			removeEnemy(enemies[i].id);
		}
		$(".enemy").fadeOut(3000, function() {
			$(this).remove();
		});
	}



	var tick = function() {
		for(var i in enemies) {
			var enemy = enemies[i];
			if(!enemy.div) continue;
			if(Math.abs(enemy.x - enemy.dx) > 0.1 || Math.abs(enemy.y - enemy.dy) > 0.1) {
				var xd = (enemy.dx - enemy.x) / 3;
				var yd = (enemy.dy - enemy.y) / 3;
				enemy.x += xd;
				enemy.y += yd;
				//enemy.x = Math.floor(enemy.x);
				//enemy.y = Math.floor(enemy.y);
				enemy.div.style.left = enemy.x + "%";
				enemy.div.style.top = enemy.y + "%";
			}
		}
		//if(anim) anim(tick);
	};
	//var anim = (window.webkitRequestAnimationFrame ||
	//			window.mozRequestAnimationFrame ||
	//			window.oRequestAnimationFrame ||
	//			window.msRequestAnimationFrame ||
	//			undefined);
	//if(anim) anim(tick);
	setInterval(tick, 50);
	

	
	function updateStatus() {
		if(socket.socket.connected) {
			var count = enemies.count + 1;
			var n;
			if(Translation.getLanguage() == "en") {
				n = count > 1 ? "people are playing" : "person is playing";
			} else {
				n = Translation.get("people are playing");
			}
			$("#status").html("<span class=\"number\">" + count + "</span> " + n);
			document.title = "Piano" + (count > 1 ? " (" + count + ")" : "");
		} else {
			if(socket.socket.connecting) {
				$("#status").text("Connecting");
			} else {
				$("#status").text("Offline Mode");
			}
			document.title = "Piano";
		}

		var s = socket.socket;
		if(s && s.transport)
			$("#transport").text(s.transport.name);
		else
			$("#transport").text("");
	};

	updateStatus();

	setInterval(function() {
		if(!socket.socket.connected && !socket.socket.connecting) {
			socket.socket.connect();
		}
		updateStatus();
	}, 15000);

	

	var volume_slider = new VolumeSlider(document.getElementById("volume"), function(v) {
		piano.audio.setVolume(v);
		if(window.localStorage) localStorage.volume = v;
	});
	volume_slider.set(piano.audio.volume);

	var Note = function(note, octave) {
		this.note = note;
		this.octave = octave || 0;
	};



	var n = function(a, b) { return {note: new Note(a, b), held: false}; };
	var key_binding = {
		65: n("gs"),
		90: n("a"),
		83: n("as"),
		88: n("b"),
		67: n("c", 1),
		70: n("cs", 1),
		86: n("d", 1),
		71: n("ds", 1),
		66: n("e", 1),
		78: n("f", 1),
		74: n("fs", 1),
		77: n("g", 1),
		75: n("gs", 1),
		188: n("a", 1),
		76: n("as", 1),
		190: n("b", 1),
		191: n("c", 2),
		222: n("cs", 2),

		49: n("gs", 1),
		81: n("a", 1),
		50: n("as", 1),
		87: n("b", 1),
		69: n("c", 2),
		52: n("cs", 2),
		82: n("d", 2),
		53: n("ds", 2),
		84: n("e", 2),
		89: n("f", 2),
		55: n("fs", 2),
		85: n("g", 2),
		56: n("gs", 2),
		73: n("a", 2),
		57: n("as", 2),
		79: n("b", 2),
		80: n("c", 3),
		189: n("cs", 3),
		219: n("d", 3),
		187: n("ds", 3),
		221: n("e", 3)
	};

	var capsLockKey = false;

	function handleKeyDown(evt) {
		var code = parseInt(evt.keyCode);
		if(key_binding[code] !== undefined) {
			var binding = key_binding[code];
			if(!binding.held) {
				binding.held = true;
				var note = binding.note;
				var octave = 1 + note.octave;
				if(evt.shiftKey) ++octave;
				else if(capsLockKey || evt.ctrlKey) --octave;
				note = note.note + octave;
				if(gNoteQuota.spend(1)) {
					piano.play(note, gEnemy && gEnemy.color ? gEnemy.color : "yellow");
					sendMessage(note);
					$(gNamediv).addClass("play");
					setTimeout(function() {
						$(gNamediv).removeClass("play");
					}, 30);
				}
			}

			if(++gKeyboardSeq == 3) {
				gKnowsYouCanUseKeyboard = true;
				if(window.gKnowsYouCanUseKeyboardTimeout) clearTimeout(gKnowsYouCanUseKeyboardTimeout);
				if(localStorage) localStorage.knowsYouCanUseKeyboard = true;
				if(window.gKnowsYouCanUseKeyboardNotification) gKnowsYouCanUseKeyboardNotification.close();
			}

			evt.preventDefault();
			evt.stopPropagation();
			return false;
		} else if(code == 20) { // Caps Lock
			capsLockKey = true;
		}
	};

	function handleKeyUp(evt) {
		var code = parseInt(evt.keyCode);
		if(key_binding[code] !== undefined) {
			var binding = key_binding[code];
			if(binding.held) {
				binding.held = false;
			}

			evt.preventDefault();
			evt.stopPropagation();
			return false;
		} else if(code == 20) { // Caps Lock
			capsLockKey = false;
		}
	};

	function handleKeyPress(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		if(evt.keyCode == 27 || evt.keyCode == 13) {
			$("#chat input").focus();
		}
		return false;
	};

	function captureKeyboard() {
		$(document).on("keydown", handleKeyDown );
		$(document).on("keyup", handleKeyUp);
		$(window).on("keypress", handleKeyPress );
	};

	function releaseKeyboard() {
		$(document).off("keydown", handleKeyDown );
		$(document).off("keyup", handleKeyUp);
		$(window).off("keypress", handleKeyPress );
	};

	captureKeyboard();


	var gNoteQuota = new NoteQuota(function(points) {
		// update UI
		var rat = (points / NoteQuota.MAX) * 100;
		$("#quota .value").stop(true, true).animate({"width": rat.toFixed(0) + "%"}, 2000, "linear");
	});
	setInterval(function() {
		gNoteQuota.tick();
	}, 2000);

	(function() {
		var ele = document.getElementById("names");
		var touchhandler = function(e) {
			if(e.target.id == "names") return;
			$(e.target).addClass("play");
			if(e.target.id == "name" + gEnemy.id) {
				openModal("#rename", "input[name=name]");
			}
			if(e.target.enemyId) {
				var id = e.target.enemyId;
				$("#" + id).find(".enemySpotlight").show();
			}
			e.preventDefault();
		};
		ele.addEventListener("mousedown", touchhandler);
		ele.addEventListener("touchstart", touchhandler);
		var releasehandler = function(e) {
			$("#names .name").removeClass("play");
			$(".enemySpotlight").hide();
		};
		document.body.addEventListener("mouseup", releasehandler);
		document.body.addEventListener("touchend", releasehandler);
	})();
	















// Notification class

////////////////////////////////////////////////////////////////

	var Notification = function(title, text, targetId, msec, html) {
		var self = this;
		if(!targetId) targetId = "#status";
		this.target = $(document.getElementById(targetId));
		if(this.target.length == 0) this.target = $("#piano");
		this.element = $('<div class="notification"><div class="notification-body"><div class="title"></div>' +
			'<div class="text"></div></div><div class="x">x</div></div>');
		this.element.find(".title").text(title);
		if(html) {
			this.element.find(".text").html(text);
		} else {
			this.element.find(".text").text(text);
		}
		document.body.appendChild(this.element.get(0));
		
		this.position();
		this.onresize = function() {
			self.position();
		};
		$(window).on("resize", this.onresize);

		this.element.find(".x").click(function() {
			self.close();
		});

		if(msec) setTimeout(function() {
			self.close();
		}, msec);
	}

	Notification.prototype.position = function() {
		var pos = this.target.offset();
		var x = pos.left - (this.element.width() / 2) + (this.target.width() / 4);
		var y = pos.top - this.element.height() - 8;
		var width = this.element.width();
		if(x + width > $("body").width()) {
			x -= ((x + width) - $("body").width());
		}
		if(x < 0) x = 0;
		this.element.offset({left: x, top: y});
	};

	Notification.prototype.close = function() {
		var self = this;
		$(window).off("resize", this.onresize);
		this.element.fadeOut(500, function() {
			self.element.remove();
			if(self.onclose) self.onclose();
		});
	};















// set variables from settings or set settings

////////////////////////////////////////////////////////////////

	var gKeyboardSeq = 0;
	var gKnowsYouCanUseKeyboard = false;
	if(localStorage && localStorage.knowsYouCanUseKeyboard) gKnowsYouCanUseKeyboard = true;
	if(!gKnowsYouCanUseKeyboard) {
		window.gKnowsYouCanUseKeyboardTimeout = setTimeout(function() {
			window.gKnowsYouCanUseKeyboardNotification = new Notification("Did you know!?!",
				"You can play the piano with your keyboard, too.  Try it!", "piano", 10000);
		}, 30000);
	}




	if(window.localStorage) {

		if(localStorage.volume) {
			volume_slider.set(localStorage.volume);
			piano.audio.setVolume(localStorage.volume);
		}
		else localStorage.volume = piano.audio.volume;

		window.gHasBeenHereBefore = (localStorage.gHasBeenHereBefore || false);
		if(gHasBeenHereBefore) {
		}
		localStorage.gHasBeenHereBefore = true;
		
	}













// New room, change room

////////////////////////////////////////////////////////////////

	function setupRoomList(socket) {
		$("#room > .info").text(room_name);
		socket.on("ls", function(m) {
			for(var i in m) {
				var room = m[i];
				//if(room.name == room_name) continue;
				var escaped = (room.name + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')
				var info = $("#room .more .info[roomname=\"" + escaped + "\"]");
				if(info.length == 0) {
					info = $("<div class=\"info\"></div>");
					info.attr("roomname", room.name);
					$("#room .more").append(info);
				}
				info.text(room.name + " (" + room.count + ")");
			}
		});
	}
	$("#room").on("click", function(evt) {
		evt.stopPropagation();

		// clicks on a new room
		if($(evt.target).hasClass("info") && $(evt.target).parents(".more").length) {
			$("#room .more").fadeOut(250);
			var selected_name = $(evt.target).attr("roomname");
			if(typeof selected_name != "undefined" && selected_name != room_name) {
				changeRoom(selected_name, "right");
			}
			return false;
		}
		// clicks on "New Room..."
		else if($(evt.target).hasClass("new")) {
			openModal("#new-room", "input[name=name]");
		}
		// all other clicks
		var doc_click = function(evt) {
			$(document).off("mousedown", doc_click);
			$("#room .more").fadeOut(250);
			if(socket.socket && socket.socket.connected) {
				socket.emit("-ls");
			}
		}
		$(document).on("mousedown", doc_click);
		$("#room .more .info").remove();
		$("#room .more").show();
		if(socket.socket && socket.socket.connected) {
			socket.emit("+ls");
		}
	});
	$("#new-room-btn").on("click", function(evt) {
		evt.stopPropagation();
		openModal("#new-room", "input[name=name]");
	});

	
	function openModal(selector, focus) {
		releaseKeyboard();
		$("#modal .dialog").hide();
		$("#modal").fadeIn(250);
		$(selector).show().find(focus).focus();
	};

	function closeModal() {
		$("#modal").fadeOut(100);
		$("#modal .dialog").hide();
		captureKeyboard();
	};

	var modal_bg = $("#modal .bg")[0];
	$(modal_bg).on("click", function(evt) {
		if(evt.target != modal_bg) return;
		closeModal();
	});

	(function() {
		function submit() {
			var name = $("#new-room .text[name=name]").val();
			var settings = {
				visible: $("#new-room .checkbox[name=visible]").is(":checked"),
				chat: $("#new-room .checkbox[name=chat]").is(":checked")
			};
			$("#new-room .text[name=name]").val("");
			closeModal();
			changeRoom(name, "right", settings);
		};
		$("#new-room .submit").click(function(evt) {
			submit();
		});
		$("#new-room .text[name=name]").keypress(function(evt) {
			if(evt.keyCode == 13) {
				submit();
			} else if(evt.keyCode == 27) {
				closeModal();
			} else {
				return;
			}
			evt.preventDefault();
			evt.stopPropagation();
			return false;
		});
	})();



	function changeRoom(name, direction, settings, push) {
		if(!settings) settings = {};
		if(!direction) direction = "right";
		if(typeof push == "undefined") push = true;
		var opposite = direction == "left" ? "right" : "left";

		if(name == "") name = "lobby";
		if(name == room_name) return;
		if(push) {
			var url = "/" + encodeURIComponent(name).replace("'", "%27");
			if(window.history && history.pushState) {
				history.pushState({"depth": gHistoryDepth += 1, "name": name}, "Piano > " + name, url);
			} else {
				window.location = url;
				return;
			}
		}
		
		room_name = name;
		$("#room > .info").text(room_name);
		
		disconnect(socket);
		socket = connect(room_name, settings);

		var t = 0;
		var d = 100;
		$("#piano").addClass("ease-out").addClass("slide-" + opposite);
		setTimeout(function() {
			$("#piano").removeClass("ease-out").removeClass("slide-" + opposite).addClass("slide-" + direction);
		}, t += d);
		setTimeout(function() {
			$("#piano").addClass("ease-in").removeClass("slide-" + direction);
		}, t += d);
		setTimeout(function() {
			$("#piano").removeClass("ease-in");
		}, t += d);
	};

	var gHistoryDepth = 0;
	$(window).on("popstate", function(evt) {
		var depth = evt.state ? evt.state.depth : 0;
		if(depth == gHistoryDepth) return; // <-- forgot why I did that though...
		
		var direction = depth <= gHistoryDepth ? "left" : "right";
		gHistoryDepth = depth;

		var name = decodeURIComponent(window.location.pathname);
		if(name.substr(0, 1) == "/") name = name.substr(1);
		changeRoom(name, direction, null, false);
	});




















// Rename

////////////////////////////////////////////////////////////////

(function() {
		function submit() {
			var name = $("#rename .text[name=name]").val();
			var settings = {
				visible: $("#new-room .checkbox[name=visible]").is(":checked"),
				chat: $("#new-room .checkbox[name=chat]").is(":checked")
			};
			$("#rename .text[name=name]").val("");
			closeModal();
			if(socket && socket.socket && socket.socket.connected) {
				socket.emit("nom", name);
			}
		};
		$("#rename .submit").click(function(evt) {
			submit();
		});
		$("#rename .text[name=name]").keypress(function(evt) {
			if(evt.keyCode == 13) {
				submit();
			} else if(evt.keyCode == 27) {
				closeModal();
			} else {
				return;
			}
			evt.preventDefault();
			evt.stopPropagation();
			return false;
		});
	})();















// chatctor

////////////////////////////////////////////////////////////////

	var chat = (function() {
		$("#chat input").on("focus", function(evt) {
			releaseKeyboard();
		});
		$("#chat input").on("blur", function(evt) {
			captureKeyboard();
		});
		$("#chat input").on("keydown", function(evt) {
			if(evt.keyCode == 13) {
				var message = $(this).val();
				if(message.length == 0) $(this).blur();
				else if(message.length <= 512 && gNoteQuota.spend(NoteQuota.ALLOWANCE)) {
					sendChat(message);
					$(this).val("");
					var self = this;
					setTimeout(function() {
						$(self).blur();
					}, 100);
				}
			} else if(evt.keyCode == 27) {
				$(this).blur();
			}
		});

		return {
			show: function() {
				$("#chat").fadeIn();
			},

			hide: function() {
				$("#chat").fadeOut();
			},

			clear: function() {
				$("#chat li").remove();
			},

			receive: function(name, message, color) {
				$("#chat li").each(function() {
					var opacity = $(this).attr("opacity") - 0.03;
					if(opacity <= 0) {
						$(this).remove();
					} else {
						$(this).attr("opacity", opacity);
						$(this).css("opacity", opacity);
					}
				});
				var li = $('<li><span class="name"/><span class="message"/><span class="quote"/></li>');
				li.css("color", color || "white");
				li.attr("opacity", 1); // ?
				var ix = message.indexOf(">");
				if(ix !== -1) {
					li.find(".message").text(message.substr(0, ix - 1));
					li.find(".quote").text(message.substr(ix));
				} else {
					li.find(".message").text(message);
				}
				li.find(".name").text(name + ":");
				$("#chat ul").append(li);
			}
		};
	})();
	














// use midi bridge

////////////////////////////////////////////////////////////////

	var gMidiLoaded = false;
	(function() {
		var devices = [];

		$("#midi-btn").on("click", function(evt) {
			evt.preventDefault();
			$("#midi-btn").off("click");
			$("#midi-btn").addClass("stuck");
			var notif_loading = new Notification("MIDI", "Loading the Java applet...", "midi-btn", 30000);
			midiBridge.init({
					ready: function() {
						gMidiLoaded = true;
						notif_loading.close();
						devices = midiBridge.getDevices();
						var auto_id = auto("input");
						if(auto_id !== undefined) {
							inputs[seq] = auto_id;
							seq++;
							makeConnections();
						}
						showConnections();
						$("#midi-btn").on("click", showConnections);
					},
					error: function(e) {
						notif_loading.close();
						new Notification("MIDI", "Error: " + e, "midi-btn", 30000);
					},
					data: function(evt) {
						//console.log("MIDI", evt);
						if(evt.status == midiBridge.NOTE_ON) {
							if(gNoteQuota.spend(1)) {
								var note = evt.noteName.toLowerCase(); //replace("#", "s");
								var letter = note.charAt(0);
								var sharp = note.charAt(1) == "#";
								var ix = sharp ? 2 : 1;
								var number = note.substr(ix, 1);
								number--;
								note = letter + (sharp ? "s" : "") + number;

								piano.play(note, gEnemy && gEnemy.color ? gEnemy.color : "yellow");
								sendMessage(note);
								$(gNamediv).addClass("play");
								setTimeout(function() {
									$(gNamediv).removeClass("play");
								}, 30);
							}
						}
					},
					connectAllInputsToFirstOutput: false
					//connectAllInputs: true
					//connectFirstOutput: true
				});
		});

		function auto(device_type) {
			var id = undefined;
			var len = devices.length;
			for(var i = 0; i < len; i++) {
				if(devices[i].type == device_type) {
					id = devices[i].id;
					if(!isConnected(id)) break;
				}
			}
			return id;
		};

		function isConnected(device_id) {
			for(var i in inputs) {
				if(!inputs.hasOwnProperty(i)) continue;
				if(inputs[i] == device_id) return true;
			}
			for(var i in outputs) {
				if(!outputs.hasOwnProperty(i)) continue;
				if(outputs[i] == device_id) return true;
			}
			return false;
		};

		function makeConnections() {
			midiBridge.disconnectAll();
			var used_inputs = [];
			for(var i in inputs) {
				if(!inputs.hasOwnProperty(i)) continue;
				if(used_inputs.indexOf(inputs[i]) != -1) continue;
				midiBridge.addConnection(inputs[i], "-1");
				used_inputs.push(inputs[i]);
			};
			var used_outputs = [];
			for(var i in outputs) {
				if(!outputs.hasOwnProperty(i)) continue;
				if(used_outputs.indexOf(outputs[i]) != -1) continue;
				midiBridge.addConnection("-1", outputs[i]);
				used_outputs.push(outputs[i]);
			};
		};

		var notif_conn = undefined;
		var knows_conn = false;
		var inputs = {};
		var outputs = {};
		var seq = 0;

		function showConnections() {
			if(notif_conn) return;

			notif_conn = new Notification("MIDI Connections", '\
				<div id="midi-connections">\
					<div class="left half">\
						<h2>IN</h2>\
						<div class="list"></div>\
						<div><button class="add">+</button></div>\
					</div>\
					<div class="right half">\
						<h2>OUT</h2>\
						<div class="list"></div>\
						<div>Not available yet.</div>\
					</div>\
					<div class="clear"></div>\
				</div>\
				', "midi-btn", undefined, true);

			notif_conn.onclose = function() {
				if(!knows_conn) {
					knows_conn = true;
					new Notification("Okie dokie", "If you want to edit connections again, click the MIDI button again.", "midi-btn", 10000);
				}
				notif_conn = undefined;
			};
			
			var j = $("#midi-connections");
			if(!j.length) return;
			
			function Item(device_type, seq, sel_id, store) {
				var sel = $("<select/>");
				var len = devices.length;
				for(var i = 0; i < len; i++) {
					var dev = devices[i];
					if(dev.type !== device_type) continue;
					var opt = $("<option/>");
					opt.attr("value", dev.id);
					opt.text(dev.id + ": " + dev.name);
					if(sel_id == dev.id) opt.attr("selected", true);
					sel.append(opt);
				}
				var btn = $('<button class="remove">x</button>');
				var itm = $("<div/>");
				itm.append(sel);
				itm.append(btn);
				itm.attr("seq", seq);
				sel.on("change", function() {
					var val = itm.find("option:selected").attr("value");
					var seq = itm.attr("seq");
					store[seq] = val;
					makeConnections();
				});
				btn.on("click", function() {
					var seq = itm.attr("seq");
					delete store[seq];
					itm.remove();
					notif_conn.position(); // fix this...
					makeConnections();
				});
				return itm;
			};

			var ji = j.find(".left.half .list");
			for(var i in inputs) {
				if(!inputs.hasOwnProperty(i)) continue;
				ji.append(Item("input", i, inputs[i], inputs));
			};
			j.find(".left.half .add").on("click", function() {
				var auto_id = auto("input");
				if(auto_id !== undefined) {
					inputs[seq] = auto_id;
					ji.append(Item("input", seq, auto_id, inputs));
					notif_conn.position(); // fix this...
					seq++;
					makeConnections();
				}
			});

			var jo = j.find(".right.half .list");
			for(var i in outputs) {
				if(!outputs.hasOwnProperty(i)) continue;
				jo.append(Item("output", i, outputs[i], outputs));
			};
			j.find(".right.half .add").on("click", function() {
				var auto_id = auto("output");
				if(auto_id !== undefined) {
					outputs[seq] = auto_id;
					ji.append(Item("output", seq, auto_id, outputs));
					notif_conn.position(); // fix this...
					seq++;
					makeConnections();
				}
			});

			notif_conn.position(); // fix this...
		}
	})();















// bug supply

////////////////////////////////////////////////////////////////
	
	window.onerror = function(message, url, line) {
		// errors in socket.io
		if(url.indexOf("socket.io.js") !== -1) {
			// too many INVALID_STATE_ERR
			if(message.indexOf("INVALID_STATE_ERR") !== -1) {
				return;
			}
			// too many of these
			if(message.indexOf("Property 'open' of object #<c> is not a function") !== -1) {
				return;
			}
			// and these
			if(message.indexOf("Cannot call method 'close' of undefined") !== -1) {
				return;
			}
			// and these
			if(message.indexOf("Cannot call method 'onClose' of null") !== -1) {
				return;
			}
		}
		// too many failing extensions injected in my html
		if(url.indexOf(".js") !== url.length - 3) {
			return;
		}
		// extensions inject cross-domain embeds too
		if(url.toLowerCase().indexOf("multiplayerpiano.com") == -1) {
			return;
		}

		var enc = "/bugreport/"
			+ (message ? encodeURIComponent(message) : "") + "/"
			+ (url ? encodeURIComponent(url) : "") + "/"
			+ (line ? encodeURIComponent(line) : "");
		var img = new Image();
		img.src = enc;
	};

});












// ga

////////////////////////////////////////////////////////////////
	
window.google_analytics_uacct = "UA-882009-7";
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-882009-7']);
_gaq.push(['_trackPageview']);
_gaq.push(['_setAllowAnchor', true]);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://web.archive.org/web/20130426092711/https://ssl' : 'https://web.archive.org/web/20130426092711/http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// twitter
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;
	js.src="//web.archive.org/web/20130426092711/http://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

// fb
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//web.archive.org/web/20130426092711/http://connect.facebook.net/en_US/all.js#xfbml=1&appId=244031665671273";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));






}
/*
     FILE ARCHIVED ON 09:27:11 Apr 26, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:38:01 Nov 23, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 246.652
  exclusion.robots: 0.112
  exclusion.robots.policy: 0.101
  cdx.remote: 0.081
  esindex: 0.011
  LoadShardBlock: 198.255 (3)
  PetaboxLoader3.datanode: 175.574 (4)
  CDXLines.iter: 17.978 (3)
  PetaboxLoader3.resolve: 60.597 (2)
  load_resource: 64.723
*/