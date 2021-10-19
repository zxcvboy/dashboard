var arrMotionSVG = [
	{
		id: 'Group-25',
		initialX: 800,
		initialY: 100
	}
];

arrMotionSVG.forEach(function(svgConf) {
	document.querySelector('[id$="' + svgConf.id + '"]')
});