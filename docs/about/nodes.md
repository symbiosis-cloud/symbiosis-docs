# Nodes

A Kubernetes node is a VM capable of running multiple workloads, most notably pods. Nodes can easily be provisioned for your cluster through the Web UI or [Terraform](/guides/terraform).

## Hostpath volumes

Nodes should be regarded as ephemeral as the node disk is wiped on, for example, cluster upgrades, server failures or maintenance. Therefore you should avoid using hostpath volumes whenever possible. Note that this doesn't impact [PVC provisioned volumes](/guides/volumes), which is the recommended way to provision storage.

## Node types

Symbiosis offers three different node types, all running on modern AMD processors. As the cores are shared the nodes can be scheduled to run more efficiently which leads to much lower prices at comparable performance for the average use case.

### General Purpose

|           | vCPUs | Memory | Traffic | Price (beta 20% off)    |
| -         | -:    | -:     | -:      | -:                      |
| general-1 | 1     | 2 GiB  | 1 TiB   | $0.000111/m ($4.80/mo)  |
| general-2 | 2     | 4 GiB  | 2 TiB   | $0.000222/m ($9.60/mo)  |
| general-3 | 4     | 8 GiB  | 4 TiB   | $0.000444/m ($19.20/mo) |
| general-4 | 8     | 16 GiB | 6 TiB   | $0.000889/m ($38.40/mo) |

### Memory Optimized

|          | vCPUs | Memory | Traffic | Price (beta 20% off)    |
| -        | -:    | -:     | -:      | -:                      |
| memory-1 | 1     | 4 GiB  | 1 TiB   | $0.000167/m ($7.20/mo)  |
| memory-2 | 2     | 8 GiB  | 2 TiB   | $0.000333/m ($14.40/mo) |
| memory-3 | 4     | 16 GiB | 4 TiB   | $0.000667/m ($28.80/mo) |
| memory-4 | 8     | 32 GiB | 6 TiB   | $0.001333/m ($57.60/mo) |
