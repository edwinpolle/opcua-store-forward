<div style="padding: 15px; border-left: 6px solid #ffcc00; background-color: #fff9e6; color: #664d00; margin: 20px 0; border-radius: 4px; font-family: sans-serif;">
  <strong style="font-size: 1.1em;">⚠️ Warnung: Projekt in Entwicklung</strong>
  <p style="margin: 8px 0 0 0; line-height: 1.5;">
    Dieses Projekt befindet sich aktuell in der Entwicklungsphase. 
    Die Angaben in dieser README-Datei entsprechen nicht dem aktuellen Stand.
    Diese diente nur zur inspiration und ist KI generiert!
  </p>
</div>

# Store & Forward Gateway

A modern Store & Forward platform built with **Electron** and **React**, designed for industrial automation, IoT, and edge computing environments. The application reliably collects data from OPC UA servers and MQTT brokers, buffers data locally, and forwards it to various database systems without data loss.

## Overview

Store & Forward Gateway enables reliable data acquisition and persistence between industrial protocols and database platforms.

The application uses a local persistence layer to guarantee delivery even when databases, networks, or cloud services are temporarily unavailable. Once connectivity is restored, queued data is automatically replayed and synchronized with the configured targets.

Built with Electron and React, the application provides a modern cross-platform desktop experience while remaining lightweight enough for industrial edge devices.

---

## Features

### Data Sources

- OPC UA Client
- MQTT Client
- Multiple simultaneous connections
- Secure TLS/SSL communication
- Automatic reconnect handling
- Configurable subscriptions and topics

### Store & Forward Engine

- Persistent local queue
- Guaranteed delivery
- FIFO processing
- Automatic retry mechanism
- Offline buffering
- Queue prioritization
- Data replay after recovery
- Configurable retention policies

### Database Targets

Supported databases:

- MySQL
- PostgreSQL
- MariaDB
- Microsoft SQL Server
- SQLite
- Oracle Database
- TimescaleDB
- InfluxDB
- Custom database connectors

### Data Processing

- Tag mapping
- Topic mapping
- Data transformation
- Filtering
- Timestamp normalization
- Data validation
- Batch inserts

### Monitoring & Diagnostics

- Real-time connection status
- Queue monitoring
- Throughput metrics
- Error tracking
- Health monitoring
- Detailed logging
- Audit trail

### Security

- TLS/SSL encryption
- Secure credential storage
- Certificate-based authentication
- Role-based access control

---

## Technology Stack

### Frontend

- React
- TypeScript
- Material UI
- React Query
- React Router

### Desktop Runtime

- Electron
- Electron Builder

### Backend Services

- Node.js
- OPC UA Client SDK
- MQTT Client
- Database Connectors

### Storage

- SQLite (local persistence)
- MySQL
- PostgreSQL
- MSSQL
- Oracle
- InfluxDB

---

## Architecture

```text
┌──────────────────────────────────────┐
│           Electron + React           │
├──────────────────────────────────────┤
│ Dashboard                            │
│ Connection Manager                   │
│ Configuration                        │
│ Monitoring                           │
│ Log Viewer                           │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│        Store & Forward Engine        │
├──────────────────────────────────────┤
│ OPC UA Collector                     │
│ MQTT Collector                       │
│ Local Persistence                    │
│ Retry Service                        │
│ Mapping Engine                       │
│ Data Processing                      │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│         Database Connectors          │
├──────────────────────────────────────┤
│ MySQL                                │
│ PostgreSQL                           │
│ SQL Server                           │
│ SQLite                               │
│ Oracle                               │
│ TimescaleDB                          │
│ InfluxDB                             │
└──────────────────────────────────────┘
```

---

## Key Benefits

- Zero data loss during outages
- Reliable industrial communication
- Cross-platform deployment
- Easy configuration
- Scalable architecture
- Modern user interface
- Edge and on-premise ready
- Database independent

---

## Typical Use Cases

### Industrial Automation

Collect process values, alarms, and machine states from PLCs and OPC UA servers and store them in SQL databases for analysis and reporting.

### IoT Data Collection

Consume MQTT topics from sensors, devices, and gateways and persist data into centralized storage systems.

### Edge-to-Cloud Integration

Buffer data locally during internet outages and synchronize automatically once connectivity returns.

### Data Historian

Create a lightweight historian solution using standard databases without requiring proprietary software.

---

## Roadmap

- [x] OPC UA Server Integration
- [ ] OPC UA Client Integration
- [x] MQTT Integration
- [x] Store & Forward Engine
- [x] SQLite Persistence
- [x] MySQL Connector
- [ ] PostgreSQL Connector
- [ ] MSSql Connector
- [ ] Data Transformation Rules
- [ ] InfluxDB Connector
- [ ] Sparkplug B Support
- [ ] Kafka Connector
- [ ] REST API
- [ ] User Management
- [ ] Plugin System
- [ ] High Availability Mode

---

## License

MIT License

---

## Contributing

Contributions, ideas, feature requests, and pull requests are welcome.

Together we can build a modern, open, and reliable industrial data gateway for the edge.
