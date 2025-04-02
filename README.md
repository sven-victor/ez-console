# Ez-Console

`ez-console` is a modern backend framework/scaffold designed to rapidly build management applications. It provides a solid foundation with essential features like authentication, authorization, and user management out-of-the-box.

## Features

-   **Authentication**: Supports local accounts, LDAP, and OAuth2/OIDC protocols.
-   **Authorization**: Role-Based Access Control (RBAC) to manage permissions.
-   **User Management**: Complete user lifecycle management (create, read, update, delete, disable, activate). Users can manage their own passwords.
-   **System Settings**: Configurable security policies:
    -   Password policies (minimum length, complexity).
    -   Multi-Factor Authentication (MFA) with TOTP or Email.
    -   Password expiration.
    -   Automatic disabling of inactive users.
-   **Tech Stack**:
    -   **Backend**: Go with the Gin framework.
    -   **Database**: GORM ORM with support for SQLite, MySQL.
    -   **Frontend**: React for the user interface.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   [Go](https://golang.org/dl/) (version 1.18 or higher)
-   [Node.js and npm](https://nodejs.org/en/download/) (for the frontend)
-   [Make](https://www.gnu.org/software/make/) (optional, for using the Makefile)

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sven-victor/ez-console.git
    cd ez-console
    ```

2.  **Build :**
    ```bash
    # Clean up compiled object files and recompile
    make clean build
    ```

2.  **Running :**
    ```
    # <encrypt key>is a global encryption key
    dist/server --global.encrypt-key=<encrypt key>
    ```
    *\<encrypt key> formatted as a string of 8, 16, 24, or 32 bytes, used for encrypting and decrypting sensitive data. Please do not change it arbitrarily after running to avoid causing previous data to be unable to decrypt.*

## Configuration

- The application can be configured via the `config.yaml` file. Example:
    ```yaml
    # dist/server --global.encrypt-key=12345678 --config config.yaml
    server:
      host: "0.0.0.0"
      port: 8080
      mode: "debug"
      read_timeout: 10s
      write_timeout: 10s
      shutdown_timeout: 10s

    database:
      driver: "sqlite"
      path: "ez-console.db"

    oauth:
      enabled: true
      providers:
      - name: general_oauth
          display_name: General OAuth
          client_id: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          client_secret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          icon_url: https://auth.example.com/logo.svg
          token_url: "https://auth.example.com/oauth/token"
          auth_url: "https://auth.example.com/oauth/authorize"
          user_info_url: "https://auth.example.com/oauth/userinfo"
          redirect_url: "http://localhost:5173/login?provider=general_oauth"
          role_field: "role"
    ```
- Alternatively, you can specify certain configuration parameters through startup parameters.
    ```bash
    dist/server \
        --global.encrypt-key=12345678 \
        --database.driver=mysql \
        --database.host=1.1.1.1 \
        --database.username=ez-console \
        --database.password=ez-console-password \
        --log.level=debug \
        --log.format=lucy
    ```
## API

The backend provides a RESTful API.

-   **List endpoints** support pagination (`current`, `page_size`) and search (`search`).
-   **Error responses** include a `code` and an `err` message.
-   **Successful responses** for lists include `data`, `total`, `current`, and `page_size`.
-   **Successful responses** for single items include `data`.

See the project's rules and source code for more details on specific endpoints.

## Authentication

`ez-console` supports multiple authentication methods:

-   **Local accounts**: Username and password stored in the database.
-   **LDAP**: Authenticate against an LDAP directory.
-   **OAuth2/OIDC**: Authenticate with providers like Google, Okta, etc.

These can be configured in the `config.yaml` file and system settings of the management platform.
