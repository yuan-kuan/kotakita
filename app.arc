@app
svelte-app

@http
get /place/:id
put /place/:id
delete /place/:id
get /all-places
post /place
post /prefill

@tables
data
  scopeID *String
  dataID **String
  ttl TTL