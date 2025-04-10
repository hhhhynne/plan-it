# Askeladden AI Reiseplanlegger

Dette prosjektet ble laget i løpet av en 1.5-times workshop med Askeladden, hvor målet var å utforske idéutvikling og lage en prototype med AI. Vi valgte å lage en **reiseplanlegger for større grupper** som bruker kunstig intelligens til å samle inn preferanser og foreslå den mest optimale turen for gruppa.

## Hva gjør prosjektet?

Å planlegge en tur for mange personer kan være vanskelig – alle har ulike ønsker, budsjett og preferanser. Dette verktøyet automatiserer prosessen:

1. **En bruker oppretter en tur** – og får en unik lenke til et skjema som kan sendes til de andre reisende.
2. **De resterende reisende fyller ut skjemaet** – hvor de skriver inn sine ønsker, for eksempel:
   - Aktiviteter
   - Budsjett
   - Transportpreferanser
   - Matpreferanser
   - Overnattingsvalg
3. **AI genererer turen** – basert på ønskene i gruppa:
   - En destinasjon som passer gruppa
   - En detaljert dagsplan med aktiviteter og forslag
   - Et balansert opplegg basert på flertallets ønsker

## 🧠 Teknologi brukt

- **[Bolt.new](https://bolt.new/)** – for rask prototyping og bygging av frontend
- **OpenAI API** – for å prosessere brukerinput og generere forslag til reiseplan
