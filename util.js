var util = {
	urlParser: function(url) {
		var parser = document.createElement('a');
		parser.href = url;
		return parser;
	}
};