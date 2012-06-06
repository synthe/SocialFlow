




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
	console.log results.length + ' twitterers located'

	peeps = []

	for x in json.results
		# first = x.source.indexOf 'http'
		# last = x.source.indexOf '&quot', first 
		# source = x.source[first..last]
		z = 
			name: x.form_user_name
			icon: x.profile_image_url
			message: x.text
			link: null 
		peeps.push z

	#peeps = p for p in peeps if p isnt undefined

	# console.log "Twitter peeps"
	# console.log p for p in peeps 
	console.log peeps

	for p in peeps
		# k = addToQueue p[2]

		k = sf.filter p.message

		if k and p isnt undefined and p.message isnt undefined
			p.filter = k
			console.log "Pushing to socialQueue"
			window.statusQueue.push p 
			#sf.queues.social.push p


getFacebook = (params) ->
	query = 'https://graph.facebook.com/search/?callback=&limit=50&q=Nordstrom&fields=message,from'
	$.ajax
		url: query
		type: 'GET'
		success: parseFacebook
		complete: console.log 'getFacebook complete'
		dataType: 'jsonp'
		#error: (a,b,c) -> console.warn a,b,c
		
parseFacebook = (json) ->
	console.log 'ANALYZING FACEBOOKS'

	console.log json.data.length + ' facebooks located'

	peeps = []

	for x in json.data
		x = 
			name: x.from.name
			icon: null
			message : x.message
			link: null
		peeps.push x

	#peeps = p for p in peeps if p isnt undefined

	# console.log "Facebook peeps"
	# console.log p for p in peeps 

	console.log peeps

	for p in peeps

		k = sf.filter p.message

		if k isnt {} and p isnt undefined and p.message isnt undefined
			p.filter = k
			console.log "Pushing to socialQueue"
			window.statusQueue.push p 
			#sf.queues.social.push p

# addToQueue = (message) ->
# 	keywords = sf.filter(message)
# 	if keywords == {}
# 		return false
# 	else
# 		return keywords
	#var keywords = sf.filter(message)
	#if keywords == {} it sucks and don't add it




$(document).ready ->
	window.statusQueue = []
	getTwitter()
	getFacebook()