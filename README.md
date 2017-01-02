# Angular: Mit Sicherheit
In diesem Projekt zum Artikel 'Aber sicher! Angular 2 Security Architektur in der Praxis', können die vorgestellten Beispiele ausprobiert werden.  

Der einfachste Start erfolgt via Docker-compose aus dem `docker`-Verzeichnis dieses Projektes:  
`docker-compose up`  
Das Keycloak in diesem Projekt bringt bereits die nötige Konfiguration mit, sodass es direkt losgehen kann. Auch Angular Frontend und Spring Backend werden durch Docker automatisch gestartet.

Das Frontend kann dann aufgerufen werden über  
`http://localhost:4200`,  
die Anmeldedaten lauten:  
Username: `demo-user`  
Passwort: `demo`

Wer kein Docker nutzen möchte, kann Keycloak manuell herunterladen und wie im Artikel beschrieben einrichten. Das Frontend wird dann aus dem `frontend`-Ordner des Projektes gestartet:
* `npm install`
* `ng serve`

Das Spring-Boot Projekt wird durch Maven aus dem `backend`-Ordner ausgeführt:
`mvn spring-boot:run`

Wer Fragen hat oder Feedback geben möchte, kann sich gerne an `karsten.sitterberg at trion.de` oder per Twitter an `@kakulty` wenden.
