docker build -t "image-fetcher" .
kubectl apply -f cassandra.yaml
sleep 120s
echo "Cassandra running!"
kubectl apply -f server_deployment.yaml
kubectl autoscale deployment server-deployment --cpu-percent=50 --min=1 --max=10