---
sidebar_position: 1
---
# Volumes

Volumes offer persistent storage for your Kubernetes cluster. Volumes are created by defining [Persistent Volume Claims](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) (PVCs) in Kubernetes. Using PVCs allows nodes to read and write logs, database records, store metrics and enables many other use-cases that require persistent storage.

Symbiosis supports volumes up to 1024 GiB, if you need larger volumes please [contact us](mailto:info@symbiosis.host).

Volumes are automatically encrypted on rest with LUKS.

## Creating a PVC

Below is an example manifest to create a volume that can later be mounted to a pod:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: test-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi # amount of storage to be requested
  storageClassName: symbiosis-block-storage # this line can be omitted as symbiosis-block-storage is the default CSI driver
  volumeMode: Filesystem
```

You can read more about persistent volumes and how they can be configured in the [official documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).

## Creating a StatefulSet with a PVC

Unlike [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), a StatefulSet ensures each pod has access to its own volume such that no two pods mount the same volume.

A possible manifest for deploying a postgres database with a 64GiB volume could look like this:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  labels:
    app: postgres
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:14
        env:
          - name: POSTGRES_PASSWORD
            value: password
        ports:
        - containerPort: 5432
          name: postgresdb
        volumeMounts:
        - name: postgres-pvc
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: postgres-pvc
      spec:
        accessModes:
          - ReadWriteOnce
        resources:
          requests:
            storage: 64Gi
```

This configuration will look for a PVC named `postgres-pvc`, if none is found a new PVC is created. The name of a PVC can only contain lowercase alphanumerical characters and dashes, PVC names need to be unique for each cluster.

Symbiosis only supports the `ReadWriteOnce` access mode, meaning that the PVC can only be bound to one node at a time. For more info on access modes see the [official documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes).

Volumes are billed by the minute, starting when the PVC is initially created. To end billing, the PVC needs to be deleted. You can see a list of all volumes in the Web UI by browsing to the specific cluster.
