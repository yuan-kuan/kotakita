@app
svelte-app

@http
get /admin-access
get /place/:id
put /place/:id
put /order/:id
delete /place/:id
get /all-places
post /place
post /prefill

@shared
src src/shared # this is the default

@tables
data
  scopeID *String
  dataID **String
  ttl TTL