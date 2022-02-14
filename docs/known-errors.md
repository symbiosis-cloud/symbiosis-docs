---
sidebar_position: 8
title: Known errors
description: Known errors and frequently asked questions
slug: /known-errors
---

# Known errors

### `kubectl logs [...]` is throwing an error `tls: internal error`

If you are trying to get logs from a pod and see the following error appearing:
```bash
Error from server: Get "https://10.128.0.2:10250/containerLogs/[...]": remote error: tls: internal error
```

This means the nodes kubelet CSR (Certificate Signing Request) was not yet approved. To approve the certificate request execute the following steps.

```bash
# Get all csrs
kubectl get csr

# Following output will show up
NAME        AGE    SIGNERNAME                      REQUESTOR                                CONDITION
csr-28ddk   10m    kubernetes.io/kubelet-serving   system:node:general-int-1-cxdlxu         Pending
csr-44plg   10m    kubernetes.io/kubelet-serving   system:node:control-plane-int-1-xtpwjv   Pending
```

Now you should see request for every node and the control plane. To approve this request execute for each csr the following command.

```bash
kubectl certificate approve <name of csr>
```

Now getting logs should work perfectly.

:::info
This only needs to be done until a feature that takes care of the certificate signing requests from nodes is implemented.
:::