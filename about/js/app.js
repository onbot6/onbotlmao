var window_styles = new Object();
var start_open = false;

var tabs = [];

function updateTabs() {
	tabs = [];
	for (let g of $('.window')) {
		tabs.push(g);
	}
}

setTimeout(updateTabs, 500);

function runApp(g) {
	switch (g) {
		case 'minecraft':
			$('body').append(`<div class="window glass" id="minecraft" style="left:346px;width:674px;top:61px;height:474px;z-index:${highestZ() + 1}"><div class="title-bar"><img src="css/vscode_iframe/crafting.png" style="width:18px;height:18px;position:absolute;left:6px"><div class="title-bar-text">Minecraft</div><div class="title-bar-controls"><button aria-label="Minimize"></button> <button onclick="maxsBtn(this)" aria-label="Maximize"></button> <button aria-label="Close" onclick="closBtn(this)"></button></div></div><div class="window-body"><iframe src="https://classic.minecraft.net"></iframe></div></div>`);
			break;
		case 'vscode':
			$('body').append(`<div class="window" id="vscode" style="left:346px;width:674px;top:61px;height:474px;z-index:${highestZ() + 1}"><div class="title-bar"><div class="vscode_icon"></div><div class="title-bar-text">Visual Studio Code</div><div class="title-bar-controls"><button aria-label="Minimize"></button> <button onclick="maxsBtn(this)" aria-label="Maximize"></button> <button aria-label="Close" onclick="closBtn(this)"></button></div></div><iframe src="https://vscode.dev/"></iframe></div>`);
			break;
		case 'traits':
			$('body').append(`<div class="window glass" id=traits style=left:723px;width:400px;top:87px;height:317px;z-index:${highestZ() + 1}><div class=title-bar><div class=title-bar-text>Another window with contents</div><div class=title-bar-controls><button aria-label=Minimize></button> <button onclick=maxsBtn(this) aria-label=Maximize></button> <button aria-label=Close onclick=closBtn(this)></button></div></div><div class=window-body><menu role=tablist><button role=tab aria-controls=music aria-selected=true>Music</button> <button role=tab aria-controls=dogs>Dogs</button> <button role=tab aria-controls=food>Food</button></menu><article role=tabpanel id=music><p>Set your listening preferences</p><fieldset><legend>Today's mood</legend><div class=field-row><input id=radio25 type=radio name=fieldset-example2> <label for=radio25>Nicki Minaj</label></div><div class=field-row><input id=radio26 type=radio name=fieldset-example2> <label for=radio26>Bell Towers</label></div><div class=field-row><input id=radio27 type=radio name=fieldset-example2> <label for=radio27>The Glamorous Monique</label></div><div class=field-row><input id=radio28 type=radio name=fieldset-example2> <label for=radio28>EN. V</label></div></fieldset><section class=field-row><button>Reset Alarm...</button> <label>Try this to get some attention</label></section></article><article role=tabpanel hidden id=dogs><img style=width:100% src=css/dog.jpg></article><article role=tabpanel hidden id=food><p>You create the content for each tab by using an <code>article</code> tag.</p></article><section class=field-row style=justify-content:flex-end><button>OK</button> <button>Cancel</button></section></div></div>`);
			makeTabsWorkAgain();
			break;
	}

	makeWindowsDrag();

	updateTabs();
}

var aeroSnap = null;

