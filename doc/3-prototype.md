
# Der Prototyp {#prototyp}
Wie bereits bei der ersten Ideenfindung von [Anforderungen und Features](#features1) festgestellt, weichen Umfang und technische Umsetzung des Prototypen von der Visionsidee Grüni vor allem in 3 Punkten ab:
1. **Wirkungsraum, bzw. örtliche Begrenzung**  
Während die Vision den möglichen Einsatz der Anwendung in verschiedenen Umgebungen beinhaltet, ist der Prototyp eine Anwendung allein auf den Anzuchtkasten ausgelegt, der aus dem Visionsvideo aufgegriffen wird. 
2. **Darstellung und User Interface**  
Holografische Projektionen sind zurzeit natürlich nicht umsetzbar darum interagiert der User auf der Oberfläche eines mobilen Gerätes über eine Web-AR-Anwendung. 
3. **Gewinnung von Analysedaten**  
Scan Technologien mit dem Smartphone funktionieren bereits über Bilderkennung. Diese benötigen allerdings eine große Menge an Vergleichs-Daten und können Pflanzen nur anhand ihres Aussehens beurteilen. Im Prototyp-Kasten sind also zusätzlich Sensoren installiert, da das mobile Gerät nicht direkt als Scanner genutzt wird, sondern mehr als Sammelpunkt für erhaltene Informationen (von den externen Sensoren) und zur einfachen Darstellung dieser.  

Zeitlich betrachtet dient der Prototyp also der Pflanzenanzucht vom keimen lassen der Samen bis zu dem Zeitpunkt, an dem die Pflanze dem Kasten entwachsen ist. Anschließend soll er für die betreffende Pflanze zwar noch als Ratgeber über allgemeine Informationen dienen, die Analyse von konkreten Messdaten entfällt allerdings.  

## Recherche und erste Tests
### Sensoren

Zum Speichern und Verarbeiten der Sensordaten wird ein Raspberry Pi 4 benutzt, da dieser der Projekt-Gruppe bereits zur Verfügung stand. Bei den Sensoren war daher die Auswahl eher begrenzt. 

| Funktion | Verwendete Komponente | Kommentar | 
|--------|--------|--------|
| Lichtmessung | Lichtsensor „BH1750“ | wandelt bereits auf der Platine die Analogsignale in Digitalsignale |
| Temperaturmessung  | Sensor „DHT22“ | wandelt ebenso bereits die Signale sodass diese ohne zusätzliche Bauteile vom Raspberry Pi gelesen werden können |
| Bodenfeuchtigkeitsmessung | „Capacitive Stil Moisture Sensor v2.0“ | wurde von Hardwareexperten der FH empfohlen → liefert unter den Feuchtigkeitssensoren die präzisesten Daten |
| Signalverarbeitung des Feuchtigkeitssensors | Analog-Digital Wandler „MCP3008“ | wurde ebenso gewählt aufgrund der Empfehlung führender Hardwareexperten der FH |

### AR

Marker: ![Marker](img/Marker.jpeg)



## Konzeption

Die Konzeption des Designs für den Prototypen richtet sich nach der Darstellung im Visionsvideo und auch dort gezeigte, inhaltliche Features und Aspekte werden aufgegriffen. Geplante Abläufe sowie eine Design-Visualisierung für die Anwendung werden in folgender Grafik dargestellt:
![Grafik - Ablauf und Visualisierung](img/AblaufVisualisierung_kompr.jpg)
Alternativ: pdf in Anhang + Verweis darauf

**Anmerkung zur rot hinterlegten Notiz "Alternative Gestaltungsmöglichkeit":**   
Vgl. Grafik oben → anstatt eine Menü-Option "Notifications" anzulegen den User direkt zum nötigen Handlungsvorgang weiterleiten (Umtopfen/Gießen).

### Allgemeine Elemente des UI

- Menüoptionen / Messdaten  
→ in der Grafik türkis dargestellte Buttons  
→ sind an Kasten oder Topf angeheftet  
→ durch Antippen dieser Buttons navigiert der User durch das Menü oder ruft weitere Informationen auf

- Pop-Up Textfelder  
→ in der Grafik transparent weiße Textfelder  
→ sind am Bildschirm angeheftet  
→ dienen der Anzeige größerer Textinhalte oder Diagramme, sind scrollbar  

- Wichtige Notifications  
→ in der Grafik rot dargestellte Symbole  
→ sind an den jeweiligen Topf angeheftet  
→ erscheinen falls nötiger Handlungsbedarf besteht (z.B. Erde für die Pflanze zu trocken)  
→ sollen durch Antippen direkt zu betreffender Pop-Up Nachricht führen und in betreffende Menü-Option navigieren  

- PLANT-E und Pop-Up Nachrichten  
→ in der Grafik als Sprechblasen erkennbar  
→ dient für Aufforderungen an den User (Eingabeaufforderungen, Führen durch Abläufe)


### Logistischer Aufbau
Die Messdaten der Sensoren werden unterschieden in **übergreifende** und **spezifische** Messdaten. Luftfeuchtigkeit, Belichtung und Temperatur gelten für alle Pflanzen im Kasten gleich, darum werden sie auch in der Darstellung an den Kasten angehängt und direkt im Startmenü angezeigt. Lediglich die Bodenfeuchtigkeit gilt spezifisch für jeden Topf einzeln, der User muss diesen Topf also zunächst im Startmenü auswählen um sich dessen gesamte Daten unter der Menüoption "Standortdaten" anzeigen zu lassen.

Außerdem unterschieden werden muss zwischen einem leeren und einem bepflanzten Topf. Je nachdem wie diese Zustandseigenschaft des Topfes belegt ist, ergeben sich bei der Auswahl dessen nämlich auch weitere zu unterscheidende Menü- und Aktivitäts-Optionen. Diese lassen sich der Ablauf-Grafik entnehmen.


## Umsetzung


### ???
### Architektur
https://drive.google.com/drive/folders/1axUoBa-6V8m4xlXnIqG_9iJej61XTZWL


Zum Testen und Nutzen der Sensoren wurde ein kleines Python Script geschrieben, das sowohl die Sensoren anspricht als auch deren Daten im Json-Format speichert. 

**Anmerkung zur Abgrenzung zwischen dem Gruppenprojekt "Grüni" und dem IT-Praxisprojekt von Dennis Krischal:**  
Die Projekte überschneiden sich in genau einem Punkt, da es sich angeboten hat für beide die gleiche Hardware zum Auslesen der Sensoren zu benutzen.

vlg. mit Grafik zur [Richtung des Prototyps](###features1) und [Konzeption](##)

Verweis zum Git Repository (+ Installationshinweise?)

### ???

### Video (?)



## Fazit zum Prototypen

### Aufgetretene Schwierigkeiten
### Verbesserungsmöglichkeiten


# Schlusswort zu Organisation, Team und Modul
Grüni begleitete unser Team auf sehr konstante Art und Weise durch dieses Semester. Die Projektidee war schnell entwickelt und das gesamte Team konnte sich für den Themenbereich eines Gardening-Projekts begeistern, was sehr förderlich war um stetig daran weiterzuarbeiten. Auch Organisation, Absprache und Aufgabenverteilung funktionierten sehr gut. Dies war tatsächlich zum großen Teil den wöchentlich stattfindenden Modulveranstaltungen zu verdanken und möglicherweise auch dem Rahmen des (Corona geschuldeten) Online-Semesters. Die durchgeführten Webex-Meetings wurden anschließend direkt intern weitergeführt und waren stets erstaunlich produktiv. Über Google Drive Documents und ähnliche Tools waren gemeinsames Brainstorming, Festhalten von Ideen, Arbeiten an Dokumenten und Anforderungen konzentriert umsetzbar.  

Als Projektmanagement-Tool wurde Asana verwendet:
![Asana Screenshot](img/asana.JPG)
Unter dem Link https://app.asana.com/0/1172859492234369/board lässt sich die Projektentwicklung nochmals im Detail nachvollziehen. Dort finden sich unter anderem sämtliche, geführte Protokolle unter dem Punkt Wochenberichte wieder, inklusive der Aufgabenverteilung im Team. Erstellte, ausgetauschte Dokumente und Dateien sind in den jeweiligen Aufgaben verlinkt und finden sich gesammelt im Google Drive Projekt-Ordner unter dem Link https://drive.google.com/drive/folders/10xpkQQMSEUjZaZLw7HL2MjYE71AiZr6m?usp=sharing wieder.

Der Arbeitsaufwand für ein 8CP-Modul war selbstverständlich nicht in ein paar Tagen zu bewältigen, zumal die Aufgabenstellung dieses Moduls viele verschiedene Komponenten aufweisen konnte: Die Entwicklung einer Produktidee, die Beschäftigung mit grafischen Nutzeroberflächen, Video-Dreh und -Bearbeitung, Animation in Blender und zu guter Letzt das Entwickeln und Programmieren einer Anwendung.  
Vorteilhaft war der Umstand, dass die meisten der gestalterischen Aufgaben-Aspekte nicht völlig neu für uns waren sondern einzeln bereits in vergangenen Modulen behandelt wurden und wir so aus bereits gesammelten Erfahrungen schöpfen konnten. Die Kombination aus so vielen Aufgaben stellte allerdings einen erhöhten Organisationsanspruch dar und auch klassische Zeitfresser, wie z.B.Überlastungen beim Rendern, ließen sich wieder nicht gänzlich vermeiden. 
Aber auch neue Erfahrungen wurden in diesem Projekt gesammelt, wie die Kombinierung von Real- und Animationsfilm mithilfe von After Effects oder auch das Arbeiten mit AR.js in Verbindung mit Hardware-Sensoren.

???????? mag sich Hannes hier vielleicht noch ein wenig auskotzen ?

???????? und/oder hier vielleicht Robs noch ein herzerwärmendes Ende finden ?
