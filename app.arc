@app
svelte-app

@http
get /place/:id
get /all-places
post /place

@tables
data
  scopeID *String
  dataID **String
  ttl TTL