function makeWindowsDrag() {
	$('.window').draggable({
		handle: '.title-bar',
		stack: '.window',
		start: (e) => {
			if (e.target.classList.contains('maximu')) {
				resBtn(e.target.querySelector('[aria-label="Restore"]'));
				$(e.target.querySelector('.title-bar')).trigger('mouseup');
				setTimeout(() => {
					$(e.target.querySelector('.title-bar')).trigger('mousedown');
				}, 5);
				return false;
			}

			startLostFocus();

			for (let a of document.querySelectorAll('.title-bar-controls')) {
				a.classList.add('notfocused');
			}

			e.target.querySelector('.title-bar-controls').classList.remove('notfocused');
		},
		drag: (e) => {
			faildow = e.target;
			var aero = document.getElementById('aero_snap');
			var iffunc = () => {
				clearTimeout(aeroSnap);
				aero.style.opacity = 1;
				aero.style.visibility = 'visible';
			};
			var elsefunc = () => {
				aero.style.opacity = 0;
				aero.style.visibility = 'hidden';
				aero.className = '';
			};
			testing = e;
			if (window.innerWidth < Number(faildow.style.left.split('px')[0]) + faildow.offsetWidth && e.clientX < window.innerWidth && faildow.classList.contains('ui-resizable')) {
				iffunc();
				aero.className = 'snap_right';
			} else if (Number(faildow.style.left.split('px')[0]) < 0 && e.clientX < 1 && faildow.classList.contains('ui-resizable')) {
				iffunc();
				aero.className = 'snap_left';
			} else if (Number(faildow.style.top.split('px')[0]) < 0 && e.clientY < 1 && faildow.classList.contains('ui-resizable')) {
				iffunc();
				aero.className = 'snap';
			} else {
				elsefunc();
			}
		},
		stop: (e) => {
			for (let fail of $('.window')) {
				var top = Number(fail.style.top.split('px')[0]);
				if (top < 0) {
					fail.style.top = '0px';
				} else if (top > window.innerHeight - 67) {
					fail.style.top = window.innerHeight - 67 + 'px';
				}
			}
			var aero = document.getElementById('aero_snap');
			if (aero.style.opacity == 1) {
				switch (aero.className) {
					case 'snap':
						e.delegateTarget.querySelector("[aria-label='Maximize'],[aria-label='Restore']").click();
						break;
					case 'snap_left':
						e.target.style.left = '0px';
						e.target.style.right = 'auto';
						e.target.style.top = '0px';
						e.target.style.width = '50vw';
						e.target.style.height = 'calc(100vh - 40px)';
						break;
					case 'snap_right':
						e.target.style.left = 'auto';
						e.target.style.right = '0px';
						e.target.style.top = '0px';
						e.target.style.width = '50vw';
						e.target.style.height = 'calc(100vh - 40px)';
						break;
				}
				aero.style.opacity = 0;
				aero.style.visibility = 'hidden';
				aero.className = '';
			}
		},
	});

	for (let object of document.querySelectorAll('.window')) {
		var initX, initY, firstX, firstY;

		object.addEventListener(
			'touchstart',
			function (e) {
				e.preventDefault();
				initX = this.offsetLeft;
				initY = this.offsetTop;
				var touch = e.touches;
				firstX = touch[0].pageX;
				firstY = touch[0].pageY;

				this.addEventListener('touchmove', swipeIt, false);

				window.addEventListener(
					'touchend',
					function (e) {
						e.preventDefault();
						object.removeEventListener('touchmove', swipeIt, false);
					},
					false
				);
			},
			false
		);

		function swipeIt(e) {
			var contact = e.touches;
			this.style.left = initX + contact[0].pageX - firstX + 'px';
			this.style.top = initY + contact[0].pageY - firstY + 'px';
		}
	}

	$('.window').on('click', (e) => {
		console.log(e);
		startLostFocus();
		e.delegateTarget.style['z-index'] = highestZ() + 1;
		for (let a of document.querySelectorAll('.title-bar-controls')) {
			a.classList.add('notfocused');
		}
		e.delegateTarget.querySelector('.title-bar-controls').classList.remove('notfocused');
	});

	$('.window#vscode, .window#minecraft').resizable({
		handles: 'all',
		containment: 'body',
		minWidth: 576,
		minHeight: 380,
	});

	$('.window#traits').resizable({
		handles: 'all',
		containment: 'body',
		minWidth: 400,
		minHeight: 317,
		start: (e) => {
			if (e.target.classList.contains('maximu')) {
				e.target.classList.remove('maximu');
				e.target.querySelector('[aria-label="Restore"]').outerHTML = '<button onclick="maxsBtn(this)" aria-label="Maximize"></button>';
			}
		},
	});
}

makeWindowsDrag();

function startLostFocus() {
	start_open = false;
	toggleStart();
}

function maxsBtn(e) {
	console.log(e);
	var a = e.parentElement.parentElement.parentElement;
	console.log('hmmm');
	a.classList.add('maximu');
	window_styles[a.id] = a.getAttribute('style');
	if (a.id == 'vscode') {
		a.style = `top: 0px; left: -1px; width: 100vw; height: calc(-40px + 100vh); z-index: ${a.style.zIndex};`;
	} else {
		a.style = `top: -2px; left: -1px; width: 100.4vw; height: calc(100vh - 42px); z-index: ${a.style.zIndex};`;
	}
	setTimeout(() => {
		e.outerHTML = '<button onclick="resBtn(this)" aria-label="Restore"></button>';
	}, 100);
}
function closBtn(e) {
	var a = e.parentElement.parentElement.parentElement;
	console.log(`closing: ${a.id}`);
	$(a).addClass('closing');
	setTimeout(() => {
		$(a).remove();
		updateTabs();
	}, 400);
}
$(document).on('focusout', function () {
	setTimeout(function () {
		// using the 'setTimout' to let the event pass the run loop
		if (document.activeElement instanceof HTMLIFrameElement) {
			// Do your logic here..
			$(document.activeElement).closest('.window')[0].style['z-index'] = highestZ() + 1;
			for (let a of document.querySelectorAll('.title-bar-controls')) {
				a.classList.add('notfocused');
			}
		}
	}, 0);
});
function resBtn(e) {
	console.log(e);
	var a = e.parentElement.parentElement.parentElement;
	var b = a.id;
	a.classList.remove('maximu');
	if (window_styles[b]) {
		console.log(window_styles[b]);
		a.setAttribute('style', window_styles[b]);
		setTimeout(() => {
			e.outerHTML = '<button onclick="maxsBtn(this)" aria-label="Maximize"></button>';
		}, 100);
	}
}
// Tabs

