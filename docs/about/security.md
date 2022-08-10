---
sidebar_position: 5
---

# Security

This document outlines a few of the security measures we take as a company in order to keep your cloud resources safe and information on how to report any suspected abuse or vulnerabilities.

## Symbiosis Infrastructure

Hardening our infrastructure means measures aimed at reducing the attack surface of our services and ensure only authenticated and authorized parties can access private resources in our cloud.

- Platform networking runs over VXLAN overlay networks
- Communication between applications and servers secured behind mTLS
- Data centers equipped with DDOS mitigation
- Data in storage and volumes are encrypted with LUKS block encryption with centrally stored secrets
- Remote management is fully audited; remote access is done using short-lived cert-based SSH sessions
- Nodes are virtualized using Libvirt (KVM), battle tested and widely used for over 15 years

## Development (DevSec)

DevSec (Development Security) groups the measures we take to ensure we can build, release and maintain our software in a secure and robust manner.

- Access to are internal services is gated using a SSO Identity Provider
- Proposed changes to our core services are verified with code reviews, automated E2E-testing, integration testing and unit testing
- Services are written in memory-safe, robust and battle tested languages and frameworks (including Golang, Kotlin, Spring Boot)

## Abuse

We take abuse complaints seriously. Please report any suspect activity to abuse@symbiosis.host.

## Vulnerability Reporting

We appreciate all efforts from our users to identify and remedy any potential vulnerabilities in our system.

If you would like to report a vulnerability in one our services please email security@symbiosis.host and include the steps to reproduce including any relevant information concerning tools and versions used.
