




getTwitter = (params) -> 
	query = "http://search.twitter.com/search.json?q=%40Nordstrom&callback=?"
	$.ajax 
		url: query
		type: 'GET'
		success: parseTwitter
		#failure: console.log 'getTwitter failed on query'
		complete: console.log 'getTwitter complete'
		dataType: 'jsonp'
		error: (a,b,c) -> console.warn a,b,c

parseTwitter = (json) -> 
	results = json.results
	console.log 'ANALYZING TWITTERS'
	console.log results

	peeps = []

	for x in json.results
		x = 
			name: x.form_user_name
			image: x.profile_image_url
			message: x.text
		peeps.push x

	#peeps = p for p in peeps if p isnt undefined

	# console.log "Twitter peeps"
	# console.log p for p in peeps 

	for p in peeps
		k = addToQueue p[2]
		if k
			p.filter = k
			console.log "Pushing to socialQueue"
			window.statusQueue.push p 
			sf.socialQueue.push p


getFacebook = (params) ->
	query = 'https://graph.facebook.com/search/?callback=&limit=25&q=Nordstrom'
	$.ajax
		url: query
		type: 'GET'
		success: parseFacebook
		complete: console.log 'getFacebook complete'
		dataType: 'jsonp'
		#error: (a,b,c) -> console.warn a,b,c
		
parseFacebook = (json) ->
	console.log 'ANALYZING FACEBOOKS'

	console.log json.data.length

	peeps = []

	for x in json.data
		x = 
			name : x.from.name
			image : null
			message : x.message
		peeps.push x

	#peeps = p for p in peeps if p isnt undefined

	# console.log "Facebook peeps"
	# console.log p for p in peeps 

	for p in peeps
		k = addToQueue p[2]
		if k
			p.filter = k
			console.log "Pushing to socialQueue"
			window.statusQueue.push p 
			sf.socialQueue.push p

addToQueue = (message) ->
	keywords = sf.filter(message)
	if keywords == {}
		return false
	else
		return keywords
	#var keywords = sf.filter(message)
	#if keywords == {} it sucks and don't add it




$(document).ready ->
	window.statusQueue = []
	getTwitter()
	getFacebook()