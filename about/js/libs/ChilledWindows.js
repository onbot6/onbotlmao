(() => {
	var ex = !1;
	var d = document;
	var id = 'getElementById';
	var iH = 'innerHTML';
	var qs = 'querySelector';
	var aE = 'addEventListener';
	var rE = 'removeEventListener';

	ChilledWindows = (cb) => {
		if (!ex) {
			ex = !0;

			html2canvas(document.body, {
				scrollX: -window.scrollX,
				scrollY: -window.scrollY,
				width: document.body.offsetWidth,
				height: document.body.offsetHeight,
			})
				.then((cvs) => {
					d['body'].insertAdjacentHTML(
						'beforeend',
						`
						<div id="chilledWindows">
						<style>
						
							#chilledWindows {
								width: 100vw;
								height: 100vh;
								position: fixed;
								top: 0;
								left: 0;
								background-color: black;
								z-index: 69696969;
								opacity: 1;
								transition: opacity .6s ease;
							}
							#chilledWindows #big.chilledImage {
								position: fixed;
								width: 100vw;
								height: 100vh;
								z-index: 10;
							}
							#chilledWindows #split1.chilledImage,
							#chilledWindows #split2.chilledImage {
								width: 50vw;
								height: 100vh;
								position: absolute;
							}
							#chilledWindows #split {
								width: 100vw;
								height: 100vh;
								position: fixed;
								z-index: 5;
								top: 0;
								left: 0;
							}
							#chilledWindows #split * {
								top: 0;
								background-size: 50vw 100vh;
								background-repeat: no-repeat;
							}
							#chilledWindows #split1 {
								left: 0;
							}
							#chilledWindows #split2 {
								right: 0;
							}
							
							.chilledImage{background-image:url('${cvs.toDataURL()}')}
							</style>

						<audio id="muziku" src="${chilledMusic
							.split('')
							.map((c, i, a) => (i % 2 ? undefined : new Array(2 + parseInt(a[i + 1], 36)).join(c)))
							.join('')}" ></audio>
						<div id="big" class="chilledImage"></div>
						<div id="split">
							<div id="split1" class="chilledImage"></div>
							<div id="split2" class="chilledImage"></div>
						</div>
					</div>
						`
					);

					var cW = d[id]('chilledWindows');
					var m = d[qs]('#chilledWindows #muziku');

					m.play();

					if (m.paused) {
						let foo = () => {
							m.play();
							cW[rE]('click', foo);
						};
						cW[aE]('click', foo);
					}

					function timeUpdate(e) {
						console.log(e.target.currentTime);
					}

					function theEnd() {
						m[rE]('ended', theEnd);
						m[rE]('timeupdate', timeUpdate);
						setTimeout(() => {
							cW.style.opacity = '0';
							setTimeout(() => {
								cW.outerHTML = '';
								ex = !1;
								console.log('ChilledWindows is done sar');
							}, 600);
						}, 800);
					}

					m[aE]('ended', theEnd);
					m[aE]('timeupdate', timeUpdate);
				})
				.catch((err) => {
					console.error(err);
					alert('html2canvas failed, please check console and make changes to your website');
					ex = !1;
				});

			return 'loading...';
		} else {
			return 'already executed';
		}
	};
})();