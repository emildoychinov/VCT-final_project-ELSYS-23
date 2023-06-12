docker build -t "image-fetcher" .
kubectl apply -f cassandra.yaml
sleep 120s
echo "Cassandra running!"
kubectl apply -f server_deployment.yaml