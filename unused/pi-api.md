# Socket-Spezifikation Raspi

## Allgmein

Der Raspi soll in regelmäßigen Abständen (z.B. 200ms) seine aktuellen Messwerte über einen UDP-Socket versenden. Das Grüni-Backend nimmt diese Daten entgegen, verarbeitet und speichert sie. Der Raspi muss also nichts speichern, keine Daten vorhalten - gar nichts. Er pusht einfach am laufenden Band die aktuellen Messwerte raus.

- Socket-Protokoll: UDP
- Socket-Port: 905 (der müsste eigentlich immer frei sein)
- Sende-Intervall: 200ms

## Sensor-Daten

Hier eine Übersicht der Daten, die der Raspi erfassen muss. Es wird außerdem angegeben, in welcher Maßeinheit die Daten zur Verfügung gestellt werden sollen.

| Sensor | Zielwert | Kommentar | Ermittlung für |
|--------|----------|-----------|----------------|
| Licht  | Lumen    | ganzzahlig von 0 bis ? | ganzen Kasten insgesamt |
| Luftfeuchtigkeit | Prozent | ganzzahlig von 0 bis 100 | ganzen Kasten insgesamt |
| Temperatur | Grad | ganzzahlig | ganzen Kasten insgesamt |
| Bodenfeuchtigkeit | Prozent | ganzzahlig von 0 bis 100 | jede Pflanze einzeln |
| Größe | cm | ganzzahlig (über Kamera ermitteln?) | jede Pflanze einzeln |

## Datenstruktur

Hier die Struktur des JSON-Objects, welches über den UDP-Socket versendet werden soll:

```json
{
    "timestamp": 1594639596, // unix timestamp
    "airHumidity": 0-100, // in Prozent, ganzzahlig
    "light": 2500, // in lumen
    "temperature": -20-100, // in Grad, ganzzahlig
    "pots": [ // bitte die Töpfe immer in der gleichen Reihenfolge angeben z.B. von links nach rechts
        {
            "soilHumidity": 0-100, // in Prozent, ganzzahlig
            "size": 8, // Höhe der Pflanze in cm, über Kamera ermitteln => optional, aber wäre cool
        },
        ...
    ],
}
```