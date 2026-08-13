# TaskFlow - Dockerized To-Do Application

A simple full-stack To-Do application built to demonstrate Git, Docker, Docker Compose, container networking, environment variables, and PostgreSQL persistence.

## Project Overview

TaskFlow is a task management application that allows users to:

- Add tasks
- Edit tasks
- Mark tasks as completed
- Delete tasks
- Set task priorities
- Set due dates
- Search tasks
- Filter tasks
- Track task progress
- Import tasks
- Export tasks

The main objective of this project is to demonstrate how a full-stack application can be containerized and executed using Docker Compose.

---

## Architecture

```text
                    Browser
                       |
                       | http://localhost:8080
                       v
             +----------------------+
             | Frontend Container   |
             | Nginx + HTML/CSS/JS  |
             | Port 80              |
             +----------+-----------+
                        |
                        | HTTP API
                        v
             +----------------------+
             | Backend Container    |
             | Node.js + Express    |
             | Port 5000             |
             +----------+-----------+
                        |
                        | PostgreSQL
                        v
             +----------------------+
             | Database Container   |
             | PostgreSQL 16        |
             | Port 5432             |
             +----------+-----------+
                        |
                        v
                  Docker Volume