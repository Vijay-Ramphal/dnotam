version: '3.8'
services:
  ldapA:
    deploy:
      replicas: 1
      update_config:
        order: start-first
        failure_action: rollback
      rollback_config:
        order: stop-first
      placement:
        constraints:
            - node.hostname == node-3
      resources:
          limits:
            cpus: '2.0'
            memory: 2G 
    image: osixia/openldap-backup:1.5.0
    environment:
      HOSTNAME:  ldapa.example.com
      LDAP_LOG_LEVEL: "256"
      LDAP_ORGANISATION: "My Company"
      LDAP_DOMAIN: "example.com"
      LDAP_BASE_DN: "dc=example,dc=com"
      LDAP_ADMIN_PASSWORD_FILE: /run/secrets/ldap_admin_psw
      LDAP_CONFIG_PASSWORD_FILE: /run/secrets/ldap_admin_psw
      LDAP_READONLY_USER: "false"
      #LDAP_READONLY_USER_USERNAME: "readonly"
      #LDAP_READONLY_USER_PASSWORD: "readonly"
      LDAP_BACKUP_CONFIG_CRON_EXP: "0 */1 * * *"
      LDAP_BACKUP_DATA_CRON_EXP: "0 */1 * * * " 
      LDAP_RFC2307BIS_SCHEMA: "false"
      LDAP_BACKEND: "mdb"
      LDAP_TLS: "true"
      LDAP_TLS_CRT_FILENAME: "server.crt"
      LDAP_TLS_KEY_FILENAME: "server.key"
      LDAP_TLS_CA_CRT_FILENAME: "rootCA.pem"
      LDAP_TLS_ENFORCE: "false"
      LDAP_TLS_CIPHER_SUITE: "SECURE256:-VERS-SSL3.0"
      LDAP_TLS_PROTOCOL_MIN: "3.1"
      LDAP_TLS_VERIFY_CLIENT: "never"
      LDAP_REPLICATION: "true"
      LDAP_REPLICATION_CONFIG_SYNCPROV: binddn="cn=admin,cn=config" bindmethod=simple credentials=config searchbase="cn=config" type=refreshAndPersist retry="60 +" timeout=1 starttls=critical tls_reqcert=never
      LDAP_REPLICATION_DB_SYNCPROV: binddn="cn=admin,dc=example,dc=com" bindmethod=simple credentials=admin searchbase="dc=example,dc=com" type=refreshAndPersist interval=00:00:00:10 retry="60 +" timeout=1 starttls=critical tls_reqcert=never
      LDAP_REPLICATION_HOSTS: "#PYTHON2BASH:['ldap://ldapa.example.com','ldap://ldapb.example.com']"
      KEEP_EXISTING_CONFIG: "true"
      LDAP_REMOVE_CONFIG_AFTER_SETUP: "true"
      LDAP_SSL_HELPER_PREFIX: "ldap"
    secrets:
       - ldap_admin_psw
    networks:
       - ldap-overlay
    volumes:
      - /data1/openldap/ldapA/ldap:/var/lib/ldap
      - /data1/openldap/ldapA/slapd.d:/etc/ldap/slapd.d
      - /data1/openldap/ldapA/certs:/container/service/slapd/assets/certs/
      - /data1/openldap/ldapA/backup:/data/backup/
    ports:
      - "9389:389"
      - "9336:636"
    hostname: "ldapa.example.com"
   
  ldapB:
    deploy:
      replicas: 1
      update_config:
        order: start-first
        failure_action: rollback
      rollback_config: 
       order: stop-first
      placement:
        constraints: 
            - node.hostname == node-3
      resources:
         limits:
           cpus: '2.0'
           memory: 2G
    image: osixia/openldap-backup:1.5.0
    environment:
      HOSTNAME: "ldapb.example.com"
      LDAP_LOG_LEVEL: "256"
      LDAP_ORGANISATION: "My Company"
      LDAP_DOMAIN: "example.com"
      LDAP_BASE_DN: "dc=example,dc=com"
      LDAP_ADMIN_PASSWORD_FILE: /run/secrets/ldap_admin_psw
      LDAP_CONFIG_PASSWORD_FILE: /run/secrets/ldap_admin_psw
      LDAP_READONLY_USER: "false"
      #  LDAP_REPLICATION: "true"LDAP_READONLY_USER_USERNAME: "readonly"
      #LDAP_READONLY_USER_PASSWORD: "readonly"
      LDAP_BACKUP_CONFIG_CRON_EXP: "0 1 * * *"
      LDAP_BACKUP_DATA_CRON_EXP: "0 1 * * * "
      LDAP_RFC2307BIS_SCHEMA: "false"
      LDAP_BACKEND: "mdb"
      LDAP_TLS: "true"
      LDAP_TLS_CRT_FILENAME: "server.crt"
      LDAP_TLS_KEY_FILENAME: "server.key"
      LDAP_TLS_CA_CRT_FILENAME: "rootCA.pem"
      LDAP_TLS_ENFORCE: "false"
      LDAP_TLS_CIPHER_SUITE: "SECURE256:-VERS-SSL3.0"
      LDAP_TLS_PROTOCOL_MIN: "3.1"
      LDAP_TLS_VERIFY_CLIENT: "never"
      LDAP_REPLICATION: "true"
      LDAP_REPLICATION_CONFIG_SYNCPROV: binddn="cn=admin,cn=config" bindmethod=simple credentials=config searchbase="cn=config" type=refreshAndPersist retry="60 +" timeout=1 starttls=critical tls_reqcert=never
      LDAP_REPLICATION_DB_SYNCPROV: binddn="cn=admin,dc=example,dc=com" bindmethod=simple credentials=admin searchbase="dc=example,dc=com" type=refreshAndPersist interval=00:00:00:10 retry="60 +" timeout=1 starttls=critical tls_reqcert=never
      LDAP_REPLICATION_HOSTS: "#PYTHON2BASH:['ldap://ldapa.example.com','ldap://ldapb.example.com']"
      KEEP_EXISTING_CONFIG: "true"
      LDAP_REMOVE_CONFIG_AFTER_SETUP: "true"
      LDAP_SSL_HELPER_PREFIX: "ldap"
    secrets:
      - ldap_admin_psw
    networks:
      - ldap-overlay
    volumes:
      - /data1/openldap/ldapB/ldap:/var/lib/ldap
      - /data1/openldap/ldapB/slapd.d:/etc/ldap/slapd.d
      - /data1/openldap/ldapB/certs:/container/service/slapd/assets/certs/
      - /data1/openldap/ldapB/backup:/data/backup/
    ports:
      - "9489:389"
      - "9436:636"
    hostname: "ldapb.example.com"
  phpldapadmin:
    image: osixia/phpldapadmin:latest
    environment:
      PHPLDAPADMIN_LDAP_HOSTS: "#PYTHON2BASH:['ldapA','ldapB']"
      PHPLDAPADMIN_HTTPS: "false"
      PHPLDAPADMIN_HTTPS_CRT_FILENAME: server.crt
      PHPLDAPADMIN_HTTPS_KEY_FILENAME: server.key
      PHPLDAPADMIN_HTTPS_CA_CRT_FILENAME: rootCA.crt
    volumes:
      - /data1/openldap/ldapB/certs:/container/service/phpldapadmin/assets/apache2/certs
    ports:
      - "8182:80"
    deploy:
      update_config:
        order: start-first
        failure_action: rollback
      rollback_config:
        order: stop-first
      resources:
          limits:
             cpus: '2.0'
             memory: 2G
      placement:
         constraints:
           - node.hostname == node-3

  nginx-ldap:
    image: ldapha
    container_name: nginx-node-1
    hostname: nginx-node-3
    ports:
      - "1489:1389"
      - "1636:1636"
    networks:
      - ldap-overlay
    volumes:
      - /data1/openldap/ldapA/certs/server.crt:/etc/openldap/server.crt
      - /data1/openldap/ldapA/certs/server.key:/etc/openldap/server.key
      - /root/ldap/nginx/nginx.conf:/etc/nginx/nginx.conf
    deploy:
      update_config:
        order: start-first
        failure_action: rollback
      rollback_config:
        order: stop-first
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
networks:
   ldap-overlay:
     external: true 
secrets:
   ldap_admin_psw:
     external: true
