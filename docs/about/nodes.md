# Nodes

A Kubernetes node is a VM capable of running multiple workloads, most notably pods. Nodes can easily be provisioned for your cluster through the Web UI or [Terraform](/guides/terraform).

## Node types

Symbiosis offers three different node types, all running on modern AMD processors. As the cores are shared the nodes can be scheduled to run more efficiently which leads to much lower prices at comparable performance for the average use case.

### General Purpose

|               | vCPUs | Memory | Traffic | Price (beta 20% off) |
| -             | -:    | -:     | -:      | -:                   |
| general-int-1 | 1     | 4 GiB  | 4 TiB   | $0.000093/m ($4/mo)  |
| general-int-2 | 2     | 8 GiB  | 5 TiB   | $0.000185/m ($8/mo)  |
| general-int-3 | 4     | 16 GiB | 6 TiB   | $0.000370/m ($16/mo) |
| general-int-4 | 8     | 32 GiB | 7 TiB   | $0.000741/m ($32/mo) |

### CPU Optimized

|           | vCPUs | Memory | Traffic | Price (beta 20% off)    |
| -         | -:    | -:     | -:      | -:                      |
| cpu-int-1 | 2     | 4 GiB  | 4 TiB   | $0.000148/m ($6.40/mo)  |
| cpu-int-2 | 4     | 8 GiB  | 5 TiB   | $0.000296/m ($12.80/mo) |
| cpu-int-3 | 8     | 16 GiB | 6 TiB   | $0.000593/m ($25.60/mo) |
| cpu-int-4 | 16    | 32 GiB | 7 TiB   | $0.001185/m ($51.20/mo) |

### Memory Optimized

|              | vCPUs | Memory | Traffic | Price (beta 20% off)    |
| -            | -:    | -:     | -:      | -:                      |
| memory-int-1 | 1     | 8 GiB  | 4 TiB   | $0.000148/m ($6.40/mo)  |
| memory-int-2 | 2     | 16 GiB | 5 TiB   | $0.000296/m ($12.80/mo) |
| memory-int-3 | 4     | 32 GiB | 6 TiB   | $0.000593/m ($25.60/mo) |
| memory-int-4 | 8     | 64 GiB | 7 TiB   | $0.001185/m ($51.20/mo) |
