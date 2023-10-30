module.exports = function gourd(mod) {
	let enabled = true,
		userName = "";

	mod.command.add(['teralogs', 'tl'], () => {
		enabled = !enabled;
		mod.command.message(`teralogs check enabled: ${enabled}`);
	});

	mod.game.on('enter_game', () => {
		userName = mod.game.me.name;
	});

	mod.hook('S_USER_PAPERDOLL_INFO', "*", async event => {
		if (enabled && event.name != userName) await Open(event.name);
	});

	function Open(name) {
		const uri = `https://teralogs.com/search/${name}`;

		try {
			const encoded_uri = encodeURI(uri);
			mod.toClient('S_SHOW_AWESOMIUMWEB_SHOP', 1, {
				link: encoded_uri
			});
		} catch (e) {
			console.log(e);
		}
	};
}