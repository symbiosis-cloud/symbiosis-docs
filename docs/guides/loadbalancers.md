---
sidebar_position: 2
---
# Load Balancers

Creating a Kubernetes Service of type `LoadBalancer` will provision an external Symbiosis load balancer for your cluster, balancing the requests among all worker nodes. A public IPv4 address will be assigned to each load balancer.

## Creating a Load Balancer

Creating a load balancer is as easy as defining a Service with type `LoadBalancer`, see example below:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: LoadBalancer
```

The above service will balance traffic between pods with the label `app: my-app` on port 8080.

Once the load balancer is bound the IP address can be retrieved with `kubectl`:
```
kubectl get svc my-service --output jsonpath='{.status.loadBalancer.ingress[0].ip}'
```


Billing will start as soon as the load balancer is created and will be billed by the minute until it has been deleted.
