kubectl delete service cassandra-service server-service
kubectl delete deployment cassandra-deployment server-deployment
sleep 45s
docker rmi image-fetcher
kubectl delete hpa server-deployment