function makeTabsWorkAgain() {
	var tabButtons = document.querySelectorAll('[role=tab]');
	tabButtons.forEach((tabButton) => {
		tabButton.addEventListener('click', (e) => {
			e.preventDefault();
			const tabContainer = e.target.parentElement.parentElement.parentElement;
			const targetId = e.target.getAttribute('aria-controls');
			tabContainer.querySelectorAll("button[role='tab']").forEach((_tabButton) => _tabButton.setAttribute('aria-selected', false));
			tabButton.setAttribute('aria-selected', true);
			tabContainer.querySelectorAll('[role=tabpanel]').forEach((tabPanel) => tabPanel.setAttribute('hidden', true));
			tabContainer.querySelector(`[role=tabpanel]#${targetId}`).removeAttribute('hidden');
		});
	});
}

updateTime = () => {
	var datetime = new Date();
	if (datetime.getMinutes() < 10) {
		minutes = '0' + datetime.getMinutes();
	} else {
		minutes = datetime.getMinutes();
	}
	var pam = 'AM';
	var hour = datetime.getHours();
	if (hour > 12) {
		hour = hour - 12;
		pam = 'PM';
	}
	if (hour == 0) {
		hour = 12;
	}
	var time = hour + ':' + minutes + ' ' + pam;
	var date = datetime.getMonth() + 1 + '/' + datetime.getDate() + '/' + datetime.getFullYear();
	$('#datetime > .time').text(time);
	$('#datetime > .date').text(date);
};

updateTime();

function repeatEvery(func, interval) {
	var now = new Date(),
		delay = interval - (now % interval);

	function start() {
		func();
		setInterval(func, interval);
	}

	setTimeout(start, delay);
}

repeatEvery(updateTime, 60000);

for (let a of document.querySelectorAll('.title-bar-controls')) {
	a.classList.add('notfocused');
}

if (!CSS.supports('backdrop-filter', 'blur(15px)')) {
	document.body.style.setProperty('--backdrop', 'url("marble_blur.jpeg") 0 / cover fixed');
	document.querySelector('#backdrop-not').style.opacity = '1';
} else {
	$('#backdrop-not').remove();
}

var toggler = 0;
function toggleFullscreen() {
	if (toggler == 0) {
		toggler = 1;
		document.documentElement.requestFullscreen();
	} else {
		toggler = 0;
		document.exitFullscreen();
	}
}

$('body').on('dblclick', function (e) {
	if (e.target !== this) return;
	toggleFullscreen();
});

$('.window.ui-resizable .title-bar').on('dblclick', function (e) {
	e.delegateTarget.querySelector("[aria-label='Maximize'],[aria-label='Restore']").click();
});

document.querySelector('#start_input').addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		window.open(`http://www.google.com/search?q=${encodeURIComponent(e.target.value)}`, '_blank');
	}
});

function highestZ() {
	var array = [];
	$('.window').each(function () {
		if (Number.isInteger(Number($(this).css('z-index')))) {
			array.push($(this).css('z-index'));
		}
	});
	var index_highest = Math.max.apply(Math, array);
	return index_highest;
}

makeTabsWorkAgain();

document.getElementById('menu-button').onclick = () => {
	if (start_open) {
		start_open = false;
	} else {
		start_open = true;
	}
	toggleStart();
};

toggleStart();

function toggleStart() {
	function whenBlur(e) {
		console.log(e);
		e.preventDefault();
		setTimeout(() => {
			document.getElementById('start_input').focus();
		}, 5);
	}
	if (start_open) {
		document.getElementById('start_menu').setAttribute('style', '');
		setTimeout(() => {
			document.getElementById('start_menu').style.opacity = '1';
		}, 10);
		document.getElementById('menu-button').style.backgroundImage = 'url(css/start-selected.png)';
		document.getElementById('start_input').focus();
		document.getElementById('start_input').addEventListener('blur', whenBlur);
	} else {
		document.getElementById('start_input').removeEventListener('blur', whenBlur);
		document.getElementById('menu-button').setAttribute('style', '');
		document.getElementById('start_menu').setAttribute('style', 'display: none;');
	}
}
