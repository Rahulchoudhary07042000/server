const express =require("express");
const app=express();
const https = require('https');
const fs = require('fs');
const options = {
  key:`-----BEGIN RSA PRIVATE KEY-----
  MIIEogIBAAKCAQEAzC52CInpFNememM6yKGUXb5DetiO8M6qMgDF71DYaSDm3KHV
  7o9TYhHojX/4Huic2BXoHDr8sIiqh/P9sSfUioSu0FzA1+TiqMKLqKBXjqEUf0h2
  dayU2R4T+epvnQOYvJbMPVn9F/rWy/z7fevb36OfnrqXD9Q51w7jJ0kNYIkvvFYb
  gE5FdemtLWM7mg+fjhy8huxjxwR0id7Ifl2X5r9L/DcHgh4eL9Iy1ilupuf0KZDA
  THyT2UWEbGgeSjJDW+W1nFTIlSk4GSXj/dZx/23PH/ricpZcWBHy2A9FTE/4RQon
  UcsHyLMH4IhdjIvMB0xh1N6NQIIOIgEdWbYuUQIDAQABAoIBADBwckyeySbKbWKa
  IXNBEAV4UqJ1d13OLabcs5iNnbW9Gj/r/eiRZJb+yCSvoBHXHgSOl+kAnnuUBJ7p
  xb0ORbhR93YTlyVw1cvzEXZhCbya3tW+f2n11j83CUawNSfzFzxgaxY//9D9T5GH
  1DMgriI9e2wI+LcG4mzwiXfDtzJ4FNK8OOhP1YHAit25qyko66nvmjRmYiVocAqh
  zDZLy5w8b1H77hEL6iga1+a8/nIuaxoubG7z3Rs/3yoxDVkv6t3Lio7/EcmWa5Ot
  KxFUGf7s+Jc+fwsCrK9nPo7aof9DwBlIoczpZ8eMxmpHDCQF87l2kpLAB4Me0GjQ
  J/U0WaUCgYEA32Q1CNBLDt2oKvUNDSYtyU/0e2uiEIR8nOgkebqn4sjXCKNEX/UP
  mvXpADzGEm0CB8u6rZ7ei0dLl+QDSeA1ri90BkD7Ife6L/Ubz0SpZ9aX7RJLCe7w
  +6Yd6VjTRrUDFbwRk2CXxPaAcrUsIiC58uHJQIjtWPjlrbZ+XWC29T0CgYEA6fxo
  bGk9ggV3S4rS2eSuY7dGyHGnb7QEXewlU79zAfbnc4Ojd6hbTL7408xauakLxLuQ
  q10qpJgzVxmXKOLFwZK8p4XWSg5lNA+HFh5sTG2eyQ8+3Rh7QHqyT9w8bd2sa1/V
  H1RQgSn5SJ3hxJS47YlFbv/z4j4UimmyztXAdqUCgYACTeJOKPfdO2QUrVppHE+0
  l+KJs16ElRlD9RELQGWi7Tdqm2SFKN30Vz0EB5xzbDRtKCjQyaa6AQ5CjtOJ24oy
  NcMYnWr5urhs7jZPOQIWVBxVEa88dv59WgVM9uGXBR73Bm2X+5MVMQW6KSw/Xd8N
  Jk8RH1hzZn3YAN3k0K6ScQKBgB+s89X5SUJYyxWG7ZRhyNnm7cYk3K3aiNzOIx97
  Q254pkyU/YQtXm69S6IggAeyQs2XNrZ8HlG56PlZlYULbgoOe0uSargLyteJYpgz
  9iVCkcRWNARqVAUelxUIk4WsBLNkfc2H9H4H2J9kADREjeRaOPQV4kY2cUFrnbEy
  bqOhAoGAFVkq9P/2OxJ/FsLgBXNVjZR4aRU1iXhZqdueE+pUX/+rGNNsqzP99/fv
  7sJptOolq7lC5JPa11SZPWXriI3C/FQz2n80Df12IHGGgEG2jRX9BVnzFVkqVkHa
  Pi+y+4JUSph7YJYJZjOwc9n2g5BjHXucNtZy210OxccP5Py1ONY=
  -----END RSA PRIVATE KEY-----`,
  cert:`-----BEGIN CERTIFICATE-----
  MIIF+jCCA+KgAwIBAgIBATANBgkqhkiG9w0BAQsFADCBizELMAkGA1UEBhMCVVMx
  EDAOBgNVBAgMB0FyaXpvbmExEzARBgNVBAcMClNjb3R0c2RhbGUxGjAYBgNVBAoM
  EUdvRGFkZHkuY29tLCBJbmMuMRAwDgYDVQQLDAdIb3N0aW5nMScwJQYDVQQDDB5O
  eWR1cyBSb290IENlcnRpZmljYXRlIChTRzJQMikwIhgPMjAxNjA0MDEwMDAwMDBa
  GA8yMDQxMDQwMTAwMDAwMFowgYsxCzAJBgNVBAYTAlVTMRAwDgYDVQQIDAdBcml6
  b25hMRMwEQYDVQQHDApTY290dHNkYWxlMRowGAYDVQQKDBFHb0RhZGR5LmNvbSwg
  SW5jLjEQMA4GA1UECwwHSG9zdGluZzEnMCUGA1UEAwweTnlkdXMgUm9vdCBDZXJ0
  aWZpY2F0ZSAoU0cyUDIpMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
  vqMzbIYIGXZsV6KhZk7l/htuMAWmQSjgE/ybnt3GQppDkUNnTLi+hI6cOfJStT04
  f8rD7fTddyXNbvaKl6LWlNXsa3IW1MK/t3kz7XMqWW8orF5QniOtkyZxAS9EH4gT
  R53gP+Xw3O/UKjbgjQdFfNLz/DdX8PQQMPjzYL1cFlv4hUZELnIEK/mqKl2FKQUO
  TmzJiqAM2PesEEHIXcZ8rdUn0T/zE4PBjLmoV3/zJvt9yvFdd3hn7yYITUISC7Wm
  RPGLZZ+A52R/w4+uYcjzhUNcmcANv6Hx/cYqJoKDeAT3DOpila3G4U9LUEJAVyvf
  4RBeUWL+3eC6dxPJEA/TC9JkK/01T7Nl4A4dnpjUwdDXGk9G8+AM8+O/9XWeJwBs
  aTxgFTz2PNes+9ZVmACF3F8qHU5T9AyC4xUYC6Ejk4o2hERZH5MF13scOb+YUtmj
  Fbbu98Zd/pblqvm04NVUPZ+L7SFEfOgNdu8I2e6AIIJdJoiheMj/3PToog6s1M9w
  xqqnz/1Y7IL5XEZ47Miou0Or2hL62RY1pZ2+RU83f29ZW5TfN4vdN0UYM9dyMuXU
  MmLvj72UtDWXUQ2WV0JGjNlMLtDpGB0gpvvn3OV6jXXryb7g+9uxubZ3+uND0aKj
  BjIgolngtmoa3lD5VGWfa8OHIgCXz4/WBHSGyM0uzT0CAwEAAaNjMGEwDwYDVR0T
  AQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAQYwHQYDVR0OBBYEFHTU2MFNKMf4X3qq
  Tspp1Q4iqXZ+MB8GA1UdIwQYMBaAFHTU2MFNKMf4X3qqTspp1Q4iqXZ+MA0GCSqG
  SIb3DQEBCwUAA4ICAQBxnGpzT77Chi0misDHCRIICLiLZ0Ko+QTgkMWuRlB+GrZG
  oTTH8oeaPWmfItKn2MTrjpzJQ8bvojuYSeeBiZ8k0hqYSwzEc/NbpdXwvRk8XMAU
  snKVqd7sO0cRMB/XpauN8H8Wq1hYg7IpxzbOWC7p3xLuemwP+sI+uSP7DZKKxxLn
  8Yktiv2NSk2jz702GcZhh5rfp4qXWlXEthSF5fjlyQYWcConfsZNi9v/mtn/871T
  WtN8UQz1l45+Y9JLbMZYbFE0ZiVlBLgIJL27wXI66mG7o9YKbWOJ7CELUVcrpzka
  WN8n+vWGH2C994Bh5HTrblqQoRuNRCamZR5LLY8yVkZ0yYLFs4fadxy/TbHTUtv8
  eV5nUGi0KPZktV2Kluv2d9FLEjGISBFNcr0l40rekjdVtl0f9bdDkjDObFGN9uTg
  HIbN7+b9/EJfwCXPjDSricge/CdW4OvMRqy0JuE1zC0U1rbGJ0T+R7qBfk3YNANB
  d0xPbfjo4+7ZjiX2TygJ8oDwdrAq22D3mXNI92R90rX53Tna0Mxzi54GwFhbf+QI
  n8QeHT15Ax+teU2qDNZQDM9wvKBDlnv6plhBoDmEW0gzaFzz/aIs/uHMrVGtshFI
  d5s7HTcpVQo7jyODm3s+ETY6u6OkhxUF6CvE0u9vd2QFqN8GjDSvnaGFXKqOsw==
  -----END CERTIFICATE-----`,
};
const server = https.createServer(options, app);
const io=require("socket.io")(server,{
    cors:{origin:"*"}
});
io.on("connection",(socket)=>{
   //just after connnection
   socket.emit('updateWallet');
   //show battle for it self
   socket.emit('battleopen');
   //brodcast all open battle's
   socket.broadcast.emit('battleopen');
   socket.emit('runningBattle');
   //broadcast all running battles
   socket.broadcast.emit('runningBattle');

   //when a battel is open for all
   socket.on("battleopen",()=>{
    console.log("open");
    socket.emit('battleopen');
    socket.emit('updateWallet');
    socket.broadcast.emit('battleopen');
   
   })
   

   // Running battle
    socket.on("runningBattle",()=>{
       
       socket.emit('runningBattle');
       socket.broadcast.emit('runningBattle');
       socket.emit('updateWallet');
    })
    //update wallet
   

    

   
   socket.on("disconnect",(socket)=>{
    console.log("disconnect");
   })
})
server.listen(3000,()=>{
    console.log("server running ")
})
