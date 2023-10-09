curl --request POST \
  --url http://localhost:3000/carrito/agregar \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/2023.5.8' \
  --data '{
	"nombre": "Macbook Pro",
	"precio": 15.20
}'