# Nodes

A Kubernetes node is a VM capable of running multiple workloads, most notably pods. Nodes can easily be provisioned for your cluster through the Web UI or [Terraform](/guides/terraform).

## Hostpath volumes

Nodes should be regarded as ephemeral as the node disk is wiped on, for example, cluster upgrades, server failures or maintenance. Therefore you should avoid using hostpath volumes whenever possible. Note that this doesn't impact [PVC provisioned volumes](/guides/volumes), which is the recommended way to provision storage.

## Node types

All nodes run on modern AMD processors. As the cores are shared the nodes can be scheduled to run more efficiently which allows us to offer much lower prices at comparable performance for the average use case.

## Networking

Nodes are configured with one NAT interface for internet traffic, and one VXLAN interface for inter-node traffic. Only egress traffic over the NAT interface will count towards your nodes monthly traffic allotment. We currently don't offer any support for fixed outbound addresses or per-node publicly routable IP addresses.


## Usable memory

Part of the memory and CPU allocation of each node is required for critical processes and daemons such as init system, kubelet, CSI- and CNI daemons. Under normal operation these services will reserve around ~400MiB of memory, meaning that a 2vCPU/4GiB node will have around 3700MiB of usable memory.

## Security

We use a [zero trust security model](https://en.wikipedia.org/wiki/Zero_trust_security_model). All nodes communicate with api-servers over mutual TLS with Symbiosis handling the distribution, signing and renewal of node and control plane certificates.

Node images are automatically encrypted on rest using LUKS.

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
