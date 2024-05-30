local utils = require("kong.plugins.oauth-liferay-introspect.utils")
local http = require "resty.http"
local cjson = require "cjson.safe"
local kong_meta = require "kong.meta"

-- TODO: find why Response = nil

-- issue token introspection request
local function do_introspect_access_token(access_token, config)
  kong.log("function ", "do_introspect_access_token")
  kong.log("access_token ", access_token)
  local res, err = http:new():request_uri(config.introspection_endpoint, {
    method = "POST",
    body = "token_type_hint=access_token&token=" .. access_token
        .. "&client_id=" .. config.client_id,
    headers = {
      ["Content-Type"] = "application/x-www-form-urlencoded",
    }
  })
  kong.log("RESPONSE ", res)
  kong.log("ERR ", err)
  if not res then
    return nil, err
  end
  if res.status ~= 200 then
    return { status = res.status }
  end
  return { status = res.status, body = res.body }
end

-- get cached token introspection result if available, or retrieve new token introspection result
local function introspect_access_token(access_token, config)
  -- if config.ttl > 0 then
  --   kong.log("function ", "introspect_access_token", "ttl+0")
  --   local res, err = kong.cache:get(access_token, { ttl = config.ttl },
  --       do_introspect_access_token, access_token, config)
  --   if err then
  --     kong.log("invalidate ", "token")
  --     kong.cache:invalidate(access_token)
  --     utils.exit(ngx.HTTP_INTERNAL_SERVER_ERROR, "Unexpected error: " .. err)
  --   end
  --   if res.status ~= 200 then
  --     kong.cache:invalidate(access_token)
  --   end
  --   return res
  -- else
    return do_introspect_access_token(access_token, config)
  -- end
end

local TokenIntrospectionHandler = {
 VERSION = kong_meta.version:sub(1, -2),
 PRIORITY = 1100,
}

function TokenIntrospectionHandler:access(config)
  kong.log("function ", "TokenIntrospectionHandler")
  local bearer_token = utils.get_header(config.token_header)
  kong.log("bearer_token ", bearer_token)
  if not bearer_token then
    utils.exit(ngx.HTTP_UNAUTHORIZED, "Unauthenticated.")
  end
  -- remove Bearer prefix
  local access_token, removed = string.gsub(bearer_token, "Bearer ", "", 1)
  if removed == 0 then
    utils.exit(ngx.HTTP_UNAUTHORIZED, "Unauthenticated.")
  end
  -- introspect and validate token
  local introspection_response, err = introspect_access_token(access_token, config)
  if not introspection_response then
    utils.exit(ngx.HTTP_INTERNAL_SERVER_ERROR, "Authorization server error: " .. err)
  end
  if introspection_response.status ~= 200 then
    utils.exit(ngx.HTTP_UNAUTHORIZED, "The resource owner or authorization server denied the request.")
  end

  -- Authorization successful, set headers based on information from access token
  utils.set_header("X-Credential-Scope", jwt.scope)
  utils.set_header("X-Credential-Client-ID", jwt.clientId)
  utils.set_header("X-Credential-Token-Type", jwt.typ)
  utils.set_header("X-Credential-Exp", jwt.exp)
  utils.set_header("X-Credential-Iat", jwt.iat)
  utils.set_header("X-Credential-Nbf", jwt.nbf)
  utils.set_header("X-Credential-Sub", jwt.sub)
  utils.set_header("X-Credential-Aud", jwt.aud)
  utils.set_header("X-Credential-Iss", jwt.iss)
  utils.set_header("X-Credential-Jti", jwt.jti)
  
  -- Optionally remove token and certificate headers
  if config.hide_credentials then
    utils.clear_header(config.token_header)
    utils.clear_header(config.certificate_header)
  end
end

kong.log("hello ", "world")

return TokenIntrospectionHandler